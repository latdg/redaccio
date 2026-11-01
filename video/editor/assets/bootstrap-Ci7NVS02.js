import{_n as e}from"./app-shell-DCPFFOou.js";import{Dg as t,Eg as n,Og as r,Sg as i,Tg as a,_g as o,cg as s,dg as c,gg as l,hg as u,lg as d,mg as f,og as p,sg as m,ug as h,vg as g,wg as _,xg as v,yg as y}from"./feature-editing-core-CuKltPCN.js";var b=e(`WorkspaceV2Migrator`),x=`filmstrips`,S=`waveform-bin`,C=`preview-audio`,w=`proxies`,T=`thumbnail.meta.json`,E=`thumbnail.jpg`;async function D(e){let n=performance.now(),r={ran:!1,fromVersion:null,toVersion:`2.0`,filmstripMediaMoved:0,waveformBinMoved:0,previewAudioMoved:0,proxiesMoved:0,thumbnailMetaRemoved:0,projectThumbnailsFixed:0,errors:[],durationMs:0},i=await _(e,[m]);if(!i||(r.fromVersion=i.schemaVersion,i.schemaVersion===`2.0`))return r.durationMs=performance.now()-n,r;r.ran=!0,b.info(`Migrating workspace ${i.schemaVersion} → 2.0`);let a=await O(e);try{r.filmstripMediaMoved=await k(e,r.errors)}catch(e){r.errors.push(`filmstrips: ${L(e)}`)}try{r.waveformBinMoved=await A(e,r.errors)}catch(e){r.errors.push(`waveform-bin: ${L(e)}`)}try{r.previewAudioMoved=await j(e,r.errors)}catch(e){r.errors.push(`preview-audio: ${L(e)}`)}try{r.proxiesMoved=await M(e,r.errors)}catch(e){r.errors.push(`proxies: ${L(e)}`)}try{r.thumbnailMetaRemoved=await N(e,r.errors)}catch(e){r.errors.push(`thumbnail-meta: ${L(e)}`)}try{r.projectThumbnailsFixed=await P(e,a,r.errors)}catch(e){r.errors.push(`project-thumbnails: ${L(e)}`)}if(r.errors.length===0){let n={...i,schemaVersion:`2.0`};await t(e,[m],n),b.info(`Workspace migrated to v2`,r)}else b.warn(`Workspace migration completed with errors; marker left at v1 for retry`,{errorCount:r.errors.length});return r.durationMs=performance.now()-n,r}async function O(e){let t=await v(e,[d]),n=new Set;for(let e of t)e.kind===`directory`&&n.add(e.name);return n}async function k(e,t){let o=await v(e,[x]),s=0;for(let l of o){if(l.kind!==`directory`)continue;let o=l.name;try{await r(`migrate-v2:filmstrip:${o}`,async()=>{let t=await v(e,[x,o]);for(let r of t){if(r.kind!==`file`)continue;let t=await i(e,[x,o,r.name]);t&&await n(e,[...c(o),r.name],t)}await a(e,[x,o],{recursive:!0})}),s++}catch(e){t.push(`filmstrip ${o}: ${L(e)}`)}}return s>0&&await F(e,x),s}async function A(e,t){let o=await v(e,[S]),s=0;for(let c of o){if(c.kind!==`file`||!c.name.endsWith(`.bin`))continue;let o=c.name.slice(0,-4);try{await r(`migrate-v2:waveform-bin:${o}`,async()=>{let t=await i(e,[S,c.name]);t&&(await n(e,g(o),t),await a(e,[S,c.name]))}),s++}catch(e){t.push(`waveform-bin ${o}: ${L(e)}`)}}return s>0&&await F(e,S),s}async function j(e,t){let o=await v(e,[C]),s=0;for(let c of o){if(c.kind!==`directory`)continue;let o=await v(e,[C,c.name]);for(let l of o){if(l.kind!==`directory`)continue;let o=await v(e,[C,c.name,l.name]);for(let d of o){if(d.kind!==`file`||!d.name.endsWith(`.wav`))continue;let o=d.name.slice(0,-4);try{await r(`migrate-v2:preview-audio:${o}`,async()=>{let t=await i(e,[C,c.name,l.name,d.name]);t&&(await n(e,u(o),t),await a(e,[C,c.name,l.name,d.name]))}),s++}catch(e){t.push(`preview-audio ${o}: ${L(e)}`)}}await I(e,[C,c.name,l.name])}await I(e,[C,c.name])}return s>0&&await F(e,C),s}async function M(e,t){let s=await v(e,[w]),c=0;for(let l of s){if(l.kind!==`directory`)continue;let s=l.name;try{await r(`migrate-v2:proxy:${s}`,async()=>{let t=await v(e,[w,s]);for(let r of t){if(r.kind!==`file`)continue;let t=await i(e,[w,s,r.name]);t&&await n(e,[...o(),s,r.name],t)}await a(e,[w,s],{recursive:!0})}),c++}catch(e){t.push(`proxy ${s}: ${L(e)}`)}}return c>0&&await F(e,w),c}async function N(e,t){let n=await v(e,[s]),r=0;for(let i of n){if(i.kind!==`directory`)continue;let n=i.name,o=[...f(n),T];try{if(!await y(e,o))continue;await a(e,o),r++}catch(e){t.push(`thumbnail.meta ${n}: ${L(e)}`)}}return r}async function P(e,t,r){let o=await v(e,[s]),c=0;for(let s of o){if(s.kind!==`directory`||!t.has(s.name))continue;let o=s.name;try{let t=await v(e,f(o));if(t.some(e=>e.kind===`file`&&e.name===`metadata.json`))continue;let r=await i(e,[...f(o),E]);if(!r||(await n(e,l(o),r),t.some(e=>e.kind!==`file`||e.name!==E)))continue;await a(e,f(o),{recursive:!0}),c++}catch(e){r.push(`project-thumbnail ${o}: ${L(e)}`)}}return c}async function F(e,t){await I(e,[t])}async function I(e,t){if(!((await v(e,t)).length>0))try{await a(e,t)}catch(e){b.debug(`removeDirIfEmpty skipped`,{segments:t,error:e})}}function L(e){return e instanceof Error?e.message:String(e)}var R=`# FreeCut Workspace

This folder is your FreeCut project workspace - the app's source of truth
for everything: projects, media metadata, thumbnails, waveforms, caches.

Everything here is **plain files** you can \`cat\`, \`grep\`, and diff with
normal tools. AI coding agents can read them directly without a browser.

## Layout

\`\`\`
./
|-- README.md                  <- this file
|-- .freecut-workspace.json    <- marker + schema version
|-- index.json                 <- fast project list
|-- projects/
|   \`-- <projectId>/
|       |-- project.json       <- timeline, settings, keyframes, markers, transitions
|       |-- thumbnail.jpg
|       \`-- media-links.json   <- which media this project uses
|-- media/
|   \`-- <mediaId>/
|       |-- metadata.json      <- codec, duration, resolution, etc.
|       |-- source.<ext>       <- inline source file
|       |-- source.link.json   <- OR a link descriptor to an external file
|       |-- thumbnail.jpg
|       \`-- cache/
|           |-- filmstrip/     <- timeline frame thumbnails (0.jpg, 1.jpg, ...)
|           |-- waveform/      <- audio peaks (binned binary + multi-res.bin)
|           |-- gif-frames/    <- pre-extracted GIF frames
|           |-- decoded-audio/ <- chunked PCM for preview playback
|           |-- preview-audio.wav  <- conformed WAV for non-browser codecs
|           \`-- ai/            <- transcripts, captions, scene cuts, ...
\`-- content/
    |-- <hash[0:2]>/<hash>/    <- content-addressable source dedup (reserved)
    |   |-- refs.json
    |   \`-- data.<ext>
    \`-- proxies/<proxyKey>/    <- shared proxies (keyed by content fingerprint)
        |-- proxy.mp4
        \`-- meta.json
\`\`\`

## Safe to edit?

Everything except media source bytes is safe to inspect. Editing
\`project.json\` externally works; FreeCut picks up changes on next load.

Binary caches (waveforms, decoded audio, filmstrips) are regeneratable -
delete them and the app will rebuild them on demand.

## Moving the workspace

You can move this folder to a new location - the app just needs you to
re-pick it via the "Reconnect" prompt on next launch.
`,z=e(`WorkspaceBootstrap`);async function B(e,t){let n=0;async function r(e){let t=[];for await(let n of e.values())t.push({name:n.name,kind:n.kind});for(let i of t){if(i.kind===`directory`){try{await r(await e.getDirectoryHandle(i.name,{create:!1}))}catch(e){z.debug(`sweepStrandedTmpFiles: subdir skipped`,{name:i.name,error:e})}continue}if(i.name.endsWith(`.tmp`))try{await e.removeEntry(i.name),n++}catch(e){z.debug(`sweepStrandedTmpFiles: remove failed`,{name:i.name,error:e})}}}for(let n of t)try{await r(await e.getDirectoryHandle(n,{create:!1}))}catch{}return n}var V=/^[hof]-/;async function H(e){let t=await v(e,o()),r=0;for(let s of t){if(s.kind!==`directory`||!V.test(s.name))continue;let t=s.name,c=t.slice(2),l=[...o(),t],u=[...o(),c];try{if(await y(e,u)){await a(e,l,{recursive:!0}),r++;continue}let o=await v(e,l),s=[],c=!0;for(let t of o){if(t.kind!==`file`)continue;let n=await i(e,[...l,t.name]).catch(()=>null);if(!n){c=!1;break}s.push({name:t.name,blob:n})}if(!c){z.warn(`stripProxyKeyPrefixes: aborting ${t} — unreadable file, leaving source intact`);continue}let d=!0,f=[];for(let r of s)try{await n(e,[...u,r.name],r.blob),f.push(r.name)}catch(e){z.warn(`stripProxyKeyPrefixes: write failed for ${t}/${r.name}`,e),d=!1;break}if(!d){for(let t of f)await a(e,[...u,t],{recursive:!1}).catch(()=>void 0);continue}await a(e,l,{recursive:!0}),r++}catch(e){z.warn(`stripProxyKeyPrefixes: failed to rename ${t}`,e)}}return r}async function U(e){if(!await y(e,[`README.md`]))try{await n(e,[h],R)}catch(e){z.warn(`Failed to write README.md`,e)}if(await y(e,[`.freecut-workspace.json`]))try{let t=await D(e);t.ran&&z.info(`Workspace migration finished`,{from:t.fromVersion,to:t.toVersion,filmstrips:t.filmstripMediaMoved,waveforms:t.waveformBinMoved,previewAudio:t.previewAudioMoved,proxies:t.proxiesMoved,thumbnailMetaRemoved:t.thumbnailMetaRemoved,projectThumbnailsFixed:t.projectThumbnailsFixed,errors:t.errors.length,durationMs:Math.round(t.durationMs)})}catch(e){z.warn(`Workspace migration failed`,e)}else{let n={schemaVersion:`2.0`,createdAt:Date.now()};try{await t(e,[m],n)}catch(e){z.warn(`Failed to write workspace marker`,e)}}try{let t=await H(e);t>0&&z.info(`Stripped source-type prefix from ${t} proxy folder(s)`)}catch(e){z.warn(`stripProxyKeyPrefixes failed`,e)}try{let t=await B(e,[d,s,p]);t>0&&z.info(`Swept ${t} stranded .tmp file(s) from prior crash`)}catch(e){z.warn(`sweepStrandedTmpFiles failed`,e)}}export{U as bootstrapWorkspace};
//# sourceMappingURL=bootstrap-Ci7NVS02.js.map