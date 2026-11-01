#!/usr/bin/env python3
"""TRADUEIX FREECUT AL CATALÀ · La TdG · 01.11.2026
Crea locales/ca.json i locales/partials/ca/*.json a partir del castellà (es) amb Apertium
(spa-cat) i hi aplica les correccions de correccions.json (expressions exactes o regex).
Si una frase traduïda perd una variable ({{x}}) o una etiqueta (<1>), es deixa la catalana
sense marques però es comprova; si encara falla, es manté l'anglès.
Ús: python3 tradueix.py /camí/a/freecut   (cal: apt-get install apertium-spa-cat cg3 apertium-lex-tools)
"""
import json, re, subprocess, sys
from pathlib import Path

arrel = Path(sys.argv[1]) / "src/i18n/locales"
correccions = json.loads((Path(__file__).parent / "correccions.json").read_text(encoding="utf-8"))
MARCA = re.compile(r"\{\{[^}]+\}\}|</?\d+>|<[a-zA-Z]+\s*/?>|</[a-zA-Z]+>|\$t\([^)]*\)")


def cadenes(o, cami=()):
    if isinstance(o, dict):
        for k, v in o.items():
            yield from cadenes(v, cami + (k,))
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from cadenes(v, cami + (i,))
    elif isinstance(o, str):
        yield cami, o


def posa(o, cami, valor):
    for k in cami[:-1]:
        o = o[k]
    o[cami[-1]] = valor


def apertium(textos):
    # Les variables ({{date}}…) es canvien per fitxes perquè Apertium no les tradueixi.
    guardades = []

    def amaga(m):
        guardades.append(m.group(0))
        return f"Qx{len(guardades) - 1}xQ"

    textos = [re.sub(r"\{\{[^}]+\}\}|\$t\([^)]*\)", amaga, t) for t in textos]
    resultat = _apertium(textos)
    return [re.sub(r"Qx(\d+)xQ", lambda m: guardades[int(m.group(1))], t) for t in resultat]


def _apertium(textos):
    # Una línia per cadena; els salts de línia interns es protegeixen.
    entrada = "\n".join(t.replace("\n", " ⏎ ") for t in textos) + "\n"
    sortida = subprocess.run(["apertium", "-u", "spa-cat"], input=entrada, capture_output=True,
                             text=True, check=True).stdout.rstrip("\n").split("\n")
    if len(sortida) != len(textos):
        raise RuntimeError(f"Apertium ha tornat {len(sortida)} línies de {len(textos)}")
    return [s.replace(" ⏎ ", "\n").replace("⏎", "\n") for s in sortida]


def corregeix(t):
    for c in correccions:
        if c.get("regex"):
            t = re.sub(c["de"], c["a"], t)
        else:
            t = t.replace(c["de"], c["a"])
    return t


def tradueix(es_fitxer, en_fitxer, ca_fitxer):
    es = json.loads(es_fitxer.read_text(encoding="utf-8"))
    en = json.loads(en_fitxer.read_text(encoding="utf-8")) if en_fitxer.exists() else {}
    parells = list(cadenes(es))
    trad = apertium([t for _, t in parells])
    ca = json.loads(json.dumps(es))
    mals = 0
    for (cami, original), t in zip(parells, trad):
        anglès = en
        try:
            for k in cami:
                anglès = anglès[k]
        except (KeyError, IndexError, TypeError):
            anglès = None
        if anglès == original:  # el castellà no l'havien traduït: es deixa l'anglès
            posa(ca, cami, original)
            continue
        t = corregeix(t)
        if sorted(MARCA.findall(original)) != sorted(MARCA.findall(t)):
            mals += 1
            # Recurs: anglès, si existeix
            alt = en
            try:
                for k in cami:
                    alt = alt[k]
                t = alt if isinstance(alt, str) else original
            except (KeyError, IndexError, TypeError):
                t = original
        posa(ca, cami, t)
    ca_fitxer.parent.mkdir(parents=True, exist_ok=True)
    ca_fitxer.write_text(json.dumps(ca, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{ca_fitxer.relative_to(arrel)}: {len(parells)} cadenes, {mals} amb marques perdudes")


tradueix(arrel / "es.json", arrel / "en.json", arrel / "ca.json")
for f in sorted((arrel / "partials/es").glob("*.json")):
    tradueix(f, arrel / "partials/en" / f.name, arrel / "partials/ca" / f.name)
