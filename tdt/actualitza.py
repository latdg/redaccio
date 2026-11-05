"""TDT i ràdio — La TdG · 05.11.2026

Baixa un cop al dia les llistes públiques de TDTChannels (tv.json i radio.json,
https://www.tdtchannels.com/listas/) i en desa una versió reduïda a tdt/ perquè la
pàgina tdt/index.html les llegeixi sense dependre de tdtchannels.com.

Si una baixada falla o arriba buida, no es toca el fitxer que ja hi ha.
"""
import json
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import requests

FONTS = {
    "tv": "https://www.tdtchannels.com/lists/tv.json",
    "radio": "https://www.tdtchannels.com/lists/radio.json",
}
CARPETA = Path(__file__).resolve().parent


def redueix(dades):
    canals = []
    for pais in dades.get("countries", []):
        for ambit in pais.get("ambits", []):
            for c in ambit.get("channels", []):
                opcions = []
                for o in c.get("options") or []:
                    if not o.get("url"):
                        continue
                    op = {"f": o.get("format") or "", "u": o["url"]}
                    if o.get("geo2"):
                        op["g"] = o["geo2"]
                    if o.get("res"):
                        op["r"] = o["res"]
                    if o.get("lang"):
                        op["ll"] = o["lang"]
                    opcions.append(op)
                canal = {
                    "n": c.get("name") or "",
                    "a": ambit.get("name") or "",
                    "p": pais.get("name") or "",
                    "o": opcions,
                }
                for clau, camp in (("l", "logo"), ("w", "web"), ("e", "epg_id"), ("ref", "referer")):
                    if c.get(camp):
                        canal[clau] = c[camp]
                if c.get("extra_info"):
                    canal["x"] = c["extra_info"]
                canals.append(canal)
    return canals


def main():
    ara = datetime.now(ZoneInfo("Europe/Madrid"))
    errors = 0
    for nom, url in FONTS.items():
        try:
            r = requests.get(url, timeout=60, headers={"User-Agent": "LaTdG-redaccio/1.0"})
            r.raise_for_status()
            canals = redueix(r.json())
            if len(canals) < 20:
                raise ValueError(f"només {len(canals)} canals")
        except Exception as e:  # noqa: BLE001
            print(f"❌ {nom}: {e}")
            errors += 1
            continue
        sortida = {
            "actualitzat": ara.strftime("%d.%m.%Y %H.%M"),
            "font": "TDTChannels (https://www.tdtchannels.com)",
            "canals": canals,
        }
        (CARPETA / f"{nom}.json").write_text(
            json.dumps(sortida, ensure_ascii=False, separators=(",", ":")), encoding="utf-8"
        )
        print(f"✅ {nom}: {len(canals)} canals")
    sys.exit(1 if errors == len(FONTS) else 0)


if __name__ == "__main__":
    main()
