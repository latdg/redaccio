// =============================================================================
// PANELL -> HEMEROTECA — La TdG · 01.11.2026
// Cada nit agafa els resums diaris del panell (dades/<dia>/resum.html), en treu
// els ELEMENTS (notícies, anuncis dels taulers, contractes, subvencions, actes de
// l'agenda...) i, per a cada dia que encara no s'hagi enviat, fa un .txt amb els
// elements que aquell dia van sortir PER PRIMER COP (els que es repeteixen dies
// seguits només hi van una vegada). L'envia al Cercador Hemeroteca La TdG (la
// mateixa porta que fa servir el bot de plens: secrets CERCA_URL i CERCA_CLAU),
// perquè el bot d'hemeroteca ho trobi tot en un sol lloc.
// Els dies ja enviats es guarden a dades/hemeroteca-enviats.json.
// Ús (des de l'arrel del repo): node eines/hemeroteca.mjs [--prova]
//   --prova: escriu els .txt a /tmp/hemeroteca-prova i no envia res.
// =============================================================================
import fs from "node:fs";
import path from "node:path";

const ARREL = process.cwd();
const ENVIATS = path.join(ARREL, "dades", "hemeroteca-enviats.json");
const PROVA = process.argv.includes("--prova");
const URL = (process.env.CERCA_URL || "").trim();
const CLAU = (process.env.CERCA_CLAU || "").trim();

// Seccions que són taules o llistes que es refan cada dia sense notícia nova.
const SALTA = /ATUR REGISTRAT|INCIDÈNCIES VIÀRIES/i;
const BUIT = /^(no hi ha|no s’han|no s'han|avui (no|encara)|s'han revisat|premsa local \(|període:|font:)/i;

const desfes = t => t
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"')
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n));
const net = t => desfes(t.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const clau = t => t.toLowerCase().replace(/^\W*/, "").replace(/\b\d{2}\.\d{2}\.\d{4}\b/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();

function elements(html) {
  const cos = html.split(/<body[^>]*>/i)[1] || html;
  const trossos = cos.split(/<div style="font-size:16px; font-weight:bold; margin-top:\d+px;">/i).slice(1);
  const res = [];
  for (const t of trossos) {
    const fi = t.indexOf("</div>");
    const seccio = net(t.slice(0, fi)).replace(/^[\d️⃣\s]+/, "").trim();
    if (!seccio || SALTA.test(seccio)) continue;
    // Línies: talls a <br>, </li>, </div>, </p>.
    const linies = t.slice(fi + 6)
      .split(/<br\s*\/?>|<\/li>|<\/div>|<\/p>|<\/tr>/i)
      // Files de taula (l'agenda): les cel·les separades per « · ».
      .map(l => ({ text: net(l.replace(/<\/t[dh]>/gi, " · ")).replace(/(\s·)+\s*$/, "").replace(/^·\s*/, ""), enllac: (l.match(/href="([^"]+)"/i) || [])[1] || "" }))
      .filter(l => !/^Municipi · Data · Hora · Activitat/i.test(l.text))
      .filter(l => l.text);
    let font = "";
    for (let i = 0; i < linies.length; i++) {
      const l = linies[i];
      if (/^https?:\/\/\S+$/.test(l.text)) {            // enllaç de l'element anterior
        const ant = res[res.length - 1];
        if (ant && !ant.enllac) ant.enllac = l.text;
        continue;
      }
      if (/^▶/.test(l.text)) { font = l.text.replace(/^▶\s*/, "").replace(/:$/, ""); continue; }
      if (l.text.length < 25 && !/[•▪⚠]/.test(l.text)) { font = l.text; continue; }   // capçalera (municipi, organisme)
      if (BUIT.test(l.text)) continue;
      let text = l.text.replace(/^[•▪⚠\s]+/, "");
      let enllac = l.enllac;
      const url = text.match(/https?:\/\/\S+$/);
      if (url) { enllac = enllac || url[0]; text = text.slice(0, url.index).trim(); }
      if (text.length < 15) continue;
      res.push({ seccio, font, text, enllac });
    }
  }
  return res;
}

const dataCa = d => d.split("-").reverse().join(".");
const dies = fs.readdirSync(path.join(ARREL, "dades")).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort();
const vistos = new Map();
for (const dia of dies) {
  const f = path.join(ARREL, "dades", dia, "resum.html");
  if (!fs.existsSync(f)) continue;
  for (const e of elements(fs.readFileSync(f, "utf8"))) {
    const k = clau(e.seccio + " " + e.text);
    if (!vistos.has(k)) vistos.set(k, { ...e, primer: dia });
  }
}

let enviats = [];
try { enviats = JSON.parse(fs.readFileSync(ENVIATS, "utf8")); } catch (e) { enviats = []; }

function textDelDia(dia) {
  const nous = [...vistos.values()].filter(e => e.primer === dia);
  if (!nous.length) return null;
  const linies = [`PANELL DE LA TdG REDACCIÓ — ${dataCa(dia)}`,
    "Notícies, anuncis, contractes, subvencions i actes que van sortir per primer cop aquell dia.", ""];
  let seccio = null;
  for (const e of nous) {
    if (e.seccio !== seccio) { seccio = e.seccio; linies.push("", "== " + seccio + " =="); }
    linies.push("• " + (e.font ? e.font + " — " : "") + e.text + (e.enllac ? "\n  " + e.enllac : ""));
  }
  return linies.join("\n") + "\n";
}

async function envia(nom, text) {
  const cos = JSON.stringify({ clau: CLAU, nom, carpeta: "panell", dades: Buffer.from(text, "utf8").toString("base64") });
  const r = await fetch(URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: cos, redirect: "follow" });
  const t = (await r.text()).slice(0, 200);
  console.log(`  ${nom}: ${r.status} ${t}`);
  return r.ok && !/error|clau incorrecta|no autoritzat/i.test(t);
}

if (!PROVA && (!URL || !CLAU)) {
  console.log("::warning::Falten els secrets CERCA_URL i CERCA_CLAU al repo latdg/redaccio: no s'envia res.");
  process.exit(0);
}
if (PROVA) fs.mkdirSync("/tmp/hemeroteca-prova", { recursive: true });

let canvis = false;
for (const dia of dies) {
  if (enviats.includes(dia)) continue;
  const text = textDelDia(dia);
  const nom = `panell_${dataCa(dia)}.txt`;
  if (!text) { console.log(`  ${dia}: cap element nou.`); if (!PROVA) { enviats.push(dia); canvis = true; } continue; }
  if (PROVA) { fs.writeFileSync(path.join("/tmp/hemeroteca-prova", nom), text); console.log(`  ${nom}: ${text.split("\n• ").length - 1} elements`); continue; }
  if (await envia(nom, text)) { enviats.push(dia); canvis = true; }
  else { console.log("::warning::No s'ha pogut enviar " + nom + "; es tornarà a provar demà."); break; }
}
if (canvis) fs.writeFileSync(ENVIATS, JSON.stringify(enviats.sort(), null, 1) + "\n");
