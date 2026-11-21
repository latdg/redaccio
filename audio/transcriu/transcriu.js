// Transcripció de l'estudi d'àudio — La TdG · 21.11.2026
// Micròfon, so d'una pestanya o fitxer → text, amb el model ca-es del Projecte Aina
// (el que fa servir Murmur) i sherpa-onnx en WebAssembly. Tot al navegador.
// El text es desa sol en aquest navegador (no es perd en tancar la pàgina).

import { transcripcioAWord } from "./word.js";

const $ = id => document.getElementById(id);
const TAXA = 16000;
const DIR = new URL("./", import.meta.url);
const MEMORIA_CAU = "latdg-transcriu-model-v1";
const DESA_TEXT = "transcripcioText";
const llegeix = k => { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } };
const escriu = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

let motor = null, motorLlest = null;           // Worker i promesa de «model carregat»
let ctx = null, flux = null, node = null, gravadora = null, trossos = [], audioDesat = null;
let actiu = false, enviat = 0, processat = 0, iniciSessio = 0, rellotge = null, bloqueig = null;
let acabat = null;

const estat = t => { $("trEstat").textContent = t; };
const barra = p => { $("trBarra").hidden = p == null; if (p != null) $("trBarra").firstElementChild.style.width = Math.round(p * 100) + "%"; };
const z = n => String(n).padStart(2, "0");
// VU-metre: esquerre i dret, en dB (de −60 a 0), amb el pic que es queda un moment
const VU = { pic: [-60, -60], quan: [0, 0] };
function nivells(dbs) {
  const files = document.querySelectorAll("#trNivell .vu-fila"), ara = performance.now();
  dbs.forEach((db, c) => {
    const f = files[c]; if (!f) return;
    const pct = v => Math.max(0, Math.min(100, (v + 60) / 60 * 100));
    if (db >= VU.pic[c] || ara - VU.quan[c] > 1500) { VU.pic[c] = db; VU.quan[c] = ara; }
    f.querySelector("span").style.clipPath = `inset(0 ${100 - pct(db)}% 0 0)`;
    f.querySelector("i").style.left = `calc(${pct(VU.pic[c])}% - 2px)`;
    const o = f.querySelector("output");
    o.textContent = db <= -60 ? "−∞" : db.toFixed(1).replace("-", "−").replace(".", ",");
    o.classList.toggle("fort", db > -3);
  });
}
const dB = x => { let p = 0; for (let i = 0; i < x.length; i += 2) { const v = Math.abs(x[i]); if (v > p) p = v; } return p > 0.001 ? 20 * Math.log10(p) : -60; };
const minut = s => { s = Math.max(0, Math.floor(s)); const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60; return (h ? h + ":" + z(m) : z(m)) + ":" + z(s % 60); };
const avui = () => { const d = new Date(); return `${z(d.getDate())}.${z(d.getMonth() + 1)}.${d.getFullYear()}`; };
const ara = () => { const d = new Date(); return `${z(d.getHours())}:${z(d.getMinutes())}`; };

// --- Model: es baixa un cop (137 MB) i queda a la memòria cau del navegador ---
// 21.11.2026: el progrés es mostra mentre arriben les dades (abans només en acabar
// cada tros de 40 MB, i semblava que no fes res) i «Atura» ho pot cancel·lar.
let cancella = null;
async function baixaModel(senyal) {
  const info = await (await fetch(new URL("model/model.json", DIR), { cache: "no-cache", signal: senyal })).json();
  const cau = "caches" in self ? await caches.open(MEMORIA_CAU).catch(() => null) : null;
  const total = Object.values(info.fitxers).reduce((a, f) => a + (f.parts[0] === "tokens.txt" ? 0 : f.mida), 0);
  let fet = 0;
  const mostra = desat => { barra(fet / total); estat(desat ? "Carregant el model desat en aquest aparell…" : `Baixant el model (només la primera vegada): ${Math.round(fet / 1048576)} de ${Math.round(total / 1048576)} MB…`); };
  const fitxers = {};
  for (const [nom, f] of Object.entries(info.fitxers)) {
    if (nom === "tokens.txt") continue;               // ja és dins del motor
    const tot = new Uint8Array(f.mida);
    let pos = 0;
    for (const part of f.parts) {
      const url = new URL("model/" + part, DIR).href;
      const r = cau ? await cau.match(url) : null;
      if (r) {
        const b = new Uint8Array(await r.arrayBuffer());
        tot.set(b, pos); pos += b.length; fet += b.length; mostra(true);
        continue;
      }
      const resp = await fetch(url, { signal: senyal });
      if (!resp.ok) throw new Error(`No s'ha pogut baixar el model (${part}).`);
      const lector = resp.body.getReader(), inici = pos;
      for (;;) {
        const { done, value } = await lector.read();
        if (done) break;
        tot.set(value, pos); pos += value.length; fet += value.length; mostra(false);
      }
      if (cau) { try { await cau.put(url, new Response(tot.slice(inici, pos))); } catch (e) {} }
    }
    fitxers[nom.split(".")[0]] = tot.buffer;
  }
  return fitxers;
}

function preparaMotor() {
  if (motorLlest) return motorLlest;
  motorLlest = new Promise((resol, rebutja) => {
    const ctl = new AbortController();
    cancella = () => { ctl.abort(); rebutja(new Error("Aturat.")); };
    motor = new Worker(new URL("motor.js", DIR));
    let fitxers = baixaModel(ctl.signal).catch(e => { rebutja(ctl.signal.aborted ? new Error("Aturat.") : e); return null; });
    motor.onmessage = async e => {
      const m = e.data;
      if (m.tipus === "motor") {
        const f = await fitxers; if (!f) return;
        estat("Preparant el model…");
        motor.postMessage({ tipus: "model", fitxers: f }, Object.values(f));
        fitxers = null;
      } else if (m.tipus === "llest") { barra(null); cancella = null; resol(); }
      else if (m.tipus === "frase") afegeix(m);
      else if (m.tipus === "posicio") { processat = m.s; mostraRetard(); }
      else if (m.tipus === "acabat") { if (acabat) { acabat(); acabat = null; } }
      else if (m.tipus === "error") { estat("❌ " + m.missatge); rebutja(new Error(m.missatge)); }
    };
    motor.onerror = e => { const err = new Error("El motor de transcripció no s'ha pogut engegar en aquest navegador."); estat("❌ " + err.message); rebutja(err); };
  });
  motorLlest.catch(() => { motorLlest = null; cancella = null; try { motor && motor.terminate(); } catch (e) {} motor = null; barra(null); });
  return motorLlest;
}

// --- Text ---
function afegeix(m) {
  const t = $("trText");
  const linia = ($("trMinuts").checked ? `[${minut(m.inici)}] ` : "") + m.text;
  t.value += (t.value && !t.value.endsWith("\n") ? "\n" : "") + linia + "\n";
  t.scrollTop = t.scrollHeight;
  escriu(DESA_TEXT, t.value);
}
function capcalera(font) {
  const t = $("trText");
  t.value += (t.value && !t.value.endsWith("\n") ? "\n" : "") + (t.value ? "\n" : "") + `— ${avui()} · ${ara()} · ${font} —\n`;
  escriu(DESA_TEXT, t.value);
}
let nomesGrava = false;   // mode «només grava»: es transcriu en aturar
function mostraRetard() {
  if (!actiu) return;
  if (nomesGrava) { estat(`🔴 Gravant · ${minut((Date.now() - iniciSessio) / 1000)} · es transcriurà quan aturis`); return; }
  const r = enviat / TAXA - processat;
  const temps = minut(enviat / TAXA);
  estat(`🔴 Escoltant · ${temps}` + (r > 6 ? ` · el text va ${Math.round(r)} s endarrerit (aquest aparell és lent; s'hi posarà al dia)` : ""));
}

// --- Còpia de seguretat de l'àudio a l'aparell (IndexedDB), 21.11.2026 ---
// Cada 5 segons es desa el tros gravat. Si la pàgina es tanca o peta abans d'aturar,
// en tornar-la a obrir surt l'avís per recuperar la gravació.
const BD = (() => {
  let p = null;
  const obre = () => p || (p = new Promise((res, rej) => {
    const r = indexedDB.open("latdg-transcriu", 1);
    r.onupgradeneeded = () => { const d = r.result; d.createObjectStore("sessions", { keyPath: "id" }); d.createObjectStore("trossos", { autoIncrement: true }).createIndex("sessio", "sessio"); };
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  }));
  const tx = async (magatzems, mode, f) => { const d = await obre(); return new Promise((res, rej) => { const t = d.transaction(magatzems, mode); const out = f(t); t.oncomplete = () => res(out && out.result !== undefined ? out.result : out); t.onerror = () => rej(t.error); }); };
  return {
    nova: ses => tx(["sessions"], "readwrite", t => t.objectStore("sessions").put(ses)),
    afegeix: (sessio, blob) => tx(["trossos"], "readwrite", t => t.objectStore("trossos").add({ sessio, blob })),
    sessions: () => tx(["sessions"], "readonly", t => t.objectStore("sessions").getAll()),
    trossos: sessio => tx(["trossos"], "readonly", t => t.objectStore("trossos").index("sessio").getAll(sessio)),
    esborra: async sessio => {
      await tx(["sessions", "trossos"], "readwrite", t => {
        t.objectStore("sessions").delete(sessio);
        const idx = t.objectStore("trossos").index("sessio").openKeyCursor(IDBKeyRange.only(sessio));
        idx.onsuccess = () => { const c = idx.result; if (c) { t.objectStore("trossos").delete(c.primaryKey); c.continue(); } };
      });
    },
  };
})();
let sessioId = null, sessioDades = null;
async function blobSessio(ses) {
  const tr = await BD.trossos(ses.id);
  return new Blob(tr.map(t => t.blob), { type: ses.tipus || "audio/webm" });
}
async function mostraRecuperables() {
  try {
    const totes = (await BD.sessions()).filter(x => !x.acabada && x.id !== sessioId).sort((a, b) => b.id - a.id);
    const ses = totes[0];
    if (!ses) { $("trRecupera").hidden = true; return; }
    const d = new Date(ses.id);
    $("trRecuperaText").textContent = `🛟 Hi ha una gravació del ${z(d.getDate())}.${z(d.getMonth() + 1)}.${d.getFullYear()} a les ${z(d.getHours())}:${z(d.getMinutes())} (uns ${minut(ses.durada || 0)}) que no es va acabar d'aturar.`;
    $("trRecupera").hidden = false;
    $("trRecuperaSi").onclick = async () => {
      const blob = await blobSessio(ses);
      const f = new File([blob], `gravacio_${z(d.getDate())}.${z(d.getMonth() + 1)}.${d.getFullYear()}_${z(d.getHours())}.${z(d.getMinutes())}.${/ogg/.test(blob.type) ? "ogg" : /mp4/.test(blob.type) ? "m4a" : "webm"}`, { type: blob.type });
      audioDesat = f; $("trAudio").disabled = $("trEditor").disabled = false;
      ses.acabada = true; await BD.nova(ses);
      $("trRecupera").hidden = true;
      estat("🛟 Gravació recuperada: la pots desar, obrir a l'editor o transcriure-la.");
      $("trTranscriuAudio").hidden = false;
      mostraRecuperables();
    };
    $("trRecuperaNo").onclick = async () => {
      if (!confirm("Segur que vols esborrar aquesta gravació?")) return;
      await BD.esborra(ses.id); mostraRecuperables();
    };
  } catch (e) { $("trRecupera").hidden = true; }
}
// En començar una gravació nova s'esborren les anteriors ja acabades (no les pendents de recuperar).
async function netejaAcabades() {
  try { for (const x of await BD.sessions()) if (x.acabada) await BD.esborra(x.id); } catch (e) {}
}

// --- Àudio: de qualsevol freqüència a 16 kHz mono ---
function a16k(x, taxa) {
  if (taxa === TAXA) return new Float32Array(x);
  const r = taxa / TAXA, n = Math.floor(x.length / r), y = new Float32Array(n);
  for (let i = 0, j = 0; i < n; i++) {
    const fi = Math.min(x.length, Math.round((i + 1) * r));
    let s = 0, c = 0;
    for (; j < fi; j++) { s += x[j]; c++; }
    y[i] = c ? s / c : 0;
  }
  return y;
}

async function comenca(font) {
  if (actiu) return;
  nomesGrava = $("trNomesGrava").checked;
  let stream;
  // Micròfon: primer el model (pot trigar la primera vegada) i després s'obre el micro,
  // perquè no es perdi el començament. La pestanya s'ha de triar de seguida (el navegador
  // només la deixa compartir just després del clic), i per això va al revés.
  // En el mode «només grava» el model no cal fins que s'atura.
  if (font === "mic" && !nomesGrava) {
    botons(true); estat("Preparant…");
    try { await preparaMotor(); } catch (e) { botons(false); barra(null); estat(e.message === "Aturat." ? "Aturat." : "❌ " + e.message); return; }
  }
  try {
    if (font === "mic") stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    else {
      stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true, systemAudio: "include" });
      if (!stream.getAudioTracks().length) {
        stream.getTracks().forEach(t => t.stop());
        botons(false);
        estat("❌ No arriba so: torna-ho a provar i marca «Comparteix també l'àudio de la pestanya».");
        return;
      }
    }
  } catch (e) { botons(false); estat("❌ " + (font === "mic" ? "No s'ha pogut fer servir el micròfon." : "No s'ha compartit cap pestanya.")); return; }

  botons(true);
  if (!nomesGrava) {
    estat("Preparant…");
    try { await preparaMotor(); } catch (e) { stream.getTracks().forEach(t => t.stop()); botons(false); estat("❌ " + e.message); return; }
  }

  flux = stream; actiu = true; enviat = 0; processat = 0; iniciSessio = Date.now();
  if (!nomesGrava) {
    motor.postMessage({ tipus: "reinicia" });
    capcalera(font === "mic" ? "Micròfon" : "So d'una pestanya");
  }
  ctx = new AudioContext();
  const origen = ctx.createMediaStreamSource(new MediaStream(stream.getAudioTracks()));
  node = ctx.createScriptProcessor(4096, 2, 1);
  node.onaudioprocess = e => {
    if (!actiu) return;
    const ib = e.inputBuffer, esq = ib.getChannelData(0), dre = ib.numberOfChannels > 1 ? ib.getChannelData(1) : esq;
    nivells([dB(esq), dB(dre)]);
    if (nomesGrava) return;
    // Per transcriure, una sola pista: la mitjana dels dos costats
    const x = new Float32Array(esq.length);
    for (let i = 0; i < x.length; i++) x[i] = (esq[i] + dre[i]) / 2;
    const y = a16k(x, ctx.sampleRate);
    enviat += y.length;
    motor.postMessage({ tipus: "audio", mostres: y }, [y.buffer]);
  };
  origen.connect(node); node.connect(ctx.destination);   // (la sortida va en silenci)
  stream.getAudioTracks()[0].addEventListener("ended", () => atura());

  // Còpia de l'àudio: a la memòria (per desar-lo o obrir-lo a l'editor) i, a trossos,
  // a l'aparell, per si la pàgina es tanca abans d'aturar.
  trossos = []; audioDesat = null; $("trTranscriuAudio").hidden = true;
  await netejaAcabades();
  sessioId = iniciSessio;
  try {
    const opcions = { audioBitsPerSecond: 64000 };
    for (const t of ["audio/webm;codecs=opus", "audio/ogg;codecs=opus", "audio/mp4"]) if (MediaRecorder.isTypeSupported?.(t)) { opcions.mimeType = t; break; }
    gravadora = new MediaRecorder(new MediaStream(stream.getAudioTracks()), opcions);
    sessioDades = { id: sessioId, font, tipus: gravadora.mimeType || "audio/webm", acabada: false, durada: 0 };
    BD.nova(sessioDades).catch(() => {});
    gravadora.ondataavailable = e => {
      if (!e.data.size) return;
      trossos.push(e.data);
      BD.afegeix(sessioId, e.data).catch(() => {});
      sessioDades.durada = (Date.now() - iniciSessio) / 1000;
      BD.nova(sessioDades).catch(() => {});
    };
    gravadora.start(5000);
  } catch (e) { gravadora = null; }
  try { bloqueig = await navigator.wakeLock?.request("screen"); } catch (e) {}
  $("trNivell").hidden = false;
  rellotge = setInterval(mostraRetard, 1000);
  mostraRetard();
}

// La pantalla es torna a mantenir encesa si es torna a la pàgina mentre es grava.
document.addEventListener("visibilitychange", async () => {
  if (actiu && document.visibilityState === "visible" && !bloqueig) { try { bloqueig = await navigator.wakeLock?.request("screen"); } catch (e) {} }
});

async function atura() {
  if (!actiu) return;
  actiu = false;
  clearInterval(rellotge);
  $("trNivell").hidden = true; nivells([-60, -60]);
  try { node && node.disconnect(); } catch (e) {}
  try { ctx && ctx.close(); } catch (e) {}
  const gravacioFeta = new Promise(r => {
    if (!gravadora || gravadora.state === "inactive") return r();
    gravadora.onstop = () => r();
    try { gravadora.stop(); } catch (e) { r(); }
  });
  flux && flux.getTracks().forEach(t => t.stop());
  try { bloqueig && bloqueig.release(); } catch (e) {} bloqueig = null;
  const durada = (Date.now() - iniciSessio) / 1000;
  if (!nomesGrava) {
    estat("Acabant l'última frase…");
    await new Promise(r => { acabat = r; motor.postMessage({ tipus: "fi" }); });
  }
  await gravacioFeta;
  if (trossos.length) {
    const tipus = (gravadora && gravadora.mimeType) || "audio/webm";
    audioDesat = new File(trossos, nom(/ogg/.test(tipus) ? "ogg" : /mp4/.test(tipus) ? "m4a" : "webm"), { type: tipus });
    $("trAudio").disabled = $("trEditor").disabled = false;
  }
  if (sessioDades) { sessioDades.acabada = true; sessioDades.durada = durada; BD.nova(sessioDades).catch(() => {}); }
  botons(false);
  if (nomesGrava && audioDesat) {
    estat(`⏹️ Gravats ${minut(durada)}. Ara es transcriu…`);
    await fitxer(audioDesat, "Gravació (només grava)");
  } else estat(`✅ Fet: ${minut(durada)} transcrits.`);
}

async function fitxer(f, etiquetaFont) {
  if (actiu || !f) return;
  botons(true);
  try {
    await preparaMotor();
    estat("Llegint l'àudio…"); barra(0);
    const dades = await f.arrayBuffer();
    // Es descodifica directament a 16 kHz (gasta molta menys memòria en enregistraments llargs)
    let tmp;
    try { tmp = new AudioContext({ sampleRate: TAXA }); } catch (e) { tmp = new AudioContext(); }
    const buf = await tmp.decodeAudioData(dades); tmp.close();
    let x;
    if (buf.sampleRate === TAXA) {
      x = buf.getChannelData(0);
      if (buf.numberOfChannels > 1) { const d = buf.getChannelData(1), m = new Float32Array(x.length); for (let i = 0; i < m.length; i++) m[i] = (x[i] + d[i]) / 2; x = m; }
    } else {
      const off = new OfflineAudioContext(1, Math.ceil(buf.duration * TAXA), TAXA);
      const s = off.createBufferSource(); s.buffer = buf; s.connect(off.destination); s.start();
      x = (await off.startRendering()).getChannelData(0);
    }
    motor.postMessage({ tipus: "reinicia" });
    capcalera(etiquetaFont || ("Fitxer «" + f.name + "»"));
    actiu = true; nomesGrava = false; enviat = 0; processat = 0;
    const T = TAXA * 5;
    for (let i = 0; i < x.length; i += T) {
      const y = x.slice(i, i + T); enviat += y.length;
      motor.postMessage({ tipus: "audio", mostres: y }, [y.buffer]);
    }
    actiu = false;
    const seg = setInterval(() => { barra(Math.min(1, processat / (x.length / TAXA))); estat(`Transcrivint: ${minut(processat)} de ${minut(x.length / TAXA)}…`); }, 500);
    await new Promise(r => { acabat = r; motor.postMessage({ tipus: "fi" }); });
    clearInterval(seg); barra(null);
    audioDesat = f; $("trAudio").disabled = $("trEditor").disabled = false;
    $("trTranscriuAudio").hidden = true;
    estat(`✅ Fet: ${minut(x.length / TAXA)} transcrits.`);
  } catch (e) {
    barra(null); actiu = false;
    estat("❌ " + (e && e.name === "EncodingError" ? "Aquest fitxer no es pot llegir: prova'l amb el convertidor." : (e.message || e)));
  } finally { botons(false); $("trFitxer").value = ""; }
}

function botons(ocupat) {
  $("trMic").hidden = $("trPestanya").hidden = $("trFitxerBtn").hidden = ocupat;
  if (!navigator.mediaDevices?.getDisplayMedia) $("trPestanya").hidden = true;
  $("trAtura").hidden = !ocupat;
}

function baixa(blob, nom) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = nom; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
const nom = ext => { const d = new Date(); return `transcripcio_${avui()}_${z(d.getHours())}.${z(d.getMinutes())}.${ext}`; };

// --- Inici ---
$("trText").value = llegeix(DESA_TEXT);
$("trText").addEventListener("input", () => escriu(DESA_TEXT, $("trText").value));
$("trMic").onclick = () => comenca("mic");
$("trPestanya").onclick = () => comenca("pestanya");
$("trFitxerBtn").onclick = () => $("trFitxer").click();
$("trFitxer").onchange = e => fitxer(e.target.files[0]);
$("trAtura").onclick = () => { if (actiu) atura(); else if (cancella) cancella(); };
// Al bot de resums (21.11.2026): el text va al Worker latdg-resums (/estudi) amb la
// clau de la pàgina; el Worker el posa al xat del bot com a .txt i pregunta què se'n
// vol fer. Si el Worker no respon, com abans: compartir (mòbil) o desar i obrir el bot.
const WORKER_RESUMS = "https://latdg-resums.ignasicorney.workers.dev/estudi";
const BOT_RESUMS = "https://t.me/LaTdG_resums_bot";
async function perCompartir(f) {
  if (navigator.canShare && navigator.canShare({ files: [f] }) && matchMedia("(pointer:coarse)").matches) {
    try { await navigator.share({ files: [f], title: "Transcripció" }); estat("Tria Telegram i el bot de resums; et preguntarà què en vols fer."); return; }
    catch (e) { if (e.name === "AbortError") return; }
  }
  baixa(f, f.name);
  window.open(BOT_RESUMS, "_blank", "noopener");
  estat("S'ha desat el .txt i s'ha obert el bot de resums: arrossega-hi el fitxer i et preguntarà què en vols fer.");
}
$("trBot").onclick = async () => {
  const text = $("trText").value.trim();
  if (!text) { estat("Encara no hi ha cap text per enviar."); return; }
  const nomTxt = nom("txt");
  $("trBot").disabled = true; estat("Enviant al bot de resums…");
  try {
    const r = await fetch(WORKER_RESUMS, { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: ($("pin") ? $("pin").value.trim() : ""), text, nom: nomTxt }) });
    const d = await r.json().catch(() => ({}));
    if (r.ok && d.ok) estat("✅ Enviat al bot de resums: obre Telegram i tria què en vols fer (notícia, resum, traducció…).");
    else estat("❌ " + (d.error || ("El bot de resums ha respost HTTP " + r.status + ".")));
  } catch (e) {
    await perCompartir(new File([text + "\n"], nomTxt, { type: "text/plain" }));
  } finally { $("trBot").disabled = false; }
};
$("trWord").onclick = async () => {
  const t = $("trText").value.trim();
  if (!t) { estat("Encara no hi ha cap text per desar."); return; }
  try { baixa(await transcripcioAWord(t, avui()), nom("docx")); }
  catch (e) { estat("❌ No s'ha pogut fer el Word: " + (e.message || e)); }
};
$("trTxt").onclick = () => { if ($("trText").value.trim()) baixa(new Blob([$("trText").value], { type: "text/plain;charset=utf-8" }), nom("txt")); };
$("trCopia").onclick = async () => { try { await navigator.clipboard.writeText($("trText").value); estat("📋 Copiat."); } catch (e) { $("trText").select(); document.execCommand("copy"); estat("📋 Copiat."); } };
$("trEsborra").onclick = () => { if ($("trText").value && confirm("Vols esborrar tota la transcripció?")) { $("trText").value = ""; escriu(DESA_TEXT, ""); } };
$("trAudio").onclick = () => { if (audioDesat) baixa(audioDesat, audioDesat.name || nom(/ogg/.test(audioDesat.type) ? "ogg" : /mp4/.test(audioDesat.type) ? "m4a" : "webm")); };
$("trEditor").onclick = () => {
  if (!audioDesat) return;
  try {
    const f = audioDesat instanceof File ? audioDesat : new File([audioDesat], nom("webm"), { type: audioDesat.type });
    $("editor").contentWindow.PKAudioEditor.engine.LoadFile({ files: [f] });
    $("editor").scrollIntoView({ behavior: "smooth" });
  } catch (e) { estat("No s'ha pogut obrir a l'editor: desa l'àudio i arrossega'l a l'editor."); }
};
botons(false);
$("trTranscriuAudio").onclick = () => { if (audioDesat) fitxer(audioDesat, "Gravació recuperada"); };
mostraRecuperables();
(async () => {
  try {
    const cau = await caches.open(MEMORIA_CAU);
    if (await cau.match(new URL("model/encoder.int8.onnx.00", DIR).href)) $("trModel").textContent = "El model ja és desat en aquest aparell.";
  } catch (e) {}
})();
