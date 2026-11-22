// PASSAREL·LA DE SENYALS — La TdG sala de control audiovisual · 05.11.2026
// Worker de Cloudflare «latdg-senyal» (https://latdg-senyal.ignasicorney.workers.dev).
// Demana el senyal d'una cadena o emissora i el torna a la pàgina tdt/ amb permís
// (CORS) perquè el navegador el pugui reproduir i gravar. Només l'usa la pàgina quan el
// camí directe falla. Amb les llistes .m3u8, reescriu les adreces de dins perquè també
// passin per aquí. Si la cadena demana «Referer», l'hi posa.
// Només atén la pàgina de La TdG i només deixa passar àudio, vídeo i llistes de
// reproducció (no és un servidor intermediari obert).
// 05.11.2026: POST /casa encarrega una gravació a l'ordinador de casa: llança el workflow
// «Gravació a casa» (gravacio.yml) de latdg/vigilant-plens. Necessita el secret
// GITHUB_TOKEN (testimoni de GitHub amb permís «Actions: read and write» en aquest repo).
// 21.11.2026: estat de les gravacions a casa.
//   POST /estat  el portàtil hi diu com va una gravació (gravant, feta, error), amb la clau
//                que li dona aquest mateix Worker en encarregar-la; es desa com una execució
//                buida del workflow «Estat de gravació» (estat-gravacio.yml), sense gastar minuts.
//   GET  /estat  la sala de control hi demana les últimes gravacions a casa i com van.
// 21.11.2026: POST /gestiona {id, accio: "canvia"|"anulla"|"atura", inici, minuts} canvia l'hora o la
//   durada d'una gravació programada a casa, l'anul·la o atura la que s'està fent: llança el workflow «Gestió de
//   gravació» (gestio-gravacio.yml) de latdg/vigilant-plens.
// 22.11.2026: POST /esborra {ids: [...]} o {acabades: true} treu de la llista de gravacions a casa les
//   que ja s'han acabat (fetes, amb error, anul·lades o sense notícies): n'esborra les execucions dels
//   workflows de latdg/vigilant-plens. Els fitxers gravats no es toquen. Les que estan programades o
//   gravant no s'esborren mai.

const ORIGENS = ["https://latdg.github.io"];
const REPO = "https://api.github.com/repos/latdg/vigilant-plens/actions";
const TIPUS_PERMESOS = /^(audio\/|video\/|application\/(vnd\.apple\.mpegurl|x-mpegurl|octet-stream|mp4|dash\+xml)|binary\/octet-stream)/i;

export default {
  async fetch(req, env) {
    const origen = req.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": ORIGENS.includes(origen) ? origen : ORIGENS[0],
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Range, Content-Type",
      "Access-Control-Expose-Headers": "Content-Type, Content-Length, Content-Range",
      "Vary": "Origin",
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    const cami = new URL(req.url).pathname;
    // El portàtil no és una pàgina web (no porta «Origin»): entra amb la clau de la gravació.
    if (cami === "/estat" && req.method === "POST") return rebEstat(req, env, cors);
    if (!ORIGENS.includes(origen)) return new Response("Només per a La TdG.", { status: 403, headers: cors });

    const aqui = new URL(req.url);
    if (aqui.pathname === "/casa") return encarregaACasa(req, env, cors);
    if (aqui.pathname === "/estat") return donaEstat(env, cors);
    if (aqui.pathname === "/gestiona") return gestionaACasa(req, env, cors);
    if (aqui.pathname === "/esborra") return esborraDeCasa(req, env, cors);
    const u = aqui.searchParams.get("u");
    const ref = aqui.searchParams.get("ref");
    if (!u || !/^https?:\/\//i.test(u)) return new Response("Falta l'adreça.", { status: 400, headers: cors });

    const cap = new Headers({ "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36" });
    if (ref) { cap.set("Referer", ref); try { cap.set("Origin", new URL(ref).origin); } catch (e) {} }
    const rang = req.headers.get("Range");
    if (rang) cap.set("Range", rang);

    let r;
    try { r = await fetch(u, { headers: cap, redirect: "follow" }); }
    catch (e) { return new Response("No s'ha pogut connectar amb l'emissora.", { status: 502, headers: cors }); }

    const tipus = (r.headers.get("Content-Type") || "").split(";")[0].trim();
    const final = new URL(r.url || u);
    const esLlista = /mpegurl/i.test(tipus) || /\.m3u8$/i.test(final.pathname);
    if (r.ok && !esLlista && tipus && !TIPUS_PERMESOS.test(tipus) && !/^text\/plain/i.test(tipus))
      return new Response("Tipus no permès.", { status: 415, headers: cors });

    const fora = new Headers(cors);
    for (const k of ["Content-Type", "Content-Length", "Content-Range", "Accept-Ranges"]) {
      const v = r.headers.get(k); if (v) fora.set(k, v);
    }
    fora.set("Cache-Control", "no-store");

    if (esLlista && r.ok) {
      const text = await r.text();
      const via = x => {
        const abs = new URL(x, final).href;
        return `${aqui.origin}/?u=${encodeURIComponent(abs)}${ref ? `&ref=${encodeURIComponent(ref)}` : ""}`;
      };
      const cos = text.split("\n").map(linia => {
        const t = linia.trim();
        if (!t) return linia;
        if (t.startsWith("#")) return linia.replace(/URI="([^"]+)"/g, (m, x) => `URI="${via(x)}"`);
        return via(t);
      }).join("\n");
      fora.delete("Content-Length");
      fora.set("Content-Type", "application/vnd.apple.mpegurl");
      return new Response(cos, { status: r.status, headers: fora });
    }
    return new Response(r.body, { status: r.status, headers: fora });
  },
};

async function encarregaACasa(req, env, cors) {
  const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, "Content-Type": "application/json" } });
  if (req.method !== "POST") return json({ ok: false, error: "Cal un POST." }, 405);
  if (!env.GITHUB_TOKEN) return json({ ok: false, error: "Falta el secret GITHUB_TOKEN al Worker." }, 500);
  let d;
  try { d = await req.json(); } catch (e) { return json({ ok: false, error: "Dades incorrectes." }, 400); }
  const text = (x, max) => String(x ?? "").slice(0, max);
  const inputs = {
    id: text(d.id, 40).replace(/[^\w-]/g, ""),
    canal: text(d.canal, 80),
    url: text(d.url, 1500),
    format: text(d.format, 10),
    tipus: d.tipus === "radio" ? "radio" : "tv",
    ref: text(d.ref, 300),
    inici: String(Math.max(0, Math.floor(+d.inici || 0))),
    minuts: String(Math.max(1, Math.min(360, Math.round(+d.minuts || 0)))),
    qualitat: text(d.qualitat || "auto", 20).replace(/\|/g, " "),
  };
  inputs.canal = inputs.canal.replace(/\|/g, " ");
  if (!inputs.id || !/^https?:\/\//.test(inputs.url) || !+d.minuts) return json({ ok: false, error: "Falten dades (adreça o durada)." }, 400);
  inputs.clau = await clauDe(env, inputs.id);
  const r = await fetch(`${REPO}/workflows/gravacio.yml/dispatches`, {
    method: "POST", headers: capGitHub(env),
    body: JSON.stringify({ ref: "main", inputs }),
  });
  if (r.status === 204) return json({ ok: true });
  return json({ ok: false, error: `GitHub ha dit ${r.status}: ${(await r.text()).slice(0, 200)}` }, 502);
}

// ---------- 21.11.2026: canviar o anul·lar una gravació programada a casa ----------
async function gestionaACasa(req, env, cors) {
  const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, "Content-Type": "application/json" } });
  if (req.method !== "POST") return json({ ok: false, error: "Cal un POST." }, 405);
  if (!env.GITHUB_TOKEN) return json({ ok: false, error: "Falta el secret GITHUB_TOKEN al Worker." }, 500);
  let d;
  try { d = await req.json(); } catch (e) { return json({ ok: false, error: "Dades incorrectes." }, 400); }
  const id = String(d.id || "").slice(0, 40).replace(/[^\w-]/g, "");
  const accio = ["anulla", "canvia", "atura"].includes(d.accio) ? d.accio : "";
  if (!id || !accio) return json({ ok: false, error: "Dades incorrectes." }, 400);
  const inputs = { id, accio, inici: "0", minuts: "" };
  if (accio === "canvia") {
    const inici = Math.floor(+d.inici || 0), minuts = Math.round(+d.minuts || 0);
    if (inici <= Date.now()) return json({ ok: false, error: "Aquesta hora ja ha passat." }, 400);
    if (minuts < 1 || minuts > 360) return json({ ok: false, error: "La durada ha de ser d'1 a 360 minuts." }, 400);
    inputs.inici = String(inici); inputs.minuts = String(minuts);
  }
  const r = await fetch(`${REPO}/workflows/gestio-gravacio.yml/dispatches`, {
    method: "POST", headers: capGitHub(env),
    body: JSON.stringify({ ref: "main", inputs }),
  });
  if (r.status === 204) return json({ ok: true });
  return json({ ok: false, error: `GitHub ha dit ${r.status}: ${(await r.text()).slice(0, 200)}` }, 502);
}

// ---------- 21.11.2026: estat de les gravacions a casa ----------
const capGitHub = env => ({ Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "User-Agent": "latdg-senyal", "Content-Type": "application/json" });

// Clau de cada gravació: només qui la va rebre (el portàtil) en pot informar l'estat.
async function clauDe(env, id) {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(env.GITHUB_TOKEN), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", k, new TextEncoder().encode("gravacio:" + id));
  return [...new Uint8Array(sig)].slice(0, 16).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function rebEstat(req, env, cors) {
  const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, "Content-Type": "application/json" } });
  if (!env.GITHUB_TOKEN) return json({ ok: false, error: "Falta el secret GITHUB_TOKEN al Worker." }, 500);
  let d;
  try { d = await req.json(); } catch (e) { return json({ ok: false, error: "Dades incorrectes." }, 400); }
  const id = String(d.id || "").slice(0, 40).replace(/[^\w-]/g, "");
  const estat = String(d.estat || "");
  if (!id || !["gravant", "feta", "error"].includes(estat)) return json({ ok: false, error: "Dades incorrectes." }, 400);
  if (String(d.clau || "") !== await clauDe(env, id)) return json({ ok: false, error: "Clau incorrecta." }, 403);
  const text = String(d.text || "").replace(/[|\r\n]+/g, " ").trim().slice(0, 120);
  const r = await fetch(`${REPO}/workflows/estat-gravacio.yml/dispatches`, {
    method: "POST", headers: capGitHub(env),
    body: JSON.stringify({ ref: "main", inputs: { id, estat, text } }),
  });
  if (r.status === 204) return json({ ok: true });
  return json({ ok: false, error: `GitHub ha dit ${r.status}` }, 502);
}

async function donaEstat(env, cors) {
  const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "no-store" } });
  if (!env.GITHUB_TOKEN) return json({ ok: false, error: "Falta el secret GITHUB_TOKEN al Worker." }, 500);
  const { gravacions } = await calculaGravacions(env);
  return json({ ok: true, gravacions: gravacions.slice(0, 15).map(({ runs, ...g }) => g) });
}

// Totes les gravacions a casa (de la més nova a la més antiga), amb les execucions de cada una («runs»).
async function calculaGravacions(env) {
  const llista = async cami => {
    try { const r = await fetch(`${REPO}/${cami}`, { headers: capGitHub(env) }); return r.ok ? (await r.json()).workflow_runs || [] : []; }
    catch (e) { return []; }
  };
  const [encarrecs, estats, gestions] = await Promise.all([
    llista("workflows/gravacio.yml/runs?per_page=30&event=workflow_dispatch"),
    llista("workflows/estat-gravacio.yml/runs?per_page=100&event=workflow_dispatch"),
    llista("workflows/gestio-gravacio.yml/runs?per_page=50&event=workflow_dispatch"),
  ]);
  // Canvis i anul·lacions (gestio-gravacio.yml): el darrer de cada gravació mana, i el darrer
  // canvi d'hora o de durada substitueix les dades de l'encàrrec.
  const gestio = {}, canvi = {};
  for (const r of gestions) {
    const [id, accio, minuts, inici] = String(r.display_title || "").split(" | ").map(x => x.trim());
    if (!id || !accio) continue;
    if (!gestio[id]) gestio[id] = { accio, quan: r.created_at, status: r.status, conclusion: r.conclusion };
    if (accio === "canvia" && !canvi[id]) canvi[id] = { minuts: +minuts || 0, inici: +inici || 0 };
  }
  const darrer = {};   // les execucions arriben de la més nova a la més antiga
  for (const r of estats) {
    const [id, estat, ...resta] = String(r.display_title || "").split(" | ");
    if (id && estat && !darrer[id]) darrer[id] = { estat: estat.trim(), text: resta.join(" | ").trim(), quan: r.created_at };
  }
  const execucions = {};   // id de la gravació → execucions d'estat i de gestió
  for (const r of [...estats, ...gestions]) {
    const id = String(r.display_title || "").split(" | ")[0].trim();
    if (id) (execucions[id] = execucions[id] || []).push(r.id);
  }
  const gravacions = [];
  for (const r of encarrecs) {
    const parts = String(r.display_title || "").split(" | ");
    if (parts.length !== 4) continue;     // encàrrecs d'abans del 21.11.2026
    const [id, canal, minuts0, inici0] = parts.map(x => x.trim());
    const minuts = canvi[id] ? canvi[id].minuts : minuts0, inici = canvi[id] ? canvi[id].inici : inici0;
    const g = gestio[id];
    let estat, text = "";
    if (g && (!darrer[id] || darrer[id].quan < g.quan)) {
      if (g.accio === "atura") {   // l'estat «feta» l'envia després el portàtil, en acabar de desar-la
        if (g.status === "completed" && g.conclusion !== "success") { estat = "error"; text = "el portàtil no l'ha pogut aturar"; }
        else estat = "aturant";
      }
      else if (g.status !== "completed") estat = g.accio === "anulla" ? "anullant" : "canviant";
      else if (g.conclusion === "success") estat = g.accio === "anulla" ? "anullada" : "programada";
      else { estat = "error"; text = g.accio === "anulla" ? "el portàtil no l'ha pogut anul·lar" : "el portàtil no l'ha pogut canviar"; }
    }
    else if (darrer[id]) ({ estat, text } = darrer[id]);
    else if (r.status !== "completed") estat = "encarregada";
    else if (r.conclusion === "success") estat = "programada";
    else { estat = "error"; text = "el portàtil no l'ha pogut programar"; }
    gravacions.push({ id, canal, minuts: +minuts || 0, inici: +inici || 0, encarregada: r.created_at, estat, text, runs: [r.id, ...(execucions[id] || [])] });
  }
  return { gravacions };
}

// ---------- 22.11.2026: treure de la llista les gravacions a casa acabades ----------
function acabada(g) {
  if (["feta", "error", "anullada"].includes(g.estat)) return true;
  // programada que ja hauria d'haver acabat i de la qual el portàtil no n'ha dit res
  const inici = g.inici || Date.parse(g.encarregada);
  return g.estat === "programada" && Date.now() > inici + g.minuts * 60000 + 10 * 60000;
}
async function esborraDeCasa(req, env, cors) {
  const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, "Content-Type": "application/json" } });
  if (req.method !== "POST") return json({ ok: false, error: "Cal un POST." }, 405);
  if (!env.GITHUB_TOKEN) return json({ ok: false, error: "Falta el secret GITHUB_TOKEN al Worker." }, 500);
  let d;
  try { d = await req.json(); } catch (e) { return json({ ok: false, error: "Dades incorrectes." }, 400); }
  const ids = new Set((Array.isArray(d.ids) ? d.ids : []).map(x => String(x).slice(0, 40).replace(/[^\w-]/g, "")).filter(Boolean));
  if (!ids.size && !d.acabades) return json({ ok: false, error: "Dades incorrectes." }, 400);
  const { gravacions } = await calculaGravacions(env);
  const triades = gravacions.filter(g => acabada(g) && (d.acabades || ids.has(g.id)));
  // Cloudflare deixa fer unes 50 consultes per petició: se n'esborren fins a 40 execucions i la pàgina torna a demanar.
  const runs = [];
  for (const g of triades) { if (runs.length + g.runs.length > 40 && runs.length) break; runs.push(...g.runs); }
  let errors = 0;
  for (const id of runs) {
    const r = await fetch(`${REPO}/runs/${id}`, { method: "DELETE", headers: capGitHub(env) });
    if (r.status !== 204 && r.status !== 404) errors++;
  }
  if (errors && errors === runs.length) return json({ ok: false, error: "GitHub no ha deixat esborrar-les (cal que el testimoni GITHUB_TOKEN tingui permís «Actions: read and write»)." }, 502);
  const fetes = triades.filter(g => g.runs.every(x => runs.includes(x))).length;
  return json({ ok: true, esborrades: fetes, queden: triades.length > fetes });
}
