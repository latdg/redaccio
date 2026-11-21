# Prova el model exportat amb sherpa-onnx (Python) i mesura la velocitat.
import sys, time, json, wave
import numpy as np
import sherpa_onnx

d = sys.argv[1]
rec = sherpa_onnx.OfflineRecognizer.from_transducer(
    encoder=f"{d}/encoder.int8.onnx", decoder=f"{d}/decoder.int8.onnx",
    joiner=f"{d}/joiner.int8.onnx", tokens=f"{d}/tokens.txt",
    model_type="nemo_transducer", num_threads=1, decoding_method="greedy_search")
res = []
for w in sys.argv[2:]:
    with wave.open(w) as f:
        sr = f.getframerate(); x = np.frombuffer(f.readframes(f.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    s = rec.create_stream(); s.accept_waveform(sr, x)
    t = time.time(); rec.decode_stream(s); dt = time.time() - t
    r = {"fitxer": w, "durada": round(len(x) / sr, 2), "segons": round(dt, 2), "text": s.result.text}
    print(r); res.append(r)
json.dump(res, open(f"{d}/prova.json", "w"), ensure_ascii=False, indent=1)
