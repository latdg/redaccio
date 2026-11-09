# Estructura empresarial (Diputació de Girona) — La TdG · 09.11.2026
# Busca les edicions de l'estudi «Estructura empresarial» a promoeco.ddgi.cat,
# baixa les que encara no tenim i en desa el text (pdftotext -layout) a
# empreses/text/AAAA.txt. El text és el que llegeix empreses/empreses.py.
import json, os, re, subprocess, sys, tempfile, datetime
import requests

ARREL = os.path.dirname(os.path.abspath(__file__))
TEXT = os.path.join(ARREL, "text")
ESTAT = os.path.join(ARREL, "estat.json")
UA = {"User-Agent": "LaTdG-dades/1.0 (+https://latdg.github.io/redaccio/dades/)"}
os.makedirs(TEXT, exist_ok=True)

def edicions_media():
    """Les adreces dels PDF que la web de la Diputació té a la mediateca."""
    trobades = {}
    for cerca in ("Estructura_Empresarial", "Estructura empresarial"):
        for pag in range(1, 4):
            try:
                r = requests.get("https://promoeco.ddgi.cat/wp-json/wp/v2/media",
                                 params={"search": cerca, "per_page": 100, "page": pag}, headers=UA, timeout=60)
            except requests.RequestException as e:
                print("Mediateca:", e); break
            if r.status_code != 200: break
            items = r.json()
            for it in items:
                url = it.get("source_url", "")
                m = re.search(r"Estructura[_-]Empresarial[_-](20\d\d)[^/]*\.pdf$", url, re.I)
                if m: trobades.setdefault(int(m.group(1)), url)
            if len(items) < 100: break
    return trobades

def edicions_xifra():
    """L'apartat «Estudis» del XIFRA de la Diputació, on hi ha totes les edicions."""
    trobades = {}
    try:
        r = requests.get("https://www.ddgi.cat/xifra/menu_est.asp", headers=UA, timeout=60)
        r.encoding = r.apparent_encoding
        for href in re.findall(r'href=["\']([^"\']+\.pdf)["\']', r.text, re.I):
            nom = requests.utils.unquote(href.rsplit("/", 1)[-1])
            m = re.search(r"estructura.*?(20\d\d)", nom, re.I)
            if m:
                trobades.setdefault(int(m.group(1)), requests.compat.urljoin("https://www.ddgi.cat/xifra/", href))
    except requests.RequestException as e:
        print("XIFRA:", e)
    return trobades

def edicio_provable(any_):
    """Si la mediateca no respon, prova l'adreça habitual mes a mes."""
    for mes in range(12, 0, -1):
        url = f"https://promoeco.ddgi.cat/wp-content/uploads/{any_}/{mes:02d}/Estructura_Empresarial_{any_}.pdf"
        try:
            r = requests.head(url, headers=UA, timeout=30, allow_redirects=True)
            if r.status_code == 200: return url
        except requests.RequestException:
            pass
    return None

estat = json.load(open(ESTAT)) if os.path.exists(ESTAT) else {"edicions": {}}
trobades = edicions_xifra()
for a, u in edicions_media().items():
    trobades.setdefault(a, u)
avui = datetime.date.today().year
for a in range(2022, avui + 2):
    if a not in trobades and str(a) not in estat["edicions"]:
        u = edicio_provable(a)
        if u: trobades[a] = u
# Adreces afegides a mà (per si la Diputació canvia el nom del fitxer).
for a, u in estat.get("manuals", {}).items():
    trobades.setdefault(int(a), u)
print("Edicions trobades:", json.dumps(trobades, indent=1))

nous = 0
for a, url in sorted(trobades.items()):
    desti = os.path.join(TEXT, f"{a}.txt")
    if os.path.exists(desti) and estat["edicions"].get(str(a), {}).get("url") == url:
        continue
    try:
        r = requests.get(url, headers=UA, timeout=180)
        r.raise_for_status()
        if not r.content.startswith(b"%PDF"): raise ValueError("no és un PDF")
    except Exception as e:
        # Un enllaç trencat d'una edició antiga no ha d'aturar la resta.
        print(f"No s'ha pogut baixar l'edició {a} ({url}): {e}")
        continue
    with tempfile.NamedTemporaryFile(suffix=".pdf") as f:
        f.write(r.content); f.flush()
        subprocess.run(["pdftotext", "-layout", f.name, desti], check=True)
    estat["edicions"][str(a)] = {"url": url, "baixat": datetime.date.today().isoformat(), "bytes": len(r.content)}
    nous += 1
    print("Baixada l'edició", a)

json.dump(estat, open(ESTAT, "w"), ensure_ascii=False, indent=1)
print("Edicions noves:", nous)
