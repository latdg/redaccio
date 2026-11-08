# AUDIÈNCIA I AJUTS — La TdG · 08.11.2026
#
# Un cop al dia recull:
#  1. AUDIÈNCIA: seguidors i interaccions de La TdG a Bluesky i Mastodon (API públiques,
#     sense claus) i membres del canal de Telegram @laTdG_podcast (cal el secret
#     TELEGRAM_BOT_TOKEN_CANAL, el token d'un bot que sigui administrador del canal).
#     Es desa una fila per dia a dades/audiencia.json, perquè se'n vegi l'evolució.
#  2. AJUTS: convocatòries de la Base de Dades Nacional de Subvencions (BDNS) que
#     parlin de mitjans de comunicació, premsa, ràdio, audiovisual o periodisme.
#     Es desen a dades/ajuts-mitjans.json i, les noves, s'avisen al bot privat
#     LaTdG_infos (secrets TELEGRAM_BOT_TOKEN_INFOS i TELEGRAM_CHAT_ID_INFOS).
#
# Si una font falla, la resta continua; el registre ho diu.

import json, os, re, sys, datetime as dt
from pathlib import Path
import requests

ARREL = Path(__file__).resolve().parent.parent
F_AUD = ARREL / "dades" / "audiencia.json"
F_AJUTS = ARREL / "dades" / "ajuts-mitjans.json"

BLUESKY = "latdg-podcast.bsky.social"
MASTODON_SERVIDOR, MASTODON_COMPTE = "mastodon.social", "latdg"
TELEGRAM_CANAL = "@laTdG_podcast"

AVUI = dt.datetime.now(dt.timezone(dt.timedelta(hours=1))).date()
H = {"User-Agent": "LaTdG-audiencia/1.0 (+https://latdg.github.io)"}


def llegeix(f, buit):
    try:
        return json.loads(f.read_text(encoding="utf-8"))
    except Exception:
        return buit


def desa(f, dades):
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(json.dumps(dades, ensure_ascii=False, indent=1), encoding="utf-8")


def data_cat(iso):
    """2026-11-08 → 08.11.2026"""
    try:
        a, m, d = str(iso)[:10].split("-")
        return f"{d}.{m}.{a}"
    except Exception:
        return str(iso)


def amb_article(d):
    """«el 08.11.2026», però «l'01.11.2026» i «l'11.11.2026»."""
    return ("l'" if d[:2] in ("01", "11") else "el ") + d


def fa_dies(iso_text, dies=7):
    try:
        d = dt.datetime.fromisoformat(iso_text.replace("Z", "+00:00")).date()
        return (AVUI - d).days < dies
    except Exception:
        return False


# ───────────────────────── 1. AUDIÈNCIA ─────────────────────────

def bluesky():
    p = requests.get("https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile",
                     params={"actor": BLUESKY}, headers=H, timeout=30).json()
    feed = requests.get("https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed",
                        params={"actor": BLUESKY, "limit": 100, "filter": "posts_no_replies"},
                        headers=H, timeout=30).json().get("feed", [])
    m = r = c = n = 0
    for it in feed:
        post = it.get("post", {})
        if it.get("reason") or not fa_dies(post.get("indexedAt", "")):
            continue  # només publicacions pròpies dels darrers 7 dies
        n += 1
        m += post.get("likeCount", 0)
        r += post.get("repostCount", 0) + post.get("quoteCount", 0)
        c += post.get("replyCount", 0)
    return {"seguidors": p.get("followersCount"), "publicacions7d": n,
            "magrades7d": m, "compartits7d": r, "respostes7d": c}


def mastodon():
    base = f"https://{MASTODON_SERVIDOR}/api/v1"
    p = requests.get(f"{base}/accounts/lookup", params={"acct": MASTODON_COMPTE},
                     headers=H, timeout=30).json()
    st = requests.get(f"{base}/accounts/{p['id']}/statuses",
                      params={"limit": 40, "exclude_reblogs": "true", "exclude_replies": "true"},
                      headers=H, timeout=30).json()
    st = [s for s in st if fa_dies(s.get("created_at", ""))]
    return {"seguidors": p.get("followers_count"), "publicacions7d": len(st),
            "magrades7d": sum(s.get("favourites_count", 0) for s in st),
            "compartits7d": sum(s.get("reblogs_count", 0) for s in st),
            "respostes7d": sum(s.get("replies_count", 0) for s in st)}


def telegram():
    tok = os.environ.get("TELEGRAM_BOT_TOKEN_CANAL", "").strip()
    if not tok:
        return None  # encara no hi ha el secret
    r = requests.get(f"https://api.telegram.org/bot{tok}/getChatMemberCount",
                     params={"chat_id": TELEGRAM_CANAL}, timeout=30).json()
    if not r.get("ok"):
        raise RuntimeError(r.get("description", "resposta sense dades"))
    return {"seguidors": r["result"]}


def _xifra(obj, claus):
    """Busca, a qualsevol nivell, el primer camp numèric amb algun d'aquests noms."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k.lower() in claus and isinstance(v, (int, float)):
                return v
        for v in obj.values():
            r = _xifra(v, claus)
            if r is not None:
                return r
    elif isinstance(obj, list):
        for v in obj:
            r = _xifra(v, claus)
            if r is not None:
                return r
    return None


def whatsapp():
    # 08.11.2026: canal de WhatsApp via Whapi.Cloud (secret WHAPI_TOKEN; opcional
    # WHAPI_CANAL amb l'id del canal, acabat en @newsletter). Whapi no documenta el
    # nombre de seguidors; es busca a la resposta i, el primer cop, se'n registren els
    # camps perquè es pugui afinar.
    tok = os.environ.get("WHAPI_TOKEN", "").strip()
    if not tok:
        return None
    hw = {"Authorization": f"Bearer {tok}", "Accept": "application/json"}
    canal = os.environ.get("WHAPI_CANAL", "").strip()
    if not canal:
        ll = requests.get("https://gate.whapi.cloud/newsletters", headers=hw, timeout=30).json()
        ll = ll.get("newsletters", ll) if isinstance(ll, dict) else ll
        propis = [n for n in ll if str(n.get("role", "")).lower() in ("owner", "admin")] or ll
        if not propis:
            raise RuntimeError("no s'ha trobat cap canal")
        canal = propis[0]["id"]
    info = requests.get(f"https://gate.whapi.cloud/newsletters/{canal}", headers=hw, timeout=30).json()
    print("  camps del canal:", sorted(info.keys()) if isinstance(info, dict) else type(info))
    seg = _xifra(info, {"subscribers", "subscribers_count", "subscriberscount", "followers", "followers_count"})
    res = {"seguidors": seg}
    try:
        msg = requests.get(f"https://gate.whapi.cloud/newsletters/{canal}/messages",
                           params={"count": 50}, headers=hw, timeout=30).json()
        msg = msg.get("messages", []) if isinstance(msg, dict) else msg
        msg = [m for m in msg if (AVUI - dt.date.fromtimestamp(m.get("timestamp", 0))).days < 7]
        if msg:
            print("  camps d'un missatge:", sorted(msg[0].keys()))
        vistes = [_xifra(m, {"views", "view_count", "views_count"}) for m in msg]
        reacc = [_xifra(m, {"reactions_count", "reaction_count"}) for m in msg]
        res["publicacions7d"] = len(msg)
        if any(v is not None for v in vistes):
            res["vistes7d"] = sum(v or 0 for v in vistes)
        if any(v is not None for v in reacc):
            res["magrades7d"] = sum(v or 0 for v in reacc)
    except Exception as e:
        print(f"  ⚠️ missatges del canal: {e}")
    return res


def audiencia():
    hist = llegeix(F_AUD, {"dies": []})
    fila = {"data": AVUI.isoformat()}
    for nom, f in (("bluesky", bluesky), ("mastodon", mastodon), ("telegram", telegram), ("whatsapp", whatsapp)):
        try:
            v = f()
            if v is None:
                print(f"· {nom}: falta el secret, se salta")
                continue
            fila[nom] = v
            print(f"✓ {nom}: {v}")
        except Exception as e:
            print(f"⚠️ {nom}: {e}")
    dies = [d for d in hist.get("dies", []) if d.get("data") != fila["data"]]
    dies.append(fila)
    dies.sort(key=lambda d: d["data"])
    hist["dies"] = dies[-400:]  # poc més d'un any
    hist["actualitzat"] = data_cat(AVUI.isoformat())
    desa(F_AUD, hist)


# ───────────────────────── 2. AJUTS ─────────────────────────

BDNS = "https://www.infosubvenciones.es/bdnstrans/api/convocatorias/busqueda"
PARAULES = ["medios de comunicación", "mitjans de comunicació", "prensa", "premsa",
            "periodismo", "periodisme", "radio", "ràdio", "audiovisual", "pódcast", "podcast",
            "comunicación local", "comunicació local", "espacio catalán de comunicación",
            "espai català de comunicació"]
# Per filtrar soroll: ha de dir alguna d'aquestes coses al títol.
CLAU = re.compile(r"mitjans|medios|premsa|prensa|periodis|r[aà]dio|audiovisual|p[oó]dcast|comunicaci[oó]", re.I)
# Fora les subvencions a dit (directes, nominatives, convenis): no s'hi pot optar.
A_DIT = re.compile(r"directa|nominativ|nominad|conveni|a favor de|concesi[oó]n directa", re.I)
# Àmbit: Estat, Generalitat (Catalunya) i administracions locals de Girona i de la comarca.
LOCALS = re.compile(r"girona|baix empord|bisbal|cor[cç][aà]|forallac|cru[iï]lles|monells|ullastret|gavarres", re.I)


def ens_interessa(c):
    if A_DIT.search(c.get("titol", "")):
        return False
    ambit, organ = c.get("ambit", ""), c.get("organ", "")
    if ambit == "ESTADO":
        return True
    if ambit == "AUTONOMICA":
        return bool(re.search(r"catalu", organ, re.I))
    if ambit == "LOCAL":
        return bool(LOCALS.search(organ))
    return False


def bdns(paraula, desde):
    r = requests.get(BDNS, params={"vpd": "GE", "page": 0, "pageSize": 50,
                                   "order": "fechaRecepcion", "direccion": "desc",
                                   "descripcion": paraula, "descripcionTipoBusqueda": 0,
                                   "fechaDesde": desde.strftime("%d/%m/%Y")},
                     headers=H, timeout=60)
    r.raise_for_status()
    return r.json().get("content", [])


def avisa(text):
    tok = os.environ.get("TELEGRAM_BOT_TOKEN_INFOS", "").strip()
    xat = os.environ.get("TELEGRAM_CHAT_ID_INFOS", "").strip()
    if not (tok and xat):
        print("· Sense secrets del bot LaTdG_infos: no s'avisa")
        return
    requests.post(f"https://api.telegram.org/bot{tok}/sendMessage",
                  data={"chat_id": xat, "text": text, "disable_web_page_preview": "true"},
                  timeout=30)


def ajuts():
    estat = llegeix(F_AJUTS, {"convocatories": []})
    vistes = {c["id"] for c in estat["convocatories"]}
    primera = not vistes
    desde = AVUI - dt.timedelta(days=120)
    trobades = {}
    for p in PARAULES:
        try:
            for c in bdns(p, desde):
                titol = (c.get("descripcionLeng") or c.get("descripcion") or "").strip()
                if not CLAU.search(titol + " " + (c.get("descripcion") or "")):
                    continue
                num = str(c.get("numeroConvocatoria") or c.get("id"))
                trobades[num] = {
                    "id": num,
                    "titol": titol,
                    "organ": " · ".join(x for x in (c.get("nivel2"), c.get("nivel3")) if x),
                    "ambit": c.get("nivel1") or "",
                    "data": data_cat(c.get("fechaRecepcion", "")),
                    "iso": str(c.get("fechaRecepcion", ""))[:10],
                    "enllac": f"https://www.infosubvenciones.es/bdnstrans/GE/es/convocatorias/{num}",
                }
        except Exception as e:
            print(f"⚠️ BDNS «{p}»: {e}")
    trobades = {k: c for k, c in trobades.items() if ens_interessa(c)}
    noves = [c for k, c in trobades.items() if k not in vistes]
    print(f"✓ BDNS: {len(trobades)} convocatòries; {len(noves)} noves")
    tot = {c["id"]: c for c in estat["convocatories"] if ens_interessa(c)}
    tot.update(trobades)
    llista = sorted(tot.values(), key=lambda c: c.get("iso", ""), reverse=True)[:200]
    estat = {"actualitzat": data_cat(AVUI.isoformat()), "convocatories": llista}
    desa(F_AJUTS, estat)
    # El primer cop no s'avisa de tot el que ja hi havia: només es desa.
    if noves and not primera:
        for c in sorted(noves, key=lambda c: c.get("iso", "")):
            avisa(f"💶 AJUT PER A MITJANS\n{c['titol']}\n{c['organ']}\nPublicat {amb_article(c['data'])}\n{c['enllac']}")


if __name__ == "__main__":
    audiencia()
    ajuts()
