// Sonda 3 (31.10.2026)
import fs from "fs";
const B = "https://resultats.dadeselectorals.gencat.cat/webelec/api";
const out = {};
const js = await (await fetch("https://resultats.dadeselectorals.gencat.cat/main.js")).text();
out.rutes = [...new Set(js.match(/this\.baseUrl\+"[^;]{0,260}/g) || [])];
const prova = async u => { try { const r = await fetch(B + u); out[u] = r.status + " " + (await r.text()).slice(0, 3000); } catch (e) { out[u] = String(e); } };
for (const c of ["17205", "172057", "1720570005", "Ullastret"]) await prova("/proces/A20241/territori/MU-" + c + "/vot");
await prova("/proces/M20231/territori/MU-172057/vot");
await prova("/territori?nom=Ullastret");
await prova("/proces/A20241/nivellTerritorial/MU/candidatura");
fs.writeFileSync("eleccions/sonda.json", JSON.stringify(out, null, 1));
