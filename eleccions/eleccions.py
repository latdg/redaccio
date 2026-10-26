# =============================================================================
# RESULTATS ELECTORALS — La TdG · 26.10.2026
# Microdades del Ministeri de l'Interior (infoelectoral.interior.gob.es), mesa a
# mesa. Per a cada elecció i per als quatre municipis desa a dades/eleccions.json
# la participació, els vots de cada candidatura (i els regidors a les municipals)
# i el detall per secció censal. Format dels fitxers .DAT: el documentat a
# FICHEROS.DOC del Ministeri (vegeu també github.com/JaimeObregon/infoelectoral).
# Les dades d'una elecció no canvien: el workflow només es llança a mà quan n'hi
# ha una de nova (s'afegeix a ELECCIONS).
# =============================================================================
import io
import json
import sys
import zipfile
from datetime import datetime, timezone
from pathlib import Path

import requests

ARREL = Path(__file__).resolve().parent.parent
SORTIDA = ARREL / "dades" / "eleccions.json"
URL = "https://infoelectoral.interior.gob.es/estaticos/docxl/apliextr/{tipus}{any}{mes}_MESA.zip"
PROVINCIA = "17"
MUNICIPIS = {   # codi INE de 3 xifres dins la província -> codi de 5 i nom
    "022": ("17022", "la Bisbal d'Empordà"),
    "057": ("17057", "Corçà"),
    "902": ("17902", "Forallac"),
    "901": ("17901", "Cruïlles, Monells i Sant Sadurní de l'Heura"),
}
# (tipus, any, mes, nom). 04 municipals, 02 Congrés, 07 Parlament Europeu.
ELECCIONS = [
    ("04", "2023", "05", "Municipals 2023"),
    ("02", "2023", "07", "Congrés 2023"),
    ("07", "2024", "06", "Europees 2024"),
    ("02", "2019", "11", "Congrés novembre 2019"),
    ("04", "2019", "05", "Municipals 2019"),
    ("07", "2019", "05", "Europees 2019"),
    ("02", "2019", "04", "Congrés abril 2019"),
    ("04", "2015", "05", "Municipals 2015"),
]
TIPUS = {"04": "municipals", "02": "congres", "07": "europees"}
CAPCALERES = {"User-Agent": "LaTdG-redaccio (https://latdg.github.io/redaccio/)"}


def enter(t):
    t = t.strip()
    return int(t) if t.isdigit() else 0


def llegeix(zf, prefix):
    nom = next((n for n in zf.namelist() if Path(n).name.upper().startswith(prefix)), None)
    if not nom:
        return []
    return zf.read(nom).decode("latin-1").splitlines()


def processa(tipus, any_, mes, nom):
    url = URL.format(tipus=tipus, any=any_, mes=mes)
    r = requests.get(url, headers=CAPCALERES, timeout=(20, 300))
    r.raise_for_status()
    zf = zipfile.ZipFile(io.BytesIO(r.content))
    sufix = f"{tipus}{any_[2:]}{mes}"

    # 03: candidatures (codi -> sigles i nom)
    cands = {}
    for l in llegeix(zf, "03" + sufix):
        cands[l[8:14]] = {"sigles": l[14:64].strip(), "nom": l[64:214].strip()}

    # 09: dades de cada mesa
    mesos = {}
    for l in llegeix(zf, "09" + sufix):
        if l[11:13] != PROVINCIA or l[13:16] not in MUNICIPIS:
            continue
        clau = (l[13:16], l[16:18] + "-" + l[18:22].strip(), l[22])
        mesos[clau] = {
            "cens": enter(l[30:37]) or enter(l[23:30]),
            "blanc": enter(l[65:72]), "nuls": enter(l[72:79]), "cand": enter(l[79:86]),
            "vots": {},
        }
    # 10: vots de cada candidatura a cada mesa
    for l in llegeix(zf, "10" + sufix):
        if l[11:13] != PROVINCIA or l[13:16] not in MUNICIPIS:
            continue
        clau = (l[13:16], l[16:18] + "-" + l[18:22].strip(), l[22])
        if clau in mesos:
            c = l[23:29]
            mesos[clau]["vots"][c] = mesos[clau]["vots"].get(c, 0) + enter(l[29:36])
    # 06 (només municipals): regidors de cada candidatura al municipi
    electes = {}
    if tipus == "04":
        for l in llegeix(zf, "06" + sufix):
            if l[9:11] == PROVINCIA and l[11:14] in MUNICIPIS and l[14:16] == "99":
                electes[(l[11:14], l[16:22])] = enter(l[30:33])

    if not mesos:
        print(nom, ": cap mesa dels quatre municipis")
        return None

    def resum(llista):
        cens = sum(m["cens"] for m in llista)
        blanc, nuls, cand = (sum(m[k] for m in llista) for k in ("blanc", "nuls", "cand"))
        votants = blanc + nuls + cand
        valids = blanc + cand
        vots = {}
        for m in llista:
            for c, v in m["vots"].items():
                vots[c] = vots.get(c, 0) + v
        return cens, votants, blanc, nuls, valids, vots

    municipis = {}
    for m3, (m5, nom_mun) in MUNICIPIS.items():
        seves = {k: v for k, v in mesos.items() if k[0] == m3}
        if not seves:
            continue
        cens, votants, blanc, nuls, valids, vots = resum(list(seves.values()))
        resultats = [{
            "codi": c,
            "sigles": cands.get(c, {}).get("sigles", c),
            "nom": cands.get(c, {}).get("nom", ""),
            "vots": v,
            "pct": round(v / valids * 100, 2) if valids else 0,
            **({"electes": electes.get((m3, c), 0)} if tipus == "04" else {}),
        } for c, v in vots.items() if v > 0]
        resultats.sort(key=lambda x: (-x.get("electes", 0), -x["vots"]))
        seccions = []
        for sec in sorted({k[1] for k in seves}):
            sc, sv, sb, sn, svl, svots = resum([v for k, v in seves.items() if k[1] == sec])
            ord_ = sorted(svots.items(), key=lambda x: -x[1])
            seccions.append({
                "seccio": sec, "meses": sum(1 for k in seves if k[1] == sec),
                "cens": sc, "votants": sv, "participacio": round(sv / sc * 100, 2) if sc else 0,
                "vots": {cands.get(c, {}).get("sigles", c): v for c, v in ord_ if v > 0},
                "valids": svl,
            })
        municipis[m5] = {
            "nom": nom_mun, "cens": cens, "votants": votants,
            "participacio": round(votants / cens * 100, 2) if cens else 0,
            "blanc": blanc, "nuls": nuls, "valids": valids,
            "regidors": sum(r.get("electes", 0) for r in resultats) or None,
            "resultats": resultats, "seccions": seccions,
        }
    print(nom, {m: (d["participacio"], d["resultats"][0]["sigles"]) for m, d in municipis.items()})
    return {
        "id": f"{tipus}{any_}{mes}", "tipus": TIPUS.get(tipus, tipus), "nom": nom,
        "data": f"{any_}-{mes}", "font": url, "municipis": municipis,
    }


def main():
    anterior = {}
    if SORTIDA.exists():
        anterior = {e["id"]: e for e in json.loads(SORTIDA.read_text(encoding="utf-8")).get("eleccions", [])}
    eleccions, errors = [], []
    for t, a, m, n in ELECCIONS:
        ident = f"{t}{a}{m}"
        if ident in anterior and "--forca" not in sys.argv:
            eleccions.append(anterior[ident])   # ja baixada: les dades no canvien
            continue
        try:
            e = processa(t, a, m, n)
            if e:
                eleccions.append(e)
        except Exception as err:
            print("No s'ha pogut baixar", n, err)
            errors.append(f"{n}: {type(err).__name__}: {err}")
            if ident in anterior:
                eleccions.append(anterior[ident])
    (ARREL / "eleccions" / "diagnosi.txt").write_text(
        datetime.now(timezone.utc).isoformat(timespec="seconds") + "\n" + ("\n".join(errors) or "Cap error") + "\n", encoding="utf-8")
    if not eleccions:
        print("Cap elecció: no es toca dades/eleccions.json.")
        return
    SORTIDA.write_text(json.dumps({
        "generat": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "font": "Ministeri de l'Interior (infoelectoral.interior.gob.es), resultats mesa a mesa",
        "eleccions": eleccions,
    }, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")


if __name__ == "__main__":
    main()
