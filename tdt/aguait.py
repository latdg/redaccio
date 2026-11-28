"""Videoteca de L'aguait — La TdG sala de control audiovisual · 28.11.2026

Desa a tdt/aguait.json els vídeos de L'aguait TV (https://laguait.cat/categoria/tv/) perquè la
sala de control els mostri com una categoria més («📼 Videoteca de L'aguait»), amb el reproductor
de YouTube i la gravació a l'ordinador de casa.

La llista d'articles surt de l'API de WordPress de laguait.cat (categoria «tv», id 125). L'adreça
del vídeo no hi és (el tema la desa a part), i per això es llegeix la pàgina de cada article, només
la primera vegada: els que ja són a aguait.json no es tornen a demanar.

Si laguait.cat no respon, no es toca el fitxer que ja hi ha.
"""
import html
import json
import re
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import requests

API = "https://laguait.cat/wp-json/wp/v2"
CATEGORIA_TV = 125
FITXER = Path(__file__).resolve().parent / "aguait.json"
H = {"User-Agent": "Mozilla/5.0 (LaTdG-redaccio; latdg@laguait.cat)"}
YT = re.compile(r"(?:youtube(?:-nocookie)?\.com/(?:embed/|watch\?v=|live/|shorts/)|youtu\.be/)([\w-]{11})")


def articles():
    """Tots els articles de la categoria TV: [(id, data, enllaç, títol)], del més nou al més vell."""
    tots, pagina = [], 1
    while True:
        r = requests.get(f"{API}/posts", params={"categories": CATEGORIA_TV, "per_page": 100, "page": pagina,
                                                 "_fields": "id,date,link,title"}, headers=H, timeout=60)
        if r.status_code == 400 and pagina > 1:   # passat de l'última pàgina
            break
        r.raise_for_status()
        lot = r.json()
        tots += [(a["id"], a["date"], a["link"], html.unescape(re.sub(r"<[^>]+>", "", a["title"]["rendered"])).strip()) for a in lot]
        if len(lot) < 100 or pagina >= int(r.headers.get("X-WP-TotalPages", pagina)):
            break
        pagina += 1
    return tots


def video_de(enllac):
    """Identificador de YouTube del vídeo de l'article (el primer que surt a la pàgina) o None."""
    r = requests.get(enllac, headers=H, timeout=60)
    r.raise_for_status()
    m = YT.search(r.text)
    return m.group(1) if m else None


def main():
    abans = {}
    if FITXER.exists():
        try:
            abans = {v["id"]: v for v in json.loads(FITXER.read_text(encoding="utf-8")).get("videos", [])}
        except Exception:
            abans = {}
    try:
        llista = articles()
    except Exception as e:
        print(f"❌ No s'ha pogut llegir l'API de laguait.cat: {e}")
        return 0
    if not llista:
        print("❌ L'API de laguait.cat ha tornat la llista buida: no es toca res.")
        return 0
    videos, nous, sense = [], 0, 0
    for id_, data, enllac, titol in llista:
        v = abans.get(id_)
        if v and v.get("y"):
            v.update(n=titol, w=enllac)
        else:
            try:
                y = video_de(enllac)
            except Exception as e:
                print(f"  · {enllac}: {e}")
                continue
            if not y:
                sense += 1
                continue
            nous += 1
            v = {"id": id_, "y": y, "n": titol, "w": enllac}
        d = data[:10].split("-")
        v["d"] = f"{d[2]}.{d[1]}.{d[0]}"
        videos.append(v)
    ara = datetime.now(ZoneInfo("Europe/Madrid"))
    FITXER.write_text(json.dumps({"actualitzat": ara.strftime("%d.%m.%Y %H.%M"), "videos": videos},
                                 ensure_ascii=False, indent=0) + "\n", encoding="utf-8")
    print(f"✅ {len(videos)} vídeos de L'aguait TV ({nous} de nous; {sense} articles sense vídeo de YouTube)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
