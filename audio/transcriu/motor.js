// Motor de transcripció de l'estudi d'àudio — La TdG · 21.11.2026
// Treballador (Web Worker) que fa córrer sherpa-onnx en WebAssembly: detector de veu
// (Silero VAD) i el model ca-es del Projecte Aina (català i castellà barrejats).
// Tot passa al navegador: l'àudio no surt de l'aparell.
//
// Missatges que rep:
//   {tipus:"model", fitxers:{encoder, decoder, joiner}}  (ArrayBuffer de cada part)
//   {tipus:"audio", mostres: Float32Array a 16 kHz}
//   {tipus:"fi"}       acaba la frase que s'estigui dient i avisa amb {tipus:"acabat"}
//   {tipus:"reinicia"} torna el rellotge a zero (nova sessió)
// Missatges que envia:
//   {tipus:"llest"} · {tipus:"frase", inici, fi, text} · {tipus:"acabat"} · {tipus:"error", missatge}

const TAXA = 16000;
let total = 0, darrerAvis = 0;   // mostres rebudes en aquesta sessió
let reconeixedor = null, vad = null, memoria = null;

self.Module = {
  locateFile: (p) => "wasm/" + p,
  onRuntimeInitialized: () => self.postMessage({ tipus: "motor" }),
  print: () => {}, printErr: () => {},
};
importScripts("wasm/sherpa-onnx-asr.js", "wasm/sherpa-onnx-vad.js", "wasm/sherpa-onnx-wasm-main-vad-asr.js");

function preparaModel(f) {
  const FS = self.Module.FS || self.FS;  // el motor no exporta FS al Module: és global
  const noms = { encoder: "/aina-encoder.onnx", decoder: "/aina-decoder.onnx", joiner: "/aina-joiner.onnx" };
  for (const k of Object.keys(noms)) FS.writeFile(noms[k], new Uint8Array(f[k]));
  reconeixedor = new OfflineRecognizer({
    featConfig: { sampleRate: TAXA, featureDim: 80 },
    modelConfig: {
      transducer: { encoder: noms.encoder, decoder: noms.decoder, joiner: noms.joiner },
      tokens: "./tokens.txt", numThreads: 1, provider: "cpu", debug: 0, modelType: "nemo_transducer",
    },
    decodingMethod: "greedy_search",
  }, self.Module);
  // El model ja és a la memòria del motor: els fitxers ja no calen.
  for (const k of Object.keys(noms)) { try { FS.unlink(noms[k]); } catch (e) {} }
  vad = createVad(self.Module, {
    sileroVad: { model: "./silero_vad.onnx", threshold: 0.5, minSilenceDuration: 0.5, minSpeechDuration: 0.25, maxSpeechDuration: 20, windowSize: 512 },
    tenVad: { model: "", threshold: 0.5, minSilenceDuration: 0.5, minSpeechDuration: 0.25, maxSpeechDuration: 20, windowSize: 256 },
    sampleRate: TAXA, numThreads: 1, provider: "cpu", debug: 0, bufferSizeInSeconds: 60,
  });
  memoria = new CircularBuffer(60 * TAXA, self.Module);
}

// Història de l'àudio (els darrers 2 minuts). El detector de veu talla l'inici de la
// frase una mica tard i es menjava la primera paraula: es transcriu amb 0,4 s de marge
// abans i 0,2 s després del tros que marca.
const HIST = 120 * TAXA, historia = new Float32Array(HIST);
const MARGE_ABANS = Math.round(0.4 * TAXA), MARGE_DESPRES = Math.round(0.2 * TAXA);
function desaHistoria(x) {
  for (let i = 0; i < x.length; i++) historia[(total - x.length + i) % HIST] = x[i];
}
function tros(a, b) {
  a = Math.max(a, total - HIST + 1, 0); b = Math.min(b, total);
  const y = new Float32Array(Math.max(0, b - a));
  for (let i = 0; i < y.length; i++) y[i] = historia[(a + i) % HIST];
  return y;
}

function transcriuSegments() {
  while (!vad.isEmpty()) {
    const s = vad.front();
    vad.pop();
    const a = s.start - MARGE_ABANS, b = s.start + s.samples.length + MARGE_DESPRES;
    const mostres = b <= total ? tros(a, b) : s.samples;
    const flux = reconeixedor.createStream();
    flux.acceptWaveform(TAXA, mostres);
    reconeixedor.decode(flux);
    const text = (reconeixedor.getResult(flux).text || "").trim();
    flux.free();
    if (text) self.postMessage({ tipus: "frase", inici: Math.max(0, a) / TAXA, fi: b / TAXA, text });
  }
}

function accepta(mostres) {
  total += mostres.length;
  desaHistoria(mostres);
  if (total - darrerAvis >= TAXA) { darrerAvis = total; self.postMessage({ tipus: "posicio", s: total / TAXA }); }
  memoria.push(mostres);
  const w = 512;
  while (memoria.size() > w) {
    vad.acceptWaveform(memoria.get(memoria.head(), w));
    memoria.pop(w);
    transcriuSegments();
  }
}

self.onmessage = (e) => {
  const m = e.data;
  try {
    if (m.tipus === "model") { preparaModel(m.fitxers); self.postMessage({ tipus: "llest" }); }
    else if (m.tipus === "audio") accepta(m.mostres);
    else if (m.tipus === "fi") { vad.flush(); transcriuSegments(); self.postMessage({ tipus: "acabat" }); }
    else if (m.tipus === "reinicia") { vad.reset(); memoria.reset(); total = 0; darrerAvis = 0; }
  } catch (err) {
    self.postMessage({ tipus: "error", missatge: String(err && err.message || err) });
  }
};
