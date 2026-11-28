"""Videoteca de L'aguait — La TdG sala de control audiovisual · 28.11.2026

Desa a tdt/aguait.json els vídeos del canal de YouTube de L'aguait TV (@laguaitlb) perquè la sala de
control els mostri com una categoria més («📼 Videoteca de L'aguait»), amb el reproductor de YouTube
i la gravació a l'ordinador de casa.

La llista sencera la dona yt-dlp sense baixar res, en l'ordre del canal (del més nou al més vell).
La data de publicació surt de l'API de YouTube (secret YOUTUBE_API_KEY, només per als vídeos que encara
no en tenen) i, si no hi ha clau, del canal RSS de YouTube (els 15 últims). Queda desada a aguait.json.

Si YouTube no respon, no es toca el fitxer que ja hi ha.
"""
import json
import os
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


def dates_api(ids):
    """Data de publicació amb l'API de YouTube (secret YOUTUBE_API_KEY), de 50 en 50: {id: "dd.mm.aaaa"}."""
    clau = os.environ.get("YOUTUBE_API_KEY", "").strip()
    if not clau or not ids:
        return {}
    out = {}
    for i in range(0, len(ids), 50):
        try:
            r = requests.get("https://www.googleapis.com/youtube/v3/videos", timeout=30,
                             params={"part": "snippet", "id": ",".join(ids[i:i + 50]), "key": clau,
                                     "fields": "items(id,snippet/publishedAt)"})
            r.raise_for_status()
            for it in r.json().get("items", []):
                pub = it["snippet"]["publishedAt"].replace("Z", "+00:00")
                out[it["id"]] = datetime.fromisoformat(pub).astimezone(MAD).strftime("%d.%m.%Y")
        except Exception as e:
            print(f"  · API de YouTube: {e}")
            break
    return out


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
    sense = [y for y in vids if y not in exactes and not abans.get(y, {}).get("d")]
    exactes.update(dates_api(sense))
    videos, falten = [], 0
    for y, v in vids.items():
        vell = abans.get(y, {})
        d = exactes.get(y) or vell.get("d")
        if not d:
            falten += 1
        nou = {"y": y, "n": v["n"] or vell.get("n", "")}
        if d:
            nou["d"] = d
        videos.append(nou)
    if falten:
        print(f"  · {falten} vídeos sense data (cal el secret YOUTUBE_API_KEY)")
    ara = datetime.now(MAD)
    FITXER.write_text(json.dumps({"actualitzat": ara.strftime("%d.%m.%Y %H.%M"), "canal": CANAL, "videos": videos},
                                 ensure_ascii=False, indent=0) + "\n", encoding="utf-8")
    nous = len([v for v in videos if v["y"] not in abans])
    print(f"✅ {len(videos)} vídeos de L'aguait TV ({nous} de nous)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
