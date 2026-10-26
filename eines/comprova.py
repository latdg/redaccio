# =============================================================================
# COMPROVA FONTS — La TdG · 26.10.2026
# Eina per saber si una font es pot llegir des de GitHub (algunes webs de
# l'Estat no hi deixen connectar). Llegeix eines/urls.txt (una adreça per línia;
# les que comencen per # s'ignoren) i desa a eines/comprovacio.json el codi de
# resposta, la mida i el començament de cada una.
# =============================================================================
import json
import re
import time
from datetime import datetime, timezone
from pathlib import Path

import requests

CARPETA = Path(__file__).resolve().parent
H = {"User-Agent": "Mozilla/5.0 (LaTdG-redaccio; latdg@laguait.cat)"}
res = {}
for u in (CARPETA / "urls.txt").read_text(encoding="utf-8").splitlines():
    u = u.strip()
    if not u or u.startswith("#"):
        continue
    t = time.time()
    try:
        r = requests.get(u, headers=H, timeout=(20, 120), stream=True)
        cos = r.raw.read(200000, decode_content=True)
        text = cos.decode("utf-8", "replace")
        res[u] = {"codi": r.status_code, "final": r.url, "tipus": r.headers.get("content-type"),
                  "mida": r.headers.get("content-length"), "segons": round(time.time() - t, 1),
                  "inici": re.sub(r"\s+", " ", text[:6000])}
    except Exception as e:
        res[u] = {"error": f"{type(e).__name__}: {str(e)[:200]}", "segons": round(time.time() - t, 1)}
(CARPETA / "comprovacio.json").write_text(json.dumps(
    {"quan": datetime.now(timezone.utc).isoformat(timespec="seconds"), "resultats": res},
    ensure_ascii=False, indent=1), encoding="utf-8")
