"""TDT i ràdio — La TdG · 05.11.2026

Baixa un cop al dia les llistes públiques de TDTChannels (tv.json i radio.json,
https://www.tdtchannels.com/listas/) i en desa una versió reduïda a tdt/ perquè la
pàgina tdt/index.html les llegeixi sense dependre de tdtchannels.com.

Si una baixada falla o arriba buida, no es toca el fitxer que ja hi ha.

14.11.2026: també la programació (EPG) de TDTChannels (epg/TV.json i epg/RADIO.json),
reduïda a les cadenes i emissores de les llistes i a la franja d'avui i demà, a tdt/epg.json.
«python tdt/actualitza.py epg» només baixa la programació (el workflow ho fa cada 6 hores).

22.11.2026: «Món». A la mateixa hora, la llista oberta d'iptv-org (https://github.com/iptv-org/iptv,
la que fa servir FreeTV) a tdt/mon.json: totes les cadenes del món amb senyal obert, sense les
d'adults, les tancades ni les de la llista de bloqueig, i sense les que ja hi ha a TDTChannels.
Les cadenes i emissores internacionals de TDTChannels es reclassifiquen per país (camp «cc») i les
de televisió hi sumen els senyals d'iptv-org que no tenien (marcats amb «fi»). Si iptv-org falla,
es manté el mon.json anterior i la classificació i els senyals de l'última llista bona.
"""
import hashlib
import json
import re
import sys
import unicodedata
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import requests

FONTS = {
    "tv": "https://www.tdtchannels.com/lists/tv.json",
    "radio": "https://www.tdtchannels.com/lists/radio.json",
}
FONTS_EPG = {
    "tv": "https://www.tdtchannels.com/epg/TV.json",
    "radio": "https://www.tdtchannels.com/epg/RADIO.json",
}
# 14.11.2026: si la de TDTChannels falla, la mateixa programació publicada a OndaChannels (mateix projecte).
RECANVI_EPG = {"radio": "https://www.ondachannels.com/epg/RADIO.json"}
CARPETA = Path(__file__).resolve().parent
LOGOS = CARPETA / "logos"
TIPUS_IMATGE = {"image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/gif": "gif", "image/svg+xml": "svg"}


def baixa_logo(url):
    """Copia el logotip a tdt/logos/ (un cop; si ja hi és, no es torna a baixar).
    Torna l'adreça relativa o None si no s'ha pogut."""
    h = hashlib.sha1(url.encode()).hexdigest()[:16]
    ja = list(LOGOS.glob(h + ".*"))
    if ja:
        return "logos/" + ja[0].name
    try:
        r = requests.get(url, timeout=20, headers={"User-Agent": "Mozilla/5.0 (LaTdG-redaccio)"})
        tipus = r.headers.get("Content-Type", "").split(";")[0].strip().lower()
        if r.status_code != 200 or tipus not in TIPUS_IMATGE or not (200 < len(r.content) < 600_000):
            return None
        fitxer = LOGOS / f"{h}.{TIPUS_IMATGE[tipus]}"
        fitxer.write_bytes(r.content)
        return "logos/" + fitxer.name
    except Exception:  # noqa: BLE001
        return None


def logos_locals(totes):
    """Substitueix l'adreça de cada logotip per la còpia local quan s'ha pogut baixar."""
    LOGOS.mkdir(exist_ok=True)
    urls = sorted({c["l"] for canals in totes for c in canals if c.get("l", "").startswith("http")})
    with ThreadPoolExecutor(16) as ex:
        local = dict(zip(urls, ex.map(baixa_logo, urls)))
    for canals in totes:
        for c in canals:
            if local.get(c.get("l")):
                c["lo"] = c["l"]          # adreça original, per si cal
                c["l"] = local[c["l"]]
    print(f"🖼️ logotips: {sum(1 for v in local.values() if v)} de {len(urls)} copiats")


def redueix(dades):
    canals = []
    for pais in dades.get("countries", []):
        for ambit in pais.get("ambits", []):
            for c in ambit.get("channels", []):
                opcions = []
                for o in c.get("options") or []:
                    if not o.get("url"):
                        continue
                    op = {"f": o.get("format") or "", "u": o["url"]}
                    if o.get("geo2"):
                        op["g"] = o["geo2"]
                    if o.get("res"):
                        op["r"] = o["res"]
                    if o.get("lang"):
                        op["ll"] = o["lang"]
                    opcions.append(op)
                canal = {
                    "n": c.get("name") or "",
                    "a": ambit.get("name") or "",
                    "p": pais.get("name") or "",
                    "o": opcions,
                }
                for clau, camp in (("l", "logo"), ("w", "web"), ("e", "epg_id"), ("ref", "referer")):
                    if c.get(camp):
                        canal[clau] = c[camp]
                if c.get("extra_info"):
                    canal["x"] = c["extra_info"]
                canals.append(canal)
    return canals


# ---------- Món (iptv-org) · 22.11.2026 ----------
IPTV = "https://iptv-org.github.io/api/"
# Àmbits temàtics de TDTChannels → categories d'iptv-org.
CAT_AMBIT = {"Musicales": "music", "Religiosos": "religious", "Deportivos Int.": "sports"}
# Països tal com surten als noms de TDTChannels («La7 Italia», «Canal 7 Argentina»…).
PAISOS_NOM = {
    "andorra": "AD", "alemania": "DE", "argentina": "AR", "australia": "AU", "austria": "AT", "belgica": "BE",
    "bolivia": "BO", "brasil": "BR", "bulgaria": "BG", "canada": "CA", "chile": "CL", "china": "CN",
    "colombia": "CO", "corea del sur": "KR", "corea": "KR", "costa rica": "CR", "croacia": "HR", "cuba": "CU",
    "dinamarca": "DK", "ecuador": "EC", "egipto": "EG", "el salvador": "SV", "eslovaquia": "SK",
    "eslovenia": "SI", "estonia": "EE", "filipinas": "PH", "finlandia": "FI", "francia": "FR", "grecia": "GR",
    "guatemala": "GT", "honduras": "HN", "hungria": "HU", "india": "IN", "indonesia": "ID", "irlanda": "IE",
    "islandia": "IS", "israel": "IL", "italia": "IT", "japon": "JP", "letonia": "LV", "lituania": "LT",
    "luxemburgo": "LU", "malta": "MT", "marruecos": "MA", "mexico": "MX", "monaco": "MC", "nicaragua": "NI",
    "noruega": "NO", "paises bajos": "NL", "holanda": "NL", "panama": "PA", "paraguay": "PY", "peru": "PE",
    "polonia": "PL", "portugal": "PT", "puerto rico": "PR", "qatar": "QA", "reino unido": "GB", "uk": "GB",
    "republica checa": "CZ", "republica dominicana": "DO", "rumania": "RO", "rusia": "RU", "serbia": "RS",
    "suecia": "SE", "suiza": "CH", "turquia": "TR", "ucrania": "UA", "uruguay": "UY", "usa": "US",
    "eeuu": "US", "estados unidos": "US", "venezuela": "VE", "oman": "OM", "arabia saudi": "SA",
    "emiratos": "AE", "espana": "ES", "canarias": "ES", "catar": "QA", "pakistan": "PK", "iran": "IR",
    "singapur": "SG", "taiwan": "TW", "ghana": "GH", "chequia": "CZ", "bielorrusia": "BY", "montenegro": "ME",
    "albania": "AL", "trinidad y tobago": "TT", "gibraltar": "GI", "argelia": "DZ", "tunez": "TN", "nigeria": "NG", "sudafrica": "ZA", "kenia": "KE",
}
# 22.11.2026: comunitat autònoma de les cadenes espanyoles d'iptv-org (camp «subdivision», ISO 3166-2:ES,
# que pot ser la comunitat o la província), amb el mateix nom d'àmbit que fa servir TDTChannels.
COMUNITATS = {"AN": "Andalucía", "AR": "Aragón", "AS": "P. de Asturias", "IB": "Illes Balears", "CN": "Canarias",
              "CB": "Cantabria", "CL": "Castilla y León", "CM": "Castilla-La Mancha", "CT": "Cataluña", "CE": "Ceuta",
              "EX": "Extremadura", "GA": "Galicia", "RI": "La Rioja", "MD": "C. de Madrid", "ML": "Melilla",
              "MC": "R. de Murcia", "NC": "C. Foral de Navarra", "PV": "País Vasco", "VC": "C. Valenciana"}
PROVINCIES = {"AN": "AL CA CO GR H J MA SE", "AR": "HU TE Z", "AS": "O", "IB": "PM", "CN": "GC TF", "CB": "S",
              "CL": "AV BU LE P SA SG SO VA ZA", "CM": "AB CR CU GU TO", "CT": "B GI L T", "EX": "BA CC",
              "GA": "C LU OU PO", "RI": "LO", "MD": "M", "MC": "MU", "NC": "NA", "PV": "VI SS BI", "VC": "A CS V"}
PROVINCIA_COMUNITAT = {p: ca for ca, ps in PROVINCIES.items() for p in ps.split()}


def comunitat(subdivisio):
    codi = str(subdivisio or "").upper().removeprefix("ES-")
    return COMUNITATS.get(codi) or COMUNITATS.get(PROVINCIA_COMUNITAT.get(codi, ""))


# Dominis de país que no indiquen el país (es fan servir per a qualsevol cosa).
TLD_GENERICS = {"tv", "fm", "me", "io", "ai", "co", "ws", "cc", "to", "ly", "am", "gg", "la", "eu", "int"}


def normalitza(t):
    t = unicodedata.normalize("NFKD", str(t or "")).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9 ]+", " ", t).strip()


def clau_nom(t):
    """Nom per comparar cadenes: sense accents, signes, «HD», «TV» ni el país al final."""
    t = normalitza(t)
    for pais in sorted(PAISOS_NOM, key=len, reverse=True):
        t = re.sub(rf"\b{pais}$", "", t).strip()
    t = re.sub(r"\b(hd|fhd|uhd|4k|sd|tv|channel|canal)\b", " ", t)
    return re.sub(r"\s+", "", t)


def pais_del_nom(nom):
    n = normalitza(nom)
    for pais in sorted(PAISOS_NOM, key=len, reverse=True):
        if re.search(rf"\b{pais}\b", n):
            return PAISOS_NOM[pais]
    return None


def pais_del_web(web):
    m = re.match(r"https?://([^/:?#]+)", str(web or ""))
    if not m:
        return None
    tld = m.group(1).lower().rsplit(".", 1)[-1]
    if len(tld) != 2 or tld in TLD_GENERICS:
        return None
    return "GB" if tld == "uk" else tld.upper()


def format_senyal(u):
    if re.search(r"(youtube\.com|youtu\.be)/", u):
        return "youtube"
    if re.search(r"\.m3u8?(\?|$)", u.split("#")[0], re.I):
        return "m3u8"
    return None


def baixa_iptv():
    """Torna {fitxer: dades} de l'API d'iptv-org, o None si falla alguna de les imprescindibles."""
    dades = {}
    for nom in ("channels", "streams", "logos", "blocklist", "feeds"):
        try:
            r = requests.get(IPTV + nom + ".json", timeout=180, headers={"User-Agent": "LaTdG-redaccio/1.0"})
            r.raise_for_status()
            d = r.json()
            if not isinstance(d, list):
                raise ValueError("no és una llista")
            dades[nom] = d
        except Exception as e:  # noqa: BLE001
            print(f"❌ iptv-org {nom}: {e}")
            if nom in ("channels", "streams"):
                return None
            dades[nom] = []
    if len(dades["channels"]) < 1000 or len(dades["streams"]) < 1000:
        print("❌ iptv-org: llista massa curta")
        return None
    return dades


def mon(ara, llistes):
    """Reclassifica les internacionals de TDTChannels i desa tdt/mon.json (llistes: {"tv": [...], "radio": [...]})."""
    # Classificació i senyals de l'última llista bona, per si avui iptv-org falla.
    vell = {}
    for nom in llistes:
        try:
            for c in json.loads((CARPETA / f"{nom}.json").read_text(encoding="utf-8"))["canals"]:
                if c.get("p") == "International":
                    vell[(nom, c["n"])] = c
        except Exception:  # noqa: BLE001
            pass

    dades = baixa_iptv()
    canals_iptv, per_nom, senyals = {}, {}, {}
    if dades:
        bloquejats = {b.get("channel") for b in dades["blocklist"] if isinstance(b, dict)}
        for c in dades["channels"]:
            if not isinstance(c, dict) or not c.get("id") or not c.get("name"):
                continue
            if c.get("is_nsfw") or c.get("closed") or c.get("replaced_by") or c["id"] in bloquejats:
                continue
            canals_iptv[c["id"]] = c
        for s in dades["streams"]:
            if not isinstance(s, dict) or s.get("channel") not in canals_iptv or not s.get("url"):
                continue
            f = format_senyal(s["url"])
            if not f:
                continue
            ll = senyals.setdefault(s["channel"], [])
            if any(o["u"] == s["url"] for o in ll):
                continue
            op = {"f": f, "u": s["url"], "fi": 1}
            if s.get("quality"):
                op["r"] = s["quality"]
            if s.get("label"):
                op["ll"] = s["label"]
            if s.get("referrer"):
                op["rf"] = s["referrer"]
            ll.append(op)
        for cid in senyals:
            c = canals_iptv[cid]
            for n in [c["name"], *(c.get("alt_names") or [])]:
                k = clau_nom(n)
                if k:
                    per_nom.setdefault(k, []).append(cid)

    def troba(nom, cc):
        cands = per_nom.get(clau_nom(nom)) or []
        if cc:
            cands = [x for x in cands if (canals_iptv[x].get("country") or "").upper().replace("UK", "GB") == cc] or (cands if len(cands) == 1 else [])
        return cands[0] if len(cands) == 1 or (cands and cc) else None

    usats = set()
    # Les de TDTChannels que ja són a Espanya no es repeteixen al Món.
    for c in llistes.get("tv", []):
        if c.get("p") == "Spain":
            for cid in per_nom.get(clau_nom(c["n"])) or []:
                if (canals_iptv[cid].get("country") or "").upper() == "ES":
                    usats.add(cid)
    reclassificades = 0
    for nom, canals in llistes.items():
        for c in canals:
            if c.get("p") != "International":
                continue
            cc = pais_del_nom(c["n"]) or pais_del_web(c.get("w"))
            cat = CAT_AMBIT.get(c.get("a"))
            cid = troba(c["n"], cc) if nom == "tv" and dades else None
            if cid:
                usats.add(cid)
                ic = canals_iptv[cid]
                cc = cc or ((ic.get("country") or "").upper().replace("UK", "GB") or None)
                cat = cat or ((ic.get("categories") or [None])[0])
                ja = {o["u"] for o in c["o"]}
                c["o"] += [o for o in senyals.get(cid, []) if o["u"] not in ja]
            elif not dades and (nom, c["n"]) in vell:
                v = vell[(nom, c["n"])]
                ja = {o["u"] for o in c["o"]}
                c["o"] += [o for o in v.get("o", []) if o.get("fi") and o["u"] not in ja]
                cc = cc or v.get("cc")
                cat = cat or v.get("k")
            if cc:
                c["cc"] = cc
                reclassificades += 1
            if cat:
                c["k"] = cat
    print(f"🌍 internacionals de TDTChannels amb país: {reclassificades}")
    if not dades:
        return False

    logos = {}
    for l in dades["logos"]:
        if isinstance(l, dict) and l.get("channel") and str(l.get("url", "")).startswith("http"):
            # el logotip general de la cadena (sense «feed») té preferència
            if l["channel"] not in logos or (not l.get("feed") and logos[l["channel"]][0]):
                logos[l["channel"]] = (bool(l.get("feed")), l["url"])
    # Comunitat de les cadenes espanyoles segons la zona d'emissió dels seus senyals («s/ES-CT», «s/ES-B»…).
    comunitat_feed = {}
    for f in dades.get("feeds", []):
        if not isinstance(f, dict) or not f.get("channel"):
            continue
        for zona in f.get("broadcast_area") or []:
            if isinstance(zona, str) and zona.upper().startswith("S/ES-") and comunitat(zona[2:]):
                if f.get("is_main") or f["channel"] not in comunitat_feed:
                    comunitat_feed[f["channel"]] = comunitat(zona[2:])
                break
    sortida = []
    for cid, ops in senyals.items():
        if cid in usats or not ops:
            continue
        ic = canals_iptv[cid]
        canal = {"n": ic["name"], "a": "", "p": "Món", "cc": (ic.get("country") or "").upper().replace("UK", "GB"), "o": []}
        for o in ops:
            o = dict(o)
            rf = o.pop("rf", None)
            if rf and not canal.get("ref"):
                canal["ref"] = rf
            canal["o"].append(o)
        if canal["cc"] == "ES":
            ca = comunitat(ic.get("subdivision")) or comunitat_feed.get(cid)
            if ca:
                canal["ca"] = ca
        cats = [k for k in (ic.get("categories") or []) if isinstance(k, str)]
        if cats:
            canal["k"] = cats[0]
        if cid in logos:
            canal["l"] = logos[cid][1]
        webs = ic.get("website")
        web = webs[0] if isinstance(webs, list) and webs else webs if isinstance(webs, str) else None
        if web:
            canal["w"] = web
        sortida.append(canal)
    if len(sortida) < 500:
        print(f"❌ Món: només {len(sortida)} cadenes; es manté l'anterior")
        return False
    sortida.sort(key=lambda c: normalitza(c["n"]))
    (CARPETA / "mon.json").write_text(json.dumps({
        "actualitzat": ara.strftime("%d.%m.%Y %H.%M"),
        "font": "iptv-org (https://github.com/iptv-org/iptv)",
        "canals": sortida,
    }, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"✅ Món: {len(sortida)} cadenes")
    return True


def programacio(ara):
    """Desa tdt/epg.json: {tv: {epg_id: [[inici, final, títol, descripció, gènere], …]}, radio: {…}}.
    Hores en segons Unix; només des de les 00.00 d'avui fins al final de demà."""
    inici = int(ara.replace(hour=0, minute=0, second=0, microsecond=0).timestamp())
    final = inici + 2 * 86400 + 3600
    sortida = {"actualitzat": ara.strftime("%d.%m.%Y %H.%M"), "font": "TDTChannels (https://www.tdtchannels.com)"}
    bons = 0
    for nom, url in FONTS_EPG.items():
        try:
            ids = {c["e"] for c in json.loads((CARPETA / f"{nom}.json").read_text(encoding="utf-8"))["canals"] if c.get("e")}
        except Exception:  # noqa: BLE001
            ids = None
        try:
            try:
                r = requests.get(url, timeout=120, headers={"User-Agent": "LaTdG-redaccio/1.0"})
                r.raise_for_status()
                llista = r.json()
                if not isinstance(llista, list) or len(llista) < 5:
                    raise ValueError("buida")
            except Exception as e:  # noqa: BLE001
                if nom not in RECANVI_EPG:
                    raise
                print(f"⚠️ programació {nom} de TDTChannels: {e}; provo OndaChannels")
                r = requests.get(RECANVI_EPG[nom], timeout=120, headers={"User-Agent": "LaTdG-redaccio/1.0"})
                r.raise_for_status()
                llista = r.json()
            canals = {}
            for c in llista:
                if not c.get("name") or (ids is not None and c["name"] not in ids):
                    continue
                emissions = []
                for e in sorted(c.get("events") or [], key=lambda e: e.get("hi") or 0):
                    hi, hf = int(e.get("hi") or 0), int(e.get("hf") or 0)
                    if not hi or not e.get("t") or hi >= final or (hf and hf <= inici):
                        continue
                    d = " ".join(str(e.get("d") or "").split())
                    if len(d) > 2000:   # 14.11.2026: la descripció sencera (abans es tallava a 280)
                        d = d[:1997].rsplit(" ", 1)[0] + "…"
                    emissions.append([hi, hf, str(e["t"]).strip(), d, e.get("g") or ""])
                if emissions:
                    canals[c["name"]] = emissions
            if len(canals) < 5:
                raise ValueError(f"només {len(canals)} canals amb programació")
        except Exception as e:  # noqa: BLE001
            print(f"❌ programació {nom}: {e}")
            continue
        sortida[nom] = canals
        bons += 1
        print(f"✅ programació {nom}: {len(canals)} canals")
    if not bons:
        return False
    fitxer = CARPETA / "epg.json"
    if bons < len(FONTS_EPG) and fitxer.exists():
        # Si una de les dues ha fallat, es manté la que ja hi havia.
        try:
            vell = json.loads(fitxer.read_text(encoding="utf-8"))
            for nom in FONTS_EPG:
                if nom not in sortida and nom in vell:
                    sortida[nom] = vell[nom]
        except Exception:  # noqa: BLE001
            pass
    fitxer.write_text(json.dumps(sortida, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return True


def main():
    ara = datetime.now(ZoneInfo("Europe/Madrid"))
    if sys.argv[1:] == ["epg"]:
        sys.exit(0 if programacio(ara) else 1)
    errors = 0
    llistes = {}
    for nom, url in FONTS.items():
        try:
            r = requests.get(url, timeout=60, headers={"User-Agent": "LaTdG-redaccio/1.0"})
            r.raise_for_status()
            canals = redueix(r.json())
            if len(canals) < 20:
                raise ValueError(f"només {len(canals)} canals")
        except Exception as e:  # noqa: BLE001
            print(f"❌ {nom}: {e}")
            errors += 1
            continue
        llistes[nom] = canals
    if llistes:
        try:
            mon(ara, llistes)
        except Exception as e:  # noqa: BLE001
            print(f"❌ Món: {e}")
        logos_locals(llistes.values())
    for nom, canals in llistes.items():
        sortida = {
            "actualitzat": ara.strftime("%d.%m.%Y %H.%M"),
            "font": "TDTChannels (https://www.tdtchannels.com)",
            "canals": canals,
        }
        (CARPETA / f"{nom}.json").write_text(
            json.dumps(sortida, ensure_ascii=False, separators=(",", ":")), encoding="utf-8"
        )
        print(f"✅ {nom}: {len(canals)} canals")
    programacio(ara)
    sys.exit(1 if errors == len(FONTS) else 0)


if __name__ == "__main__":
    main()
