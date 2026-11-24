# =============================================================================
# PLENS DE LA BISBAL — La TdG redacció · 24.11.2026
#
# Desa a plens/plens.json la llista dels plens de l'Ajuntament de la Bisbal
# d'Empordà que hi ha al seu canal de YouTube, per al bloc «Plens» de La TdG
# redacció i per al canal del ple de la sala de control audiovisual.
#
# Fonts, en aquest ordre:
#   1. La pestanya «En directe» del canal (yt-dlp, sense baixar res): títols,
#      durada, si n'hi ha un en directe i l'identificador del canal.
#   2. Les «releases» del repositori públic latdg/plens, que el vigilant de plens
#      crea per a cada ple. Si una release porta un index.json (punts del ple i
#      transcripció amb els temps), es copia a plens/index/<vídeo>.json perquè
#      la redacció pugui cercar el vídeo pels punts.
# Si una font falla, es manté el que ja hi havia: no s'esborra mai cap ple.
# =============================================================================
import datetime, json, os, re, subprocess, sys
from pathlib import Path
from zoneinfo import ZoneInfo

import requests

CANAL = "https://www.youtube.com/@ajuntamentdelabisbaldempor3226/streams"
REPO_PLENS = "latdg/plens"
ES_PLE = re.compile(r"\bple\b", re.I)
CARPETA = Path(__file__).resolve().parent
FITXER = CARPETA / "plens.json"
INDEXOS = CARPETA / "index"
TOKEN = os.environ.get("GH_TOKEN", "").strip()
GH = {"Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28"}
if TOKEN:
    GH["Authorization"] = "Bearer " + TOKEN


def data_del_titol(titol):
    """«Ple ordinari - 22/09/2026» -> «2026-09-22» (o "" si no hi és)."""
    m = re.search(r"(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})", titol or "")
    if m:
        return "%s-%02d-%02d" % (m.group(3), int(m.group(2)), int(m.group(1)))
    return ""


def titol_net(titol):
    """Canvi 24.11.2026: les dates dels títols, en format dd.mm.aaaa («24/11/2026» -> «24.11.2026»)."""
    return re.sub(r"\b(\d{1,2})[/-](\d{1,2})[/-](\d{4})\b",
                  lambda m: "%02d.%02d.%s" % (int(m.group(1)), int(m.group(2)), m.group(3)), titol or "")


def llegir_actual():
    try:
        return json.loads(FITXER.read_text(encoding="utf-8"))
    except Exception:
        return {"plens": []}


def del_canal():
    """Torna (canal_id, [plens], directe) o llença una excepció."""
    p = subprocess.run([sys.executable, "-m", "yt_dlp", "--no-warnings", "--flat-playlist", "-J", CANAL],
                       capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=300)
    if p.returncode != 0:
        raise RuntimeError(p.stderr.strip()[-400:])
    d = json.loads(p.stdout)
    canal_id = d.get("channel_id") or d.get("uploader_id") or ""
    plens, directe = [], None
    for e in d.get("entries") or []:
        titol = e.get("title") or ""
        if not e.get("id") or not ES_PLE.search(titol):
            continue
        estat = e.get("live_status") or ""
        fitxa = {"id": e["id"], "titol": titol, "data": data_del_titol(titol), "durada": e.get("duration") or 0}
        if estat in ("is_live", "is_upcoming"):
            directe = {"id": e["id"], "titol": titol, "estat": "directe" if estat == "is_live" else "previst"}
        plens.append(fitxa)
    return (canal_id if canal_id.startswith("UC") else ""), plens, directe


def de_les_releases():
    """[{id, titol, data, index_url}] a partir de les releases de latdg/plens."""
    r = requests.get("https://api.github.com/repos/%s/releases?per_page=100" % REPO_PLENS, headers=GH, timeout=30)
    r.raise_for_status()
    sortida = []
    for rel in r.json():
        tag = rel.get("tag_name") or ""
        m = re.search(r"([A-Za-z0-9_-]{11})$", tag)
        if not m or not (tag.startswith("ple-") or tag.startswith("index-")):
            continue
        index = [a for a in rel.get("assets", []) if a.get("name") == "index.json"]
        mdata = re.search(r"(\d{4}-\d{2}-\d{2})", tag)
        data = data_del_titol(rel.get("name") or "") or (mdata.group(1) if mdata else "")
        sortida.append({"id": m.group(1), "titol": rel.get("name") or "", "data": data,
                        "index_url": index[0]["url"] if index else ""})
    return sortida


def copiar_index(video_id, url_api):
    """Baixa l'index.json d'una release (per l'API, sense CORS) a plens/index/<id>.json."""
    desti = INDEXOS / (video_id + ".json")
    r = requests.get(url_api, headers=dict(GH, Accept="application/octet-stream"), timeout=60)
    r.raise_for_status()
    dades = r.json()                                      # comprova que és JSON
    INDEXOS.mkdir(exist_ok=True)
    nou = json.dumps(dades, ensure_ascii=False, separators=(",", ":"))
    if not desti.exists() or desti.read_text(encoding="utf-8") != nou:
        desti.write_text(nou, encoding="utf-8")
        print("Índex desat: " + desti.name)


def main():
    actual = llegir_actual()
    # Canvi 24.11.2026: còpia de cada ple, perquè els canvis (com «index») no toquin
    # també «actual» i el script no es pensi que no hi ha res de nou.
    per_id = {p["id"]: dict(p) for p in actual.get("plens", [])}
    canal_id = actual.get("canal_id", "")
    directe = None
    avisos = []

    try:
        cid, plens, directe = del_canal()
        canal_id = cid or canal_id
        for p in plens:
            vell = per_id.get(p["id"], {})
            vell.update({k: v for k, v in p.items() if v})
            per_id[p["id"]] = vell
        print("Canal: %d plens%s" % (len(plens), " · en directe: " + directe["titol"] if directe else ""))
    except Exception as e:
        avisos.append("canal de YouTube: " + str(e)[:200])
        directe = None                       # sense dades fresques, no es diu que n'hi ha cap en directe
        print("::warning::Canal de YouTube: %s" % e)

    try:
        for rel in de_les_releases():
            p = per_id.setdefault(rel["id"], {"id": rel["id"], "titol": rel["titol"], "data": rel["data"], "durada": 0})
            if not p.get("titol"):
                p["titol"] = rel["titol"]
            if not p.get("data"):
                p["data"] = rel["data"]
            if rel["index_url"]:
                try:
                    copiar_index(rel["id"], rel["index_url"])
                except Exception as e:
                    print("::warning::Índex de %s: %s" % (rel["id"], e))
    except Exception as e:
        avisos.append("releases de latdg/plens: " + str(e)[:200])
        print("::warning::Releases: %s" % e)

    for vid, p in per_id.items():
        p["index"] = (INDEXOS / (vid + ".json")).exists()
        p["titol"] = titol_net(p.get("titol"))
    if directe:
        directe["titol"] = titol_net(directe.get("titol"))
        # 24.11.2026: hora de l'última comprovació. Les pàgines amaguen l'avís si fa
        # massa que no es comprova (els crons de GitHub de vegades no s'executen).
        directe["vist"] = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    plens = sorted(per_id.values(), key=lambda p: (p.get("data") or "", p["id"]), reverse=True)
    ara = datetime.datetime.now(ZoneInfo("Europe/Madrid"))
    nou = {"canal_id": canal_id, "directe": directe, "plens": plens}
    vell = {k: actual.get(k) for k in nou}
    if nou == vell:
        print("Sense canvis.")
        return
    nou["actualitzat"] = ara.strftime("%d.%m.%Y %H.%M")
    if avisos:
        nou["avisos"] = avisos
    FITXER.write_text(json.dumps(nou, ensure_ascii=False, indent=1), encoding="utf-8")
    print("Desat plens.json: %d plens." % len(plens))


if __name__ == "__main__":
    main()
