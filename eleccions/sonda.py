# Sonda (31.10.2026): per què no entren les eleccions antigues.
import sys, json, io, zipfile, traceback
sys.path.insert(0, "eleccions")
import eleccions as E
out = []
try:
    llista = E.eleccions_gencat(set())
    out.append("gencat: " + str(len(llista)) + " " + str([x[0] for x in llista if x[2] < "1984"]))
except Exception:
    out.append(traceback.format_exc())
for codi in ["G19771", "A19801", "M19791", "R19761"]:
    try:
        r = E.requests.get(f"{E.GENCAT}/proces/{codi}/nivellTerritorial/ME/territori/17022/exportacio", headers=E.CAPCALERES, timeout=(15, 40))
        out.append(f"{codi} export: {r.status_code} {r.content[:2]} {len(r.content)}")
        if r.content[:2] == b"PK":
            zf = zipfile.ZipFile(io.BytesIO(r.content))
            for n in zf.namelist():
                out.append("   " + n + " " + repr(zf.read(n)[:300]))
    except Exception:
        out.append(codi + " export: " + traceback.format_exc()[-300:])
    try:
        m = E.municipi_gencat(codi, "17022", "la Bisbal")
        out.append(f"{codi} municipi: " + json.dumps(m, ensure_ascii=False)[:400])
    except Exception:
        out.append(codi + " municipi: " + traceback.format_exc()[-500:])
    try:
        e = E.processa_gencat(codi, "prova", "1977-06-15", "congres", nomes=["17022"])
        out.append(f"{codi} processa: " + json.dumps(e, ensure_ascii=False)[:300])
    except Exception:
        out.append(codi + " processa: " + traceback.format_exc()[-500:])
open("eleccions/sonda.txt", "w", encoding="utf-8").write("\n".join(out))
