# =============================================================================
# DADES OBERTES DE LA GENERALITAT PER A LA REDACCIÓ — La TdG · 27.10.2026
# Un sol guió per a diversos blocs de La TdG redacció (dades/obertes.json):
#   renda    Renda garantida de ciutadania per municipi (u5i2-b24m), mensual
#   habitatge  Preu del lloguer (qww9-bvhh, trimestral) i impost sobre els
#            habitatges buits (w8kv-kmwv, anual). La taxa turística (q4sr-68c3)
#            no té files dels nostres municipis i no es baixa.
#   ramaderia  Registre d'explotacions ramaderes (7bpt-5azk)
#   residus  Estadística de residus municipals (69zu-w48s), anual
#   escoles  Alumnes matriculats per centre (xvme-26kg) i preinscripció (99md-r3rq)
# Cada apartat es baixa per separat: si un falla, els altres es desen igualment
# (i del que falla es manté el de la revisió anterior).
# =============================================================================
import json
import re
import time
import traceback
import unicodedata
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

import requests

ARREL = Path(__file__).resolve().parent.parent
SORTIDA = ARREL / "dades" / "obertes.json"
API = "https://analisi.transparenciacatalunya.cat/resource/{id}.json"
VISTA = "https://analisi.transparenciacatalunya.cat/api/views/{id}.json"
CAPCALERES = {"User-Agent": "LaTdG-redaccio (https://latdg.github.io/redaccio/)"}
MUNICIPIS = {"17022": "la Bisbal d'Empordà", "17057": "Corçà", "17902": "Forallac",
             "17901": "Cruïlles, Monells i Sant Sadurní de l'Heura"}
# Codis de 6 xifres (amb el dígit de control de l'Idescat)
CODI6 = {"17022": "170221", "17057": "170577", "17902": "179026", "17901": "179011"}
PARAULA = {"17022": "BISBAL D", "17057": "CORCA", "17902": "FORALLAC", "17901": "CRUILLES"}


def pla(t):
    return "".join(c for c in unicodedata.normalize("NFD", str(t or "").upper()) if unicodedata.category(c) != "Mn")


def codi_per_nom(nom):
    p = pla(nom)
    if "BISBAL" in p and ("EMPORD" in p or p.strip() in ("BISBAL D", "LA BISBAL")):
        return "17022"
    for c, k in PARAULA.items():
        if c != "17022" and k in p:
            return c
    return None


def num(v):
    t = str(v if v is not None else "").strip().replace(",", ".")
    if t.startswith("<"):
        return None      # dada protegida (menys de 4 casos)
    try:
        f = float(t)
        return int(f) if f == int(f) else round(f, 3)
    except ValueError:
        return None


def baixa(ident, where=None, select=None, ordre=":id"):
    files, pas = [], 5000
    while True:
        p = {"$limit": pas, "$offset": len(files), "$order": ordre}
        if where:
            p["$where"] = where
        if select:
            p["$select"] = select
        for intent in range(5):
            try:
                r = requests.get(API.format(id=ident), params=p, headers=CAPCALERES, timeout=300)
                r.raise_for_status()
                break
            except Exception as err:
                print(f"{ident}: intent {intent + 1} fallit ({err})")
                time.sleep(30 * (intent + 1))
        else:
            raise RuntimeError(f"{ident}: el servidor no respon")
        lot = r.json()
        files += lot
        if len(lot) < pas:
            return files


def actualitzat(ident):
    try:
        t = requests.get(VISTA.format(id=ident), headers=CAPCALERES, timeout=60).json().get("rowsUpdatedAt")
        return datetime.fromtimestamp(t, timezone.utc).isoformat() if t else None
    except Exception:
        return None


# --- Renda garantida de ciutadania ---------------------------------------------
MESOS = {m: i + 1 for i, m in enumerate(["GENER", "FEBRER", "MARC", "ABRIL", "MAIG", "JUNY", "JULIOL", "AGOST",
                                         "SETEMBRE", "OCTUBRE", "NOVEMBRE", "DESEMBRE"])}


def renda():
    codis = ",".join(f"'{c}'" for c in CODI6.values())
    f = baixa("u5i2-b24m", f"codi_municipi in({codis})")
    per = {}
    for c, c6 in CODI6.items():
        serie = []
        for x in f:
            if x.get("codi_municipi") != c6:
                continue
            m = MESOS.get(pla(x.get("mes")).strip())
            if not m:
                continue
            serie.append({"mes": f"{int(x['any']):04d}-{m:02d}", "titulars": num(x.get("total_titulars")),
                          "beneficiaris": num(x.get("total_beneficiaris")),
                          "prestacio": num(x.get("prestaci_mitjana_mensual"))})
        serie.sort(key=lambda z: z["mes"])
        per[c] = serie[-36:]
    return {"actualitzat": actualitzat("u5i2-b24m"), "municipis": per}


# --- Habitatge: lloguer, habitatges buits, taxa turística -------------------------
def habitatge():
    sortida = {"lloguer": {"actualitzat": actualitzat("qww9-bvhh"), "municipis": {}},
               "buits": {"actualitzat": actualitzat("w8kv-kmwv"), "municipis": {}}}
    codis5 = ",".join(f"'{c}'" for c in MUNICIPIS)
    ll = baixa("qww9-bvhh", f"ambit_territorial='Municipi' AND codi_territorial in({codis5})")
    ordre_t = {"GENER-MARC": 1, "ABRIL-JUNY": 2, "JULIOL-SETEMBRE": 3, "OCTUBRE-DESEMBRE": 4}
    for c in MUNICIPIS:
        files = []
        for x in ll:
            if x.get("codi_territorial") != c:
                continue
            per = pla(x.get("periode")).replace(" ", "")
            files.append({"any": int(x["any"]), "trimestre": ordre_t.get(per), "periode": x.get("periode"),
                          "contractes": num(x.get("habitatges")), "renda": num(x.get("renda")), "tram": x.get("tram_preus")})
        files.sort(key=lambda z: (z["any"], z["trimestre"] or 0))
        sortida["lloguer"]["municipis"][c] = files[-24:]
    codis6 = ",".join(f"'{c}'" for c in CODI6.values())
    hb = baixa("w8kv-kmwv", f"codi in({codis6})")
    for c, c6 in CODI6.items():
        per_any = defaultdict(lambda: {"habitatges": 0, "exempts": 0, "tenidors": 0, "superficie": 0})
        for x in hb:
            if x.get("codi") != c6:
                continue
            a = per_any[int(x["any"])]
            n = num(x.get("habitatges")) or 0
            a["habitatges"] += n
            if pla(x.get("exempt")).startswith("S"):
                a["exempts"] += n
            a["tenidors"] += num(x.get("tenidors")) or 0
            a["superficie"] += num(x.get("superficie_util")) or 0
        sortida["buits"]["municipis"][c] = [{"any": k, **v} for k, v in sorted(per_any.items())]
    return sortida


# --- Ramaderia ---------------------------------------------------------------------
def ramaderia():
    f = baixa("7bpt-5azk", "comarca='Baix Empordà'")
    per = {}
    for c in MUNICIPIS:
        seves = [x for x in f if codi_per_nom(x.get("municipi")) == c and pla(x.get("estat_explotaci_")).startswith("ACTIV")
                 and pla(x.get("estat_subexplotaci_") or "ACTIVA").startswith("ACTIV")]
        explot = {x.get("codi_rega") for x in seves}
        esp = defaultdict(lambda: {"explotacions": set(), "places": 0})
        for x in seves:
            e = esp[x.get("esp_cie") or "Altres"]
            e["explotacions"].add(x.get("codi_rega"))
            # Places: el total de la subexplotació o, si no hi és, la suma de les
            # capacitats parcials (engreix, femelles…). El camp total_ub del registre
            # no és fiable (hi ha explotacions amb més UB que animals) i no es fa servir.
            total = num(x.get("cap_n_m_total_animals")) or 0
            parcials = sum(num(v) or 0 for k, v in x.items() if k.startswith("cap_") and k != "cap_n_m_total_animals")
            e["places"] += total or parcials
        per[c] = {
            "explotacions": len(explot),
            "especies": sorted(({"especie": k, "explotacions": len(v["explotacions"]), "places": round(v["places"])}
                                for k, v in esp.items()), key=lambda z: (-z["explotacions"], -z["places"])),
            "intensiu": len({x.get("codi_rega") for x in seves if pla(x.get("sistema_productiu")).startswith("INTENS")}),
        }
    return {"actualitzat": actualitzat("7bpt-5azk"), "municipis": per}


# --- Residus -----------------------------------------------------------------------
def residus():
    codis6 = ",".join(f"'{c}'" for c in CODI6.values())
    f = baixa("69zu-w48s", f"codi_municipi in({codis6})")
    fr = {"mat_ria_org_nica": "Orgànica", "paper_i_cartr": "Paper i cartró", "vidre": "Vidre",
          "envasos_lleugers": "Envasos", "poda_i_jardineria": "Poda i jardineria", "residus_voluminosos_fusta": "Voluminosos i fusta",
          "runes": "Runes", "t_xtil": "Tèxtil", "raee": "Aparells elèctrics"}
    per = {}
    for c, c6 in CODI6.items():
        anys = []
        for x in sorted((x for x in f if x.get("codi_municipi") == c6), key=lambda x: int(x["any"])):
            anys.append({"any": int(x["any"]), "poblacio": num(x.get("poblaci")),
                         "selectiva": num(x.get("r_s_r_m_total")), "kgHabAny": num(x.get("kg_hab_any")),
                         "kgHabDia": num(x.get("kg_hab_dia")), "total": num(x.get("generaci_residus_municipal")),
                         "fraccions": {nom: num(x.get(k)) for k, nom in fr.items() if num(x.get(k))}})
        per[c] = anys
    # Mitjana de Catalunya del darrer any, per comparar
    try:
        darrer = max(a["any"] for v in per.values() for a in v)
        # Els camps són de text i l'API no els pot sumar: se sumen aquí.
        cat = baixa("69zu-w48s", f"any='{darrer}'", "r_s_r_m_total,generaci_residus_municipal,poblaci")
        # La recollida selectiva és un percentatge: es pondera per les tones de cada municipi.
        s = sum((num(x.get("r_s_r_m_total")) or 0) * (num(x.get("generaci_residus_municipal")) or 0) / 100 for x in cat)
        t, p = (sum(num(x.get(k)) or 0 for x in cat) for k in ("generaci_residus_municipal", "poblaci"))
        catalunya = {"any": darrer, "selectiva": round(s / t * 100, 2) if s and t else None, "kgHabAny": round(t * 1000 / p, 1) if t and p else None}
    except Exception as err:
        print("Mitjana de Catalunya:", err)
        catalunya = None
    return {"actualitzat": actualitzat("69zu-w48s"), "municipis": per, "catalunya": catalunya}


# --- Escoles -----------------------------------------------------------------------
def escoles():
    codis5 = ",".join(f"'{c}'" for c in MUNICIPIS)
    mat = baixa("xvme-26kg", f"codi_municipi_5 in({codis5})")
    cursos = sorted({x.get("curs") for x in mat if x.get("curs")})
    curs = cursos[-1] if cursos else None
    centres = {}
    for x in mat:
        if x.get("curs") != curs:
            continue
        k = x.get("codi_centre")
        c = centres.setdefault(k, {"codi": k, "nom": x.get("denominaci_completa"), "mun": x.get("codi_municipi_5"),
                                   "naturalesa": x.get("nom_naturalesa"), "titularitat": x.get("nom_titularitat"),
                                   "alumnes": 0, "nenes": 0, "nens": 0, "estudis": Counter(), "unitats": 0,
                                   "lat": num(x.get("coordenades_geo_y")), "lon": num(x.get("coordenades_geo_x"))})
        n = num(x.get("matr_cules_total")) or 0
        c["alumnes"] += n
        c["nenes"] += num(x.get("matr_cules_dones")) or 0
        c["nens"] += num(x.get("matr_cules_homes")) or 0
        c["unitats"] += num(x.get("unitats")) or 0
        c["estudis"][x.get("nom_estudis") or "Altres"] += n
    # Evolució dels alumnes per municipi (tots els cursos)
    evol = defaultdict(Counter)
    for x in mat:
        evol[x.get("codi_municipi_5")][x.get("curs")] += num(x.get("matr_cules_total")) or 0
    pre = baixa("99md-r3rq", f"codi_municipi_5 in({codis5})")
    cursos_p = sorted({x.get("curs") for x in pre if x.get("curs")})
    curs_p = cursos_p[-1] if cursos_p else None
    preins = []
    camps_num = set()
    for x in pre:
        if x.get("curs") != curs_p:
            continue
        fila = {"centre": x.get("denominaci_completa"), "codi": x.get("codi_centre"), "mun": x.get("codi_municipi_5"),
                "naturalesa": x.get("nom_naturalesa"), "ensenyament": x.get("nom_ensenyament"), "nivell": x.get("nivell")}
        for k, v in x.items():
            if k.startswith(("oferta", "places", "assignacions", "sol", "demanda", "peticions", "vacants")):
                fila[k] = num(v)
                camps_num.add(k)
        preins.append(fila)
    return {"actualitzatMatricula": actualitzat("xvme-26kg"), "actualitzatPreinscripcio": actualitzat("99md-r3rq"),
            "curs": curs, "cursPreinscripcio": curs_p,
            "centres": sorted(({**c, "estudis": c["estudis"].most_common()} for c in centres.values()), key=lambda z: (z["mun"], -z["alumnes"])),
            "evolucio": {m: [[k, v] for k, v in sorted(c.items())] for m, c in evol.items()},
            "preinscripcio": preins, "campsPreinscripcio": sorted(camps_num)}


def main():
    anterior = json.loads(SORTIDA.read_text(encoding="utf-8")) if SORTIDA.exists() else {}
    sortida = {"generat": datetime.now(timezone.utc).isoformat(timespec="seconds"), "municipis": MUNICIPIS}
    for nom, funcio in [("renda", renda), ("habitatge", habitatge), ("ramaderia", ramaderia), ("residus", residus), ("escoles", escoles)]:
        try:
            sortida[nom] = funcio()
            print(nom, "fet")
        except Exception:
            print(nom, "ha fallat:")
            traceback.print_exc()
            if nom in anterior:
                sortida[nom] = anterior[nom]
    SORTIDA.write_text(json.dumps(sortida, ensure_ascii=False, indent=1), encoding="utf-8")


if __name__ == "__main__":
    main()
