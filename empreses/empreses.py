# Estructura empresarial (Diputació de Girona) — La TdG · 09.11.2026
# Llegeix el text de cada edició de l'estudi (empreses/text/AAAA.txt, que desa
# empreses/baixa.py) i en treu el que toca als cinc municipis de La TdG:
#   - el resum del Baix Empordà (empreses, facturació, trams, grans sectors);
#   - la facturació de cada municipi, el lloc a la comarca i per habitant;
#   - les empreses dels cinc municipis que surten als rànquings (25 de la
#     comarca, 250 de la demarcació i 25 de cada sector).
# Ho desa a dades/empreses.json, una entrada per edició. Si una edició no es
# pot llegir bé (canvi de format), no es desa i el workflow falla, perquè no
# surtin dades errònies al panell.
import json, os, re, sys, unicodedata, datetime

ARREL = os.path.dirname(os.path.abspath(__file__))
TEXT = os.path.join(ARREL, "text")
SORTIDA = os.path.join(ARREL, "..", "dades", "empreses.json")
ESTAT = os.path.join(ARREL, "estat.json")

MUNICIPIS = {  # codi INE: nom oficial (ordre de La TdG)
    "17022": "la Bisbal d'Empordà",
    "17902": "Forallac",
    "17057": "Corçà",
    "17901": "Cruïlles, Monells i Sant Sadurní de l'Heura",
    "17205": "Ullastret",
}
COMARQUES = ["Alt Empordà", "Baix Empordà", "Cerdanya", "Garrotxa", "Gironès",
             "Pla de l'Estany", "Ripollès", "Selva"]

def clau(s):
    s = unicodedata.normalize("NFD", s.replace("’", "'").lower())
    return re.sub(r"[^a-z0-9]", "", "".join(c for c in s if unicodedata.category(c) != "Mn"))

CLAU_MUN = {clau(n): c for c, n in MUNICIPIS.items()}
# Patró dels cinc noms tal com surten al PDF (amb «La» o «la»).
RX_MUN = "|".join(re.escape(n).replace("\\ ", " ") for n in MUNICIPIS.values()).replace("la Bisbal", "[Ll]a Bisbal")

def num(s):
    s = s.strip().replace(".", "").replace(",", ".")
    return float(s) if "." in s else int(s)

def neteja(linia):
    """Treu les etiquetes de comarca de la pestanya lateral del PDF."""
    l = linia.replace("’", "'").rstrip()
    for c in COMARQUES + ["Demarcació de Girona"]:
        if l.strip() == c: return ""
        if re.search(r"(\s{2,}|[\d%-]\s+)" + re.escape(c) + "$", l):
            l = l[: -len(c)].rstrip()
    return l

def llegeix(any_ed):
    linies = [neteja(l) for l in open(os.path.join(TEXT, f"{any_ed}.txt"), encoding="utf-8")]
    ed = {"edicio": any_ed}

    # 1. Taula de municipis del Baix Empordà: l'única «Ordre Municipi Facturació» amb Corçà.
    caps = [i for i, l in enumerate(linies) if re.match(r"\s*Ordre\s+Municipi\s+Facturació", l)]
    inici = None
    for i in caps:
        bloc = "\n".join(linies[i:i + 70])
        if re.search(r"\n\s*\d+\s+Corçà\s", bloc): inici = i; break
    if inici is None: raise ValueError("no es troba la taula de municipis del Baix Empordà")
    munis, total, n_mun = {}, None, 0
    for l in linies[inici + 1:inici + 80]:
        m = re.match(r"\s*(\d+)\s+(\S.*?)\s{2,}([\d.]+,\d+)\s+([\d,]+)\s*%\s*$", l)
        if m:
            n_mun += 1
            c = CLAU_MUN.get(clau(m.group(2)))
            if c: munis[c] = {"nom": MUNICIPIS[c], "facturacio": num(m.group(3)), "pes": num(m.group(4)), "lloc": int(m.group(1))}
            continue
        m = re.match(r"\s*Baix Empordà\s+([\d.]+,\d+)\s+100", l)
        if m: total = num(m.group(1)); break
    if len(munis) != 5 or not total: raise ValueError(f"taula de municipis incompleta ({len(munis)} municipis, total {total})")
    ed["municipisComarca"] = n_mun
    ed["comarca"] = {"facturacio": total}

    # 2. Resum de la comarca: la taula «Concepte» just abans.
    conc = max(i for i, l in enumerate(linies[:inici]) if re.match(r"\s*Concepte\s+Exercici", l))
    anys = [int(a) for a in re.findall(r"Exercici (\d{4})", linies[conc])]
    ed["anys"] = anys  # [any anterior, any de les dades]
    trams, grans = [], []
    for l in linies[conc + 1:conc + 60]:
        if l.strip().startswith("Font:"): break
        m = re.match(r"\s*(\S.*?)\s{2,}([\d.,]+|-)\s+([\d,]+ %|-)\s+([\d.,]+|-)\s+([\d,]+ %|-)\s*$", l)
        if not m: continue
        et, a, pa, b, pb = [x.strip() for x in m.groups()]
        v = lambda x: None if x == "-" else num(x.replace(" %", ""))
        if et == "Empreses": ed["comarca"]["empreses"] = [v(a), v(b)]
        elif et.startswith("Facturació (milions"): ed["comarca"]["facturacioAnys"] = [v(a), v(b)]
        elif et.startswith("Facturació per capita"): ed["comarca"]["perCapita"] = [v(a), v(b)]
        elif et.startswith("Pes de la facturació"): ed["comarca"]["pesDemarcacio"] = [v(pa), v(pb)]
        elif et == "Ocupació": ed["comarca"]["ocupacio"] = [v(a), v(b)]
        elif re.match(r"(Més de|Entre|Menys de)", et) and "milions" in et or re.match(r"(Entre \d|Menys de \d)", et) and "euros" in et:
            trams.append([et, v(b), v(pb)])
        elif et in ("Primari", "Indústria", "Construcció", "Serveis"):
            grans.append([et, v(a), v(b), v(pb)])
    ed["comarca"]["trams"] = trams
    ed["comarca"]["grans"] = grans
    if len(anys) != 2 or not ed["comarca"].get("empreses") or len(trams) != 6 or len(grans) != 4:
        raise ValueError("resum de la comarca incomplet")

    # 3. Facturació per habitant (la taula següent).
    pc = next(i for i in range(inici + 1, len(linies)) if re.match(r"\s*Ordre\s+Municipi\s+Euros", linies[i]))
    for l in linies[pc + 1:pc + 80]:
        m = re.match(r"\s*(\d+)\s+(\S.*?)\s{2,}([\d.]+)\s*$", l)
        if m and (c := CLAU_MUN.get(clau(m.group(2)))):
            munis[c]["perCapita"] = num(m.group(3)); munis[c]["llocPerCapita"] = int(m.group(1))
        if l.strip().startswith("Font:"): break
    ed["municipis"] = munis

    # 4. Les empreses dels cinc municipis als rànquings.
    rx = re.compile(r"\s*(\d{1,3})\s+(?:([A-Z]\d{7}[A-Z0-9])\s+)?(\S.*?)\s{2,}(" + RX_MUN + r")\s+([\d.]+,\d+)\s*$")
    empreses, taula, sector, comarca_feta = {}, None, None, False
    for i, l in enumerate(linies):
        if "Rànquing de les 250 empreses" in l: taula = "demarcacio"; continue
        if re.search(r"Rànquing de les \d+ empreses del sector", l):
            taula = "sector"
            sector = next(re.sub(r"\s{2,}.*", "", x.strip()) for x in linies[i + 1:i + 6] if x.strip())
            continue
        if re.search(r"Rànquing de les \d+ empreses amb més xifra de negoci", l):
            # Només el de la comarca, que és el primer després de la taula de municipis.
            taula = "comarca" if i > inici and not comarca_feta else "altra"
            if taula == "comarca": comarca_feta = True; n_comarca = 0
            continue
        m = rx.match(l)
        if taula == "comarca" and re.match(r"\s*\d{1,2}\s+\S", l) and re.search(r"[\d.]+,\d+\s*$", l): n_comarca += 1
        if not m or taula in (None, "altra"): continue
        lloc, nif, nom, mun, fact = m.groups()
        nom = re.sub(r"\s+", " ", nom).strip()
        e = empreses.setdefault(clau(nom), {"nom": nom, "municipi": CLAU_MUN[clau(mun)], "facturacio": num(fact)})
        if nif: e["nif"] = nif
        if taula == "comarca": e["llocComarca"] = int(lloc)
        elif taula == "demarcacio": e["llocDemarcacio"] = int(lloc)
        elif taula == "sector":
            e.setdefault("sectors", []).append({"sector": sector, "lloc": int(lloc)})
    if not comarca_feta or n_comarca != 25: raise ValueError(f"rànquing de la comarca incomplet ({n_comarca})")
    ed["empreses"] = sorted(empreses.values(), key=lambda e: -e["facturacio"])
    return ed

def main():
    estat = json.load(open(ESTAT)) if os.path.exists(ESTAT) else {"edicions": {}}
    edicions, errors = {}, []
    for f in sorted(os.listdir(TEXT)):
        a = int(f[:4])
        try:
            ed = llegeix(a)
            ed["url"] = estat["edicions"].get(str(a), {}).get("url")
            edicions[str(a)] = ed
            print(f"Edició {a}: dades del {ed['anys'][1]}, {len(ed['empreses'])} empreses dels cinc municipis")
        except Exception as e:
            errors.append(f"{a}: {e}")
            print(f"Edició {a}: no s'ha pogut llegir ({e})")
    if not edicions: sys.exit("Cap edició llegible")
    darrera = max(edicions, key=int)
    if any(e.startswith(darrera) for e in errors): sys.exit(1)
    sortida = {
        "generat": datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds"),
        "font": "Diputació de Girona, «Estructura empresarial de la demarcació de Girona» (dades del Registre Mercantil)",
        "edicions": edicions,
        "noLlegides": errors,
    }
    anterior = json.load(open(SORTIDA)) if os.path.exists(SORTIDA) else None
    if anterior and anterior.get("edicions") == edicions:
        print("Sense canvis a les dades"); return
    json.dump(sortida, open(SORTIDA, "w"), ensure_ascii=False, indent=1)

if __name__ == "__main__":
    main()
