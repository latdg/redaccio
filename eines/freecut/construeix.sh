#!/usr/bin/env bash
# CONSTRUEIX L'EDITOR DE VÍDEO (FreeCut) PER A LA TdG REDACCIÓ · 01.11.2026
# Baixa FreeCut (walterlow/freecut, llicència MIT), l'adapta (adapta.mjs), el construeix
# i el deixa a video/editor/. Per actualitzar-lo a una versió nova de FreeCut, s'executa
# de nou des de l'arrel del repo:  bash eines/freecut/construeix.sh
set -euo pipefail
REPO="$(cd "$(dirname "$0")/../.." && pwd)"
TMP="$(mktemp -d)"
git clone --depth 1 https://github.com/walterlow/freecut.git "$TMP/freecut"
cd "$TMP/freecut"
VERSIO="$(git log -1 --format='%h %cd' --date=format:'%d.%m.%Y')"
node "$REPO/eines/freecut/adapta.mjs" .
ONNXRUNTIME_NODE_INSTALL_CUDA=skip npm ci --no-audit --no-fund
npm run build
cd dist
# Fora el que no cal: mapes de codi, portada de FreeCut i service worker
find . -name "*.map" -delete
rm -rf assets/landing headless.html sw.js
# Recuperació en recarregar una pàgina interna (vegeu 404.html a l'arrel)
node -e '
const fs=require("fs");const f="index.html";let t=fs.readFileSync(f,"utf8");
const s=`<script>(function(){var q=new URLSearchParams(location.search),r=q.get("ruta");if(r!==null){q.delete("ruta");var x=q.toString();history.replaceState(null,"","/redaccio/video/editor/"+r.replace(/^\\//,"")+(x?"?"+x:"")+location.hash)}})()</script>`;
t=t.replace("<head>","<head>\n    "+s).replace(/<title>[^<]*<\/title>/,"<title>Editor de vídeo · La TdG</title>");
fs.writeFileSync(f,t);'
rm -rf "$REPO/video/editor"
mkdir -p "$REPO/video/editor"
cp -r . "$REPO/video/editor/"
cp ../LICENSE "$REPO/video/editor/LICENSE-FreeCut.txt"
echo "FreeCut $VERSIO" > "$REPO/video/editor/VERSIO.txt"
rm -rf "$TMP"
echo "Editor a video/editor/ (FreeCut $VERSIO)"
