"""TDT i ràdio — La TdG · 05.11.2026

Baixa un cop al dia les llistes públiques de TDTChannels (tv.json i radio.json,
https://www.tdtchannels.com/listas/) i en desa una versió reduïda a tdt/ perquè la
pàgina tdt/index.html les llegeixi sense dependre de tdtchannels.com.

Si una baixada falla o arriba buida, no es toca el fitxer que ja hi ha.

14.11.2026: també la programació (EPG) de TDTChannels (epg/TV.json i epg/RADIO.json),
reduïda a les cadenes i emissores de les llistes i a la franja d'avui i demà, a tdt/epg.json.
«python tdt/actualitza.py epg» només baixa la programació (el workflow ho fa cada 6 hores).
"""
import hashlib
import json
import sys
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import requests

FONTS = {
    "tv": "https://www.tdtchannels.com/lists/tv.json",
    "radio": "https://www.tdtchannels.com/lists/radio.json",
}
FONTS_EPG = {
    "tv": "https://www.tdtchannels.com/epg/TV.json",
    "radio": "https://www.tdtchannels.com/epg/RADIO.json",
}
CARPETA = Path(__file__).resolve().parent
LOGOS = CARPETA / "logos"
TIPUS_IMATGE = {"image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/gif": "gif", "image/svg+xml": "svg"}


def baixa_logo(url):
    """Copia el logotip a tdt/logos/ (un cop; si ja hi és, no es torna a baixar).
    Torna l'adreça relativa o None si no s'ha pogut."""
    h = hashlib.sha1(url.encode()).hexdigest()[:16]
    ja = list(LOGOS.glob(h + ".*"))
    if ja:
        return "logos/" + ja[0].name
    try:
        r = requests.get(url, timeout=20, headers={"User-Agent": "Mozilla/5.0 (LaTdG-redaccio)"})
        tipus = r.headers.get("Content-Type", "").split(";")[0].strip().lower()
        if r.status_code != 200 or tipus not in TIPUS_IMATGE or not (200 < len(r.content) < 600_000):
            return None
        fitxer = LOGOS / f"{h}.{TIPUS_IMATGE[tipus]}"
        fitxer.write_bytes(r.content)
        return "logos/" + fitxer.name
    except Exception:  # noqa: BLE001
        return None


def logos_locals(totes):
    """Substitueix l'adreça de cada logotip per la còpia local quan s'ha pogut baixar."""
    LOGOS.mkdir(exist_ok=True)
    urls = sorted({c["l"] for canals in totes for c in canals if c.get("l", "").startswith("http")})
    with ThreadPoolExecutor(16) as ex:
        local = dict(zip(urls, ex.map(baixa_logo, urls)))
    for canals in totes:
        for c in canals:
            if local.get(c.get("l")):
                c["lo"] = c["l"]          # adreça original, per si cal
                c["l"] = local[c["l"]]
    print(f"🖼️ logotips: {sum(1 for v in local.values() if v)} de {len(urls)} copiats")


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


def programacio(ara):
    """Desa tdt/epg.json: {tv: {epg_id: [[inici, final, títol, descripció, gènere], …]}, radio: {…}}.
    Hores en segons Unix; només des de les 00.00 d'avui fins al final de demà."""
    inici = int(ara.replace(hour=0, minute=0, second=0, microsecond=0).timestamp())
    final = inici + 2 * 86400 + 3600
    sortida = {"actualitzat": ara.strftime("%d.%m.%Y %H.%M"), "font": "TDTChannels (https://www.tdtchannels.com)"}
    bons = 0
    for nom, url in FONTS_EPG.items():
        try:
            ids = {c["e"] for c in json.loads((CARPETA / f"{nom}.json").read_text(encoding="utf-8"))["canals"] if c.get("e")}
        except Exception:  # noqa: BLE001
            ids = None
        try:
            r = requests.get(url, timeout=120, headers={"User-Agent": "LaTdG-redaccio/1.0"})
            r.raise_for_status()
            canals = {}
            for c in r.json():
                if not c.get("name") or (ids is not None and c["name"] not in ids):
                    continue
                emissions = []
                for e in sorted(c.get("events") or [], key=lambda e: e.get("hi") or 0):
                    hi, hf = int(e.get("hi") or 0), int(e.get("hf") or 0)
                    if not hi or not e.get("t") or hi >= final or (hf and hf <= inici):
                        continue
                    d = " ".join(str(e.get("d") or "").split())
                    if len(d) > 2000:   # 14.11.2026: la descripció sencera (abans es tallava a 280)
                        d = d[:1997].rsplit(" ", 1)[0] + "…"
                    emissions.append([hi, hf, str(e["t"]).strip(), d, e.get("g") or ""])
                if emissions:
                    canals[c["name"]] = emissions
            if len(canals) < 5:
                raise ValueError(f"només {len(canals)} canals amb programació")
        except Exception as e:  # noqa: BLE001
            print(f"❌ programació {nom}: {e}")
            continue
        sortida[nom] = canals
        bons += 1
        print(f"✅ programació {nom}: {len(canals)} canals")
    if not bons:
        return False
    fitxer = CARPETA / "epg.json"
    if bons < len(FONTS_EPG) and fitxer.exists():
        # Si una de les dues ha fallat, es manté la que ja hi havia.
        try:
            vell = json.loads(fitxer.read_text(encoding="utf-8"))
            for nom in FONTS_EPG:
                if nom not in sortida and nom in vell:
                    sortida[nom] = vell[nom]
        except Exception:  # noqa: BLE001
            pass
    fitxer.write_text(json.dumps(sortida, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return True


def main():
    ara = datetime.now(ZoneInfo("Europe/Madrid"))
    if sys.argv[1:] == ["epg"]:
        sys.exit(0 if programacio(ara) else 1)
    errors = 0
    llistes = {}
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
        llistes[nom] = canals
    if llistes:
        logos_locals(llistes.values())
    for nom, canals in llistes.items():
        sortida = {
            "actualitzat": ara.strftime("%d.%m.%Y %H.%M"),
            "font": "TDTChannels (https://www.tdtchannels.com)",
            "canals": canals,
        }
        (CARPETA / f"{nom}.json").write_text(
            json.dumps(sortida, ensure_ascii=False, separators=(",", ":")), encoding="utf-8"
        )
        print(f"✅ {nom}: {len(canals)} canals")
    programacio(ara)
    sys.exit(1 if errors == len(FONTS) else 0)


if __name__ == "__main__":
    main()
