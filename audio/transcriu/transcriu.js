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
// Indicador de nivell (VU-metre): en dB, de -60 a 0
const nivell = p => { const el = $("trNivell"); if (!el) return; const db = p > 0 ? 20 * Math.log10(p) : -60; el.firstElementChild.style.width = Math.max(0, Math.min(100, (db + 60) / 60 * 100)) + "%"; el.classList.toggle("fort", db > -3); };
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
function mostraRetard() {
  if (!actiu) return;
  const r = enviat / TAXA - processat;
  const temps = minut(enviat / TAXA);
  estat(`🔴 Escoltant · ${temps}` + (r > 6 ? ` · el text va ${Math.round(r)} s endarrerit (aquest aparell és lent; s'hi posarà al dia)` : ""));
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
  let stream;
  // Micròfon: primer el model (pot trigar la primera vegada) i després s'obre el micro,
  // perquè no es perdi el començament. La pestanya s'ha de triar de seguida (el navegador
  // només la deixa compartir just després del clic), i per això va al revés.
  if (font === "mic") {
    botons(true); estat("Preparant…");
    try { await preparaMotor(); } catch (e) { botons(false); barra(null); estat(e.message === "Aturat." ? "Aturat." : "❌ " + e.message); return; }
  }
  try {
    if (font === "mic") stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    else {
      stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true, systemAudio: "include" });
      if (!stream.getAudioTracks().length) {
        stream.getTracks().forEach(t => t.stop());
        estat("❌ No arriba so: torna-ho a provar i marca «Comparteix també l'àudio de la pestanya».");
        return;
      }
    }
  } catch (e) { botons(false); estat("❌ " + (font === "mic" ? "No s'ha pogut fer servir el micròfon." : "No s'ha compartit cap pestanya.")); return; }

  botons(true);
  estat("Preparant…");
  try { await preparaMotor(); } catch (e) { stream.getTracks().forEach(t => t.stop()); botons(false); estat("❌ " + e.message); return; }

  flux = stream; actiu = true; enviat = 0; processat = 0; iniciSessio = Date.now();
  motor.postMessage({ tipus: "reinicia" });
  capcalera(font === "mic" ? "Micròfon" : "So d'una pestanya");
  ctx = new AudioContext();
  const origen = ctx.createMediaStreamSource(new MediaStream(stream.getAudioTracks()));
  node = ctx.createScriptProcessor(4096, 1, 1);
  node.onaudioprocess = e => {
    if (!actiu) return;
    const x = e.inputBuffer.getChannelData(0);
    let pic = 0; for (let i = 0; i < x.length; i += 4) { const v = Math.abs(x[i]); if (v > pic) pic = v; }
    nivell(pic);
    const y = a16k(x, ctx.sampleRate);
    enviat += y.length;
    motor.postMessage({ tipus: "audio", mostres: y }, [y.buffer]);
  };
  origen.connect(node); node.connect(ctx.destination);   // (la sortida va en silenci)
  stream.getAudioTracks()[0].addEventListener("ended", () => atura());
  // Còpia de l'àudio, per desar-lo o obrir-lo a l'editor
  trossos = []; audioDesat = null;
  try {
    gravadora = new MediaRecorder(new MediaStream(stream.getAudioTracks()));
    gravadora.ondataavailable = e => { if (e.data.size) trossos.push(e.data); };
    gravadora.onstop = () => { audioDesat = new Blob(trossos, { type: gravadora.mimeType || "audio/webm" }); $("trAudio").disabled = $("trEditor").disabled = false; };
    gravadora.start(1000);
  } catch (e) { gravadora = null; }
  try { bloqueig = await navigator.wakeLock?.request("screen"); } catch (e) {}
  $("trNivell").hidden = false;
  rellotge = setInterval(mostraRetard, 1000);
  mostraRetard();
}

async function atura() {
  if (!actiu) return;
  actiu = false;
  clearInterval(rellotge);
  $("trNivell").hidden = true; nivell(0);
  try { node && node.disconnect(); } catch (e) {}
  try { ctx && ctx.close(); } catch (e) {}
  try { gravadora && gravadora.state !== "inactive" && gravadora.stop(); } catch (e) {}
  flux && flux.getTracks().forEach(t => t.stop());
  try { bloqueig && bloqueig.release(); } catch (e) {} bloqueig = null;
  estat("Acabant l'última frase…");
  await new Promise(r => { acabat = r; motor.postMessage({ tipus: "fi" }); });
  botons(false);
  estat(`✅ Fet: ${minut((Date.now() - iniciSessio) / 1000)} transcrits.`);
}

async function fitxer(f) {
  if (actiu || !f) return;
  botons(true);
  try {
    await preparaMotor();
    estat("Llegint el fitxer…"); barra(0);
    const dades = await f.arrayBuffer();
    const tmp = new AudioContext();
    const buf = await tmp.decodeAudioData(dades); tmp.close();
    const off = new OfflineAudioContext(1, Math.ceil(buf.duration * TAXA), TAXA);
    const s = off.createBufferSource(); s.buffer = buf; s.connect(off.destination); s.start();
    const x = (await off.startRendering()).getChannelData(0);
    motor.postMessage({ tipus: "reinicia" });
    capcalera("Fitxer «" + f.name + "»");
    actiu = true; enviat = 0; processat = 0;
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
// Al bot de resums: al mòbil, pel menú de compartir (Telegram › LaTdG_resums_bot);
// on no es poden compartir fitxers, es desa el .txt i s'obre el bot per arrossegar-l'hi.
const BOT_RESUMS = "https://t.me/LaTdG_resums_bot";
$("trBot").onclick = async () => {
  const text = $("trText").value.trim();
  if (!text) { estat("Encara no hi ha cap text per enviar."); return; }
  const f = new File([text + "\n"], nom("txt"), { type: "text/plain" });
  if (navigator.canShare && navigator.canShare({ files: [f] }) && matchMedia("(pointer:coarse)").matches) {
    try { await navigator.share({ files: [f], title: "Transcripció" }); estat("Tria Telegram i el bot de resums; et preguntarà què en vols fer."); return; }
    catch (e) { if (e.name === "AbortError") return; }
  }
  baixa(f, f.name);
  window.open(BOT_RESUMS, "_blank", "noopener");
  estat("S'ha desat el .txt i s'ha obert el bot de resums: arrossega-hi el fitxer i et preguntarà què en vols fer.");
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
(async () => {
  try {
    const cau = await caches.open(MEMORIA_CAU);
    if (await cau.match(new URL("model/encoder.int8.onnx.00", DIR).href)) $("trModel").textContent = "El model ja és desat en aquest aparell.";
  } catch (e) {}
})();
