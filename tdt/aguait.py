"""Videoteca de L'aguait — La TdG sala de control audiovisual · 28.11.2026

Desa a tdt/aguait.json els vídeos del canal de YouTube de L'aguait TV (@laguaitlb) perquè la sala de
control els mostri com una categoria més («📼 Videoteca de L'aguait»), amb el reproductor de YouTube
i la gravació a l'ordinador de casa.

La llista sencera la dona yt-dlp sense baixar res, en l'ordre del canal (del més nou al més vell).
La data de publicació surt del canal RSS de YouTube (els 15 últims) o de la fitxa de cada vídeo, que
es demana només la primera vegada: la data queda desada a aguait.json.

Si YouTube no respon, no es toca el fitxer que ja hi ha.
"""
import json
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
    """{id: {"n": títol}} de la pestanya Vídeos, del més nou al més vell; i l'id del canal."""
    opcions = {"quiet": True, "no_warnings": True, "extract_flat": "in_playlist", "skip_download": True}
    vids, canal_id, ok = {}, None, False
    with yt_dlp.YoutubeDL(opcions) as ydl:
        for pestanya in ("videos",):
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
                vids[e["id"]] = {"n": (e.get("title") or "").strip()}
    return (vids if ok else None), canal_id


def data_exacta(y):
    """Data de publicació d'un vídeo (dd.mm.aaaa), demanada a YouTube un sol cop per vídeo."""
    with yt_dlp.YoutubeDL({"quiet": True, "no_warnings": True, "skip_download": True}) as ydl:
        info = ydl.extract_info(f"https://www.youtube.com/watch?v={y}", download=False, process=False)
    u = info.get("upload_date")
    return f"{u[6:8]}.{u[4:6]}.{u[:4]}" if u else None


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
    videos, falten = [], 0
    for y, v in vids.items():
        vell = abans.get(y, {})
        d = exactes.get(y) or vell.get("d")
        if not d:
            try:
                d = data_exacta(y)
            except Exception as e:
                print(f"  · {y}: {e}")
        if not d:
            falten += 1
        nou = {"y": y, "n": v["n"] or vell.get("n", "")}
        if d:
            nou["d"] = d
        videos.append(nou)
    if falten:
        print(f"  · {falten} vídeos sense data (es tornarà a provar demà)")
    ara = datetime.now(MAD)
    FITXER.write_text(json.dumps({"actualitzat": ara.strftime("%d.%m.%Y %H.%M"), "canal": CANAL, "videos": videos},
                                 ensure_ascii=False, indent=0) + "\n", encoding="utf-8")
    nous = len([v for v in videos if v["y"] not in abans])
    print(f"✅ {len(videos)} vídeos de L'aguait TV ({nous} de nous)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
