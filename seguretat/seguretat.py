# =============================================================================
# SEGURETAT I EMERGÈNCIES — La TdG · 27.10.2026
# Tres fonts de dades obertes de la Generalitat, mes a mes:
#   - Fets penals coneguts, resolts i detencions dels Mossos (qnyt-emjc), per
#     àrea bàsica policial: l'ABP Baix Empordà - La Bisbal (més gran que els
#     quatre municipis).
#   - Actuacions dels Bombers (g2ay-3vnj), per municipi.
#   - Incidents operatius del 112 (jq8m-d7cw), per municipi i tipus.
# Desa dades/seguretat.json amb la sèrie mensual, el desglossament dels darrers
# 12 mesos i la comparació amb els 12 anteriors. Es revisa cada setmana.
# =============================================================================
import json
import time
import unicodedata
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

import requests

ARREL = Path(__file__).resolve().parent.parent
SORTIDA = ARREL / "dades" / "seguretat.json"
API = "https://analisi.transparenciacatalunya.cat/resource/{id}.json"
VISTA = "https://analisi.transparenciacatalunya.cat/api/views/{id}.json"
CAPCALERES = {"User-Agent": "LaTdG-redaccio (https://latdg.github.io/redaccio/)"}
ABP = "ABP Baix Empordà - La Bisbal"
MUNICIPIS = {"17022": ("la Bisbal d'Empordà", "BISBAL D"), "17057": ("Corçà", "CORCA"),
             "17902": ("Forallac", "FORALLAC"), "17901": ("Cruïlles, Monells i Sant Sadurní de l'Heura", "CRUILLES")}
ANY_INICI = datetime.now().year - 3


def pla(t):
    return "".join(c for c in unicodedata.normalize("NFD", str(t or "").upper()) if unicodedata.category(c) != "Mn")


def num(v):
    try:
        return int(float(v))
    except (TypeError, ValueError):
        return 0


def baixa(ident, where, select=None):
    """Baixa per lots de 5.000 files; si el servidor falla (503, temps esgotat…), torna a provar-ho."""
    files, pas = [], 5000
    while True:
        p = {"$where": where, "$limit": pas, "$offset": len(files), "$order": ":id"}
        if select:
            p["$select"] = select
        for intent in range(5):
            try:
                r = requests.get(API.format(id=ident), params=p, headers=CAPCALERES, timeout=300)
                r.raise_for_status()
                break
            except Exception as err:
                print(f"{ident}: intent {intent + 1} fallit ({err}); es torna a provar")
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


def recent(files):
    """Només els darrers anys (es filtra aquí, perquè el tipus del camp «any» varia d'un conjunt a l'altre)."""
    return [x for x in files if num(x.get("any")) >= ANY_INICI]


def mes(any_, m):
    return f"{int(any_):04d}-{int(m):02d}"


def enrere(ym, n):
    a, m = map(int, ym.split("-"))
    t = a * 12 + (m - 1) - n
    return f"{t // 12:04d}-{t % 12 + 1:02d}"


def finestres(mesos, fi=None):
    """Els 12 mesos de calendari que acaben a «fi» (o al darrer mes amb dades) i els 12 anteriors."""
    tots = sorted(mesos)
    fi = fi or (tots[-1] if tots else None)
    if not fi:
        return [], []
    darrers = [enrere(fi, n) for n in range(11, -1, -1)]
    a, m = map(int, darrers[0].split("-"))
    abans = [f"{a - 1:04d}-{m:02d}"]
    while len(abans) < 12:
        a2, m2 = map(int, abans[-1].split("-"))
        m2 += 1
        if m2 > 12:
            a2, m2 = a2 + 1, 1
        abans.append(f"{a2:04d}-{m2:02d}")
    return darrers, abans


def bloc(files, clau_mes, clau_tipus, valor=lambda f: 1, fi=None):
    serie = Counter()
    tipus = defaultdict(Counter)
    for f in files:
        k = clau_mes(f)
        v = valor(f)
        serie[k] += v
        tipus[clau_tipus(f)][k] += v
    darrers, abans = finestres([k for k, v in serie.items()], fi)
    # Sèrie contínua (els mesos sense cap cas, a zero) fins al darrer mes de la finestra.
    mesos = sorted(serie)
    continua = []
    if mesos:
        k, fi_s = mesos[0], max(mesos[-1], darrers[-1] if darrers else mesos[-1])
        while k <= fi_s:
            continua.append([k, serie.get(k, 0)])
            k = enrere(k, -1)
    return {
        "serie": continua,
        "darrerMes": darrers[-1] if darrers else None,
        "periode": [darrers[0], darrers[-1]] if darrers else None,
        "total12": sum(serie[k] for k in darrers),
        "totalAbans12": sum(serie[k] for k in abans),
        "tipus": sorted(({"tipus": t or "Altres", "n": sum(c[k] for k in darrers), "abans": sum(c[k] for k in abans),
                          "darrerMes": c[darrers[-1]] if darrers else 0} for t, c in tipus.items()),
                        key=lambda x: -x["n"]),
    }


def main():
    sortida = {"generat": datetime.now(timezone.utc).isoformat(timespec="seconds"), "municipis": {c: n for c, (n, _) in MUNICIPIS.items()}}

    # 1. Fets penals (ABP)
    f = recent(baixa("qnyt-emjc", f"rea_b_sica_policial_abp='{ABP}'"))
    coneguts = bloc(f, lambda x: mes(x["any"], x["mes"]), lambda x: x.get("tipus_de_fet"), lambda x: num(x.get("coneguts")))
    resolts = bloc(f, lambda x: mes(x["any"], x["mes"]), lambda x: x.get("tipus_de_fet"), lambda x: num(x.get("resolts")))
    detencions = bloc(f, lambda x: mes(x["any"], x["mes"]), lambda x: x.get("tipus_de_fet"), lambda x: num(x.get("detencions")))
    resolts_t = {t["tipus"]: t for t in resolts["tipus"]}
    det_t = {t["tipus"]: t for t in detencions["tipus"]}
    for t in coneguts["tipus"]:
        t["resolts"] = resolts_t.get(t["tipus"], {}).get("n", 0)
        t["detencions"] = det_t.get(t["tipus"], {}).get("n", 0)
    # 27.10.2026: el darrer mes, tipus a tipus, comparat amb el mateix mes de l'any anterior.
    dm = coneguts["darrerMes"]
    mes_abans = f"{int(dm[:4]) - 1}{dm[4:]}" if dm else None
    det = defaultdict(lambda: {"coneguts": 0, "resolts": 0, "detencions": 0, "abans": 0, "titol": ""})
    for x in f:
        k = mes(x["any"], x["mes"])
        if k not in (dm, mes_abans):
            continue
        t = det[x.get("tipus_de_fet") or "Altres"]
        t["titol"] = x.get("t_tol_codi_penal") or t["titol"]
        if k == dm:
            t["coneguts"] += num(x.get("coneguts")); t["resolts"] += num(x.get("resolts")); t["detencions"] += num(x.get("detencions"))
        else:
            t["abans"] += num(x.get("coneguts"))
    darrer_mes = sorted(({"tipus": k, **v} for k, v in det.items() if v["coneguts"] or v["detencions"] or v["abans"]),
                        key=lambda z: (-z["coneguts"], -z["detencions"]))
    sortida["fetsPenals"] = {"abp": ABP, "actualitzat": actualitzat("qnyt-emjc"), **coneguts,
                             "darrerMesDetall": darrer_mes, "mesAnyAnterior": mes_abans,
                             "resolts12": resolts["total12"], "detencions12": detencions["total12"],
                             "serieDetencions": detencions["serie"]}
    print("Fets penals:", len(f), "files; darrer mes", coneguts["darrerMes"], "; 12 mesos:", coneguts["total12"])

    # 2. Bombers (per municipi)
    codis = ",".join(f"'{c}'" for c in MUNICIPIS)
    b = recent(baixa("g2ay-3vnj", f"codi_ine in({codis})",
              "any,mes,codi_ine,tal_nom_alarma,tga_nom_grupo,urgents,act_dat_actuacio"))
    sortida["bombers"] = {"actualitzat": actualitzat("g2ay-3vnj"), "municipis": {}}
    fi_b = max((mes(x["any"], x["mes"]) for x in b), default=None)   # mateix període per als quatre
    for c in MUNICIPIS:
        seus = [x for x in b if x.get("codi_ine") == c]
        urgents = [x for x in seus if str(x.get("urgents", "")).upper().startswith("S")]
        d = bloc(seus, lambda x: mes(x["any"], x["mes"]), lambda x: x.get("tal_nom_alarma"), fi=fi_b)
        d["urgents12"] = bloc(urgents, lambda x: mes(x["any"], x["mes"]), lambda x: x.get("tal_nom_alarma"), fi=fi_b)["total12"] if urgents else 0
        d["grups"] = bloc(seus, lambda x: mes(x["any"], x["mes"]), lambda x: x.get("tga_nom_grupo"), fi=fi_b)["tipus"]
        d["tipus"] = d["tipus"][:15]
        # 27.10.2026: les darreres actuacions, amb el dia (la font no dona ni l'hora ni l'adreça).
        d["darreres"] = [{"data": (x.get("act_dat_actuacio") or "")[:10], "tipus": x.get("tal_nom_alarma") or "",
                          "grup": x.get("tga_nom_grupo") or "", "urgent": str(x.get("urgents", "")).upper().startswith("S")}
                         for x in sorted(seus, key=lambda x: x.get("act_dat_actuacio") or "", reverse=True)[:40]]
        sortida["bombers"]["municipis"][c] = d
    print("Bombers:", len(b), "actuacions")

    # 3. 112 (per municipi; el nom ve en majúscules i sense accents)
    i = recent(baixa("jq8m-d7cw", f"comarca='BAIX EMPORDA'"))
    sortida["e112"] = {"actualitzat": actualitzat("jq8m-d7cw"), "municipis": {}, "comarca": {}}
    fi_i = max((mes(x["any"], x["mes"]) for x in i), default=None)
    for c, (_, clau) in MUNICIPIS.items():
        seus = [x for x in i if clau in pla(x.get("municipi"))]
        sortida["e112"]["municipis"][c] = bloc(seus, lambda x: mes(x["any"], x["mes"]), lambda x: x.get("tipus"), lambda x: num(x.get("incidents")), fi=fi_i)
    sortida["e112"]["comarca"] = {k: v for k, v in bloc(i, lambda x: mes(x["any"], x["mes"]), lambda x: x.get("tipus"),
                                                        lambda x: num(x.get("incidents"))).items() if k != "serie"}
    print("112:", len(i), "files de la comarca")

    SORTIDA.write_text(json.dumps(sortida, ensure_ascii=False, indent=1), encoding="utf-8")


if __name__ == "__main__":
    main()
