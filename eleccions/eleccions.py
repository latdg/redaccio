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
    "205": ("17205", "Ullastret"),   # 31.10.2026
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
    # 31.10.2026: totes les que el Ministeri té mesa a mesa (mirall de JaimeObregon/infoelectoral).
    ("02", "2016", "06", "Congrés 2016"), ("02", "2015", "12", "Congrés 2015"), ("02", "2011", "11", "Congrés 2011"),
    ("02", "2008", "03", "Congrés 2008"), ("02", "2004", "03", "Congrés 2004"), ("02", "2000", "03", "Congrés 2000"),
    ("02", "1996", "03", "Congrés 1996"), ("02", "1986", "06", "Congrés 1986"), ("02", "1982", "10", "Congrés 1982"),
    ("04", "2011", "05", "Municipals 2011"), ("04", "2007", "05", "Municipals 2007"), ("04", "2003", "05", "Municipals 2003"),
    ("04", "1999", "06", "Municipals 1999"), ("04", "1995", "05", "Municipals 1995"), ("04", "1991", "05", "Municipals 1991"),
    ("04", "1987", "06", "Municipals 1987"),
    ("07", "2014", "05", "Europees 2014"), ("07", "2009", "06", "Europees 2009"), ("07", "2004", "06", "Europees 2004"),
    ("07", "1999", "06", "Europees 1999"), ("07", "1994", "06", "Europees 1994"), ("07", "1989", "06", "Europees 1989"),
    ("07", "1987", "06", "Europees 1987"),
]

# 31.10.2026: la resta, de la Generalitat (resultats.dadeselectorals.gencat.cat), també
# mesa a mesa: totes les del Parlament de Catalunya, els referèndums i les generals,
# municipals i europees que el Ministeri no té mesa a mesa. Una elecció que ja ve del
# Ministeri (mateix tipus, any i mes) no es torna a baixar de la Generalitat.
GENCAT = "https://resultats.dadeselectorals.gencat.cat/webelec/api"
GENCAT_TIPUS = {"A": ("parlament", "Parlament"), "G": ("congres", "Congrés"), "M": ("municipals", "Municipals"),
                "E": ("europees", "Europees"), "R": ("referendum", "")}
EQUIV_MINISTERI = {"G": "02", "M": "04", "E": "07"}
TIPUS = {"04": "municipals", "02": "congres", "07": "europees"}
CAPCALERES = {"User-Agent": "LaTdG-redaccio (https://latdg.github.io/redaccio/)"}


def enter(t):
    t = t.strip()
    return int(t) if t.isdigit() else 0


MIRALL = "https://raw.githubusercontent.com/JaimeObregon/infoelectoral/master/files/{carpeta}/{tipus}{any}{mes}_MESA/{fitxer}"
CARPETES = {"04": "municipales", "02": "congreso", "07": "europeas"}
ZIPS = ARREL / "eleccions" / "zips"   # ZIP baixats a mà del Ministeri (que no deixa connectar des de GitHub)


MINISTERI_OK = None   # 31.10.2026: es prova una sola vegada si el Ministeri respon des d'aquí
INICI = datetime.now(timezone.utc)
MAX_MINUTS = 30        # 31.10.2026: passat aquest temps es desa i es deixa la resta per a la tanda següent


def ministeri_respon():
    global MINISTERI_OK
    if MINISTERI_OK is None:
        try:
            requests.head(URL.format(tipus="04", any="2023", mes="05"), headers=CAPCALERES, timeout=(10, 15))
            MINISTERI_OK = True
        except Exception:
            MINISTERI_OK = False
        print("Ministeri:", "respon" if MINISTERI_OK else "no respon; es fa servir el mirall")
    return MINISTERI_OK


def temps_esgotat():
    return (datetime.now(timezone.utc) - INICI).total_seconds() > MAX_MINUTS * 60


def fitxers(tipus, any_, mes):
    """Torna (font, funció que llegeix un fitxer .DAT pel prefix). Prova, per ordre:
    el Ministeri, un ZIP pujat a eleccions/zips/ i el mirall de JaimeObregon/infoelectoral."""
    nom_zip = f"{tipus}{any_}{mes}_MESA.zip"
    local = ZIPS / nom_zip
    zf = None
    if local.exists():
        zf, font = zipfile.ZipFile(local), "infoelectoral.interior.gob.es (" + nom_zip + ")"
    elif ministeri_respon():
        try:
            r = requests.get(URL.format(tipus=tipus, any=any_, mes=mes), headers=CAPCALERES, timeout=(20, 300))
            r.raise_for_status()
            zf, font = zipfile.ZipFile(io.BytesIO(r.content)), "infoelectoral.interior.gob.es (" + nom_zip + ")"
        except Exception as err:
            print(f"Ministeri no disponible per a {nom_zip}: {type(err).__name__}")
    if zf:
        def llegeix(prefix):
            nom = next((n for n in zf.namelist() if Path(n).name.upper().startswith(prefix)), None)
            return zf.read(nom).decode("latin-1").splitlines() if nom else []
        return font, llegeix

    def llegeix_mirall(prefix):
        r = requests.get(MIRALL.format(carpeta=CARPETES[tipus], tipus=tipus, any=any_, mes=mes, fitxer=prefix + ".DAT"),
                         headers=CAPCALERES, timeout=(20, 600))
        if r.status_code == 404:
            return []
        r.raise_for_status()
        return r.content.decode("latin-1").splitlines()
    if not llegeix_mirall("01" + f"{tipus}{any_[2:]}{mes}"):
        raise RuntimeError(f"{nom_zip}: ni al Ministeri, ni a eleccions/zips/, ni al mirall")
    return "github.com/JaimeObregon/infoelectoral (còpia de " + nom_zip + ")", llegeix_mirall


def processa(tipus, any_, mes, nom):
    font, llegeix = fitxers(tipus, any_, mes)
    sufix = f"{tipus}{any_[2:]}{mes}"

    # 03: candidatures (codi -> sigles i nom)
    cands = {}
    for l in llegeix("03" + sufix):
        cands[l[8:14]] = {"sigles": l[14:64].strip(), "nom": l[64:214].strip()}

    # 09: dades de cada mesa
    mesos = {}
    for l in llegeix("09" + sufix):
        if l[11:13] != PROVINCIA or l[13:16] not in MUNICIPIS:
            continue
        clau = (l[13:16], l[16:18] + "-" + l[18:22].strip(), l[22])
        mesos[clau] = {
            "cens": enter(l[30:37]) or enter(l[23:30]),
            "blanc": enter(l[65:72]), "nuls": enter(l[72:79]), "cand": enter(l[79:86]),
            "vots": {},
        }
    # 10: vots de cada candidatura a cada mesa
    for l in llegeix("10" + sufix):
        if l[11:13] != PROVINCIA or l[13:16] not in MUNICIPIS:
            continue
        clau = (l[13:16], l[16:18] + "-" + l[18:22].strip(), l[22])
        if clau in mesos:
            c = l[23:29]
            mesos[clau]["vots"][c] = mesos[clau]["vots"].get(c, 0) + enter(l[29:36])
    # 06 (només municipals): regidors de cada candidatura al municipi
    electes = {}
    if tipus == "04":
        for l in llegeix("06" + sufix):
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
        "data": f"{any_}-{mes}", "font": font, "municipis": municipis,
    }


def csv_gencat(zf, quin):
    nom = next((n for n in zf.namelist() if quin in n), None)
    if not nom:
        return []
    files = zf.read(nom).decode("utf-8-sig", errors="replace").splitlines()
    if not files:
        return []
    cap = files[0].split(";")
    return [dict(zip(cap, l.split(";"))) for l in files[1:] if l.strip()]


def processa_gencat(codi, nom, data, tipus, nomes=None):
    municipis = {}
    for m3, (m5, nom_mun) in MUNICIPIS.items():
        if nomes and m5 not in nomes:
            continue
        r = requests.get(f"{GENCAT}/proces/{codi}/nivellTerritorial/ME/territori/{m5}/exportacio",
                         headers=CAPCALERES, timeout=120)
        if r.status_code != 200 or r.content[:2] != b"PK":
            continue
        zf = zipfile.ZipFile(io.BytesIO(r.content))
        part = csv_gencat(zf, "Participaci")
        vots = csv_gencat(zf, "Vots-ME")
        if not part:
            continue
        clau = lambda x: (x.get("Districte", "").strip() or "01") + "-" + x.get("Secció", "").strip()
        mesos = {}
        for x in part:
            k = (clau(x), x.get("Mesa", "").strip())
            mesos[k] = {"cens": enter(x.get("Cens", "")), "nuls": enter(x.get("Vots nuls", "")),
                        "blanc": enter(x.get("Vots en blanc", "")), "cand": enter(x.get("Vots a candidatures", "")), "vots": {}}
        noms = {}
        for x in vots:
            k = (clau(x), x.get("Mesa", "").strip())
            sig = (x.get("Sigles Candidatura") or x.get("Nom Candidatura") or "").strip()
            noms[sig] = (x.get("Nom Candidatura") or "").strip()
            if k in mesos:
                mesos[k]["vots"][sig] = mesos[k]["vots"].get(sig, 0) + enter(x.get("Vots", ""))
        llista = list(mesos.values())
        cens = sum(m["cens"] for m in llista)
        blanc, nuls, cand = (sum(m[k] for m in llista) for k in ("blanc", "nuls", "cand"))
        votants, valids = blanc + nuls + cand, blanc + cand
        tot = {}
        for m in llista:
            for c, v in m["vots"].items():
                tot[c] = tot.get(c, 0) + v
        resultats = sorted(({"codi": c, "sigles": c, "nom": noms.get(c, ""), "vots": v,
                             "pct": round(v / valids * 100, 2) if valids else 0} for c, v in tot.items() if v > 0),
                           key=lambda x: -x["vots"])
        seccions = []
        for sec in sorted({k[0] for k in mesos}):
            seves = [v for k, v in mesos.items() if k[0] == sec]
            sc = sum(m["cens"] for m in seves)
            sv = sum(m["blanc"] + m["nuls"] + m["cand"] for m in seves)
            svots = {}
            for m in seves:
                for c, v in m["vots"].items():
                    svots[c] = svots.get(c, 0) + v
            seccions.append({"seccio": sec, "meses": len(seves), "cens": sc, "votants": sv,
                             "participacio": round(sv / sc * 100, 2) if sc else 0,
                             "vots": {c: v for c, v in sorted(svots.items(), key=lambda x: -x[1]) if v > 0},
                             "valids": sum(m["blanc"] + m["cand"] for m in seves)})
        municipis[m5] = {"nom": nom_mun, "cens": cens, "votants": votants,
                         "participacio": round(votants / cens * 100, 2) if cens else 0,
                         "blanc": blanc, "nuls": nuls, "valids": valids, "regidors": None,
                         "resultats": resultats, "seccions": seccions}
    if not municipis:
        return None
    print(nom, {m: (d["participacio"], d["resultats"][0]["sigles"] if d["resultats"] else "") for m, d in municipis.items()})
    return {"id": codi, "tipus": tipus, "nom": nom, "data": data[:7],
            "font": "Generalitat de Catalunya (resultats.dadeselectorals.gencat.cat), mesa a mesa", "municipis": municipis}


def eleccions_gencat(ja_hi_son):
    """(codi, nom, data, tipus) de cada procés de la Generalitat que s'ha d'afegir."""
    r = requests.get(GENCAT + "/proces", headers=CAPCALERES, timeout=60)
    r.raise_for_status()
    surt = []
    for p in r.json():
        lletra = (p.get("tipusProcesElectoral") or {}).get("codi", "")
        if lletra not in GENCAT_TIPUS:
            continue
        data = datetime.fromtimestamp((p.get("data") or 0) / 1000, timezone.utc).strftime("%Y-%m-%d")
        equiv = EQUIV_MINISTERI.get(lletra)
        if equiv and any(i.startswith(equiv + data[:4]) for i in ja_hi_son):
            continue   # ja la tenim del Ministeri
        tipus, prefix = GENCAT_TIPUS[lletra]
        if lletra == "R":
            nom = (p.get("nom") or "Referèndum").strip()
            nom = nom if nom[-4:].isdigit() else nom + " " + data[:4]
        else:
            nom = prefix + " " + data[:4]
            if lletra == "G" and sum(1 for q in r.json() if q["codi"][:5] == p["codi"][:5]) > 1:
                nom = prefix + " " + ("abril " if p["codi"].endswith("1") else "novembre ") + data[:4]
        surt.append((p["codi"], nom, data, tipus))
    return surt


def desa(eleccions):
    llista = sorted(eleccions, key=lambda e: e["data"], reverse=True)
    SORTIDA.write_text(json.dumps({
        "generat": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "font": "Ministeri de l'Interior (infoelectoral.interior.gob.es) i Generalitat de Catalunya, resultats mesa a mesa",
        "eleccions": llista,
    }, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")


def main():
    anterior = {}
    if SORTIDA.exists():
        anterior = {e["id"]: e for e in json.loads(SORTIDA.read_text(encoding="utf-8")).get("eleccions", [])}
    eleccions, errors = [], []
    pendents = []
    for t, a, m, n in ELECCIONS:
        ident = f"{t}{a}{m}"
        if ident in anterior and "--forca" not in sys.argv:
            eleccions.append(anterior[ident])   # ja baixada: les dades no canvien
            continue
        if temps_esgotat():
            pendents.append(n)
            continue
        try:
            e = processa(t, a, m, n)
            if e:
                eleccions.append(e)
                desa(eleccions + [x for k, x in anterior.items() if k not in {y["id"] for y in eleccions}])
        except Exception as err:
            print("No s'ha pogut baixar", n, err)
            errors.append(f"{n}: {type(err).__name__}: {err}")
            if ident in anterior:
                eleccions.append(anterior[ident])
    # 31.10.2026: si a una elecció del Ministeri hi falta algun municipi (per exemple,
    # Ullastret a les municipals del 2023), s'agafa de la Generalitat, mesa a mesa.
    try:
        processos = requests.get(GENCAT + "/proces", headers=CAPCALERES, timeout=60).json()
    except Exception:
        processos = []
    lletra_de = {v: k for k, v in EQUIV_MINISTERI.items()}
    for e in eleccions:
        if temps_esgotat():
            break
        falten = [m5 for m5, _ in MUNICIPIS.values() if m5 not in e["municipis"]]
        lletra = lletra_de.get(e["id"][:2])
        if not falten or not lletra:
            continue
        p = next((q for q in processos if q["codi"][0] == lletra and
                  datetime.fromtimestamp((q.get("data") or 0) / 1000, timezone.utc).strftime("%Y-%m") == e["data"]), None)
        if not p:
            continue
        try:
            extra = processa_gencat(p["codi"], e["nom"], e["data"], e["tipus"], nomes=falten)
            if extra:
                e["municipis"].update(extra["municipis"])
                e["completatAmb"] = "Generalitat (" + ", ".join(m["nom"] for m in extra["municipis"].values()) + ")"
        except Exception as err:
            errors.append(f"{e['nom']} (completar): {type(err).__name__}: {err}")

    # 31.10.2026: les de la Generalitat que no són del Ministeri.
    try:
        for codi, nom, data, tipus in eleccions_gencat({e["id"] for e in eleccions}):
            if codi in anterior and "--forca" not in sys.argv:
                eleccions.append(anterior[codi])
                continue
            if temps_esgotat():
                pendents.append(nom)
                continue
            try:
                e = processa_gencat(codi, nom, data, tipus)
                if e:
                    eleccions.append(e)
                    desa(eleccions)
            except Exception as err:
                print("No s'ha pogut baixar", nom, err)
                errors.append(f"{nom}: {type(err).__name__}: {err}")
                if codi in anterior:
                    eleccions.append(anterior[codi])
    except Exception as err:
        errors.append(f"Generalitat: {type(err).__name__}: {err}")
    eleccions.sort(key=lambda e: e["data"], reverse=True)
    if pendents:
        errors.append("Pendents per a la tanda següent (temps esgotat): " + ", ".join(pendents))
        print("::warning::Queden eleccions per baixar: es tornarà a llançar sol.")
        (ARREL / "eleccions" / "pendents.txt").write_text("\n".join(pendents) + "\n", encoding="utf-8")
    else:
        (ARREL / "eleccions" / "pendents.txt").unlink(missing_ok=True)
    (ARREL / "eleccions" / "diagnosi.txt").write_text(
        datetime.now(timezone.utc).isoformat(timespec="seconds") + "\n" + ("\n".join(errors) or "Cap error") + "\n", encoding="utf-8")
    if not eleccions:
        print("Cap elecció: no es toca dades/eleccions.json.")
        return
    desa(eleccions)


if __name__ == "__main__":
    main()
