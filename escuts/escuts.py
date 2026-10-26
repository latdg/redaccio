# =============================================================================
# ESCUTS DELS QUATRE MUNICIPIS — La TdG · 26.10.2026
# Baixa de Wikimedia Commons l'escut oficial de cada municipi (SVG) i el desa a
# escuts/<codi INE>.svg, amb l'autor i la llicència a escuts/credits.json.
# Només cal llançar-lo un cop (o si es vol tornar a baixar).
# =============================================================================
import json
import re
from pathlib import Path

import requests

CARPETA = Path(__file__).resolve().parent
API = "https://commons.wikimedia.org/w/api.php"
CAPCALERES = {"User-Agent": "LaTdG-redaccio/1.0 (https://latdg.github.io/redaccio/; latdg@laguait.cat)"}
MUNICIPIS = {
    "17022": ["Escut de la Bisbal d'Empordà.svg", "Escut de La Bisbal d'Empordà.svg"],
    "17057": ["Escut de Corçà.svg"],
    "17902": ["Escut de Forallac.svg"],
    "17901": ["Escut de Cruïlles, Monells i Sant Sadurní de l'Heura.svg",
              "Escut de Cruïlles, Monells i Sant Sadurní.svg"],
}
NOMS = {"17022": "la Bisbal d'Empordà", "17057": "Corçà", "17902": "Forallac",
        "17901": "Cruïlles, Monells i Sant Sadurní de l'Heura"}


def info(titol):
    r = requests.get(API, params={"action": "query", "format": "json", "prop": "imageinfo", "titles": "File:" + titol,
                                  "iiprop": "url|extmetadata", "iiextmetadatafilter": "LicenseShortName|Artist"},
                     headers=CAPCALERES, timeout=60)
    r.raise_for_status()
    p = next(iter(r.json()["query"]["pages"].values()))
    return None if "missing" in p or "imageinfo" not in p else p["imageinfo"][0]


def cerca(nom):
    r = requests.get(API, params={"action": "query", "format": "json", "list": "search", "srnamespace": 6,
                                  "srsearch": f'intitle:"Escut" "{nom}" filetype:drawing', "srlimit": 5},
                     headers=CAPCALERES, timeout=60)
    r.raise_for_status()
    for x in r.json()["query"]["search"]:
        t = x["title"].removeprefix("File:")
        if t.lower().startswith("escut") and t.lower().endswith(".svg"):
            return t
    return None


def main():
    credits = {}
    cf = CARPETA / "credits.json"
    anteriors = json.loads(cf.read_text(encoding="utf-8")) if cf.exists() else {}
    for codi, titols in MUNICIPIS.items():
        # Els escuts posats a mà (camp «local», com el de Cruïlles) no es toquen.
        if codi in anteriors and anteriors[codi].get("local") and (CARPETA / anteriors[codi]["local"]).exists():
            credits[codi] = anteriors[codi]
            continue
        if (CARPETA / f"{codi}.svg").exists() and codi in anteriors:
            credits[codi] = anteriors[codi]
            continue
        trobat = None
        for t in titols + [cerca(NOMS[codi])]:
            if t and (ii := info(t)):
                trobat = (t, ii)
                break
        if not trobat:
            print("No trobat:", NOMS[codi])
            # Deixa a credits.json què hi ha a Commons, per triar-lo a mà.
            r = requests.get(API, params={"action": "query", "format": "json", "list": "search", "srnamespace": 6,
                                          "srsearch": NOMS[codi].split(",")[0] + " escut", "srlimit": 15},
                             headers=CAPCALERES, timeout=60)
            credits["_cercat_" + codi] = [x["title"] for x in r.json()["query"]["search"]]
            continue
        t, ii = trobat
        svg = requests.get(ii["url"], headers=CAPCALERES, timeout=60)
        svg.raise_for_status()
        (CARPETA / f"{codi}.svg").write_bytes(svg.content)
        meta = ii.get("extmetadata", {})
        autor = re.sub(r"<[^>]+>", "", meta.get("Artist", {}).get("value", "")).strip()
        credits[codi] = {"fitxer": t, "pagina": ii.get("descriptionurl"), "autor": autor,
                         "llicencia": meta.get("LicenseShortName", {}).get("value", "")}
        print(NOMS[codi], "→", t, "|", credits[codi]["llicencia"], "|", autor)
    (CARPETA / "credits.json").write_text(json.dumps(credits, ensure_ascii=False, indent=1), encoding="utf-8")


if __name__ == "__main__":
    main()
