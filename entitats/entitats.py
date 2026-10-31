# =============================================================================
# ENTITATS I ASSOCIACIONS — La TdG · 27.10.2026
# Registre d'entitats de Catalunya (Departament de Justícia, dades obertes,
# conjunt y6fz-g3ff): associacions, fundacions, federacions… Agrupa els nuclis
# en el seu municipi i desa a dades/entitats.json, per a cada un dels quatre:
# quantes n'hi ha i de quin tipus, les inscrites cada any, les dels darrers
# 12 mesos i les noves des de la revisió anterior.
# 27.10.2026: es desen l'adreça, el telèfon, la junta (Òrgans de govern,
# i46c-ebpp) i els fundadors quan n'hi ha: la redacció els necessita per
# contactar-hi i saber qui hi ha. Són les mateixes dades que publica la Generalitat.
JUNTES = "https://analisi.transparenciacatalunya.cat/resource/i46c-ebpp.json"
# =============================================================================
import json
import re
import time
import unicodedata
from collections import Counter
from datetime import datetime, timedelta, timezone
from pathlib import Path

import requests

ARREL = Path(__file__).resolve().parent.parent
SORTIDA = ARREL / "dades" / "entitats.json"
ESTAT = ARREL / "entitats" / "estat.json"     # id de les entitats ja vistes, per detectar-ne de noves
API = "https://analisi.transparenciacatalunya.cat/resource/y6fz-g3ff.json"
VISTA = "https://analisi.transparenciacatalunya.cat/api/views/y6fz-g3ff.json"
CAPCALERES = {"User-Agent": "LaTdG-redaccio (https://latdg.github.io/redaccio/)"}
CAMPS = ("id_entitat,tipus_entitat,nom_entitat,num_inscripcio,data_inscripcio,nom_poblacio,codi_postal,adreca,telefon,fundadors,"
         "classificacio_general,classificacio_especifica,contingut_finalitats,estat,utilitat_publica")
# Nuclis de cada municipi tal com surten al registre (sense accents ni majúscules).
NUCLIS = {
    "17022": ["bisbal d'emporda", "castell d'emporda", "sant pol", "la bisbal d'emporda"],
    "17057": ["corca", "casavells", "matajudaica", "cassa de pelras"],
    "17902": ["forallac", "fonteta", "peratallada", "vulpellac", "canapost", "sant climent de peralta"],
    "17901": ["cruilles, monells i sant sadurni de l'heura", "cruilles", "monells", "sant sadurni de l'heura",
              "sant miquel de cruilles", "santa pellaia"],
    "17205": ["ullastret"],   # 31.10.2026
}
NOMS = {"17022": "la Bisbal d'Empordà", "17057": "Corçà", "17902": "Forallac", "17901": "Cruïlles, Monells i Sant Sadurní de l'Heura", "17205": "Ullastret"}


def pla(t):
    t = "".join(c for c in unicodedata.normalize("NFD", str(t or "").lower()) if unicodedata.category(c) != "Mn")
    return t.replace("’", "'").strip()


def municipi(x):
    p = pla(x.get("nom_poblacio"))
    p = re.sub(r"^(.*), (la|el|les|els|l')$", lambda m: m.group(2) + ("" if m.group(2) == "l'" else " ") + m.group(1), p)   # «Bisbal d'Empordà, la» -> «la bisbal d'emporda»
    for codi, nuclis in NUCLIS.items():
        if p in nuclis:
            return codi
    return None


def baixa():
    files, pas = [], 5000
    while True:
        p = {"$select": CAMPS, "$where": "nom_comarca='Baix Empordà'", "$limit": pas, "$offset": len(files), "$order": ":id"}
        for intent in range(5):
            try:
                r = requests.get(API, params=p, headers=CAPCALERES, timeout=300)
                r.raise_for_status()
                break
            except Exception as err:
                print(f"Intent {intent + 1} fallit ({err})")
                time.sleep(30 * (intent + 1))
        else:
            raise RuntimeError("El servidor no respon")
        lot = r.json()
        files += lot
        if len(lot) < pas:
            return files


def fitxa(x):
    fin = " ".join(str(x.get("contingut_finalitats") or "").split())
    return {
        "id": x.get("id_entitat"),
        "nom": " ".join(str(x.get("nom_entitat") or "").split()),
        "tipus": x.get("tipus_entitat"),
        "data": (x.get("data_inscripcio") or "")[:10],
        "nucli": x.get("nom_poblacio"),
        "adreca": " ".join(str(x.get("adreca") or "").split()),
        "cp": x.get("codi_postal"),
        "telefon": " ".join(str(x.get("telefon") or "").split()),
        "ambit": x.get("classificacio_general"),
        "detall": (x.get("classificacio_especifica") or "").replace("|", " · ").capitalize(),
        "finalitats": fin[:400] + ("…" if len(fin) > 400 else ""),
        "utilitatPublica": str(x.get("utilitat_publica", "")).lower().startswith("s"),
        "fundadors": " ".join(str(x.get("fundadors") or "").split()),
        "junta": JUNTA.get(x.get("id_entitat"), []),
    }


JUNTA = {}


def baixa_juntes(ids):
    """Càrrecs de la junta de cada entitat (per lots de 60 id), ordenats com al registre."""
    ids = sorted(i for i in ids if i)
    for n in range(0, len(ids), 60):
        llista = ",".join(f"'{i}'" for i in ids[n:n + 60])
        for intent in range(5):
            try:
                r = requests.get(JUNTES, params={"$where": f"id_entitat in({llista})", "$limit": 5000},
                                 headers=CAPCALERES, timeout=120)
                r.raise_for_status()
                break
            except Exception as err:
                print(f"Juntes: intent {intent + 1} fallit ({err})")
                time.sleep(20 * (intent + 1))
        else:
            continue
        for f in r.json():
            JUNTA.setdefault(f.get("id_entitat"), []).append((int(f.get("ordre_carrec") or 999), f.get("carrec") or "", f.get("persona") or ""))
    for k, v in JUNTA.items():
        JUNTA[k] = [{"carrec": c, "persona": " ".join(p.split())} for _, c, p in sorted(v)]
    print(len(JUNTA), "entitats amb junta")


def main():
    files = baixa()
    print(len(files), "entitats al Baix Empordà")
    try:
        t = requests.get(VISTA, headers=CAPCALERES, timeout=60).json().get("rowsUpdatedAt")
        actualitzat = datetime.fromtimestamp(t, timezone.utc).isoformat() if t else None
    except Exception:
        actualitzat = None
    vistes = set(json.loads(ESTAT.read_text(encoding="utf-8"))) if ESTAT.exists() else None
    fa12 = (datetime.now() - timedelta(days=365)).strftime("%Y-%m-%d")
    any_actual = datetime.now().year

    nuclis_no = Counter()
    municipis, totes_ids = {}, set()
    for x in files:
        c = municipi(x)
        if not c:
            continue
        municipis.setdefault(c, []).append(x)
        totes_ids.add(x.get("id_entitat"))
    for x in files:
        if not municipi(x) and any(k in pla(x.get("nom_poblacio")) for k in ("bisbal", "corc", "forallac", "cruilles", "monells", "heura", "peratallada", "vulpellac")):
            nuclis_no[x.get("nom_poblacio")] += 1
    if nuclis_no:
        print("Nuclis semblants que no s'han assignat:", dict(nuclis_no))

    baixa_juntes(totes_ids)
    sortida = {"generat": datetime.now(timezone.utc).isoformat(timespec="seconds"), "actualitzatFont": actualitzat,
               "font": "Registre d'entitats de Catalunya (Departament de Justícia), dades obertes de la Generalitat",
               "primeraRevisio": vistes is None, "municipis": {}}
    for c, nom in NOMS.items():
        seves = municipis.get(c, [])
        actives = [x for x in seves if pla(x.get("estat")) == "inscrita"]
        per_any = Counter((x.get("data_inscripcio") or "")[:4] for x in seves)
        recents = sorted((fitxa(x) for x in seves if (x.get("data_inscripcio") or "")[:10] >= fa12), key=lambda f: f["data"], reverse=True)
        noves = [] if vistes is None else sorted((fitxa(x) for x in seves if x.get("id_entitat") not in vistes),
                                                  key=lambda f: f["data"], reverse=True)
        sortida["municipis"][c] = {
            "nom": nom,
            "total": len(actives),
            "inactives": len(seves) - len(actives),
            "tipus": Counter(x.get("tipus_entitat") or "Altres" for x in actives).most_common(),
            "ambits": Counter(x.get("classificacio_general") or "Sense classificar" for x in actives).most_common(12),
            "perAny": [[str(a), per_any.get(str(a), 0)] for a in range(any_actual - 14, any_actual + 1)],
            "recents": recents,
            "totes": sorted((fitxa(x) for x in actives), key=lambda f: pla(f["nom"])),
            "noves": noves,
        }
        print(nom, len(actives), "actives;", len(recents), "dels darrers 12 mesos;", len(noves), "noves")
    SORTIDA.write_text(json.dumps(sortida, ensure_ascii=False, indent=1), encoding="utf-8")
    ESTAT.write_text(json.dumps(sorted(i for i in totes_ids if i)), encoding="utf-8")


if __name__ == "__main__":
    main()
