# Converteix el model ca-es del Projecte Aina (NeMo) al format de sherpa-onnx
# (encoder, decoder i joiner en ONNX int8 + tokens.txt). S'executa a GitHub Actions.
import sys, glob, os
import nemo.collections.asr as nemo_asr
import onnx
from onnxruntime.quantization import QuantType, quantize_dynamic

nemo = sys.argv[1]
m = nemo_asr.models.ASRModel.restore_from(nemo, map_location="cpu")
m.eval()
print("Classe:", type(m).__name__)
print("Preprocessador:", m.cfg.preprocessor)
print("Subsampling:", m.cfg.encoder.get("subsampling_factor"))

voc = m.joint.vocabulary
with open("tokens.txt", "w", encoding="utf-8") as f:
    for i, s in enumerate(voc):
        f.write(f"{s} {i}\n")
    f.write(f"<blk> {len(voc)}\n")

m.encoder.export("encoder.onnx")
m.decoder.export("decoder.onnx")
m.joint.export("joiner.onnx")

norm = m.cfg.preprocessor.get("normalize", "per_feature")
if norm == "NA":
    norm = ""
meta = {
    "vocab_size": m.decoder.vocab_size,
    "normalize_type": norm,
    "pred_rnn_layers": m.decoder.pred_rnn_layers,
    "pred_hidden": m.decoder.pred_hidden,
    "subsampling_factor": m.cfg.encoder.get("subsampling_factor", 4),
    "model_type": "EncDecRNNTBPEModel",
    "feat_dim": m.cfg.preprocessor.get("features", 80),
    "version": "1",
    "model_author": "Projecte Aina (BSC) / NVIDIA NeMo",
    "url": "https://huggingface.co/projecte-aina/stt_ca-es_conformer_transducer_large",
    "comment": "Exportat per a La TdG",
}
print("Metadades:", meta)
md = onnx.load("encoder.onnx")
while len(md.metadata_props):
    md.metadata_props.pop()
for k, v in meta.items():
    p = md.metadata_props.add(); p.key = k; p.value = str(v)
onnx.save(md, "encoder.onnx", save_as_external_data=False)

for n in ["encoder", "decoder", "joiner"]:
    quantize_dynamic(model_input=f"{n}.onnx", model_output=f"{n}.int8.onnx", weight_type=QuantType.QUInt8)
for f in sorted(glob.glob("*.onnx")) + ["tokens.txt"]:
    print(f, os.path.getsize(f))
