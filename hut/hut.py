# =============================================================================
# HABITATGES D'ÚS TURÍSTIC (HUT) — La TdG · 26.10.2026
# Registre de Turisme de Catalunya (dades obertes de la Generalitat, conjunt
# t2h3-cgys). Baixa els establiments d'allotjament turístic del Baix Empordà i
# desa a dades/hut.json els recomptes dels quatre municipis: HUT i places, per
# carrer, la resta d'allotjaments, el lloc a la comarca i les altes i baixes
# d'un mes a l'altre.
# PRIVADESA: el registre porta el nom del titular, la referència cadastral i el
# pis i la porta. NO es desa res d'això: només recomptes.
# =============================================================================
import json
import re
import sys
import unicodedata
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

import requests

ARREL = Path(__file__).resolve().parent.parent
SORTIDA = ARREL / "dades" / "hut.json"
ESTAT = ARREL / "hut" / "estat.json"      # números d'inscripció d'avui, per calcular altes i baixes
API = "https://analisi.transparenciacatalunya.cat/resource/t2h3-cgys.json"
VISTA = "https://analisi.transparenciacatalunya.cat/api/views/t2h3-cgys.json"
MUNICIPIS = {
    "17022": "la Bisbal d'Empordà",
    "17057": "Corçà",
    "17902": "Forallac",
    "17901": "Cruïlles, Monells i Sant Sadurní de l'Heura",
    "17205": "Ullastret",   # 31.10.2026
}
CAMPS = ("tipus_establiment,n_mero_inscripci,estat,tipus_de_via,nom_de_la_via,municipi,"
         "codi_municipi_idescat,comarca,grup,modalitat,total_places,total_estances")
CAPCALERES = {"User-Agent": "LaTdG-redaccio (https://latdg.github.io/redaccio/)"}


def net(v):
    return re.sub(r"\s+", " ", str(v or "")).strip()


def sense_accents(t):
    return "".join(c for c in unicodedata.normalize("NFD", t.lower()) if unicodedata.category(c) != "Mn")


def es_hut(x):
    t = sense_accents(net(x.get("tipus_establiment")) + " " + net(x.get("grup")) + " " + net(x.get("modalitat")))
    return "us turistic" in t or re.search(r"\bhut\b", t) is not None


def actiu(x):
    return "baixa" not in sense_accents(net(x.get("estat")))


def num(v):
    try:
        return int(float(v))
    except (TypeError, ValueError):
        return 0


def carrer(x):
    via = " ".join(p for p in (net(x.get("tipus_de_via")), net(x.get("nom_de_la_via"))) if p)
    return via.title().replace(" De ", " de ").replace(" Del ", " del ").replace(" La ", " la ").replace(" Les ", " les ") \
        .replace(" D'", " d'").replace(" L'", " l'").replace(" Dels ", " dels ").replace(" I ", " i ") or "(sense carrer)"


def main():
    files, pas = [], 50000
    while True:
        r = requests.get(API, params={"$select": CAMPS, "$where": "comarca like '%Baix Empord%'",
                                      "$limit": pas, "$offset": len(files), "$order": ":id"},
                         headers=CAPCALERES, timeout=180)
        r.raise_for_status()
        lot = r.json()
        files += lot
        if len(lot) < pas:
            break
    print(len(files), "establiments al Baix Empordà")
    print("Tipus:", Counter(net(x.get("tipus_establiment")) for x in files).most_common(15))
    print("Estat:", Counter(net(x.get("estat")) for x in files).most_common(10))
    if not files:
        sys.exit("Cap fila: no es toca res.")
    try:
        act = requests.get(VISTA, headers=CAPCALERES, timeout=60).json().get("rowsUpdatedAt")
        actualitzat = datetime.fromtimestamp(act, timezone.utc).isoformat() if act else None
    except Exception:
        actualitzat = None

    actius = [x for x in files if actiu(x)]
    codi = lambda x: net(x.get("codi_municipi_idescat"))[:5]

    # Lloc de cada municipi a la comarca (HUT actius).
    comarca = Counter()
    noms_comarca = {}
    for x in actius:
        if es_hut(x):
            comarca[codi(x)] += 1
            noms_comarca[codi(x)] = net(x.get("municipi"))
    ranquing = [c for c, _ in comarca.most_common()]

    anterior = {}
    if ESTAT.exists():
        anterior = json.loads(ESTAT.read_text(encoding="utf-8"))
    nou_estat = {"data": actualitzat or datetime.now(timezone.utc).isoformat(), "municipis": {}}

    municipis = {}
    for c, nom in MUNICIPIS.items():
        seus = [x for x in actius if codi(x) == c]
        hut = [x for x in seus if es_hut(x)]
        numeros = sorted({net(x.get("n_mero_inscripci")) for x in hut if net(x.get("n_mero_inscripci"))})
        nou_estat["municipis"][c] = numeros
        abans = set((anterior.get("municipis") or {}).get(c, [])) if anterior else None
        altres = defaultdict(lambda: {"n": 0, "places": 0})
        for x in seus:
            if not es_hut(x):
                t = net(x.get("grup")) or net(x.get("tipus_establiment")) or "Altres"
                altres[t]["n"] += 1
                altres[t]["places"] += num(x.get("total_places"))
        carrers = Counter(carrer(x) for x in hut)
        municipis[c] = {
            "nom": nom,
            "hut": len(hut),
            "places": sum(num(x.get("total_places")) for x in hut),
            "lloc": (ranquing.index(c) + 1) if c in ranquing else None,
            "carrers": carrers.most_common(),  # 27.10.2026: tots els carrers
            "altres": sorted(({"tipus": k, **v} for k, v in altres.items()), key=lambda z: -z["n"]),
            "altes": None if abans is None else len(set(numeros) - abans),
            "baixes": None if abans is None else len(abans - set(numeros)),
        }

    # Sèrie: un punt per cada actualització de la font.
    historic = []
    if SORTIDA.exists():
        try:
            historic = json.loads(SORTIDA.read_text(encoding="utf-8")).get("historic", [])
        except Exception:
            historic = []
    punt = {"data": (actualitzat or "")[:10], **{c: municipis[c]["hut"] for c in MUNICIPIS}}
    if punt["data"] and not any(h.get("data") == punt["data"] for h in historic):
        historic.append(punt)

    SORTIDA.write_text(json.dumps({
        "generat": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "actualitzatFont": actualitzat,
        "comparatAmb": (anterior.get("data") if anterior else None),
        "font": "Registre de Turisme de Catalunya (Departament d'Empresa i Treball), dades obertes de la Generalitat",
        "comarca": {"hut": sum(comarca.values()), "municipis": len(comarca),
                    "primers": [[noms_comarca[c], comarca[c]] for c in ranquing[:5]]},
        "municipis": municipis,
        "historic": historic[-36:],
    }, ensure_ascii=False, indent=1), encoding="utf-8")
    # L'estat només canvia quan la font s'ha actualitzat, perquè les altes i baixes
    # es comptin d'una actualització del registre a la següent.
    if not anterior or anterior.get("data") != nou_estat["data"]:
        ESTAT.write_text(json.dumps(nou_estat, ensure_ascii=False), encoding="utf-8")
    for c, m in municipis.items():
        print(m["nom"], m["hut"], "HUT,", m["places"], "places, lloc", m["lloc"], "| altres:", m["altres"][:3])


if __name__ == "__main__":
    main()
