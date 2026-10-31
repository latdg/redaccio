// Sonda (31.10.2026): carrega resultats.dadeselectorals.gencat.cat i anota les peticions de dades.
import { chromium } from "playwright";
import fs from "fs";
const b = await chromium.launch();
const p = await b.newPage();
const reqs = [];
p.on("response", async r => {
  const u = r.url(), t = r.headers()["content-type"] || "";
  if (/\.(png|jpg|svg|woff2?|css|ico)(\?|$)/i.test(u)) return;
  let mostra = "";
  if (/json|xml|csv|text\/plain/.test(t)) { try { mostra = (await r.text()).slice(0, 1500); } catch (e) {} }
  reqs.push({ u, s: r.status(), t, mostra });
});
const pagines = ["https://resultats.dadeselectorals.gencat.cat/#/", "https://resultats.dadeselectorals.gencat.cat/#/cerca?q=Ullastret"];
for (const url of pagines) { try { await p.goto(url, { waitUntil: "networkidle", timeout: 60000 }); await p.waitForTimeout(5000); } catch (e) { reqs.push({ error: String(e), url }); } }
// Mira de clicar algun enllaç de municipi o elecció per veure més peticions
try {
  const enllacos = await p.$$eval("a", as => as.map(a => ({ t: a.innerText.trim().slice(0, 60), h: a.href })).filter(x => x.h).slice(0, 80));
  reqs.push({ enllacos });
  const html = await p.content(); reqs.push({ html: html.slice(0, 6000) });
} catch (e) {}
fs.writeFileSync("eleccions/sonda.json", JSON.stringify(reqs, null, 1));
await b.close();
