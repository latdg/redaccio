"""Videoteca de L'aguait — La TdG sala de control audiovisual · 28.11.2026

Desa a tdt/aguait.json els vídeos del canal de YouTube de L'aguait TV (@laguaitlb) perquè la sala de
control els mostri com una categoria més («📼 Videoteca de L'aguait»), amb el reproductor de YouTube
i la gravació a l'ordinador de casa.

La llista sencera (vídeos i directes) la dona yt-dlp sense baixar res; les dates exactes dels
vídeos nous surten del canal RSS de YouTube (els 15 últims), i la resta, la data aproximada que
dona yt-dlp. Els vídeos ja desats es conserven encara que una lectura falli: la llista només creix
(si un vídeo desapareix del canal, també en desapareix).

Si YouTube no respon, no es toca el fitxer que ja hi ha.
"""
import json
import re
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

import requests
import yt_dlp

CANAL = "https://www.youtube.com/@laguaitlb"
FITXER = Path(__file__).resolve().parent / "aguait.json"
MAD = ZoneInfo("Europe/Madrid")


def llista_canal():
    """{id: {"n": títol, "d": "dd.mm.aaaa" o None}} de les pestanyes Vídeos i Directes; i l'id del canal."""
    opcions = {"quiet": True, "no_warnings": True, "extract_flat": "in_playlist", "skip_download": True,
               "extractor_args": {"youtubetab": {"approximate_date": [""]}}}
    vids, canal_id, ok = {}, None, False
    with yt_dlp.YoutubeDL(opcions) as ydl:
        for pestanya in ("videos", "streams"):
            try:
                info = ydl.extract_info(f"{CANAL}/{pestanya}", download=False)
            except Exception as e:
                print(f"  · {pestanya}: {e}")
                continue
            ok = True
            canal_id = canal_id or info.get("channel_id") or info.get("id")
            for e in info.get("entries") or []:
                if not e or not e.get("id") or e.get("live_status") in ("is_upcoming", "is_live"):
                    continue
                d = None
                if e.get("timestamp"):
                    d = datetime.fromtimestamp(e["timestamp"], timezone.utc).astimezone(MAD).strftime("%d.%m.%Y")
                elif e.get("upload_date"):
                    u = e["upload_date"]; d = f"{u[6:8]}.{u[4:6]}.{u[:4]}"
                vids[e["id"]] = {"n": (e.get("title") or "").strip(), "d": d}
    return (vids if ok else None), canal_id


def dates_rss(canal_id):
    """Dates exactes dels 15 últims vídeos (canal RSS de YouTube): {id: "dd.mm.aaaa"}."""
    if not canal_id or not canal_id.startswith("UC"):
        return {}
    try:
        r = requests.get(f"https://www.youtube.com/feeds/videos.xml?channel_id={canal_id}", timeout=30)
        r.raise_for_status()
        ns = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015"}
        out = {}
        for e in ET.fromstring(r.content).findall("a:entry", ns):
            vid, pub = e.findtext("yt:videoId", "", ns), e.findtext("a:published", "", ns)
            if vid and pub:
                out[vid] = datetime.fromisoformat(pub).astimezone(MAD).strftime("%d.%m.%Y")
        return out
    except Exception as e:
        print(f"  · RSS: {e}")
        return {}


def main():
    abans = {}
    if FITXER.exists():
        try:
            abans = {v["y"]: v for v in json.loads(FITXER.read_text(encoding="utf-8")).get("videos", [])}
        except Exception:
            abans = {}
    vids, canal_id = llista_canal()
    if not vids:
        print("❌ No s'ha pogut llegir el canal de YouTube de L'aguait: no es toca res.")
        return 0
    exactes = dates_rss(canal_id)
    videos = []
    for y, v in vids.items():
        vell = abans.get(y, {})
        # La data exacta (RSS) mana; si no, la que ja estava desada; si no, l'aproximada de yt-dlp.
        d = exactes.get(y) or vell.get("d") or v["d"]
        nou = {"y": y, "n": v["n"] or vell.get("n", ""), "d": d}
        if y in exactes or vell.get("dx"):
            nou["dx"] = 1
        videos.append(nou)
    clau = lambda v: tuple(reversed(v["d"].split("."))) if v.get("d") and re.fullmatch(r"\d\d\.\d\d\.\d{4}", v["d"]) else ("0",)
    videos.sort(key=clau, reverse=True)
    ara = datetime.now(MAD)
    FITXER.write_text(json.dumps({"actualitzat": ara.strftime("%d.%m.%Y %H.%M"), "canal": CANAL, "videos": videos},
                                 ensure_ascii=False, indent=0) + "\n", encoding="utf-8")
    nous = len([v for v in videos if v["y"] not in abans])
    print(f"✅ {len(videos)} vídeos de L'aguait TV ({nous} de nous)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
