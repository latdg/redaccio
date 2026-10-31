# =============================================================================
# E-TAULERS DE SEU-E.CAT — La TdG · 27.10.2026
# Llegeix el canal RSS de l'e-tauler (seu-e.cat) i en desa els anuncis de
# l'última setmana a dades/tauler-<clau>.json. El panell els posa al bloc dels
# taulers d'anuncis, cadascun al seu lloc.
# 31.10.2026: a més del Consorci de les Gavarres, l'Ajuntament d'Ullastret.
# =============================================================================
import json
import re
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from zoneinfo import ZoneInfo

HORA_LOCAL = ZoneInfo("Europe/Madrid")   # el canal dona les dates en hora de Greenwich

import requests

ARREL = Path(__file__).resolve().parent.parent
# (clau del fitxer, codi de l'ens a seu-e.cat, nom)
ENS = [("gavarres", "9813510007", "Consorci de les Gavarres"),
       ("ullastret", "1720570005", "Ajuntament d'Ullastret")]
RSS = "https://tauler.seu-e.cat/api/rss?ens={ens}&locale=ca&page={p}"
CAPCALERES = {"User-Agent": "Mozilla/5.0 (LaTdG-redaccio; latdg@laguait.cat)"}
DIES = 7


def data_item(it):
    """La data de publicació, en ISO (aaaa-mm-dd). Prova pubDate (RFC 822) i, si no, dd/mm/aaaa del text."""
    for camp in ("pubDate", "{http://purl.org/dc/elements/1.1/}date"):
        t = (it.findtext(camp) or "").strip()
        if not t:
            continue
        try:
            return parsedate_to_datetime(t).astimezone(HORA_LOCAL).date()
        except Exception:
            pass
        try:
            return datetime.fromisoformat(t.replace("Z", "+00:00")).astimezone(HORA_LOCAL).date()
        except Exception:
            pass
    text = " ".join((it.findtext(c) or "") for c in ("title", "description"))
    m = re.search(r"(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{4})", text)
    if m:
        try:
            return datetime(int(m.group(3)), int(m.group(2)), int(m.group(1))).date()
        except ValueError:
            pass
    return None


def llegeix(clau, ens, nom):
    limit = (datetime.now(HORA_LOCAL) - timedelta(days=DIES)).date()
    items, vistos, darrer = [], set(), None
    for p in range(1, 4):   # com a molt tres pàgines; s'atura quan arriba a anuncis d'abans de la setmana
        r = requests.get(RSS.format(ens=ens, p=p), headers=CAPCALERES, timeout=60)
        r.raise_for_status()
        arrel = ET.fromstring(r.content)
        pagina = arrel.findall(".//item")
        # Registre: quants anuncis porta la pàgina i les dates dels primers (per veure-ho al workflow).
        print(f"{nom} · pàgina {p}: {len(pagina)} anuncis; primeres dates: {[str(data_item(x)) for x in pagina[:5]]}")
        if p == 1 and pagina:
            print("Primer anunci tal com arriba:", ET.tostring(pagina[0], encoding="unicode")[:800])
        if not pagina:
            print("Començament de la resposta:", r.text[:500])
            break
        antics = 0
        for it in pagina:
            link = (it.findtext("link") or "").strip()
            titol = re.sub(r"\s+", " ", (it.findtext("title") or "")).strip()
            d = data_item(it)
            if not titol or link in vistos:
                continue
            vistos.add(link)
            # El darrer anunci publicat, tingui la data que tingui (si la setmana és buida, el panell el mostra a «Anteriors»).
            if d and (not darrer or d.isoformat() > darrer["data"]):
                darrer = {"titol": titol, "link": link, "data": d.isoformat()}
            if d and d < limit:
                antics += 1
                continue
            items.append({"titol": titol, "link": link, "data": d.isoformat() if d else ""})
        if antics:
            break
    items.sort(key=lambda x: x["data"], reverse=True)
    print(f"{nom}: {len(items)} anuncis de l'última setmana")
    (ARREL / "dades" / f"tauler-{clau}.json").write_text(json.dumps({"generat": datetime.now(timezone.utc).isoformat(timespec="seconds"),
                                   "font": f"https://tauler.seu-e.cat/inici?idEns={ens}",
                                   "items": items, "darrer": darrer}, ensure_ascii=False, indent=1), encoding="utf-8")


def main():
    errors = 0
    for clau, ens, nom in ENS:
        # Si un e-tauler falla, l'altre es desa igualment.
        try:
            llegeix(clau, ens, nom)
        except Exception as e:
            errors += 1
            print(f"{nom}: error en llegir l'e-tauler: {e}")
    if errors == len(ENS):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
