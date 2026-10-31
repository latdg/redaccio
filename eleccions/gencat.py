# =============================================================================
# RESULTATS ELECTORALS DE LA GENERALITAT — La TdG · 31.10.2026
# Tots els resultats que publica la Generalitat (resultats.dadeselectorals.gencat.cat)
# dels cinc municipis: Parlament, Generals, Senat, Municipals, Europees... de
# totes les convocatòries que hi ha. Desa dades/eleccions-gencat.json per al
# bloc de resultats electorals (un sol desplegable per municipi). Els resultats
# antics no canvien: només es tornen a baixar els processos nous (o amb --forca).
# API: /webelec/api/proces i /webelec/api/proces/<codi>/territori/MU-<INE>/vot
# =============================================================================
import json
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests

ARREL = Path(__file__).resolve().parent.parent
SORTIDA = ARREL / "dades" / "eleccions-gencat.json"
API = "https://resultats.dadeselectorals.gencat.cat/webelec/api"
CAPCALERES = {"User-Agent": "LaTdG-redaccio (https://latdg.github.io/redaccio/)", "Accept": "application/json"}
MUNICIPIS = {"17022": "la Bisbal d'Empordà", "17902": "Forallac", "17057": "Corçà",
             "17901": "Cruïlles, Monells i Sant Sadurní de l'Heura", "17205": "Ullastret"}
# Processos que no tenen resultats per municipi (o no ens afecten)
SALTA_TIPUS = {"V", "C", "D"}   # Aran, consells comarcals, diputacions


def get(cami):
    for intent in range(4):
        try:
            r = requests.get(API + cami, headers=CAPCALERES, timeout=60)
            if r.status_code == 200:
                return r.json()
            if r.status_code == 404:
                return None
        except requests.RequestException as e:
            print("  reintent", cami, e)
        time.sleep(3 * (intent + 1))
    return None


def resum(llista):
    if not llista:
        return None
    vots_c = sum((x.get("vots") or 0) for x in llista)
    # Participació a partir dels percentatges (vots / % sobre cens, vots / % sobre emesos)
    cens = emesos = None
    for x in llista:
        v = x.get("vots") or 0
        if v and x.get("percentatgeCens"):
            cens = round(v / x["percentatgeCens"])
        if v and x.get("percentatgeEmesos"):
            emesos = round(v / x["percentatgeEmesos"])
        if cens and emesos:
            break
    cands = []
    for x in llista:
        c = x.get("candidatura") or {}
        cands.append({
            "sigles": (c.get("sigles") or "").strip(), "nom": (c.get("nom") or "").strip(), "color": c.get("color") or "",
            "logotip": c.get("logotip") or "", "candidat": ((x.get("candidat") or {}).get("nom") if isinstance(x.get("candidat"), dict) else x.get("candidat")) or "",
            "vots": x.get("vots") or 0, "pct": x.get("percentatgeValids"), "escons": x.get("escons"),
        })
    cands.sort(key=lambda c: c["vots"], reverse=True)
    return {"cens": cens, "emesos": emesos, "participacio": (emesos / cens) if cens and emesos else None,
            "votsCandidatures": vots_c, "candidatures": cands}


def main():
    forca = "--forca" in sys.argv
    abans = {}
    if SORTIDA.exists() and not forca:
        try:
            abans = json.loads(SORTIDA.read_text(encoding="utf-8"))
        except ValueError:
            abans = {}
    processos = get("/proces") or []
    print("Processos:", len(processos))
    fets = {p["codi"]: p for m in (abans.get("municipis") or {}).values() for p in m}
    sortida = {"generat": datetime.now(timezone.utc).isoformat(timespec="seconds"),
               "font": "https://resultats.dadeselectorals.gencat.cat/", "municipis": {c: [] for c in MUNICIPIS}}
    for p in sorted(processos, key=lambda x: x.get("data") or 0, reverse=True):
        tipus = ((p.get("tipusProcesElectoral") or {}).get("codi")) or ""
        if tipus in SALTA_TIPUS:
            continue
        codi = p["codi"]
        data = datetime.fromtimestamp((p.get("data") or 0) / 1000, timezone.utc).date().isoformat()
        for ine in MUNICIPIS:
            anterior = next((x for x in (abans.get("municipis") or {}).get(ine, []) if x["codi"] == codi), None)
            if anterior and not forca:
                sortida["municipis"][ine].append(anterior)
                continue
            r = resum(get(f"/proces/{codi}/territori/MU-{ine}/vot"))
            time.sleep(0.3)
            if not r:
                continue
            sortida["municipis"][ine].append({
                "codi": codi, "nom": (p.get("nom") or "").strip(), "tipus": tipus,
                "tipusNom": ((p.get("tipusProcesElectoral") or {}).get("nom")) or "", "data": data,
                "electes": p.get("urlElectes") or "", **r})
        print(codi, data, " · ".join(f"{len(v)}" for v in sortida["municipis"].values()))
    SORTIDA.parent.mkdir(parents=True, exist_ok=True)
    SORTIDA.write_text(json.dumps(sortida, ensure_ascii=False, indent=1), encoding="utf-8")
    print("Desat:", {MUNICIPIS[c]: len(v) for c, v in sortida["municipis"].items()})


if __name__ == "__main__":
    main()
