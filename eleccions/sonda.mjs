// Sonda 4 (31.10.2026): eleccions disponibles mesa a mesa.
import fs from "fs";
const out = {};
const t = async (k, u, n = 4000) => { try { const r = await fetch(u, { headers: { "User-Agent": "LaTdG" } }); out[k] = r.status + " " + (await r.text()).slice(0, n); } catch (e) { out[k] = String(e); } };
for (const c of ["congreso", "municipales", "europeas", "senado"]) await t("mirall_" + c, "https://api.github.com/repos/JaimeObregon/infoelectoral/contents/files/" + c, 6000);
const B = "https://resultats.dadeselectorals.gencat.cat/webelec/api";
await t("nivells_A20241", B + "/proces/A20241/nivellTerritorial?requireMapa=false");
await t("nivells_M20231", B + "/proces/M20231/nivellTerritorial?requireMapa=false");
for (const c of ["ME-17205", "SE-17205", "ME-1720501001A", "ME-17205-01-001-A", "SE-1720501001"]) await t("vot_" + c, B + "/proces/A20241/territori/" + c + "/vot", 1500);
await t("exportacio_MU", B + "/proces/A20241/nivellTerritorial/MU/territori/17205/exportacio", 3000);
await t("exportacio_ME", B + "/proces/A20241/nivellTerritorial/ME/territori/17205/exportacio", 3000);
await t("exportacio_nivell_ME", B + "/proces/A20241/nivellTerritorial/ME/exportacio", 1500);
fs.writeFileSync("eleccions/sonda.json", JSON.stringify(out, null, 1));
