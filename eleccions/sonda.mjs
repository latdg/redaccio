// Sonda 5 (31.10.2026): format dels CSV mesa a mesa de la Generalitat i llista del mirall.
import fs from "fs";
import { execSync } from "child_process";
const out = {};
const B = "https://resultats.dadeselectorals.gencat.cat/webelec/api";
for (const [p, ine] of [["A20241", "17205"], ["A19801", "17022"]]) {
  const r = await fetch(`${B}/proces/${p}/nivellTerritorial/ME/territori/${ine}/exportacio`);
  fs.writeFileSync("/tmp/x.zip", Buffer.from(await r.arrayBuffer()));
  try { execSync("rm -rf /tmp/x && mkdir /tmp/x && cd /tmp/x && unzip -o -q /tmp/x.zip"); } catch (e) {}
  for (const f of fs.readdirSync("/tmp/x")) out[p + "/" + f] = fs.readFileSync("/tmp/x/" + f, "latin1").split("\n").slice(0, 14).join("\n");
}
const pr = await (await fetch(B + "/proces")).json();
out.processos = pr.map(x => x.codi + " " + x.nom + " " + new Date(x.data).toISOString().slice(0, 10)).join("\n");
for (const c of ["congreso", "municipales", "europeas"]) {
  const r = await fetch("https://api.github.com/repos/JaimeObregon/infoelectoral/contents/files/" + c, { headers: { "User-Agent": "LaTdG" } });
  out["mirall_" + c] = (await r.json()).map(x => x.name).filter(n => /_MESA$/.test(n)).join(" ");
}
fs.writeFileSync("eleccions/sonda.json", JSON.stringify(out, null, 1));
