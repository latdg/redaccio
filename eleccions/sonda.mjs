// Sonda 2 (31.10.2026): rutes de l'API webelec i una prova per municipi.
import fs from "fs";
const B = "https://resultats.dadeselectorals.gencat.cat";
const out = {};
const js = await (await fetch(B + "/main.js")).text();
out.rutes = [...new Set((js.match(/.{0,160}webelec\/api.{0,220}/g) || []).concat(js.match(/.{0,120}nivellTerritorial.{0,200}/g) || []))].slice(0, 80);
const prova = async u => { try { const r = await fetch(B + u); out[u] = r.status + " " + (await r.text()).slice(0, 2500); } catch (e) { out[u] = String(e); } };
await prova("/webelec/api/proces/M20231/nivellTerritorial/MU/territori");
await prova("/webelec/api/proces/M20231/nivellTerritorial/MU");
await prova("/webelec/api/proces/A20241/nivellTerritorial/MU/territori?nom=Ullastret");
await prova("/webelec/api/proces/A20241/nivellTerritorial/MU/172057/vot");
await prova("/webelec/api/proces/A20241/nivellTerritorial/MU/territori/172057/vot");
await prova("/webelec/api/proces/A20241/nivellTerritorial/MU/17205/vot");
await prova("/webelec/api/proces/A20241/nivellTerritorial/CA/vot");
fs.writeFileSync("eleccions/sonda.json", JSON.stringify(out, null, 1));
