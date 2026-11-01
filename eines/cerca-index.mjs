// =============================================================================
// ÍNDEX DE LA CERCA — La TdG · 01.11.2026 (2a versió)
// Trosseja cada resum diari (dades/<dia>/resum.html) en ELEMENTS (una notícia,
// un anunci, un contracte, una subvenció...) i n'indexa cadascun una sola vegada,
// amb el primer dia que va sortir al panell. Així la cerca torna les notícies
// concretes, no «tots els dies», perquè molts elements es repeteixen dia rere dia.
// Ús (des de l'arrel del repo): node eines/cerca-index.mjs
// =============================================================================
import fs from "node:fs";
import path from "node:path";
import * as pagefind from "pagefind";

const ARREL = process.cwd();
const SORTIDA = path.join(ARREL, "cerca", "pagefind");
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

const dies = fs.readdirSync(path.join(ARREL, "dades")).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort();
const vistos = new Map();
for (const dia of dies) {
  const f = path.join(ARREL, "dades", dia, "resum.html");
  if (!fs.existsSync(f)) continue;
  for (const e of elements(fs.readFileSync(f, "utf8"))) {
    const k = clau(e.seccio + " " + e.text);
    const ja = vistos.get(k);
    if (ja) { ja.darrer = dia; continue; }
    vistos.set(k, { ...e, primer: dia, darrer: dia });
  }
}

fs.rmSync(SORTIDA, { recursive: true, force: true });
const { index, errors } = await pagefind.createIndex({ forceLanguage: "zz" });
if (errors.length) throw new Error(errors.join("; "));
let n = 0;
for (const e of vistos.values()) {
  const r = await index.addCustomRecord({
    // Cada element necessita una adreça pròpia: Pagefind fusiona els que la comparteixen.
    url: `../?dia=${e.primer}#e${n}`,
    // «l’incendi», «d'Empordà»: l'apòstrof es converteix en espai perquè trobi «incendi» i «Empordà».
    content: [e.text, e.font, e.seccio].filter(Boolean).join(" · ").replace(/[’'`´]/g, " "),
    language: "zz",   // sense «arrels»: el de català retallava massa (Peratallada -> per)
    meta: { title: e.text, seccio: e.seccio, font: e.font, enllac: e.enllac, primer: e.primer, darrer: e.darrer },
  });
  if (r.errors.length) console.error(r.errors);
  n++;
}
await index.writeFiles({ outputPath: SORTIDA });
await pagefind.close();
console.log(`Índex: ${n} elements diferents de ${dies.length} dies.`);
