import{i as e,r as t,t as n}from"./export-render.worker-BDG-g7om.js";import"./constants-BWopjn6x.js";import"./storage-BQsh1OA0.js";import{o as r,s as i,t as a}from"./mediabunny-input-source-Bpwi6RYm.js";import{t as o}from"./register-prores-decoder-CJd7qJ51.js";import{t as s}from"./blob-url-manager-36AWZ4WK.js";import{t as c}from"./gif-frame-cache-B2UHzEWB.js";import{i as l,n as u,t as d}from"./lottie-frame-provider-CWCR6tXe.js";import{A as f,C as p,D as m,F as h,I as g,N as _,O as v,P as y,S as b,T as x,_ as S,a as C,b as w,c as T,d as E,f as D,g as O,h as k,i as A,j,k as ee,l as M,m as N,o as P,p as F,r as te,s as ne,t as re,u as ie,v as ae,w as oe,x as I,y as se}from"./transition-planner-Dh4GmFvw.js";const ce=[`typewriter`,`fade-up`,`rise`,`cascade`,`pop`,`blur-in`,`slide-mask`,`wave-in`],le=[`fade-down`,`sink`,`pop-out`,`blur-out`,`typewriter-erase`],ue=[`pulse`,`wave`,`shimmer`,`swing`];function L(e){return e?e.topLeft[0]!==0||e.topLeft[1]!==0||e.topRight[0]!==0||e.topRight[1]!==0||e.bottomRight[0]!==0||e.bottomRight[1]!==0||e.bottomLeft[0]!==0||e.bottomLeft[1]!==0:!1}function de(e,t,n){if(!e)return;let r=e.referenceWidth&&e.referenceWidth>1e-6?e.referenceWidth:t,i=e.referenceHeight&&e.referenceHeight>1e-6?e.referenceHeight:n,a=r>1e-6?t/r:1,o=i>1e-6?n/i:1,s=([e,t])=>[e*a,t*o];return{topLeft:s(e.topLeft),topRight:s(e.topRight),bottomRight:s(e.bottomRight),bottomLeft:s(e.bottomLeft)}}function fe(e,t,n){return n?.sourceWidth!==void 0&&n.sourceWidth>0&&n.sourceHeight!==void 0&&n.sourceHeight>0?oe(n.sourceWidth,n.sourceHeight,e,t,n.crop,n.fitMode).mediaRect:{x:0,y:0,width:e,height:t}}function pe(e,t,n){let r=n.topLeft[0],i=n.topLeft[1],a=e+n.topRight[0],o=n.topRight[1],s=e+n.bottomRight[0],c=t+n.bottomRight[1],l=n.bottomLeft[0],u=t+n.bottomLeft[1],d=a-s,f=l-s,p=r-a+s-l,m=o-c,h=u-c,g=i-o+c-u,_=d*h-m*f;if(Math.abs(_)<1e-10)return[1,0,0,0,1,0,0,0,1];let v=(p*h-g*f)/_,y=(d*g-m*p)/_;return[(a-r+v*a)/e,(l-r+y*l)/t,r,(o-i+v*o)/e,(u-i+y*u)/t,i,v/e,y/t,1]}function me(e){let[t,n,r,i,a,o,s,c,l]=e,u=a*l-o*c,d=r*c-n*l,f=n*o-r*a,p=o*s-i*l,m=t*l-r*s,h=r*i-t*o,g=i*c-a*s,_=n*s-t*c,v=t*a-n*i,y=t*u+n*p+r*g;if(Math.abs(y)<1e-10)return null;let b=1/y;return[u*b,d*b,f*b,p*b,m*b,h*b,g*b,_*b,v*b]}function he(e,t,n){let r=e[6]*t+e[7]*n+e[8];return Math.abs(r)<1e-10?[t,n]:[(e[0]*t+e[1]*n+e[2])/r,(e[3]*t+e[4]*n+e[5])/r]}function ge(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.save();let m=(c+u+f)/3,h=(l+d+p)/3,g=1.5,_=(e,t)=>{let n=e-m,r=t-h,i=Math.sqrt(n*n+r*r);return i<1e-6?[e,t]:[e+n/i*g,t+r/i*g]},[v,y]=_(c,l),[b,x]=_(u,d),[S,C]=_(f,p);e.beginPath(),e.moveTo(v,y),e.lineTo(b,x),e.lineTo(S,C),e.closePath(),e.clip();let w=n*(a-s)+i*(s-r)+o*(r-a);if(Math.abs(w)<1e-10){e.restore();return}let T=1/w,E=(c*(a-s)+u*(s-r)+f*(r-a))*T,D=(l*(a-s)+d*(s-r)+p*(r-a))*T,O=(c*(o-i)+u*(n-o)+f*(i-n))*T,k=(l*(o-i)+d*(n-o)+p*(i-n))*T,A=(c*(i*s-o*a)+u*(o*r-n*s)+f*(n*a-i*r))*T,j=(l*(i*s-o*a)+d*(o*r-n*s)+p*(n*a-i*r))*T;e.setTransform(E,D,O,k,A,j),e.drawImage(t,0,0),e.restore()}function _e(e,t,n,r,i,a,o,s=16,c=`mesh`){if(c===`projective`){xe(e,t,n,r,i,a,o);return}let l=pe(n,r,o);for(let o=0;o<s;o++)for(let c=0;c<s;c++){let u=c/s*n,d=o/s*r,f=(c+1)/s*n,p=(o+1)/s*r,[m,h]=he(l,u,d),[g,_]=he(l,f,d),[v,y]=he(l,f,p),[b,x]=he(l,u,p);ge(e,t,u,d,f,d,f,p,i+m,a+h,i+g,a+_,i+v,a+y),ge(e,t,u,d,f,p,u,p,i+m,a+h,i+v,a+y,i+b,a+x)}}const ve=16384;function ye(e,t){let n=Math.max(1,Math.ceil(e)),r=Math.max(1,Math.ceil(t));if(typeof OffscreenCanvas<`u`){let e=new OffscreenCanvas(n,r),t=e.getContext(`2d`);return t?{canvas:e,ctx:t}:null}if(typeof document>`u`)return null;let i=document.createElement(`canvas`);i.width=n,i.height=r;let a=i.getContext(`2d`);return a?{canvas:i,ctx:a}:null}function be(e,t,n,r){let i=Math.floor(n),a=Math.floor(r),o=Math.min(t-1,i+1),s=Math.min(Math.floor(e.length/(t*4))-1,a+1),c=n-i,l=r-a,u=(a*t+i)*4,d=(a*t+o)*4,f=(s*t+i)*4,p=(s*t+o)*4,m=e[u+3]/255,h=e[d+3]/255,g=e[f+3]/255,_=e[p+3]/255,v=(e,t,n,r)=>{let i=e*(1-c)+t*c,a=n*(1-c)+r*c;return i*(1-l)+a*l},y=v(e[u]*m,e[d]*h,e[f]*g,e[p]*_),b=v(e[u+1]*m,e[d+1]*h,e[f+1]*g,e[p+1]*_),x=v(e[u+2]*m,e[d+2]*h,e[f+2]*g,e[p+2]*_),S=v(m,h,g,_);return S<=0?[0,0,0,0]:[y/S,b/S,x/S,S*255]}function R(e,t,n,r){let i=ye(t,n);if(!i)return null;i.ctx.clearRect(0,0,t,n),i.ctx.drawImage(e,0,0,t,n);let a;try{a=i.ctx.getImageData(0,0,t,n)}catch{return null}let o=[[r.topLeft[0],r.topLeft[1]],[t+r.topRight[0],r.topRight[1]],[t+r.bottomRight[0],n+r.bottomRight[1]],[r.bottomLeft[0],n+r.bottomLeft[1]]],s=Math.floor(Math.min(...o.map(([e])=>e)))-1,c=Math.floor(Math.min(...o.map(([,e])=>e)))-1,l=Math.ceil(Math.max(...o.map(([e])=>e)))+1,u=Math.ceil(Math.max(...o.map(([,e])=>e)))+1,d=Math.max(1,l-s),f=Math.max(1,u-c);if(d>ve||f>ve)return null;let p=ye(d,f);if(!p)return null;let m=p.ctx.createImageData(d,f),h=me(pe(t,n,r));if(!h)return null;for(let e=0;e<f;e++){let r=c+e+.5;for(let i=0;i<d;i++){let[o,c]=he(h,s+i+.5,r);if(o<0||c<0||o>t-1||c>n-1)continue;let l=be(a.data,t,o,c),u=(e*d+i)*4;m.data[u]=l[0],m.data[u+1]=l[1],m.data[u+2]=l[2],m.data[u+3]=l[3]}}return p.ctx.putImageData(m,0,0),{canvas:p.canvas,offsetX:s,offsetY:c}}function xe(e,t,n,r,i,a,o){let s=R(t,n,r,o);s&&e.drawImage(s.canvas,i+s.offsetX,a+s.offsetY)}function Se(e){switch(e){case`mp4`:case`mov`:return`aac`;case`webm`:case`mkv`:return`opus`;case`mp3`:return`mp3`;case`wav`:return`pcm-s16`;default:return`aac`}}async function Ce(e,t){let{Mp4OutputFormat:n,WebMOutputFormat:r,MovOutputFormat:i,MkvOutputFormat:a,Mp3OutputFormat:o,WavOutputFormat:s,AdtsOutputFormat:c}=await import(`./src-B-ojgZKZ.js`);switch(e){case`mp4`:return new n({fastStart:t?.fastStart?`in-memory`:!1});case`mov`:return new i({fastStart:t?.fastStart?`in-memory`:!1});case`webm`:return new r;case`mkv`:return new a;case`mp3`:return new o;case`aac`:return new c;case`wav`:return new s;default:return new n({fastStart:t?.fastStart?`in-memory`:!1})}}function we(e,t){if(e===`mp3`)return`audio/mpeg`;if(e===`aac`)return`audio/aac`;if(e===`wav`)return`audio/wav`;if(e===`mp4`||e===`mov`)return t===`avc`?`video/${e}; codecs="avc1.42E01E"`:t===`hevc`?`video/${e}; codecs="hvc1.1.6.L93.B0"`:`video/${e}`;if(e===`webm`||e===`mkv`){let n=e===`webm`?`video/webm`:`video/x-matroska`;return t===`vp8`?`${n}; codecs="vp8"`:t===`vp9`?`${n}; codecs="vp09.00.10.08"`:t===`av1`?`${n}; codecs="av01.0.04M.08"`:n}return`video/mp4`}let Te=null;async function Ee(){return Te||=import(`./mediabunny-aac-encoder-BR9WUDUE.js`).then(({registerAacEncoder:e})=>{e()}),Te}async function De(e,t={}){if(e===`pcm-s16`)return!0;let{canEncodeAudio:n}=await import(`./src-B-ojgZKZ.js`),r={bitrate:t.bitrate,numberOfChannels:t.numberOfChannels??2,sampleRate:t.sampleRate??48e3};try{return await n(e,r)?!0:e===`aac`&&(await Ee(),await n(e,r))}catch{return!1}}const z=1e-6;function Oe(e){let t=e.transform;return x(e.crop)?!1:!t||!(t.width!==void 0||t.height!==void 0||t.x!==void 0&&Math.abs(t.x)>z||t.y!==void 0&&Math.abs(t.y)>z||t.rotation!==void 0&&Math.abs(t.rotation)>z||t.cornerRadius!==void 0&&Math.abs(t.cornerRadius)>z||t.opacity!==void 0&&Math.abs(t.opacity-1)>z)}function ke(e,t){return!(e.mode!==`video`||t.durationInFrames===void 0||t.durationInFrames<=0||(t.transitions?.length??0)>0||(t.keyframes?.length??0)>0)}function Ae(e){let t=(e.tracks??[]).filter(e=>e.visible!==!1),n=[];for(let e of t)for(let t of e.items??[])t.durationInFrames>0&&n.push({item:t,track:e});return n.length===1?n[0]:null}function B(e,t){if(!e.src||e.isReversed===!0||e.from!==0||e.durationInFrames!==t.durationInFrames||(e.effects?.length??0)>0||!Oe(e))return!0;let n=e.speed??1;return Math.abs(n-1)>z||Math.abs(e.fadeIn??0)>z||Math.abs(e.fadeOut??0)>z}function je(e){return Math.abs(e.volume??0)>z||Math.abs(e.audioFadeIn??0)>z||Math.abs(e.audioFadeOut??0)>z}function Me(e,t,n){let r=e.sourceFps??t.fps;if(!Number.isFinite(r)||r<=0||Math.abs((n.fps??t.fps)-t.fps)>z)return null;let i=e.sourceStart??e.trimStart??e.offset??0;if(Math.abs(i)>z)return null;let a=Math.max(0,i/r),o=e.durationInFrames/t.fps;if(!Number.isFinite(o)||o<=0)return null;let s=a+o;return!Number.isFinite(s)||s<=a?null:{trimStartSeconds:a,trimEndSeconds:s}}function Ne(e,t){let n=e.codec;return n?e.getSupportedCodecs().includes(n)&&n===t.codec&&e.displayWidth===t.resolution.width&&e.displayHeight===t.resolution.height:!1}function Pe(e){let t=e.codec;return!t||e.getSupportedCodecs().includes(t)}function Fe(e,t){if(!ke(e,t))return null;let n=Ae(t);if(!n||n.item.type!==`video`)return null;let r=n.item;if(B(r,t))return null;let i=n.track.muted!==!0;if(i&&je(r))return null;let a=Me(r,t,e);return a?{src:r.src,trimStartSeconds:a.trimStartSeconds,trimEndSeconds:a.trimEndSeconds,includeAudio:i}:null}const Ie=`freecut-export-output`;let Le=!1;function Re(e){return`${typeof crypto<`u`&&typeof crypto.randomUUID==`function`?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}.${e}`}async function ze(e,t,n){if(typeof navigator>`u`||!navigator.storage?.getDirectory)return null;let r=await(await navigator.storage.getDirectory()).getDirectoryHandle(Ie,{create:!0});Le||(Le=!0,(async()=>{for await(let[e,t]of r.entries())if(t.kind===`file`)try{let n=await t.getFile();Date.now()-n.lastModified>=864e5&&await r.removeEntry(e)}catch{}})());let i=Re(t),a=await r.getFileHandle(i,{create:!0}),o=await a.createWritable(),s=!1,c=async()=>{try{await r.removeEntry(i)}catch{}};return{target:new e.StreamTarget(o,{chunked:!0,chunkSize:4194304}),kind:`file`,complete:async()=>{s=!0;let e=await a.getFile();return{blob:new Blob([e],{type:n}),temporaryOutput:{directory:Ie,fileName:i}}},discard:async()=>{s||await o.abort().catch(()=>void 0),await c()}}}async function Be(e,t,n){try{let r=await ze(e,t,n);if(r)return r}catch{}let r=new e.BufferTarget;return{target:r,kind:`buffer`,complete:async()=>{if(!r.buffer)throw Error(`No output buffer generated`);return{blob:new Blob([r.buffer],{type:n})}},discard:async()=>{}}}function Ve(e){return`WEBVTT\n\n${We(e).map(e=>`${He(e.startSeconds)} --> ${He(e.endSeconds)}\n${e.text}`).join(`

`)}`}function He(e){return Ue(e,`.`)}function Ue(e,t){let n=Math.max(0,Math.round(e*1e3)),r=n%1e3,i=Math.floor(n/1e3),a=i%60,o=Math.floor(i/60),s=o%60;return`${Ge(Math.floor(o/60))}:${Ge(s)}:${Ge(a)}${t}${String(r).padStart(3,`0`)}`}function We(e){return e.filter(e=>e.text.trim().length>0&&e.endSeconds>e.startSeconds).map(e=>({...e,text:e.text.trim()})).sort((e,t)=>e.startSeconds-t.startSeconds)}function Ge(e){return String(e).padStart(2,`0`)}function Ke(e){let{subtitleMode:t,container:n,supportsWebVttSubtitles:r,hasTranscriptVtt:i}=e,a=t===`embedded`&&i&&r&&n!==`mp4`&&n!==`mov`;return{embedTranscriptSubtitles:a,burnInSubtitles:t===`burn`||t===`embedded`&&!a,fallbackToBurnIn:t===`embedded`&&i&&!a}}function qe(e){return e.type===`subtitle`&&e.source.type===`transcript`}function Je(e){let t=e.fps,n=e.durationInFrames===void 0?1/0:e.durationInFrames/t,r=[];for(let i of e.tracks)if(i.visible!==!1)for(let e of i.items??[]){if(!qe(e))continue;let i=e.from/t,a=(e.from+e.durationInFrames)/t;for(let t of e.cues){let e=Math.max(0,i+t.startSeconds),o=Math.min(n,a,i+t.endSeconds);o<=e||t.text.trim().length===0||r.push({id:t.id,startSeconds:e,endSeconds:o,text:t.text})}}return r.sort((e,t)=>e.startSeconds-t.startSeconds||e.endSeconds-t.endSeconds),r}function Ye(e){let t=Je(e);return t.length===0?null:Ve(t)}function Xe(e){return{...e,tracks:e.tracks.map(e=>({...e,items:(e.items??[]).filter(e=>!qe(e))}))}}function Ze(e){return e.hasAudioContent&&e.durationSeconds>=300&&e.supportsWindowedProcessing()}function V(e){return{tracksCount:e.tracks?.length??0,hasTransitions:(e.transitions?.length??0)>0,hasKeyframes:(e.keyframes?.length??0)>0}}function Qe(e,t){let n=e.width??t.width,r=e.height??t.height,i=t.width,a=t.height;return{compositionWidth:n,compositionHeight:r,exportWidth:i,exportHeight:a,needsScaling:i!==n||a!==r}}function $e(e){let t=e.subtitleMode??`burn`,n=t===`embedded`?Ye(e.composition):null,{embedTranscriptSubtitles:r,burnInSubtitles:i,fallbackToBurnIn:a}=Ke({subtitleMode:t,container:e.container,supportsWebVttSubtitles:e.supportsWebVttSubtitles,hasTranscriptVtt:n!==null});return{embedTranscriptSubtitles:r,fallbackToBurnIn:a,transcriptSubtitleVtt:n,renderCompositionInput:i?e.composition:Xe(e.composition)}}function et(e){let t=Se(e);if(t!==`aac`&&t!==`opus`)throw Error(`Unsupported audio codec ${t} for ${e.toUpperCase()} export`);return t}function tt(e){return e===`mp3`?`mp3`:e===`aac`?`aac`:`pcm-s16`}function nt(e){if(typeof e==`string`)try{return JSON.parse(e)}catch{return null}return e&&typeof e==`object`?e:null}function rt(e){let t=/^#?([0-9a-f]{6})$/i.exec(e.trim());if(!t)return null;let n=Number.parseInt(t[1]??``,16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}function it(e){return Array.isArray(e)&&e.length>=3&&typeof e[0]==`number`}function at(e){return typeof e==`string`&&e.trim()?e.trim():``}const ot=/^(fill|stroke)(\s+\d+)?$/i;function st(e){return e.length>0&&!ot.test(e)}function ct(e,t,n){if(e.ty===`fl`||e.ty===`st`){let r=e.c;if(!r||typeof r!=`object`||typeof r.sid==`string`)return[];if(r.a===1){let e=r.k;return!Array.isArray(e)||!it(e[0]?.s)?[]:[{label:t,named:n,read:()=>{let t=e[0].s;return[t[0],t[1],t[2]]},write:t=>{for(let n of e)it(n.s)&&([n.s[0],n.s[1],n.s[2]]=t),it(n.e)&&([n.e[0],n.e[1],n.e[2]]=t)}}]}if(!it(r.k))return[];let i=r.k;return[{label:t,named:n,read:()=>[i[0],i[1],i[2]],write:e=>{[i[0],i[1],i[2]]=e}}]}return[]}function lt(e,t){let n=e?.layers;if(!Array.isArray(n))return;let r=0,i=(e,n)=>{if(Array.isArray(e))for(let a of e){let e=a;if(e?.ty===`gr`&&Array.isArray(e.it)){i(e.it,n);continue}let o=e?.ty===`st`?`Stroke`:`Fill`,s=at(e?.nm),c=s||(n?`${n} ${o}`:o);for(let n of ct(e,c,st(s)))t(n,`c${r}`),r+=1}};for(let e of n){let t=e;Array.isArray(t?.shapes)&&i(t.shapes,at(t.nm))}}function ut(e,t){let n=e.layers;if(!Array.isArray(n))return;let r=e=>{if(Array.isArray(e))for(let n of e){let e=n;e?.ty===`gr`&&Array.isArray(e.it)?r(e.it):t(e)}};for(let e of n){let t=e;Array.isArray(t?.shapes)&&r(t.shapes)}}function H(e,t,n){let r=!1,i=e.slots?.[t]?.p;if(i&&typeof i==`object`){if(i.a===1&&Array.isArray(i.k))for(let e of i.k)it(e.s)&&([e.s[0],e.s[1],e.s[2]]=n,r=!0);else it(i.k)?([i.k[0],i.k[1],i.k[2]]=n,r=!0):(i.a=0,i.k=[n[0],n[1],n[2],1],r=!0)}return ut(e,e=>{if(e.ty!==`fl`&&e.ty!==`st`)return;let i=e.c;i&&typeof i==`object`&&i.sid===t&&(it(i.k)?[i.k[0],i.k[1],i.k[2]]=n:i.k=[n[0],n[1],n[2],1],r=!0)}),r}function dt(e,t){let n=nt(e);if(!n||Object.keys(t).length===0)return null;let r=!1;for(let[e,i]of Object.entries(t)){if(!e.startsWith(`s:`))continue;let t=rt(i);t&&H(n,e.slice(2),t)&&(r=!0)}return lt(n,(e,n)=>{let i=t[n];if(i===void 0)return;let a=rt(i);a&&(e.write(a),r=!0)}),r?JSON.stringify(n):null}function ft(e){if(Array.isArray(e))return e[0]?.s}function pt(e,t){let n=e.layers;return Array.isArray(n)?n.filter(e=>e?.ty===5&&e.t?.d?.sid===t):[]}function mt(e,t,n){let r=!1,i=e.slots?.[t]?.p,a=ft(i?.k);a&&(a.t=n,r=!0),i?.p&&typeof i.p==`object`&&(i.p.t=n,r=!0);for(let i of pt(e,t)){let e=ft(i.t?.d?.k);e&&(e.t=n,r=!0)}return r}function ht(e,t){let n=nt(e),r=n?.layers;if(!n||!Array.isArray(r)||Object.keys(t).length===0)return null;let i=!1;for(let[e,r]of Object.entries(t))e.startsWith(`s:`)&&mt(n,e.slice(2),r)&&(i=!0);return r.forEach((e,n)=>{let r=t[String(n)];if(r===void 0)return;let a=e;if(a?.ty!==5||typeof a.t?.d?.sid==`string`)return;let o=a.t?.d?.k;if(Array.isArray(o))for(let e of o)e?.s&&typeof e.s.t==`string`&&(e.s.t=r,i=!0)}),i?JSON.stringify(n):null}async function gt(e,t){let n=!!t.textOverrides&&Object.keys(t.textOverrides).length>0,a=!!t.colorOverrides&&Object.keys(t.colorOverrides).length>0,o=n||a||!!t.animationId,s=null;if(o){let i=await r(e,!0,t.animationId);i&&(n&&ht(i,t.textOverrides),a&&dt(i,t.colorOverrides),s=JSON.stringify(i))}let c=t.themeId?await i(e,t.themeId):null,l=t.slotOverrides&&Object.keys(t.slotOverrides).length>0?t.slotOverrides:null;return{data:s,themeData:c,slots:l}}const _t=n(`VideoSourcePool`);function vt(e){let t=/* @__PURE__ */ Error(`VIDEO_POOL_ABORT:${e}`);return t.name=`AbortError`,t}var yt=class e{sourceUrl;primary=null;overflow=[];assignments=/* @__PURE__ */ new Map;loadPromise=null;_pendingPrimary=null;onElementReady;onElementError;static MAX_OVERFLOW_ELEMENTS=3;static LOAD_TIMEOUT_MS=15e3;_loadTimeoutId=null;constructor(e,t){this.sourceUrl=e,this.onElementReady=t?.onElementReady,this.onElementError=t?.onElementError}async ensureLoaded(){if(this.primary)return this.primary;if(this.loadPromise)return await this.loadPromise,this.primary;let t=this.createElementSync();return this._pendingPrimary=t,this.loadPromise=new Promise((n,r)=>{let i=()=>{o(),n()},a=()=>{let e=t.getAttribute(`src`)??``,n=t.error?.message||`Unknown error`;if(!e&&/empty\s+src\s+attribute/i.test(n)){o(),r(vt(`source-cleared-during-load`));return}o(),r(/* @__PURE__ */ Error(`Failed to load video: ${n}`))},o=()=>{this._loadTimeoutId!==null&&(clearTimeout(this._loadTimeoutId),this._loadTimeoutId=null),t.removeEventListener(`canplay`,i),t.removeEventListener(`error`,a)};t.addEventListener(`canplay`,i),t.addEventListener(`error`,a),this._loadTimeoutId=setTimeout(()=>{if(!(t.getAttribute(`src`)??``)){o(),r(vt(`source-cleared-before-ready`));return}o(),r(/* @__PURE__ */ Error(`Video load timed out after ${e.LOAD_TIMEOUT_MS}ms for: ${this.sourceUrl.slice(0,80)}`))},e.LOAD_TIMEOUT_MS),t.load()}).then(()=>{this.primary=t,this._pendingPrimary=null}).catch(e=>{throw this._pendingPrimary===t&&(this._pendingPrimary=null),this.disposeElement(t),this.loadPromise=null,e}),await this.loadPromise,this.primary}async ensureReadyLanes(e,t){if(e<=0)return;for(await this.ensureLoaded();this.getElementCount()<e;){let e=this.createElementSync();this.overflow.push(e),await this.waitForElementReady(e)}let n=this.getManagedElements().filter(e=>!this.isElementInUse(e)),r=t?.targetTimeSeconds??[];for(let e=0;e<n.length;e+=1){let i=n[e],a=r[e];a!==void 0&&this.seekElement(i,a),t?.warmDecode&&await this.warmElement(i)}}acquire(t){let n=this.assignments.get(t);if(n)return n;if(this.primary&&!this.isElementInUse(this.primary))return this.assignments.set(t,this.primary),this.primary;if(this._pendingPrimary&&!this.isElementInUse(this._pendingPrimary))return this.primary=this._pendingPrimary,this._pendingPrimary=null,this.assignments.set(t,this.primary),this.primary;for(let e of this.overflow)if(!this.isElementInUse(e))return this.assignments.set(t,e),e;if(this.overflow.length<e.MAX_OVERFLOW_ELEMENTS){let e=this.createElementSync();return this.overflow.push(e),this.assignments.set(t,e),e}_t.warn(`All pooled elements in use for ${this.sourceUrl}, creating extra overflow element`);let r=this.createElementSync();return this.overflow.push(r),this.assignments.set(t,r),r}release(e){this.assignments.delete(e),this.pruneIdleOverflowElements()}seekElement(e,t,n){let r=e.duration||1/0,i=Math.max(0,Math.min(t,r-.001)),a=n?.fast?.1:.016;Math.abs(e.currentTime-i)<a||(n?.fast&&`fastSeek`in e?e.fastSeek(i):e.currentTime=i)}getAssignedElement(e){return this.assignments.get(e)||null}getActiveCount(){return this.assignments.size}getElementCount(){return+!!this.primary+ +!!this._pendingPrimary+this.overflow.length}isInUse(){return this.assignments.size>0}dispose(){this._loadTimeoutId!==null&&(clearTimeout(this._loadTimeoutId),this._loadTimeoutId=null),this.primary&&this.disposeElement(this.primary),this._pendingPrimary&&=(this.disposeElement(this._pendingPrimary),null);for(let e of this.overflow)this.disposeElement(e);this.primary=null,this.overflow=[],this.assignments.clear(),this.loadPromise=null}disposeElement(e){e.pause(),e.src=``,e.load()}pruneIdleOverflowElements(){for(let t=this.overflow.length-1;t>=e.MAX_OVERFLOW_ELEMENTS;--t){let e=this.overflow[t];e&&!this.isElementInUse(e)&&(this.disposeElement(e),this.overflow.splice(t,1))}}isElementInUse(e){for(let t of this.assignments.values())if(t===e)return!0;return!1}getManagedElements(){return[...this.primary?[this.primary]:[],...this._pendingPrimary?[this._pendingPrimary]:[],...this.overflow]}async waitForElementReady(t){t.readyState>=2||await new Promise((n,r)=>{let i=null,a=()=>{i!==null&&(clearTimeout(i),i=null),t.removeEventListener(`canplay`,o),t.removeEventListener(`error`,s)},o=()=>{a(),n()},s=()=>{a(),r(/* @__PURE__ */ Error(`Failed to load video: ${t.error?.message||`Unknown error`}`))};t.addEventListener(`canplay`,o),t.addEventListener(`error`,s),i=setTimeout(()=>{a(),r(/* @__PURE__ */ Error(`Video load timed out after ${e.LOAD_TIMEOUT_MS}ms for: ${this.sourceUrl.slice(0,80)}`))},e.LOAD_TIMEOUT_MS),t.load()})}async warmElement(e){if(e.readyState<2||!e.paused)return;let t=e.muted;e.muted=!0;try{await e.play(),await Promise.resolve(),e.pause()}catch{}finally{e.muted=t}}createElementSync(){let e=document.createElement(`video`);return e.src=this.sourceUrl,e.preload=`auto`,e.playsInline=!0,e.muted=!0,e.addEventListener(`loadedmetadata`,()=>{this.onElementReady?.(e)}),e.addEventListener(`error`,()=>{let t=/* @__PURE__ */ Error(`Failed to load video: ${e.error?.message||`Unknown error`}`);this.onElementError?.(e,t)}),e}},bt=class{sources=/* @__PURE__ */ new Map;clipToSource=/* @__PURE__ */ new Map;pendingReleaseTimers=/* @__PURE__ */ new Map;onElementReady;onElementError;constructor(e){this.onElementReady=e?.onElementReady,this.onElementError=e?.onElementError}getSource(e){let t=this.sources.get(e);return t||(t=new yt(e,{onElementReady:t=>{this.onElementReady?.(e,t)},onElementError:(t,n)=>{this.onElementError?.(e,n)}}),this.sources.set(e,t)),t}async preloadSource(e){await this.getSource(e).ensureLoaded()}acquireForClip(e,t){this.cancelPendingRelease(e);let n=this.clipToSource.get(e);if(n&&n!==t&&this.releaseClipNow(e),this.clipToSource.get(e)===t){let n=this.sources.get(t)?.getAssignedElement(e);if(n)return n}let r=this.getSource(t).acquire(e);return r&&this.clipToSource.set(e,t),r}releaseClip(e,t){let n=Math.max(0,t?.delayMs??0);if(this.cancelPendingRelease(e),n>0){let t=setTimeout(()=>{this.pendingReleaseTimers.delete(e),this.releaseClipNow(e)},n);this.pendingReleaseTimers.set(e,t);return}this.releaseClipNow(e)}async ensureReadyLanes(e,t,n){await this.getSource(e).ensureReadyLanes(t,n)}seekClip(e,t,n){let r=this.clipToSource.get(e);if(!r)return;let i=this.sources.get(r);if(!i)return;let a=i.getAssignedElement(e);a&&i.seekElement(a,t,n)}getClipElement(e){let t=this.clipToSource.get(e);return t&&this.sources.get(t)?.getAssignedElement(e)||null}pruneUnused(e){for(let[t,n]of this.sources.entries())!e.has(t)&&!n.isInUse()&&(n.dispose(),this.sources.delete(t))}getStats(){let e=0,t=0;for(let n of this.sources.values())e+=n.getElementCount(),t+=n.getActiveCount();return{sourceCount:this.sources.size,totalElements:e,activeClips:t}}dispose(){for(let e of this.pendingReleaseTimers.values())clearTimeout(e);this.pendingReleaseTimers.clear();for(let e of this.sources.values())e.dispose();this.sources.clear(),this.clipToSource.clear()}cancelPendingRelease(e){let t=this.pendingReleaseTimers.get(e);t!==void 0&&(clearTimeout(t),this.pendingReleaseTimers.delete(e))}releaseClipNow(e){let t=this.clipToSource.get(e);t&&(this.sources.get(t)?.release(e),this.clipToSource.delete(e))}};function xt(e,t){if(e.shapeType!==`path`)return e;let n=t?.(e.id);return!n||n===e.pathVertices?e:{...e,pathVertices:n}}function St(e,t){return e.type===`shape`?xt(e,t):e}const Ct=Math.PI*2,wt={"float-drift":[`x`,`y`,`rotation`],"breath-pulse":[`width`,`height`,`opacity`],"micro-shake":[`x`,`y`,`rotation`],sway:[`rotation`],spin:[`rotation`]};function Tt(e,t,n){return Math.max(t,Math.min(n,e))}function Et(e,t){if(!wt[e.type].includes(t))return 0;let n=e.channelGains?.[t];return typeof n==`number`&&Number.isFinite(n)?Tt(n,0,2):1}function Dt(e){let t=Math.sin(e*12.9898)*43758.5453;return(t-Math.floor(t))*2-1}function Ot(e){return e*e*(3-2*e)}function kt(e,t){let n=Math.floor(t),r=t-n,i=Dt(e+n);return i+(Dt(e+n+1)-i)*Ot(r)}const At={dx:0,dy:0,dRotation:0,dOpacity:0,scaleWidth:1,scaleHeight:1};function jt(e,t){return{t:t.frame/Math.max(1,t.fps),phase:e.phaseFrames/Math.max(1,t.fps)*e.frequency*Ct}}function Mt(e,t,n){let{t:r,phase:i}=jt(e,t),a=Tt(t.frameWidth*.008,4,18)*e.amplitude,o=Tt(t.frameHeight*.014,6,28)*e.amplitude,s=1.2*e.amplitude;n.dx+=Et(e,`x`)*a*Math.sin(Ct*e.frequency*r+i+Math.PI/2),n.dy+=Et(e,`y`)*o*Math.sin(Ct*e.frequency*r+i),n.dRotation+=Et(e,`rotation`)*s*Math.sin(Math.PI*e.frequency*r+i+Math.PI)}function Nt(e,t,n){let{t:r,phase:i}=jt(e,t),a=.035*e.amplitude,o=Math.min(.08,.04*e.amplitude),s=Math.sin(Ct*e.frequency*r+i);n.scaleWidth*=1+Et(e,`width`)*a*s,n.scaleHeight*=1+Et(e,`height`)*a*s,n.dOpacity+=Et(e,`opacity`)*o*s}function Pt(e,t,n){let r=t.frame/Math.max(1,t.fps)*e.frequency,i=Tt(t.frameWidth*.004,2,10)*e.amplitude,a=Tt(t.frameHeight*.004,2,10)*e.amplitude,o=.55*e.amplitude,s=e.seed*97;n.dx+=Et(e,`x`)*kt(s+11,r)*i,n.dy+=Et(e,`y`)*kt(s+23,r)*a,n.dRotation+=Et(e,`rotation`)*kt(s+37,r)*o}function Ft(e,t,n){let{t:r,phase:i}=jt(e,t);n.dRotation+=Et(e,`rotation`)*4*e.amplitude*Math.sin(Ct*e.frequency*r+i)}function It(e,t,n){let r=t.frame/Math.max(1,t.fps);n.dRotation+=Et(e,`rotation`)*360*e.frequency*e.amplitude*r}function Lt(e,t,n){if(!(!e.enabled||e.amplitude<=0))switch(e.type){case`float-drift`:return Mt(e,t,n);case`breath-pulse`:return Nt(e,t,n);case`micro-shake`:return Pt(e,t,n);case`sway`:return Ft(e,t,n);case`spin`:return It(e,t,n);default:return e.type}}function Rt(e,t){if(!e||e.length===0)return At;let n={...At};for(let r of e)Lt(r,t,n);return n}function zt(e,t,n){if(!t||t.length===0)return e;let r=Rt(t,n);return r.dx===0&&r.dy===0&&r.dRotation===0&&r.dOpacity===0&&r.scaleWidth===1&&r.scaleHeight===1?e:{...e,x:e.x+r.dx,y:e.y+r.dy,rotation:e.rotation+r.dRotation,width:Math.max(1,e.width*r.scaleWidth),height:Math.max(1,e.height*r.scaleHeight),opacity:Tt(e.opacity+r.dOpacity,0,1)}}const Bt={dx:0,dy:0,dRotation:0,dOpacity:0,scaleWidth:1,scaleHeight:1};function Vt(e){return+(e===`multiply`)}function Ht(e,t){if(!e||e.length===0)return Bt;let n={...Bt};for(let r of e)if(r.enabled)for(let e of r.tracks){if(e.keyframes.length===0)continue;let r=m(e.keyframes,t,Vt(e.blend));switch(e.property){case`x`:n.dx+=r;break;case`y`:n.dy+=r;break;case`rotation`:n.dRotation+=r;break;case`opacity`:n.dOpacity+=r;break;case`width`:n.scaleWidth*=r;break;case`height`:n.scaleHeight*=r}}return n}function Ut(e,t,n){return Math.max(t,Math.min(n,e))}function Wt(e,t,n){if(!t||t.length===0)return e;let r=Ht(t,n);return{...e,x:e.x+r.dx,y:e.y+r.dy,rotation:e.rotation+r.dRotation,width:Math.max(1,e.width*r.scaleWidth),height:Math.max(1,e.height*r.scaleHeight),opacity:Ut(e.opacity+r.dOpacity,0,1)}}function Gt(e,t,n,r){let i=Math.max(1,t-1),a=Math.max(0,Math.min(1,e/i));switch(n){case`ease-in`:return ee(a);case`ease-out`:return j(a);case`ease-in-out`:return f(a);case`cubic-bezier`:return r?v(a,r):a;default:return a}}function Kt({transitionWindows:e,frame:t}){let n=[],r=/* @__PURE__ */ new Set;for(let i of e){if(t<i.startFrame||t>=i.endFrame)continue;let e=t-i.startFrame;n.push({transition:i.transition,leftClip:i.leftClip,rightClip:i.rightClip,progress:Gt(e,i.durationInFrames,i.transition.timing,i.transition.bezierPoints),transitionStart:i.startFrame,transitionEnd:i.endFrame,durationInFrames:i.durationInFrames,leftPortion:i.leftPortion,rightPortion:i.rightPortion,cutPoint:i.cutPoint}),r.add(i.transition.leftClipId),r.add(i.transition.rightClipId)}return{activeTransitions:n,transitionClipIds:r}}function qt(e){return e?(e.frames?.length??0)>0||(e.ranges?.length??0)>0:!1}function Jt(e,t){return e>=t.startFrame&&e<t.endFrame}function Yt(e,t){return t.some(t=>Jt(e,t))}const Xt=1e-6;function Zt(e,t){return{a:e.a*t.a+e.c*t.b,b:e.b*t.a+e.d*t.b,c:e.a*t.c+e.c*t.d,d:e.b*t.c+e.d*t.d,e:e.a*t.e+e.c*t.f+e.e,f:e.b*t.e+e.d*t.f+e.f}}function Qt(e){let t=e.a*e.d-e.b*e.c;return Math.abs(t)<Xt?null:{a:e.d/t,b:-e.b/t,c:-e.c/t,d:e.a/t,e:(e.c*e.f-e.d*e.e)/t,f:(e.b*e.e-e.a*e.f)/t}}function $t(e){let t=e.rotation*Math.PI/180,n=Math.cos(t),r=Math.sin(t);return{a:n*e.width,b:r*e.width,c:-r*e.height,d:n*e.height,e:e.x,f:e.y}}function en(e,t){let n=Math.max(Xt,Math.hypot(t.a,t.b)),r=t.a*t.d-t.b*t.c,i=Math.max(Xt,Math.abs(r)/n),a=n/Math.max(Xt,e.width),o=i/Math.max(Xt,e.height);return{...e,x:t.e,y:t.f,width:n,height:i,anchorX:e.anchorX*a,anchorY:e.anchorY*o,rotation:Math.atan2(t.b,t.a)*180/Math.PI,cornerRadius:e.cornerRadius*Math.sqrt(a*o)}}function tn(e,t){let n=Qt($t(t.childLocalReference));return n?Zt($t(t.childWorldReference),Zt(n,$t(e))):$t(e)}function nn(e,t,n){let r=tn(e,t);if(n&&t.parentReference){let e=Qt($t(t.parentReference));e&&(r=Zt(Zt($t(n),e),r))}return en(e,r)}function rn(e,t,n={cache:/* @__PURE__ */ new Map,active:/* @__PURE__ */ new Set}){let r=n.cache.get(e.id);if(r)return r;let i=t.resolveLocal(e),a=e.transformParent;if(!a||n.active.has(e.id))return i;n.active.add(e.id);let o=a.parentItemId?t.getItem(a.parentItemId):void 0,s=nn(i,a,o?rn(o,t,n):void 0);return n.active.delete(e.id),n.cache.set(e.id,s),s}function an(e,t){if(!t)return e;let n=Object.prototype.hasOwnProperty.call(t,`anchorX`),r=Object.prototype.hasOwnProperty.call(t,`anchorY`);return{...e,...t,anchorX:n&&t.anchorX===void 0?(t.width??e.width)/2:t.anchorX??e.anchorX,anchorY:r&&t.anchorY===void 0?(t.height??e.height)/2:t.anchorY??e.anchorY,opacity:t.opacity??e.opacity,cornerRadius:t.cornerRadius??e.cornerRadius}}function on(e,{canvas:t,relativeFrame:n,keyframes:r,previewTransform:i,expressionContext:a}){let o=O(e,t,k(e)),s=an(zt(Wt(r&&ne(r)?T(o,r,n,a):o,e.motionLayers,n),e.motionModifiers,{frame:n,fps:t.fps,frameWidth:t.width,frameHeight:t.height}),i);return e.type===`text`&&!L(e.cornerPin)?M(S(e,r,n,t),s):s}function sn(e,{canvas:t,frame:n,keyframes:r,previewTransform:i,getItem:a,getKeyframes:o,getPreviewTransform:s}){let c=c=>on(c,{canvas:t,relativeFrame:n-c.from,keyframes:c.id===e.id?r:o?.(c.id),previewTransform:c.id===e.id?i??s?.(c.id):s?.(c.id),expressionContext:a&&o?{globalFrame:n,canvas:t,getItem:a,getKeyframes:o,getPreviewTransform:s}:void 0});return a?rn(e,{getItem:a,resolveLocal:c}):c(e)}function cn(e,{canvas:t,frame:n,getKeyframes:r,getItem:i,getPreviewTransform:a,getPreviewPathVertices:o}){return e.length===0?[]:e.map(e=>`mask`in e?e:{mask:e,trackOrder:0}).filter(({mask:e})=>{let t=e.from,r=e.from+e.durationInFrames;return n>=t&&n<r}).map(({mask:e,trackOrder:s})=>{let c=xt(e,o);return{shape:c,trackOrder:s,transform:sn(c,{canvas:t,frame:n,keyframes:r?.(e.id),previewTransform:a?.(e.id),getItem:i,getKeyframes:r,getPreviewTransform:a})}})}function ln({renderPlan:e,frame:t,canvas:n,getKeyframes:r,getItem:i,getPreviewTransform:a,getPreviewPathVertices:o}){return{frame:t,activeShapeMasks:cn(e.visibleShapeMasks,{canvas:n,frame:t,getKeyframes:r,getItem:i,getPreviewTransform:a,getPreviewPathVertices:o}),transitionFrameState:Kt({transitionWindows:e.transitionWindows,frame:t})}}function un(){let e=null,t=-1,n,r=null,i=-1,a=-1,o=-1,s,c,l,u;return{resolve(d,f){let p=i===d.canvas.width&&a===d.canvas.height&&o===d.canvas.fps,m=s===d.getKeyframes&&c===d.getItem&&l===d.getPreviewTransform&&u===d.getPreviewPathVertices;return e&&t===d.frame&&n===f&&r===d.renderPlan&&p&&m?e:(e=ln(d),t=d.frame,n=f,r=d.renderPlan,i=d.canvas.width,a=d.canvas.height,o=d.canvas.fps,s=d.getKeyframes,c=d.getItem,l=d.getPreviewTransform,u=d.getPreviewPathVertices,e)},invalidate(d){if(e&&d&&qt(d)){let e=d.frames?.includes(t)??!1,n=d.ranges?Yt(t,d.ranges):!1;if(!e&&!n)return}e=null,t=-1,n=void 0,r=null,i=-1,a=-1,o=-1,s=void 0,c=void 0,l=void 0,u=void 0}}}function dn({activeTransitions:e,getTrackOrder:t}){let n=/* @__PURE__ */ new Map;for(let r of e){let e=t(r),i=n.get(e);if(i){i.push(r);continue}n.set(e,[r])}return n}function fn(e){let t=e.some(e=>e.solo),n=Math.max(...e.map(e=>e.order??0),0),r=e.filter(e=>t?e.solo===!0:e.visible!==!1),i=new Set(r.map(e=>e.id)),a=[...r].sort((e,t)=>(t.order??0)-(e.order??0)),o=[...a].reverse(),s=[...e].sort((e,t)=>(t.order??0)-(e.order??0)),c=/* @__PURE__ */ new Map;for(let t of e)c.set(t.id,t.order??0);return{hasSoloTracks:t,maxOrder:n,visibleTracks:r,visibleTrackIds:i,visibleTracksByOrderDesc:a,visibleTracksByOrderAsc:o,allTracksByOrderDesc:s,trackOrderMap:c}}function pn({tracks:e,transitions:t=[]}){let n=fn(e),{visibleTracks:r,visibleTrackIds:i,maxOrder:a}=n,o=_n({tracks:e,visibleTrackIds:i,maxOrder:a}),s=xn(e);return{trackRenderState:n,visualItems:o,videoItems:o.filter(e=>e.type===`video`),audioItems:vn({tracks:e,visibleTrackIds:i}),stableDomTracks:yn({tracks:e,visibleTrackIds:i}),visibleShapeMasks:hn(r),visibleAdjustmentLayers:gn(r),visibleTextFontFamilies:bn(r),transitionClipItems:s,transitionClipMap:Sn(s),transitionWindows:Cn(t,s)}}function mn({renderPlan:e,transitions:t,getCurrentItem:n}){let r=e.transitionClipItems.map(e=>n(e));return{...e,transitionClipItems:r,transitionClipMap:Sn(r),transitionWindows:Cn(t,r)}}function hn(e){let t=[];for(let n of e)for(let e of n.items)e.type===`shape`&&e.isMask&&t.push({mask:e,trackOrder:n.order??0});return t}function gn(e){let t=[];for(let n of e)for(let e of n.items)e.type===`adjustment`&&t.push({layer:e,trackOrder:n.order??0});return t}function _n({tracks:e,visibleTrackIds:t,maxOrder:n}){return e.flatMap(e=>e.items.filter(e=>e.type===`video`||e.type===`image`).map(r=>({...r,zIndex:(n-(e.order??0))*1e3,muted:e.muted??!1,trackVolumeDb:e.volume??0,trackAudioEq:e.audioEq,trackOrder:e.order??0,trackVisible:t.has(e.id)})))}function vn({tracks:e,visibleTrackIds:t}){return e.flatMap(e=>e.items.filter(e=>e.type===`audio`).map(n=>({...n,muted:e.muted,trackVolumeDb:e.volume??0,trackAudioEq:e.audioEq,trackVisible:t.has(e.id)})))}function yn({tracks:e,visibleTrackIds:t}){return e.map(e=>({...e,trackVisible:t.has(e.id),items:e.items.filter(e=>!(e.type===`video`||e.type===`audio`||e.type===`adjustment`||e.type===`controller`||e.type===`shape`&&e.isMask))}))}function bn(e){let t=/* @__PURE__ */ new Set;for(let n of e)for(let e of n.items){if(e.type!==`text`&&e.type!==`subtitle`)continue;let n=e;t.add(n.fontFamily??`Inter`);for(let r of e.type===`text`?n.textSpans??[]:[])t.add(r.fontFamily??n.fontFamily??`Inter`)}return[...t]}function xn(e){return e.flatMap(e=>e.items.filter(e=>e.type===`video`||e.type===`image`||e.type===`composition`))}function Sn(e){let t=/* @__PURE__ */ new Map;for(let n of e)t.set(n.id,n);return t}function Cn(e,t){return re(e,Sn(t))}function wn({tracksByOrderDesc:e,visibleTrackIds:t,shouldRenderItem:n,transitionsByTrackOrder:r,occlusionCutoffOrder:i}){let a=[];for(let o of e){if(!t.has(o.id))continue;let e=o.order??0;if(i!==null&&e>i)continue;for(let t of o.items??[])n(t)&&a.push({type:`item`,item:t,trackOrder:e});let s=r.get(e);if(s)for(let t of s)a.push({type:`transition`,transition:t,trackOrder:e})}return a}function Tn({tracksByOrderAsc:e,visibleTrackIds:t,disableOcclusion:n,shouldRenderItem:r,isFullyOccluding:i}){if(n)return null;for(let n of e){if(!t.has(n.id))continue;let e=n.order??0;for(let t of n.items??[])if(r(t)&&i(t,e))return e}return null}function En({tracksByOrderDesc:e,tracksByOrderAsc:t,visibleTrackIds:n,activeTransitions:r,getTransitionTrackOrder:i,disableOcclusion:a,shouldRenderItem:o,isFullyOccluding:s}){let c=dn({activeTransitions:r,getTrackOrder:i}),l=Tn({tracksByOrderAsc:t,visibleTrackIds:n,disableOcclusion:a,shouldRenderItem:o,isFullyOccluding:s});return{transitionsByTrackOrder:c,occlusionCutoffOrder:l,renderTasks:wn({tracksByOrderDesc:e,visibleTrackIds:n,shouldRenderItem:o,transitionsByTrackOrder:c,occlusionCutoffOrder:l})}}function Dn({tracksByOrderAsc:e,visibleTrackIds:t,minFrame:n,maxFrame:r,maxItems:i}){if(i<=0)return[];let a=[];for(let o of e)if(t.has(o.id)){for(let e of o.items??[])if(e.type===`video`&&!(e.from>r||e.from+e.durationInFrames<=n)&&(a.push(e),a.length>=i))return a}return a}function On(e,t,n){return[e.position[0]*t,e.position[1]*n]}function kn(e,t,n,r){return[(e.position[0]+e[t][0])*n,(e.position[1]+e[t][1])*r]}function An(e,t){return[(e[0]+t[0])/2,(e[1]+t[1])/2]}function jn(e,t,n){let r=n[0]-t[0],i=n[1]-t[1],a=Math.hypot(r,i);return a<=2**-52?Math.hypot(e[0]-t[0],e[1]-t[1]):Math.abs(i*e[0]-r*e[1]+n[0]*t[1]-n[1]*t[0])/a}function Mn(e,t,n,r,i,a,o=0){if(Math.max(jn(t,e,r),jn(n,e,r))<=i||o>=12){a.push(r);return}let s=An(e,t),c=An(t,n),l=An(n,r),u=An(s,c),d=An(c,l),f=An(u,d);Mn(e,s,u,f,i,a,o+1),Mn(f,d,l,r,i,a,o+1)}function Nn(e,t,n,r){if(e.length===0)return``;let i=On(e[0],t,n),a=[`M ${i[0]} ${i[1]}`],o=r?e.length:e.length-1;for(let r=0;r<o;r++){let i=e[r],o=e[(r+1)%e.length],s=On(o,t,n);if(i.outHandle[0]===0&&i.outHandle[1]===0&&o.inHandle[0]===0&&o.inHandle[1]===0){a.push(`L ${s[0]} ${s[1]}`);continue}let c=kn(i,`outHandle`,t,n),l=kn(o,`inHandle`,t,n);a.push(`C ${c[0]} ${c[1]} ${l[0]} ${l[1]} ${s[0]} ${s[1]}`)}return r&&a.push(`Z`),a.join(` `)}function Pn(e,t,n,r,i=.35){if(e.length<2)return{points:[],totalLength:0,closed:r};let a=[On(e[0],t,n)],o=r?e.length:e.length-1;for(let r=0;r<o;r++){let o=e[r],s=e[(r+1)%e.length],c=On(o,t,n),l=On(s,t,n);o.outHandle[0]===0&&o.outHandle[1]===0&&s.inHandle[0]===0&&s.inHandle[1]===0?a.push(l):Mn(c,kn(o,`outHandle`,t,n),kn(s,`inHandle`,t,n),l,Math.max(.01,i),a)}let s=[0];for(let e=1;e<a.length;e++){let t=a[e-1],n=a[e];s.push(s[e-1]+Math.hypot(n[0]-t[0],n[1]-t[1]))}let c=s[s.length-1]??0;return{points:a.map(([e,t],n)=>({x:e,y:t,progress:c>0?s[n]/c:0})),totalLength:c,closed:r}}function Fn(e){let{width:t,height:n,cornerRadius:r=0}=e,i=Math.min(r,t/2,n/2),a;return a=i>0?`M ${i} 0 L ${t-i} 0 A ${i} ${i} 0 0 1 ${t} ${i} L ${t} ${n-i} A ${i} ${i} 0 0 1 ${t-i} ${n} L ${i} ${n} A ${i} ${i} 0 0 1 0 ${n-i} L 0 ${i} A ${i} ${i} 0 0 1 ${i} 0 Z`:`M 0 0 L ${t} 0 L ${t} ${n} L 0 ${n} Z`,{path:a,width:t,height:n}}function In(e){let{radius:t}=e,n=t*2;return{path:`M ${t} 0 A ${t} ${t} 0 1 1 ${t} ${n} A ${t} ${t} 0 1 1 ${t} 0 Z`,width:n,height:n}}function Ln(e){let{rx:t,ry:n}=e,r=t*2,i=n*2;return{path:`M ${t} 0 A ${t} ${n} 0 1 1 ${t} ${i} A ${t} ${n} 0 1 1 ${t} 0 Z`,width:r,height:i}}function Rn(e){let{length:t,direction:n=`up`,cornerRadius:r=0}=e,i=t*Math.sqrt(3)/2,a,o,s;switch(n){case`up`:o=t,s=i,a=[[t/2,0],[t,i],[0,i]];break;case`down`:o=t,s=i,a=[[0,0],[t,0],[t/2,i]];break;case`left`:o=i,s=t,a=[[i,0],[i,t],[0,t/2]];break;case`right`:o=i,s=t,a=[[0,0],[i,t/2],[0,t]]}return{path:r>0?Un(a,r):Hn(a),width:o,height:s}}function zn(e){let{points:t,outerRadius:n,innerRadius:r,cornerRadius:i=0}=e,a=n*2,o=[],s=Math.PI/t;for(let e=0;e<t*2;e++){let t=e%2==0?n:r,i=e*s-Math.PI/2,a=n+t*Math.cos(i),c=n+t*Math.sin(i);o.push([a,c])}return{path:i>0?Un(o,i):Hn(o),width:a,height:a}}function Bn(e){let{points:t,radius:n,cornerRadius:r=0}=e,i=n*2,a=[],o=Math.PI*2/t;for(let e=0;e<t;e++){let t=e*o-Math.PI/2,r=n+n*Math.cos(t),i=n+n*Math.sin(t);a.push([r,i])}return{path:r>0?Un(a,r):Hn(a),width:i,height:i}}function Vn(e){let{height:t}=e,n=t*1.1,r=23/110*n,i=69/100*t,a=60/100*t,o=13/100*t,s=29/110*n,c=15/110*n,l=5/110*n,u=7/100*t,d=17/100*t;return{path:[`M ${n/2} ${t}`,`C ${n/2-r} ${i}, 0 ${a}, 0 ${t/4}`,`C 0 ${o}, ${n/4-s/2} 0, ${n/4} 0`,`C ${n/4+s/2} 0, ${n/2-l} ${u}, ${n/2} ${d}`,`C ${n/2+l} ${u}, ${n/2+c} 0, ${n/4*3} 0`,`C ${n/4*3+s/2} 0, ${n} ${o}, ${n} ${t/4}`,`C ${n} ${a}, ${n/2+r} ${i}, ${n/2} ${t}`,`Z`].join(` `),width:n,height:t}}function Hn(e){if(e.length<3)return``;let[t,...n]=e,r=[`M ${t[0]} ${t[1]}`];for(let[e,t]of n)r.push(`L ${e} ${t}`);return r.push(`Z`),r.join(` `)}function Un(e,t){if(e.length<3)return``;let n=[],r=e.length;for(let i=0;i<r;i++){let a=e[i],o=e[(i-1+r)%r],s=e[(i+1)%r],c=o[0]-a[0],l=o[1]-a[1],u=Math.sqrt(c*c+l*l),d=s[0]-a[0],f=s[1]-a[1],p=Math.sqrt(d*d+f*f),m=Math.min(u,p)/2,h=Math.min(t,m),g=a[0]+c/u*h,_=a[1]+l/u*h,v=a[0]+d/p*h,y=a[1]+f/p*h;i===0?n.push(`M ${g} ${_}`):n.push(`L ${g} ${_}`),n.push(`Q ${a[0]} ${a[1]} ${v} ${y}`)}return n.push(`Z`),n.join(` `)}function Wn(e,t,n=t){let r=e.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi)||[],i=[];for(let e of r){let r=e[0],a=r.toUpperCase(),o=e.slice(1).trim().split(/[\s,]+/).map(Number).filter(e=>!isNaN(e));switch(a){case`M`:case`L`:case`T`:{let e=[];for(let r=0;r<o.length;r+=2)e.push(o[r]*t,o[r+1]*n);i.push(`${r} ${e.join(` `)}`);break}case`H`:i.push(`${r} ${o.map(e=>e*t).join(` `)}`);break;case`V`:i.push(`${r} ${o.map(e=>e*n).join(` `)}`);break;case`C`:{let e=[];for(let r=0;r<o.length;r+=6)e.push(o[r]*t,o[r+1]*n,o[r+2]*t,o[r+3]*n,o[r+4]*t,o[r+5]*n);i.push(`${r} ${e.join(` `)}`);break}case`S`:{let e=[];for(let r=0;r<o.length;r+=4)e.push(o[r]*t,o[r+1]*n,o[r+2]*t,o[r+3]*n);i.push(`${r} ${e.join(` `)}`);break}case`Q`:{let e=[];for(let r=0;r<o.length;r+=4)e.push(o[r]*t,o[r+1]*n,o[r+2]*t,o[r+3]*n);i.push(`${r} ${e.join(` `)}`);break}case`A`:{let e=[];for(let r=0;r<o.length;r+=7)e.push(o[r]*t,o[r+1]*n,o[r+2],o[r+3],o[r+4],o[r+5]*t,o[r+6]*n);i.push(`${r} ${e.join(` `)}`);break}case`Z`:i.push(r);break;default:i.push(e)}}return i.join(` `)}function U(e,t,n){let r=e.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi)||[],i=[];for(let e of r){let r=e[0],a=r===r.toLowerCase(),o=r.toUpperCase(),s=e.slice(1).trim().split(/[\s,]+/).map(Number).filter(e=>!isNaN(e));if(a&&o!==`M`){i.push(e);continue}switch(o){case`M`:case`L`:case`T`:{let e=[];for(let r=0;r<s.length;r+=2)e.push(s[r]+t,s[r+1]+n);i.push(`${r} ${e.join(` `)}`);break}case`H`:i.push(`${r} ${s.map(e=>e+t).join(` `)}`);break;case`V`:i.push(`${r} ${s.map(e=>e+n).join(` `)}`);break;case`C`:{let e=[];for(let r=0;r<s.length;r+=6)e.push(s[r]+t,s[r+1]+n,s[r+2]+t,s[r+3]+n,s[r+4]+t,s[r+5]+n);i.push(`${r} ${e.join(` `)}`);break}case`S`:{let e=[];for(let r=0;r<s.length;r+=4)e.push(s[r]+t,s[r+1]+n,s[r+2]+t,s[r+3]+n);i.push(`${r} ${e.join(` `)}`);break}case`Q`:{let e=[];for(let r=0;r<s.length;r+=4)e.push(s[r]+t,s[r+1]+n,s[r+2]+t,s[r+3]+n);i.push(`${r} ${e.join(` `)}`);break}case`A`:{let e=[];for(let r=0;r<s.length;r+=7)e.push(s[r],s[r+1],s[r+2],s[r+3],s[r+4],s[r+5]+t,s[r+6]+n);i.push(`${r} ${e.join(` `)}`);break}case`Z`:i.push(r);break;default:i.push(e)}}return i.join(` `)}function Gn(e,t,n){let{canvasWidth:r,canvasHeight:i}=n,a=n.aspectLocked??e.transform?.aspectRatioLocked??!0,o=r/2,s=i/2,c=t.width,l=t.height,u=e.cornerRadius??0,d=o+t.x-c/2,f=s+t.y-l/2,p=Math.min(c,l),m;switch(e.shapeType){case`rectangle`:m=U(Fn({width:c,height:l,cornerRadius:u}).path,d,f);break;case`circle`:{let e=In({radius:p/2}),t=e.width,n=e.height;if(a){let r=(c-t)/2,i=(l-n)/2;m=U(e.path,d+r,f+i)}else{let r=c/t,i=l/n;m=U(Wn(e.path,r,i),d,f)}break}case`ellipse`:m=U(Ln({rx:c/2,ry:l/2}).path,d,f);break;case`triangle`:{let t=Rn({length:p,direction:e.direction??`up`,cornerRadius:u}),n=t.width,r=t.height;if(a){let e=(c-n)/2,i=(l-r)/2;m=U(t.path,d+e,f+i)}else{let e=c/n,i=l/r;m=U(Wn(t.path,e,i),d,f)}break}case`star`:{let t=p/2,n=t*(e.innerRadius??.5),r=zn({points:e.points??5,outerRadius:t,innerRadius:n,cornerRadius:u}),i=r.width,o=r.height;if(a){let e=(c-i)/2,t=(l-o)/2;m=U(r.path,d+e,f+t)}else{let e=c/i,t=l/o;m=U(Wn(r.path,e,t),d,f)}break}case`polygon`:{let t=p/2,n=Bn({points:e.points??6,radius:t,cornerRadius:u}),r=n.width,i=n.height;if(a){let e=(c-r)/2,t=(l-i)/2;m=U(n.path,d+e,f+t)}else{let e=c/r,t=l/i;m=U(Wn(n.path,e,t),d,f)}break}case`heart`:{let e=Vn({height:p/1.1}),t=e.width,n=e.height;if(a){let r=(c-t)/2,i=(l-n)/2;m=U(e.path,d+r,f+i)}else{let r=c/t,i=l/n;m=U(Wn(e.path,r,i),d,f)}break}case`path`:m=Nn(e.pathVertices??[],c,l,e.pathClosed??!0),m=U(m,d,f);break;default:m=U(Fn({width:c,height:l,cornerRadius:0}).path,d,f)}return m}function Kn(e,t,n,r){if(!t||t===0)return e;let i=t*Math.PI/180,a=Math.cos(i),o=Math.sin(i),s=(e,t)=>{let i=e-n,s=t-r;return[n+i*a-s*o,r+i*o+s*a]},c=[],l=e.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi)||[];for(let e of l){let i=e[0].toUpperCase(),a=e.slice(1).trim().split(/[\s,]+/).map(Number).filter(e=>!isNaN(e));switch(i){case`M`:case`L`:for(let e=0;e<a.length;e+=2){let[t,n]=s(a[e],a[e+1]);c.push(`${e===0?i:`L`} ${t} ${n}`)}break;case`H`:{let[e,t]=s(a[0],r);c.push(`L ${e} ${t}`);break}case`V`:{let[e,t]=s(n,a[0]);c.push(`L ${e} ${t}`);break}case`C`:for(let e=0;e<a.length;e+=6){let[t,n]=s(a[e],a[e+1]),[r,i]=s(a[e+2],a[e+3]),[o,l]=s(a[e+4],a[e+5]);c.push(`C ${t} ${n} ${r} ${i} ${o} ${l}`)}break;case`Q`:for(let e=0;e<a.length;e+=4){let[t,n]=s(a[e],a[e+1]),[r,i]=s(a[e+2],a[e+3]);c.push(`Q ${t} ${n} ${r} ${i}`)}break;case`A`:for(let e=0;e<a.length;e+=7){let[n,r]=s(a[e+5],a[e+6]),i=(a[e+2]+t)%360;c.push(`A ${a[e]} ${a[e+1]} ${i} ${a[e+3]} ${a[e+4]} ${n} ${r}`)}break;case`Z`:c.push(`Z`);break;default:c.push(e)}}return c.join(` `)}function qn(e,t){let n=e*t,r=Math.round(n);return Math.abs(n-r)<1e-6?(r+1e-4)/t:e}function Jn(e,t,n,r,i,a=0,o=!1,s){let c=(n-a)*r*t/i;return qn(o?Math.max(0,(s??e)-c-1)/t:e/t+c/t,t)}function Yn(e){return e.type===`video`||e.type===`audio`||e.type===`composition`}function Xn(e){return e.sourceStart??e.trimStart??e.offset??0}function Zn(e){return{from:e.from,durationInFrames:e.durationInFrames,...Yn(e)?{sourceStart:Xn(e)}:{}}}function Qn(e,t){return Yn(e)?t?.sourceStart??Xn(e):0}function $n(e,t,n,r,i=Zn(e)){return Qn(e,i)+_(t-i.from,e.speed??1,n,e.sourceFps??r)}function er(e,t){if(!t)return e;let n=e.from===t.from&&e.durationInFrames===t.durationInFrames,r=Qn(e,t),i=(Yn(e)?Xn(e):void 0)===r;return n&&i?e:{...e,from:t.from,durationInFrames:t.durationInFrames,...Yn(e)?{sourceStart:r}:{}}}function tr(e,t){let n=Math.max(0,e.from-t.transitionStart),r=e.from+e.durationInFrames,i=Math.max(0,t.transitionEnd-r);return{from:e.from-n,durationInFrames:e.durationInFrames+n+i}}function nr(e,t,n){if(!Yn(e))return;let r=Math.max(0,e.from-t.from);if(r<=0)return Xn(e);let i=Xn(e),a=e.speed??1,o=e.sourceFps??n,s=_(r,a,n,o);return Math.max(0,i-s)}function rr(e,t,n,r){let i=tr(e,t),a=nr(e,i,n);return{from:i.from,durationInFrames:i.durationInFrames,...a===void 0?{}:{sourceStart:a},...r?{sourceTimeRamp:r}:{}}}function ir(e,t,n){if(e.type!==`video`||t.type!==`video`||!e.mediaId||e.mediaId!==t.mediaId||e.isReversed||t.isReversed)return!1;let r=e.sourceStart??e.trimStart??e.offset??0,i=t.sourceStart??t.trimStart??t.offset??0,a=e.speed??1,o=e.sourceFps??n,s=r+e.durationInFrames*a*o/n;return Math.abs(s-i)<.5}function ar(e,t,n,r){if(!ir(e,t,r))return null;let i={slope:.5,rampStart:n.transitionStart,rampEnd:n.transitionEnd};return{left:{anchor:`start`,...i},right:{anchor:`end`,...i}}}function or(e,t){if(t<e.rampStart||t>e.rampEnd)return 0;let n=e.anchor===`start`?t-e.rampStart:t-e.rampEnd;return e.slope*n}function sr(e,t){return t>=e.rampStart&&t<=e.rampEnd}function cr(e,t,n,r,i=0){let a=n-t.from,o=a/r,s=Qn(e,t),c=e.sourceFps??r,l=e.speed??1,u=e.durationInFrames*l*c/r,d=(e.sourceEnd??s+u)-i,f=s+i,p=t.sourceTimeRamp&&!e.isReversed?or(t.sourceTimeRamp,n):0,m=e.isReversed?(d-a*l*(c/r)-1)/c:f/c+o*l+p/c,h=Math.max(0,m),g=e.sourceDuration===void 0||!Number.isFinite(e.sourceDuration)||e.sourceDuration<=0?h:Math.min(h,(Math.max(0,e.sourceDuration-1)+1e-4)/c),_=Math.round(g*c);return Math.abs(g*c-_)<1e-6?(_+1e-4)/c:g}function lr(e){let t=Math.max(1,e.logicalWidth??e.width),n=Math.max(1,e.logicalHeight??e.height),r=e.width/t,i=e.height/n;return{x:r,y:i,uniform:Math.min(r,i)}}function ur(e){return e.logicalWidth===void 0&&e.logicalHeight===void 0?e:{...e,width:e.logicalWidth??e.width,height:e.logicalHeight??e.height}}function dr(e,t){let n=lr(t);return n.x===1&&n.y===1?e:{...e,x:e.x*n.x,y:e.y*n.y,width:e.width*n.x,height:e.height*n.y,anchorX:e.anchorX*n.x,anchorY:e.anchorY*n.y,cornerRadius:e.cornerRadius*n.uniform}}function fr(e,t){let n=lr(t);return n.x===1&&n.y===1?e:{...e,x:W(e.x,n.x),y:W(e.y,n.y),width:W(e.width,n.x),height:W(e.height,n.y),anchorX:W(e.anchorX,n.x),anchorY:W(e.anchorY,n.y),cornerRadius:W(e.cornerRadius,n.uniform)}}function W(e,t){return e===void 0?void 0:e*t}function pr(e,t){let n=lr(t);return n.x===1&&n.y===1?e:{...e,fontSize:W(e.fontSize,n.uniform),letterSpacing:W(e.letterSpacing,n.uniform),backgroundRadius:W(e.backgroundRadius,n.uniform),textPadding:W(e.textPadding,n.uniform),...`textSpans`in e?{textSpans:e.textSpans?.map(e=>({...e,fontSize:W(e.fontSize,n.uniform),letterSpacing:W(e.letterSpacing,n.uniform)}))}:{},textShadow:e.textShadow?{...e.textShadow,offsetX:e.textShadow.offsetX*n.x,offsetY:e.textShadow.offsetY*n.y,blur:e.textShadow.blur*n.uniform}:e.textShadow,stroke:e.stroke?{...e.stroke,width:e.stroke.width*n.uniform}:e.stroke}}function mr(e,t){return pr(e,t)}function hr(e,t){return pr(e,t)}function gr(e,t){let n=lr(t);return n.uniform===1?e:{...e,strokeWidth:W(e.strokeWidth,n.uniform),cornerRadius:W(e.cornerRadius,n.uniform),maskFeather:W(e.maskFeather,n.uniform)}}function _r(e){return e<=0?0:e>=1?1:e}function vr(e,t,n){return e+(t-e)*_r(n)}function yr(e){return e.type===`video`||e.type===`composition`}function br(e,t,n){if(!yr(e)||e.durationInFrames<=0)return 1;if(t<e.from||t>=e.from+e.durationInFrames)return 0;let r=Math.min((e.fadeIn??0)*n,e.durationInFrames),i=Math.min((e.fadeOut??0)*n,e.durationInFrames),a=r>0,o=i>0;if(!a&&!o)return 1;let s=t-e.from,c=e.durationInFrames-i;if(a&&o){if(r>=c){let t=e.durationInFrames/2,n=Math.min(1,t/Math.max(r,1));return s<=t?vr(0,n,s/Math.max(t,1)):vr(n,0,(s-t)/Math.max(e.durationInFrames-t,1))}return s<r?vr(0,1,s/Math.max(r,1)):s<c?1:vr(1,0,(s-c)/Math.max(e.durationInFrames-c,1))}return a?s<r?vr(0,1,s/Math.max(r,1)):1:s<c?1:vr(1,0,(s-c)/Math.max(e.durationInFrames-c,1))}function xr(e){return e!==void 0}function Sr(...e){return Math.max(1,e.find(xr)??1)}function Cr(e,t){return e.type===`video`||e.type===`image`?{width:Sr(e.sourceWidth,e.transform?.width,t.width),height:Sr(e.sourceHeight,e.transform?.height,t.height)}:e.type===`composition`?{width:Math.max(1,e.compositionWidth),height:Math.max(1,e.compositionHeight)}:null}function wr(e,t,n,r,i){let a=er(e,i),o=ur(r),s=dr(sn(a,{canvas:{width:o.width,height:o.height,fps:r.fps},frame:n,keyframes:t,getItem:r.getExpressionItem,getKeyframes:r.getExpressionKeyframes,getPreviewTransform:r.getPreviewTransform}),r),c=br(a,n,r.fps);return c>=1?s:{...s,opacity:s.opacity*c}}function Tr(e,t,n,r,i){let a=Cr(e,ur(r));if(!a)return e.crop;let o=er(e,i);return p(o.crop,t,n-o.from,a)}function Er(e){let t=/* @__PURE__ */ new Map;if(!e)return t;for(let n of e)t.set(n.itemId,n);return t}const Dr=`
${I}

const PI: f32 = 3.14159265359;
const TAU: f32 = 6.28318530718;

fn hash(p: vec2f) -> f32 {
  let p2 = vec2f(dot(p, vec2f(127.1, 311.7)), dot(p, vec2f(269.5, 183.3)));
  return fract(sin(dot(p2, vec2f(12.9898, 78.233))) * 43758.5453);
}

fn noise2d(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2f(0.0, 0.0)), hash(i + vec2f(1.0, 0.0)), u.x),
    mix(hash(i + vec2f(0.0, 1.0)), hash(i + vec2f(1.0, 1.0)), u.x),
    u.y
  );
}

fn fbm(p: vec2f) -> f32 {
  var value = 0.0;
  var amplitude = 0.5;
  var pos = p;
  for (var i = 0; i < 5; i++) {
    value += amplitude * noise2d(pos);
    pos *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}
`,Or=`
fn scaleUv(uv: vec2f, scale: f32) -> vec2f {
  let safeScale = max(scale, 0.001);
  return ((uv - vec2f(0.5, 0.5)) / safeScale) + vec2f(0.5, 0.5);
}
`,kr={id:`dissolve`,name:`Cross Dissolve`,category:`dissolve`,hasDirection:!1,entryPoint:`dissolveFragment`,uniformSize:16,shader:`
struct DissolveParams {
  progress: f32,
  width: f32,
  height: f32,
  _pad: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: DissolveParams;

@fragment
fn dissolveFragment(input: VertexOutput) -> @location(0) vec4f {
  let left = textureSample(leftTex, texSampler, input.uv);
  let right = textureSample(rightTex, texSampler, input.uv);
  let t = 0.5 - 0.5 * cos(clamp(params.progress, 0.0, 1.0) * PI);
  return mix(left, right, t);
}`,packUniforms:(e,t,n)=>new Float32Array([e,t,n,0])},Ar=`
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
`,jr=`
fn sampleSoft(tex: texture_2d<f32>, uv: vec2f, radius: vec2f) -> vec4f {
  let center = textureSample(tex, texSampler, uv);
  let a = textureSample(tex, texSampler, clamp(uv + vec2f(radius.x, 0.0), vec2f(0.0), vec2f(1.0)));
  let b = textureSample(tex, texSampler, clamp(uv - vec2f(radius.x, 0.0), vec2f(0.0), vec2f(1.0)));
  let c = textureSample(tex, texSampler, clamp(uv + vec2f(0.0, radius.y), vec2f(0.0), vec2f(1.0)));
  let d = textureSample(tex, texSampler, clamp(uv - vec2f(0.0, radius.y), vec2f(0.0), vec2f(1.0)));
  return center * 0.36 + (a + b + c + d) * 0.16;
}
`,Mr={id:`additiveDissolve`,name:`Additive Dissolve`,category:`dissolve`,hasDirection:!1,entryPoint:`additiveDissolveFragment`,uniformSize:16,shader:`
struct AdditiveDissolveParams {
  progress: f32,
  width: f32,
  height: f32,
  _pad: f32,
};

${Ar}
@group(0) @binding(3) var<uniform> params: AdditiveDissolveParams;

@fragment
fn additiveDissolveFragment(input: VertexOutput) -> @location(0) vec4f {
  let p = clamp(params.progress, 0.0, 1.0);
  let left = textureSample(leftTex, texSampler, input.uv);
  let right = textureSample(rightTex, texSampler, input.uv);
  let base = left.rgb * (1.0 - p) + right.rgb * p;
  let flash = (left.rgb + right.rgb) * sin(p * PI) * 0.22;
  return vec4f(clamp(base + flash, vec3f(0.0), vec3f(1.0)), mix(left.a, right.a, p));
}`,packUniforms:(e,t,n)=>new Float32Array([e,t,n,0])},Nr={id:`blurDissolve`,name:`Blur Dissolve`,category:`dissolve`,hasDirection:!1,entryPoint:`blurDissolveFragment`,uniformSize:16,shader:`
struct BlurDissolveParams {
  progress: f32,
  width: f32,
  height: f32,
  strength: f32,
};

${Ar}
@group(0) @binding(3) var<uniform> params: BlurDissolveParams;
${jr}

@fragment
fn blurDissolveFragment(input: VertexOutput) -> @location(0) vec4f {
  let p = clamp(params.progress, 0.0, 1.0);
  let envelope = sin(p * PI);
  let radius = vec2f(1.0 / params.width, 1.0 / params.height) * params.strength * envelope;
  let left = sampleSoft(leftTex, input.uv, radius);
  let right = sampleSoft(rightTex, input.uv, radius);
  let t = 0.5 - 0.5 * cos(p * PI);
  return mix(left, right, t);
}`,packUniforms:(e,t,n,r,i)=>{let a=i?.strength??9;return new Float32Array([e,t,n,a])}},Pr={id:`dipToColorDissolve`,name:`Dip To Color Dissolve`,category:`dissolve`,hasDirection:!1,entryPoint:`dipToColorDissolveFragment`,uniformSize:32,shader:`
struct DipToColorDissolveParams {
  progress: f32,
  width: f32,
  height: f32,
  colorR: f32,
  colorG: f32,
  colorB: f32,
  _pad1: f32,
  _pad2: f32,
};

${Ar}
@group(0) @binding(3) var<uniform> params: DipToColorDissolveParams;

@fragment
fn dipToColorDissolveFragment(input: VertexOutput) -> @location(0) vec4f {
  let p = clamp(params.progress, 0.0, 1.0);
  let left = textureSample(leftTex, texSampler, input.uv);
  let right = textureSample(rightTex, texSampler, input.uv);
  let color = vec4f(params.colorR, params.colorG, params.colorB, 1.0);
  let firstHalf = mix(left, color, smoothstep(0.0, 0.5, p));
  let secondHalf = mix(color, right, smoothstep(0.5, 1.0, p));
  return select(secondHalf, firstHalf, p < 0.5);
}`,packUniforms:(e,t,n,r,i)=>{let a=i?.color,o=Array.isArray(a)?a:[0,0,0];return new Float32Array([e,t,n,o[0]??0,o[1]??0,o[2]??0,0,0])}},Fr={id:`nonAdditiveDissolve`,name:`Non-Additive Dissolve`,category:`dissolve`,hasDirection:!1,entryPoint:`nonAdditiveDissolveFragment`,uniformSize:16,shader:`
struct NonAdditiveDissolveParams {
  progress: f32,
  width: f32,
  height: f32,
  _pad: f32,
};

${Ar}
@group(0) @binding(3) var<uniform> params: NonAdditiveDissolveParams;

@fragment
fn nonAdditiveDissolveFragment(input: VertexOutput) -> @location(0) vec4f {
  let p = clamp(params.progress, 0.0, 1.0);
  let left = textureSample(leftTex, texSampler, input.uv);
  let right = textureSample(rightTex, texSampler, input.uv);
  let neutral = mix(left.rgb, right.rgb, p);
  let luma = dot(neutral, vec3f(0.2126, 0.7152, 0.0722));
  let guarded = mix(neutral, min(neutral, vec3f(luma + 0.18)), sin(p * PI) * 0.18);
  return vec4f(clamp(guarded, vec3f(0.0), vec3f(1.0)), mix(left.a, right.a, p));
}`,packUniforms:(e,t,n)=>new Float32Array([e,t,n,0])},Ir={id:`smoothCut`,name:`Smooth Cut`,category:`dissolve`,hasDirection:!1,entryPoint:`smoothCutFragment`,uniformSize:16,shader:`
struct SmoothCutParams {
  progress: f32,
  width: f32,
  height: f32,
  strength: f32,
};

${Ar}
@group(0) @binding(3) var<uniform> params: SmoothCutParams;
${jr}

fn smoothCutWarp(uv: vec2f, p: f32, envelope: f32, strength: f32) -> vec2f {
  let low = fbm(uv * vec2f(2.4, 1.8) + vec2f(p * 1.15, -p * 0.8));
  let mid = fbm(uv * vec2f(6.2, 4.8) + vec2f(-p * 1.65, p * 1.25));
  let horizontalBands =
    sin((uv.x * 4.6 + low * 1.8 + p * 1.25) * TAU) * 0.62 +
    sin((uv.x * 8.2 + uv.y * 0.22 + mid * 1.1 - p * 0.9) * TAU) * 0.28 +
    (low - 0.5) * 0.48 +
    (mid - 0.5) * 0.22;
  let horizontalWarp = horizontalBands;
  let verticalWarp = (mid - 0.5) * 0.14;
  let edgeFade = smoothstep(0.03, 0.18, uv.x) * smoothstep(0.97, 0.82, uv.x)
    * smoothstep(0.03, 0.18, uv.y) * smoothstep(0.97, 0.82, uv.y);
  return vec2f(horizontalWarp, verticalWarp) * envelope * strength * 0.052 * edgeFade;
}

@fragment
fn smoothCutFragment(input: VertexOutput) -> @location(0) vec4f {
  let p = clamp(params.progress, 0.0, 1.0);
  let strength = clamp(params.strength, 0.0, 2.0);
  let envelope = sin(p * PI);
  let warp = smoothCutWarp(input.uv, p, envelope, strength);
  let drift = vec2f((p - 0.5) * 0.018 * envelope * strength, 0.0);
  let radius = vec2f(1.0 / params.width, 1.0 / params.height) * envelope * strength * 2.4;
  let leftWarped = sampleSoft(leftTex, clamp(input.uv + warp - drift, vec2f(0.0), vec2f(1.0)), radius);
  let rightWarped = sampleSoft(rightTex, clamp(input.uv - warp + drift, vec2f(0.0), vec2f(1.0)), radius);
  let leftClean = textureSample(leftTex, texSampler, input.uv);
  let rightClean = textureSample(rightTex, texSampler, input.uv);
  let warpMix = smoothstep(0.12, 0.85, envelope);
  let left = mix(leftClean, leftWarped, warpMix);
  let right = mix(rightClean, rightWarped, warpMix);
  let blendWidth = mix(0.18, 0.36, strength);
  let t = smoothstep(0.5 - blendWidth, 0.5 + blendWidth, p);
  return mix(left, right, t);
}`,packUniforms:(e,t,n,r,i)=>{let a=i?.strength??.9;return new Float32Array([e,t,n,a])}},Lr={id:`sparkles`,name:`Sparkles`,category:`custom`,hasDirection:!1,entryPoint:`sparklesFragment`,uniformSize:32,shader:`
struct SparklesParams {
  progress: f32,
  width: f32,
  height: f32,
  sparkleScale: f32,
  intensity: f32,
  density: f32,
  glow: f32,
  _pad: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: SparklesParams;

fn rotateVec2(v: vec2f, angle: f32) -> vec2f {
  let c = cos(angle);
  let s = sin(angle);
  return vec2f(
    (v.x * c) - (v.y * s),
    (v.x * s) + (v.y * c)
  );
}

fn sparkleShape(local: vec2f, size: f32) -> f32 {
  let absLocal = abs(local);
  let core = smoothstep(size * 0.34, 0.0, length(local));
  let horizontal = smoothstep(size * 0.14, 0.0, absLocal.y)
    * smoothstep(size, 0.0, absLocal.x);
  let vertical = smoothstep(size * 0.14, 0.0, absLocal.x)
    * smoothstep(size, 0.0, absLocal.y);
  let diagonalA = smoothstep(size * 0.22, 0.0, abs(local.x - local.y))
    * smoothstep(size * 0.9, 0.0, length(local));
  let diagonalB = smoothstep(size * 0.22, 0.0, abs(local.x + local.y))
    * smoothstep(size * 0.9, 0.0, length(local));
  return max(core, max(horizontal, max(vertical, max(diagonalA, diagonalB) * 0.7)));
}

fn sparkleLayer(
  scaledUv: vec2f,
  progress: f32,
  density: f32,
  sizeBase: f32,
  sizeVariance: f32,
  motionScale: f32,
  threshold: f32,
  phase: f32,
) -> vec4f {
  let cellUv = scaledUv * density;
  let cell = floor(cellUv);
  let local = fract(cellUv) - vec2f(0.5, 0.5);
  let seed = hash(cell + vec2f(phase * 1.37, phase * 2.11));
  let centerSeed = vec2f(
    hash(cell + vec2f(phase + 1.7, phase + 6.2)),
    hash(cell + vec2f(phase + 8.4, phase + 3.1))
  ) - vec2f(0.5, 0.5);
  let sizeSeed = hash(cell + vec2f(phase + 2.4, phase + 9.7));
  let orbitSeed = hash(cell + vec2f(phase + 4.6, phase + 11.2));
  let ignitePoint = clamp(
    0.04
      + (seed * 0.72)
      + (noise2d((cell * 0.17) + vec2f(phase * 0.31, phase * 0.67)) * 0.16),
    0.04,
    0.94
  );
  let igniteDuration = 0.14 + (sizeSeed * 0.18);
  let igniteProgress = clamp((progress - ignitePoint) / igniteDuration, 0.0, 1.0);
  let igniteIn = smoothstep(0.0, 0.16, igniteProgress);
  let igniteOut = 1.0 - smoothstep(0.3, 0.95, igniteProgress);
  let pulse = igniteIn * igniteOut;
  let afterglow = smoothstep(0.06, 0.72, igniteProgress);

  let directionAngle = seed * TAU;
  let direction = vec2f(cos(directionAngle), sin(directionAngle));
  let motionEnvelope = pulse * (0.6 + (0.4 * sin(progress * PI)));
  let drift = direction
    * motionScale
    * (0.42 + (sizeSeed * 1.45))
    * motionEnvelope;
  let orbit = rotateVec2(
    vec2f(0.0, 1.0),
    directionAngle + (igniteProgress * (1.5 + (orbitSeed * 2.6)) * PI)
  ) * motionScale * 0.62 * (0.28 + orbitSeed) * motionEnvelope;

  let center = (centerSeed * 0.72) + drift + orbit;
  let rotation = (seed * TAU) + (igniteProgress * (1.2 + (sizeSeed * 3.1)) * PI);
  let size = sizeBase + (sizeSeed * sizeVariance);
  let twinkle = 0.35 + (0.65 * ((sin((igniteProgress * (2.8 + (sizeSeed * 4.5)) + seed) * TAU) + 1.0) * 0.5));
  let activation = smoothstep(threshold, 1.0, seed);

  let starLocal = rotateVec2(local - center, rotation);
  let main = sparkleShape(starLocal, size) * activation * twinkle * pulse;

  let trailCenter = center - (
    direction
    * motionScale
    * (0.6 + sizeSeed)
    * (0.25 + (pulse * 0.95))
  );
  let trailLocal = rotateVec2(local - trailCenter, rotation - 0.4);
  let trailShape = vec2f(trailLocal.x * 1.7, trailLocal.y * 0.58);
  let trail = sparkleShape(trailShape, size * 0.72)
    * activation
    * twinkle
    * pulse
    * (0.42 + (sizeSeed * 0.28));

  let dustNoise = noise2d((cell * 0.85) + vec2f((igniteProgress * 4.2) + phase, phase * 0.37));
  let dust = smoothstep(0.62, 1.0, dustNoise)
    * afterglow
    * activation
    * (0.16 + (sizeSeed * 0.34));
  let reveal = clamp(
    (main * 0.72)
      + (trail * 0.34)
      + (afterglow * activation * 0.24)
      + (dust * 0.12),
    0.0,
    1.0
  );
  let glow = max(main, trail * 0.88) * (0.65 + (sizeSeed * 0.75)) + (dust * 0.3);

  return vec4f(main, reveal, glow, seed);
}

@fragment
fn sparklesFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let p = params.progress;
  let aspect = params.width / max(params.height, 1.0);
  let scaledUv = vec2f(uv.x * aspect, uv.y);

  let left = textureSample(leftTex, texSampler, uv);
  let right = textureSample(rightTex, texSampler, uv);

  let coarseLayer = sparkleLayer(
    scaledUv,
    p,
    5.5 + (params.density * 5.0),
    0.15 * params.sparkleScale,
    0.28 * params.sparkleScale,
    0.18,
    0.58,
    3.7
  );
  let microLayer = sparkleLayer(
    scaledUv,
    p,
    10.0 + (params.density * 9.0),
    0.06 * params.sparkleScale,
    0.14 * params.sparkleScale,
    0.09,
    0.7,
    11.4
  );

  let heroMix = step(microLayer.z, coarseLayer.z);
  let heroSeed = mix(microLayer.w, coarseLayer.w, heroMix);
  let sparkleCore = max(coarseLayer.x, microLayer.x * 0.78);
  let sparkleField = max(coarseLayer.y, microLayer.y * 0.86);
  let glowField = max(coarseLayer.z, microLayer.z * 0.74);
  let macroNoise = fbm((scaledUv * (2.6 + (params.density * 0.9))) + vec2f(0.0, p * 0.7));
  let dustNoise = noise2d(
    (scaledUv * (13.0 + (params.density * 7.0)))
      + vec2f((p * 5.2) + (heroSeed * 3.1), heroSeed * 7.4)
  );
  let dissolveCurve = smoothstep(0.03, 0.97, p);
  let sparkleWindow = smoothstep(0.02, 0.28, p) * (1.0 - smoothstep(0.8, 1.0, p));
  let dustField = smoothstep(0.58, 1.0, dustNoise)
    * (0.12 + (sparkleField * 0.88))
    * sin(p * PI);
  let thresholdMap = clamp(
    (macroNoise * 0.58)
      + (dustNoise * 0.14)
      + ((1.0 - sparkleField) * 0.18)
      + ((1.0 - glowField) * 0.08),
    0.0,
    1.0
  );
  let dissolveProgress = clamp(
    (dissolveCurve * 1.08) - 0.04
      + (sparkleField * (0.28 + (params.intensity * 0.12)) * sparkleWindow)
      + (glowField * (0.1 + (params.glow * 0.08)))
      + (dustField * 0.12),
    0.0,
    1.0
  );
  let edge = 0.075 + (0.018 * params.sparkleScale);
  let leftPresence = 1.0 - smoothstep(thresholdMap - edge, thresholdMap + edge, dissolveProgress);
  let rightPresence = 1.0 - leftPresence;

  var color = mix(right, left, leftPresence);
  let dissolveEdge = clamp(leftPresence * rightPresence * 4.0, 0.0, 1.0);
  let sparkleEnvelope = sin(p * PI);
  let edgeGlow = dissolveEdge
    * glowField
    * params.intensity
    * params.glow
    * (0.5 + (sparkleEnvelope * 0.4));
  let sparkleFlash = sparkleCore
    * (0.38 + (params.intensity * 0.52))
    * (0.62 + (sparkleEnvelope * 0.38));
  let glowColor = mix(vec3f(1.0, 0.97, 0.88), vec3f(1.0, 0.82, 0.56), heroSeed);
  let warmVeil = glowColor * glowField * params.glow * (0.06 + (rightPresence * 0.12));
  let incomingLift = right.rgb * (glowField * rightPresence * 0.05 * params.glow);
  let lifted = color.rgb
    + warmVeil
    + incomingLift
    + (glowColor * edgeGlow * 0.95)
    + (glowColor * sparkleFlash * 0.72);
  let compressed = 1.0 - exp(-lifted * (1.0 + (edgeGlow * 0.45)));

  return vec4f(
    clamp(mix(lifted, compressed, 0.46), vec3f(0.0), vec3f(1.0)),
    color.a
  );
}`,packUniforms:(e,t,n,r,i)=>{let a=i?.sparkleScale??1,o=i?.intensity??1,s=i?.density??1,c=i?.glow??1;return new Float32Array([e,t,n,a,o,s,c,0])}},Rr={id:`glitch`,name:`Glitch`,category:`custom`,hasDirection:!1,entryPoint:`glitchFragment`,uniformSize:32,shader:`
struct GlitchParams {
  progress: f32,
  width: f32,
  height: f32,
  intensity: f32,
  blockSize: f32,
  rgbSplit: f32,
  _pad1: f32,
  _pad2: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: GlitchParams;

@fragment
fn glitchFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let p = params.progress;

  // Intensity envelope — ramps up, holds, eases out
  let envelope = smoothstep(0.0, 0.2, p) * (1.0 - smoothstep(0.8, 1.0, p));
  let strength = envelope * params.intensity;

  // --- Block displacement (two scales) ---
  let bigBlockH = params.blockSize * 2.0 / params.height;
  let bigBlockY = floor(uv.y / bigBlockH);
  let bigSeed = hash(vec2f(bigBlockY * 17.3, floor(p * 8.0)));
  let bigActive = step(0.55 - strength * 0.35, bigSeed);
  let bigShift = (hash(vec2f(bigBlockY * 31.7, floor(p * 10.0))) - 0.5)
                 * strength * 0.18 * bigActive;

  let sliceH = max(2.0, params.blockSize * 0.3) / params.height;
  let sliceY = floor(uv.y / sliceH);
  let sliceSeed = hash(vec2f(sliceY * 53.1, floor(p * 12.0)));
  let sliceActive = step(0.65 - strength * 0.25, sliceSeed);
  let sliceShift = (hash(vec2f(sliceY * 71.3, floor(p * 14.0))) - 0.5)
                   * strength * 0.1 * sliceActive;

  let totalShift = bigShift + sliceShift;
  let dUv = vec2f(clamp(uv.x + totalShift, 0.0, 1.0), uv.y);

  // --- RGB split (horizontal chromatic aberration) ---
  let split = params.rgbSplit * strength * 0.015 + abs(totalShift) * 0.2;
  let uvR = vec2f(clamp(dUv.x + split, 0.0, 1.0), dUv.y);
  let uvB = vec2f(clamp(dUv.x - split, 0.0, 1.0), dUv.y);

  // --- Per-block clip switching ---
  let switchBlockH = bigBlockH * 0.7;
  let switchY = floor(uv.y / switchBlockH);
  let switchSeed = hash(vec2f(switchY * 7.3, floor(p * 6.0)));
  let threshold = switchSeed * 0.7 + 0.15;
  let useRight = smoothstep(threshold - 0.12, threshold + 0.12, p);

  // Sample both clips with chromatic aberration
  let lR = textureSample(leftTex, texSampler, uvR).r;
  let lG = textureSample(leftTex, texSampler, dUv).g;
  let lB = textureSample(leftTex, texSampler, uvB).b;
  let lA = textureSample(leftTex, texSampler, dUv).a;
  let leftColor = vec4f(lR, lG, lB, lA);

  let rR = textureSample(rightTex, texSampler, uvR).r;
  let rG = textureSample(rightTex, texSampler, dUv).g;
  let rB = textureSample(rightTex, texSampler, uvB).b;
  let rA = textureSample(rightTex, texSampler, dUv).a;
  let rightColor = vec4f(rR, rG, rB, rA);

  // Detect truly empty samples using the alpha channel; fall back to
  // luminance only when alpha is not a reliable signal.
  let leftEmpty  = leftColor.a  < 0.01;
  let rightEmpty = rightColor.a < 0.01;
  let safeLeft  = select(leftColor,  rightColor, leftEmpty  && !rightEmpty);
  let safeRight = select(rightColor, leftColor,  rightEmpty && !leftEmpty);

  var color = mix(safeLeft, safeRight, useRight);

  // --- Digital noise on glitched regions ---
  let noiseSeed = hash(vec2f(uv.x * params.width * 0.5,
                              uv.y * params.height * 0.5 + p * 1000.0));
  let noiseAmt = strength * 0.1 * max(bigActive, sliceActive);
  color = vec4f(mix(color.rgb, vec3f(noiseSeed), noiseAmt), color.a);

  // --- Subtle posterization on displaced blocks ---
  let levels = mix(256.0, 24.0, strength * bigActive * 0.4);
  color = vec4f(floor(color.rgb * levels + 0.5) / levels, color.a);

  return color;
}`,packUniforms:(e,t,n,r,i)=>{let a=i?.intensity??1,o=i?.blockSize??30,s=i?.rgbSplit??1;return new Float32Array([e,t,n,a,o,s,0,0])}},zr={id:`pixelate`,name:`Pixelate`,category:`custom`,hasDirection:!1,entryPoint:`pixelateFragment`,uniformSize:32,shader:`
struct PixelateParams {
  progress: f32,
  // Pre-computed on CPU: block size in UV space (1/width * blockPx, 1/height * blockPx)
  blockU: f32,
  blockV: f32,
  crossfade: f32,
  _pad1: f32,
  _pad2: f32,
  _pad3: f32,
  _pad4: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: PixelateParams;

@fragment
fn pixelateFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;

  // Snap UV to block grid center (block size pre-computed on CPU)
  let snappedUv = clamp(
    floor(uv / vec2f(params.blockU, params.blockV)) * vec2f(params.blockU, params.blockV)
      + vec2f(params.blockU, params.blockV) * 0.5,
    vec2f(0.0),
    vec2f(1.0)
  );

  // Sample both clips at the pixelated UV — only 2 texture reads
  let left = textureSample(leftTex, texSampler, snappedUv);
  let right = textureSample(rightTex, texSampler, snappedUv);

  return mix(left, right, params.crossfade);
}`,packUniforms:(e,t,n,r,i)=>{let a=i?.maxBlockSize??48,o=1-Math.abs(e*2-1),s=o*o,c=Math.max(1,s*a),l=c/t,u=c/n,d=Math.max(0,Math.min(1,(e-.45)/.1)),f=d*d*(3-2*d);return new Float32Array([e,l,u,f,0,0,0,0])}},Br={id:`chromatic`,name:`Chromatic`,category:`custom`,hasDirection:!0,directions:[`from-left`,`from-right`,`from-top`,`from-bottom`],entryPoint:`chromaticFragment`,uniformSize:32,shader:`
struct ChromaticParams {
  progress: f32,
  width: f32,
  height: f32,
  direction: f32,
  spread: f32,
  intensity: f32,
  _pad1: f32,
  _pad2: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: ChromaticParams;

@fragment
fn chromaticFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let p = params.progress;

  // Intensity envelope — strongest at midpoint
  let envelope = sin(p * PI);
  let strength = envelope * params.intensity;

  // Direction vector for the aberration spread
  let dir = u32(params.direction);
  var aberrationDir: vec2f;
  if (dir == 0u) { aberrationDir = vec2f(1.0, 0.0); }
  else if (dir == 1u) { aberrationDir = vec2f(-1.0, 0.0); }
  else if (dir == 2u) { aberrationDir = vec2f(0.0, 1.0); }
  else { aberrationDir = vec2f(0.0, -1.0); }

  // RGB channel offsets — each channel shifts at different rate
  let spreadAmount = params.spread * strength * 0.02;
  let rOffset = aberrationDir * spreadAmount * 1.0;
  let gOffset = aberrationDir * spreadAmount * 0.0;  // Green stays centered
  let bOffset = aberrationDir * spreadAmount * -1.0;

  // Add slight radial component for lens-like feel
  let center = uv - vec2f(0.5);
  let radialOffset = center * strength * 0.01;

  // Sample outgoing clip (left) with aberration
  let leftR = textureSample(leftTex, texSampler, clamp(uv + rOffset + radialOffset, vec2f(0.0), vec2f(1.0))).r;
  let leftG = textureSample(leftTex, texSampler, clamp(uv + gOffset, vec2f(0.0), vec2f(1.0))).g;
  let leftB = textureSample(leftTex, texSampler, clamp(uv + bOffset - radialOffset, vec2f(0.0), vec2f(1.0))).b;
  let leftA = textureSample(leftTex, texSampler, uv).a;
  let leftColor = vec4f(leftR, leftG, leftB, leftA);

  // Sample incoming clip (right) with aberration
  let rightR = textureSample(rightTex, texSampler, clamp(uv + rOffset + radialOffset, vec2f(0.0), vec2f(1.0))).r;
  let rightG = textureSample(rightTex, texSampler, clamp(uv + gOffset, vec2f(0.0), vec2f(1.0))).g;
  let rightB = textureSample(rightTex, texSampler, clamp(uv + bOffset - radialOffset, vec2f(0.0), vec2f(1.0))).b;
  let rightA = textureSample(rightTex, texSampler, uv).a;
  let rightColor = vec4f(rightR, rightG, rightB, rightA);

  // Directional wipe for the crossfade (not a hard cut)
  var sweepPos: f32;
  if (dir == 0u) { sweepPos = uv.x; }
  else if (dir == 1u) { sweepPos = 1.0 - uv.x; }
  else if (dir == 2u) { sweepPos = uv.y; }
  else { sweepPos = 1.0 - uv.y; }

  // Soft directional crossfade
  let t = smoothstep(p * 1.3 - 0.15, p * 1.3 + 0.15, sweepPos);

  var color = mix(rightColor, leftColor, t);

  // Slight brightness boost at transition edge
  let edgeDist = abs(sweepPos - p);
  let edgeGlow = exp(-edgeDist * edgeDist * 40.0) * 0.08 * envelope;
  color = vec4f(min(color.rgb + edgeGlow, vec3f(1.0)), color.a);

  return color;
}`,packUniforms:(e,t,n,r,i)=>{let a=i?.spread??1.5,o=i?.intensity??1;return new Float32Array([e,t,n,r,a,o,0,0])}},Vr={id:`radialBlur`,name:`Radial Blur`,category:`custom`,hasDirection:!1,entryPoint:`radialBlurFragment`,uniformSize:32,shader:`
struct RadialBlurParams {
  progress: f32,
  width: f32,
  height: f32,
  blurStrength: f32,
  spin: f32,
  samples: f32,
  _pad1: f32,
  _pad2: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: RadialBlurParams;

fn sampleWithRadialBlur(tex: texture_2d<f32>, uv: vec2f, strength: f32, spinAmount: f32) -> vec4f {
  let center = vec2f(0.5, 0.5);
  let dir = uv - center;
  let dist = length(dir);

  // Combine zoom blur + spin blur
  let numSamples = u32(params.samples);
  var color = vec4f(0.0);
  var totalWeight = 0.0;

  for (var i = 0u; i < numSamples; i++) {
    let t = f32(i) / f32(numSamples - 1u) - 0.5;

    // Zoom: offset along radial direction
    let zoomOffset = dir * t * strength;

    // Spin: rotate around center
    let angle = t * spinAmount;
    let cosA = cos(angle);
    let sinA = sin(angle);
    let rotatedDir = vec2f(
      dir.x * cosA - dir.y * sinA,
      dir.x * sinA + dir.y * cosA
    ) - dir;
    let spinOffset = rotatedDir * strength;

    let sampleUv = clamp(uv + zoomOffset + spinOffset, vec2f(0.0), vec2f(1.0));

    // Gaussian-ish weight (center samples contribute more)
    let weight = exp(-t * t * 4.0);
    color += textureSample(tex, texSampler, sampleUv) * weight;
    totalWeight += weight;
  }

  return color / totalWeight;
}

@fragment
fn radialBlurFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let p = params.progress;

  // Blur envelope: ramp up → peak at midpoint → ramp down
  let blurEnvelope = sin(p * PI);
  let strength = blurEnvelope * params.blurStrength * 0.15;
  let spinAmount = blurEnvelope * params.spin * 0.3;

  // Sample both clips with radial blur
  let left = sampleWithRadialBlur(leftTex, uv, strength, spinAmount);
  let right = sampleWithRadialBlur(rightTex, uv, strength, spinAmount);

  // Crossfade with smooth S-curve
  let t = smoothstep(0.3, 0.7, p);

  var color = mix(left, right, t);

  // Subtle vignette darkening during blur peak
  let center = uv - vec2f(0.5);
  let vignette = 1.0 - dot(center, center) * blurEnvelope * 0.5;
  color = vec4f(color.rgb * vignette, color.a);

  return color;
}`,packUniforms:(e,t,n,r,i)=>{let a=i?.blurStrength??1,o=i?.spin??.3,s=i?.samples??12;return new Float32Array([e,t,n,a,o,s,0,0])}},Hr={id:`fade`,name:`Fade`,category:`basic`,hasDirection:!1,entryPoint:`fadeFragment`,uniformSize:16,shader:`
struct FadeParams {
  progress: f32,
  width: f32,
  height: f32,
  _pad: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: FadeParams;

@fragment
fn fadeFragment(input: VertexOutput) -> @location(0) vec4f {
  let p = clamp(params.progress, 0.0, 1.0);

  // cos²/sin² weights summing to 1, plus a 4% scale drift — mirrors the
  // Canvas2D fade renderer so GPU preview matches CPU export exactly.
  let c = cos(p * PI / 2.0);
  let outgoingWeight = c * c;
  let incomingWeight = 1.0 - c * c;
  let outgoingScale = 1.0 - 0.04 * p;
  let incomingScale = 1.04 - 0.04 * p;

  let outgoingUv = (input.uv - vec2f(0.5)) / outgoingScale + vec2f(0.5);
  let incomingUv = (input.uv - vec2f(0.5)) / incomingScale + vec2f(0.5);
  let left = textureSample(leftTex, texSampler, clamp(outgoingUv, vec2f(0.0), vec2f(1.0)));
  let right = textureSample(rightTex, texSampler, clamp(incomingUv, vec2f(0.0), vec2f(1.0)));
  let outgoingMask = f32(all(outgoingUv >= vec2f(0.0)) && all(outgoingUv <= vec2f(1.0)));
  let incomingMask = f32(all(incomingUv >= vec2f(0.0)) && all(incomingUv <= vec2f(1.0)));

  let wOut = outgoingWeight * outgoingMask;
  let wIn = incomingWeight * incomingMask;
  let color = left.rgb * wOut + right.rgb * wIn;
  let alpha = clamp(left.a * wOut + right.a * wIn, 0.0, 1.0);

  return vec4f(color, alpha);
}`,packUniforms:(e,t,n)=>new Float32Array([e,t,n,0])},Ur={id:`wipe`,name:`Wipe`,category:`wipe`,hasDirection:!0,directions:[`from-left`,`from-right`,`from-top`,`from-bottom`],entryPoint:`wipeFragment`,uniformSize:16,shader:`
struct WipeParams {
  progress: f32,
  width: f32,
  height: f32,
  direction: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: WipeParams;

@fragment
fn wipeFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let dir = u32(params.direction);

  // Sample both textures upfront (uniform control flow required)
  let left = textureSample(leftTex, texSampler, uv);
  let right = textureSample(rightTex, texSampler, uv);

  // Sweep position along the wipe axis (0→1 in sweep direction)
  var sweepPos: f32;
  if (dir == 0u) { sweepPos = uv.x; }             // from-left
  else if (dir == 1u) { sweepPos = 1.0 - uv.x; }  // from-right
  else if (dir == 2u) { sweepPos = uv.y; }         // from-top
  else { sweepPos = 1.0 - uv.y; }                  // from-bottom

  // Hard edge: swept region shows incoming, rest shows outgoing
  let t = step(sweepPos, params.progress);
  return mix(left, right, t);
}`,packUniforms:(e,t,n,r)=>new Float32Array([e,t,n,r])},Wr={id:`slide`,name:`Slide`,category:`slide`,hasDirection:!0,directions:[`from-left`,`from-right`,`from-top`,`from-bottom`],entryPoint:`slideFragment`,uniformSize:16,shader:`
struct SlideParams {
  progress: f32,
  width: f32,
  height: f32,
  direction: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: SlideParams;

@fragment
fn slideFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let p = params.progress;
  let dir = u32(params.direction);

  // Push-slide: both clips move together.
  // Compute offset UVs for both clips, then sample upfront.

  // Offset vectors per direction:
  // from-left:   outgoing shifts right by p, incoming shifts from left (offset = p-1)
  // from-right:  outgoing shifts left by p, incoming shifts from right
  // from-top:    outgoing shifts down by p, incoming shifts from top
  // from-bottom: outgoing shifts up by p, incoming shifts from bottom
  var leftUv: vec2f;
  var rightUv: vec2f;
  var splitTest: f32;

  if (dir == 0u) {
    leftUv = vec2f(uv.x - p, uv.y);
    rightUv = vec2f(uv.x - p + 1.0, uv.y);
    splitTest = step(uv.x, p);
  } else if (dir == 1u) {
    leftUv = vec2f(uv.x + p, uv.y);
    rightUv = vec2f(uv.x - (1.0 - p), uv.y);
    splitTest = step(1.0 - p, uv.x);
  } else if (dir == 2u) {
    leftUv = vec2f(uv.x, uv.y - p);
    rightUv = vec2f(uv.x, uv.y - p + 1.0);
    splitTest = step(uv.y, p);
  } else {
    leftUv = vec2f(uv.x, uv.y + p);
    rightUv = vec2f(uv.x, uv.y - (1.0 - p));
    splitTest = step(1.0 - p, uv.y);
  }

  // Sample both textures upfront (uniform control flow required)
  let left = textureSample(leftTex, texSampler, leftUv);
  let right = textureSample(rightTex, texSampler, rightUv);

  return mix(left, right, splitTest);
}`,packUniforms:(e,t,n,r)=>new Float32Array([e,t,n,r])},Gr={id:`flip`,name:`Flip`,category:`custom`,hasDirection:!0,directions:[`from-left`,`from-right`,`from-top`,`from-bottom`],entryPoint:`flipFragment`,uniformSize:16,shader:`
struct FlipParams {
  progress: f32,
  width: f32,
  height: f32,
  direction: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: FlipParams;

@fragment
fn flipFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let p = params.progress;
  let dir = u32(params.direction);

  // Horizontal flip (from-left/from-right) scales X, vertical scales Y
  let isHorizontal = (dir == 0u || dir == 1u);
  let midpoint = 0.5;
  let centered = uv - vec2f(0.5, 0.5);

  // Phase 1: outgoing scales 1→0; Phase 2: incoming scales 0→1
  let flipProgress1 = p / midpoint;
  let flipProgress2 = (p - midpoint) / midpoint;
  let scale1 = max(cos(flipProgress1 * PI * 0.5), 0.001);
  let scale2 = max(sin(flipProgress2 * PI * 0.5), 0.001);
  let scale = select(scale2, scale1, p < midpoint);

  // Distort UV from center based on axis
  let hDistorted = vec2f(centered.x / scale + 0.5, uv.y);
  let vDistorted = vec2f(uv.x, centered.y / scale + 0.5);
  let distorted = select(vDistorted, hDistorted, isHorizontal);

  // Sample both textures at the distorted UV (uniform control flow)
  let left = textureSample(leftTex, texSampler, distorted);
  let right = textureSample(rightTex, texSampler, distorted);

  // Out of bounds = black
  let oob = distorted.x < 0.0 || distorted.x > 1.0 || distorted.y < 0.0 || distorted.y > 1.0;
  let black = vec4f(0.0, 0.0, 0.0, 1.0);

  // Phase 1 shows outgoing (left), Phase 2 shows incoming (right)
  let texColor = select(right, left, p < midpoint);
  return select(texColor, black, oob);
}`,packUniforms:(e,t,n,r)=>new Float32Array([e,t,n,r])},Kr={id:`clockWipe`,name:`Clock Wipe`,category:`mask`,hasDirection:!1,entryPoint:`clockWipeFragment`,uniformSize:16,shader:`
struct ClockWipeParams {
  progress: f32,
  width: f32,
  height: f32,
  edgeSoftness: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: ClockWipeParams;

${Or}

fn clockSweepMask(angle: f32, sweepAngle: f32, feather: f32) -> f32 {
  if (sweepAngle <= 0.0) {
    return 0.0;
  }
  if (sweepAngle >= TAU) {
    return 1.0;
  }
  if (feather <= 0.0001) {
    return select(0.0, 1.0, angle <= sweepAngle);
  }
  return 1.0 - smoothstep(sweepAngle - feather, sweepAngle + feather, angle);
}

@fragment
fn clockWipeFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let p = clamp(params.progress, 0.0, 1.0);

  // Compute angle from center in pixel space (preserves aspect ratio)
  let pixelPos = uv * vec2f(params.width, params.height);
  let center = vec2f(params.width * 0.5, params.height * 0.5);
  let delta = pixelPos - center;

  // atan2(x, -y) gives angle from 12 o'clock (top), clockwise positive
  let angle = atan2(delta.x, -delta.y);

  // Normalize angle from [-PI, PI] to [0, TAU]
  let normalizedAngle = select(angle, angle + TAU, angle < 0.0);
  let sweepAngle = p * TAU;
  let feather = max(0.0, min(params.edgeSoftness * TAU / 360.0, min(sweepAngle, TAU - sweepAngle)));
  let outgoingScale = 1.0 - (0.04 * p);
  let incomingScale = 1.04 - (0.04 * p);
  let outgoingOpacity = 1.0 - (0.1 * p);
  let incomingOpacity = 0.85 + (0.15 * p);
  let leftUv = scaleUv(uv, outgoingScale);
  let rightUv = scaleUv(uv, incomingScale);

  // Sample both textures upfront (uniform control flow required)
  let left = textureSample(leftTex, texSampler, leftUv);
  let right = textureSample(rightTex, texSampler, rightUv);
  let outgoingColor = vec4f(left.rgb * outgoingOpacity, left.a * outgoingOpacity);
  let incomingColor = vec4f(right.rgb * incomingOpacity, right.a * incomingOpacity);

  // Swept region with soft edge: incoming; un-swept: outgoing
  let swept = clockSweepMask(normalizedAngle, sweepAngle, feather);
  return mix(outgoingColor, incomingColor, swept);
}`,packUniforms:(e,t,n,r,i)=>{let a=i?.edgeSoftness??8;return new Float32Array([e,t,n,a])}},qr={id:`iris`,name:`Iris`,category:`iris`,hasDirection:!1,entryPoint:`irisFragment`,uniformSize:16,shader:`
struct IrisParams {
  progress: f32,
  width: f32,
  height: f32,
  edgeSoftness: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: IrisParams;

${Or}

fn circleMask(distanceFromCenter: f32, radius: f32, feather: f32) -> f32 {
  if (radius <= 0.0) {
    return 0.0;
  }
  if (feather <= 0.001) {
    return select(0.0, 1.0, distanceFromCenter <= radius);
  }
  return 1.0 - smoothstep(radius - feather, radius + feather, distanceFromCenter);
}

@fragment
fn irisFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let p = clamp(params.progress, 0.0, 1.0);

  // Compute distance from center in pixel space
  let pixelPos = uv * vec2f(params.width, params.height);
  let halfW = params.width * 0.5;
  let halfH = params.height * 0.5;
  let center = vec2f(halfW, halfH);
  let dist = length(pixelPos - center);

  // Max radius = diagonal from center to corner * 1.2 (matches CPU)
  let maxRadius = sqrt(halfW * halfW + halfH * halfH) * 1.2;
  let radius = p * maxRadius;
  let feather = max(0.0, min(params.edgeSoftness, min(radius, maxRadius - radius)));
  let outgoingScale = 1.0 - (0.04 * p);
  let incomingScale = 1.04 - (0.04 * p);
  let outgoingOpacity = 1.0 - (0.1 * p);
  let incomingOpacity = 0.85 + (0.15 * p);
  let leftUv = scaleUv(uv, outgoingScale);
  let rightUv = scaleUv(uv, incomingScale);

  // Sample both textures upfront (uniform control flow required)
  let left = textureSample(leftTex, texSampler, leftUv);
  let right = textureSample(rightTex, texSampler, rightUv);
  let outgoingColor = vec4f(left.rgb * outgoingOpacity, left.a * outgoingOpacity);
  let incomingColor = vec4f(right.rgb * incomingOpacity, right.a * incomingOpacity);

  // Inside circle with soft edge: incoming; outside: outgoing
  let inside = circleMask(dist, radius, feather);
  return mix(outgoingColor, incomingColor, inside);
}`,packUniforms:(e,t,n,r,i)=>{let a=i?.edgeSoftness??6;return new Float32Array([e,t,n,a])}},Jr={id:`liquidDistort`,name:`Liquid Distort`,category:`custom`,hasDirection:!0,directions:[`from-left`,`from-right`,`from-top`,`from-bottom`],entryPoint:`liquidDistortFragment`,uniformSize:48,shader:`
struct LiquidDistortParams {
  progress: f32,
  width: f32,
  height: f32,
  direction: f32,
  intensity: f32,
  scale: f32,
  turbulence: f32,
  edgeSoftness: f32,
  chroma: f32,
  swirl: f32,
  shine: f32,
  _pad: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: LiquidDistortParams;

fn liquidAxis(uv: vec2f, dir: u32) -> f32 {
  if (dir == 0u) { return uv.x; }
  if (dir == 1u) { return 1.0 - uv.x; }
  if (dir == 2u) { return uv.y; }
  return 1.0 - uv.y;
}

fn liquidFlow(uv: vec2f, p: f32, scale: f32, turbulence: f32) -> vec2f {
  let aspect = max(params.width / max(params.height, 1.0), 0.001);
  let pos = vec2f(uv.x * aspect, uv.y) * scale;
  let slow = fbm(pos + vec2f(p * 1.8, -p * 1.15));
  let fast = fbm(pos * 1.9 + vec2f(-p * 2.7, p * 1.55));
  let curlX = noise2d(pos + vec2f(slow * 2.5, p * 3.0)) - 0.5;
  let curlY = noise2d(pos + vec2f(p * -2.0, fast * 2.5)) - 0.5;
  return vec2f(curlX, curlY) * turbulence + vec2f(slow - 0.5, fast - 0.5) * 0.45;
}

@fragment
fn liquidDistortFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let p = clamp(params.progress, 0.0, 1.0);
  let dir = u32(params.direction);
  let envelope = sin(p * PI);
  let axis = liquidAxis(uv, dir);
  let flow = liquidFlow(uv, p, max(params.scale, 0.001), params.turbulence);

  let center = uv - vec2f(0.5);
  let swirlAngle = params.swirl * envelope * 0.42;
  let s = sin(swirlAngle);
  let c = cos(swirlAngle);
  let rotated = vec2f(center.x * c - center.y * s, center.x * s + center.y * c);
  let swirlOffset = (rotated - center) * 0.32;

  let baseStrength = params.intensity * envelope * 0.052;
  let leftOffset = (flow + swirlOffset) * baseStrength;
  let rightOffset = (-flow * 0.82 + swirlOffset * 0.55) * baseStrength;

  let frontNoise = fbm(uv * max(params.scale * 0.72, 0.001) + vec2f(p * 2.2, -p * 1.7));
  let front = axis + (frontNoise - 0.5) * 0.28 * params.intensity * envelope;
  let softness = max(params.edgeSoftness, 0.001);
  let reveal = smoothstep(p - softness, p + softness, front);

  let leftUv = clamp(uv + leftOffset, vec2f(0.0), vec2f(1.0));
  let rightUv = clamp(uv + rightOffset, vec2f(0.0), vec2f(1.0));
  let leftColor = textureSampleLevel(leftTex, texSampler, leftUv, 0.0);
  let rightColor = textureSampleLevel(rightTex, texSampler, rightUv, 0.0);

  let chromaOffset = flow * params.chroma * envelope * 0.018;
  let rightR = textureSampleLevel(rightTex, texSampler, clamp(rightUv + chromaOffset, vec2f(0.0), vec2f(1.0)), 0.0).r;
  let rightB = textureSampleLevel(rightTex, texSampler, clamp(rightUv - chromaOffset, vec2f(0.0), vec2f(1.0)), 0.0).b;
  let refractedRight = vec4f(rightR, rightColor.g, rightB, rightColor.a);

  let caustic = pow(max(0.0, 1.0 - abs(front - p) / max(softness * 2.5, 0.001)), 2.0);
  let shimmerNoise = fbm(uv * max(params.scale * 2.4, 0.001) + vec2f(p * 5.0, p * -4.0));
  let shine = vec3f(0.72, 0.88, 1.0) * caustic * shimmerNoise * params.shine * envelope * 0.22;

  let color = mix(refractedRight, leftColor, reveal);
  let glassMix = smoothstep(0.0, 1.0, caustic * 0.65 + envelope * 0.2);
  let glassed = mix(color.rgb, color.rgb + shine, glassMix);
  return vec4f(min(glassed, vec3f(1.0)), color.a);
}`,packUniforms:(e,t,n,r,i)=>{let a=i?.intensity??1,o=i?.scale??4.5,s=i?.turbulence??1,c=i?.edgeSoftness??.18,l=i?.chroma??.75,u=i?.swirl??.8,d=i?.shine??1;return new Float32Array([e,t,n,r,a,o,s,c,l,u,d,0])}},Yr={id:`lensWarpZoom`,name:`Lens Warp Zoom`,category:`custom`,hasDirection:!1,entryPoint:`lensWarpZoomFragment`,uniformSize:48,shader:`
struct LensWarpZoomParams {
  progress: f32,
  width: f32,
  height: f32,
  zoomStrength: f32,
  warpStrength: f32,
  blurStrength: f32,
  chroma: f32,
  vignette: f32,
  centerX: f32,
  centerY: f32,
  glow: f32,
  _pad: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: LensWarpZoomParams;

fn barrelWarp(uv: vec2f, center: vec2f, amount: f32) -> vec2f {
  let aspect = max(params.width / max(params.height, 1.0), 0.001);
  var p = uv - center;
  p.x *= aspect;
  let r2 = dot(p, p);
  let warped = p * (1.0 + amount * r2);
  return vec2f(warped.x / aspect, warped.y) + center;
}

fn zoomAround(uv: vec2f, center: vec2f, zoom: f32) -> vec2f {
  return center + (uv - center) / max(zoom, 0.001);
}

fn sampleZoomBlur(tex: texture_2d<f32>, uv: vec2f, center: vec2f, strength: f32) -> vec4f {
  let dir = center - uv;
  var color = vec4f(0.0);
  var weightSum = 0.0;
  for (var i = 0u; i < 7u; i++) {
    let t = f32(i) / 6.0;
    let weight = 1.0 - abs(t - 0.5) * 0.8;
    let sampleUv = clamp(uv + dir * strength * (t - 0.5), vec2f(0.0), vec2f(1.0));
    color += textureSampleLevel(tex, texSampler, sampleUv, 0.0) * weight;
    weightSum += weight;
  }
  return color / weightSum;
}

@fragment
fn lensWarpZoomFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let p = clamp(params.progress, 0.0, 1.0);
  let center = vec2f(params.centerX, params.centerY);
  let envelope = sin(p * PI);
  let punch = smoothstep(0.0, 0.46, p) * (1.0 - smoothstep(0.58, 1.0, p));
  let reveal = smoothstep(0.36, 0.64, p);

  let outgoingZoom = 1.0 + params.zoomStrength * p * 0.42 + punch * 0.18;
  let incomingZoom = 1.0 + params.zoomStrength * (1.0 - p) * 0.58;
  let warp = params.warpStrength * envelope;
  let blur = params.blurStrength * envelope * 0.11;

  let leftWarped = barrelWarp(zoomAround(uv, center, outgoingZoom), center, warp);
  let rightWarped = barrelWarp(zoomAround(uv, center, incomingZoom), center, -warp * 0.65);

  let leftColor = sampleZoomBlur(leftTex, leftWarped, center, blur);
  let rightBase = sampleZoomBlur(rightTex, rightWarped, center, blur * 0.82);

  let chromaDir = normalize((uv - center) + vec2f(0.0001));
  let chromaOffset = chromaDir * params.chroma * envelope * 0.012;
  let rightR = textureSampleLevel(rightTex, texSampler, clamp(rightWarped + chromaOffset, vec2f(0.0), vec2f(1.0)), 0.0).r;
  let rightB = textureSampleLevel(rightTex, texSampler, clamp(rightWarped - chromaOffset, vec2f(0.0), vec2f(1.0)), 0.0).b;
  let rightColor = vec4f(rightR, rightBase.g, rightB, rightBase.a);

  let dist = distance(uv, center);
  let ring = exp(-pow((dist - 0.22 - p * 0.18) * 8.0, 2.0)) * params.glow * envelope;
  let vignette = 1.0 - smoothstep(0.36, 0.9, dist) * params.vignette * envelope * 0.45;
  let edgeLight = vec3f(0.78, 0.9, 1.0) * ring * 0.18;

  let color = mix(leftColor, rightColor, reveal);
  return vec4f(min(color.rgb * vignette + edgeLight, vec3f(1.0)), color.a);
}`,packUniforms:(e,t,n,r,i)=>{let a=i?.zoomStrength??1,o=i?.warpStrength??.75,s=i?.blurStrength??1,c=i?.chroma??.65,l=i?.vignette??.7,u=i?.centerX??.5,d=i?.centerY??.5,f=i?.glow??1;return new Float32Array([e,t,n,a,o,s,c,l,u,d,f,0])}},Xr={id:`lightLeakBurn`,name:`Light Leak Burn`,category:`custom`,hasDirection:!0,directions:[`from-left`,`from-right`,`from-top`,`from-bottom`],entryPoint:`lightLeakBurnFragment`,uniformSize:48,shader:`
struct LightLeakBurnParams {
  progress: f32,
  width: f32,
  height: f32,
  direction: f32,
  intensity: f32,
  spread: f32,
  warmth: f32,
  burn: f32,
  edgeSoftness: f32,
  grain: f32,
  _pad1: f32,
  _pad2: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: LightLeakBurnParams;

fn burnAxis(uv: vec2f, dir: u32) -> f32 {
  if (dir == 0u) { return uv.x; }
  if (dir == 1u) { return 1.0 - uv.x; }
  if (dir == 2u) { return uv.y; }
  return 1.0 - uv.y;
}

@fragment
fn lightLeakBurnFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let p = clamp(params.progress, 0.0, 1.0);
  let dir = u32(params.direction);
  let axis = burnAxis(uv, dir);
  let envelope = sin(p * PI);

  let left = textureSampleLevel(leftTex, texSampler, uv, 0.0);
  let right = textureSampleLevel(rightTex, texSampler, uv, 0.0);

  let organic = fbm(uv * vec2f(4.0, 3.0) + vec2f(p * 2.7, -p * 1.9));
  let fine = noise2d(uv * vec2f(params.width, params.height) * 0.45 + vec2f(p * 431.0));
  let noisyAxis = axis + (organic - 0.5) * params.spread * 0.28;
  let reveal = smoothstep(p - params.edgeSoftness, p + params.edgeSoftness, noisyAxis);
  // Reveal is 1 ahead of the moving front and 0 behind it. Keep the outgoing
  // frame ahead of the front so p=0 starts on left, then reveal the incoming
  // frame behind it until p=1 ends on right.
  let base = mix(right, left, reveal);

  let frontDist = abs(noisyAxis - p);
  let hotCore = exp(-frontDist * frontDist / max(0.0001, params.edgeSoftness * params.edgeSoftness * 0.38));
  let warmHalo = exp(-frontDist * frontDist / max(0.0001, params.edgeSoftness * params.edgeSoftness * 3.5));
  let warm = mix(vec3f(1.0, 0.88, 0.58), vec3f(1.0, 0.48, 0.16), params.warmth);
  let whiteHot = vec3f(1.0, 0.96, 0.86);
  let grain = (fine - 0.5) * params.grain * envelope * 0.08;
  let burnLight = warm * warmHalo * params.intensity * envelope * 1.15
    + whiteHot * hotCore * params.burn * envelope * 1.35;

  let overexposed = 1.0 - exp(-(base.rgb + burnLight + grain) * (1.0 + hotCore * params.burn));
  let color = mix(base.rgb, overexposed, clamp((warmHalo + hotCore) * envelope, 0.0, 1.0));
  return vec4f(clamp(color, vec3f(0.0), vec3f(1.0)), base.a);
}`,packUniforms:(e,t,n,r,i)=>{let a=i?.intensity??1.25,o=i?.spread??1,s=i?.warmth??.75,c=i?.burn??1.1,l=i?.edgeSoftness??.16,u=i?.grain??.5;return new Float32Array([e,t,n,r,a,o,s,c,l,u,0,0])}},Zr={id:`filmGateSlip`,name:`Film Gate Slip`,category:`custom`,hasDirection:!1,entryPoint:`filmGateSlipFragment`,uniformSize:48,shader:`
struct FilmGateSlipParams {
  progress: f32,
  width: f32,
  height: f32,
  slip: f32,
  shake: f32,
  exposure: f32,
  gateWidth: f32,
  grain: f32,
  chroma: f32,
  roll: f32,
  _pad1: f32,
  _pad2: f32,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var leftTex: texture_2d<f32>;
@group(0) @binding(2) var rightTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: FilmGateSlipParams;

fn sampleFilm(tex: texture_2d<f32>, uv: vec2f, chromaOffset: vec2f) -> vec4f {
  let baseUv = clamp(uv, vec2f(0.0), vec2f(1.0));
  let r = textureSampleLevel(tex, texSampler, clamp(baseUv + chromaOffset, vec2f(0.0), vec2f(1.0)), 0.0).r;
  let g = textureSampleLevel(tex, texSampler, baseUv, 0.0).g;
  let b = textureSampleLevel(tex, texSampler, clamp(baseUv - chromaOffset, vec2f(0.0), vec2f(1.0)), 0.0).b;
  let a = textureSampleLevel(tex, texSampler, baseUv, 0.0).a;
  return vec4f(r, g, b, a);
}

@fragment
fn filmGateSlipFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let p = clamp(params.progress, 0.0, 1.0);
  let envelope = sin(p * PI);
  let frame = floor(p * 18.0);
  let jitterA = hash(vec2f(frame, 19.7));
  let jitterB = hash(vec2f(frame + 3.0, 41.3));
  let gatePulse = smoothstep(0.08, 0.22, p) * (1.0 - smoothstep(0.78, 0.96, p));

  let slipOffset = (p - 0.5) * params.slip * envelope * 0.32
    + (jitterA - 0.5) * params.shake * envelope * 0.05;
  let lateral = (jitterB - 0.5) * params.shake * envelope * 0.025;
  let roll = params.roll * envelope * 0.04 * sin(p * TAU * 2.0);
  let outgoingUv = vec2f(uv.x + lateral + roll * (uv.y - 0.5), uv.y + slipOffset);
  let incomingUv = vec2f(uv.x - lateral * 0.65 - roll * (uv.y - 0.5), uv.y - slipOffset * 0.55);

  let chromaOffset = vec2f(params.chroma * envelope * 0.006, 0.0);
  let left = sampleFilm(leftTex, outgoingUv, chromaOffset);
  let right = sampleFilm(rightTex, incomingUv, chromaOffset * 0.7);
  var color = mix(left, right, smoothstep(0.42, 0.58, p));

  let gateTop = smoothstep(params.gateWidth, 0.0, uv.y);
  let gateBottom = smoothstep(1.0 - params.gateWidth, 1.0, uv.y);
  let gateFlash = max(gateTop, gateBottom) * gatePulse * 0.2;
  let flicker = 1.0 + (hash(vec2f(frame, 8.1)) - 0.42) * params.exposure * envelope * 0.38;
  let grain = (hash(floor(uv * vec2f(params.width, params.height) * 0.7) + vec2f(frame)) - 0.5)
    * params.grain * envelope * 0.12;
  let vignette = 1.0 - dot(uv - vec2f(0.5), uv - vec2f(0.5)) * envelope * 0.35;

  color = vec4f(color.rgb * flicker * vignette + grain + vec3f(gateFlash), color.a);
  return vec4f(clamp(color.rgb, vec3f(0.0), vec3f(1.0)), color.a);
}`,packUniforms:(e,t,n,r,i)=>{let a=i?.slip??1,o=i?.shake??1,s=i?.exposure??.85,c=i?.gateWidth??.075,l=i?.grain??.6,u=i?.chroma??.55,d=i?.roll??.75;return new Float32Array([e,t,n,a,o,s,c,l,u,d,0,0])}},Qr=/* @__PURE__ */ new Map;function G(e){Qr.set(e.id,e)}G(kr),G(Mr),G(Nr),G(Pr),G(Fr),G(Ir),G(Lr),G(Rr),G(zr),G(Br),G(Vr),G(Hr),G(Ur),G(Wr),G(Gr),G(Kr),G(qr),G(Jr),G(Yr),G(Xr),G(Zr);function $r(e){return Qr.get(e)}const ei=n(`TransitionPipeline`);var ti=class e{static sharedPipelines=/* @__PURE__ */ new WeakMap;device;format;sampler;pipelines=/* @__PURE__ */ new Map;uniformBuffers=/* @__PURE__ */ new Map;cachedBindGroups=/* @__PURE__ */ new Map;textureViews=/* @__PURE__ */ new WeakMap;textureBindGroups=/* @__PURE__ */ new WeakMap;leftTexture=null;rightTexture=null;leftView=null;rightView=null;outputCanvas=null;outputCtx=null;texW=0;texH=0;initialized=!1;constructor(e){this.device=e,this.format=`rgba8unorm`,this.sampler=e.createSampler({magFilter:`linear`,minFilter:`linear`})}static create(t){let n=t;if(!n)return null;try{let t=new e(n);return t.init(),t}catch{return null}}init(){if(this.initialized)return;let t=e.sharedPipelines.get(this.device);if(t){this.pipelines=new Map(t),this.initialized=!0;return}for(let[e,t]of Qr)this.createTransitionPipeline(e,t);e.sharedPipelines.set(this.device,new Map(this.pipelines)),this.initialized=!0}createTransitionPipeline(e,t){try{let n=`${Dr}\n${t.shader}`,r=this.device.createShaderModule({label:`transition-${e}`,code:n});r.getCompilationInfo().then(t=>{for(let n of t.messages)n.type===`error`&&ei.error(`Shader "${e}" error at line ${n.lineNum}:${n.linePos}: ${n.message}`)}).catch(()=>{});let i=[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}}];t.uniformSize>0&&i.push({binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:`uniform`}});let a=this.device.createBindGroupLayout({label:`transition-${e}-layout`,entries:i}),o=this.device.createRenderPipeline({label:`transition-${e}-pipeline`,layout:this.device.createPipelineLayout({bindGroupLayouts:[a]}),vertex:{module:r,entryPoint:`vertexMain`},fragment:{module:r,entryPoint:t.entryPoint,targets:[{format:this.format}]},primitive:{topology:`triangle-list`}});this.pipelines.set(e,{pipeline:o,bindGroupLayout:a})}catch(t){ei.warn(`Failed to create pipeline for "${e}"`,t)}}ensureTextures(e,t){if(this.leftTexture&&this.texW===e&&this.texH===t)return;this.leftTexture?.destroy(),this.rightTexture?.destroy();let n={size:{width:e,height:t},format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT};this.leftTexture=this.device.createTexture(n),this.rightTexture=this.device.createTexture(n),this.leftView=this.leftTexture.createView(),this.rightView=this.rightTexture.createView(),this.cachedBindGroups.clear(),this.texW=e,this.texH=t}getOrCreateUniformBuffer(e,t){let n=this.uniformBuffers.get(e);return n&&n.size>=t?n:(n?.destroy(),n=this.device.createBuffer({size:t,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniformBuffers.set(e,n),n)}writeUniforms(e,t,n,r,i,a,o){if(t.uniformSize<=0)return null;let s=t.packUniforms(n,r,i,ni(a),o);if(s.byteLength>t.uniformSize)return ei.warn(`Uniform data for "${e}" is ${s.byteLength} bytes, exceeding declared size ${t.uniformSize}`),null;let c=this.getOrCreateUniformBuffer(e,t.uniformSize);return this.device.queue.writeBuffer(c,0,s.buffer,s.byteOffset,s.byteLength),c}getOrCreateBindGroup(e,t,n,r){if(n.uniformSize>0&&!r)return this.cachedBindGroups.delete(e),null;let i=this.cachedBindGroups.get(e);return i||(!this.leftView||!this.rightView?null:(i=this.createBindGroup(t,this.leftView,this.rightView,r),this.cachedBindGroups.set(e,i),i))}createBindGroup(e,t,n,r){let i=[{binding:0,resource:this.sampler},{binding:1,resource:t},{binding:2,resource:n}];return r&&i.push({binding:3,resource:{buffer:r}}),this.device.createBindGroup({layout:e,entries:i})}getOrCreateTextureView(e){let t=this.textureViews.get(e);return t||(t=e.createView(),this.textureViews.set(e,t)),t}getOrCreateTextureBindGroup(e,t,n,r,i){let a=this.textureBindGroups.get(n);a||(a=/* @__PURE__ */ new WeakMap,this.textureBindGroups.set(n,a));let o=a.get(r);o||(o=/* @__PURE__ */ new Map,a.set(r,o));let s=o.get(e);return s||(s=this.createBindGroup(t,this.getOrCreateTextureView(n),this.getOrCreateTextureView(r),i),o.set(e,s)),s}uploadInputs(e,t,n,r){return this.ensureTextures(n,r),!this.leftTexture||!this.rightTexture?!1:(this.device.queue.copyExternalImageToTexture({source:e,flipY:!1},{texture:this.leftTexture,premultipliedAlpha:!0},{width:n,height:r}),this.device.queue.copyExternalImageToTexture({source:t,flipY:!1},{texture:this.rightTexture,premultipliedAlpha:!0},{width:n,height:r}),!0)}renderUploadedInputsToView(e,t,n,r,i,a,o){let s=this.pipelines.get(e),c=$r(e);if(!s||!c)return!1;let l=this.writeUniforms(e,c,t,n,r,a,o),u=this.getOrCreateBindGroup(e,s.bindGroupLayout,c,l);if(!u)return!1;let d=this.device.createCommandEncoder(),f=d.beginRenderPass({colorAttachments:[{view:i,loadOp:`clear`,storeOp:`store`}]});return f.setPipeline(s.pipeline),f.setBindGroup(0,u),f.draw(6),f.end(),this.device.queue.submit([d.finish()]),!0}render(e,t,n,r,i,a,o,s){if(!this.pipelines.has(e)||!$r(e)||i<2||a<2||!this.uploadInputs(t,n,i,a))return null;if(!this.outputCanvas||this.outputCanvas.width!==i||this.outputCanvas.height!==a){this.outputCanvas=new OffscreenCanvas(i,a);let e=this.outputCanvas.getContext(`webgpu`);if(!e)return null;e.configure({device:this.device,format:this.format,alphaMode:`premultiplied`}),this.outputCtx=e}return!this.outputCtx||!this.renderUploadedInputsToView(e,r,i,a,this.outputCtx.getCurrentTexture().createView(),o,s)?null:this.outputCanvas}renderToTexture(e,t,n,r,i,a,o,s,c){return!this.pipelines.has(e)||!$r(e)||a<2||o<2||r.width!==a||r.height!==o||!this.uploadInputs(t,n,a,o)?!1:this.renderUploadedInputsToView(e,i,a,o,r.createView(),s,c)}renderTexturesToTexture(e,t,n,r,i,a,o,s,c){let l=this.pipelines.get(e),u=$r(e);if(!l||!u||a<2||o<2||t.width!==a||t.height!==o||n.width!==a||n.height!==o||r.width!==a||r.height!==o)return!1;let d=this.writeUniforms(e,u,i,a,o,s,c);if(u.uniformSize>0&&!d)return!1;let f=this.getOrCreateTextureBindGroup(e,l.bindGroupLayout,t,n,d),p=this.device.createCommandEncoder(),m=p.beginRenderPass({colorAttachments:[{view:this.getOrCreateTextureView(r),loadOp:`clear`,storeOp:`store`}]});return m.setPipeline(l.pipeline),m.setBindGroup(0,f),m.draw(6),m.end(),this.device.queue.submit([p.finish()]),!0}has(e){return this.pipelines.has(e)}destroy(){this.leftTexture?.destroy(),this.rightTexture?.destroy(),this.leftTexture=null,this.rightTexture=null,this.leftView=null,this.rightView=null,this.outputCanvas=null,this.outputCtx=null;for(let e of this.uniformBuffers.values())e.destroy();this.uniformBuffers.clear(),this.cachedBindGroups.clear(),this.textureViews=/* @__PURE__ */ new WeakMap,this.textureBindGroups=/* @__PURE__ */ new WeakMap,this.pipelines.clear(),this.initialized=!1}};function ni(e){switch(e){case`from-left`:return 0;case`from-right`:return 1;case`from-top`:return 2;case`from-bottom`:return 3;default:return 0}}const ri=`
${I}

struct MediaUniforms {
  outputSize: vec2f,
  sourceSize: vec2f,
  sourceRect: vec4f,
  destRect: vec4f,
  opacity: f32,
  rotation: f32,
  flip: vec2f,
  transformRect: vec4f,
  feather: vec4f,
  mask: vec4f,
  cornerPinOriginSize: vec4f,
  cornerPinMatrix0: vec4f,
  cornerPinMatrix1: vec4f,
  cornerPinMatrix2: vec4f,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var sourceTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> u: MediaUniforms;
@group(0) @binding(3) var maskTex: texture_2d<f32>;

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let pixel = input.uv * u.outputSize;
  let transformHalfSize = u.transformRect.zw * 0.5;
  let transformCenter = u.transformRect.xy + transformHalfSize;
  let relative = pixel - transformCenter;
  let cosR = cos(-u.rotation);
  let sinR = sin(-u.rotation);
  let transformLocal = vec2f(
    relative.x * cosR - relative.y * sinR,
    relative.x * sinR + relative.y * cosR
  );
  let unrotatedPixel = transformCenter + transformLocal;

  var samplePixel = unrotatedPixel;
  if (u.mask.y > 0.5) {
    let pinPixel = unrotatedPixel - u.cornerPinOriginSize.xy;
    let pinDenom = u.cornerPinMatrix2.x * pinPixel.x + u.cornerPinMatrix2.y * pinPixel.y + u.cornerPinMatrix2.z;
    if (abs(pinDenom) < 0.00001) {
      return vec4f(0.0);
    }
    let pinLocal = vec2f(
      (u.cornerPinMatrix0.x * pinPixel.x + u.cornerPinMatrix0.y * pinPixel.y + u.cornerPinMatrix0.z) / pinDenom,
      (u.cornerPinMatrix1.x * pinPixel.x + u.cornerPinMatrix1.y * pinPixel.y + u.cornerPinMatrix1.z) / pinDenom
    );
    if (pinLocal.x < 0.0 || pinLocal.y < 0.0 || pinLocal.x > u.cornerPinOriginSize.z || pinLocal.y > u.cornerPinOriginSize.w) {
      return vec4f(0.0);
    }
    samplePixel = u.cornerPinOriginSize.xy + pinLocal;
  }

  let destMin = u.destRect.xy;
  let destMax = u.destRect.xy + u.destRect.zw;
  if (samplePixel.x < destMin.x || samplePixel.y < destMin.y || samplePixel.x > destMax.x || samplePixel.y > destMax.y) {
    return vec4f(0.0);
  }

  var localUv = (samplePixel - destMin) / max(u.destRect.zw, vec2f(0.001));
  if (u.flip.x < 0.0) {
    localUv.x = 1.0 - localUv.x;
  }
  if (u.flip.y < 0.0) {
    localUv.y = 1.0 - localUv.y;
  }
  let unclampedSourcePixel = u.sourceRect.xy + localUv * u.sourceRect.zw;
  let sourceMin = u.sourceRect.xy + vec2f(0.5);
  let sourceMax = u.sourceRect.xy + max(u.sourceRect.zw - vec2f(0.5), vec2f(0.5));
  let sourcePixel = clamp(unclampedSourcePixel, sourceMin, sourceMax);
  let sourceUv = sourcePixel / max(u.sourceSize, vec2f(0.001));
  let color = textureSampleLevel(sourceTex, texSampler, sourceUv, 0.0);
  let viewportLocal = samplePixel - u.destRect.xy;
  let leftAlpha = select(1.0, clamp(viewportLocal.x / max(u.feather.x, 0.001), 0.0, 1.0), u.feather.x > 0.0);
  let rightAlpha = select(1.0, clamp((u.destRect.z - viewportLocal.x) / max(u.feather.y, 0.001), 0.0, 1.0), u.feather.y > 0.0);
  let topAlpha = select(1.0, clamp(viewportLocal.y / max(u.feather.z, 0.001), 0.0, 1.0), u.feather.z > 0.0);
  let bottomAlpha = select(1.0, clamp((u.destRect.w - viewportLocal.y) / max(u.feather.w, 0.001), 0.0, 1.0), u.feather.w > 0.0);
  let featherAlpha = leftAlpha * rightAlpha * topAlpha * bottomAlpha;
  var layerMaskAlpha = 1.0;
  if (u.mask.z > 0.5) {
    let maskUv = samplePixel / max(u.outputSize, vec2f(0.001));
    layerMaskAlpha = textureSampleLevel(maskTex, texSampler, maskUv, 0.0).a;
    if (u.mask.w > 0.5) {
      layerMaskAlpha = 1.0 - layerMaskAlpha;
    }
  }

  let radius = min(u.mask.x, min(u.transformRect.z, u.transformRect.w) * 0.5);
  var cornerAlpha = 1.0;
  if (radius > 0.0) {
    let itemLocal = samplePixel - u.transformRect.xy;
    let roundedDistance = length(max(abs(itemLocal - transformHalfSize) - (transformHalfSize - vec2f(radius)), vec2f(0.0))) - radius;
    cornerAlpha = 1.0 - smoothstep(-0.75, 0.75, roundedDistance);
  }

  return vec4f(color.rgb, color.a * u.opacity * featherAlpha * cornerAlpha * layerMaskAlpha);
}
`;function ii(e){if(e instanceof HTMLVideoElement)return{width:e.videoWidth,height:e.videoHeight};if(typeof VideoFrame<`u`&&e instanceof VideoFrame)return{width:e.displayWidth,height:e.displayHeight};if(e instanceof HTMLImageElement)return{width:e.naturalWidth,height:e.naturalHeight};let t=e;return{width:t.width,height:t.height}}var ai=class{device;inputTexture=null;inputView=null;bindGroup=null;inputW=0;inputH=0;activeMaskView=null;replacePipeline;blendPipeline;sampler;bindGroupLayout;uniformBuffer;constructor(e){this.device=e,this.sampler=e.createSampler({magFilter:`linear`,minFilter:`linear`});let t=e.createShaderModule({label:`media-render`,code:ri});this.bindGroupLayout=e.createBindGroupLayout({label:`media-render-layout`,entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:`uniform`}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.replacePipeline=this.createRenderPipeline(t,!1),this.blendPipeline=this.createRenderPipeline(t,!0),this.uniformBuffer=e.createBuffer({size:176,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}createRenderPipeline(e,t){return this.device.createRenderPipeline({label:`media-render-pipeline`,layout:this.device.createPipelineLayout({bindGroupLayouts:[this.bindGroupLayout]}),vertex:{module:e,entryPoint:`vertexMain`},fragment:{module:e,entryPoint:`fragmentMain`,targets:[{format:`rgba8unorm`,blend:t?{color:{srcFactor:`src-alpha`,dstFactor:`one-minus-src-alpha`,operation:`add`},alpha:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`,operation:`add`}}:void 0}]},primitive:{topology:`triangle-list`}})}renderSourceToTexture(e,t,n){let r=ii(e),i=n.sourceWidth||r.width,a=n.sourceHeight||r.height;if(i<2||a<2||t.width!==n.outputWidth||t.height!==n.outputHeight||(this.ensureInputTexture(i,a),!this.inputTexture||!this.inputView))return!1;if(this.device.queue.copyExternalImageToTexture({source:e,flipY:!1},{texture:this.inputTexture},{width:i,height:a}),!n.maskTexture)return this.renderInputViewToTexture(t,n,i,a);let o=this.activeMaskView,s=this.bindGroup;this.activeMaskView=n.maskTexture.createView(),this.bindGroup=null;try{return this.renderInputViewToTexture(t,n,i,a)}finally{this.activeMaskView=o,this.bindGroup=s}}renderTextureToTexture(e,t,n){let r=n.sourceWidth||e.width,i=n.sourceHeight||e.height;if(r<2||i<2||t.width!==n.outputWidth||t.height!==n.outputHeight)return!1;let a=this.inputView,o=this.bindGroup,s=this.activeMaskView;this.inputView=e.createView(),this.activeMaskView=n.maskTexture?.createView()??null,this.bindGroup=null;try{return this.renderInputViewToTexture(t,n,r,i)}finally{this.inputView=a,this.activeMaskView=s,this.bindGroup=o}}destroy(){this.inputTexture?.destroy(),this.uniformBuffer.destroy()}ensureInputTexture(e,t){this.inputTexture&&this.inputW===e&&this.inputH===t||(this.inputTexture?.destroy(),this.inputTexture=this.device.createTexture({size:{width:e,height:t},format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),this.inputView=this.inputTexture.createView(),this.bindGroup=null,this.inputW=e,this.inputH=t)}ensureBindGroup(){if(this.bindGroup)return this.bindGroup;if(!this.inputView)return null;let e=this.activeMaskView??this.inputView;return this.bindGroup=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:this.sampler},{binding:1,resource:this.inputView},{binding:2,resource:{buffer:this.uniformBuffer}},{binding:3,resource:e}]}),this.bindGroup}renderInputViewToTexture(e,t,n,r){let i=t.sourceRect??{x:0,y:0,width:n,height:r},a=t.transformRect??t.destRect,o=t.featherPixels??{left:0,right:0,top:0,bottom:0},s=t.cornerPin,c=new Float32Array([t.outputWidth,t.outputHeight,n,r,i.x,i.y,i.width,i.height,t.destRect.x,t.destRect.y,t.destRect.width,t.destRect.height,t.opacity??1,t.rotationRad??0,t.flipX?-1:1,t.flipY?-1:1,a.x,a.y,a.width,a.height,o.left,o.right,o.top,o.bottom,t.cornerRadius??0,+!!s,+!!t.maskTexture,+!!t.maskInvert,s?.originX??0,s?.originY??0,s?.width??0,s?.height??0,s?.inverseMatrix[0]??1,s?.inverseMatrix[1]??0,s?.inverseMatrix[2]??0,0,s?.inverseMatrix[3]??0,s?.inverseMatrix[4]??1,s?.inverseMatrix[5]??0,0,s?.inverseMatrix[6]??0,s?.inverseMatrix[7]??0,s?.inverseMatrix[8]??1,0]);this.device.queue.writeBuffer(this.uniformBuffer,0,c);let l=this.ensureBindGroup();if(!l)return!1;let u=this.device.createCommandEncoder(),d=u.beginRenderPass({colorAttachments:[{view:e.createView(),loadOp:t.clear===!1?`load`:`clear`,clearValue:{r:0,g:0,b:0,a:0},storeOp:`store`}]});return d.setPipeline(t.blend?this.blendPipeline:this.replacePipeline),d.setBindGroup(0,l),d.draw(6),d.end(),this.device.queue.submit([u.finish()]),!0}};const oi={normal:0,dissolve:1,darken:2,multiply:3,"color-burn":4,"linear-burn":5,lighten:6,screen:7,"color-dodge":8,"linear-dodge":9,overlay:10,"soft-light":11,"hard-light":12,"vivid-light":13,"linear-light":14,"pin-light":15,"hard-mix":16,difference:17,exclusion:18,subtract:19,divide:20,hue:21,saturation:22,color:23,luminosity:24},si=`
// ─── HSL helpers (needed for component blend modes) ───

fn compositor_rgb2hsl(c: vec3f) -> vec3f {
  let mx = max(max(c.r, c.g), c.b);
  let mn = min(min(c.r, c.g), c.b);
  let l = (mx + mn) * 0.5;
  if (mx == mn) { return vec3f(0.0, 0.0, l); }
  let d = mx - mn;
  let s = select(d / (2.0 - mx - mn), d / (mx + mn), l > 0.5);
  var h: f32;
  if (mx == c.r) {
    h = (c.g - c.b) / d + select(0.0, 6.0, c.g < c.b);
  } else if (mx == c.g) {
    h = (c.b - c.r) / d + 2.0;
  } else {
    h = (c.r - c.g) / d + 4.0;
  }
  h /= 6.0;
  return vec3f(h, s, l);
}

fn compositor_hue2rgb(p: f32, q: f32, t: f32) -> f32 {
  var tt = t;
  if (tt < 0.0) { tt += 1.0; }
  if (tt > 1.0) { tt -= 1.0; }
  if (tt < 1.0 / 6.0) { return p + (q - p) * 6.0 * tt; }
  if (tt < 1.0 / 2.0) { return q; }
  if (tt < 2.0 / 3.0) { return p + (q - p) * (2.0 / 3.0 - tt) * 6.0; }
  return p;
}

fn compositor_hsl2rgb(c: vec3f) -> vec3f {
  if (c.y == 0.0) { return vec3f(c.z); }
  let q = select(c.z + c.y - c.z * c.y, c.z * (1.0 + c.y), c.z < 0.5);
  let p = 2.0 * c.z - q;
  return vec3f(
    compositor_hue2rgb(p, q, c.x + 1.0 / 3.0),
    compositor_hue2rgb(p, q, c.x),
    compositor_hue2rgb(p, q, c.x - 1.0 / 3.0)
  );
}

fn compositor_lum(c: vec3f) -> f32 {
  return dot(c, vec3f(0.3, 0.59, 0.11));
}

fn compositor_setLum(c: vec3f, l: f32) -> vec3f {
  let d = l - compositor_lum(c);
  var r = c + vec3f(d);
  let mn = min(min(r.r, r.g), r.b);
  let mx = max(max(r.r, r.g), r.b);
  let ll = compositor_lum(r);
  if (mn < 0.0) {
    r = vec3f(ll) + (r - vec3f(ll)) * ll / (ll - mn);
  }
  if (mx > 1.0) {
    r = vec3f(ll) + (r - vec3f(ll)) * (1.0 - ll) / (mx - ll);
  }
  return r;
}

fn compositor_sat(c: vec3f) -> f32 {
  return max(max(c.r, c.g), c.b) - min(min(c.r, c.g), c.b);
}

// ─── Blend mode implementations ───

fn blendNormal(base: vec3f, layer: vec3f) -> vec3f { return layer; }

fn blendDarken(base: vec3f, layer: vec3f) -> vec3f { return min(base, layer); }
fn blendMultiply(base: vec3f, layer: vec3f) -> vec3f { return base * layer; }
fn blendColorBurn(base: vec3f, layer: vec3f) -> vec3f {
  return select(1.0 - min(vec3f(1.0), (1.0 - base) / max(layer, vec3f(0.001))), vec3f(0.0), layer == vec3f(0.0));
}
fn blendLinearBurn(base: vec3f, layer: vec3f) -> vec3f { return max(base + layer - 1.0, vec3f(0.0)); }

fn blendLighten(base: vec3f, layer: vec3f) -> vec3f { return max(base, layer); }
fn blendScreen(base: vec3f, layer: vec3f) -> vec3f { return 1.0 - (1.0 - base) * (1.0 - layer); }
fn blendColorDodge(base: vec3f, layer: vec3f) -> vec3f {
  return select(min(vec3f(1.0), base / max(1.0 - layer, vec3f(0.001))), vec3f(1.0), layer == vec3f(1.0));
}
fn blendLinearDodge(base: vec3f, layer: vec3f) -> vec3f { return min(base + layer, vec3f(1.0)); }

fn blendOverlay(base: vec3f, layer: vec3f) -> vec3f {
  return select(
    1.0 - 2.0 * (1.0 - base) * (1.0 - layer),
    2.0 * base * layer,
    base <= vec3f(0.5)
  );
}
fn blendSoftLight(base: vec3f, layer: vec3f) -> vec3f {
  return select(
    base + (2.0 * layer - 1.0) * (sqrt(base) - base),
    base - (1.0 - 2.0 * layer) * base * (1.0 - base),
    layer <= vec3f(0.5)
  );
}
fn blendHardLight(base: vec3f, layer: vec3f) -> vec3f {
  return select(
    1.0 - 2.0 * (1.0 - base) * (1.0 - layer),
    2.0 * base * layer,
    layer <= vec3f(0.5)
  );
}
fn blendVividLight(base: vec3f, layer: vec3f) -> vec3f {
  return select(
    blendColorDodge(base, 2.0 * (layer - 0.5)),
    blendColorBurn(base, 2.0 * layer),
    layer <= vec3f(0.5)
  );
}
fn blendLinearLight(base: vec3f, layer: vec3f) -> vec3f {
  return clamp(base + 2.0 * layer - 1.0, vec3f(0.0), vec3f(1.0));
}
fn blendPinLight(base: vec3f, layer: vec3f) -> vec3f {
  return select(
    max(base, 2.0 * (layer - 0.5)),
    min(base, 2.0 * layer),
    layer <= vec3f(0.5)
  );
}
fn blendHardMix(base: vec3f, layer: vec3f) -> vec3f {
  return select(vec3f(0.0), vec3f(1.0), base + layer >= vec3f(1.0));
}

fn blendDifference(base: vec3f, layer: vec3f) -> vec3f { return abs(base - layer); }
fn blendExclusion(base: vec3f, layer: vec3f) -> vec3f { return base + layer - 2.0 * base * layer; }
fn blendSubtract(base: vec3f, layer: vec3f) -> vec3f { return max(base - layer, vec3f(0.0)); }
fn blendDivide(base: vec3f, layer: vec3f) -> vec3f { return min(base / max(layer, vec3f(0.001)), vec3f(1.0)); }

fn blendHue(base: vec3f, layer: vec3f) -> vec3f {
  let bHsl = compositor_rgb2hsl(base);
  let lHsl = compositor_rgb2hsl(layer);
  return compositor_hsl2rgb(vec3f(lHsl.x, bHsl.y, bHsl.z));
}
fn blendSaturation(base: vec3f, layer: vec3f) -> vec3f {
  let bHsl = compositor_rgb2hsl(base);
  let lHsl = compositor_rgb2hsl(layer);
  return compositor_hsl2rgb(vec3f(bHsl.x, lHsl.y, bHsl.z));
}
fn blendColor(base: vec3f, layer: vec3f) -> vec3f {
  let lHsl = compositor_rgb2hsl(layer);
  let bL = compositor_lum(base);
  return compositor_setLum(compositor_hsl2rgb(vec3f(lHsl.x, lHsl.y, 0.5)), bL);
}
fn blendLuminosity(base: vec3f, layer: vec3f) -> vec3f {
  return compositor_setLum(base, compositor_lum(layer));
}

// ─── Dispatch by mode index ───

fn applyBlendMode(base: vec3f, layer: vec3f, mode: u32) -> vec3f {
  switch (mode) {
    case 0u:  { return blendNormal(base, layer); }
    case 1u:  { return blendNormal(base, layer); } // dissolve handled by caller
    case 2u:  { return blendDarken(base, layer); }
    case 3u:  { return blendMultiply(base, layer); }
    case 4u:  { return blendColorBurn(base, layer); }
    case 5u:  { return blendLinearBurn(base, layer); }
    case 6u:  { return blendLighten(base, layer); }
    case 7u:  { return blendScreen(base, layer); }
    case 8u:  { return blendColorDodge(base, layer); }
    case 9u:  { return blendLinearDodge(base, layer); }
    case 10u: { return blendOverlay(base, layer); }
    case 11u: { return blendSoftLight(base, layer); }
    case 12u: { return blendHardLight(base, layer); }
    case 13u: { return blendVividLight(base, layer); }
    case 14u: { return blendLinearLight(base, layer); }
    case 15u: { return blendPinLight(base, layer); }
    case 16u: { return blendHardMix(base, layer); }
    case 17u: { return blendDifference(base, layer); }
    case 18u: { return blendExclusion(base, layer); }
    case 19u: { return blendSubtract(base, layer); }
    case 20u: { return blendDivide(base, layer); }
    case 21u: { return blendHue(base, layer); }
    case 22u: { return blendSaturation(base, layer); }
    case 23u: { return blendColor(base, layer); }
    case 24u: { return blendLuminosity(base, layer); }
    default:  { return blendNormal(base, layer); }
  }
}

fn compositorHash21(p: vec2f) -> f32 {
  let p3 = fract(vec3f(p.xyx) * 0.1031);
  let q = p3 + dot(p3, p3.yzx + vec3f(33.33));
  return fract((q.x + q.y) * q.z);
}

fn compositeDissolveAlpha(alpha: f32, seed: vec2f) -> f32 {
  return select(0.0, 1.0, compositorHash21(seed) < alpha);
}

fn compositeBlendSourceOver(
  baseColor: vec4f,
  layerColor: vec4f,
  sourceAlpha: f32,
  postDissolveAlpha: f32,
  mode: u32,
  seed: vec2f,
  dissolveAlpha: f32
) -> vec4f {
  var srcAlpha = clamp(sourceAlpha, 0.0, 1.0);
  if (mode == 1u) {
    let ditherAlpha = clamp(dissolveAlpha, 0.0, 1.0);
    let coverage = compositeDissolveAlpha(ditherAlpha, seed);
    srcAlpha = coverage * clamp(srcAlpha / max(ditherAlpha, 0.00001), 0.0, 1.0);
  }
  srcAlpha *= clamp(postDissolveAlpha, 0.0, 1.0);
  if (srcAlpha <= 0.0) {
    return baseColor;
  }

  let baseAlpha = clamp(baseColor.a, 0.0, 1.0);
  let blended = applyBlendMode(baseColor.rgb, layerColor.rgb, mode);
  let premulRgb =
    blended * baseAlpha * srcAlpha +
    layerColor.rgb * srcAlpha * (1.0 - baseAlpha) +
    baseColor.rgb * baseAlpha * (1.0 - srcAlpha);
  let outAlpha = srcAlpha + baseAlpha * (1.0 - srcAlpha);
  let outRgb = select(vec3f(0.0), premulRgb / max(outAlpha, 0.00001), outAlpha > 0.00001);
  return vec4f(outRgb, outAlpha);
}
`,ci=`
${I}

${si}

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var baseTex: texture_2d<f32>;
@group(0) @binding(2) var layerTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> u: vec4f;

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let baseColor = textureSampleLevel(baseTex, texSampler, input.uv, 0.0);
  let layerColor = textureSampleLevel(layerTex, texSampler, input.uv, 0.0);
  let layerAlpha = layerColor.a * u.x;
  if (layerAlpha <= 0.0) {
    return baseColor;
  }
  return compositeBlendSourceOver(
    baseColor,
    layerColor,
    layerAlpha,
    1.0,
    bitcast<u32>(u.y),
    input.uv * 8192.0,
    u.x
  );
}
`;var li=class{device;pipeline;sampler;bindGroupLayout;uniformBuffer;constructor(e){this.device=e,this.sampler=e.createSampler({magFilter:`linear`,minFilter:`linear`});let t=e.createShaderModule({label:`media-blend`,code:ci});this.bindGroupLayout=e.createBindGroupLayout({label:`media-blend-layout`,entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:`uniform`}}]}),this.pipeline=e.createRenderPipeline({label:`media-blend-pipeline`,layout:e.createPipelineLayout({bindGroupLayouts:[this.bindGroupLayout]}),vertex:{module:t,entryPoint:`vertexMain`},fragment:{module:t,entryPoint:`fragmentMain`,targets:[{format:`rgba8unorm`}]},primitive:{topology:`triangle-list`}}),this.uniformBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}blend(e,t,n,r,i=1){if(e.width!==t.width||e.height!==t.height||n.width!==e.width||n.height!==e.height)return!1;let a=new Float32Array([i,0,0,0]);new Uint32Array(a.buffer,4,1)[0]=oi[r]??0,this.device.queue.writeBuffer(this.uniformBuffer,0,a);let o=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:this.sampler},{binding:1,resource:e.createView()},{binding:2,resource:t.createView()},{binding:3,resource:{buffer:this.uniformBuffer}}]}),s=this.device.createCommandEncoder(),c=s.beginRenderPass({colorAttachments:[{view:n.createView(),loadOp:`clear`,clearValue:{r:0,g:0,b:0,a:0},storeOp:`store`}]});return c.setPipeline(this.pipeline),c.setBindGroup(0,o),c.draw(6),c.end(),this.device.queue.submit([s.finish()]),!0}destroy(){this.uniformBuffer.destroy()}};const ui=`
${I}

struct ShapeUniforms {
  outputSize: vec2f,
  shapeKind: f32,
  opacity: f32,
  transformRect: vec4f,
  fillColor: vec4f,
  strokeColor: vec4f,
  shapeParams: vec4f,
  flags: vec4f,
  trimParams: vec4f,
  taperParams: vec4f,
  gradientEndColor: vec4f,
  gradientParams: vec4f,
  pathVertices: array<vec4f, 32>,
};

@group(0) @binding(0) var<uniform> u: ShapeUniforms;

fn sdBox(p: vec2f, b: vec2f) -> f32 {
  let q = abs(p) - b;
  return length(max(q, vec2f(0.0))) + min(max(q.x, q.y), 0.0);
}

fn sdRoundedBox(p: vec2f, b: vec2f, r: f32) -> f32 {
  return sdBox(p, max(b - vec2f(r), vec2f(0.0))) - r;
}

fn sdEllipse(p: vec2f, r: vec2f) -> f32 {
  let q = p / max(r, vec2f(0.001));
  return (length(q) - 1.0) * min(r.x, r.y);
}

fn cross2(a: vec2f, b: vec2f) -> f32 {
  return a.x * b.y - a.y * b.x;
}

fn sdSegment(p: vec2f, a: vec2f, b: vec2f) -> f32 {
  let pa = p - a;
  let ba = b - a;
  let h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.001), 0.0, 1.0);
  return length(pa - ba * h);
}

fn triangleSigned(p: vec2f, a: vec2f, b: vec2f, c: vec2f) -> f32 {
  let edgeDistance = min(min(sdSegment(p, a, b), sdSegment(p, b, c)), sdSegment(p, c, a));
  let s0 = cross2(b - a, p - a);
  let s1 = cross2(c - b, p - b);
  let s2 = cross2(a - c, p - c);
  let hasNegative = s0 < 0.0 || s1 < 0.0 || s2 < 0.0;
  let hasPositive = s0 > 0.0 || s1 > 0.0 || s2 > 0.0;
  let outside = hasNegative && hasPositive;
  return select(-edgeDistance, edgeDistance, outside);
}

fn polarShapeDistance(p: vec2f, points: f32, innerRatio: f32, star: bool) -> f32 {
  let angle = atan2(p.y, p.x) + 1.57079632679;
  let n = max(points, 3.0);
  let outer = 1.0;
  let inner = clamp(innerRatio, 0.05, 0.95);
  let sector = 6.28318530718 / n;
  let local = abs(fract(angle / sector + 0.5) - 0.5) * sector;
  let edgeRadius = select(cos(3.14159265359 / n) / max(cos(local), 0.001), mix(inner, outer, local / (sector * 0.5)), star);
  return length(p) - edgeRadius;
}

fn heartDistance(p: vec2f) -> f32 {
  let q = vec2f(p.x, -p.y * 1.12 + 0.18);
  let a = q.x * q.x + q.y * q.y - 1.0;
  let implicit = a * a * a - q.x * q.x * q.y * q.y * q.y;
  return implicit * 18.0;
}

fn pathDistanceAndProgress(p: vec2f, count: u32, closed: bool) -> vec2f {
  var minDistance = 1.0e6;
  var closestProgress = 0.0;
  var inside = false;
  let segmentCount = select(max(count, 1u) - 1u, count, closed);
  for (var i = 0u; i < 32u; i = i + 1u) {
    if (i >= segmentCount) {
      break;
    }
    let currentData = u.pathVertices[i];
    let nextIndex = select(i + 1u, 0u, i + 1u >= count);
    let nextData = u.pathVertices[nextIndex];
    let current = currentData.xy;
    let next = nextData.xy;
    let segment = next - current;
    let h = clamp(dot(p - current, segment) / max(dot(segment, segment), 0.001), 0.0, 1.0);
    let candidateDistance = length(p - (current + segment * h));
    if (candidateDistance < minDistance) {
      minDistance = candidateDistance;
      let nextProgress = select(nextData.z, 1.0, closed && nextIndex == 0u);
      closestProgress = mix(currentData.z, nextProgress, h);
    }
    let dy = next.y - current.y;
    let safeDy = select(select(0.00001, -0.00001, dy < 0.0), dy, abs(dy) > 0.00001);
    let crosses = ((next.y > p.y) != (current.y > p.y)) &&
      (p.x < (next.x - current.x) * (p.y - current.y) / safeDy + current.x);
    if (closed && crosses) {
      inside = !inside;
    }
  }
  return vec2f(select(minDistance, -minDistance, inside), closestProgress);
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let pixel = input.uv * u.outputSize;
  let halfSize = u.transformRect.zw * 0.5;
  let center = u.transformRect.xy + halfSize;
  let relative = pixel - center;
  let cosR = cos(-u.flags.x);
  let sinR = sin(-u.flags.x);
  let localPx = vec2f(relative.x * cosR - relative.y * sinR, relative.x * sinR + relative.y * cosR);
  var d = 1.0e6;
  var outlineProgress = fract((atan2(localPx.y, localPx.x) + 1.57079632679) / 6.28318530718 + 1.0);
  if (u.shapeKind < 0.5) {
    d = sdRoundedBox(localPx, halfSize, u.shapeParams.x);
  } else if (u.shapeKind < 2.5) {
    d = sdEllipse(localPx, halfSize);
  } else if (u.shapeKind < 3.5) {
    let dir = u.flags.z;
    var a = vec2f(0.0, -halfSize.y);
    var b = vec2f(halfSize.x, halfSize.y);
    var c = vec2f(-halfSize.x, halfSize.y);
    if (dir > 0.5 && dir < 1.5) {
      a = vec2f(0.0, halfSize.y); b = vec2f(-halfSize.x, -halfSize.y); c = vec2f(halfSize.x, -halfSize.y);
    } else if (dir > 1.5 && dir < 2.5) {
      a = vec2f(-halfSize.x, 0.0); b = vec2f(halfSize.x, -halfSize.y); c = vec2f(halfSize.x, halfSize.y);
    } else if (dir > 2.5) {
      a = vec2f(halfSize.x, 0.0); b = vec2f(-halfSize.x, halfSize.y); c = vec2f(-halfSize.x, -halfSize.y);
    }
    d = triangleSigned(localPx, a, b, c);
  } else if (u.shapeKind > 5.5 && u.shapeKind < 6.5) {
    let heartBase = min(halfSize.x, halfSize.y);
    let heartHalf = vec2f(heartBase, heartBase / 1.1);
    d = heartDistance(localPx / max(heartHalf, vec2f(0.001))) * heartBase;
  } else if (u.shapeKind > 6.5 && u.shapeKind < 7.5) {
    let pathResult = pathDistanceAndProgress(localPx, u32(u.shapeParams.z), u.flags.y > 0.5);
    d = pathResult.x;
    outlineProgress = pathResult.y;
  } else {
    let normalized = localPx / max(halfSize, vec2f(0.001));
    d = polarShapeDistance(normalized, u.shapeParams.z, u.shapeParams.w, u.shapeKind > 4.5) * min(halfSize.x, halfSize.y);
  }

  let usesAnalyticOutline = u.shapeKind < 0.5 || (u.shapeKind > 3.5 && u.shapeKind < 6.5);
  if (usesAnalyticOutline && u.flags.y > 1.5) {
    outlineProgress = pathDistanceAndProgress(localPx, u32(u.flags.y), true).y;
  }

  let edgeSoftness = max(u.flags.w, 0.75);
  let fillAlpha = 1.0 - smoothstep(-edgeSoftness, edgeSoftness, d);
  var taperProgress = outlineProgress;
  var strokeVisible = true;
  if (u.trimParams.w > 0.5) {
    outlineProgress = fract(outlineProgress - u.trimParams.z + 1.0);
    let trimStart = u.trimParams.x;
    let trimEnd = u.trimParams.y;
    strokeVisible = select(
      outlineProgress >= trimStart || outlineProgress < trimEnd,
      outlineProgress >= trimStart && outlineProgress < trimEnd,
      trimEnd >= trimStart,
    );
    let visibleLength = select(1.0 - trimStart + trimEnd, trimEnd - trimStart, trimEnd >= trimStart);
    taperProgress = clamp(fract(outlineProgress - trimStart + 1.0) / max(visibleLength, 0.001), 0.0, 1.0);
  }
  let startScale = select(
    1.0,
    mix(u.taperParams.x, 1.0, taperProgress / max(u.taperParams.z, 0.001)),
    u.taperParams.z > 0.0 && taperProgress < u.taperParams.z,
  );
  let distanceFromEnd = 1.0 - taperProgress;
  let endScale = select(
    1.0,
    mix(u.taperParams.y, 1.0, distanceFromEnd / max(u.taperParams.w, 0.001)),
    u.taperParams.w > 0.0 && distanceFromEnd < u.taperParams.w,
  );
  let strokeWidth = max(u.shapeParams.y * startScale * endScale, 0.0);
  var strokeAlpha = select(0.0, 1.0 - smoothstep(strokeWidth - 0.75, strokeWidth + 0.75, abs(d)), strokeWidth > 0.0 && strokeVisible);
  let gradientDirection = vec2f(cos(u.gradientParams.x), sin(u.gradientParams.x));
  let gradientExtent = 0.5 / max(max(abs(gradientDirection.x), abs(gradientDirection.y)), 0.000001);
  let gradientStart = vec2f(0.5) - gradientDirection * gradientExtent;
  let gradientEnd = vec2f(0.5) + gradientDirection * gradientExtent;
  let localUv = localPx / max(u.transformRect.zw, vec2f(0.001)) + vec2f(0.5);
  let gradientVector = gradientEnd - gradientStart;
  let gradientProgress = clamp(
    dot(localUv - gradientStart, gradientVector) / max(dot(gradientVector, gradientVector), 0.000001),
    0.0,
    1.0,
  );
  let gradientColor = mix(u.fillColor, u.gradientEndColor, gradientProgress);
  let paintedFill = select(u.fillColor, gradientColor, u.gradientParams.y > 0.5);
  let color = mix(paintedFill, u.strokeColor, strokeAlpha);
  let alpha = max(fillAlpha, strokeAlpha) * color.a * u.opacity;
  return vec4f(color.rgb, alpha);
}
`;var di=class{device;replacePipeline;blendPipeline;bindGroupLayout;uniformBuffer;bindGroup=null;constructor(e){this.device=e;let t=e.createShaderModule({label:`shape-render`,code:ui});this.bindGroupLayout=e.createBindGroupLayout({label:`shape-render-layout`,entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:`uniform`}}]}),this.replacePipeline=this.createRenderPipeline(t,!1),this.blendPipeline=this.createRenderPipeline(t,!0),this.uniformBuffer=e.createBuffer({size:168*Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}createRenderPipeline(e,t){return this.device.createRenderPipeline({label:`shape-render-pipeline`,layout:this.device.createPipelineLayout({bindGroupLayouts:[this.bindGroupLayout]}),vertex:{module:e,entryPoint:`vertexMain`},fragment:{module:e,entryPoint:`fragmentMain`,targets:[{format:`rgba8unorm`,blend:t?{color:{srcFactor:`src-alpha`,dstFactor:`one-minus-src-alpha`,operation:`add`},alpha:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`,operation:`add`}}:void 0}]},primitive:{topology:`triangle-list`}})}renderShapeToTexture(e,t){if(e.width!==t.outputWidth||e.height!==t.outputHeight)return!1;let n=fi(t.shapeType);if(n===null)return!1;let r=t.direction===`down`?1:t.direction===`left`?2:t.direction===`right`?3:0,i=t.strokeColor??t.fillColor,a=t.shapeType===`path`?t.pathVertices??[]:mi(t),o=Math.max(0,Math.min(100,t.trimPathStart??0)),s=Math.max(0,Math.min(100,t.trimPathEnd??100)),c=o!==0||s!==100,l=t.gradientEndColor??t.fillColor,u=new Float32Array([t.outputWidth,t.outputHeight,n,t.opacity??1,t.transformRect.x,t.transformRect.y,t.transformRect.width,t.transformRect.height,...t.fillColor,...i,t.cornerRadius??0,t.strokeWidth??0,t.shapeType===`path`?a.length:t.points??(t.shapeType===`polygon`?6:5),t.innerRadius??.5,t.rotationRad??0,t.shapeType===`path`?t.pathClosed===!1?0:1:a.length,r,t.maskFeatherPixels??0,o/100,s/100,(t.trimPathOffset??0)/360,+!!c,Math.max(0,t.taperStartWidth??100)/100,Math.max(0,t.taperEndWidth??100)/100,Math.max(0,Math.min(100,t.taperStartLength??0))/100,Math.max(0,Math.min(100,t.taperEndLength??0))/100,...l,t.gradientAngleRad??0,+!!t.gradientEndColor,0,0,...pi(a)]);this.device.queue.writeBuffer(this.uniformBuffer,0,u);let d=this.ensureBindGroup(),f=this.device.createCommandEncoder(),p=f.beginRenderPass({colorAttachments:[{view:e.createView(),loadOp:t.clear===!1?`load`:`clear`,clearValue:{r:0,g:0,b:0,a:0},storeOp:`store`}]});return p.setPipeline(t.blend?this.blendPipeline:this.replacePipeline),p.setBindGroup(0,d),p.draw(6),p.end(),this.device.queue.submit([f.finish()]),!0}destroy(){this.uniformBuffer.destroy()}ensureBindGroup(){return this.bindGroup||=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:this.uniformBuffer}}]}),this.bindGroup}};function fi(e){switch(e){case`rectangle`:return 0;case`circle`:return 1;case`ellipse`:return 2;case`triangle`:return 3;case`polygon`:return 4;case`star`:return 5;case`heart`:return 6;case`path`:return 7;default:return null}}function pi(e){let t=[];for(let n=0;n<32;n++){let r=e[n]??[0,0];t.push(r[0],r[1],r[2]??0,0)}return t}function mi(e){let t=e.transformRect.width/2,n=e.transformRect.height/2,r=[];if(e.shapeType===`rectangle`)r=hi(t,n,e.cornerRadius??0);else if(e.shapeType===`polygon`||e.shapeType===`star`){let i=Math.max(3,Math.round(e.points??(e.shapeType===`polygon`?6:5))),a=e.shapeType===`star`?i*2:i,o=Math.max(.05,Math.min(.95,e.innerRadius??.5));r=Array.from({length:a},(r,i)=>{let s=i*Math.PI*2/a-Math.PI/2,c=e.shapeType===`star`&&i%2==1?o:1;return[Math.cos(s)*t*c,Math.sin(s)*n*c]})}else e.shapeType===`heart`&&(r=gi(Math.min(t,n)));return vi(_i(r,32))}function hi(e,t,n){let r=Math.max(0,Math.min(n,e,t));if(r===0)return[[-e,-t],[e,-t],[e,t],[-e,t]];let i=[[-e+r,-t]],a=[[e-r,-t+r,-Math.PI/2],[e-r,t-r,0],[-e+r,t-r,Math.PI/2],[-e+r,-t+r,Math.PI]];for(let[e,t,n]of a)for(let a=0;a<=4;a++){let o=n+a/4*(Math.PI/2),s=[e+Math.cos(o)*r,t+Math.sin(o)*r],c=i.at(-1);(!c||c[0]!==s[0]||c[1]!==s[1])&&i.push(s)}return i.pop(),i}function gi(e){let t=e*2,n=t/1.1,r=e=>e-t/2,i=e=>e-n/2,a=23/110*t,o=.69*n,s=.6*n,c=.13*n,l=29/110*t,u=15/110*t,d=5/110*t,f=.07*n,p=.17*n,m=[[[r(t/2),i(n)],[r(t/2-a),i(o)],[r(0),i(s)],[r(0),i(n/4)]],[[r(0),i(n/4)],[r(0),i(c)],[r(t/4-l/2),i(0)],[r(t/4),i(0)]],[[r(t/4),i(0)],[r(t/4+l/2),i(0)],[r(t/2-d),i(f)],[r(t/2),i(p)]],[[r(t/2),i(p)],[r(t/2+d),i(f)],[r(t/2+u),i(0)],[r(t/4*3),i(0)]],[[r(t/4*3),i(0)],[r(t/4*3+l/2),i(0)],[r(t),i(c)],[r(t),i(n/4)]],[[r(t),i(n/4)],[r(t),i(s)],[r(t/2+a),i(o)],[r(t/2),i(n)]]],h=[m[0][0]];for(let[e,t,n,r]of m)for(let i=1;i<=5;i++){let a=i/5,o=1-a;h.push([o**3*e[0]+3*o**2*a*t[0]+3*o*a**2*n[0]+a**3*r[0],o**3*e[1]+3*o**2*a*t[1]+3*o*a**2*n[1]+a**3*r[1]])}return h.pop(),h}function _i(e,t){if(e.length<=t)return e;let n=vi(e);return Array.from({length:t},(e,r)=>{let i=r/t,a=n.findIndex(e=>e[2]>i),o=a<0?[n[0][0],n[0][1],1]:n[a],s=a<0?n.at(-1):n[Math.max(0,a-1)],c=a<0?s[2]:a===0?0:s[2],l=(i-c)/Math.max(o[2]-c,2**-52);return[s[0]+(o[0]-s[0])*l,s[1]+(o[1]-s[1])*l]})}function vi(e){if(e.length<2)return[];let t=e.map((t,n)=>{if(n===0)return 0;let r=e[n-1];return Math.hypot(t[0]-r[0],t[1]-r[1])}),n=e.at(-1),r=e[0],i=t.reduce((e,t)=>e+t,0)+Math.hypot(r[0]-n[0],r[1]-n[1]),a=0;return e.map((e,n)=>(a+=t[n],[e[0],e[1],i>0?a/i:0]))}const yi=Math.PI*2;function bi(e){return e<0?0:e>1?1:e}function xi(e){let t=(e%4096+4096)%4096,n=Math.sin(t*12.9898+78.233)*43758.5453;return n-Math.floor(n)}const Si={durationFrames:12,staggerFrames:3,intensity:1,order:`forward`,easing:`ease-out`,seed:0};function K(e){return{id:e.id,slot:e.slot,labelKey:`textMotion.presets.${e.id}`,unit:e.unit,defaults:{...Si,...e.defaults},channels:e.channels}}const Ci={typewriter:K({id:`typewriter`,slot:`in`,unit:`character`,defaults:{durationFrames:1,staggerFrames:2,easing:`linear`},channels:e=>({alpha:+(e>=1)})}),"fade-up":K({id:`fade-up`,slot:`in`,unit:`word`,channels:(e,t)=>({alpha:bi(e),dy:(1-e)*.25*t.fontSize*t.intensity})}),rise:K({id:`rise`,slot:`in`,unit:`word`,defaults:{durationFrames:14,staggerFrames:4},channels:(e,t)=>({alpha:bi(e*1.5),dy:(1-e)*.6*t.fontSize*t.intensity})}),cascade:K({id:`cascade`,slot:`in`,unit:`character`,defaults:{durationFrames:10,staggerFrames:1},channels:(e,t)=>({alpha:bi(e),dy:-(1-e)*.8*t.fontSize*t.intensity})}),pop:K({id:`pop`,slot:`in`,unit:`word`,defaults:{durationFrames:10,easing:`overshoot`},channels:(e,t)=>({alpha:bi(e*2),scale:Math.max(0,1+(e-1)*t.intensity)})}),"blur-in":K({id:`blur-in`,slot:`in`,unit:`word`,defaults:{durationFrames:14},channels:(e,t)=>({alpha:bi(e),soften:Math.max(0,(1-e)*.4*t.fontSize*t.intensity)})}),"slide-mask":K({id:`slide-mask`,slot:`in`,unit:`line`,defaults:{staggerFrames:5},channels:(e,t)=>({dx:-(1-e)*t.boxWidth*t.intensity})}),"wave-in":K({id:`wave-in`,slot:`in`,unit:`character`,defaults:{staggerFrames:1},channels:(e,t)=>({alpha:bi(e),dy:(1-e)*Math.sin(t.unitIndex*.9)*.5*t.fontSize*t.intensity})}),"fade-down":K({id:`fade-down`,slot:`out`,unit:`word`,defaults:{easing:`ease-in`},channels:(e,t)=>({alpha:bi(1-e),dy:e*.25*t.fontSize*t.intensity})}),sink:K({id:`sink`,slot:`out`,unit:`word`,defaults:{durationFrames:14,staggerFrames:4,easing:`ease-in`},channels:(e,t)=>({alpha:bi(1-e),dy:e*.6*t.fontSize*t.intensity})}),"pop-out":K({id:`pop-out`,slot:`out`,unit:`word`,defaults:{durationFrames:10,easing:`ease-in`},channels:(e,t)=>({alpha:bi(1-e),scale:Math.max(0,1-e*t.intensity)})}),"blur-out":K({id:`blur-out`,slot:`out`,unit:`word`,defaults:{durationFrames:14,easing:`ease-in`},channels:(e,t)=>({alpha:bi(1-e),soften:Math.max(0,e*.4*t.fontSize*t.intensity)})}),"typewriter-erase":K({id:`typewriter-erase`,slot:`out`,unit:`character`,defaults:{durationFrames:1,staggerFrames:2,easing:`linear`,order:`backward`},channels:e=>({alpha:e>=1?0:1})}),pulse:K({id:`pulse`,slot:`loop`,unit:`word`,defaults:{durationFrames:36,staggerFrames:0,easing:`linear`},channels:(e,t)=>({scale:1+.06*t.intensity*Math.sin(yi*e)})}),wave:K({id:`wave`,slot:`loop`,unit:`character`,defaults:{durationFrames:30,staggerFrames:3,easing:`linear`},channels:(e,t)=>({dy:.18*t.fontSize*t.intensity*Math.sin(yi*e)})}),shimmer:K({id:`shimmer`,slot:`loop`,unit:`word`,defaults:{durationFrames:24,staggerFrames:0,easing:`linear`},channels:(e,t)=>({alpha:bi(1-.35*t.intensity*(.5+.5*Math.sin(yi*(e+xi(t.seed*31+t.unitIndex)))))})}),swing:K({id:`swing`,slot:`loop`,unit:`character`,defaults:{durationFrames:32,staggerFrames:2,easing:`linear`},channels:(e,t)=>({rotation:.09*t.intensity*Math.sin(yi*e)})})};function wi(e){return Ci[e]}ce.map(e=>Ci[e]),le.map(e=>Ci[e]),ue.map(e=>Ci[e]);const Ti={dx:0,dy:0,scale:1,rotation:0,alpha:1,soften:0};function Ei(e){return e.dx===0&&e.dy===0&&e.scale===1&&e.rotation===0&&e.alpha===1&&e.soften===0}function Di(e){let t=e-1;return 1+2.70158*t*t*t+1.70158*t*t}function Oi(e,t){switch(t){case`linear`:return e;case`ease-in`:return ee(e);case`ease-out`:return j(e);case`ease-in-out`:return f(e);case`overshoot`:return Di(e);default:return t}}function ki(e){let t=(e|0)+2654435769;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const Ai=/* @__PURE__ */ new Map;function ji(e,t){let n=`${e}:${t}`,r=Ai.get(n);if(r)return r;let i=Array.from({length:e},(e,t)=>t),a=ki(t);for(let t=e-1;t>0;t--){let e=Math.floor(a()*(t+1)),n=i[t]??t;i[t]=i[e]??e,i[e]=n}let o=Array(e).fill(0);if(i.forEach((e,t)=>{o[e]=t}),Ai.size>=32){let e=Ai.keys().next().value;e!==void 0&&Ai.delete(e)}return Ai.set(n,o),o}function Mi(e,t,n,r){switch(e){case`forward`:return t;case`backward`:return n-1-t;case`center`:return Math.floor(Math.abs(t-(n-1)/2));case`random`:return ji(n,r)[t]??t;default:return e}}function Ni(e,t){return e===`center`?Math.floor((t-1)/2):Math.max(0,t-1)}function Pi(e,t,n){let r=Math.max(0,e.durationFrames),i=Math.max(0,e.staggerFrames),a=r+i*Ni(e.order,t),o=n/2;if(a>o&&a>0){let e=o/a;return{duration:r*e,stagger:i*e,totalWindow:o}}return{duration:r,stagger:i,totalWindow:a}}function Fi(e,t,n){return{unitIndex:t.unitIndex,unitCount:n,fontSize:t.fontSize,boxWidth:t.boxWidth,boxHeight:t.boxHeight,intensity:se(e.intensity,0,2),seed:e.seed}}function Ii(e){let t={...Ti,...e};return Ei(t)?null:t}function Li(e,t,n,r,i){let a=Mi(e.order,r.unitIndex,i,e.seed)*n.stagger,o=Oi(n.duration<=0?+(t>=a):se((t-a)/n.duration,0,1),e.easing);return Ii(wi(e.presetId).channels(o,Fi(e,r,i)))}function Ri(e,t,n,r){let i=Math.max(1e-6,e.durationFrames),a=Mi(e.order,n.unitIndex,r,e.seed)*Math.max(0,e.staggerFrames),o=n.relativeFrame-t-a;if(o<=0)return null;let s=o/i%1;return Ii(wi(e.presetId).channels(s,Fi(e,n,r)))}function zi(e,t,n,r){if(n<=0)return null;let i=e.out?Pi(e.out,r,n):null;if(e.out&&i){let r=n-Math.min(Math.max(0,e.out.offsetFrames??0),Math.max(0,n-i.totalWindow))-i.totalWindow;if(t>=r)return{slot:`out`,effect:e.out,window:i,startFrame:r}}let a=e.in?Pi(e.in,r,n):null,o=e.in&&a?Math.min(Math.max(0,e.in.offsetFrames??0),Math.max(0,n-a.totalWindow)):0;return e.in&&a&&t<o+a.totalWindow?{slot:`in`,effect:e.in,window:a,startFrame:o}:e.loop?{slot:`loop`,effect:e.loop,window:null,startFrame:o+(a?.totalWindow??0)}:null}function Bi(e,t){let n=Math.max(1,t.unitCount),r=zi(e,t.relativeFrame,t.durationInFrames,n);return r?r.window?Li(r.effect,t.relativeFrame-r.startFrame,r.window,t,n):Ri(r.effect,r.startFrame,t,n):null}function Vi(e,t,n){return zi(e,t,n,2**53-1)?.slot??null}function Hi(e,t,n,r){if(r<=0||t<0)return!1;let i=r/2;if(e.loop)return!0;if(e.in){let n=Math.max(0,e.in.offsetFrames??0),a=e.in.staggerFrames>0?i:Math.min(Math.max(0,e.in.durationFrames),i);if(t<Math.min(r,n+a))return!0}if(e.out){let n=Math.max(0,e.out.offsetFrames??0),a=e.out.staggerFrames>0?i:Math.min(Math.max(0,e.out.durationFrames),i);if(t>=Math.max(0,r-n-a))return!0}return!1}const Ui=/\s/u;function Wi(e){return Ui.test(e)}let Gi=null,Ki;function qi(){let e=typeof Intl<`u`?Intl.Segmenter:void 0;return typeof e==`function`?(e!==Ki&&(Ki=e,Gi=new e(void 0,{granularity:`word`})),Gi):null}function Ji(e,t,n){let r=[],i=null,a=[];for(let o of t.segment(e)){if(o.isWordLike){let e=n++;for(let t of a)r[t]=e;a=[],i=e;let t=Array.from(o.segment).length;for(let n=0;n<t;n++)r.push(e);continue}for(let e of o.segment)Wi(e)?r.push(null):i===null?(a.push(r.length),r.push(null)):r.push(i)}if(a.length>0){let e=n++;for(let t of a)r[t]=e}return{indices:r,nextUnit:n}}function Yi(e,t){let n=[],r=!1;for(let i of e)Wi(i)?(n.push(null),r=!1):(r||(r=!0,t++),n.push(t-1));return{indices:n,nextUnit:t}}function Xi(e,t){let n=[];if(t===`whole-clip`)return e.forEach(e=>{n.push(Array.from(e,e=>Wi(e)?null:0))}),{lineUnitIndices:n,unitCount:1};if(t===`line`)return e.forEach((e,t)=>{n.push(Array.from(e,()=>t))}),{lineUnitIndices:n,unitCount:e.length};if(t===`character`){let t=0;for(let r of e){let e=[];for(let n of r)e.push(Wi(n)?null:t++);n.push(e)}return{lineUnitIndices:n,unitCount:t}}let r=qi(),i=0;for(let t of e){let e=r?Ji(t,r,i):Yi(t,i);n.push(e.indices),i=e.nextUnit}return{lineUnitIndices:n,unitCount:i}}const Zi=2048,Qi=4096,$i=`__solid__`;var ea=class{device;atlasTexture;sampler;uniformBuffer;vertexBuffer;bindGroup;pipeline;glyphs=/* @__PURE__ */ new Map;scratchCanvas;scratchCtx;nextX=0;nextY=0;rowHeight=0;atlasExhausted=!1;constructor(e){this.device=e;let t=new OffscreenCanvas(1,1),n=t.getContext(`2d`,{willReadFrequently:!0});if(!n)throw Error(`Unable to create glyph atlas canvas context`);this.scratchCanvas=t,this.scratchCtx=n,this.atlasTexture=e.createTexture({label:`glyph-atlas-texture`,size:{width:Zi,height:Zi},format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),this.sampler=e.createSampler({magFilter:`linear`,minFilter:`linear`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`}),this.uniformBuffer=e.createBuffer({label:`glyph-atlas-text-uniforms`,size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.vertexBuffer=e.createBuffer({label:`glyph-atlas-text-vertices`,size:Qi*6*20*4,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});let r=e.createShaderModule({label:`glyph-atlas-text`,code:`
struct VertexInput {
  @location(0) position: vec2f,
  @location(1) atlasUv: vec2f,
  @location(2) color: vec4f,
  @location(3) solidMode: f32,
  @location(4) solidRect: vec4f,
  @location(5) solidRadius: f32,
  @location(6) strokeColor: vec4f,
  @location(7) strokeWidth: f32,
  @location(8) shadowBlur: f32,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) atlasUv: vec2f,
  @location(1) color: vec4f,
  @location(2) pixel: vec2f,
  @location(3) solidMode: f32,
  @location(4) solidRect: vec4f,
  @location(5) solidRadius: f32,
  @location(6) strokeColor: vec4f,
  @location(7) strokeWidth: f32,
  @location(8) shadowBlur: f32,
};

struct TextUniforms {
  outputSize: vec2f,
  atlasSize: vec2f,
};

@group(0) @binding(0) var atlasSampler: sampler;
@group(0) @binding(1) var atlasTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> u: TextUniforms;

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  let clip = vec2f(
    input.position.x / u.outputSize.x * 2.0 - 1.0,
    1.0 - input.position.y / u.outputSize.y * 2.0
  );
  var output: VertexOutput;
  output.position = vec4f(clip, 0.0, 1.0);
  output.atlasUv = input.atlasUv;
  output.color = input.color;
  output.pixel = input.position;
  output.solidMode = input.solidMode;
  output.solidRect = input.solidRect;
  output.solidRadius = input.solidRadius;
  output.strokeColor = input.strokeColor;
  output.strokeWidth = input.strokeWidth;
  output.shadowBlur = input.shadowBlur;
  return output;
}

fn sdRoundedBox(p: vec2f, b: vec2f, r: f32) -> f32 {
  let radius = min(r, min(b.x, b.y));
  let q = abs(p) - max(b - vec2f(radius), vec2f(0.0));
  return length(max(q, vec2f(0.0))) + min(max(q.x, q.y), 0.0) - radius;
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let distanceAlpha = textureSample(atlasTex, atlasSampler, input.atlasUv).a;
  let halfSize = input.solidRect.zw * 0.5;
  let center = input.solidRect.xy + halfSize;
  let rectDistance = sdRoundedBox(input.pixel - center, halfSize, input.solidRadius);
  let solidAlpha = 1.0 - smoothstep(-0.75, 0.75, rectDistance);
  let blurBand = input.shadowBlur / 32.0;
  let glyphEdgeMin = 0.48 - blurBand;
  let glyphEdgeMax = 0.54 + blurBand;
  let fillAlpha = smoothstep(glyphEdgeMin, glyphEdgeMax, distanceAlpha) * input.color.a;
  let strokeBand = clamp(input.strokeWidth / 16.0, 0.0, 0.49);
  let strokeAlpha = smoothstep(0.5 - strokeBand - 0.04, 0.5 - strokeBand + 0.04, distanceAlpha) * input.strokeColor.a;
  let glyphAlpha = fillAlpha + strokeAlpha * (1.0 - fillAlpha);
  let glyphRgb = mix(input.strokeColor.rgb, input.color.rgb, select(0.0, fillAlpha / max(glyphAlpha, 0.0001), glyphAlpha > 0.0));
  let alpha = mix(glyphAlpha, solidAlpha * input.color.a, input.solidMode);
  let rgb = mix(glyphRgb, input.color.rgb, input.solidMode);
  return vec4f(rgb, alpha);
}
`}),i=e.createBindGroupLayout({label:`glyph-atlas-text-layout`,entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:`uniform`}}]});this.bindGroup=e.createBindGroup({label:`glyph-atlas-text-bind-group`,layout:i,entries:[{binding:0,resource:this.sampler},{binding:1,resource:this.atlasTexture.createView()},{binding:2,resource:{buffer:this.uniformBuffer}}]}),this.pipeline=e.createRenderPipeline({label:`glyph-atlas-text-pipeline`,layout:e.createPipelineLayout({bindGroupLayouts:[i]}),vertex:{module:r,entryPoint:`vertexMain`,buffers:[{arrayStride:80,attributes:[{shaderLocation:0,offset:0,format:`float32x2`},{shaderLocation:1,offset:8,format:`float32x2`},{shaderLocation:2,offset:16,format:`float32x4`},{shaderLocation:3,offset:32,format:`float32`},{shaderLocation:4,offset:36,format:`float32x4`},{shaderLocation:5,offset:52,format:`float32`},{shaderLocation:6,offset:56,format:`float32x4`},{shaderLocation:7,offset:72,format:`float32`},{shaderLocation:8,offset:76,format:`float32`}]}]},fragment:{module:r,entryPoint:`fragmentMain`,targets:[{format:`rgba8unorm`,blend:{color:{srcFactor:`src-alpha`,dstFactor:`one-minus-src-alpha`,operation:`add`},alpha:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`,operation:`add`}}}]},primitive:{topology:`triangle-list`}})}renderTextToTexture(e,t){if(e.width!==t.outputWidth||e.height!==t.outputHeight)return!1;let n=this.layoutText(t.item,t.width,t.height,t.motion);if(!n&&this.atlasExhausted&&(this.resetAtlas(),n=this.layoutText(t.item,t.width,t.height,t.motion)),!n)return!1;if(n.glyphs.length===0)return this.clearTexture(e);if(n.glyphs.length>Qi)return!1;let r=new Float32Array(n.glyphs.length*6*20),i=0;for(let e of n.glyphs)i=na(r,i,e);this.device.queue.writeBuffer(this.vertexBuffer,0,r,0,i),this.device.queue.writeBuffer(this.uniformBuffer,0,new Float32Array([t.outputWidth,t.outputHeight,Zi,Zi]));let a=this.device.createCommandEncoder(),o=a.beginRenderPass({colorAttachments:[{view:e.createView(),loadOp:`clear`,storeOp:`store`}]});return o.setPipeline(this.pipeline),o.setBindGroup(0,this.bindGroup),o.setVertexBuffer(0,this.vertexBuffer),o.draw(n.glyphs.length*6),o.end(),this.device.queue.submit([a.finish()]),!0}destroy(){this.atlasTexture.destroy(),this.uniformBuffer.destroy(),this.vertexBuffer.destroy()}clearTexture(e){let t=this.device.createCommandEncoder();return t.beginRenderPass({colorAttachments:[{view:e.createView(),loadOp:`clear`,storeOp:`store`}]}).end(),this.device.queue.submit([t.finish()]),!0}layoutText(e,t,n,r){let i=this.createMeasurer(),a=F(e,t,n,i),o=null;if(r){let e=Vi(r.spec,r.relativeFrame,r.durationInFrames),t=e?r.spec[e]:void 0;t&&(o=Xi(a.lines.map(e=>e.text),t.unit??wi(t.presetId).unit))}let s=(e,i)=>{if(r&&o&&e!==null)return Bi(r.spec,{relativeFrame:r.relativeFrame,fps:r.fps,durationInFrames:r.durationInFrames,unitIndex:e,unitCount:o.unitCount,fontSize:i,boxWidth:t,boxHeight:n})??void 0},c=[];if(e.backgroundColor&&a.background){let t=ia(e.backgroundColor),n=this.ensureSolidGlyph();if(!t||!n)return null;let r=a.background;c.push({metrics:n,x:r.x,y:r.y,width:r.width,height:r.height,color:t,solidRadius:r.radius})}let l=e.textShadow,u=l?ia(l.color):void 0;if(l&&!u)return null;let d=Math.max(0,e.stroke?.width??0),f;if(d>0){let t=ia(e.stroke?.color??`#000000`);if(!t)return null;f=t}for(let[e,t]of a.lines.entries()){let n=ia(t.color);if(!n)return null;let r=t.runs?.flatMap(e=>{let t=ia(e.color)??n;return Array.from(e.text,()=>t)}),i=o?.lineUnitIndices[e],a=t.baselineY,p=t.startX,m=0;for(let e of t.text){let h=this.ensureGlyph(e,t.cssFont,t.fontSize);if(!h)return null;if(e!==` `){let e=o?s(i?.[m]??null,t.fontSize):void 0;(!e||e.alpha>0)&&(l&&u&&c.push({metrics:h,x:p+h.offsetX+l.offsetX,y:a+h.offsetY+l.offsetY,width:h.contentWidth,height:h.contentHeight,color:u,shadowBlur:Math.max(0,l.blur),motion:e}),c.push({metrics:h,x:p+h.offsetX,y:a+h.offsetY,width:h.contentWidth,height:h.contentHeight,color:r?.[m]??n,strokeColor:f,strokeWidth:d,motion:e}))}p+=h.advance+t.letterSpacing,m++}let h=N(t);if(t.underline&&h>0){let e=this.ensureSolidGlyph();if(!e)return null;let r;if(o){let e=s(i?.find(e=>e!==null)??null,t.fontSize);e&&(r=e.rotation===0?e:{...e,rotation:0})}if(!r||r.alpha>0){let i=a+Math.max(1,t.fontSize*.08),o=Math.max(1,t.fontSize*.05);l&&u&&c.push({metrics:e,x:t.startX+l.offsetX,y:i+l.offsetY,width:h,height:o,color:u,solidRadius:0,motion:r}),c.push({metrics:e,x:t.startX,y:i,width:h,height:o,color:n,solidRadius:0,motion:r})}}for(let e of t.runs??[]){if(!e.underline)continue;let r=Math.max(0,e.width-t.letterSpacing);if(r<=0)continue;let i=this.ensureSolidGlyph();if(!i)return null;let o=ia(e.color)??n;c.push({metrics:i,x:t.startX+e.offsetX,y:a+Math.max(1,t.fontSize*.08),width:r,height:Math.max(1,t.fontSize*.05),color:o,solidRadius:0,motion:void 0})}}return{glyphs:c}}createMeasurer(){return{measure:(e,t,n)=>{let r=D(t),i=0;for(let n of e)i+=this.ensureGlyph(n,t,r)?.advance??0;return i+e.length*n},fontMetrics:e=>this.measureFont(e,D(e))}}measureFont(e,t){this.scratchCtx.font=e;let n=this.scratchCtx.measureText(`Hg`);return{ascent:n.fontBoundingBoxAscent||t*.8,descent:n.fontBoundingBoxDescent||t*.2}}ensureGlyph(e,t,n){let r=`${t}\n${e}`,i=this.glyphs.get(r);if(i)return i;this.scratchCtx.font=t,this.scratchCtx.textBaseline=`alphabetic`;let a=this.scratchCtx.measureText(e),o=a.actualBoundingBoxAscent||a.fontBoundingBoxAscent||n*.8,s=a.actualBoundingBoxDescent||a.fontBoundingBoxDescent||n*.2,c=a.actualBoundingBoxLeft||0,l=a.actualBoundingBoxRight||a.width,u=Math.max(1,Math.ceil(c+l)),d=Math.max(1,Math.ceil(o+s)),f=u+24,p=d+24,m=this.allocateGlyph(f,p);if(!m)return null;this.scratchCanvas.width=f,this.scratchCanvas.height=p,this.scratchCtx.clearRect(0,0,f,p),this.scratchCtx.font=t,this.scratchCtx.textBaseline=`alphabetic`,this.scratchCtx.fillStyle=`#ffffff`,this.scratchCtx.fillText(e,12+c,12+o);let h=ra(this.scratchCtx.getImageData(0,0,f,p).data,f,p);this.uploadGlyph(m.x,m.y,f,p,h);let g={key:r,char:e,font:t,atlasX:m.x,atlasY:m.y,atlasWidth:f,atlasHeight:p,contentWidth:f,contentHeight:p,offsetX:-12-c,offsetY:-12-o,advance:a.width};return this.glyphs.set(r,g),g}ensureSolidGlyph(){let e=this.glyphs.get($i);if(e)return e;let t=this.allocateGlyph(1,1);if(!t)return null;this.uploadGlyph(t.x,t.y,1,1,new Uint8Array([255,255,255,255]));let n={key:$i,char:``,font:``,atlasX:t.x,atlasY:t.y,atlasWidth:1,atlasHeight:1,contentWidth:1,contentHeight:1,offsetX:0,offsetY:0,advance:0};return this.glyphs.set($i,n),n}allocateGlyph(e,t){if(e>Zi||t>Zi)return null;if(this.nextX+e>Zi&&(this.nextX=0,this.nextY+=this.rowHeight,this.rowHeight=0),this.nextY+t>Zi)return this.atlasExhausted=!0,null;let n={x:this.nextX,y:this.nextY};return this.nextX+=e,this.rowHeight=Math.max(this.rowHeight,t),n}resetAtlas(){this.glyphs.clear(),this.nextX=0,this.nextY=0,this.rowHeight=0,this.atlasExhausted=!1}uploadGlyph(e,t,n,r,i){let a=aa(n*4,256),o=new Uint8Array(a*r);for(let e=0;e<r;e++)o.set(i.subarray(e*n*4,(e+1)*n*4),e*a);this.device.queue.writeTexture({texture:this.atlasTexture,origin:{x:e,y:t}},o,{bytesPerRow:a,rowsPerImage:r},{width:n,height:r})}};function ta(e,t,n,r,i){let a=e+n/2,o=t+r/2,s=Math.cos(i.rotation),c=Math.sin(i.rotation),l=(e,t)=>{let n=(e-a)*i.scale,r=(t-o)*i.scale;return[a+n*s-r*c+i.dx,o+n*c+r*s+i.dy]};return[l(e,t),l(e+n,t),l(e,t+r),l(e+n,t+r)]}function na(e,t,n){let{metrics:r,color:i,motion:a}=n,o=n.x,s=n.y,c=n.x+n.width,l=n.y+n.height,u=r.atlasX/Zi,d=r.atlasY/Zi,f=(r.atlasX+r.atlasWidth)/Zi,p=(r.atlasY+r.atlasHeight)/Zi,[m,h,g,_]=a?ta(o,s,n.width,n.height,a):[[o,s],[c,s],[o,l],[c,l]],v=[[m[0],m[1],u,d],[h[0],h[1],f,d],[g[0],g[1],u,p],[g[0],g[1],u,p],[h[0],h[1],f,d],[_[0],_[1],f,p]],y=n.solidRadius===void 0?0:1,b=n.solidRadius??0,x=n.strokeColor??[0,0,0,0],S=n.strokeWidth??0,C=(n.shadowBlur??0)+(a?.soften??0),w=a?i[3]*a.alpha:i[3],T=a?x[3]*a.alpha:x[3],E=o,D=s,O=n.width,k=n.height;a&&(O=n.width*a.scale,k=n.height*a.scale,E=o+(n.width-O)/2+a.dx,D=s+(n.height-k)/2+a.dy);for(let n of v)e[t++]=n[0]??0,e[t++]=n[1]??0,e[t++]=n[2]??0,e[t++]=n[3]??0,e[t++]=i[0],e[t++]=i[1],e[t++]=i[2],e[t++]=w,e[t++]=y,e[t++]=E,e[t++]=D,e[t++]=O,e[t++]=k,e[t++]=b,e[t++]=x[0],e[t++]=x[1],e[t++]=x[2],e[t++]=T,e[t++]=S,e[t++]=C;return t}function ra(e,t,n){let r=new Uint8Array(t*n);for(let t=0;t<r.length;t++)r[t]=e[t*4+3]??0;let i=new Uint8Array(t*n*4);for(let e=0;e<n;e++)for(let a=0;a<t;a++){let o=e*t+a,s=r[o]>127,c=8;for(let i=-8;i<=8;i++){let o=e+i;if(!(o<0||o>=n))for(let e=-8;e<=8;e++){let n=a+e;n<0||n>=t||r[o*t+n]>127!==s&&(c=Math.min(c,Math.hypot(e,i)))}}let l=s?c:-c,u=Math.max(0,Math.min(255,Math.round((.5+l/16)*255))),d=o*4;i[d]=255,i[d+1]=255,i[d+2]=255,i[d+3]=u}return i}function ia(e){if(e.startsWith(`#`)){let t=e.slice(1);if(t.length===3||t.length===4){let e=t.split(``),n=parseInt(`${e[0]}${e[0]}`,16),r=parseInt(`${e[1]}${e[1]}`,16),i=parseInt(`${e[2]}${e[2]}`,16),a=e[3]?parseInt(`${e[3]}${e[3]}`,16):255;return[n/255,r/255,i/255,a/255]}if(t.length===6||t.length===8){let e=parseInt(t.slice(0,2),16),n=parseInt(t.slice(2,4),16),r=parseInt(t.slice(4,6),16),i=t.length===8?parseInt(t.slice(6,8),16):255;return[e/255,n/255,r/255,i/255]}}return null}function aa(e,t){return Math.ceil(e/t)*t}const oa=n(`CompositorPipeline`),sa=`
${I}

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;

@fragment
fn blitFragment(input: VertexOutput) -> @location(0) vec4f {
  // Composite textures store straight alpha; canvas expects premultiplied
  let c = textureSample(inputTex, texSampler, input.uv);
  return vec4f(c.rgb * c.a, c.a);
}
`,ca=I,la=`
struct CompositeUniforms {
  opacity: f32,            // 0
  blendMode: u32,          // 1
  posX: f32,               // 2
  posY: f32,               // 3
  scaleX: f32,             // 4
  scaleY: f32,             // 5
  rotationZ: f32,          // 6
  sourceAspect: f32,       // 7
  outputAspect: f32,       // 8
  time: f32,               // 9
  hasMask: u32,            // 10
  maskInvert: u32,         // 11
  rotationX: f32,          // 12
  rotationY: f32,          // 13
  perspective: f32,        // 14
  maskFeather: f32,        // 15
};
`,ua=`
${si}
${la}

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var baseTex: texture_2d<f32>;
@group(0) @binding(2) var layerTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> u: CompositeUniforms;
@group(0) @binding(4) var maskTex: texture_2d<f32>;

fn transformUV(uv: vec2f) -> vec2f {
  // Center UV around origin
  var p = uv - vec2f(0.5);

  // Apply scale
  p /= vec2f(u.scaleX, u.scaleY);

  // Apply 2D rotation
  let cosR = cos(u.rotationZ);
  let sinR = sin(u.rotationZ);
  p = vec2f(p.x * cosR + p.y * sinR, -p.x * sinR + p.y * cosR);

  // Apply 3D perspective rotation (X and Y axis)
  if (u.perspective > 0.0) {
    let cosX = cos(u.rotationX);
    let sinX = sin(u.rotationX);
    let cosY = cos(u.rotationY);
    let sinY = sin(u.rotationY);

    // Y-axis rotation
    let pz = p.x * sinY;
    let px = p.x * cosY;
    // X-axis rotation
    let py = p.y * cosX - pz * sinX;
    let pzz = p.y * sinX + pz * cosX;

    // Perspective projection
    let w = 1.0 + pzz / u.perspective;
    if (w <= 0.001) { return vec2f(-1.0); } // behind camera
    p = vec2f(px, py) / w;
  }

  // Apply position offset
  p -= vec2f(u.posX, u.posY);

  // Correct aspect ratio
  p.x *= u.outputAspect / max(u.sourceAspect, 0.001);

  return p + vec2f(0.5);
}

@fragment
fn compositeFragment(input: VertexOutput) -> @location(0) vec4f {
  let baseColor = textureSampleLevel(baseTex, texSampler, input.uv, 0.0);

  // Transform UV to sample layer texture
  let layerUV = transformUV(input.uv);
  let inBounds = layerUV.x >= 0.0 && layerUV.x <= 1.0 && layerUV.y >= 0.0 && layerUV.y <= 1.0;
  let sampleUV = clamp(layerUV, vec2f(0.0), vec2f(1.0));
  var layerColor = textureSampleLevel(layerTex, texSampler, sampleUV, 0.0);

  // Apply mask
  var maskValue = 1.0;
  if (u.hasMask != 0u) {
    maskValue = textureSampleLevel(maskTex, texSampler, input.uv, 0.0).a;
    if (u.maskInvert != 0u) {
      maskValue = 1.0 - maskValue;
    }
  }

  let sourceAlpha = layerColor.a * u.opacity;
  let postDissolveAlpha = maskValue * select(0.0, 1.0, inBounds);
  if (sourceAlpha * postDissolveAlpha <= 0.0) {
    return baseColor;
  }

  return compositeBlendSourceOver(
    baseColor,
    layerColor,
    sourceAlpha,
    postDissolveAlpha,
    u.blendMode,
    input.uv * 8192.0,
    u.opacity
  );
}
`,da=`
${si}
${la}

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var baseTex: texture_2d<f32>;
@group(0) @binding(2) var layerTex: texture_external;
@group(0) @binding(3) var<uniform> u: CompositeUniforms;
@group(0) @binding(4) var maskTex: texture_2d<f32>;

fn transformUV_ext(uv: vec2f) -> vec2f {
  var p = uv - vec2f(0.5);
  p /= vec2f(u.scaleX, u.scaleY);
  let cosR = cos(u.rotationZ);
  let sinR = sin(u.rotationZ);
  p = vec2f(p.x * cosR + p.y * sinR, -p.x * sinR + p.y * cosR);
  if (u.perspective > 0.0) {
    let cosX = cos(u.rotationX);
    let sinX = sin(u.rotationX);
    let cosY = cos(u.rotationY);
    let sinY = sin(u.rotationY);
    let pz = p.x * sinY;
    let px = p.x * cosY;
    let py = p.y * cosX - pz * sinX;
    let pzz = p.y * sinX + pz * cosX;
    let w = 1.0 + pzz / u.perspective;
    if (w <= 0.001) { return vec2f(-1.0); }
    p = vec2f(px, py) / w;
  }
  p -= vec2f(u.posX, u.posY);
  p.x *= u.outputAspect / max(u.sourceAspect, 0.001);
  return p + vec2f(0.5);
}

@fragment
fn compositeExternalFragment(input: VertexOutput) -> @location(0) vec4f {
  let baseColor = textureSampleLevel(baseTex, texSampler, input.uv, 0.0);
  let layerUV = transformUV_ext(input.uv);
  let inBounds = layerUV.x >= 0.0 && layerUV.x <= 1.0 && layerUV.y >= 0.0 && layerUV.y <= 1.0;
  let sampleUV = clamp(layerUV, vec2f(0.0), vec2f(1.0));
  var layerColor = textureSampleBaseClampToEdge(layerTex, texSampler, sampleUV);
  var maskValue = 1.0;
  if (u.hasMask != 0u) {
    maskValue = textureSampleLevel(maskTex, texSampler, input.uv, 0.0).a;
    if (u.maskInvert != 0u) { maskValue = 1.0 - maskValue; }
  }
  let sourceAlpha = layerColor.a * u.opacity;
  let postDissolveAlpha = maskValue * select(0.0, 1.0, inBounds);
  if (sourceAlpha * postDissolveAlpha <= 0.0) { return baseColor; }
  return compositeBlendSourceOver(
    baseColor,
    layerColor,
    sourceAlpha,
    postDissolveAlpha,
    u.blendMode,
    input.uv * 8192.0,
    u.opacity
  );
}
`,fa={opacity:1,blendMode:`normal`,posX:0,posY:0,scaleX:1,scaleY:1,rotationZ:0,sourceAspect:16/9,outputAspect:16/9,time:0,hasMask:!1,maskInvert:!1,rotationX:0,rotationY:0,perspective:0,maskFeather:0};function pa(e){let t=/* @__PURE__ */ new Float32Array(16);return t[0]=e.opacity,new Uint32Array(t.buffer,4,1)[0]=oi[e.blendMode]??0,t[2]=e.posX,t[3]=e.posY,t[4]=e.scaleX,t[5]=e.scaleY,t[6]=e.rotationZ,t[7]=e.sourceAspect,t[8]=e.outputAspect,t[9]=e.time,new Uint32Array(t.buffer,40,1)[0]=+!!e.hasMask,new Uint32Array(t.buffer,44,1)[0]=+!!e.maskInvert,t[12]=e.rotationX,t[13]=e.rotationY,t[14]=e.perspective,t[15]=e.maskFeather,t}var ma=class{device;canvasFormat;sampler;layerUniformBuffers=[];regularPipeline=null;regularLayout=null;externalPipeline=null;externalLayout=null;blitPipeline=null;blitLayout=null;pingTexture=null;pongTexture=null;pingView=null;pongView=null;texW=0;texH=0;blitBindGroupPing=null;blitBindGroupPong=null;constructor(e){this.device=e,this.canvasFormat=navigator.gpu.getPreferredCanvasFormat(),this.sampler=e.createSampler({magFilter:`linear`,minFilter:`linear`}),this.createPipelines()}createPipelines(){try{let e=this.device.createShaderModule({label:`compositor-regular`,code:ca+ua});this.regularLayout=this.device.createBindGroupLayout({label:`compositor-regular-layout`,entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:`uniform`}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.regularPipeline=this.device.createRenderPipeline({label:`compositor-regular-pipeline`,layout:this.device.createPipelineLayout({bindGroupLayouts:[this.regularLayout]}),vertex:{module:e,entryPoint:`vertexMain`},fragment:{module:e,entryPoint:`compositeFragment`,targets:[{format:`rgba8unorm`}]},primitive:{topology:`triangle-list`}})}catch(e){oa.warn(`Failed to create regular compositor pipeline`,e)}try{let e=this.device.createShaderModule({label:`compositor-external`,code:ca+da});this.externalLayout=this.device.createBindGroupLayout({label:`compositor-external-layout`,entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,externalTexture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:`uniform`}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.externalPipeline=this.device.createRenderPipeline({label:`compositor-external-pipeline`,layout:this.device.createPipelineLayout({bindGroupLayouts:[this.externalLayout]}),vertex:{module:e,entryPoint:`vertexMain`},fragment:{module:e,entryPoint:`compositeExternalFragment`,targets:[{format:`rgba8unorm`}]},primitive:{topology:`triangle-list`}})}catch{this.externalPipeline=null,this.externalLayout=null}try{let e=this.device.createShaderModule({label:`compositor-blit`,code:sa});this.blitLayout=this.device.createBindGroupLayout({label:`compositor-blit-layout`,entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.blitPipeline=this.device.createRenderPipeline({label:`compositor-blit-pipeline`,layout:this.device.createPipelineLayout({bindGroupLayouts:[this.blitLayout]}),vertex:{module:e,entryPoint:`vertexMain`},fragment:{module:e,entryPoint:`blitFragment`,targets:[{format:this.canvasFormat}]},primitive:{topology:`triangle-list`}})}catch(e){oa.warn(`Failed to create compositor blit pipeline`,e)}}ensurePingPong(e,t){if(this.pingTexture&&this.texW===e&&this.texH===t)return;this.pingTexture?.destroy(),this.pongTexture?.destroy();let n={size:{width:e,height:t},format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC|GPUTextureUsage.COPY_DST};this.pingTexture=this.device.createTexture(n),this.pongTexture=this.device.createTexture(n),this.pingView=this.pingTexture.createView(),this.pongView=this.pongTexture.createView(),this.texW=e,this.texH=t,this.blitBindGroupPing=null,this.blitBindGroupPong=null}getLayerUniformBuffer(e){let t=this.layerUniformBuffers[e];return t||(t=this.device.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.layerUniformBuffers[e]=t),t}writeUniforms(e,t){let n=pa(t);this.device.queue.writeBuffer(e,0,n.buffer)}compositeToTexture(e,t,n,r){if(e.length===0||!this.regularPipeline||!this.regularLayout||(this.ensurePingPong(t,n),!this.pingTexture||!this.pongTexture))return null;for(let t=e.length;t<this.layerUniformBuffers.length;t++)this.layerUniformBuffers[t]?.destroy();this.layerUniformBuffers.length>e.length&&(this.layerUniformBuffers.length=e.length),r.beginRenderPass({colorAttachments:[{view:this.pingView,loadOp:`clear`,clearValue:{r:0,g:0,b:0,a:0},storeOp:`store`}]}).end();let i=this.pingTexture,a=this.pongTexture,o=this.pingView,s=this.pongView;for(let t=0;t<e.length;t++){let n=e[t],c=this.getLayerUniformBuffer(t);this.writeUniforms(c,n.params);let l,u;if(n.externalTexture&&this.externalPipeline&&this.externalLayout)u=this.externalPipeline,l=this.device.createBindGroup({layout:this.externalLayout,entries:[{binding:0,resource:this.sampler},{binding:1,resource:o},{binding:2,resource:n.externalTexture},{binding:3,resource:{buffer:c}},{binding:4,resource:n.maskView}]});else if(n.textureView)u=this.regularPipeline,l=this.device.createBindGroup({layout:this.regularLayout,entries:[{binding:0,resource:this.sampler},{binding:1,resource:o},{binding:2,resource:n.textureView},{binding:3,resource:{buffer:c}},{binding:4,resource:n.maskView}]});else continue;let d=r.beginRenderPass({colorAttachments:[{view:s,loadOp:`clear`,storeOp:`store`}]});d.setPipeline(u),d.setBindGroup(0,l),d.draw(6),d.end();let f=i;i=a,a=f;let p=o;o=s,s=p}return{texture:i,view:o}}compositeToCanvas(e,t,n,r){if(!this.blitPipeline||!this.blitLayout)return!1;let i=this.device.createCommandEncoder(),a=this.compositeToTexture(e,t,n,i);if(!a)return!1;let o=a.texture===this.pingTexture?this.blitBindGroupPing??=this.device.createBindGroup({layout:this.blitLayout,entries:[{binding:0,resource:this.sampler},{binding:1,resource:this.pingView}]}):this.blitBindGroupPong??=this.device.createBindGroup({layout:this.blitLayout,entries:[{binding:0,resource:this.sampler},{binding:1,resource:this.pongView}]});return b({device:this.device,context:r,pipeline:this.blitPipeline,bindGroup:o,encoder:i}),!0}getDevice(){return this.device}destroy(){this.pingTexture?.destroy(),this.pongTexture?.destroy();for(let e of this.layerUniformBuffers)e.destroy();this.pingTexture=null,this.pongTexture=null,this.pingView=null,this.pongView=null,this.blitPipeline=null,this.blitLayout=null,this.blitBindGroupPing=null,this.blitBindGroupPong=null,this.layerUniformBuffers=[]}};const ha=n(`GpuTexturePool`);function ga(e){return e.includes(`32float`)?16:e.includes(`16float`)||e.includes(`16uint`)||e.includes(`16sint`)?8:4}function _a(e){return!e||!Number.isFinite(e)?384e6:Math.max(128e6,Math.min(512e6,Math.round(e*.03125*1e9)))}function va(){return _a(typeof navigator>`u`?void 0:navigator.deviceMemory)}function ya(e,t,n){return`${e}x${t}x${n}`}var ba=class{device;pools=/* @__PURE__ */ new Map;usage;totalCreated=0;totalAcquires=0;cacheHits=0;currentBytes=0;clock=0;maxBytes;maxIdlePerKey;constructor(e,t=GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC|GPUTextureUsage.RENDER_ATTACHMENT,n={}){this.device=e,this.usage=t,this.maxBytes=Math.max(1,n.maxBytes??va()),this.maxIdlePerKey=Math.max(1,n.maxIdlePerKey??24)}acquire(e,t,n=`rgba8unorm`){let r=ya(e,t,n);this.totalAcquires++;let i=this.pools.get(r);if(i){for(let e of i)if(!e.inUse)return e.inUse=!0,e.lastUsed=++this.clock,this.cacheHits++,e.texture}let a=this.device.createTexture({size:{width:e,height:t},format:n,usage:this.usage}),o=e*t*ga(n),s={texture:a,inUse:!0,bytes:o,lastUsed:++this.clock};return i?i.push(s):this.pools.set(r,[s]),this.totalCreated++,this.currentBytes+=o,a}release(e){let t=ya(e.width,e.height,e.format),n=this.pools.get(t);if(n){for(let r of n)if(r.texture===e){r.inUse=!1,r.lastUsed=++this.clock,this.trimIdleEntries(t),this.trimToBudget();return}}}destroy(){for(let e of this.pools.values())for(let t of e)t.texture.destroy();this.pools.clear(),this.currentBytes=0,ha.debug(`Texture pool destroyed`,{totalCreated:this.totalCreated,totalAcquires:this.totalAcquires,cacheHitRate:this.totalAcquires>0?`${(this.cacheHits/this.totalAcquires*100).toFixed(1)}%`:`n/a`})}getStats(){let e=0,t=0;for(let n of this.pools.values())e+=n.length,t+=n.filter(e=>e.inUse).length;return{totalCreated:this.totalCreated,totalAcquires:this.totalAcquires,cacheHits:this.cacheHits,entries:e,inUse:t,bytes:this.currentBytes,budgetBytes:this.maxBytes}}trimIdleEntries(e){let t=this.pools.get(e);if(!t)return;let n=t.filter(e=>!e.inUse).toSorted((e,t)=>e.lastUsed-t.lastUsed);for(;n.length>this.maxIdlePerKey;){let t=n.shift();if(!t)break;this.destroyEntry(e,t)}}trimToBudget(){for(;this.currentBytes>this.maxBytes;){let e=null,t=null;for(let[n,r]of this.pools)for(let i of r)i.inUse||t&&i.lastUsed>=t.lastUsed||(e=n,t=i);if(!t||!e)break;this.destroyEntry(e,t)}}destroyEntry(e,t){let n=this.pools.get(e);if(!n)return;let r=n.indexOf(t);r!==-1&&(n.splice(r,1),t.texture.destroy(),this.currentBytes=Math.max(0,this.currentBytes-t.bytes),n.length===0&&this.pools.delete(e))}};const xa=`
${I}

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var baseMask: texture_2d<f32>;
@group(0) @binding(2) var nextMask: texture_2d<f32>;
@group(0) @binding(3) var<uniform> u: vec4f;

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  var a = textureSampleLevel(baseMask, texSampler, input.uv, 0.0).a;
  var b = textureSampleLevel(nextMask, texSampler, input.uv, 0.0).a;
  if (u.x > 0.5) {
    a = 1.0 - a;
  }
  if (u.y > 0.5) {
    b = 1.0 - b;
  }
  let alpha = a * b;
  return vec4f(1.0, 1.0, 1.0, alpha);
}
`;var Sa=class{device;pipeline;sampler;bindGroupLayout;uniformBuffer;constructor(e){this.device=e,this.sampler=e.createSampler({magFilter:`linear`,minFilter:`linear`});let t=e.createShaderModule({label:`mask-combine`,code:xa});this.bindGroupLayout=e.createBindGroupLayout({label:`mask-combine-layout`,entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:`uniform`}}]}),this.pipeline=e.createRenderPipeline({label:`mask-combine-pipeline`,layout:e.createPipelineLayout({bindGroupLayouts:[this.bindGroupLayout]}),vertex:{module:t,entryPoint:`vertexMain`},fragment:{module:t,entryPoint:`fragmentMain`,targets:[{format:`rgba8unorm`}]},primitive:{topology:`triangle-list`}}),this.uniformBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}combine(e,t,n,r){if(e.width!==t.width||e.height!==t.height||n.width!==e.width||n.height!==e.height)return!1;this.device.queue.writeBuffer(this.uniformBuffer,0,new Float32Array([+!!r?.invertBase,+!!r?.invertNext,0,0]));let i=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:this.sampler},{binding:1,resource:e.createView()},{binding:2,resource:t.createView()},{binding:3,resource:{buffer:this.uniformBuffer}}]}),a=this.device.createCommandEncoder(),o=a.beginRenderPass({colorAttachments:[{view:n.createView(),loadOp:`clear`,clearValue:{r:0,g:0,b:0,a:0},storeOp:`store`}]});return o.setPipeline(this.pipeline),o.setBindGroup(0,i),o.draw(6),o.end(),this.device.queue.submit([a.finish()]),!0}destroy(){this.uniformBuffer.destroy()}},Ca=class{fallbackTexture;fallbackView;constructor(e){this.fallbackTexture=e.createTexture({size:{width:1,height:1},format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),e.queue.writeTexture({texture:this.fallbackTexture},new Uint8Array([255,255,255,255]),{bytesPerRow:4},{width:1,height:1}),this.fallbackView=this.fallbackTexture.createView()}getFallbackView(){return this.fallbackView}destroy(){this.fallbackTexture.destroy()}},wa=class{effects=null;transition=null;media=null;mediaBlend=null;shape=null;text=null;maskCombine=null;compositor=null;texturePool=null;maskManager=null;textTextureCache=/* @__PURE__ */ new Map;bitmapMaskTextureCache=/* @__PURE__ */ new Map;effectsInitPromise=null;compositeCanvas=null;compositeCtx=null;compositeW=0;compositeH=0;compositeConfigureFailed=!1;async ensureEffects(){return this.effects?this.effects:(this.effectsInitPromise||=w.create().then(e=>(this.effects=e,this.effectsInitPromise=null,e)),this.effectsInitPromise)}ensureTransition(){return this.transition?!0:this.effects?(this.transition=ti.create(this.effects.getDevice()),this.transition!==null):!1}ensureMedia(){return this.media?!0:this.effects?(this.media=new ai(this.effects.getDevice()),!0):!1}ensureMediaBlend(){return this.mediaBlend?!0:this.effects?(this.mediaBlend=new li(this.effects.getDevice()),!0):!1}ensureShape(){return this.shape?!0:this.effects?(this.shape=new di(this.effects.getDevice()),!0):!1}ensureText(){return this.text?!0:this.effects?(this.text=new ea(this.effects.getDevice()),!0):!1}ensureMaskCombine(){return this.maskCombine?!0:this.effects?(this.maskCombine=new Sa(this.effects.getDevice()),!0):!1}ensureCompositor(){if(this.compositor)return!0;if(!this.effects)return!1;let e=this.effects.getDevice();return this.compositor=new ma(e),this.texturePool??=new ba(e),this.maskManager=new Ca(e),!0}ensureTexturePool(){if(this.texturePool)return this.texturePool;if(!this.effects)throw Error(`GPU texture pool requested before GPU pipeline initialization`);return this.texturePool=new ba(this.effects.getDevice()),this.texturePool}ensureCompositeOutput(e,t){if(!this.effects)return null;let n=this.compositeW!==e||this.compositeH!==t;if(n&&(this.compositeConfigureFailed=!1),this.compositeConfigureFailed&&this.compositeW===e&&this.compositeH===t)return null;if(this.compositeCanvas||=new OffscreenCanvas(e,t),!this.compositeCtx||n){if((this.compositeCanvas.width!==e||this.compositeCanvas.height!==t)&&(this.compositeCanvas.width=e,this.compositeCanvas.height=t),this.compositeCtx=this.effects.configureCanvas(this.compositeCanvas),this.compositeW=e,this.compositeH=t,!this.compositeCtx)return this.compositeConfigureFailed=!0,null;this.compositeConfigureFailed=!1}return{canvas:this.compositeCanvas,ctx:this.compositeCtx}}dispose(){this.compositor?.destroy(),this.compositor=null,this.texturePool?.destroy(),this.texturePool=null,this.maskManager?.destroy(),this.maskManager=null,this.compositeCtx=null,this.compositeCanvas=null,this.compositeW=0,this.compositeH=0,this.compositeConfigureFailed=!1,this.transition?.destroy(),this.transition=null,this.media?.destroy(),this.media=null,this.mediaBlend?.destroy(),this.mediaBlend=null,this.shape?.destroy(),this.shape=null,this.text?.destroy(),this.text=null,this.maskCombine?.destroy(),this.maskCombine=null;for(let e of this.textTextureCache.values())e.texture.destroy();this.textTextureCache.clear();for(let e of this.bitmapMaskTextureCache.values())e.texture.destroy();this.bitmapMaskTextureCache.clear(),this.effects?.destroy(),this.effects=null}};const Ta=`freecut-preview-scrub-performance`;function Ea(e){return new URLSearchParams(e).get(`previewScrubPerfSnapshot`)===`1`}const Da=typeof location<`u`&&Ea(location.search);let Oa=null,ka=0,Aa=0;function ja(e,t){e.push(t),e.length>3e3&&e.shift()}function Ma(e){Da&&typeof document<`u`&&Oa===null&&(Oa=setTimeout(()=>{Oa=null;let t=document.getElementById(Ta);t||(t=document.createElement(`script`),t.id=Ta,t.setAttribute(`type`,`application/json`),t.hidden=!0,document.documentElement.append(t)),t.textContent=JSON.stringify({version:e.version,requests:e.requests,renders:e.renders,presented:e.presented,fallbacks:e.fallbacks,videoSources:e.videoSources,preseeks:e.preseeks,canvasPools:e.canvasPools,decoder:e.decoder})},100))}function Na(){return null}function Pa(e){let t=Na();t&&(ja(t.renders,e),Ma(t))}function Fa(e){let t=Na();t&&(ja(t.videoSources,e),Ma(t))}function Ia(e){let t=Na();t&&(e.peakInUse<=ka&&e.temporaryAllocations<=Aa||(ka=Math.max(ka,e.peakInUse),Aa=Math.max(Aa,e.temporaryAllocations),ja(t.canvasPools,e),Ma(t)))}function La(e,t){return e instanceof Map?e.get(t):e(t)}function Ra(e){return new Path2D(e)}function za(e,t,n){e.fillStyle=`white`,e.fill(t);let r=n.strokeWidth??0;r<=0||(e.strokeStyle=`white`,e.lineWidth=r,e.stroke(t))}function Ba(e,t,n){let r=de(e.cornerPin,t.width,t.height);if(!r||!L(r))return null;let i=Math.max(1,Math.round(t.width)),a=Math.max(1,Math.round(t.height)),o=new OffscreenCanvas(i,a),s=o.getContext(`2d`);if(!s)return null;let c=Ra(Gn({...e,pathClosed:!0},{x:0,y:0,width:i,height:a,rotation:0,opacity:1},{canvasWidth:i,canvasHeight:a}));s.globalAlpha=Math.max(0,Math.min(100,e.maskOpacity??100))/100*Math.max(0,Math.min(1,t.opacity)),za(s,c,e);let l=new OffscreenCanvas(n.width,n.height),u=l.getContext(`2d`);if(!u)return null;let d=n.width/2+t.x-t.width/2,f=n.height/2+t.y-t.height/2,p=d+t.width/2,m=f+t.height/2;return u.save(),t.rotation!==0&&(u.translate(p,m),u.rotate(t.rotation*Math.PI/180),u.translate(-p,-m)),_e(u,o,i,a,d,f,r),u.restore(),l}function Va(e,t,n){let r=gr(e,n),i=Ba(r,t,n);if(i){let e=r.maskType??`clip`,t=e===`alpha`?r.maskFeather??0:0;return{bitmapMask:i,inverted:r.maskInvert??!1,feather:t,opacity:1,maskType:e,trackOrder:0}}let a=Gn({...r,pathClosed:!0},{x:t.x,y:t.y,width:t.width,height:t.height,rotation:0,opacity:t.opacity},{canvasWidth:n.width,canvasHeight:n.height});if(t.rotation!==0){let e=n.width/2+t.x,r=n.height/2+t.y;a=Kn(a,t.rotation,e,r)}let o=r.maskType??`clip`,s=o===`alpha`?r.maskFeather??0:0,c=Math.max(0,Math.min(100,r.maskOpacity??100))/100*Math.max(0,Math.min(1,t.opacity));return{path:Ra(a),inverted:r.maskInvert??!1,feather:s,opacity:c,maskType:o,trackOrder:0}}function Ha(e){let t=[];for(let n of e)if(n.visible!==!1)for(let e of n.items)e.type===`shape`&&e.isMask&&t.push({mask:e,trackOrder:n.order??0,startFrame:e.from,endFrame:e.from+e.durationInFrames});return t}function Ua(e,t,n,r){if(n){let n=new Path2D;n.rect(0,0,r.width,r.height),n.addPath(t),e.clip(n,`evenodd`)}else e.clip(t)}function Wa(e,t,n,r,i,a,o){let s=new OffscreenCanvas(o.width,o.height),c=s.getContext(`2d`);r?(c.fillStyle=`white`,c.fillRect(0,0,o.width,o.height),c.globalCompositeOperation=`destination-out`,c.fill(n),c.globalCompositeOperation=`source-over`):(c.fillStyle=`white`,c.fill(n));let l=s;if(i>0){let e=new OffscreenCanvas(o.width,o.height),t=e.getContext(`2d`);t.filter=`blur(${i}px)`,t.drawImage(s,0,0),l=e}e.drawImage(t,0,0),e.globalCompositeOperation=`destination-in`,e.globalAlpha=a,e.drawImage(l,0,0),e.globalAlpha=1,e.globalCompositeOperation=`source-over`}function Ga(e,t,n,r,i,a,o){let s=n;if(r||i>0){let e=new OffscreenCanvas(o.width,o.height),t=e.getContext(`2d`);r?(t.fillStyle=`white`,t.fillRect(0,0,o.width,o.height),t.globalCompositeOperation=`destination-out`,t.drawImage(n,0,0),t.globalCompositeOperation=`source-over`):t.drawImage(n,0,0),s=e}if(i>0){let e=new OffscreenCanvas(o.width,o.height),t=e.getContext(`2d`);t.filter=`blur(${i}px)`,t.drawImage(s,0,0),s=e}e.drawImage(t,0,0),e.globalCompositeOperation=`destination-in`,e.globalAlpha=a,e.drawImage(s,0,0),e.globalAlpha=1,e.globalCompositeOperation=`source-over`}function Ka(e,t,n,r){if(n.length===0){e.drawImage(t,0,0);return}if(!n.some(e=>e.bitmapMask||e.maskType===`alpha`||e.feather>0||e.opacity<1)){e.save();for(let t of n)t.path&&Ua(e,t.path,t.inverted,r);e.drawImage(t,0,0),e.restore();return}let i=t;for(let e of n){let t=new OffscreenCanvas(r.width,r.height),n=t.getContext(`2d`);e.bitmapMask?Ga(n,i,e.bitmapMask,e.inverted,e.feather,e.opacity,r):e.maskType===`clip`&&e.feather===0&&e.opacity===1&&e.path?(n.save(),Ua(n,e.path,e.inverted,r),n.drawImage(i,0,0),n.restore()):e.path&&Wa(n,i,e.path,e.inverted,e.feather,e.opacity,r),i=t}e.drawImage(i,0,0)}function qa(e,t){let n=Ha(e),r=[];for(let{mask:e,trackOrder:t}of n)r.push({mask:e,trackOrder:t,startFrame:e.from,endFrame:e.from+e.durationInFrames});return{masks:r}}function Ja(e,t,n,r,i,a,o,s){let c=[],l=cn(e.masks.map(({mask:e,trackOrder:t})=>({mask:o?.(e.id)??e,trackOrder:t})),{canvas:ur(n),frame:t,getKeyframes:e=>La(r,e),getItem:s,getPreviewTransform:i,getPreviewPathVertices:a});for(let e of l)c.push({...Va(e.shape,dr(e.transform,n),n),trackOrder:e.trackOrder});return c}const Ya=n(`CanvasEffects`);async function Xa(e,t,n,r,i,a,o){let s=[],c=t;if(r.length>0){let{canvas:n,ctx:i}=e.acquire();Ka(i,t,r,a),c=n,s.push(n)}if(n.length===0)return{source:c,poolCanvases:s};let{canvas:l,ctx:u}=e.acquire(),d=await no(u,c,n,i,a,o);return s.push(l),{source:d??l,poolCanvases:s}}function Za(e,t=0){return e.filter(e=>e.enabled&&e.effect.type===`gpu-effect`).map(e=>{let n=e.effect;return{timelineTimeSeconds:t,id:e.id,type:n.gpuEffectType,name:n.gpuEffectType,enabled:!0,params:{...n.params}}})}function Qa(e,t,n,r){if(n.length===0)return null;try{let i=r.applyEffectsToCanvas(e.canvas,n);if(i)return r.isBatching()?i:(e.clearRect(0,0,t.width,t.height),e.drawImage(i,0,0),null)}catch(e){Ya.warn(`GPU effects zero-copy path failed, skipping`,e)}return null}function $a(e,t,n,r,i,a){return t.length===0?[]:t.map(({layer:e,trackOrder:t})=>{let n=i?.(e.id);return{layer:n?.type===`adjustment`?n:e,trackOrder:t}}).filter(({layer:t,trackOrder:r})=>e<=r?!1:n>=t.from&&n<t.from+t.durationInFrames).sort((e,t)=>e.trackOrder-t.trackOrder).flatMap(({layer:e})=>{let t=r?.(e.id)??e.effects;return ae(t,a?.(e.id),n-e.from)?.filter(e=>e.enabled)??[]})}function eo(e,t){let n=[...t];return e&&n.push(...e.filter(e=>e.enabled)),n}function to(e,t,n,r,i,a){if(n.length===0)return e.drawImage(t,0,0),null;e.drawImage(t,0,0);let o=Za(n,r/i.fps);if(o.length>0&&a){let t=Qa(e,i,o,a);if(t)return t}return null}async function no(e,t,n,r,i,a){return to(e,t,n,r,i,a)}function ro(e,t){return e.type!==`video`&&e.type!==`image`||e.type===`video`&&t.hasTransparentVideoSource?.(e)||t.transitionClipIds.has(e.id)||e.blendMode&&e.blendMode!==`normal`?!1:!e.cornerPin}function io(e,t,n){if(e.opacity<1)return!1;let r=e.rotation%360;if(r!==0&&r!==180&&r!==-180||e.cornerRadius>0)return!1;let i=t/2+e.x-e.width/2,a=n/2+e.y-e.height/2,o=i+e.width,s=a+e.height;return i>1||a>1?!1:o>=t-1&&s>=n-1}function ao(e){for(let t of e){if(!t.enabled)continue;let e=t.effect;if(`opacity`in e&&typeof e.opacity==`number`&&e.opacity<1)return!0}return!1}function oo(e,t,n){let r=n.getCurrentItem(e);if(!ro(r,n))return!1;let i=n.getCurrentKeyframes(r.id),a=Tr(r,i,n.frame,n.canvasSettings);if(x(a)||!io(wr(r,i,n.frame,n.canvasSettings),n.canvasWidth,n.canvasHeight))return!1;let o=ae(r.effects??[],n.getCurrentKeyframes(r.id),n.frame-r.from)??[],s=$a(t,n.adjustmentLayers,n.frame,n.renderMode===`preview`?n.getPreviewEffectsOverride:void 0,n.renderMode===`preview`?n.getLiveItemSnapshot:void 0,n.getCurrentKeyframes);return!ao([...o,...s])}function so(e,t){return e<t}function co(e,t){let{gpu:n,canvasSettings:r,maskSettings:i}=t;if(!n.texturePool||e.length===0)return null;let a=new OffscreenCanvas(r.width,r.height),o=a.getContext(`2d`);if(!o)return null;o.fillStyle=`white`,o.fillRect(0,0,a.width,a.height);let s=new OffscreenCanvas(r.width,r.height),c=s.getContext(`2d`);if(!c)return null;Ka(c,a,e,i);let l=n.texturePool.acquire(r.width,r.height);return n.effects.getDevice().queue.copyExternalImageToTexture({source:s,flipY:!1},{texture:l},{width:r.width,height:r.height}),{texture:l,view:l.createView()}}function lo(e,t,n,r){if(!e)return null;if(e.gpuTexture)return e;if(!e.source)return null;if(n)return e;let{activeMasks:i,canvasPool:a,maskSettings:o}=r,s=i.filter(e=>so(e.trackOrder,t));if(s.length===0)return e;let{canvas:c,ctx:l}=a.acquire();return Ka(l,e.source,s,o),{source:c,poolCanvases:[...e.poolCanvases,c]}}function uo(e){return Math.max(0,Math.min(100,e))}function fo(e){return(e.taperStartLength??0)>0&&(e.taperStartWidth??100)!==100||(e.taperEndLength??0)>0&&(e.taperEndWidth??100)!==100}function po(e,t){let n=uo(e*100),r=uo(t.taperStartLength??0),i=uo(t.taperEndLength??0),a=Math.max(0,t.taperStartWidth??100)/100,o=Math.max(0,t.taperEndWidth??100)/100,s=r>0&&n<r?a+(1-a)*(n/r):1,c=100-n;return s*(i>0&&c<i?o+(1-o)*(c/i):1)}function mo(e){if(!fo(e))return[];let t=uo(e.trimPathStart??0),n=uo(e.trimPathEnd??100),r=t===0&&n===100?100:((n-t)%100+100)%100;if(r===0)return[];let i=(e.trimPathOffset??0)/360*100,a=r/48,o=Math.min(a*.2,.08);return Array.from({length:48},(n,r)=>{let s=(r+.5)/48;return{offset:t+i+r*a,length:Math.min(100,a+o),widthScale:po(s,e),isFirst:r===0,isLast:r===47}})}function ho(e){return e.fillType===`linear`?{startColor:e.gradientStartColor||e.fillColor||`#3b82f6`,endColor:e.gradientEndColor||`#8b5cf6`,angle:Number.isFinite(e.gradientAngle)?e.gradientAngle??0:0}:null}function go(e){let t=e*Math.PI/180,n=Math.cos(t),r=Math.sin(t),i=.5/Math.max(Math.abs(n),Math.abs(r),1e-6);return{start:{x:.5-n*i,y:.5-r*i},end:{x:.5+n*i,y:.5+r*i}}}function _o({x:e,y:t,radius:n}){return[`M ${e+n} ${t}`,`A ${n} ${n} 0 1 0 ${e-n} ${t}`,`A ${n} ${n} 0 1 0 ${e+n} ${t}`,`Z`].join(` `)}function vo(e){return[e.path,...e.caps.map(_o)].join(` `)}function yo(e){return Math.max(0,Math.min(1,e))}function bo(e){return(e%1+1)%1}function xo(e,t){let n=yo(t);if(n<=0)return{...e[0],progress:n};if(n>=1)return{...e.at(-1),progress:n};let r=0,i=e.length-1;for(;r+1<i;){let t=Math.floor((r+i)/2);e[t].progress<n?r=t:i=t}let a=e[r],o=e[i],s=Math.max(2**-52,o.progress-a.progress),c=(n-a.progress)/s;return{x:a.x+(o.x-a.x)*c,y:a.y+(o.y-a.y)*c,progress:n}}function So(e,t){let n=yo((t.trimPathStart??0)/100),r=yo((t.trimPathEnd??100)/100);if(n===0&&r===1)return[{start:0,length:1,visibleProgressStart:0}];let i=(t.trimPathOffset??0)/360,a=bo(r-n);if(a<=0)return[];let o=bo(n+i);if(e.closed||o+a<=1)return[{start:o,length:a,visibleProgressStart:0}];let s=1-o,c=a-s;return[{start:o,length:s,visibleProgressStart:0},{start:0,length:c,visibleProgressStart:s/a}]}function Co(e,t){let n=So(e,t),r=n.reduce((e,t)=>e+t.length,0);if(r<=0)return[];let i=Math.max(48,Math.min(256,Math.ceil(e.totalLength/2)));return n.map(t=>{let n=Math.max(2,Math.ceil(i*(t.length/r)));return Array.from({length:n+1},(i,a)=>{let o=a/n,s=t.visibleProgressStart+o*t.length/r,c=t.start+o*t.length;return{...xo(e.points,e.closed?bo(c):c),progress:s}})})}function wo(e,t){let n=Math.hypot(e,t);return n>2**-52?[e/n,t/n]:[1,0]}function To(e,t,n,r){return e===`square`?t===0?-r:t===n?r:0:0}function Eo(e,t){let n=[],r=[],i=[],a=e.length-1;for(let o=0;o<e.length;o++){let s=e[o],c=e[Math.max(0,o-1)],l=e[Math.min(a,o+1)],[u,d]=wo(l.x-c.x,l.y-c.y),f=t.strokeWidth*po(s.progress,t)/2,p=To(t.lineCap,o,a,f),m=s.x+u*p,h=s.y+d*p,g=-d,_=u;n.push([m+g*f,h+_*f]),r.push([m-g*f,h-_*f]),i.push(f)}return{left:n,right:r,radii:i}}function Do(e,t,n){if(n!==`round`)return[];let r=[],i=e[0],a=e.at(-1);return t[0]>0&&r.push({x:i.x,y:i.y,radius:t[0]}),t.at(-1)>0&&r.push({x:a.x,y:a.y,radius:t.at(-1)}),r}function Oo(e,t){if(e.points.length<2||e.totalLength<=0||t.strokeWidth<=0)return null;let n=Co(e,t).filter(e=>e.length>=2);if(n.length===0)return null;let r=[],i=[];for(let e of n){let{left:n,right:a,radii:o}=Eo(e,t);r.push(`M ${n[0][0]} ${n[0][1]}`,...n.slice(1).map(([e,t])=>`L ${e} ${t}`),...a.reverse().map(([e,t])=>`L ${e} ${t}`),`Z`),i.push(...Do(e,o,t.lineCap))}return{path:r.join(` `),caps:i}}const ko=n(`CanvasShapes`);function Ao(e,t){return Math.hypot(t[0]-e[0],t[1]-e[1])}function jo(e,t,n){return Pn(e.pathVertices??[],t,n,e.pathClosed??!0).totalLength}function Mo(e,t,n){let r=Math.min(e.cornerRadius??0,t/2,n/2);return 2*(t+n-4*r)+2*Math.PI*r}function No(e,t,n){let r=e.transform?.aspectRatioLocked??!0,i=Math.min(t,n),a=e.shapeType===`circle`&&r?i/2:t/2,o=e.shapeType===`circle`&&r?i/2:n/2;return Math.PI*(3*(a+o)-Math.sqrt(Math.max(0,(3*a+o)*(a+3*o))))}function Po(e,t,n){return e.transform?.aspectRatioLocked??!0?Math.min(t,n)*3:e.direction===`left`||e.direction===`right`?n+2*Math.hypot(t,n/2):t+2*Math.hypot(t/2,n)}function Fo(e){let t=e.shapeType===`star`?5:e.shapeType===`polygon`?6:3;return Math.max(3,Math.round(e.points??t))}function Io(e,t,n,r){let i=[],a=e.shapeType===`star`?r*2:r,o=t,s=n;(e.transform?.aspectRatioLocked??!0)&&(o=Math.min(t,n),s=o);for(let t=0;t<a;t++){let n=t/a*Math.PI*2-Math.PI/2,r=e.shapeType===`star`&&t%2==1?e.innerRadius??.5:1;i.push([o/2*Math.cos(n)*r,s/2*Math.sin(n)*r])}return i}function Lo(e,t,n){let r=Io(e,t,n,Fo(e));return r.reduce((e,t,n)=>e+Ao(t,r[(n+1)%r.length]),0)}function Ro(e,t,n){let r=Math.max(0,t),i=Math.max(0,n);switch(e.shapeType){case`path`:return jo(e,r,i);case`rectangle`:return Mo(e,r,i);case`circle`:case`ellipse`:return No(e,r,i);case`heart`:return Math.min(r,i)*3.35;case`triangle`:return Po(e,r,i);default:return Lo(e,r,i)}}function zo(e,t,n){let r=Math.max(0,Math.min(100,t.trimPathStart??0)),i=Math.max(0,Math.min(100,t.trimPathEnd??100));if(r===0&&i===100)return;let a=Ro(t,n.width,n.height);if(a<=0)return;let o=((i-r)%100+100)%100;e.setLineDash([o/100*a,(100-o)/100*a]),e.lineDashOffset=-(r/100*a+(t.trimPathOffset??0)/360*a)}function Bo(e,t,n,r){let i=t.pathVertices;if(t.shapeType!==`path`||!i||i.length<2)return!1;let a=Pn(i,n.width,n.height,t.pathClosed!==!1),o=r.width/2+n.x,s=r.height/2+n.y,c=o-n.width/2,l=s-n.height/2,u=n.rotation*Math.PI/180,d=Math.cos(u),f=Math.sin(u),p=Oo({...a,points:a.points.map(e=>{let t=c+e.x-o,n=l+e.y-s;return{x:o+t*d-n*f,y:s+t*f+n*d,progress:e.progress}})},{...t,lineCap:t.strokeLineCap});return!p||(e.fillStyle=t.strokeColor,e.fill(Ra(vo(p))),!0)}function Vo(e,t,n,r,i){if(Bo(e,n,r,i))return;let a=Ro(n,r.width,r.height);if(a<=0)return;let o=mo(n);for(let r of o){let i=r.length/100*a;e.setLineDash([i,Math.max(0,a-i)]),e.lineDashOffset=-(r.offset/100)*a,e.lineWidth=(n.strokeWidth??0)*r.widthScale,e.lineCap=`butt`,e.stroke(t)}}function Ho(e){return(e.strokeEnabled??!0)&&typeof e.strokeWidth==`number`&&e.strokeWidth>0&&typeof e.strokeColor==`string`&&e.strokeColor.length>0}function Uo(e,t,n,r,i){if(Ho(n)){if(e.strokeStyle=n.strokeColor,e.lineCap=n.strokeLineCap??`butt`,e.lineJoin=n.strokeLineJoin??`miter`,e.miterLimit=n.strokeMiterLimit??4,fo(n)){Vo(e,t,n,r,i);return}e.lineWidth=n.strokeWidth,zo(e,n,r),e.stroke(t)}}function Wo(e,t,n,r){let i=ho(t);if(!i)return t.fillColor;let a=go(i.angle),o=r.width/2+n.x,s=r.height/2+n.y,c=o-n.width/2,l=s-n.height/2,u=n.rotation*Math.PI/180,d=Math.cos(u),f=Math.sin(u),p=e=>{let t=c+e.x*n.width,r=l+e.y*n.height,i=t-o,a=r-s;return[o+i*d-a*f,s+i*f+a*d]},m=p(a.start),h=p(a.end),g=e.createLinearGradient(m[0],m[1],h[0],h[1]);return g.addColorStop(0,i.startColor),g.addColorStop(1,i.endColor),g}function Go(e,t,n){let r=Gn(e,{x:t.x,y:t.y,width:t.width,height:t.height,rotation:0,opacity:t.opacity},{canvasWidth:n.width,canvasHeight:n.height}),i=r;if(t.rotation!==0){let e=n.width/2+t.x,a=n.height/2+t.y;i=Kn(r,t.rotation,e,a)}return Ra(i)}function Ko(e,t,n,r){if(!t.isMask){e.save();try{let i=Go(t,n,r);e.globalAlpha=n.opacity,(t.shapeType!==`path`||t.pathClosed!==!1)&&(t.fillEnabled??!0)&&t.fillColor&&(e.fillStyle=Wo(e,t,n,r),e.fill(i)),Uo(e,i,t,n,r),n.cornerRadius>0&&ko.debug(`Corner radius applied via shape path`,{shapeId:t.id,cornerRadius:n.cornerRadius})}finally{e.restore()}}}const qo=n(`CanvasItemRenderer`);function Jo(e){return{...e,anchorX:e.anchorX??e.width/2,anchorY:e.anchorY??e.height/2}}function Yo(e,t,n,r){let i=r.width/2+n.x-n.width/2,a=r.height/2+n.y-n.height/2,o=i+(n.anchorX??n.width/2),s=a+(n.anchorY??n.height/2),c=t.transform?.flipHorizontal?-1:1,l=t.transform?.flipVertical?-1:1,u=c!==1||l!==1;(n.rotation!==0||u)&&(e.translate(o,s),n.rotation!==0&&e.rotate(n.rotation*Math.PI/180),u&&e.scale(c,l),e.translate(-o,-s))}function Xo(e,t){return t>=e.from&&t<e.from+e.durationInFrames}function Zo(e,t,n,r){if(e.type!==`video`&&e.type!==`image`&&e.type!==`composition`)return e;let i=Tr(e,n.getCurrentKeyframes?.(e.id)??n.keyframesMap.get(e.id),t,n.canvasSettings,r);return i===e.crop?e:{...e,crop:i}}function Qo(e){return Math.abs(e-1)>=.01}function $o(e,t){let n=t?1:.2;return Math.abs(e)>1.01?Math.max(n,.5*Math.abs(e)):n}function es(e){let{domVideo:t,sourceTime:n,speed:r,isRenderingTransition:i,maxDriftSeconds:a}=e;if(!t||t.readyState<2||t.videoWidth<=0)return{hasReadyDomVideo:!1,shouldDraw:!1,drift:null,driftThreshold:null};let o=Math.abs(t.currentTime-n),s=a??$o(r,i||t.dataset.transitionHold===`1`);return{hasReadyDomVideo:!0,shouldDraw:o<=s,drift:o,driftThreshold:s}}async function ts(e,t=48){let n=es(e),r=e.domVideo;return n.shouldDraw||!r||t<=0?n:new Promise(n=>{let i=!1,a=null,o=[`seeked`,`loadeddata`,`canplay`,`timeupdate`],s=()=>{for(let e of o)r.removeEventListener(e,l);a!==null&&`cancelVideoFrameCallback`in r&&r.cancelVideoFrameCallback(a),clearTimeout(u)},c=e=>{i||(i=!0,s(),n(e))},l=()=>{let t=es(e);t.shouldDraw&&c(t)};for(let e of o)r.addEventListener(e,l);`requestVideoFrameCallback`in r&&(a=r.requestVideoFrameCallback(()=>l()));let u=setTimeout(()=>c(es(e)),t);l()})}function ns(e){let{domVideo:t,sourceTime:n,speed:r,isRenderingTransition:i,currentFrame:a,cachedFrame:o,hasCachedFrame:s,fps:c}=e;if(!t||t.readyState>=2||t.videoWidth<=0||!rs({currentFrame:a,cachedFrame:o,hasCachedFrame:s,fps:c}))return!1;let l=$o(r,i||t.dataset.transitionHold===`1`);return Math.abs(t.currentTime-n)<=l}function rs(e){let{currentFrame:t,cachedFrame:n,hasCachedFrame:r,fps:i}=e,a=Math.max(3,Math.ceil(i));return r&&Math.abs(t-n)<=a}function is(e){let{renderMode:t,hasMediabunny:n,isMediabunnyDisabled:r,hasEnsureVideoItemReady:i,speed:a}=e;return t!==`preview`||n||r||!i?`none`:Qo(a)?`warm-background-and-skip`:`warm-background-and-continue`}function as(e){let{renderMode:t,hasMediabunny:n,hasFallbackVideoElement:r}=e;return t===`preview`&&!n&&!r}function os(e){let{renderMode:t,hasReadyDomVideo:n,allowPredecodedVideoFrames:r}=e;return(t===`preview`||r===!0)&&!n}function ss(e){let{renderMode:t,hasFallbackVideoElement:n,hasMediabunny:r,isMediabunnyDisabled:i,mediabunnyFailedThisFrame:a}=e;return t===`preview`&&n&&(a||!r||i)}function cs(e,t,n,r,i,a=`contain`){let o=r.width/2+n.x-n.width/2,s=r.height/2+n.y-n.height/2,c=oe(e,t,n.width,n.height,i,a);return{mediaRect:{x:o+c.mediaRect.x,y:s+c.mediaRect.y,width:c.mediaRect.width,height:c.mediaRect.height},viewportRect:{x:o+c.viewportRect.x,y:s+c.viewportRect.y,width:c.viewportRect.width,height:c.viewportRect.height},featherPixels:c.featherPixels}}function ls(e){return e.left>0||e.right>0||e.top>0||e.bottom>0}function us(e,t){e.beginPath(),e.rect(t.x,t.y,t.width,t.height),e.clip()}function ds(e,t,n){if(t.width<=0||t.height<=0)return;let r=n=>{e.fillStyle=n,e.fillRect(t.x,t.y,t.width,t.height)};if(e.save(),e.globalCompositeOperation=`destination-in`,n.left>0){let i=e.createLinearGradient(t.x,0,t.x+t.width,0);i.addColorStop(0,`rgba(0, 0, 0, 0)`),i.addColorStop(Math.max(0,Math.min(1,n.left/t.width)),`rgba(0, 0, 0, 1)`),i.addColorStop(1,`rgba(0, 0, 0, 1)`),r(i)}if(n.right>0){let i=e.createLinearGradient(t.x,0,t.x+t.width,0);i.addColorStop(0,`rgba(0, 0, 0, 1)`),i.addColorStop(Math.max(0,Math.min(1,(t.width-n.right)/t.width)),`rgba(0, 0, 0, 1)`),i.addColorStop(1,`rgba(0, 0, 0, 0)`),r(i)}if(n.top>0){let i=e.createLinearGradient(0,t.y,0,t.y+t.height);i.addColorStop(0,`rgba(0, 0, 0, 0)`),i.addColorStop(Math.max(0,Math.min(1,n.top/t.height)),`rgba(0, 0, 0, 1)`),i.addColorStop(1,`rgba(0, 0, 0, 1)`),r(i)}if(n.bottom>0){let i=e.createLinearGradient(0,t.y,0,t.y+t.height);i.addColorStop(0,`rgba(0, 0, 0, 1)`),i.addColorStop(Math.max(0,Math.min(1,(t.height-n.bottom)/t.height)),`rgba(0, 0, 0, 1)`),i.addColorStop(1,`rgba(0, 0, 0, 0)`),r(i)}e.restore()}function fs(e,t,n,r,i,a,o,s,c,l=`contain`){let u=cs(n,r,i,a,o,l);if(u.viewportRect.width<=0||u.viewportRect.height<=0)return!1;let d=e=>{if(s&&Number.isFinite(s.width)&&Number.isFinite(s.height)&&s.width>0&&s.height>0){e.drawImage(t,s.x,s.y,s.width,s.height,u.mediaRect.x,u.mediaRect.y,u.mediaRect.width,u.mediaRect.height);return}e.drawImage(t,u.mediaRect.x,u.mediaRect.y,u.mediaRect.width,u.mediaRect.height)};if(!ls(u.featherPixels))return e.save(),us(e,u.viewportRect),d(e),e.restore(),!0;let f=c?.acquire(),p=f?.canvas??new OffscreenCanvas(a.width,a.height),m=f?.ctx??p.getContext(`2d`);if(!m)return f&&c?.release(p),!1;try{f||m.clearRect(0,0,a.width,a.height),m.imageSmoothingEnabled=!0,m.imageSmoothingQuality=`high`,m.save(),us(m,u.viewportRect),d(m),m.restore(),ds(m,u.viewportRect,u.featherPixels),e.drawImage(p,0,0)}finally{f&&c?.release(p)}return!0}function ps(e){return 1/(Number.isFinite(e)&&e>0?e:30)*.9}function ms(e,t){return t?e.renderMode===`preview`||e.allowPredecodedVideoFrames===!0:!1}function hs(e){let{rctx:t,previewRootFrame:n,workerSource:r,sourceTime:i,toleranceSeconds:a,drawBitmap:o}=e;if(!e.allowOutsideActivePreview&&!t.isActivePreviewFrameCurrent?.(n))return!1;let s=t.getCachedActivePreviewFallbackBitmap?.(r,i,a);return!s||!o(s)?!1:(t.markActivePreviewFallbackUsed?.(),Fa({frame:e.timelineFrame,itemId:e.itemId,path:`proxy-fallback`,sourceTime:i}),!0)}function gs(e){let t=e.rctx.getCachedPredecodedBitmap?.(e.workerSource,e.sourceTime,e.toleranceSeconds);return!t||!e.drawBitmap(t)?!1:(Fa({frame:e.timelineFrame,itemId:e.itemId,path:`worker-bitmap`,sourceTime:e.sourceTime}),!0)}async function _s(e){let t=e.rctx.waitForInflightPredecodedBitmap;if(!t)return!1;let n=e.rctx.isActivePreviewFrameCurrent?.(e.previewRootFrame)?12:e.rctx.workerPredecodeWaitMs??12,r=await t(e.workerSource,e.sourceTime,e.toleranceSeconds,n);return!r||!e.drawBitmap(r)?!1:(Fa({frame:e.timelineFrame,itemId:e.itemId,path:`worker-bitmap`,sourceTime:e.sourceTime}),!0)}function vs(e,t,n,r,i,a,o,s){try{let c=t.visibleRect;return fs(e,t,n,r,i,a,o,c,s)}catch{return!1}}async function ys(e,t,n,r,i,a,o,s,c=!1){let l=i.previewRootTimelineFrame??a,u=i.getResolvedVideoSource?.(t,o,s)??t.src;if(!ms(i,u))return!1;let d=a=>fs(e,a,a.width,a.height,n,r,t.crop,void 0,i.canvasPool),f={rctx:i,workerSource:u,sourceTime:o,toleranceSeconds:s,drawBitmap:d,timelineFrame:a,itemId:t.id};return gs(f)||hs({rctx:i,previewRootFrame:l,workerSource:u,sourceTime:o,toleranceSeconds:s,drawBitmap:d,timelineFrame:a,itemId:t.id,allowOutsideActivePreview:c})?!0:_s({...f,previewRootFrame:l})}function bs(e,t,n,r,i,a,o){let{fps:s,videoExtractors:c,videoElements:l,useMediabunny:u,mediabunnyDisabledItems:d,mediabunnyFailureCountByItem:f,canvasSettings:p,scrubbingCache:m}=i,h=i.renderMode===`preview`,g=!h,_=l.has(t.id),v=c.get(t.id),y=o??Zn(t),b=t.sourceFps??s,x=t.speed??1,S=cr(t,y,r,s,a);return{ctx:e,item:t,transform:n,frame:r,rctx:i,sourceFrameOffset:a,fps:s,canvasSettings:p,scrubbingCache:m,videoExtractors:c,videoElements:l,useMediabunny:u,mediabunnyDisabledItems:d,mediabunnyFailureCountByItem:f,isPreviewMode:h,allowVideoElementFallback:g,hasFallbackVideoElement:_,extractor:v,effectiveRenderSpan:y,sourceFps:b,speed:x,sourceTime:S,tier2ToleranceSeconds:ps(b),nonBlockingToleranceSeconds:i.nonBlockingVideoFrameToleranceSeconds,previewRootFrame:i.previewRootTimelineFrame??r,domVideoCandidate:null,domVideo:null,canUseDomVideoElement:!1,domVideoDecision:es({domVideo:null,sourceTime:S,speed:x,isRenderingTransition:!1}),hasDomVideo:!1,hasActiveRamp:!1,mediabunnyInitAction:`none`,mediabunnyReadyPromise:null,mediabunnyFailedThisFrame:!1,holdPreviewFrontBuffer:()=>{h&&i.markActivePreviewFramePending?.()}}}async function xs(e){let{ctx:t,item:n,transform:r,rctx:i,frame:a,sourceTime:o,tier2ToleranceSeconds:s,canvasSettings:c}=e;if(i.allowPredecodedVideoFrames){if(await ys(t,n,r,c,i,a,o,s))return!0;!e.extractor&&i.ensureVideoItemReady&&(await i.ensureVideoItemReady(n.id,n),e.extractor=e.videoExtractors.get(n.id))}}function Ss(e){if(e.rctx.isActivePreviewFrameSuperseded?.(e.previewRootFrame))return e.holdPreviewFrontBuffer(),!1}async function Cs(e){let{ctx:t,item:n,transform:r,rctx:i,frame:a,sourceTime:o,tier2ToleranceSeconds:s,canvasSettings:c}=e;if(e.isPreviewMode&&i.isActivePreviewFrameCurrent?.(e.previewRootFrame)&&await ys(t,n,r,c,i,a,o,s))return!0}async function ws(e){let{ctx:t,item:n,transform:r,rctx:i,frame:a,sourceTime:o,canvasSettings:s,scrubbingCache:c,nonBlockingToleranceSeconds:l}=e;if(!e.isPreviewMode||l===void 0)return;if(await ys(t,n,r,s,i,a,o,l,!0))return i.markActivePreviewFallbackUsed?.(),!0;let u=e.extractor;if(c&&u){let e=u.getDimensions(),a=c.getVideoFrameEntry(n.id,o,l);if(a&&vs(t,a.frame,e.width,e.height,r,s,n.crop,i.canvasPool))return i.markActivePreviewFallbackUsed?.(),!0}}async function Ts(e){let{rctx:t,item:n,frame:r,sourceTime:i,speed:a,sourceFps:o,effectiveRenderSpan:s}=e,c=!!s.sourceTimeRamp&&sr(s.sourceTimeRamp,r),l=e.isPreviewMode&&t.domVideoElementProvider&&e.sourceFrameOffset===0&&Xo(s,r)?t.domVideoElementProvider(n.id):null,u=!c||l?.dataset.transitionSourceRamp===`1`?l:null,d={domVideo:u,sourceTime:i,speed:a,isRenderingTransition:!!t.isRenderingTransition,maxDriftSeconds:t.isActivePreviewFrameCurrent?.(e.previewRootFrame)?.5/o:void 0},f=es(d);f.hasReadyDomVideo&&!f.shouldDraw&&(f=e.nonBlockingToleranceSeconds===void 0?await ts(d):{...f,hasReadyDomVideo:!1}),e.hasActiveRamp=c,e.domVideoCandidate=l,e.domVideo=u,e.canUseDomVideoElement=!!l,e.domVideoDecision=f,e.hasDomVideo=f.hasReadyDomVideo}function Es(e){if(e.isPreviewMode&&e.hasActiveRamp&&e.domVideoCandidate?.dataset.transitionSourceRamp===`1`&&!e.domVideoDecision.shouldDraw)return e.holdPreviewFrontBuffer(),!1}function Ds(e){let{ctx:t,item:n,transform:r,canvasSettings:i,rctx:a,frame:o,sourceTime:s}=e,{domVideo:c,domVideoDecision:l}=e;if(c&&l.shouldDraw)return Fa({frame:o,itemId:n.id,path:`dom-video`,sourceTime:s}),fs(t,c,c.videoWidth,c.videoHeight,r,i,n.crop,void 0,a.canvasPool),!0}async function Os(e){let{rctx:t,item:n,speed:r}=e,i=is({renderMode:t.renderMode,hasMediabunny:e.useMediabunny.has(n.id),isMediabunnyDisabled:e.mediabunnyDisabledItems.has(n.id),hasEnsureVideoItemReady:!!t.ensureVideoItemReady,speed:r});if(e.mediabunnyInitAction=i,i!==`none`&&t.ensureVideoItemReady&&(e.mediabunnyReadyPromise=t.ensureVideoItemReady(n.id),i===`warm-background-and-skip`))return e.holdPreviewFrontBuffer(),!1}async function ks(e,t,n,r,i,a=0,o){let s=bs(e,t,n,r,i,a,o),c=await xs(s);if(c!==void 0)return c;let l=Ss(s);if(l!==void 0)return l;let u=await Cs(s);if(u!==void 0)return u;let d=await ws(s);if(d!==void 0)return d;await Ts(s);let f=Es(s);if(f!==void 0)return f;let p=Ds(s);if(p!==void 0)return p;let m=await Os(s);if(m!==void 0)return m;let h=await Ls(s);if(h!==void 0)return h;let g=await Rs(s);if(g!==void 0)return g;let _=zs(s);if(_!==void 0)return _;let v=await Ks(s);return v===void 0?s.rctx.isActivePreviewFrameSuperseded?.(s.previewRootFrame)===!0?(s.holdPreviewFrontBuffer(),!1):Ms(s):v}async function As(e,t,n,r){let i=n?.05:.034;Math.abs(e.currentTime-t)<=i||(e.currentTime=t,!n&&await new Promise(t=>{let n=()=>{e.removeEventListener(`seeked`,n),t()};e.addEventListener(`seeked`,n),setTimeout(()=>{e.removeEventListener(`seeked`,n),t()},r)}))}async function js(e,t){e.readyState>=2||await new Promise(n=>{let r=()=>{e.readyState>=2&&(e.removeEventListener(`canplay`,r),e.removeEventListener(`loadeddata`,r),n())};e.addEventListener(`canplay`,r),e.addEventListener(`loadeddata`,r),r(),setTimeout(()=>{e.removeEventListener(`canplay`,r),e.removeEventListener(`loadeddata`,r),n()},t)})}async function Ms(e){let{ctx:t,item:n,transform:r,frame:i,rctx:a,canvasSettings:o,sourceTime:s}=e,c=ss({renderMode:a.renderMode,hasFallbackVideoElement:e.hasFallbackVideoElement,hasMediabunny:e.useMediabunny.has(n.id),isMediabunnyDisabled:e.mediabunnyDisabledItems.has(n.id),mediabunnyFailedThisFrame:e.mediabunnyFailedThisFrame});if(!e.allowVideoElementFallback&&!c)return e.holdPreviewFrontBuffer(),!1;let l=e.videoElements.get(n.id);if(!l)return qo.warn(`Video element not found`,{itemId:n.id,frame:i}),e.holdPreviewFrontBuffer(),!1;let u=Math.max(0,Math.min(s,l.duration-.01)),d=e.isPreviewMode?24:150,f=e.isPreviewMode?40:300;return await As(l,u,e.isPreviewMode,d),l.readyState<2&&e.isPreviewMode?(e.holdPreviewFrontBuffer(),!1):(await js(l,f),l.readyState<2?!1:(fs(t,l,l.videoWidth,l.videoHeight,r,o,n.crop,void 0,a.canvasPool),!0))}async function Ns(e){let{ctx:t,item:n,transform:r,rctx:i,canvasSettings:a,scrubbingCache:o}=e,s=e.extractor;if(!o||!s)return;let c=s.getDimensions(),l=o.getVideoFrameEntry(n.id);if(l&&vs(t,l.frame,c.width,c.height,r,a,n.crop,i.canvasPool))return!0}async function Ps(e){let{ctx:t,item:n,transform:r,rctx:i,frame:a,sourceTime:o,canvasSettings:s,tier2ToleranceSeconds:c}=e;if(os({renderMode:i.renderMode,hasReadyDomVideo:e.hasDomVideo,allowPredecodedVideoFrames:i.allowPredecodedVideoFrames})&&await ys(t,n,r,s,i,a,o,c))return i.ensureVideoItemReady&&!e.mediabunnyReadyPromise&&i.ensureVideoItemReady(n.id),!0}async function Fs(e){let{ctx:t,item:n,transform:r,frame:i,rctx:a,sourceFrameOffset:o}=e;if(e.mediabunnyInitAction!==`warm-background-and-continue`||!e.mediabunnyReadyPromise||!e.extractor)return;let s=!1;try{s=await e.mediabunnyReadyPromise}catch{}if(s&&e.useMediabunny.has(n.id)&&!e.mediabunnyDisabledItems.has(n.id))return ks(t,n,r,i,a,o,e.effectiveRenderSpan)}function Is(e){let{rctx:t,item:n,sourceTime:r,tier2ToleranceSeconds:i,domVideo:a}=e,o=t.getResolvedVideoSource?.(n,r,i)??n.src;if(a)return e.holdPreviewFrontBuffer(),!1;let s=o&&(t.isActivePreviewSourceTarget?.(o,r,i)||t.isActivePreviewTargetSuperseded?.(o,r,i));return(t.isActivePreviewFrameCurrent?.(e.previewRootFrame)||s)&&e.holdPreviewFrontBuffer(),!1}async function Ls(e){if(!as({renderMode:e.rctx.renderMode,hasMediabunny:e.useMediabunny.has(e.item.id),hasFallbackVideoElement:e.hasFallbackVideoElement}))return;let t=await Ns(e);if(t!==void 0)return t;let n=await Ps(e);if(n!==void 0)return n;let r=await Fs(e);return r===void 0?Is(e):r}async function Rs(e){let{ctx:t,item:n,transform:r,rctx:i,frame:a,sourceTime:o,canvasSettings:s,tier2ToleranceSeconds:c}=e;if(os({renderMode:i.renderMode,hasReadyDomVideo:e.hasDomVideo,allowPredecodedVideoFrames:i.allowPredecodedVideoFrames})&&await ys(t,n,r,s,i,a,o,c))return!e.useMediabunny.has(n.id)&&i.ensureVideoItemReady&&i.ensureVideoItemReady(n.id),!0}function zs(e){let{rctx:t,item:n,sourceTime:r,tier2ToleranceSeconds:i}=e;if(e.isPreviewMode&&e.nonBlockingToleranceSeconds!==void 0)return e.holdPreviewFrontBuffer(),!1;let a=t.getResolvedVideoSource?.(n,r,i)??n.src,o=t.isActivePreviewFrameSuperseded?.(e.previewRootFrame)===!0,s=!!(a&&t.isActivePreviewTargetSuperseded?.(a,r,i));if(o||s)return e.holdPreviewFrontBuffer(),!1;if(t.isActivePreviewFrameCurrent?.(e.previewRootFrame))return t.markActivePreviewFramePending?.(),!1}async function Bs(e,t,n){let{ctx:r,item:i,transform:a,rctx:o,canvasSettings:s,scrubbingCache:c,tier2ToleranceSeconds:l}=e;if(!e.isPreviewMode||!c)return;let u=c.getVideoFrameEntry(i.id,n,l);if(u&&vs(r,u.frame,t.width,t.height,a,s,i.crop,o.canvasPool))return!0}async function Vs(e,t,n){let{ctx:r,item:i,transform:a,frame:o,rctx:s,canvasSettings:c}=e;if(s.renderMode!==`export`||!i.isReversed||e.sourceFrameOffset!==0||!s.reverseVideoFrameCache)return;let l=await s.reverseVideoFrameCache.getFrame({item:i,extractor:t,frame:o,renderSpan:e.effectiveRenderSpan,fps:e.fps,sourceFps:e.sourceFps,speed:e.speed});if(l&&vs(r,l,n.width,n.height,a,c,i.crop,s.canvasPool))return e.mediabunnyFailureCountByItem.set(i.id,0),!0}async function Hs(e,t,n,r,i){let{ctx:a,rctx:o,scrubbingCache:s}=e,{mediaRect:c,viewportRect:l,featherPixels:u}=r,d=async r=>e.isPreviewMode&&s&&o.captureDecodedVideoFrames!==!1?await t.drawFrameWithCapture(r,n,c.x,c.y,c.width,c.height,i):{success:await t.drawFrame(r,n,c.x,c.y,c.width,c.height,i),capturedFrame:null,capturedSourceTime:null};if(ls(u)){let{canvas:e,ctx:t}=o.canvasPool.acquire();try{t.save(),us(t,l);let n;try{n=await d(t)}finally{t.restore()}return n.success&&(ds(t,l,u),a.drawImage(e,0,0)),n}finally{o.canvasPool.release(e)}}a.save(),us(a,l);try{return await d(a)}finally{a.restore()}}function Us(e,t,n,r){let{frame:i,item:a,scrubbingCache:o}=e;Fa({frame:i,itemId:a.id,path:`mediabunny`,sourceTime:t,canUseDom:e.canUseDomVideoElement,domAvailable:!!e.domVideo,domReady:e.domVideoDecision.hasReadyDomVideo,domDrift:e.domVideoDecision.drift}),e.mediabunnyFailureCountByItem.set(a.id,0),o&&n&&o.putVideoFrame(a.id,n,r??t)}function Ws(e,t,n){let{frame:r,item:i}=e;if(t.getLastFailureKind()===`no-sample`){qo.debug(`Mediabunny had no sample for timestamp, using per-frame fallback`,{itemId:i.id,frame:r,sourceTime:n});return}let a=(e.mediabunnyFailureCountByItem.get(i.id)??0)+1;e.mediabunnyFailureCountByItem.set(i.id,a),a>=3?(e.mediabunnyDisabledItems.add(i.id),(e.isPreviewMode?qo.debug:qo.warn)(`Disabling mediabunny for item after repeated failures; using fallback for remainder of render`,{itemId:i.id,frame:r,sourceTime:n,failureCount:a})):(e.isPreviewMode?qo.debug:qo.warn)(`Mediabunny frame draw failed, using fallback`,{itemId:i.id,frame:r,sourceTime:n,failureCount:a})}async function Gs(e,t,n){let{ctx:r,item:i,transform:a,rctx:o,canvasSettings:s,scrubbingCache:c}=e;if(!e.isPreviewMode||!c||t.getLastFailureKind()!==`no-sample`)return;let l=c.getVideoFrameEntry(i.id);if(l&&vs(r,l.frame,n.width,n.height,a,s,i.crop,o.canvasPool))return!0}async function Ks(e){let{item:t,transform:n,frame:r,canvasSettings:i,sourceTime:a}=e,o=e.extractor;if(!e.useMediabunny.has(t.id)||e.mediabunnyDisabledItems.has(t.id)||!o)return;let s=Math.max(0,Math.min(a,o.getDuration()-.01)),c=o.getDimensions(),l=cs(c.width,c.height,n,i,t.crop),u=await Bs(e,c,s);if(u!==void 0)return u;let d=await Vs(e,o,c);if(d!==void 0)return d;let f=await Hs(e,o,s,l,()=>e.rctx.isActivePreviewFrameSuperseded?.(e.previewRootFrame)!==!0);if(f.success)return Us(e,s,f.capturedFrame,f.capturedSourceTime),!0;e.mediabunnyFailedThisFrame=!0;let p=await Gs(e,o,c);if(p!==void 0)return p;Ws(e,o,s)}function qs(e,t,n,r){return cr(e,t,n,r.fps)}function Js(e,t,n,r,i){let{fps:a,canvasSettings:o,imageElements:s,gifFramesMap:l}=r,u=l.get(t.id);if(u&&u.frames.length>0){let s=i-t.from,l=t.speed??1,d=s/a*1e3*l,{frame:f}=c.getFrameAtTime(u,d);fs(e,f,u.width,u.height,n,o,t.crop,void 0,r.canvasPool);return}let d=s.get(t.id);d&&fs(e,d.source,d.width,d.height,n,o,t.crop,void 0,r.canvasPool)}function Ys(e,t,n,r,i){let{fps:a,canvasSettings:o,canvasPool:s,lottieProvider:c}=r,u=i-t.from,d=l({localFrame:u,projectFps:a,speed:t.speed??1,totalFrames:t.totalFrames,frameRate:t.frameRate,loop:t.loop??!0,reversed:t.reversed,loopMode:t.loopMode,segmentStart:t.segmentStart,segmentEnd:t.segmentEnd}),f=c.renderFrame(t.id,d);f&&fs(e,f,f.width,f.height,n,o,t.crop,void 0,s)}const Xs={1:{textAlign:`left`,verticalAlign:`bottom`},2:{textAlign:`center`,verticalAlign:`bottom`},3:{textAlign:`right`,verticalAlign:`bottom`},4:{textAlign:`left`,verticalAlign:`middle`},5:{textAlign:`center`,verticalAlign:`middle`},6:{textAlign:`right`,verticalAlign:`middle`},7:{textAlign:`left`,verticalAlign:`top`},8:{textAlign:`center`,verticalAlign:`top`},9:{textAlign:`right`,verticalAlign:`top`}},Zs=/<\/?(?:i|b|u|font|c|v|ruby|rt|lang)\b[^>]*>|\{\\an[1-9]\}|\{\\[^}]*\}/gi;function Qs(e){if(e.length===0)return{spans:[],plainText:``,isEmpty:!0};let t,n=$s(e),r=[{}],i=[],a=``;for(let e of n){if(e.kind===`text`){let t=r[r.length-1];if(e.value.length===0)continue;let n=i[i.length-1];n&&nc(n,t)?n.text+=e.value:i.push({text:e.value,...t}),a+=e.value;continue}if(e.kind===`open`){let t=tc(r[r.length-1],e.format);r.push(t);continue}if(e.kind===`close`){r.length>1&&r.pop();continue}e.kind===`alignment`&&(t=e.alignment)}return{spans:i,plainText:a.trim(),isEmpty:a.trim().length===0,alignment:t}}function $s(e){let t=[];Zs.lastIndex=0;let n=0;for(let r of e.matchAll(Zs)){let i=r.index??0;i>n&&t.push({kind:`text`,value:e.slice(n,i)}),t.push(ec(r[0])),n=i+r[0].length}return n<e.length&&t.push({kind:`text`,value:e.slice(n)}),t}function ec(e){let t=/^\{\\an([1-9])\}$/i.exec(e);if(t){let e=Xs[t[1]];return e?{kind:`alignment`,alignment:e}:{kind:`unknown`}}if(e.startsWith(`{`))return{kind:`unknown`};let n=/^<\/([a-z]+)\b/i.exec(e);if(n)return{kind:`close`,tag:n[1].toLowerCase()};let r=/^<([a-z]+)\b([^>]*)>$/i.exec(e);if(!r)return{kind:`unknown`};let i=r[1].toLowerCase(),a=r[2]??``;switch(i){case`i`:return{kind:`open`,format:{fontStyle:`italic`}};case`b`:return{kind:`open`,format:{fontWeight:`bold`}};case`u`:return{kind:`open`,format:{underline:!0}};case`font`:{let e=/color\s*=\s*"?([^"\s>]+)"?/i.exec(a);return e?{kind:`open`,format:{color:e[1]}}:{kind:`open`,format:{}}}default:return{kind:`open`,format:{}}}}function tc(e,t){return{...e,...t}}function nc(e,t){return(e.fontStyle??void 0)===t.fontStyle&&(e.fontWeight??void 0)===t.fontWeight&&(e.underline??void 0)===t.underline&&(e.color??void 0)===t.color}(()=>{let e={};for(let[t,n]of Object.entries(Xs))e[`${n.textAlign}|${n.verticalAlign}`]=t;return e})();function rc(e,t,n){return JSON.stringify({w:Math.round(t),h:Math.round(n),text:e.text,textSpans:e.textSpans,spanLayout:e.spanLayout,fontSize:e.fontSize,fontFamily:e.fontFamily,fontWeight:e.fontWeight,fontStyle:e.fontStyle,underline:e.underline,color:e.color,backgroundColor:e.backgroundColor,backgroundRadius:e.backgroundRadius,textAlign:e.textAlign,verticalAlign:e.verticalAlign,lineHeight:e.lineHeight,letterSpacing:e.letterSpacing,textPadding:e.textPadding,textShadow:e.textShadow,stroke:e.stroke,textStyleScale:e.textStyleScale,textLayoutDrafts:e.textLayoutDrafts})}function ic(e){let t=0;for(let n of e.values())t+=n.bytes;for(let[n,r]of e){if(t<=256e6||e.size<=1)break;e.delete(n),t-=r.bytes}}function ac(e,t,n,r,i,a,o){let{textMeasureCache:s}=o,c=E(e,(t,n)=>s.measure(e,t,n)),l=F(t,n,r,c);if(t.backgroundColor&&l.background){let n=l.background;e.fillStyle=t.backgroundColor,n.radius>0?(e.beginPath(),e.roundRect(i+n.x,a+n.y,n.width,n.height,n.radius),e.fill()):e.fillRect(i+n.x,a+n.y,n.width,n.height)}t.textShadow&&(e.shadowColor=t.textShadow.color,e.shadowBlur=t.textShadow.blur,e.shadowOffsetX=t.textShadow.offsetX,e.shadowOffsetY=t.textShadow.offsetY),e.textBaseline=`alphabetic`,e.textAlign=`left`;let u=t.stroke?.width??0;for(let n of l.lines)n.text.length!==0&&oc(e,t,n,i+n.startX,a+n.baselineY,u)}function oc(e,t,n,r,i,a){if(e.font=n.cssFont,ie(e,n.letterSpacing),t.stroke&&a>0&&(e.strokeStyle=t.stroke.color,e.lineWidth=a*2,e.lineJoin=`round`,e.strokeText(n.text,r,i)),!n.runs||n.runs.length===0){e.fillStyle=n.color,e.fillText(n.text,r,i),n.underline&&pc(e,n,r,i);return}for(let t of n.runs)e.fillStyle=t.color,e.fillText(t.text,r+t.offsetX,i),t.underline&&pc(e,{...n,width:t.width,color:t.color},r+t.offsetX,i)}function sc(e,t,n,r,i,a,o,s,c,l,u){if(e.save(),u){let t=n+i/2,a=r-o*.3;e.translate(u.dx,u.dy),e.translate(t,a),u.rotation!==0&&e.rotate(u.rotation),u.scale!==1&&e.scale(u.scale,u.scale),e.translate(-t,-a),u.alpha!==1&&(e.globalAlpha*=u.alpha),u.soften>0&&(e.filter=`blur(${u.soften}px)`)}e.font=a,e.fillStyle=s,c&&l>0&&(e.strokeStyle=c,e.lineWidth=l*2,e.lineJoin=`round`,e.strokeText(t,n,r)),e.fillText(t,n,r),e.restore()}function cc(e,t,n,r,i,a,o,s){let c=t.textMotion,l=c?Vi(c,s.relativeFrame,s.durationInFrames):null,u=c&&l?c[l]:void 0;if(!c||!u){ac(e,t,n,r,i,a,o);return}let{textMeasureCache:d}=o,f=E(e,(t,n)=>d.measure(e,t,n)),p=F(t,n,r,f),m=Xi(p.lines.map(e=>e.text),u.unit??wi(u.presetId).unit),h=(e,t)=>e===null?null:Bi(c,{relativeFrame:s.relativeFrame,fps:s.fps,durationInFrames:s.durationInFrames,unitIndex:e,unitCount:m.unitCount,fontSize:t,boxWidth:n,boxHeight:r});if(t.backgroundColor&&p.background){let n=p.background;e.fillStyle=t.backgroundColor,n.radius>0?(e.beginPath(),e.roundRect(i+n.x,a+n.y,n.width,n.height,n.radius),e.fill()):e.fillRect(i+n.x,a+n.y,n.width,n.height)}t.textShadow&&(e.shadowColor=t.textShadow.color,e.shadowBlur=t.textShadow.blur,e.shadowOffsetX=t.textShadow.offsetX,e.shadowOffsetY=t.textShadow.offsetY),e.textBaseline=`alphabetic`,e.textAlign=`left`;let g=t.stroke?.width??0,_=t.stroke?.color;for(let[t,n]of p.lines.entries()){if(n.text.length===0)continue;e.font=n.cssFont,ie(e,0);let r=m.lineUnitIndices[t],o=n.runs?.flatMap(e=>Array.from(e.text,()=>e.color)),s=a+n.baselineY,c=i+n.startX,l=0;for(let t of n.text){let i=e.measureText(t).width;if(t!==` `){let a=h(r?.[l]??null,n.fontSize);(!a||a.alpha>0)&&sc(e,t,c,s,i,n.cssFont,n.fontSize,o?.[l]??n.color,_,g,a)}c+=i+n.letterSpacing,l++}if(n.underline){let t=h(r?.find(e=>e!==null)??null,n.fontSize),a=t&&t.rotation!==0?{...t,rotation:0}:t;if(!a||a.alpha>0){if(e.save(),a){let t=N(n),r=i+n.startX+t/2,o=s;e.translate(a.dx,a.dy),e.translate(r,o),a.scale!==1&&e.scale(a.scale,a.scale),e.translate(-r,-o),a.alpha!==1&&(e.globalAlpha*=a.alpha)}e.fillStyle=n.color,pc(e,n,i+n.startX,s),e.restore()}}}}function lc(e,t,n,r){let i=e.textShadow?.blur??0,a=Math.abs(e.textShadow?.offsetX??0),o=Math.abs(e.textShadow?.offsetY??0),s=e.fontSize??0,c=Math.ceil(i*2+a+s*.5),l=Math.ceil(i*2+o+s*.7),u=Math.max(1,Math.ceil(t)+c*2),d=Math.max(1,Math.ceil(n)+l*2);if(u*d>32e6)return null;let f=new OffscreenCanvas(u,d),p=f.getContext(`2d`);return p?(ac(p,e,t,n,c,l,r),{canvas:f,padX:c,padY:l,bytes:u*d*4}):null}function uc(e,t,n,r,i){let{canvasSettings:a}=r,o=a.width/2+n.x-n.width/2,s=a.height/2+n.y-n.height/2;if(i){e.save(),r.renderMode!==`preview`&&(e.beginPath(),e.rect(o,s,n.width,n.height),e.clip()),cc(e,t,n.width,n.height,o,s,r,i),e.restore();return}let c=r.textRasterCache;if(r.renderMode===`preview`&&c&&n.width>=1&&n.height>=1){let i=rc(t,n.width,n.height),a=c.get(i);if(a?(c.delete(i),c.set(i,a)):(a=lc(t,n.width,n.height,r),a&&(c.set(i,a),ic(c))),a){e.drawImage(a.canvas,o-a.padX,s-a.padY);return}}e.save(),r.renderMode!==`preview`&&(e.beginPath(),e.rect(o,s,n.width,n.height),e.clip()),ac(e,t,n.width,n.height,o,s,r),e.restore()}function dc(e,t,n,r,i){let a=i.canvasSettings.fps||30,o=(r-t.from)/a,s=fc(t.cues,o);if(!s)return;let c=Qs(s.text);c.isEmpty||uc(e,{id:t.id,type:`text`,trackId:t.trackId,from:t.from,durationInFrames:t.durationInFrames,label:t.label,mediaId:t.mediaId,text:c.plainText,textSpans:c.spans,fontSize:t.fontSize,fontFamily:t.fontFamily,fontWeight:t.fontWeight,fontStyle:t.fontStyle,underline:t.underline,color:t.color,backgroundColor:t.backgroundColor,backgroundRadius:t.backgroundRadius,textAlign:c.alignment?.textAlign??t.textAlign,verticalAlign:c.alignment?.verticalAlign??t.verticalAlign,lineHeight:t.lineHeight,letterSpacing:t.letterSpacing,textPadding:t.textPadding,textShadow:t.textShadow,stroke:t.stroke,transform:t.transform},n,i)}function fc(e,t){if(e.length===0)return null;let n=0,r=e.length-1;for(;n<=r;){let i=n+r>>1,a=e[i];if(t<a.startSeconds)r=i-1;else if(t>=a.endSeconds)n=i+1;else return a}return null}function pc(e,t,n,r){let i=N(t);if(i<=0)return;let a=r+Math.max(1,t.fontSize*.08),o=e.lineWidth,s=e.strokeStyle;e.beginPath(),e.lineWidth=Math.max(1,t.fontSize*.05),e.strokeStyle=e.fillStyle,e.moveTo(n,a),e.lineTo(n+i,a),e.stroke(),e.lineWidth=o,e.strokeStyle=s}function mc(e,t){let n=t.subCompRenderData.get(e.compositionId),r=e.compositionControlOverrides;if(!n?.compositionControls?.controls.some(e=>typeof r?.[e.id]==`string`)||!r)return n;let i=t.instanceSubCompRenderDataCache?.get(e.id);if(i?.source===n&&i.overrides===r)return i.resolved;let a=n.itemsById?[...n.itemsById.values()]:n.sortedTracks.flatMap(e=>e.items),o=g(a,n.compositionControls,r),s=new Map(o.map(e=>[e.id,e])),c={...n,sortedTracks:n.sortedTracks.map(e=>({...e,items:e.items.map(e=>s.get(e.id)??e)})),itemsById:s};return t.instanceSubCompRenderDataCache?.set(e.id,{source:n,overrides:r,resolved:c}),c}async function hc(e,t,n,r,i,a){let o=mc(t,i);if(!o){r===0&&qo.warn(`renderCompositionItem: no subCompRenderData found`,{compositionId:t.compositionId.substring(0,8),mapSize:i.subCompRenderData.size,mapKeys:Array.from(i.subCompRenderData.keys()).map(e=>e.substring(0,8))});return}let s=a??Zn(t),c=Qn(t,s),l=$n(t,r,i.fps,o.fps,s);if(l<0||l>=o.durationInFrames){r<5&&qo.warn(`renderCompositionItem: localFrame out of range`,{frame:r,itemFrom:s.from,sourceOffset:c,localFrame:l,durationInFrames:o.durationInFrames});return}let{canvas:u,ctx:d}=i.canvasPool.acquire(),{canvas:f,ctx:p}=i.canvasPool.acquire();try{let a=lr(i.canvasSettings),s=Math.max(2,Math.round(t.compositionWidth*a.x)),c=Math.max(2,Math.round(t.compositionHeight*a.y));u.width=s,u.height=c,f.width=s,f.height=c,d.clearRect(0,0,u.width,u.height),p.clearRect(0,0,f.width,f.height);let m={width:s,height:c,logicalWidth:t.compositionWidth,logicalHeight:t.compositionHeight,fps:o.fps},h={width:s,height:c,logicalWidth:t.compositionWidth,logicalHeight:t.compositionHeight,fps:o.fps},g=gc(i,o,m),_=[];for(let e of o.sortedTracks)if(e.visible)for(let t of e.items){if(l<t.from||l>=t.from+t.durationInFrames||t.type!==`shape`||!t.isMask)continue;let n=wr(t,o.keyframesMap.get(t.id),l,m),r=i.renderMode===`preview`?xt(t,i.getPreviewPathVerticesOverride):t;_.push({...Va(r,n,h),trackOrder:e.order})}let v=o.adjustmentLayers??[],y=_c(o,l,m,v,i,_),b=0;for(let e of o.sortedTracks){if(!e.visible||y!==null&&e.order>y)continue;let t=_.filter(t=>so(t.trackOrder,e.order));for(let n of e.items){if(l<n.from||l>=n.from+n.durationInFrames||n.type===`shape`&&n.isMask||n.type===`adjustment`||n.type===`controller`)continue;let a=wr(n,o.keyframesMap.get(n.id),l,m);r===0&&qo.info(`Rendering sub-comp item`,{itemId:n.id.substring(0,8),type:n.type,localFrame:l,subItemFrom:n.from,subItemDuration:n.durationInFrames,hasExtractor:i.videoExtractors.has(n.id),hasImage:i.imageElements.has(n.id),hasGif:i.gifFramesMap.has(n.id)});let u=eo((i.renderMode===`preview`?i.getPreviewEffectsOverride?.(n.id):void 0)??n.effects,$a(e.order,v,l,i.renderMode===`preview`?i.getPreviewEffectsOverride:void 0,i.renderMode===`preview`?i.getLiveItemSnapshotById:void 0)),d=u.length>0;if(!d&&t.length===0)await i.renderItem(p,n,a,l,g);else if(d){let{canvas:e,ctx:r}=i.canvasPool.acquire();e.width=s,e.height=c,r.clearRect(0,0,e.width,e.height);try{await i.renderItem(r,n,a,l,g,0,void 0,t);let{source:o,poolCanvases:s}=await Xa(i.canvasPool,e,u,L(n.cornerPin)?[]:t,l,h,i.gpuPipeline);p.drawImage(o,0,0);for(let e of s)i.canvasPool.release(e)}finally{i.canvasPool.release(e)}}else{let{canvas:e,ctx:r}=i.canvasPool.acquire();try{e.width=s,e.height=c,r.clearRect(0,0,e.width,e.height),await i.renderItem(r,n,a,l,g,0,void 0,t),L(n.cornerPin)?p.drawImage(e,0,0):Ka(p,e,t,h)}finally{i.canvasPool.release(e)}}b++}}r===0&&qo.info(`Sub-comp render complete`,{compositionId:t.compositionId.substring(0,8),localFrame:l,renderedSubItems:b,trackCount:o.sortedTracks.length}),d.drawImage(f,0,0),fs(e,u,u.width,u.height,n,i.canvasSettings,t.crop,void 0,i.canvasPool,`fill`)}finally{i.canvasPool.release(f),i.canvasPool.release(u)}}function gc(e,t,n){let r=t.itemsById??new Map(t.sortedTracks.flatMap(e=>e.items.map(e=>[e.id,e])));return n.getExpressionItem=e=>r.get(e),n.getExpressionKeyframes=e=>t.keyframesMap.get(e),{...e,fps:t.fps,canvasSettings:n,keyframesMap:t.keyframesMap,getCurrentKeyframes:n=>t.keyframesMap.get(n)??e.getCurrentKeyframes?.(n)}}function _c(e,t,n,r,i,a=[]){for(let o of[...e.sortedTracks].sort((e,t)=>e.order-t.order))if(o.visible&&!a.some(e=>so(e.trackOrder,o.order))){for(let a of o.items)if(yc(a,o.order,t,n,e.keyframesMap,r,i))return o.order}return null}function vc(e,t,n,r){let i={width:n.width,height:n.height,logicalWidth:n.logicalWidth,logicalHeight:n.logicalHeight,fps:n.fps},a=[];for(let o of e.sortedTracks)if(o.visible)for(let s of o.items){if(t<s.from||t>=s.from+s.durationInFrames||s.type!==`shape`||!s.isMask)continue;let c=r.renderMode===`preview`?xt(s,r.getPreviewPathVerticesOverride):s,l=wr(s,e.keyframesMap.get(s.id),t,n);a.push({...Va(c,l,i),shape:c,transform:l,trackOrder:o.order})}return a}function yc(e,t,n,r,i,a,o){if(n<e.from||n>=e.from+e.durationInFrames||e.type!==`video`&&e.type!==`image`||e.type===`video`&&o.videoExtractors.get(e.id)?.getCanBeTransparent()||e.blendMode&&e.blendMode!==`normal`||L(e.cornerPin)||((o.renderMode===`preview`?o.getPreviewEffectsOverride?.(e.id):void 0)??e.effects??[]).some(e=>e.enabled!==!1)||$a(t,a,n,o.renderMode===`preview`?o.getPreviewEffectsOverride:void 0,o.renderMode===`preview`?o.getLiveItemSnapshotById:void 0).some(e=>e.enabled!==!1))return!1;let s=i.get(e.id);if(x(Tr(e,s,n,r)))return!1;let c=wr(e,s,n,r);if(c.opacity<1)return!1;let l=c.rotation%360;if(l!==0&&l!==180&&l!==-180||c.cornerRadius>0)return!1;let u=r.width/2+c.x-c.width/2,d=r.height/2+c.y-c.height/2,f=u+c.width,p=d+c.height;return u<=1&&d<=1&&f>=r.width-1&&p>=r.height-1}function bc(e){let t=0;for(let n of e.values())t+=n.bytes;for(let[n,r]of e){if(t<=256e6||e.size<=1)break;e.delete(n),t-=r.bytes}}async function xc(e,t,n,r,i,a=0,o,s=[]){let c=i.getCurrentKeyframes?.(t.id)??i.keyframesMap.get(t.id),l=ur(i.canvasSettings),u=i.canvasSettings.getExpressionItem&&i.canvasSettings.getExpressionKeyframes?{globalFrame:r,canvas:l,getItem:i.canvasSettings.getExpressionItem,getKeyframes:i.canvasSettings.getExpressionKeyframes}:void 0,d=Zo(t.type===`text`?mr({...S(t,c,r-t.from,l),cornerPin:t.cornerPin},i.canvasSettings):t.type===`shape`?gr(P(t,c,r-t.from,u),i.canvasSettings):t.type===`subtitle`?hr(t,i.canvasSettings):t,r,i,o),f=Jo(n),p=d.type===`text`&&!L(d.cornerPin)?M(d,f):f;if(L(d.cornerPin)){await Cc(e,d,p,r,i,a,o,s);return}if(e.save(),p.opacity!==1&&(e.globalAlpha=p.opacity),Yo(e,d,p,i.canvasSettings),p.cornerRadius>0){let t=i.canvasSettings.width/2+p.x-p.width/2,n=i.canvasSettings.height/2+p.y-p.height/2;e.beginPath(),e.roundRect(t,n,p.width,p.height,p.cornerRadius),e.clip()}await Sc(e,d,p,r,i,a,o),e.restore()}async function Sc(e,t,n,r,i,a,o){let s=i.renderMode===`preview`?St(t,i.getPreviewPathVerticesOverride):t;switch(s.type){case`video`:await ks(e,s,n,r,i,a,o)||i.renderMode===`preview`&&i.markActivePreviewFramePending?.();break;case`image`:await i.ensureImageItemReady?.(s),Js(e,s,n,i,r);break;case`lottie`:await i.ensureLottieItemReady?.(s),Ys(e,s,n,i,r);break;case`text`:{let t=s,a=r-t.from;uc(e,t,n,i,t.textMotion&&Hi(t.textMotion,a,i.canvasSettings.fps,t.durationInFrames)?{relativeFrame:a,fps:i.canvasSettings.fps,durationInFrames:t.durationInFrames}:void 0);break}case`subtitle`:dc(e,s,n,r,i);break;case`shape`:Ko(e,s,{...Jo(n),rotation:0},{width:i.canvasSettings.width,height:i.canvasSettings.height});break;case`composition`:await hc(e,s,n,r,i,o)}}async function Cc(e,t,n,r,i,a,o,s=[]){let c=Math.ceil(n.width),l=Math.ceil(n.height);if(c<=0||l<=0)return;let u=new OffscreenCanvas(c,l),d=u.getContext(`2d`);if(!d)return;let f={...n,x:0,y:0},p={...i,canvasSettings:{width:c,height:l,fps:i.canvasSettings.fps}};if(s.length>0){let e=new OffscreenCanvas(i.canvasSettings.width,i.canvasSettings.height),u=e.getContext(`2d`);if(!u)return;await Sc(u,t,n,r,i,a,o);let f=new OffscreenCanvas(i.canvasSettings.width,i.canvasSettings.height),p=f.getContext(`2d`);if(!p)return;Ka(p,e,s,i.canvasSettings);let m=i.canvasSettings.width/2+n.x-n.width/2,h=i.canvasSettings.height/2+n.y-n.height/2;d.drawImage(f,m,h,c,l,0,0,c,l)}else await Sc(d,t,f,r,p,a,o);n.cornerRadius>0&&(d.save(),d.globalCompositeOperation=`destination-in`,d.beginPath(),d.roundRect(0,0,c,l,n.cornerRadius),d.fill(),d.restore());let m=i.canvasSettings.width/2+n.x-n.width/2,h=i.canvasSettings.height/2+n.y-n.height/2,g=n.opacity!==1,_=fe(c,l,t.type===`video`||t.type===`image`||t.type===`composition`?{sourceWidth:t.type===`composition`?t.compositionWidth:t.sourceWidth,sourceHeight:t.type===`composition`?t.compositionHeight:t.sourceHeight,crop:t.crop,fitMode:t.type===`composition`?`fill`:`contain`}:void 0),v=Math.max(1,Math.round(_.width)),y=Math.max(1,Math.round(_.height)),b=de(t.cornerPin,v,y);if(!b)return;let x=v===c&&y===l&&Math.abs(_.x)<.01&&Math.abs(_.y)<.01?u:new OffscreenCanvas(v,y);if(x!==u){let e=x.getContext(`2d`);if(!e)return;e.clearRect(0,0,v,y),e.drawImage(u,_.x,_.y,_.width,_.height,0,0,v,y)}let S=t.type===`text`?`projective`:`mesh`,C=m+_.x,w=h+_.y,T=e=>{let r=i.cornerPinWarpCache;if(S===`projective`&&i.renderMode===`preview`&&r){let i=`${rc(t,n.width,n.height)}|cp:${JSON.stringify(b)}|${v}x${y}|cr:${n.cornerRadius}|m:${JSON.stringify(s)}`,a=r.get(i);if(a)r.delete(i),r.set(i,a);else{let e=R(x,v,y,b);e&&(a={canvas:e.canvas,offsetX:e.offsetX,offsetY:e.offsetY,bytes:e.canvas.width*e.canvas.height*4},r.set(i,a),bc(r))}if(a){e.drawImage(a.canvas,C+a.offsetX,w+a.offsetY);return}}let a=[e,x,v,y,C,w,b];if(S===`projective`){_e(...a,void 0,S);return}_e(...a)};e.save(),g&&(e.globalAlpha=n.opacity),Yo(e,t,n,i.canvasSettings);try{if(g){let{canvas:t,ctx:n}=i.canvasPool.acquire();try{(t.width!==i.canvasSettings.width||t.height!==i.canvasSettings.height)&&(t.width=i.canvasSettings.width,t.height=i.canvasSettings.height),n.clearRect(0,0,t.width,t.height),T(n),e.drawImage(t,0,0)}finally{i.canvasPool.release(t)}}else T(e)}finally{e.restore()}}const wc=n(`TransitionRegistry`),Tc=new class{entries=/* @__PURE__ */ new Map;register(e,t,n){this.entries.has(e)&&wc.warn(`Transition "${e}" is being overwritten`),this.entries.set(e,{definition:t,renderer:n})}unregister(e){return this.entries.delete(e)}getRenderer(e){return this.entries.get(e)?.renderer}getDefinition(e){return this.entries.get(e)?.definition}has(e){return this.entries.has(e)}getDefinitions(){return Array.from(this.entries.values()).map(e=>e.definition)}getIds(){return Array.from(this.entries.keys())}get size(){return this.entries.size}};function Ec(e){return Math.max(0,Math.min(1,e))}function Dc(e,t){let n=Math.cos(e*Math.PI/2);return t?n*n:1-n*n}function Oc(e,t){return t?1-.04*e:1.04-.04*e}function kc(e,t,n,r,i,a){e.save(),e.globalAlpha=a,e.translate(n/2,r/2),e.scale(i,i),e.translate(-n/2,-r/2),e.drawImage(t,0,0),e.restore()}const Ac={gpuTransitionId:`fade`,renderCanvas(e,t,n,r,i,a){let o=Ec(r),s=a?.width??Math.max(t.width,n.width),c=a?.height??Math.max(t.height,n.height);e.save(),e.globalCompositeOperation=`copy`,kc(e,n,s,c,Oc(o,!1),Dc(o,!1)),e.globalCompositeOperation=`lighter`,kc(e,t,s,c,Oc(o,!0),Dc(o,!0)),e.restore()}},jc={id:`fade`,label:`Fade`,description:`Equal-power crossfade between clips`,category:`basic`,icon:`Blend`,hasDirection:!1,supportedTimings:[`linear`,`ease-in`,`ease-out`,`ease-in-out`,`cubic-bezier`],defaultDuration:30,minDuration:5,maxDuration:90};function Mc(e){e.register(`fade`,jc,Ac)}const Nc=[`linear`,`ease-in`,`ease-out`,`ease-in-out`,`cubic-bezier`];function Pc(e){return Math.max(0,Math.min(1,e))}function Fc(e,t,n,r,i){let a=Pc(i),o=n/2,s=r/2;if(t===`barnDoor`){let t=Math.max(0,o*(1-a));e.rect(0,0,t,r),e.rect(n-t,0,t,r);return}let c=Math.max(0,o*(1-a)),l=Math.max(0,s*(1-a));e.rect(0,0,c,l),e.rect(n-c,0,c,l),e.rect(0,r-l,c,l),e.rect(n-c,r-l,c,l)}function Ic(e){return{renderCanvas(t,n,r,i,a,o){let s=Pc(i),c=o?.width??n.width,l=o?.height??n.height;t.drawImage(r,0,0,c,l),t.save();let u=new Path2D;Fc(u,e,c,l,s),t.clip(u),t.drawImage(n,0,0,c,l),t.restore()}}}const Lc={id:`barnDoor`,label:`Barn Door`,description:`Center-opening two-panel reveal`,category:`motion`,icon:`Columns2`,hasDirection:!1,supportedTimings:[...Nc],defaultDuration:30,minDuration:5,maxDuration:90},Rc={id:`split`,label:`Split`,description:`Four-panel split reveal`,category:`motion`,icon:`SplitSquareVertical`,hasDirection:!1,supportedTimings:[...Nc],defaultDuration:30,minDuration:5,maxDuration:90};function zc(e){e.register(`barnDoor`,Lc,Ic(`barnDoor`)),e.register(`split`,Rc,Ic(`split`))}const Bc=[`linear`,`ease-in`,`ease-out`,`ease-in-out`,`cubic-bezier`];function Vc(e){return Math.max(0,Math.min(1,e))}function Hc(e,t){return Math.sqrt((e/2)**2+(t/2)**2)*1.2}const Uc={gpuTransitionId:`clockWipe`,renderCanvas(e,t,n,r,i,a){let o=Vc(r),s=a?.width??t.width,c=a?.height??t.height,l=s/2,u=c/2,d=Math.sqrt(s*s+c*c),f=-Math.PI/2,p=f+o*Math.PI*2;e.save(),e.globalAlpha=.85+.15*o,e.drawImage(n,0,0,s,c),e.restore(),e.save();let m=new Path2D;m.moveTo(l,u),m.arc(l,u,d,p,f+Math.PI*2,!1),m.closePath(),e.clip(m),e.globalAlpha=1-.1*o,e.drawImage(t,0,0,s,c),e.restore()}},Wc={id:`clockWipe`,label:`Clock Wipe`,description:`Circular wipe like a clock hand`,category:`wipe`,icon:`Clock`,hasDirection:!1,supportedTimings:[...Bc],defaultDuration:30,minDuration:10,maxDuration:90,parameters:[{key:`edgeSoftness`,label:`Softness`,type:`number`,defaultValue:8,min:0,max:32,step:.5,unit:`px`,description:`Clock hand edge feather`}]},Gc={gpuTransitionId:`iris`,renderCanvas(e,t,n,r,i,a){let o=Vc(r),s=a?.width??t.width,c=a?.height??t.height,l=o*Hc(s,c),u=s/2,d=c/2;e.save(),e.globalAlpha=.85+.15*o,e.drawImage(n,0,0,s,c),e.restore(),e.save();let f=new Path2D;f.rect(0,0,s,c),f.arc(u,d,l,0,Math.PI*2),e.clip(f,`evenodd`),e.globalAlpha=1-.1*o,e.drawImage(t,0,0,s,c),e.restore()}},Kc={id:`iris`,label:`Iris`,description:`Circular iris expanding/contracting`,category:`iris`,icon:`Circle`,hasDirection:!1,supportedTimings:[...Bc],defaultDuration:30,minDuration:10,maxDuration:90,parameters:[{key:`edgeSoftness`,label:`Softness`,type:`number`,defaultValue:6,min:0,max:32,step:.5,unit:`px`,description:`Iris edge feather`}]};function qc(e){e.has(`clockWipe`)||e.register(`clockWipe`,Wc,Uc),e.register(`iris`,Kc,Gc)}const Jc=[`from-left`,`from-right`,`from-top`,`from-bottom`],Yc=[`linear`,`ease-in`,`ease-out`,`ease-in-out`,`cubic-bezier`];function Xc(e){return Math.max(0,Math.min(1,e))}function Zc(e,t,n,r){return{x:e+Math.cos(r)*n,y:t+Math.sin(r)*n}}function Qc(e,t,n){let r=Xc(n);if(r===0)return 0;let i=Math.sqrt(e*e+t*t)*.58/3.8;return Math.max(0,i*(.04+r*1.25))}function $c(e,t,n){return Math.sqrt(e*e+t*t)*Xc(n)*.36}function el(e,t,n,r){let i=Xc(r);if(i<=0){e.rect(0,0,t,n);return}if(i>=1)return;let a=t/2,o=n/2,s=Math.sqrt(t*t+n*n),c=Math.PI*2/4;for(let t=0;t<4;t+=1){let n=-Math.PI/2+t*c,r=n+i*c,l=n+c,u=Zc(a,o,s,r);e.moveTo(a,o),e.lineTo(u.x,u.y),e.arc(a,o,s,r,l),e.closePath()}}function tl(e,t,n,r){let i=t/2,a=n/2,o=Math.sqrt(t*t+n*n)*.58;e.save(),e.globalCompositeOperation=`destination-out`,e.lineCap=`round`,e.lineJoin=`round`,e.lineWidth=Qc(t,n,r),e.beginPath();for(let t=0;t<=220;t+=1){let n=t/220,r=n*Math.PI*2*3.8,s=o*n,c=i+Math.cos(r)*s,l=a+Math.sin(r)*s;t===0?e.moveTo(c,l):e.lineTo(c,l)}e.stroke(),e.restore()}function nl(e,t,n,r){e.save(),e.globalCompositeOperation=`destination-out`,e.lineCap=`butt`,e.lineWidth=$c(t,n,r),e.beginPath(),e.moveTo(0,0),e.lineTo(t,n),e.moveTo(t,0),e.lineTo(0,n),e.stroke(),e.restore()}function rl(e,t,n,r,i,a=`from-top`){let o=Xc(i);if(t===`band`){let t=r/10;for(let r=0;r<10;r+=1){let i=r%2*.18,a=n*Xc((o-i)/Math.max(.2,1-i));r%2==0?e.rect(a,r*t,n-a,t):e.rect(0,r*t,n-a,t)}return}if(t===`venetianBlind`){let t=r/10;for(let r=0;r<10;r+=1){let i=r*t;e.rect(0,i,n,t*(1-o))}return}if(t===`center`){let t=n/2*(1-o);e.rect(0,0,t,r),e.rect(n-t,0,t,r);return}if(t===`edge`){switch(a){case`from-left`:e.rect(n*o,0,n*(1-o),r);break;case`from-right`:e.rect(0,0,n*(1-o),r);break;case`from-bottom`:e.rect(0,0,n,r*(1-o));break;default:e.rect(0,r*o,n,r*(1-o))}return}if(t===`radial`){el(e,n,r,o);return}if(t===`spiral`)return;let s=n/2*o,c=r/2*o;e.moveTo(0,0),e.lineTo(s,0),e.lineTo(0,c),e.closePath(),e.moveTo(n,0),e.lineTo(n-s,0),e.lineTo(n,c),e.closePath(),e.moveTo(0,r),e.lineTo(s,r),e.lineTo(0,r-c),e.closePath(),e.moveTo(n,r),e.lineTo(n-s,r),e.lineTo(n,r-c),e.closePath()}function il(e){let t=null,n=null;function r(e,r){return(!t||t.width!==e||t.height!==r)&&(t=new OffscreenCanvas(e,r),n=t.getContext(`2d`)),n?(n.clearRect(0,0,e,r),{canvas:t,ctx:n}):null}return{renderCanvas(t,n,i,a,o,s){let c=Xc(a),l=o||`from-top`,u=s?.width??n.width,d=s?.height??n.height;if(t.drawImage(i,0,0,u,d),e===`spiral`){let e=r(u,d);if(!e)return;e.ctx.drawImage(n,0,0,u,d),tl(e.ctx,u,d,c),t.drawImage(e.canvas,0,0);return}if(e===`x`){let e=r(u,d);if(!e)return;e.ctx.drawImage(n,0,0,u,d),nl(e.ctx,u,d,c),t.drawImage(e.canvas,0,0);return}t.save();let f=new Path2D,p=rl(f,e,u,d,c,l);p?t.clip(f,p):t.clip(f),t.drawImage(n,0,0,u,d),t.restore()}}}const al={gpuTransitionId:`wipe`,renderCanvas(e,t,n,r,i,a){let o=Xc(r),s=i||`from-left`,c=a?.width??t.width,l=a?.height??t.height,u=new Path2D,d=new Path2D;switch(s){case`from-left`:d.rect(0,0,o*c,l),u.rect(o*c,0,c,l);break;case`from-right`:d.rect((1-o)*c,0,c,l),u.rect(0,0,(1-o)*c,l);break;case`from-top`:d.rect(0,0,c,o*l),u.rect(0,o*l,c,l);break;case`from-bottom`:d.rect(0,(1-o)*l,c,l),u.rect(0,0,c,(1-o)*l)}e.save(),e.clip(d),e.drawImage(n,0,0),e.restore(),e.save(),e.clip(u),e.drawImage(t,0,0),e.restore()}},ol={id:`wipe`,label:`Slide`,description:`Slide reveal from one direction`,category:`motion`,icon:`ArrowRight`,hasDirection:!0,directions:Jc,supportedTimings:[...Yc],defaultDuration:30,minDuration:5,maxDuration:90},sl=[{id:`bandWipe`,label:`Band Wipe`,description:`Alternating band wipe reveal`,icon:`Rows3`,mask:`band`},{id:`centerWipe`,label:`Center Wipe`,description:`Center-opening wipe reveal`,icon:`Columns2`,mask:`center`},{id:`edgeWipe`,label:`Edge Wipe`,description:`Single-edge wipe reveal`,icon:`PanelTopOpen`,mask:`edge`},{id:`radialWipe`,label:`Radial Wipe`,description:`Radial wedge wipe reveal`,icon:`Asterisk`,mask:`radial`},{id:`spiralWipe`,label:`Spiral Wipe`,description:`Spiral-style rotating wipe reveal`,icon:`RotateCw`,mask:`spiral`},{id:`venetianBlindWipe`,label:`Venetian Blind Wipe`,description:`Horizontal blind wipe reveal`,icon:`Rows4`,mask:`venetianBlind`},{id:`xWipe`,label:`X Wipe`,description:`X-shaped wipe reveal`,icon:`X`,mask:`x`}];function cl(e){let t=e.id===`edgeWipe`;return{id:e.id,label:e.label,description:e.description,category:`wipe`,icon:e.icon,hasDirection:t,directions:t?Jc:void 0,supportedTimings:[...Yc],defaultDuration:30,minDuration:5,maxDuration:90}}function ll(e){e.register(`wipe`,ol,al);for(let t of sl)e.register(t.id,cl(t),il(t.mask)),t.id===`centerWipe`&&e.register(`clockWipe`,Wc,Uc)}const ul=[`from-left`,`from-right`,`from-top`,`from-bottom`],dl=[`linear`,`ease-in`,`ease-out`,`ease-in-out`,`cubic-bezier`];function fl(e,t,n,r,i){let a=n?e:e-1;switch(t){case`from-left`:return{x:Math.round(a*r),y:0};case`from-right`:return{x:Math.round(-a*r),y:0};case`from-top`:return{x:0,y:Math.round(a*i)};case`from-bottom`:return{x:0,y:Math.round(-a*i)};default:return{x:0,y:0}}}const pl={gpuTransitionId:`slide`,renderCanvas(e,t,n,r,i,a){let o=i||`from-left`,s=a?.width??t.width,c=a?.height??t.height,l=fl(r,o,!1,s,c);e.drawImage(n,l.x,l.y);let u=fl(r,o,!0,s,c);e.drawImage(t,u.x,u.y)}},ml={id:`slide`,label:`Push`,description:`Push between clips from a direction`,category:`motion`,icon:`MoveRight`,hasDirection:!0,directions:ul,supportedTimings:[...dl],defaultDuration:30,minDuration:5,maxDuration:90};function hl(e){e.register(`slide`,ml,pl)}const gl=[`from-left`,`from-right`,`from-top`,`from-bottom`],_l=[`linear`,`ease-in`,`ease-out`,`ease-in-out`,`cubic-bezier`],vl={gpuTransitionId:`flip`,renderCanvas(e,t,n,r,i,a){let o=Math.max(0,Math.min(1,r)),s=i||`from-left`,c=s===`from-left`||s===`from-right`,l=a?.width??t.width,u=a?.height??t.height,d=.5;if(o<d){let n=o/d,r=Math.cos(n*Math.PI/2);e.save(),e.translate(l/2,u/2),c?e.scale(r,1):e.scale(1,r),e.translate(-l/2,-u/2),e.drawImage(t,0,0),e.restore()}else{let t=(o-d)/d,r=Math.sin(t*Math.PI/2);e.save(),e.translate(l/2,u/2),c?e.scale(r,1):e.scale(1,r),e.translate(-l/2,-u/2),e.drawImage(n,0,0),e.restore()}}},yl={id:`flip`,label:`Flip`,description:`3D flip transition`,category:`custom`,icon:`FlipHorizontal`,hasDirection:!0,directions:gl,supportedTimings:[..._l],defaultDuration:30,minDuration:10,maxDuration:60};function bl(e){e.register(`flip`,yl,vl)}const xl=[`linear`,`ease-in`,`ease-out`,`ease-in-out`,`cubic-bezier`];function Sl(e){return Math.max(0,Math.min(1,e))}function Cl(e,t,n){let r=e?.[t];return typeof r!=`number`||!Number.isFinite(r)?n:r}function wl(e,t,n){return Sl(e)*Math.max(t,n)*1.45}function Tl(e,t=-Math.PI/2){return Array.from({length:e},(n,r)=>{let i=t+r/e*Math.PI*2;return{x:Math.cos(i),y:Math.sin(i)}})}function El(e){switch(e){case`arrow`:return[{x:0,y:-1},{x:.68,y:1},{x:0,y:.36},{x:-.68,y:1}];case`cross`:return[{x:-.28,y:-1},{x:.28,y:-1},{x:.28,y:-.28},{x:1,y:-.28},{x:1,y:.28},{x:.28,y:.28},{x:.28,y:1},{x:-.28,y:1},{x:-.28,y:.28},{x:-1,y:.28},{x:-1,y:-.28},{x:-.28,y:-.28}];case`diamond`:return Tl(4);case`hexagon`:return Tl(6,0);case`pentagon`:return Tl(5);case`square`:return[{x:-1,y:-1},{x:1,y:-1},{x:1,y:1},{x:-1,y:1}];case`triangle`:return Tl(3);default:return[]}}function Dl(e,t,n,r){return e===`eye`?{rx:r*1.02,ry:r*.42}:{rx:r*(t>=n?1.15:.85),ry:r*.72}}function Ol(e,t,n,r,i){let a=Sl(i),o=n/2,s=r/2,c=wl(a,n,r);if(t===`oval`||t===`eye`){let{rx:i,ry:a}=Dl(t,n,r,c);if(t===`eye`){e.moveTo(o-i,s),e.bezierCurveTo(o-i*.5,s-a,o+i*.5,s-a,o+i,s),e.bezierCurveTo(o+i*.5,s+a,o-i*.5,s+a,o-i,s),e.closePath();return}e.ellipse(o,s,i,a,0,0,Math.PI*2);return}El(t).forEach((t,n)=>{let r=o+t.x*c,i=s+t.y*c;n===0?e.moveTo(r,i):e.lineTo(r,i)}),e.closePath()}function kl(e){return{renderCanvas(t,n,r,i,a,o,s){let c=Sl(i),l=o?.width??n.width,u=o?.height??n.height,d=Math.max(0,Math.min(.12,Cl(s,`outgoingDim`,.06)));t.save(),t.globalAlpha=.9+.1*c,t.drawImage(r,0,0,l,u),t.restore(),t.save();let f=new Path2D;f.rect(0,0,l,u),Ol(f,e,l,u,c),t.clip(f,`evenodd`),t.globalAlpha=1-d*c,t.drawImage(n,0,0,l,u),t.restore()}}}const Al=[{id:`arrowIris`,label:`Arrow Iris`,description:`Arrow-shaped iris reveal`,icon:`ArrowUp`,shape:`arrow`},{id:`crossIris`,label:`Cross Iris`,description:`Cross-shaped iris reveal`,icon:`Plus`,shape:`cross`},{id:`diamondIris`,label:`Diamond Iris`,description:`Diamond-shaped iris reveal`,icon:`Diamond`,shape:`diamond`},{id:`eyeIris`,label:`Eye Iris`,description:`Eye-shaped iris reveal`,icon:`Eye`,shape:`eye`},{id:`hexagonIris`,label:`Hexagon Iris`,description:`Hexagon-shaped iris reveal`,icon:`Hexagon`,shape:`hexagon`},{id:`ovalIris`,label:`Oval Iris`,description:`Oval-shaped iris reveal`,icon:`Circle`,shape:`oval`},{id:`pentagonIris`,label:`Pentagon Iris`,description:`Pentagon-shaped iris reveal`,icon:`Pentagon`,shape:`pentagon`},{id:`squareIris`,label:`Square Iris`,description:`Square-shaped iris reveal`,icon:`Square`,shape:`square`},{id:`triangleIris`,label:`Triangle Iris`,description:`Triangle-shaped iris reveal`,icon:`Triangle`,shape:`triangle`}];function jl(e){return{id:e.id,label:e.label,description:e.description,category:`iris`,icon:e.icon,hasDirection:!1,supportedTimings:[...xl],defaultDuration:30,minDuration:10,maxDuration:90,parameters:[{key:`outgoingDim`,label:`Dim`,type:`number`,defaultValue:.06,min:0,max:.12,step:.005,description:`Outgoing clip dim amount during the reveal`}]}}function Ml(e){for(let t of Al)e.register(t.id,jl(t),kl(t.shape))}const Nl=[`linear`,`ease-in`,`ease-out`,`ease-in-out`,`cubic-bezier`],Pl=2.24;function Fl(e){return Math.max(0,Math.min(1,e))}function Il(e,t,n,r){return e===`box`?Fl(t)*Math.max(n/2,r/1.24)*1.12:Fl(t)*Math.max(n,r)*1.45}function Ll(){let e=[];for(let t=0;t<10;t+=1){let n=-Math.PI/2+t/10*Math.PI*2,r=t%2==0?1:.42;e.push({x:Math.cos(n)*r,y:Math.sin(n)*r})}return e}function Rl(e){switch(e){case`box`:return[{x:-1,y:-.62},{x:1,y:-.62},{x:1,y:.62},{x:-1,y:.62}];case`star`:return Ll();case`triangleLeft`:return[{x:-1,y:0},{x:1,y:-.68},{x:1,y:.68}];case`triangleRight`:return[{x:1,y:0},{x:-1,y:-.68},{x:-1,y:.68}];default:return[]}}function zl(e,t,n,r){let i=r;e.moveTo(t,n+.78*i),e.bezierCurveTo(t-1.08*i,n+.12*i,t-.96*i,n-.78*i,t-.36*i,n-.78*i),e.bezierCurveTo(t-.12*i,n-.78*i,t,n-.58*i,t,n-.42*i),e.bezierCurveTo(t,n-.58*i,t+.12*i,n-.78*i,t+.36*i,n-.78*i),e.bezierCurveTo(t+.96*i,n-.78*i,t+1.08*i,n+.12*i,t,n+.78*i),e.closePath()}function Bl(e,t,n,r,i){let a=Fl(i);if(t===`triangleLeft`){e.moveTo(0,0),e.lineTo(n*a*Pl,0),e.lineTo(0,r*a*Pl),e.closePath();return}if(t===`triangleRight`){e.moveTo(n,0),e.lineTo(n-n*a*Pl,0),e.lineTo(n,r*a*Pl),e.closePath();return}let o=n/2,s=r/2,c=Il(t,a,n,r);if(t===`heart`){zl(e,o,s,c);return}Rl(t).forEach((t,n)=>{let r=o+t.x*c,i=s+t.y*c;n===0?e.moveTo(r,i):e.lineTo(r,i)}),e.closePath()}function Vl(e){return{renderCanvas(t,n,r,i,a,o){let s=Fl(i),c=o?.width??n.width,l=o?.height??n.height;t.drawImage(r,0,0,c,l),t.save();let u=new Path2D;u.rect(0,0,c,l),Bl(u,e,c,l,s),t.clip(u,`evenodd`),t.drawImage(n,0,0,c,l),t.restore()}}}const Hl=[{id:`boxShape`,label:`Box`,description:`Box-shaped reveal`,icon:`RectangleHorizontal`,shape:`box`},{id:`heartShape`,label:`Heart`,description:`Heart-shaped reveal`,icon:`Heart`,shape:`heart`},{id:`starShape`,label:`Star`,description:`Star-shaped reveal`,icon:`Star`,shape:`star`},{id:`triangleLeftShape`,label:`Triangle Left`,description:`Left-pointing triangle reveal`,icon:`Triangle`,shape:`triangleLeft`},{id:`triangleRightShape`,label:`Triangle Right`,description:`Right-pointing triangle reveal`,icon:`Triangle`,shape:`triangleRight`}];function Ul(e){return{id:e.id,label:e.label,description:e.description,category:`shape`,icon:e.icon,hasDirection:!1,supportedTimings:[...Nl],defaultDuration:30,minDuration:10,maxDuration:90}}function Wl(e){for(let t of Hl)e.register(t.id,Ul(t),Vl(t.shape))}const q=[`linear`,`ease-in`,`ease-out`,`ease-in-out`,`cubic-bezier`];function J(e){return Math.max(0,Math.min(1,e))}function Gl(e,t,n){let r=Math.max(t-e,2**-52),i=J((n-e)/r);return i*i*(3-2*i)}function Kl(e,t,n){let r=e?.[t];return typeof r!=`number`||!Number.isFinite(r)?n:r}function Y(e){let t=Math.sin(e*12.9898+78.233)*43758.5453123;return t-Math.floor(t)}function X(e,t){return t?Math.cos(e*Math.PI/2):Math.sin(e*Math.PI/2)}function ql(e){return .5-.5*Math.cos(J(e)*Math.PI)}function Jl(e,t,n){let r=J(t);return{p:r,w:n?.width??e.width,h:n?.height??e.height,envelope:Math.sin(r*Math.PI)}}function Yl(e,t,n,r,i){let a=ql(r),o=i?.width??t.width,s=i?.height??t.height;e.save(),e.globalCompositeOperation=`copy`,e.globalAlpha=1,e.drawImage(t,0,0,o,s),e.globalCompositeOperation=`source-over`,e.globalAlpha=a,e.drawImage(n,0,0,o,s),e.restore()}function Xl(e,t,n,r,i,a){let o=J(r),s=i?.width??t.width,c=i?.height??t.height,l=o<.5?Gl(0,.5,o):1-Gl(.5,1,o),u=a?.color,d=Array.isArray(u)?u:[0,0,0],f=Math.round(J(typeof d[0]==`number`?d[0]:0)*255),p=Math.round(J(typeof d[1]==`number`?d[1]:0)*255),m=Math.round(J(typeof d[2]==`number`?d[2]:0)*255);e.save(),e.globalCompositeOperation=`copy`,e.globalAlpha=1,e.drawImage(o<.5?t:n,0,0,s,c),e.globalCompositeOperation=`source-over`,e.globalAlpha=l,e.fillStyle=`rgb(${f}, ${p}, ${m})`,e.fillRect(0,0,s,c),e.restore()}function Zl(e,t,n,r,i,a){e.beginPath();for(let o=0;o<8;o+=1){let s=a+Math.PI/4*o,c=o%2==0?r:i,l=t+Math.cos(s)*c,u=n+Math.sin(s)*c;o===0?e.moveTo(l,u):e.lineTo(l,u)}e.closePath()}function Ql(e,t,n,r,i,a,o=1,s=1){e.save(),e.translate(t,n),e.rotate(a),e.scale(o,s),Zl(e,0,0,r,i,0),e.fill(),e.restore()}function $l(e,t,n,r,i,a){let o=J(r),s=i?.width??t.width,c=i?.height??t.height,l=Math.max(.55,Kl(a,`sparkleScale`,1)),u=Math.max(.35,Kl(a,`intensity`,1)),d=Math.max(.5,Kl(a,`density`,1)),f=Math.max(0,Kl(a,`glow`,1)),p=1-Gl(.74,1,o);e.save(),e.drawImage(n,0,0,s,c),e.restore();let m=new OffscreenCanvas(s,c),h=m.getContext(`2d`);if(!h){e.save(),e.globalAlpha=X(o,!0),e.drawImage(t,0,0,s,c),e.restore();return}h.clearRect(0,0,s,c),h.save(),h.drawImage(t,0,0,s,c),h.restore();let g=Math.round(24+d*22),_=[];for(let e=0;e<g;e+=1){let t=e+1,n=Math.min(.94,.04+Y(t*31.7)*.72+Y(t*7.9)*.16),r=.14+Y(t*41.9)*.18,i=J((o-n)/r),a=Gl(0,.16,i)*(1-Gl(.3,.95,i)),d=Gl(.06,.72,i);if(a<=.01&&d<=.02)continue;let f=i*(3.6+Y(t*5.3)*3.8)+Y(t*11.1),p=.35+.65*((Math.sin(f*Math.PI*2)+1)/2),m=Math.min(1,a*p*u),g=Math.min(1,d*(.25+p*.35)*u),v=Y(t*13.1)*s,y=Y(t*17.9)*c,b=Y(t*19.7)**.55,x=(4+b*34)*l*(.55+a*1.15),S=Y(t*23.3)*Math.PI*2,C=Math.cos(S),w=Math.sin(S),T=(10+b*28)*a,E=(3+b*10)*a,D=S+i*(2.4+Y(t*29.1)*4.5)*Math.PI,O=v+C*T+Math.cos(D)*E,k=y+w*T+Math.sin(D)*E*.8,A=S+i*(2+b*3.5)*Math.PI;h.save(),h.globalCompositeOperation=`destination-out`,h.globalAlpha=m,h.fillStyle=`rgba(0, 0, 0, 1)`,Ql(h,O,k,x,x*.24,A),h.globalAlpha=m*.46,Ql(h,O-C*x*.9,k-w*x*.9,x*.78,x*.14,A-.45,1.9,.58),h.globalAlpha=m*.22,Ql(h,O-C*x*1.55,k-w*x*1.55,x*.52,x*.12,A-.7,2.4,.42);let j=3+Math.round(b*2);h.globalAlpha=g*.08;for(let e=0;e<j;e+=1){let n=t*53.1+e*7.3,r=Y(n)*Math.PI*2,i=x*(1.3+Y(n*1.7)*2.1)*(.5+d),a=x*(.14+Y(n*2.9)*.24)*(.55+d);h.beginPath(),h.arc(O+Math.cos(r)*i,k+Math.sin(r)*i*.85,a,0,Math.PI*2),h.fill()}h.beginPath(),h.arc(O,k,x*.24,0,Math.PI*2),h.fill(),h.restore(),_.push({x:O,y:k,radius:x*2.6,alpha:Math.min(1,m+g*.45),veilRadius:x*5.4})}if(_.length>0&&f>0){e.save(),e.globalCompositeOperation=`screen`;for(let t of _){let n=e.createRadialGradient(t.x,t.y,0,t.x,t.y,t.veilRadius);n.addColorStop(0,`rgba(255, 245, 228, ${.12*t.alpha*f})`),n.addColorStop(.45,`rgba(255, 226, 184, ${.06*t.alpha*f})`),n.addColorStop(1,`rgba(255, 214, 165, 0)`),e.fillStyle=n,e.fillRect(t.x-t.veilRadius,t.y-t.veilRadius,t.veilRadius*2,t.veilRadius*2)}e.restore()}if(e.save(),e.globalAlpha=p,e.drawImage(m,0,0),e.restore(),!(_.length===0||f<=0)){e.save(),e.globalCompositeOperation=`lighter`;for(let t of _){let n=e.createRadialGradient(t.x,t.y,0,t.x,t.y,t.radius);n.addColorStop(0,`rgba(255, 252, 240, ${.38*t.alpha*f})`),n.addColorStop(.32,`rgba(255, 224, 170, ${.26*t.alpha*f})`),n.addColorStop(1,`rgba(255, 210, 150, 0)`),e.fillStyle=n,e.fillRect(t.x-t.radius,t.y-t.radius,t.radius*2,t.radius*2)}e.restore()}}const eu={gpuTransitionId:`dissolve`,renderCanvas(e,t,n,r,i,a){Yl(e,t,n,r,a)}},tu={id:`dissolve`,label:`Cross Dissolve`,description:`Smooth opacity blend between clips`,category:`dissolve`,icon:`Blend`,hasDirection:!1,supportedTimings:[...q],defaultDuration:30,minDuration:10,maxDuration:90},nu={gpuTransitionId:`additiveDissolve`,renderCanvas(e,t,n,r,i,a){let o=J(r),s=a?.width??t.width,c=a?.height??t.height;e.save(),e.globalCompositeOperation=`copy`,e.globalAlpha=1-o,e.drawImage(t,0,0,s,c),e.globalCompositeOperation=`lighter`,e.globalAlpha=o,e.drawImage(n,0,0,s,c),e.restore()}},ru={id:`additiveDissolve`,label:`Additive Dissolve`,description:`Bright additive blend that flashes through overlapping highlights`,category:`dissolve`,icon:`Layers`,hasDirection:!1,supportedTimings:[...q],defaultDuration:30,minDuration:10,maxDuration:90},iu={gpuTransitionId:`blurDissolve`,renderCanvas(e,t,n,r,i,a,o){let s=J(r),c=Math.sin(s*Math.PI),l=Kl(o,`strength`,9);e.save(),e.filter=`blur(${(c*l).toFixed(2)}px)`,Yl(e,t,n,s,a),e.restore()}},au={id:`blurDissolve`,label:`Blur Dissolve`,description:`Cross dissolve with a soft midpoint blur`,category:`dissolve`,icon:`Droplet`,hasDirection:!1,supportedTimings:[...q],defaultDuration:30,minDuration:10,maxDuration:90,parameters:[{key:`strength`,label:`Blur`,type:`number`,defaultValue:9,min:0,max:24,step:.5,unit:`px`,description:`Maximum midpoint blur`}]},ou={gpuTransitionId:`dipToColorDissolve`,renderCanvas(e,t,n,r,i,a,o){Xl(e,t,n,r,a,o)}},su={id:`dipToColorDissolve`,label:`Dip To Color Dissolve`,description:`Dissolve through a solid color, defaulting to black`,category:`dissolve`,icon:`Circle`,hasDirection:!1,supportedTimings:[...q],defaultDuration:30,minDuration:10,maxDuration:90,parameters:[{key:`color`,label:`Color`,type:`color`,defaultValue:[0,0,0],description:`Color used at the midpoint of the dissolve`,valueFormat:`rgb-array`}]},cu={gpuTransitionId:`nonAdditiveDissolve`,renderCanvas(e,t,n,r,i,a){Yl(e,t,n,r,a)}},lu={id:`nonAdditiveDissolve`,label:`Non-Additive Dissolve`,description:`Neutral dissolve that avoids the bright overlap of additive blends`,category:`dissolve`,icon:`Columns2`,hasDirection:!1,supportedTimings:[...q],defaultDuration:30,minDuration:10,maxDuration:90},uu={gpuTransitionId:`smoothCut`,renderCanvas(e,t,n,r,i,a,o){let s=J(r),c=Math.sin(s*Math.PI),l=Gl(.22,.78,s),u=a?.width??t.width,d=a?.height??t.height,f=Kl(o,`strength`,.9),p=c*4*f,m=.012*c*f,h=Math.round(p);e.save(),e.globalCompositeOperation=`copy`,e.globalAlpha=1,e.setTransform(1,0,-m,1,-h,0),e.drawImage(t,0,0,u,d),e.globalCompositeOperation=`source-over`,e.globalAlpha=l,e.setTransform(1,0,m,1,h,0),e.drawImage(n,0,0,u,d),e.restore()}},du={id:`smoothCut`,label:`Smooth Cut`,description:`Subtle liquid-warp blend for jump-cut style edits`,category:`dissolve`,icon:`Waves`,hasDirection:!1,supportedTimings:[...q],defaultDuration:18,minDuration:6,maxDuration:45,parameters:[{key:`strength`,label:`Warp`,type:`number`,defaultValue:.9,min:0,max:2,step:.05,description:`Horizontal liquid warp strength`}]},fu={gpuTransitionId:`sparkles`,renderCanvas(e,t,n,r,i,a,o){$l(e,t,n,r,a,o)}},pu={id:`sparkles`,label:`Sparkles`,description:`Twinkling star bursts reveal the next clip`,category:`custom`,icon:`Sparkles`,hasDirection:!1,supportedTimings:[...q],defaultDuration:24,minDuration:8,maxDuration:72,parameters:[{key:`sparkleScale`,label:`Size`,type:`number`,defaultValue:1,min:.25,max:3,step:.05,description:`Sparkle particle size`},{key:`intensity`,label:`Intensity`,type:`number`,defaultValue:1,min:0,max:2.5,step:.05,description:`Overall sparkle brightness`},{key:`density`,label:`Density`,type:`number`,defaultValue:1,min:.2,max:3,step:.05,description:`Amount of sparkle particles`},{key:`glow`,label:`Glow`,type:`number`,defaultValue:1,min:0,max:3,step:.05,description:`Soft sparkle bloom`}]},mu={gpuTransitionId:`glitch`,renderCanvas(e,t,n,r){J(r)<.5?e.drawImage(t,0,0):e.drawImage(n,0,0)}},hu={id:`glitch`,label:`Glitch`,description:`Digital glitch with RGB split and block displacement`,category:`custom`,icon:`Zap`,hasDirection:!1,supportedTimings:[...q],defaultDuration:20,minDuration:5,maxDuration:60,parameters:[{key:`intensity`,label:`Intensity`,type:`number`,defaultValue:1,min:0,max:3,step:.05,description:`Overall glitch displacement`},{key:`blockSize`,label:`Blocks`,type:`number`,defaultValue:30,min:6,max:96,step:1,unit:`px`,description:`Digital block size`},{key:`rgbSplit`,label:`RGB Split`,type:`number`,defaultValue:1,min:0,max:3,step:.05,description:`Color channel offset`}]},gu={gpuTransitionId:`pixelate`,renderCanvas(e,t,n,r){J(r)<.5?e.drawImage(t,0,0):e.drawImage(n,0,0)}},_u={id:`pixelate`,label:`Pixelate`,description:`Mosaic pixelation dissolve between clips`,category:`custom`,icon:`Grid3x3`,hasDirection:!1,supportedTimings:[...q],defaultDuration:20,minDuration:8,maxDuration:60,parameters:[{key:`maxBlockSize`,label:`Block Size`,type:`number`,defaultValue:48,min:4,max:160,step:1,unit:`px`,description:`Largest mosaic block size`}]},vu={gpuTransitionId:`chromatic`,renderCanvas(e,t,n,r,i,a){let o=J(r),s=a?.width??t.width,c=a?.height??t.height;e.save(),e.globalAlpha=X(o,!1),e.drawImage(n,0,0,s,c),e.restore(),e.save(),e.globalAlpha=X(o,!0),e.drawImage(t,0,0,s,c),e.restore()}},yu={id:`chromatic`,label:`Chromatic`,description:`RGB channel split with directional sweep`,category:`custom`,icon:`Aperture`,hasDirection:!0,directions:[`from-left`,`from-right`,`from-top`,`from-bottom`],supportedTimings:[...q],defaultDuration:25,minDuration:10,maxDuration:60,parameters:[{key:`spread`,label:`Spread`,type:`number`,defaultValue:1.5,min:0,max:5,step:.05,description:`Channel separation distance`},{key:`intensity`,label:`Intensity`,type:`number`,defaultValue:1,min:0,max:3,step:.05,description:`Chromatic sweep strength`}]},bu={gpuTransitionId:`radialBlur`,renderCanvas(e,t,n,r){let i=J(r);e.save(),e.globalAlpha=X(i,!1),e.drawImage(n,0,0),e.restore(),e.save(),e.globalAlpha=X(i,!0),e.drawImage(t,0,0),e.restore()}},xu={id:`radialBlur`,label:`Radial Blur`,description:`Zoom and spin blur transition`,category:`custom`,icon:`CircleDot`,hasDirection:!1,supportedTimings:[...q],defaultDuration:25,minDuration:10,maxDuration:60,parameters:[{key:`blurStrength`,label:`Blur`,type:`number`,defaultValue:1,min:0,max:3,step:.05,description:`Radial blur amount`},{key:`spin`,label:`Spin`,type:`number`,defaultValue:.3,min:-1.5,max:1.5,step:.05,description:`Rotational blur twist`}]},Su={gpuTransitionId:`liquidDistort`,renderCanvas(e,t,n,r,i,a){let{p:o,w:s,h:c,envelope:l}=Jl(t,r,a),u=Math.sin(o*Math.PI*2.4)*l*5;if(e.save(),e.globalAlpha=X(o,!1),e.drawImage(n,u,-u*.35,s,c),e.restore(),e.save(),e.globalAlpha=X(o,!0),e.drawImage(t,-u*.65,u*.25,s,c),e.restore(),l<=.08)return;let d=e.createLinearGradient(0,0,s,c);d.addColorStop(0,`rgba(180, 225, 255, ${.12*l})`),d.addColorStop(.5,`rgba(255, 255, 255, ${.08*l})`),d.addColorStop(1,`rgba(180, 225, 255, 0)`),e.save(),e.globalCompositeOperation=`screen`,e.fillStyle=d,e.fillRect(0,0,s,c),e.restore()}},Cu={id:`liquidDistort`,label:`Liquid Distort`,description:`Fluid glass distortion with a turbulent reveal edge`,category:`custom`,icon:`Waves`,hasDirection:!0,directions:[`from-left`,`from-right`,`from-top`,`from-bottom`],supportedTimings:[...q],defaultDuration:28,minDuration:10,maxDuration:90,parameters:[{key:`intensity`,label:`Intensity`,type:`number`,defaultValue:1,min:0,max:2.5,step:.05,description:`Overall distortion strength`},{key:`scale`,label:`Scale`,type:`number`,defaultValue:4.5,min:1,max:12,step:.1,description:`Noise pattern scale`},{key:`turbulence`,label:`Turbulence`,type:`number`,defaultValue:1,min:0,max:3,step:.05,description:`Fluid noise turbulence`},{key:`chroma`,label:`Chroma`,type:`number`,defaultValue:.75,min:0,max:2,step:.05,description:`Color separation around distortion`},{key:`swirl`,label:`Swirl`,type:`number`,defaultValue:.8,min:0,max:2.5,step:.05,description:`Curling warp motion`},{key:`shine`,label:`Shine`,type:`number`,defaultValue:1,min:0,max:3,step:.05,description:`Specular highlight strength`}]},wu={gpuTransitionId:`lensWarpZoom`,renderCanvas(e,t,n,r,i,a){let{p:o,w:s,h:c,envelope:l}=Jl(t,r,a),u=(t,n,r)=>{let i=s*n,a=c*n;e.save(),e.globalAlpha=r,e.drawImage(t,(s-i)/2,(c-a)/2,i,a),e.restore()};if(u(n,1.18-o*.18+l*.02,X(o,!1)),u(t,1+o*.18+l*.03,X(o,!0)),l<=.08)return;let d=Math.min(s,c)*(.22+o*.18),f=e.createRadialGradient(s/2,c/2,d*.35,s/2,c/2,d);f.addColorStop(0,`rgba(255, 255, 255, ${.12*l})`),f.addColorStop(.55,`rgba(190, 225, 255, ${.08*l})`),f.addColorStop(1,`rgba(190, 225, 255, 0)`),e.save(),e.globalCompositeOperation=`screen`,e.fillStyle=f,e.fillRect(0,0,s,c),e.restore()}},Tu={id:`lensWarpZoom`,label:`Lens Warp Zoom`,description:`Punchy zoom with barrel warp, blur, and chromatic edge shimmer`,category:`custom`,icon:`ScanSearch`,hasDirection:!1,supportedTimings:[...q],defaultDuration:24,minDuration:8,maxDuration:72,parameters:[{key:`zoomStrength`,label:`Zoom`,type:`number`,defaultValue:1,min:0,max:2.5,step:.05,description:`Zoom punch amount`},{key:`warpStrength`,label:`Warp`,type:`number`,defaultValue:.75,min:0,max:2.5,step:.05,description:`Barrel warp strength`},{key:`blurStrength`,label:`Blur`,type:`number`,defaultValue:1,min:0,max:3,step:.05,description:`Lens blur amount`},{key:`chroma`,label:`Chroma`,type:`number`,defaultValue:.65,min:0,max:2,step:.05,description:`Chromatic lens edge`},{key:`vignette`,label:`Vignette`,type:`number`,defaultValue:.7,min:0,max:2,step:.05,description:`Edge darkening`},{key:`glow`,label:`Glow`,type:`number`,defaultValue:1,min:0,max:3,step:.05,description:`Center glow intensity`}]},Eu={gpuTransitionId:`lightLeakBurn`,renderCanvas(e,t,n,r,i,a){let o=J(r),s=a?.width??t.width,c=a?.height??t.height,l=i||`from-left`,u=Math.sin(o*Math.PI);if(e.save(),e.globalAlpha=X(o,!1),e.drawImage(n,0,0,s,c),e.restore(),e.save(),e.globalAlpha=X(o,!0),e.drawImage(t,0,0,s,c),e.restore(),u<=.06)return;let d=l===`from-right`?(1-o)*s:l===`from-top`||l===`from-bottom`?s/2:o*s,f=l===`from-bottom`?(1-o)*c:l===`from-left`||l===`from-right`?c/2:o*c,p=Math.max(s,c)*(.28+u*.22),m=e.createRadialGradient(d,f,0,d,f,p);m.addColorStop(0,`rgba(255, 250, 220, ${.42*u})`),m.addColorStop(.32,`rgba(255, 150, 70, ${.28*u})`),m.addColorStop(1,`rgba(255, 105, 35, 0)`),e.save(),e.globalCompositeOperation=`screen`,e.fillStyle=m,e.fillRect(0,0,s,c),e.restore()}},Du={id:`lightLeakBurn`,label:`Light Leak Burn`,description:`Hot overexposed burn sweep with organic warm bloom`,category:`custom`,icon:`Flame`,hasDirection:!0,directions:[`from-left`,`from-right`,`from-top`,`from-bottom`],supportedTimings:[...q],defaultDuration:26,minDuration:8,maxDuration:90,parameters:[{key:`intensity`,label:`Intensity`,type:`number`,defaultValue:1.25,min:0,max:3,step:.05,description:`Overall burn strength`},{key:`spread`,label:`Spread`,type:`number`,defaultValue:1,min:.2,max:3,step:.05,description:`Leak bloom width`},{key:`warmth`,label:`Warmth`,type:`number`,defaultValue:.75,min:0,max:2,step:.05,description:`Orange heat tint`},{key:`burn`,label:`Burn`,type:`number`,defaultValue:1.1,min:0,max:3,step:.05,description:`Overexposed hotspot`},{key:`grain`,label:`Grain`,type:`number`,defaultValue:.5,min:0,max:2,step:.05,description:`Analog grain amount`}]},Ou={gpuTransitionId:`filmGateSlip`,renderCanvas(e,t,n,r,i,a){let{p:o,w:s,h:c,envelope:l}=Jl(t,r,a),u=(Y(Math.floor(o*18)*17.3)-.5)*l,d=(o-.5)*l*c*.08,f=u*8;e.save(),e.globalAlpha=X(o,!1),e.drawImage(n,-f*.5,-d*.55,s,c),e.restore(),e.save(),e.globalAlpha=X(o,!0),e.drawImage(t,f,d,s,c),e.restore(),!(l<=.08)&&(e.save(),e.globalCompositeOperation=`screen`,e.fillStyle=`rgba(255, 245, 220, ${.08*l})`,e.fillRect(0,0,s,c),e.fillStyle=`rgba(255, 255, 255, ${.14*l})`,e.fillRect(0,0,s,c*.045),e.fillRect(0,c*.955,s,c*.045),e.restore())}},ku={id:`filmGateSlip`,label:`Film Gate Slip`,description:`Analog frame slip with exposure flicker and gate-edge flash`,category:`custom`,icon:`Film`,hasDirection:!1,supportedTimings:[...q],defaultDuration:22,minDuration:8,maxDuration:72,parameters:[{key:`slip`,label:`Slip`,type:`number`,defaultValue:1,min:0,max:3,step:.05,description:`Vertical frame slip`},{key:`shake`,label:`Shake`,type:`number`,defaultValue:1,min:0,max:3,step:.05,description:`Gate jitter amount`},{key:`exposure`,label:`Exposure`,type:`number`,defaultValue:.85,min:0,max:2,step:.05,description:`Exposure flicker`},{key:`gateWidth`,label:`Gate Width`,type:`number`,defaultValue:.075,min:0,max:.2,step:.005,description:`Film gate edge width`},{key:`grain`,label:`Grain`,type:`number`,defaultValue:.6,min:0,max:2,step:.05,description:`Film grain amount`},{key:`chroma`,label:`Chroma`,type:`number`,defaultValue:.55,min:0,max:2,step:.05,description:`Analog color offset`},{key:`roll`,label:`Roll`,type:`number`,defaultValue:.75,min:0,max:2,step:.05,description:`Rolling frame drift`}]};function Au(e){e.register(`dissolve`,tu,eu),e.register(`additiveDissolve`,ru,nu),e.register(`blurDissolve`,au,iu),e.register(`dipToColorDissolve`,su,ou),e.register(`nonAdditiveDissolve`,lu,cu),e.register(`smoothCut`,du,uu),e.register(`sparkles`,pu,fu),e.register(`glitch`,hu,mu),e.register(`pixelate`,_u,gu),e.register(`chromatic`,yu,vu),e.register(`radialBlur`,xu,bu),e.register(`liquidDistort`,Cu,Su),e.register(`lensWarpZoom`,Tu,wu),e.register(`lightLeakBurn`,Du,Eu),e.register(`filmGateSlip`,ku,Ou)}let ju=!1;function Mu(){ju||(ju=!0,Mc(Tc),zc(Tc),ll(Tc),hl(Tc),bl(Tc),qc(Tc),Ml(Tc),Wl(Tc),Au(Tc))}Mu(),n(`CanvasTransitions`);function Nu(e){return Math.max(0,Math.min(1,e))}function Pu(e,t){let n=Math.cos(e*Math.PI/2);return t?n*n:1-n*n}function Fu(e,t){return t?1-.04*e:1.04-.04*e}function Iu(e,t,n,r,i){e.save(),e.globalAlpha=i,e.translate(n.width/2,n.height/2),e.scale(r,r),e.translate(-n.width/2,-n.height/2),e.drawImage(t,0,0),e.restore()}function Lu(e,t,n,r,i=1){e.save(),e.globalAlpha=i,e.translate(n.width/2,n.height/2),e.scale(r,r),e.translate(-n.width/2,-n.height/2),e.drawImage(t,0,0),e.restore()}function Ru(e,t,n,r,i){let a=Nu(r);e.save(),e.globalCompositeOperation=`copy`,Iu(e,n,i,Fu(a,!1),Pu(a,!1)),e.globalCompositeOperation=`lighter`,Iu(e,t,i,Fu(a,!0),Pu(a,!0)),e.restore()}function zu(e){switch(e){case`from-left`:return{x:1,y:0};case`from-right`:return{x:-1,y:0};case`from-top`:return{x:0,y:1};case`from-bottom`:return{x:0,y:-1};default:return{x:0,y:0}}}function Bu(e,t,n,r){let i=Nu(e),a=zu(t),o=n?.035:.025,s=n?i:i-1;return{x:a.x*s*r.width*o,y:a.y*s*r.height*o}}function Vu(e,t,n,r){let i=Nu(e),a=new Path2D;switch(t){case`from-left`:n?a.rect(i*r.width,0,r.width,r.height):a.rect(0,0,i*r.width,r.height);break;case`from-right`:n?a.rect(0,0,(1-i)*r.width,r.height):a.rect((1-i)*r.width,0,r.width,r.height);break;case`from-top`:n?a.rect(0,i*r.height,r.width,r.height):a.rect(0,0,r.width,i*r.height);break;case`from-bottom`:n?a.rect(0,0,r.width,(1-i)*r.height):a.rect(0,(1-i)*r.height,r.width,r.height)}return a}function Hu(e,t,n,r,i,a){let o=Nu(r),s=Bu(o,i,!1,a);e.save();let c=Vu(o,i,!1,a);e.clip(c),e.globalAlpha=1,e.drawImage(n,s.x,s.y),e.restore();let l=Bu(o,i,!0,a);e.save();let u=Vu(o,i,!0,a);e.clip(u),e.globalAlpha=1,e.drawImage(t,l.x,l.y),e.restore()}function Uu(e,t,n,r){let i=n?e:e-1;switch(t){case`from-left`:return{x:Math.round(i*r.width),y:0};case`from-right`:return{x:Math.round(-i*r.width),y:0};case`from-top`:return{x:0,y:Math.round(i*r.height)};case`from-bottom`:return{x:0,y:Math.round(-i*r.height)};default:return{x:0,y:0}}}function Wu(e,t,n,r,i,a){let o=Uu(r,i,!1,a);e.drawImage(n,o.x,o.y);let s=Uu(r,i,!0,a);e.drawImage(t,s.x,s.y)}function Gu(e,t,n,r,i,a){let o=Math.max(0,Math.min(1,r)),s=i===`from-left`||i===`from-right`,c=.5;if(o<c){let n=o/c,r=Math.cos(n*Math.PI/2);e.save(),e.translate(a.width/2,a.height/2),s?e.scale(r,1):e.scale(1,r),e.translate(-a.width/2,-a.height/2),e.drawImage(t,0,0),e.restore()}else{let t=(o-c)/c,r=Math.sin(t*Math.PI/2);e.save(),e.translate(a.width/2,a.height/2),s?e.scale(r,1):e.scale(1,r),e.translate(-a.width/2,-a.height/2),e.drawImage(n,0,0),e.restore()}}function Ku(e,t,n,r,i){let a=Nu(r),o=i.width/2,s=i.height/2,c=Math.sqrt(i.width*i.width+i.height*i.height),l=-Math.PI/2,u=l+a*Math.PI*2;Lu(e,n,i,1.04-.04*a,.85+.15*a),e.save();let d=new Path2D;d.moveTo(o,s),d.arc(o,s,c,u,l+Math.PI*2,!1),d.closePath(),e.clip(d),Lu(e,t,i,1-.04*a,1-.1*a),e.restore()}function qu(e,t){return Math.sqrt((e/2)**2+(t/2)**2)*1.2}function Ju(e,t,n,r,i){let a=Nu(r),o=a*qu(i.width,i.height),s=i.width/2,c=i.height/2;Lu(e,n,i,1.04-.04*a,.85+.15*a),e.save();let l=new Path2D;l.rect(0,0,i.width,i.height),l.arc(s,c,o,0,Math.PI*2),e.clip(l,`evenodd`),Lu(e,t,i,1-.04*a,1-.1*a),e.restore()}function Yu(e,t,n,r){r<.5?e.drawImage(t,0,0):e.drawImage(n,0,0)}function Xu(e,t,n,r,i,a){let{transition:o,progress:s}=t,c=o.presentation,l=o.direction,u=Tc.getRenderer(c);if(u?.gpuTransitionId&&a?.has(u.gpuTransitionId)){let t=a.render(u.gpuTransitionId,n,r,s,i.width,i.height,l,o.properties);if(t){e.drawImage(t,0,0);return}}if(u?.renderCanvas){u.renderCanvas(e,n,r,s,l,i,o.properties);return}switch(c){case`fade`:Ru(e,n,r,s,i);break;case`wipe`:Hu(e,n,r,s,l||`from-left`,i);break;case`slide`:Wu(e,n,r,s,l||`from-left`,i);break;case`flip`:Gu(e,n,r,s,l||`from-left`,i);break;case`clockWipe`:Ku(e,n,r,s,i);break;case`iris`:Ju(e,n,r,s,i);break;default:Yu(e,n,r,s)}}function Zu(e){let t=e.blend&&!e.clear,n=t&&e.hasBlendPipeline;return{needsLayerComposite:t,usesShaderComposite:n,rendersDirectly:e.enabledEffectCount===0&&e.maskCount===0&&!n}}function Qu(e){return e.hasEffectsPipeline?e.hasMediaPipeline?e.maskCount>0&&!e.hasShapePipeline?`shape-pipeline-unavailable`:e.maskCount>1&&!e.hasMaskCombinePipeline?`mask-combine-pipeline-unavailable`:null:`media-pipeline-unavailable`:`effects-pipeline-unavailable`}function $u(e){let t=Math.max(0,e.maskCount),n=1,r=n++,i=null,a=null;e.usesShaderComposite&&(e.hasBlendPipeline&&(i=n++),a=n++);let o=Array.from({length:t},()=>n++),s=Array.from({length:Math.max(0,t-1)},()=>n++);return{textureCount:n,effectedSlot:r,blendOutputSlot:i,blendLayerSlot:a,maskSlots:o,combinedMaskSlots:s}}function ed(e){return e.slice(1).map((t,n)=>({invertBase:n===0?e[0]?.inverted??!1:!1,invertNext:t.inverted}))}function td(e){return{clear:e.usesShaderComposite?!0:e.clear,blend:!e.usesShaderComposite&&e.blend,maskInvert:e.masks.length===1&&e.masks[0]?.inverted}}function nd(e){return Array.from({length:e},(e,t)=>({clear:t===0,blend:!0}))}function rd(e,t){return!(!e.visible||t!==null&&e.order>t)}function id(e,t){return!(t<e.from||t>=e.from+e.durationInFrames||e.type===`adjustment`||e.type===`controller`||e.type===`shape`&&e.isMask)}function ad(e,t){return!e.blendMode||e.blendMode===`normal`||t}function od(e,t){return!(e.some(e=>e.enabled&&e.effect.type!==`gpu-effect`)||e.some(e=>e.enabled)&&!t)}function sd(e,t){let n=t.effectsContext;return eo((n.renderMode===`preview`?n.getPreviewEffectsOverride?.(e.item.id):void 0)??e.item.effects??[],$a(e.trackOrder,t.adjustmentLayers,t.localFrame,n.renderMode===`preview`?n.getPreviewEffectsOverride:void 0,n.renderMode===`preview`?n.getLiveItemSnapshotById:void 0))}function cd(e){let t=[];for(let n of e.sortedTracks)if(rd(n,e.occlusionCutoffOrder)){for(let r of n.items)if(id(r,e.localFrame)){if(!ad(r,e.hasBlendPipeline))return null;t.push({item:r,trackOrder:n.order,masks:e.activeMasks.filter(e=>so(e.trackOrder,n.order))})}}return t}function ld(e,t){let n=[];for(let r of e){if(!t.areChildMasksSupported(r.masks))return null;let e=sd(r,t);if(!od(e,t.hasEffectsPipeline))return null;n.push({participant:{item:r.item,transform:wr(r.item,t.keyframesMap.get(r.item.id),t.localFrame,t.canvasSettings),effects:e,renderSpan:Zn(r.item)},masks:r.masks})}return n.length===0?null:n}function ud(e){let t=cd(e);return t?ld(t,e):null}function dd(e){let t=e.trim(),n=t.match(/^#([\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i);if(n){let e=n[1];return e.length===3&&(e=e.split(``).map(e=>e+e).join(``)),[Number.parseInt(e.slice(0,2),16)/255,Number.parseInt(e.slice(2,4),16)/255,Number.parseInt(e.slice(4,6),16)/255,e.length===8?Number.parseInt(e.slice(6,8),16)/255:1]}let r=t.match(/^rgba?\(([^)]+)\)$/i);if(!r)return null;let i=r[1].split(`,`).map(e=>e.trim());if(i.length<3)return null;let a=e=>e.endsWith(`%`)?Number.parseFloat(e)/100:Number.parseFloat(e)/255,o=a(i[0]),s=a(i[1]),c=a(i[2]),l=i[3]===void 0?1:Number.parseFloat(i[3]);return[o,s,c,l].every(Number.isFinite)?[o,s,c,l]:null}function fd(e){return e.shapeType===`path`&&e.pathClosed===!1?!1:e.fillEnabled??!0}function pd(e,t){return t?e:[e[0],e[1],e[2],0]}function md(e){if(e.strokeEnabled!==!1&&!(!e.strokeWidth||e.strokeWidth<=0)&&e.strokeColor)return dd(e.strokeColor)??void 0}function hd(e){let t=ho(e),n=dd(t?.startColor??e.fillColor),r=t?dd(t.endColor):void 0;if(!n||t&&!r)return null;let i=fd(e);return{fillColor:pd(n,i),gradientEndColor:r?pd(r,i):void 0,gradientAngleRad:t?t.angle*Math.PI/180:void 0,strokeColor:md(e)}}function gd(e,t){let{getExpressionItem:n,getExpressionKeyframes:r}=e;if(n&&r)return{globalFrame:t,canvas:ur(e),getItem:n,getKeyframes:r}}function _d(e,t,n,r){return gr(P(e,t,n-e.from,gd(r,n)),r)}function vd(e,t){return!e||t<e.rampStart?!1:t<=e.rampEnd}function yd(e,t){return!e||t===`1`}function bd(e){let t=yd(vd(e.sourceTimeRamp,e.frame),e.domVideo?.dataset.transitionSourceRamp)?e.domVideo:null;return es({domVideo:t,sourceTime:e.sourceTime,speed:t?.playbackRate??e.itemSpeed??1,isRenderingTransition:!0})}function xd(e){return e.supportsMediabunny?!e.mediabunnyDisabled:!1}function Sd(e,t){return!t||e.length<=1||e.at(-1)?.progress!==1?e:e.slice(0,-1)}function Cd(e,t,n){let r=t.width/2,i=t.height/2,a=e.findIndex(e=>e.progress>=n);if(a<=0){let t=e[0];return[t.x-r,t.y-i,n]}let o=e[a-1],s=e[a],c=Math.max(s.progress-o.progress,2**-52),l=(n-o.progress)/c;return[o.x+(s.x-o.x)*l-r,o.y+(s.y-o.y)*l-i,n]}function wd(e,t,n){let r=t?32:31;return Array.from({length:32},(t,i)=>Cd(e,n,i/r))}function Td(e,t){let n=e.pathVertices,r=e.pathClosed??!0,i=r?3:2;if(!n||n.length<i)return null;let a=Pn(n,t.width,t.height,r).points,o=Sd(a,r);if(o.length<i)return null;if(o.length<=32){let e=t.width/2,n=t.height/2;return o.map(t=>[t.x-e,t.y-n,t.progress])}return wd(a,r,t)}function Ed(e){return{enabled:e.strokeEnabled!==!1,width:e.strokeWidth??0,lineCap:e.strokeLineCap??`butt`,lineJoin:e.strokeLineJoin??`miter`,color:e.strokeColor}}function Dd(e){let t=ho(e);return t?dd(t.startColor)!==null&&dd(t.endColor)!==null:dd(e.fillColor)!==null}function Od(e){return!e.enabled||!(e.width>0)||e.lineCap===`round`&&e.lineJoin===`round`?null:`unsupported-path-stroke-style`}function kd(e){return!e.enabled||!(e.width>0)||!e.color||dd(e.color)!==null?null:`unsupported-shape-stroke`}function Ad(e,t){return t.hasShapePipeline?e.isMask?`shape-mask`:null:`shape-pipeline-unavailable`}function jd(e,t){return e.shapeType===`path`?Td(e,t)?Od(Ed(e)):`unsupported-path-complexity`:null}function Md(e){return e.shapeType===`path`||(e.trimPathStart??0)===0&&(e.trimPathEnd??100)===100?null:`canvas-trim-path-metrics-required`}function Nd(e){return fd(e)&&!Dd(e)?`unsupported-shape-fill`:kd(Ed(e))}function Pd(e){return!e.hasEffects||e.hasEffectsPipeline?null:`gpu-effects-pipeline-unavailable`}function Fd(e,t,n){return Ad(e,n)??jd(e,t)??Md(e)??Nd(e)??Pd(n)}function Id(e,t,n,r){let{media:i,participant:a}=e;return i.kind===`shape`?t.gpuShapePipeline?.renderShapeToTexture(n,{outputWidth:t.canvasSettings.width,outputHeight:t.canvasSettings.height,transformRect:e.transformRect,rotationRad:e.rotationRad,opacity:a.transform.opacity,shapeType:i.item.shapeType,fillColor:i.fillColor,gradientEndColor:i.gradientEndColor,gradientAngleRad:i.gradientAngleRad,strokeColor:i.strokeColor,strokeWidth:i.item.strokeWidth,cornerRadius:i.item.cornerRadius,direction:i.item.direction,points:i.item.points,innerRadius:i.item.innerRadius,trimPathStart:i.item.trimPathStart,trimPathEnd:i.item.trimPathEnd,trimPathOffset:i.item.trimPathOffset,taperStartWidth:i.item.taperStartWidth,taperEndWidth:i.item.taperEndWidth,taperStartLength:i.item.taperStartLength,taperEndLength:i.item.taperEndLength,aspectRatioLocked:a.item.transform?.aspectRatioLocked,pathVertices:i.pathVertices,pathClosed:i.item.pathClosed,clear:r?.clear,blend:r?.blend})??!1:!1}function Ld(e,t,n,r){let{media:i,participant:a}=e;if(i.kind!==`text`&&i.kind!==`composition`)return!1;let o=i.kind===`composition`;return t.gpuMediaPipeline?.renderTextureToTexture(i.texture,n,{sourceWidth:i.sourceWidth,sourceHeight:i.sourceHeight,outputWidth:t.canvasSettings.width,outputHeight:t.canvasSettings.height,sourceRect:o?e.sourceRect:{x:0,y:0,width:i.sourceWidth,height:i.sourceHeight},destRect:e.destRect,transformRect:e.transformRect,featherPixels:o?e.featherPixels:void 0,cornerRadius:e.cornerRadius,cornerPin:e.cornerPin,opacity:a.transform.opacity,rotationRad:e.rotationRad,clear:r?.clear,blend:r?.blend})??!1}function Rd(e,t,n,r){let{media:i,participant:a}=e;return i.kind===`media`?t.gpuMediaPipeline?.renderSourceToTexture(i.source,n,{sourceWidth:i.sourceWidth,sourceHeight:i.sourceHeight,outputWidth:t.canvasSettings.width,outputHeight:t.canvasSettings.height,sourceRect:e.sourceRect,destRect:e.destRect,transformRect:e.transformRect,featherPixels:e.featherPixels,cornerRadius:e.cornerRadius,cornerPin:e.cornerPin,opacity:a.transform.opacity,rotationRad:e.rotationRad,flipX:e.flipX,flipY:e.flipY,clear:r?.clear,blend:r?.blend})??!1:!1}function zd(e,t,n,r){switch(e.media.kind){case`shape`:return Id(e,t,n,r);case`text`:case`composition`:return Ld(e,t,n,r);case`media`:return Rd(e,t,n,r)}}async function Bd(e,t,n,r,i){let{participant:a}=e,o=a.effects.length>0?n.acquire(t.canvasSettings.width,t.canvasSettings.height):r;try{return zd(e,t,o,i)?o===r?!0:t.gpuPipeline?t.gpuPipeline.applyTextureEffectsToTexture(o,Za(a.effects,e.timelineTimeSeconds??0),r,t.canvasSettings.width,t.canvasSettings.height):!1:!1}finally{o!==r&&n.release(o)}}async function Vd(e,t,n,r,i,a,o,s){if(!i.gpuPipeline||!i.gpuMediaPipeline||e.type!==`video`&&e.type!==`image`)return!1;let c=n.filter(e=>e.enabled);if(c.length===0||c.some(e=>e.effect.type!==`gpu-effect`)||e.type===`video`&&!i.useMediabunny.has(e.id)&&!await i.ensureVideoItemReady?.(e.id))return!1;let l=await Qd({item:e,transform:t,effects:c,renderSpan:s??Zn(e)},r,i);if(!l)return!1;try{return Bd(l,i,o,a)}finally{l.media.close?.()}}const Hd=/* @__PURE__ */ new WeakMap;function Ud(e){let t=Hd.get(e);return t||(t=/* @__PURE__ */ new Map,Hd.set(e,t)),t}function Wd(e,t,n){let r=Ud(e).get(t);return r&&rs({currentFrame:n,cachedFrame:r.frame,hasCachedFrame:!0,fps:e.fps})?r:null}function Gd(e){let t=e.shouldHold&&!!e.heldFrame;return e.record(t?e.holdReason:e.missReason,e.details),t?e.heldFrame.canvas:null}function Kd(e,t,n){return t.renderMode!==`preview`||e.type!==`video`?!1:t.gpuPipeline?t.domVideoElementProvider?t.nonBlockingVideoFrameToleranceSeconds===void 0||(n(`non-blocking-frame-delivery`),!1):(n(`no-dom-provider`),!1):(n(`no-gpu-pipeline`),!1)}function qd(e,t){return e.crop?(t(`crop`),!0):L(e.cornerPin)?(t(`corner-pin`),!0):!1}function Jd(e,t,n){return Math.abs(t.rotation)>.001?(n(`rotation`,{rotation:t.rotation}),!0):Math.abs(t.opacity-1)>.001?(n(`opacity`,{opacity:t.opacity}),!0):t.cornerRadius>.001?(n(`corner-radius`,{cornerRadius:t.cornerRadius}),!0):e.transform?.flipHorizontal||e.transform?.flipVertical?(n(`flip`),!0):!1}function Yd(e,t){let n=e.filter(e=>e.enabled);return n.length===0?(t(`no-enabled-effects`),null):n.some(e=>e.effect.type!==`gpu-effect`)?(t(`non-gpu-effect`),null):n}function Xd(e,t,n,r,i){let a=n.domVideoElementProvider(e.id),o=qs(e,Zn(e),t,n),s=e.speed??1,c=es({domVideo:a,sourceTime:o,speed:s,isRenderingTransition:n.isRenderingTransition===!0});return a?c.shouldDraw?{draws:!0,video:a,sourceTime:o}:{draws:!1,canvas:Gd({heldFrame:r,shouldHold:ns({domVideo:a,sourceTime:o,speed:s,isRenderingTransition:n.isRenderingTransition===!0,currentFrame:t,cachedFrame:r?.frame??-1/0,hasCachedFrame:!!r,fps:n.fps}),holdReason:`hold-metadata-frame`,missReason:c.hasReadyDomVideo?`dom-video-drift`:`dom-video-not-ready`,details:{drift:c.drift,driftThreshold:c.driftThreshold,videoTime:a.currentTime,sourceTime:o,readyState:a.readyState,videoWidth:a.videoWidth},record:i})}:{draws:!1,canvas:Gd({heldFrame:r,shouldHold:!0,holdReason:`hold-missing-dom-video`,missReason:`no-dom-video`,record:i})}}function Zd(e,t,n,r,i){let a=(e,t={})=>{};if(!Kd(e,i,a)||qd(e,a)||Jd(e,t,a))return null;let o=Yd(n,a);if(!o)return null;let s=Ud(i),c=Wd(i,e.id,r),l=Xd(e,r,i,c,a);if(!l.draws)return l.canvas;let{video:u,sourceTime:d}=l,f=cs(u.videoWidth,u.videoHeight,t,i.canvasSettings,void 0);if(ls(f.featherPixels))return null;try{let t=i.gpuPipeline.applyEffectsToVideo(u,Za(o,r/i.fps),f.mediaRect,i.canvasSettings.width,i.canvasSettings.height);return t?(o.length,u.currentTime,Fa({frame:r,itemId:e.id,path:`dom-video`,sourceTime:d}),s.set(e.id,{canvas:t,frame:r}),t):Gd({heldFrame:c,shouldHold:!0,holdReason:`hold-apply-null`,missReason:`apply-null`,record:a})}catch{return Gd({heldFrame:c,shouldHold:!0,holdReason:`hold-apply-failed`,missReason:`apply-failed`,record:a})}}async function Qd(e,t,n){let r=await $d(e,e.transform,t,n);if(!r)return null;if(r.kind===`shape`){let i={x:n.canvasSettings.width/2+e.transform.x-e.transform.width/2,y:n.canvasSettings.height/2+e.transform.y-e.transform.height/2,width:e.transform.width,height:e.transform.height};return i.width<=0||i.height<=0?null:{timelineTimeSeconds:t/n.fps,participant:e,media:r,sourceRect:{x:0,y:0,width:r.sourceWidth,height:r.sourceHeight},destRect:i,transformRect:i,featherPixels:{left:0,right:0,top:0,bottom:0},cornerRadius:e.transform.cornerRadius,rotationRad:e.transform.rotation*Math.PI/180,flipX:!1,flipY:!1}}if(r.kind===`text`){let i={...e.transform,width:r.sourceWidth,height:r.sourceHeight},a={x:n.canvasSettings.width/2+i.x-i.width/2,y:n.canvasSettings.height/2+i.y-i.height/2,width:i.width,height:i.height};return a.width<=0||a.height<=0?(r.close?.(),null):{timelineTimeSeconds:t/n.fps,participant:e,media:r,sourceRect:{x:0,y:0,width:r.sourceWidth,height:r.sourceHeight},destRect:a,transformRect:a,featherPixels:{left:0,right:0,top:0,bottom:0},cornerRadius:e.transform.cornerRadius,cornerPin:Vf(r.item,a),rotationRad:e.transform.rotation*Math.PI/180,flipX:!1,flipY:!1}}let i=cs(r.sourceWidth,r.sourceHeight,e.transform,n.canvasSettings,r.item.crop,r.kind===`composition`?`fill`:`contain`);if(i.viewportRect.width<=0||i.viewportRect.height<=0)return r.close?.(),null;let a={x:n.canvasSettings.width/2+e.transform.x-e.transform.width/2,y:n.canvasSettings.height/2+e.transform.y-e.transform.height/2,width:e.transform.width,height:e.transform.height};return{timelineTimeSeconds:t/n.fps,participant:e,media:r,sourceRect:{x:(i.viewportRect.x-i.mediaRect.x)/i.mediaRect.width*r.sourceWidth,y:(i.viewportRect.y-i.mediaRect.y)/i.mediaRect.height*r.sourceHeight,width:i.viewportRect.width/i.mediaRect.width*r.sourceWidth,height:i.viewportRect.height/i.mediaRect.height*r.sourceHeight},destRect:i.viewportRect,transformRect:a,featherPixels:i.featherPixels,cornerRadius:e.transform.cornerRadius,cornerPin:Vf(r.item,i.mediaRect),rotationRad:e.transform.rotation*Math.PI/180,flipX:e.item.transform?.flipHorizontal??!1,flipY:e.item.transform?.flipVertical??!1}}async function $d(e,t,n,r){return t.opacity<0||t.opacity>1?null:e.item.type===`shape`?ef(e,t,n,r):e.item.type===`image`?tf(e.item,r):e.item.type===`text`?lf(e,n,r):e.item.type===`composition`?df(e,n,r):e.item.type===`video`?nf(e,n,r):null}function ef(e,t,n,r){let i=r.getCurrentKeyframes?.(e.item.id)??r.keyframesMap.get(e.item.id),a=_d(e.item,i,n,r.canvasSettings);if(Tf(a,t,e.effects,r))return null;let o=hd(a);return o?{kind:`shape`,item:a,sourceWidth:t.width,sourceHeight:t.height,fillColor:o.fillColor,gradientEndColor:o.gradientEndColor,gradientAngleRad:o.gradientAngleRad,strokeColor:o.strokeColor,pathVertices:a.shapeType===`path`?Td(a,t)??void 0:void 0}:null}function tf(e,t){let n=t.imageElements.get(e.id);return n?{kind:`media`,item:e,source:n.source,sourceWidth:n.width,sourceHeight:n.height}:null}async function nf(e,t,n){let r=e.item,i=qs(r,e.renderSpan,t,n),a=rf(e,t,i,n);if(a)return a;let o=n.videoExtractors.get(r.id);return!o||!xd({supportsMediabunny:n.useMediabunny.has(r.id),mediabunnyDisabled:n.mediabunnyDisabledItems.has(r.id)})?null:af(await o.captureFrame(i),r)}function rf(e,t,n,r){let i=e.item,a=r.domVideoElementProvider?.(i.id)??null,o=bd({domVideo:a,sourceTimeRamp:e.renderSpan.sourceTimeRamp,frame:t,sourceTime:n,itemSpeed:i.speed});return!a||!o.shouldDraw?null:(Fa({frame:t,itemId:i.id,path:`dom-video`,sourceTime:n}),{kind:`media`,item:i,source:a,sourceWidth:a.videoWidth,sourceHeight:a.videoHeight})}function af(e,t){let n=e.frame;return!e.success||!n?null:{kind:`media`,item:t,source:n,sourceWidth:`displayWidth`in n?n.displayWidth:n.width,sourceHeight:`displayHeight`in n?n.displayHeight:n.height,close:()=>e.frame?.close()}}function of(e,t,n){let r=e.item,i=t-r.from,a=n.getCurrentKeyframes?.(r.id)??n.keyframesMap.get(r.id),o=mr({...S(r,a,i,ur(n.canvasSettings)),cornerPin:r.cornerPin},n.canvasSettings),s=Jo(e.transform),c=M(o,s),l=L(o.cornerPin)?s:c,u=r.textMotion;return{item:o,relativeFrame:i,width:Math.max(2,Math.ceil(l.width)),height:Math.max(2,Math.ceil(l.height)),activeMotionSpec:u!==void 0&&Hi(u,i,n.fps,r.durationInFrames)?u:void 0}}function sf(e,t,n,r){let i=r.gpuTextTextureCache,a=i.get(n);return a?(i.delete(n),i.set(n,a),Bf(`hit`,{itemId:e.item.id,width:a.width,height:a.height,bytes:a.bytes,cacheBytes:Rf(i),entries:i.size}),{kind:`text`,item:t.item,sourceWidth:a.width,sourceHeight:a.height,texture:a.texture}):null}function cf(e,t,n,r){let{item:i,width:a,height:o,relativeFrame:s,activeMotionSpec:c}=t,l=r.gpuTextPipeline;if(!l||!uf())return null;let u=r.gpuPipeline.getDevice().createTexture({size:{width:a,height:o},format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT});if(!l.renderTextToTexture(u,{outputWidth:a,outputHeight:o,item:i,width:a,height:o,...c?{motion:{spec:c,relativeFrame:s,fps:r.fps,durationInFrames:e.item.durationInFrames}}:{}}))return u.destroy(),null;if(Bf(`atlas-render`,{itemId:e.item.id,width:a,height:o,bytes:Lf(a,o),...c?{textMotionBypass:!0}:{}}),!n)return{kind:`text`,item:i,sourceWidth:a,sourceHeight:o,texture:u,close:()=>u.destroy()};let d=r.gpuTextTextureCache;return d.set(n,{texture:u,width:a,height:o,bytes:Lf(a,o)}),Ff(d),{kind:`text`,item:i,sourceWidth:a,sourceHeight:o,texture:u}}function lf(e,t,n){if(!n.gpuPipeline||!n.gpuMediaPipeline||!n.gpuTextTextureCache)return null;let r=of(e,t,n),i=r.activeMotionSpec?null:Nf(r.item,r.width,r.height);return(i?sf(e,r,i,n):null)||cf(e,r,i,n)||(Bf(`miss`,{itemId:e.item.id,width:r.width,height:r.height,bytes:Lf(r.width,r.height),cacheBytes:Rf(n.gpuTextTextureCache),entries:n.gpuTextTextureCache.size,reason:`glyph-atlas-unavailable`}),null)}function uf(){return!0}async function df(e,t,n){if(!n.gpuPipeline||!n.gpuMediaPipeline||n.gpuCompositionStack?.has(e.item.compositionId))return null;let r=lr(n.canvasSettings),i=Math.max(2,Math.ceil(e.item.compositionWidth*r.x)),a=Math.max(2,Math.ceil(e.item.compositionHeight*r.y)),o=new Set(n.gpuCompositionStack);o.add(e.item.compositionId);let s=await ff(e,t,{...n,gpuCompositionStack:o},i,a);return s?{kind:`composition`,item:e.item,sourceWidth:i,sourceHeight:a,texture:s,close:()=>s.destroy()}:null}async function ff(e,t,n,r,i){let a=n.gpuPipeline;if(!a)return null;let o=mc(e.item,n),s=o?.adjustmentLayers??[];if(!o)return null;let c=e.renderSpan??Zn(e.item),l=$n(e.item,t,n.fps,o.fps,c);if(l<0||l>=o.durationInFrames)return null;let u=vc(o,l,{width:r,height:i,fps:o.fps},n),d={width:r,height:i,logicalWidth:e.item.compositionWidth,logicalHeight:e.item.compositionHeight,fps:o.fps},f=gc(n,o,d),p=_c(o,l,d,s,n,u),m=ud({sortedTracks:o.sortedTracks,keyframesMap:o.keyframesMap,localFrame:l,occlusionCutoffOrder:p,activeMasks:u,adjustmentLayers:s,canvasSettings:d,effectsContext:n,hasBlendPipeline:!!n.gpuMediaBlendPipeline,hasEffectsPipeline:!!n.gpuPipeline,areChildMasksSupported:Ef});return m?pf({gpuPipeline:a,layers:m,rctx:f,localFrame:l,width:r,height:i}):null}async function pf(e){let t=e.gpuPipeline.getDevice().createTexture({size:{width:e.width,height:e.height},format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST}),n=nd(e.layers.length);try{for(let r=0;r<e.layers.length;r++){let i=e.layers[r],a=await Qd(i.participant,e.localFrame,e.rctx);if(!a)return t.destroy(),null;try{if(!await mf(a,e.rctx,t,i.masks,n[r]))return t.destroy(),null}finally{a.media.close?.()}}return t}catch(e){throw t.destroy(),e}}async function mf(e,t,n,r,i){let a=e.participant.effects.filter(e=>e.enabled),o=Zu({blend:i.blend,clear:i.clear,hasBlendPipeline:!!t.gpuMediaBlendPipeline,enabledEffectCount:a.length,maskCount:r.length});if(o.rendersDirectly)return Bd(e,t,{acquire:()=>n,release:()=>void 0},n,i);if(Qu({hasEffectsPipeline:!!t.gpuPipeline,hasMediaPipeline:!!t.gpuMediaPipeline,hasShapePipeline:!!t.gpuShapePipeline,hasMaskCombinePipeline:!!t.gpuMaskCombinePipeline,maskCount:r.length})!==null)return!1;let s=t.gpuPipeline.getDevice(),c=hf(t,s,o,r.length);try{return await _f({prepared:e,rctx:t,device:s,stage:c,outputTexture:n,masks:r,enabledEffects:a,options:i,mode:o,blendMode:e.participant.item.blendMode??`normal`})}finally{for(let e of c.textures)wf(t,e)}}function hf(e,t,n,r){let i=$u({usesShaderComposite:n.usesShaderComposite,hasBlendPipeline:!!e.gpuMediaBlendPipeline,maskCount:r}),a=[];for(let n=0;n<i.textureCount;n++)a.push(Cf(e,t,e.canvasSettings.width,e.canvasSettings.height));return{textures:a,base:a[0],effected:a[i.effectedSlot],blendOutput:gf(a,i.blendOutputSlot),blendLayer:gf(a,i.blendLayerSlot),maskTextures:i.maskSlots.map(e=>a[e]),combinedMaskTextures:i.combinedMaskSlots.map(e=>a[e])}}function gf(e,t){return t===null?null:e[t]??null}async function _f(e){let{rctx:t,stage:n,outputTexture:r,masks:i,options:a,mode:o}=e,s=await vf(e);if(!s)return!1;let c=yf(e);if(c.failed)return!1;let l=n.blendLayer??r,u=td({usesShaderComposite:o.usesShaderComposite,clear:a.clear,blend:a.blend,masks:i});return xf(t,s,l,c.texture,u)?Sf(e,l):!1}async function vf(e){let{prepared:t,rctx:n,stage:r,enabledEffects:i}=e;return await Bd({...t,participant:{...t.participant,effects:[]}},n,{acquire:()=>r.base,release:()=>void 0},r.base,{clear:!0,blend:!1})?i.length===0?r.base:n.gpuPipeline.applyTextureEffectsToTexture(r.base,Za(i,t.timelineTimeSeconds??0),r.effected,n.canvasSettings.width,n.canvasSettings.height)?r.effected:null:null}function yf(e){let{masks:t,rctx:n,stage:r}=e;if(t.length===0)return{failed:!1,texture:null};for(let e=0;e<t.length;e++)if(!Df(t[e],n,r.maskTextures[e]))return{failed:!0,texture:null};if(t.length===1)return{failed:!1,texture:r.maskTextures[0]};let i=bf(e);return i?{failed:!1,texture:i}:{failed:!0,texture:null}}function bf(e){let{masks:t,rctx:n,stage:r}=e,i=ed(t),a=r.maskTextures[0];for(let e=0;e<i.length;e++){let t=r.combinedMaskTextures[e];if(!n.gpuMaskCombinePipeline?.combine(a,r.maskTextures[e+1],t,i[e]))return null;a=t}return a}function xf(e,t,n,r,i){let{width:a,height:o}=e.canvasSettings;return e.gpuMediaPipeline.renderTextureToTexture(t,n,{sourceWidth:a,sourceHeight:o,outputWidth:a,outputHeight:o,sourceRect:{x:0,y:0,width:a,height:o},destRect:{x:0,y:0,width:a,height:o},transformRect:{x:0,y:0,width:a,height:o},opacity:1,rotationRad:0,clear:i.clear,blend:i.blend,maskTexture:r??void 0,maskInvert:i.maskInvert})}function Sf(e,t){let{rctx:n,device:r,outputTexture:i,stage:a,blendMode:o}=e,s=a.blendOutput;return s?n.gpuMediaBlendPipeline.blend(i,t,s,o)?(Mf(r,s,i,n.canvasSettings.width,n.canvasSettings.height),!0):!1:!0}function Cf(e,t,n,r){return e.gpuScratchTexturePool?.acquire(n,r)??t.createTexture({size:{width:n,height:r},format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC})}function wf(e,t){if(e.gpuScratchTexturePool){e.gpuScratchTexturePool.release(t);return}t.destroy()}function Tf(e,t,n=[],r){return Fd(e,t,{hasShapePipeline:!!r.gpuShapePipeline,hasEffectsPipeline:!!r.gpuPipeline,hasEffects:n.length>0})}function Ef(e){if(e.length===0)return!0;for(let t of e)if(!t.bitmapMask&&(L(t.shape.cornerPin)||(t.shape.strokeWidth??0)>0||t.shape.shapeType===`path`&&!Of(t)))return!1;return!0}function Df(e,t,n){let r=e.bitmapMask;return r?kf(e,r,t,n):jf(e,t,n)}function Of(e){if(e.shape.shapeType===`path`)return Td({...e.shape,pathClosed:!0},e.transform)??void 0}function kf(e,t,n,r){let i=n.gpuPipeline?.getDevice();if(!i||r.width!==t.width||r.height!==t.height)return!1;let a=n.gpuBitmapMaskTextureCache;return a?Af(e,t,a,i,r):(i.queue.copyExternalImageToTexture({source:t,flipY:!1},{texture:r},{width:t.width,height:t.height}),!0)}function Af(e,t,n,r,i){let a=Pf(e),o=n.get(a);if(o)return n.delete(a),n.set(a,o),Mf(r,o.texture,i,o.width,o.height),!0;let s=r.createTexture({size:{width:t.width,height:t.height},format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC|GPUTextureUsage.RENDER_ATTACHMENT});r.queue.copyExternalImageToTexture({source:t,flipY:!1},{texture:s},{width:t.width,height:t.height}),n.set(a,{texture:s,width:t.width,height:t.height,bytes:Lf(t.width,t.height)}),If(n);let c=n.get(a);return c?(Mf(r,c.texture,i,c.width,c.height),!0):!1}function jf(e,t,n){let r=t.gpuShapePipeline;if(!r)return!1;let i=Of(e);if(e.shape.shapeType===`path`&&!i)return!1;let a={x:t.canvasSettings.width/2+e.transform.x-e.transform.width/2,y:t.canvasSettings.height/2+e.transform.y-e.transform.height/2,width:e.transform.width,height:e.transform.height};return r.renderShapeToTexture(n,{outputWidth:t.canvasSettings.width,outputHeight:t.canvasSettings.height,transformRect:a,rotationRad:e.transform.rotation*Math.PI/180,opacity:e.opacity,shapeType:e.shape.shapeType,fillColor:[1,1,1,1],cornerRadius:e.shape.cornerRadius,direction:e.shape.direction,points:e.shape.points,innerRadius:e.shape.innerRadius,aspectRatioLocked:e.shape.transform?.aspectRatioLocked,pathVertices:i,pathClosed:!0,maskFeatherPixels:e.maskType===`alpha`?e.feather:0,clear:!0,blend:!1})}function Mf(e,t,n,r,i){let a=e.createCommandEncoder();a.copyTextureToTexture({texture:t},{texture:n},{width:r,height:i}),e.queue.submit([a.finish()])}function Nf(e,t,n){return JSON.stringify({width:t,height:n,text:e.text,textSpans:e.textSpans,fontSize:e.fontSize,fontFamily:e.fontFamily,fontWeight:e.fontWeight,fontStyle:e.fontStyle,underline:e.underline,color:e.color,backgroundColor:e.backgroundColor,backgroundRadius:e.backgroundRadius,textAlign:e.textAlign,verticalAlign:e.verticalAlign,lineHeight:e.lineHeight,letterSpacing:e.letterSpacing,textPadding:e.textPadding,textShadow:e.textShadow,stroke:e.stroke})}function Pf(e){return JSON.stringify({id:e.shape.id,shapeType:e.shape.shapeType,width:e.bitmapMask?.width,height:e.bitmapMask?.height,transform:{x:e.transform.x,y:e.transform.y,width:e.transform.width,height:e.transform.height,rotation:e.transform.rotation,opacity:e.transform.opacity,cornerRadius:e.transform.cornerRadius},cornerPin:e.shape.cornerPin,fillColor:e.shape.fillColor,strokeColor:e.shape.strokeColor,strokeWidth:e.shape.strokeWidth,direction:e.shape.direction,points:e.shape.points,innerRadius:e.shape.innerRadius,pathVertices:e.shape.pathVertices,maskType:e.maskType,feather:e.feather,opacity:e.opacity})}function Ff(e){for(;Rf(e)>67108864;){let t=e.keys().next().value;if(t===void 0)return;let n=e.get(t);n?.texture.destroy(),e.delete(t),Bf(`evict`,{width:n?.width,height:n?.height,bytes:n?.bytes,cacheBytes:Rf(e),entries:e.size})}}function If(e){for(;zf(e)>67108864;){let t=e.keys().next().value;if(t===void 0)return;e.get(t)?.texture.destroy(),e.delete(t)}}function Lf(e,t){return e*t*4}function Rf(e){let t=0;for(let n of e.values())t+=n.bytes;return t}function zf(e){let t=0;for(let n of e.values())t+=n.bytes;return t}function Bf(e,t){Hf()&&qo.debug(`GPU text texture cache`,{event:e,...t})}function Vf(e,t){if(!L(e.cornerPin))return;let n=de(e.cornerPin,t.width,t.height);if(!n||!L(n))return;let r=me(pe(t.width,t.height,n));if(r)return{originX:t.x,originY:t.y,width:t.width,height:t.height,inverseMatrix:r}}function Hf(){return typeof location<`u`&&location.search.includes(`debugGpuTransitions=1`)?!0:typeof localStorage>`u`?!1:localStorage.getItem(`freecut.debugGpuTransitions`)===`1`}async function Uf(e,t,n,r,i,a=[]){let o=await Gf(t,n,r,i,a);try{Xu(e,t,o.leftFinalCanvas,o.rightFinalCanvas,r.canvasSettings,r.gpuTransitionPipeline)}finally{for(let e of o.poolCanvases)r.canvasPool.release(e)}}async function Wf(e,t,n,r,i=[]){let{canvasPool:a}=n,{leftClip:o,rightClip:s}=e,c=Qf(o,e,t,r,n),l=Qf(s,e,t,r,n),{canvas:u,ctx:d}=a.acquire(),{canvas:f,ctx:p}=a.acquire(),m=[u,f];try{let e=n.isRenderingTransition;n.isRenderingTransition=!0;try{await Promise.all([xc(d,c.item,c.transform,t,n,0,c.renderSpan,i),xc(p,l.item,l.transform,t,n,0,l.renderSpan,i)])}finally{n.isRenderingTransition=e}return{leftCanvas:u,rightCanvas:f,leftParticipant:c,rightParticipant:l,poolCanvases:m}}catch(e){for(let e of m)a.release(e);throw e}}async function Gf(e,t,n,r,i=[]){let{canvasPool:a,canvasSettings:o}=n,{leftCanvas:s,rightCanvas:c,leftParticipant:l,rightParticipant:u,poolCanvases:d}=await Wf(e,t,n,r,i);try{let e=s,r=c,[f,p]=await Promise.all([l.effects.length>0?Xa(a,s,l.effects,L(l.item.cornerPin)?[]:i,t,o,n.gpuPipeline):Promise.resolve(null),u.effects.length>0?Xa(a,c,u.effects,L(u.item.cornerPin)?[]:i,t,o,n.gpuPipeline):Promise.resolve(null)]);return f&&(e=f.source,d.push(...f.poolCanvases)),p&&(r=p.source,d.push(...p.poolCanvases)),{leftFinalCanvas:e,rightFinalCanvas:r,poolCanvases:d}}catch(e){for(let e of d)a.release(e);throw e}}async function Kf(e,t,n,r,i,a=[]){return n.gpuPipeline?qf(e,t,n,r,i,a):null}async function qf(e,t,n,r,i,a=[]){if(!n.gpuPipeline)return null;let o=Qf(e.leftClip,e,t,r,n),s=Qf(e.rightClip,e,t,r,n),c=[],l=[],u=n.isRenderingTransition;try{let e=i.acquire(n.canvasSettings.width,n.canvasSettings.height),r=i.acquire(n.canvasSettings.width,n.canvasSettings.height);c.push(e,r),n.isRenderingTransition=!0;let u=await Jf(o,t,n,i,e,l,a),d=await Jf(s,t,n,i,r,l,a);if(!u||!d){for(let e of c)i.release(e);for(let e of l)n.canvasPool.release(e);return null}return{leftTexture:e,rightTexture:r,poolCanvases:l,poolTextures:c}}catch(e){for(let e of c)i.release(e);for(let e of l)n.canvasPool.release(e);throw e}finally{n.isRenderingTransition=u}}async function Jf(e,t,n,r,i,a,o=[]){let s=await Qd(e,t,n);if(s)try{if(await Bd(s,n,r,i))return Yf(e,s.media.kind,`gpu-direct`),!0;Yf(e,s.media.kind,`canvas-rasterize`,{reason:`direct-render-failed`})}finally{s.media.close?.()}else Yf(e,null,`canvas-rasterize`,{reason:Xf(e,n)});let{canvas:c,ctx:l}=n.canvasPool.acquire();return a.push(c),c.width=n.canvasSettings.width,c.height=n.canvasSettings.height,l.clearRect(0,0,c.width,c.height),await xc(l,e.item,e.transform,t,n,0,e.renderSpan,o),n.gpuPipeline?.applyEffectsToTexture(c,Za(e.effects,t/n.fps),i)??!1}function Yf(e,t,n,r={}){Hf()&&qo.debug(`GPU transition participant path`,{itemId:e.item.id,itemType:e.item.type,mediaKind:t,path:n,effects:e.effects.length,...r})}function Xf(e,t){let n=e.item;return n.type===`text`?`text-rasterization`:n.type===`composition`?`sub-composition-rasterization`:n.type===`shape`?Tf(n,e.transform,e.effects,t)??`shape-direct-unavailable`:n.type===`image`?t.gpuMediaPipeline?t.imageElements.has(n.id)?`image-direct-unavailable`:`image-source-unavailable`:`media-pipeline-unavailable`:n.type===`video`?t.gpuMediaPipeline?t.useMediabunny.has(n.id)?t.mediabunnyDisabledItems.has(n.id)?`video-frame-capture-disabled`:t.videoExtractors.has(n.id)?`video-frame-capture-failed`:`video-extractor-unavailable`:`video-frame-capture-unavailable`:`media-pipeline-unavailable`:`unsupported-item-type`}async function Zf(e,t,n,r,i,a){let o=Tc.getRenderer(t.transition.presentation)?.gpuTransitionId,s=r.gpuTransitionPipeline;if(!o||!s?.has(o))return!1;if(a){let c=await Kf(t,n,r,i,a);if(c)try{if(s.renderTexturesToTexture(o,c.leftTexture,c.rightTexture,e,t.progress,r.canvasSettings.width,r.canvasSettings.height,t.transition.direction,t.transition.properties))return!0}finally{for(let e of c.poolTextures)a.release(e);for(let e of c.poolCanvases)r.canvasPool.release(e)}}let c=await Gf(t,n,r,i);try{return s.renderToTexture(o,c.leftFinalCanvas,c.rightFinalCanvas,e,t.progress,r.canvasSettings.width,r.canvasSettings.height,t.transition.direction,t.transition.properties)}finally{for(let e of c.poolCanvases)r.canvasPool.release(e)}}function Qf(e,t,n,r,i){let a=i.getCurrentItemSnapshot?.(e)??e,o=ar(i.getCurrentItemSnapshot?.(t.leftClip)??t.leftClip,i.getCurrentItemSnapshot?.(t.rightClip)??t.rightClip,t,i.fps),s=o&&a.id===t.leftClip.id?o.left:o&&a.id===t.rightClip.id?o.right:void 0,c=rr(a,t,i.fps,s),l=wr(a,i.getCurrentKeyframes?.(a.id)??i.keyframesMap.get(a.id),n,i.canvasSettings,c);if(i.renderMode===`preview`){let e=i.getPreviewTransformOverride?.(a.id);if(e){let t=fr(e,i.canvasSettings);l={...l,...t,cornerRadius:t.cornerRadius??l.cornerRadius}}}let u=a;if(i.renderMode===`preview`){let e=i.getPreviewCornerPinOverride?.(a.id);e!==void 0&&(u={...a,cornerPin:e})}u=Zo(u,n,i,c);let d=(i.renderMode===`preview`?i.getPreviewEffectsOverride?.(a.id):void 0)??u.effects,f=$a(r,i.adjustmentLayers,n,i.renderMode===`preview`?i.getPreviewEffectsOverride:void 0,i.renderMode===`preview`?i.getLiveItemSnapshotById:void 0);return{item:u,transform:l,effects:eo(d,f),renderSpan:c}}function $f(){return n(`ClientRenderEngine`)}async function ep(e,t){let{frame:n,activeMasks:r,itemRenderContext:i,canvasPool:a}=t,o=r.filter(t=>so(t.trackOrder,e.trackOrder)),{canvas:s,ctx:c}=a.acquire();return await Uf(c,e.transition,n,i,e.trackOrder,o),{source:s,poolCanvases:[s]}}async function tp(e,t,n,r,i,a=!0,o=!1,s=!0){let{frame:c,canvasSettings:l,maskSettings:u,renderMode:d,activeMasks:f,adjustmentLayers:p,gpu:m,itemRenderContext:h,canvasPool:g,getCurrentItem:_,getCurrentKeyframes:v,getPreviewCornerPinOverride:y,getPreviewEffectsOverride:b,getLiveItemSnapshot:x}=i,S=_(e),C=wr(S,v(S.id),c,l),w=S;if(d===`preview`){let e=y?.(S.id);e!==void 0&&(w={...S,cornerPin:e})}let T=(d===`preview`?b?.(S.id):void 0)??w.effects,E=eo(ae(T,v(w.id),c-w.from),$a(t,p,c,d===`preview`?b:void 0,d===`preview`?x:void 0,v)),D=f.filter(e=>so(e.trackOrder,t)),O=a?D:[];if(O.length===0&&E.length>0){let e=Zd(w,C,E,c,h);if(e)return n?{source:e,poolCanvases:[]}:(r.drawImage(e,0,0),null)}if(s&&o&&m.texturePool&&h.gpuPipeline&&h.gpuMediaPipeline&&O.length===0&&E.length>0&&E.every(e=>e.enabled&&e.effect.type===`gpu-effect`)&&(w.type===`video`||w.type===`image`)&&m.texturePool){let e=m.texturePool.acquire(l.width,l.height),t=!1;try{if(t=await Vd(w,C,E,c,h,e,m.texturePool),t)return{gpuTexture:e,poolCanvases:[]}}finally{t||m.texturePool.release(e)}}let{canvas:k,ctx:A}=g.acquire();if(await xc(A,w,C,c,h,0,void 0,O),E.length>0){E.some(e=>e.enabled&&e.effect.type===`gpu-effect`)&&!h.gpuPipeline&&(h.gpuPipeline=await m.ensureEffects(),h.gpuPipeline||$f().warn(`GPU pipeline init failed — GPU effects will be skipped`));let{source:e,poolCanvases:t}=await Xa(g,k,E,L(w.cornerPin)?[]:O,c,u,h.gpuPipeline);if(g.release(k),n)return{source:e,poolCanvases:t};r.drawImage(e,0,0);for(let e of t)g.release(e);return null}return n?{source:k,poolCanvases:[k]}:(r.drawImage(k,0,0),g.release(k),null)}const np={normal:`source-over`,dissolve:`source-over`,darken:`darken`,multiply:`multiply`,"color-burn":`color-over`,"linear-burn":`source-over`,lighten:`lighten`,screen:`screen`,"color-dodge":`source-over`,"linear-dodge":`lighter`,overlay:`overlay`,"soft-light":`source-over`,"hard-light":`hard-light`,"vivid-light":`source-over`,"linear-light":`source-over`,"pin-light":`source-over`,"hard-mix":`source-over`,difference:`difference`,exclusion:`exclusion`,subtract:`source-over`,divide:`source-over`,hue:`hue`,saturation:`saturation`,color:`color`,luminosity:`luminosity`};function rp(e){let t=np[e];return t===`color-over`?`source-over`:t}function ip(){return n(`ClientRenderEngine`)}function ap(e,t){return e.type===`item`?L(t(e.item).cornerPin):L(t(e.transition.leftClip).cornerPin)||L(t(e.transition.rightClip).cornerPin)}function op(e){let{task:t,stagedResult:n,activeMasks:r,getCurrentItem:i,applyTrackScopedMasks:a,renderMasksToGpuTexture:o,layerMaskTextures:s}=e,c=ap(t,i),l=r.filter(e=>so(e.trackOrder,t.trackOrder)),u=t.type===`item`&&!c,d=u?n:a(n,t.trackOrder,c);if(!d)return null;let f=u&&l.length>0?o(l):null;f&&s.push(f.texture);let p=u?l:[];if(u&&l.length>0&&!f){let e=a(d,t.trackOrder,!1);if(!e)return null;d=e,p=[]}return{result:d,maskInfo:f,fallbackMasks:p}}function sp(e){let{result:t,w:n,h:r,device:i,texturePool:a,layerTextures:o}=e,s=t.gpuTexture;if(s)return o.push(s),s;if(!t.source)return null;let c=a.acquire(n,r);return o.push(c),i.queue.copyExternalImageToTexture({source:t.source,flipY:!1},{texture:c},{width:n,height:r}),c}function cp(e){let{renderTasks:t,results:n,activeMasks:r,canvasSettings:i,getCurrentItem:a,getEffectiveBlendMode:o,applyTrackScopedMasks:s,renderMasksToGpuTexture:c,device:l,texturePool:u,maskManager:d,targets:f}=e,p=i.width,m=i.height;for(let e=0;e<n.length;e++){let i=t[e],h=op({task:i,stagedResult:n[e]??null,activeMasks:r,getCurrentItem:a,applyTrackScopedMasks:s,renderMasksToGpuTexture:c,layerMaskTextures:f.layerMaskTextures});if(!h)continue;let{result:g,maskInfo:_,fallbackMasks:v}=h,y=i.type===`item`?o(a(i.item))??`normal`:`normal`,b=sp({result:g,w:p,h:m,device:l,texturePool:u,layerTextures:f.layerTextures});b&&(f.compositedResults.push({task:i,result:g,fallbackMasks:v}),f.layers.push({params:{...fa,blendMode:y,sourceAspect:p/m,outputAspect:p/m,hasMask:!!_},textureView:b.createView(),maskView:_?.view??d.getFallbackView()}))}}async function lp(e){let{compositor:t,layers:n,w:r,h:i,outputCtx:a}=e;if(n.length===0)return!1;try{return t.compositeToCanvas(n,r,i,a)}catch(e){return ip().warn(`GPU compositor failed - using Canvas2D blend fallback`,{error:e}),!1}}async function up(e){let{task:t,result:n,contentCtx:r,renderTransitionFallbackCanvas:i,renderItemWithEffects:a}=e,o=n;if(!o.source&&t.type===`transition`&&(o=await i(t)),!o.source&&t.type===`item`){let e=await a(t.item,t.trackOrder,!0,r,!0,!1,!1);if(!e)return null;o=e}return o.source?o:null}async function dp(e){let{task:t,result:n,fallbackMasks:r,contentCtx:i,canvasPool:a,maskSettings:o,getCurrentItem:s,getEffectiveBlendMode:c,renderTransitionFallbackCanvas:l,renderItemWithEffects:u}=e,d=await up({task:t,result:n,contentCtx:i,renderTransitionFallbackCanvas:l,renderItemWithEffects:u});if(!d)return;let f=d.source;if(!f)return;if(r.length>0){let{canvas:e,ctx:t}=a.acquire();Ka(t,f,r,o),d={source:e,poolCanvases:[...d===n?[]:d.poolCanvases,e]},f=e}let p=t.type===`item`?c(s(t.item)):void 0;if(p&&p!==`normal`&&(i.globalCompositeOperation=rp(p)),i.drawImage(f,0,0),p&&p!==`normal`&&(i.globalCompositeOperation=`source-over`),d!==n)for(let e of d.poolCanvases)a.release(e)}async function fp(e){let{compositedResults:t,contentCtx:n,canvasPool:r,maskSettings:i,getCurrentItem:a,getEffectiveBlendMode:o,renderTransitionFallbackCanvas:s,renderItemWithEffects:c}=e;for(let{task:e,result:l,fallbackMasks:u}of t)await dp({task:e,result:l,fallbackMasks:u,contentCtx:n,canvasPool:r,maskSettings:i,getCurrentItem:a,getEffectiveBlendMode:o,renderTransitionFallbackCanvas:s,renderItemWithEffects:c})}function pp(e){let{results:t,layerTextures:n,layerMaskTextures:r,canvasPool:i,texturePool:a}=e,o=/* @__PURE__ */ new Set;for(let e of t)if(e)for(let t of e.poolCanvases)o.has(t)||(o.add(t),i.release(t));for(let e of new Set(n))a.release(e);for(let e of new Set(r))a.release(e)}function mp(e){let{renderTasks:t,results:n,getCurrentItem:r,getEffectiveBlendMode:i,applyTrackScopedMasks:a,contentCtx:o,canvasPool:s,texturePool:c}=e;for(let e=0;e<n.length;e++){let l=t[e],u=a(n[e]??null,l.trackOrder,ap(l,r));u&&hp({task:l,result:u,getCurrentItem:r,getEffectiveBlendMode:i,contentCtx:o,canvasPool:s,texturePool:c})}}function hp(e){let{task:t,result:n,getCurrentItem:r,getEffectiveBlendMode:i,contentCtx:a,canvasPool:o,texturePool:s}=e;if(!n.source){n.gpuTexture&&s?.release(n.gpuTexture);return}let c=t.type===`item`?i(r(t.item)):void 0;c&&c!==`normal`&&(a.globalCompositeOperation=rp(c)),a.drawImage(n.source,0,0),c&&c!==`normal`&&(a.globalCompositeOperation=`source-over`);for(let e of n.poolCanvases)o.release(e)}async function gp(e){let{useGpuCompositor:t,gpu:n,gpuCompositeOutput:r,canvasSettings:i,maskSettings:a,renderTasks:o,results:s,activeMasks:c,contentCanvas:l,contentCtx:u,itemRenderContext:d,canvasPool:f,getCurrentItem:p,getEffectiveBlendMode:m,applyTrackScopedMasks:h,renderMasksToGpuTexture:g,renderTransitionFallbackCanvas:_,renderItemWithEffects:v}=e,y=l;if(t&&n.compositor&&n.maskManager&&r){let e=n.effects.getDevice(),t=i.width,l=i.height,b={layers:[],layerTextures:[],layerMaskTextures:[],compositedResults:[]};try{cp({renderTasks:o,results:s,activeMasks:c,canvasSettings:i,getCurrentItem:p,getEffectiveBlendMode:m,applyTrackScopedMasks:h,renderMasksToGpuTexture:g,device:e,texturePool:n.texturePool,maskManager:n.maskManager,targets:b}),await lp({compositor:n.compositor,layers:b.layers,w:t,h:l,outputCtx:r.ctx})?(await d.gpuPipeline?.waitForSubmittedWork(),y=r.canvas):await fp({compositedResults:b.compositedResults,contentCtx:u,canvasPool:f,maskSettings:a,getCurrentItem:p,getEffectiveBlendMode:m,renderTransitionFallbackCanvas:_,renderItemWithEffects:v})}finally{pp({results:s,layerTextures:b.layerTextures,layerMaskTextures:b.layerMaskTextures,canvasPool:f,texturePool:n.texturePool})}}else mp({renderTasks:o,results:s,getCurrentItem:p,getEffectiveBlendMode:m,applyTrackScopedMasks:h,contentCtx:u,canvasPool:f,texturePool:n.texturePool});return y}function _p(e,t){return e&&!t}function vp(e){return{shouldDirectRenderSingleTask:e.activeMaskCount===0&&e.activeTransitionCount===0&&e.renderTaskCount===1&&!e.hasGpuEffects,shouldUseDeferredGpuBatch:e.hasGpuEffects&&e.renderTaskCount>0}}function yp(e,t,n){return!(t<e.from||t>=e.from+e.durationInFrames||n.has(e.id)||e.type===`audio`||e.type===`adjustment`||e.type===`controller`||e.type===`shape`&&e.isMask)}function bp(e){return e?.some(e=>e.enabled&&e.effect.type===`gpu-effect`)??!1}function xp(e,t){let n=t?.(e.id);return bp(n??e.effects)}function Sp(e,t,n={}){let{getPreviewEffectsOverride:r}=n,i=n.getCurrentItem??(e=>e),a=n.visited??/* @__PURE__ */ new Set;if(a.has(e))return!1;a.add(e);let o=t.get(e);if(!o)return!1;for(let e of o.adjustmentLayers??[])if(xp(i(e.layer),r))return!0;for(let e of o.sortedTracks)if(e.visible)for(let n of e.items){let e=i(n);if(xp(e,r)||e.type===`composition`&&Sp(e.compositionId,t,{getCurrentItem:i,getPreviewEffectsOverride:r,visited:a}))return!0}return!1}function Cp(n){let r=n.label?.toLowerCase()??``;return t(n.src)||r.endsWith(`.gif`)||e(n.src)||r.endsWith(`.webp`)}function wp(e){return t(e.src)||(e.label?.toLowerCase()??``).endsWith(`.gif`)}function Tp(){return globalThis.__SCRUB_PERF__?performance.now():-1}function Ep(e,t,n,r={}){if(n<0)return;let i=globalThis,a=Number((performance.now()-n).toFixed(2));Pa({frame:e,path:t,ms:a,...r});let o=i.__scrubPerf??=[];o.push({f:e,path:t,ms:a,...r}),o.length>3e3&&o.shift();try{performance.measure(`scrub.renderFrame.${t}`,{start:n})}catch{}}var Dp=class{deps;constructor(e){this.deps=e}async run(e){let{gpu:t,canvasPool:n,canvasSettings:r,maskSettings:i,itemRenderContext:a,adjustmentLayers:o,lottieItems:s,transitionTrackOrderById:c,videoExtractors:l,sortedTracks:u,tracksTopToBottom:d,visibleTrackIds:f,setupGpuCompositor:p,scrubbingCache:m,ctx:h,canvas:g,renderMode:_,cacheRenderedFrame:v,detectFrameGpuEffects:y,discardFrameResults:b,ensureFrameGpuPipelines:x,ensureLottieOverridesFresh:S,lottieOverridesAreStale:C,refreshFrameRenderContext:w,resolveFrameSceneState:T,perfMarkIfEnabled:E,getCurrentKeyframes:D,getCurrentItem:O,getPreviewTransformOverride:k,getPreviewEffectsOverride:A,getPreviewCornerPinOverride:j,getLiveItemSnapshot:ee}=this.deps,M=Tp();this.deps.lastRenderAborted=!1,this.deps.activePreviewFramePending=!1,this.deps.activePreviewFallbackUsed=!1,a.previewRootTimelineFrame=e;let N=()=>_===`preview`&&a.isActivePreviewFrameSuperseded?.(e)===!0,P=()=>{this.deps.lastRenderAborted||Ep(e,`aborted`,M),this.deps.lastRenderAborted=!0};if(!(()=>{if(N()||a.isActivePreviewFrameCurrent?.(e)&&a.isActivePreviewFrameDecodeReady?.(e)===!1)return P(),!1;if(m&&this.deps.scrubbingFrameCacheActive){let t=m.getFrame(e);if(t)return h.clearRect(0,0,g.width,g.height),h.drawImage(t,0,0),Ep(e,`cache-hit`,M),!1}return!0})())return;if(w(e),_===`preview`&&s.length>0&&C()&&(await S(),N())){P();return}let{activeMasks:F,frameScene:te}=T(e),{activeTransitions:ne,transitionClipIds:re}=te.transitionFrameState,ie=y(e);if(await x(ie,ne.length>0),N()){P();return}let ae={frame:e,canvasSettings:r,maskSettings:i,renderMode:_,activeMasks:F,adjustmentLayers:o,gpu:t,itemRenderContext:a,canvasPool:n,getCurrentItem:O,getCurrentKeyframes:D,getPreviewTransformOverride:k,getPreviewCornerPinOverride:j,getPreviewEffectsOverride:A,getLiveItemSnapshot:ee},oe=(e,t,n,r,i=!0,a=!1,o=!0)=>tp(e,t,n,r,ae,i,a,o),I=e=>e.blendMode,se=t=>yp(O(t),e,re),ce={frame:e,canvasWidth:g.width,canvasHeight:g.height,canvasSettings:r,renderMode:_,transitionClipIds:re,adjustmentLayers:o,getCurrentItem:O,getCurrentKeyframes:D,getPreviewEffectsOverride:A,getLiveItemSnapshot:ee,hasTransparentVideoSource:e=>l.get(e.id)?.getCanBeTransparent()??!1},{occlusionCutoffOrder:le,renderTasks:ue}=En({tracksByOrderDesc:u,tracksByOrderAsc:d,visibleTrackIds:f,activeTransitions:ne,getTransitionTrackOrder:e=>c.get(e.transition.id)??0,disableOcclusion:F.length>0,shouldRenderItem:se,isFullyOccluding:(e,t)=>oo(e,t,ce)}),{shouldDirectRenderSingleTask:de,shouldUseDeferredGpuBatch:fe}=vp({activeMaskCount:F.length,activeTransitionCount:ne.length,hasGpuEffects:ie,renderTaskCount:ue.length}),pe=e=>{if(e.type!==`item`)return!1;let t=O(e.item),n=I(t);return!!(n&&n!==`normal`)},{useGpuCompositor:me,gpuCompositeOutput:he}=await p(ue.some(e=>pe(e)));if(fe&&a.gpuPipeline&&a.gpuPipeline.beginBatch(),await(async()=>{if(!de)return!1;if(N())return P(),!0;let t=ue[0];if(t?.type===`item`){let e=I(O(t.item));try{e&&e!==`normal`&&(h.globalCompositeOperation=rp(e)),await oe(t.item,t.trackOrder,!1,h)}finally{e&&e!==`normal`&&(h.globalCompositeOperation=`source-over`)}}return N()||this.deps.activePreviewFramePending?(P(),!0):(v(e),Ep(e,`direct`,M),!0)})())return;let{canvas:ge,ctx:_e}=n.acquire(),ve=E(M),ye=ve,be=ve,R=ve,xe=ge,Se=[];{le!==null&&u.filter(e=>f.has(e.id)&&(e.order??0)>le).length;let o=e=>co(e,{gpu:t,canvasSettings:r,maskSettings:i}),s=t=>ep(t,{frame:e,activeMasks:F,itemRenderContext:a,canvasPool:n}),c=(e,t,r)=>lo(e,t,r,{activeMasks:F,canvasPool:n,maskSettings:i}),l=async n=>{let i=E(M);try{if(N())return null;if(n.type===`item`){let e=O(n.item),r=me&&t.texturePool&&!L(e.cornerPin);return oe(n.item,n.trackOrder,!0,_e,!r,!1)}let i=F.filter(e=>so(e.trackOrder,n.trackOrder));if(me&&t.texturePool&&i.length===0&&a.gpuTransitionPipeline){let i=t.texturePool.acquire(r.width,r.height);if(await Zf(i,n.transition,e,a,n.trackOrder,t.texturePool))return{gpuTexture:i,poolCanvases:[]};t.texturePool.release(i)}return s(n)}finally{if(i>=0){let e=performance.now()-i;if(e>=8){let t=n.type===`item`?O(n.item):null;Se.push({id:t?.id??(n.type===`transition`?n.transition.transition.id:`unknown`),kind:t?.type??n.type,ms:Number(e.toFixed(2))})}}}},d=async()=>{let e=Array(ue.length).fill(null),t=_===`preview`?Math.min(1,ue.length):ue.length,n=0,r=async()=>{for(;n<ue.length;){if(N())return;let t=n++;e[t]=await l(ue[t])}};return await Promise.all(Array.from({length:t},()=>r())),e},p;try{p=await d(),ye=E(M)}finally{fe&&a.gpuPipeline&&a.gpuPipeline.endBatch()}if(N()||this.deps.activePreviewFramePending){b(p,ge),P();return}be=E(M),xe=await gp({useGpuCompositor:me,gpu:t,gpuCompositeOutput:he,canvasSettings:r,maskSettings:i,renderTasks:ue,results:p,activeMasks:F,contentCanvas:ge,contentCtx:_e,itemRenderContext:a,canvasPool:n,getCurrentItem:O,getEffectiveBlendMode:I,applyTrackScopedMasks:c,renderMasksToGpuTexture:o,renderTransitionFallbackCanvas:s,renderItemWithEffects:oe}),R=E(M)}h.drawImage(xe,0,0),n.release(ge),v(e),(()=>{if(M<0)return;let t=performance.now();Ep(e,`full`,M,{planMs:Number((ve-M).toFixed(2)),taskMs:Number((ye-ve).toFixed(2)),gpuWaitMs:Number((be-ye).toFixed(2)),compositeMs:Number((R-be).toFixed(2)),finalizeMs:Number((t-R).toFixed(2)),taskCount:ue.length,transitionCount:ne.length,slowTasks:Se.length>0?Se:void 0})})()}};const Op=n(`CanvasPool`);var kp=class{available=[];inUse=/* @__PURE__ */ new Set;width;height;maxSize;peakInUse=0;temporaryAllocations=0;onStatsChange;constructor(e,t,n=8,r=20,i){this.width=e,this.height=t,this.maxSize=r,this.onStatsChange=i;for(let r=0;r<n;r++)this.available.push(new OffscreenCanvas(e,t))}acquire(){let e;this.available.length>0?e=this.available.pop():this.inUse.size<this.maxSize?e=new OffscreenCanvas(this.width,this.height):(Op.warn(`Canvas pool exhausted, creating temporary canvas`),this.temporaryAllocations+=1,e=new OffscreenCanvas(this.width,this.height)),this.inUse.add(e);let t=Math.max(this.peakInUse,this.inUse.size);(t!==this.peakInUse||this.temporaryAllocations>0)&&(this.peakInUse=t,this.onStatsChange?.({width:this.width,height:this.height,maxSize:this.maxSize,peakInUse:this.peakInUse,temporaryAllocations:this.temporaryAllocations})),(e.width!==this.width||e.height!==this.height)&&(e.width=this.width,e.height=this.height);let n=e.getContext(`2d`);return n.globalAlpha=1,n.globalCompositeOperation=`source-over`,n.clearRect(0,0,this.width,this.height),{canvas:e,ctx:n}}release(e){this.inUse.has(e)&&(this.inUse.delete(e),this.available.length<this.maxSize&&this.available.push(e))}dispose(){this.available.length=0,this.inUse.clear()}getStats(){return{available:this.available.length,inUse:this.inUse.size,total:this.available.length+this.inUse.size,peakInUse:this.peakInUse,temporaryAllocations:this.temporaryAllocations}}},Ap=class{cache=/* @__PURE__ */ new Map;maxSize=1e3;measure(e,t,n){let r=`${e.font}|${t}|${n}`,i=this.cache.get(r);if(i===void 0){if(ie(e,n),i=e.measureText(t).width,this.cache.size>=this.maxSize){let e=this.cache.keys().next().value;e&&this.cache.delete(e)}this.cache.set(r,i)}return i}clear(){this.cache.clear()}};const jp=n(`VideoFrameExtractor`),Mp=Symbol(`video-frame-draw-cancelled`);var Np=class e{src;itemId;options;static TIMESTAMP_EPSILON=1e-4;static LOOKAHEAD_TOLERANCE_SECONDS=.05;static STREAM_BACKTRACK_SECONDS=1;static FORWARD_JUMP_RESTART_SECONDS=3;sink=null;input=null;videoTrack=null;duration=0;ready=!1;canBeTransparent=!1;drawFailureCount=0;sampleIterator=null;currentSample=null;nextSample=null;iteratorDone=!1;streamGeneration=0;disposed=!1;lastRequestedTimestamp=null;sampleLoopError=null;lastFailureKind=`none`;cachedVideoFrame=null;cachedVideoFrameSample=null;constructor(e,t,n={}){this.src=e,this.itemId=t,this.options=n}async init(){this.disposed=!1;try{let[e]=await Promise.all([import(`./src-B-ojgZKZ.js`),o()]),t=a(e,this.src);return this.input=new e.Input({formats:e.ALL_FORMATS,source:t}),this.videoTrack=await this.input.getPrimaryVideoTrack(),this.videoTrack?typeof this.videoTrack.canDecode==`function`&&!await this.videoTrack.canDecode()?(this.logInitFailure(`Video track is not decodable via mediabunny/WebCodecs`,{itemId:this.itemId},`warn`),!1):(typeof this.videoTrack.canBeTransparent==`function`&&(this.canBeTransparent=await this.videoTrack.canBeTransparent().catch(()=>!1)),this.duration=await this.input.computeDuration(),this.sink=new e.VideoSampleSink(this.videoTrack),this.ready=!0,jp.debug(`Initialized`,{itemId:this.itemId,duration:this.duration,width:this.videoTrack.displayWidth,height:this.videoTrack.displayHeight}),!0):(this.logInitFailure(`No video track found`,{itemId:this.itemId},`warn`),!1)}catch(e){return this.logInitFailure(`Failed to initialize`,{itemId:this.itemId,error:e},`error`),!1}}logInitFailure(e,t,n){if(this.options.logFrameFailuresAsDebug){jp.debug(e,t);return}n===`error`?jp.error(e,t):jp.warn(e,t)}async drawFrame(e,t,n,r,i,a,o){if(!this.ready||!this.sink)return!1;let s=Math.max(0,this.duration-.001),c=Math.max(0,Math.min(t,s)),l=this.sampleLoopError;try{return await this.ensureSampleForTimestamp(c,o),this.drawCurrentSample(e,n,r,i,a)?(this.drawFailureCount=0,this.lastFailureKind=`none`,!0):(l=this.sampleLoopError,this.reportDrawFailure(t,c,l))}catch(s){if(s===Mp)return!1;if(l=s,this.sampleLoopError=s,await this.recoverAndPrime(c,s,o)){if(this.drawCurrentSample(e,n,r,i,a))return this.drawFailureCount=0,this.lastFailureKind=`none`,!0;l=this.sampleLoopError}return this.lastFailureKind=this.lastFailureKind===`no-sample`?`no-sample`:`decode-error`,this.reportDrawFailure(t,c,l)}}async drawFrameWithCapture(e,t,n,r,i,a,o){return await this.drawFrame(e,t,n,r,i,a,o)?{success:!0,capturedFrame:await this.captureCurrentOrientedFrame(),capturedSourceTime:this.currentSample?.timestamp??null}:{success:!1,capturedFrame:null,capturedSourceTime:null}}async captureFrame(t,n){let r=this.duration,i=r>0?Math.max(0,Math.min(t,r-e.TIMESTAMP_EPSILON)):Math.max(0,t);this.sampleLoopError=null,this.lastFailureKind=`none`;try{return await this.ensureSampleForTimestamp(i,n),!this.currentSample||!this.currentSampleCoversTimestamp(i)?(this.lastFailureKind=`no-sample`,{success:!1,frame:null,sourceTime:null}):{success:!0,frame:await this.captureCurrentOrientedFrame(),sourceTime:this.currentSample.timestamp}}catch(e){return e===Mp?{success:!1,frame:null,sourceTime:null}:(this.sampleLoopError=e,this.lastFailureKind=`decode-error`,{success:!1,frame:null,sourceTime:null})}}async ensureSampleForTimestamp(t,n){if(this.sink){if(n&&!n())throw Mp;for(this.sampleIterator?(this.lastRequestedTimestamp!==null&&t+e.TIMESTAMP_EPSILON<this.lastRequestedTimestamp&&!this.currentSampleCoversTimestamp(t)||this.lastRequestedTimestamp!==null&&t-this.lastRequestedTimestamp>e.FORWARD_JUMP_RESTART_SECONDS)&&this.resetSampleIterator(t,`backward`):this.resetSampleIterator(t,`init`),this.lastRequestedTimestamp=t;;){if(n&&!n())throw Mp;let r=await this.peekNextSample();if(n&&!n())throw Mp;if(!r)break;if(r.timestamp<=t+e.TIMESTAMP_EPSILON){this.closeCachedVideoFrame(),this.closeSample(this.currentSample),this.currentSample=r,this.nextSample=null;continue}!this.currentSample&&r.timestamp-t<=e.LOOKAHEAD_TOLERANCE_SECONDS&&(this.currentSample=r,this.nextSample=null);break}}}currentSampleCoversTimestamp(t){let n=this.currentSample;return!n||n.timestamp>t+e.TIMESTAMP_EPSILON?!1:typeof n.duration!=`number`||!Number.isFinite(n.duration)||n.duration<=0||n.timestamp+n.duration>=t-e.TIMESTAMP_EPSILON}async peekNextSample(){if(this.nextSample)return this.nextSample;if(!this.sampleIterator||this.iteratorDone)return null;let e=this.sampleIterator,t=this.streamGeneration,n=await e.next();return this.disposed||t!==this.streamGeneration||e!==this.sampleIterator?(n.done||this.closeSample(n.value),null):n.done?(this.iteratorDone=!0,null):(this.nextSample=n.value,this.nextSample)}resetSampleIterator(t,n){if(this.closeStreamState(),!this.sink)return;let r=C(this.src,t),i=r??Math.max(0,t-e.STREAM_BACKTRACK_SECONDS);n===`recover`&&jp.debug(`Restarting mediabunny sample stream`,{itemId:this.itemId,reason:n,startTimestamp:t,streamStart:i,adaptive:r!==null}),this.sampleIterator=this.sink.samples(i,1/0),this.iteratorDone=!1,this.lastRequestedTimestamp=null}drawCurrentSample(e,t,n,r,i){let a=this.currentSample;if(!a)return this.lastFailureKind=`no-sample`,!1;try{return typeof a.draw==`function`?(a.draw(e,t,n,r,i),!0):(this.lastFailureKind=`decode-error`,!1)}catch(e){return this.closeCachedVideoFrame(),this.sampleLoopError=e,this.lastFailureKind=`decode-error`,!1}}getOrCreateCurrentVideoFrame(){let e=this.currentSample;if(!e)return this.lastFailureKind=`no-sample`,null;let t=this.cachedVideoFrame;if(!t||this.cachedVideoFrameSample!==e){if(this.closeCachedVideoFrame(),t=e.toVideoFrame(),!t)return this.sampleLoopError=/* @__PURE__ */ Error(`Decoded sample could not be converted to VideoFrame`),this.lastFailureKind=`decode-error`,null;this.cachedVideoFrame=t,this.cachedVideoFrameSample=e}return t}cloneCurrentVideoFrame(){let e=this.getOrCreateCurrentVideoFrame();if(!e)return null;try{return e.clone()}catch(e){return this.sampleLoopError=e,null}}async captureCurrentOrientedFrame(){let e=this.currentSample;if(!e)return this.lastFailureKind=`no-sample`,null;let t=Math.round(this.videoTrack?.displayWidth??0),n=Math.round(this.videoTrack?.displayHeight??0);if(t<=0||n<=0)return this.cloneCurrentVideoFrame();try{let r=new OffscreenCanvas(t,n),i=r.getContext(`2d`);return!i||typeof e.draw!=`function`?this.cloneCurrentVideoFrame():(e.draw(i,0,0,t,n),await createImageBitmap(r))}catch(e){return this.sampleLoopError=e,this.cloneCurrentVideoFrame()}}closeCachedVideoFrame(){if(this.cachedVideoFrame){try{this.cachedVideoFrame.close()}catch{}this.cachedVideoFrame=null,this.cachedVideoFrameSample=null}}async recoverAndPrime(e,t,n){let r=t instanceof Error?t.message:String(t);if(!/key frame|configure\(\)|flush\(\)|InvalidStateError|decode/i.test(r))return!1;try{return this.resetSampleIterator(e,`recover`),await this.ensureSampleForTimestamp(e,n),this.currentSample!==null}catch(e){if(e===Mp)throw e;return this.sampleLoopError=e,this.lastFailureKind=`decode-error`,!1}}closeStreamState(){let e=this.sampleIterator;this.sampleIterator=null,this.streamGeneration+=1,e&&e.return().catch(()=>{}),this.iteratorDone=!0,this.lastRequestedTimestamp=null,this.sampleLoopError=null,this.closeCachedVideoFrame(),this.closeSample(this.currentSample),this.closeSample(this.nextSample),this.currentSample=null,this.nextSample=null}closeSample(e){if(e)try{e.close()}catch{}}reportDrawFailure(e,t,n){this.drawFailureCount+=1;let r=this.drawFailureCount<=3||this.drawFailureCount%20==0,i={itemId:this.itemId,timestamp:e,clampedTime:t,duration:this.duration,failures:this.drawFailureCount,reason:this.lastFailureKind,error:n instanceof Error?n.message:String(n)};return r&&!this.options.logFrameFailuresAsDebug?jp.warn(`Mediabunny frame extraction failed`,i):jp.debug(`Mediabunny frame extraction failed`,i),!1}getLastFailureKind(){return this.lastFailureKind}batchDisabled=!1;async prewarmBatch(e,t,n,r,i,a){if(this.batchDisabled||!this.ready||!this.sink||t.length===0)return-1;let o=0;try{for await(let s of this.sink.samplesAtTimestamps(t))if(s)try{typeof s.draw==`function`&&(s.draw(e,n,r,i,a),o++)}finally{s.close()}return o}catch(e){let t=e instanceof Error?e.message:String(e);return/key frame|flush|InvalidStateError/i.test(t)&&(jp.warn(`Disabling batch prewarm for source (decoder flush error)`,{itemId:this.itemId,error:t,decoded:o}),this.batchDisabled=!0),o>0?o:-1}}isBatchPrewarmAvailable(){return!this.batchDisabled&&this.ready&&this.sink!==null}getDimensions(){return this.videoTrack?{width:this.videoTrack.displayWidth,height:this.videoTrack.displayHeight}:{width:1920,height:1080}}getDuration(){return this.duration}getCanBeTransparent(){return this.canBeTransparent||!this.ready}dispose(){this.disposed=!0,this.closeStreamState();try{this.input?.dispose()}catch{}this.sink=null,this.input=null,this.videoTrack=null,this.ready=!1,this.drawFailureCount=0,this.lastFailureKind=`none`}};const Pp=n(`SharedVideoExtractorPool`);let Fp;function Ip(e,t){return`${e}\u0000${t}`}function Lp(){Fp||={pool:new zp({maxLanesPerSource:4,maxActiveSources:6,logFrameFailuresAsDebug:!0,onStatsChange:void 0}),leases:0};let e=Fp;e.leases+=1;let t=!1;return{pool:e.pool,release(){if(!t&&(t=!0,Fp===e&&(e.leases=Math.max(0,e.leases-1),e.leases===0))){e.pool.dispose(),Fp=void 0,delete globalThis.__PREVIEW_VIDEO_EXTRACTOR_STATS__;return}}}}var Rp=class{pool;itemId;src;constructor(e,t,n){this.pool=e,this.itemId=t,this.src=n}init(){return this.pool.initSource(this.src)}drawFrame(e,t,n,r,i,a,o){return this.pool.drawItemFrame(this.itemId,this.src,e,t,n,r,i,a,o)}drawFrameWithCapture(e,t,n,r,i,a,o){return this.pool.drawItemFrameWithCapture(this.itemId,this.src,e,t,n,r,i,a,o)}captureFrame(e,t){return this.pool.captureItemFrame(this.itemId,this.src,e,t)}getLastFailureKind(){return this.pool.getItemLastFailureKind(this.itemId,this.src)}getDimensions(){return this.pool.getItemDimensions(this.itemId,this.src)}getDuration(){return this.pool.getItemDuration(this.itemId,this.src)}getCanBeTransparent(){return this.pool.getItemCanBeTransparent(this.itemId,this.src)}prewarmBatch(e,t,n,r,i,a){return this.pool.prewarmItemBatch(this.itemId,this.src,e,t,n,r,i,a)}isBatchPrewarmAvailable(){return this.pool.isItemBatchPrewarmAvailable(this.itemId,this.src)}dispose(){}},zp=class{maxLanesPerSource;maxActiveSources;logFrameFailuresAsDebug;onStatsChange;sourceStates=/* @__PURE__ */ new Map;itemSources=/* @__PURE__ */ new Map;itemWrappers=/* @__PURE__ */ new Map;itemRefCounts=/* @__PURE__ */ new Map;laneIdCounter=0;peakInitializedSources=0;sourceEvictions=0;lanesCreated=0;constructor(e={}){this.maxLanesPerSource=Math.max(1,e?.maxLanesPerSource??4),this.maxActiveSources=Math.max(1,e.maxActiveSources??1/0),this.logFrameFailuresAsDebug=e?.logFrameFailuresAsDebug===!0,this.onStatsChange=e.onStatsChange}getOrCreateItemExtractor(e,t){let n=Ip(e,t),r=this.itemWrappers.get(n);if(r)return this.itemRefCounts.set(n,(this.itemRefCounts.get(n)??0)+1),this.notifyStatsChanged(),r;this.itemSources.set(n,t),this.ensureSourceState(t);let i=new Rp(this,e,t);return this.itemWrappers.set(n,i),this.itemRefCounts.set(n,1),this.notifyStatsChanged(),i}async initSource(e){let t=this.ensureSourceState(e);return t.sourceReady?!0:!t.sourceInitAttempted&&(t.sourceInitPromise||=(async()=>{this.touchSource(t),this.ensurePrimaryLane(t);let n=await this.ensureLaneInitialized(t,0);return t.sourceInitAttempted=!0,t.sourceReady=n,n&&(this.evictExcessActiveSources(e),this.peakInitializedSources=Math.max(this.peakInitializedSources,[...this.sourceStates.values()].filter(e=>e.sourceReady).length)),this.notifyStatsChanged(),n})().finally(()=>{t.sourceInitPromise=null}),t.sourceInitPromise)}releaseItem(e,t){let n=t?[Ip(e,t)]:[...this.itemSources.keys()].filter(t=>t.startsWith(`${e}\u0000`));for(let t of n){let n=this.itemSources.get(t);if(!n)continue;let r=this.itemRefCounts.get(t)??0;if(r>1){this.itemRefCounts.set(t,r-1);continue}this.unassignItem(e,n),this.itemWrappers.get(t)?.dispose(),this.itemSources.delete(t),this.itemWrappers.delete(t),this.itemRefCounts.delete(t),this.pruneIdleSource(n)}this.notifyStatsChanged()}async drawItemFrame(e,t,n,r,i,a,o,s,c){if(c&&!c())return!1;let l=this.ensureSourceState(t);return this.withSourceOperation(l,async()=>{if(!await this.initSource(t))return!1;let u=await this.getInitializedLaneForItem(l,e);if(!u)return!1;let d=(u.drawLock??Promise.resolve()).then(()=>u.extractor.drawFrame(n,r,i,a,o,s,c));return u.drawLock=d.then(()=>void 0,()=>void 0),d})}async drawItemFrameWithCapture(e,t,n,r,i,a,o,s,c){if(c&&!c())return{success:!1,capturedFrame:null,capturedSourceTime:null};let l=this.ensureSourceState(t);return this.withSourceOperation(l,async()=>{if(!await this.initSource(t))return{success:!1,capturedFrame:null,capturedSourceTime:null};let u=await this.getInitializedLaneForItem(l,e);if(!u)return{success:!1,capturedFrame:null,capturedSourceTime:null};let d=(u.drawLock??Promise.resolve()).then(()=>u.extractor.drawFrameWithCapture(n,r,i,a,o,s,c));return u.drawLock=d.then(()=>void 0,()=>void 0),d})}async captureItemFrame(e,t,n,r){if(r&&!r())return{success:!1,frame:null,sourceTime:null};let i=this.ensureSourceState(t);return this.withSourceOperation(i,async()=>{if(!await this.initSource(t))return{success:!1,frame:null,sourceTime:null};let a=await this.getInitializedLaneForItem(i,e);if(!a)return{success:!1,frame:null,sourceTime:null};let o=(a.drawLock??Promise.resolve()).then(()=>a.extractor.captureFrame(n,r));return a.drawLock=o.then(()=>void 0,()=>void 0),o})}getItemLastFailureKind(e,t){return this.getExtractorForItem(e,t)?.getLastFailureKind()??`none`}getItemDimensions(e,t){return this.getExtractorForItem(e,t)?.getDimensions()??this.sourceStates.get(t)?.dimensions??{width:1920,height:1080}}getItemDuration(e,t){return this.getExtractorForItem(e,t)?.getDuration()??this.sourceStates.get(t)?.duration??0}getItemCanBeTransparent(e,t){return this.getExtractorForItem(e,t)?.getCanBeTransparent()??!1}async prewarmItemBatch(e,t,n,r,i,a,o,s){let c=this.ensureSourceState(t);return this.withSourceOperation(c,async()=>{if(!await this.initSource(t))return-1;let c=this.getExtractorForItem(e,t);return c?c.prewarmBatch(n,r,i,a,o,s):-1})}isItemBatchPrewarmAvailable(e,t){return this.getExtractorForItem(e,t)?.isBatchPrewarmAvailable()??!1}getStats(){let e=0,t=0,n=0;for(let r of this.sourceStates.values())r.sourceReady&&(e+=1),t+=r.lanes.length,n+=r.activeOperations;return{registeredBindings:this.itemWrappers.size,sourceStates:this.sourceStates.size,initializedSources:e,lanes:t,activeOperations:n,peakInitializedSources:this.peakInitializedSources,sourceEvictions:this.sourceEvictions,lanesCreated:this.lanesCreated}}dispose(){for(let e of this.sourceStates.values()){for(let t of e.lanes)t.extractor.dispose();e.lanes=[],e.itemLaneById.clear(),e.laneAssignments=[],e.sourceInitPromise=null,e.sourceReady=!1}this.sourceStates.clear(),this.itemSources.clear(),this.itemWrappers.clear(),this.itemRefCounts.clear(),this.notifyStatsChanged()}ensureSourceState(e){let t=this.sourceStates.get(e);return t||(t={src:e,lanes:[],itemLaneById:/* @__PURE__ */ new Map,laneAssignments:[],sourceInitPromise:null,sourceInitAttempted:!1,sourceReady:!1,lastUsed:performance.now(),activeOperations:0,dimensions:{width:1920,height:1080},duration:0},this.sourceStates.set(e,t),this.notifyStatsChanged()),t}createLane(e){let t=`shared-video-${++this.laneIdCounter}`;return this.lanesCreated+=1,{extractor:new Np(e,t,{logFrameFailuresAsDebug:this.logFrameFailuresAsDebug}),initialized:!1,initPromise:null,drawLock:null}}async ensureLaneInitialized(e,t){if(t<0||t>=e.lanes.length)return!1;let n=e.lanes[t];return n.initialized?!0:(n.initPromise||=n.extractor.init().then(t=>(n.initialized=t,t&&(e.dimensions=n.extractor.getDimensions(),e.duration=n.extractor.getDuration()),t)).catch(r=>(Pp.warn(`Shared lane initialization failed`,{laneIndex:t,src:e.src,error:r}),n.initialized=!1,!1)).finally(()=>{n.initPromise=null}),n.initPromise)}async getInitializedLaneForItem(e,t){this.ensurePrimaryLane(e);let n=this.getAssignedLaneIndex(e,t),r=await this.ensureLaneInitialized(e,n);return!r&&n!==0&&(n=0,r=await this.ensureLaneInitialized(e,n)),r?e.lanes[n]??null:null}getAssignedLaneIndex(e,t){this.ensurePrimaryLane(e);let n=e.itemLaneById.get(t);if(n!==void 0)return n;let r=0,i=1/0;for(let t=0;t<e.laneAssignments.length;t+=1){let n=e.laneAssignments[t]??0;n<i&&(i=n,r=t)}return i>0&&e.lanes.length<this.maxLanesPerSource&&(r=e.lanes.length,e.lanes.push(this.createLane(e.src)),e.laneAssignments.push(0)),e.itemLaneById.set(t,r),e.laneAssignments[r]=(e.laneAssignments[r]??0)+1,r}getExtractorForItem(e,t){let n=this.sourceStates.get(t);if(!n)return null;let r=n.itemLaneById.get(e)??0;return(n.lanes[r]??n.lanes[0])?.extractor??null}unassignItem(e,t){let n=this.sourceStates.get(t);if(!n)return;let r=n.itemLaneById.get(e);if(r!==void 0){n.itemLaneById.delete(e);let t=n.laneAssignments[r]??0;n.laneAssignments[r]=Math.max(0,t-1)}}pruneIdleSource(e){let t=this.sourceStates.get(e);t&&(t.itemLaneById.size>0||this.hasWrapperForSource(e)||(this.disposeSourceLanes(t),this.sourceStates.delete(e)))}hasWrapperForSource(e){for(let t of this.itemSources.values())if(t===e)return!0;return!1}ensurePrimaryLane(e){e.lanes.length>0||(e.lanes.push(this.createLane(e.src)),e.laneAssignments.push(0),this.notifyStatsChanged())}touchSource(e){e.lastUsed=performance.now()}async withSourceOperation(e,t){e.activeOperations+=1,this.touchSource(e),this.notifyStatsChanged();try{return await t()}finally{e.activeOperations=Math.max(0,e.activeOperations-1),this.touchSource(e),this.evictExcessActiveSources(e.src),this.notifyStatsChanged()}}evictExcessActiveSources(e){let t=[...this.sourceStates.values()].filter(e=>e.sourceReady);if(t.length<=this.maxActiveSources)return;let n=t.filter(t=>t.src!==e&&t.activeOperations===0&&!t.sourceInitPromise).sort((e,t)=>e.lastUsed-t.lastUsed),r=t.length;for(let e of n){if(r<=this.maxActiveSources)break;this.disposeSourceLanes(e),this.sourceEvictions+=1,--r}}disposeSourceLanes(e){for(let t of e.lanes)t.extractor.dispose();e.lanes=[],e.itemLaneById.clear(),e.laneAssignments=[],e.sourceInitPromise=null,e.sourceReady=!1,e.sourceInitAttempted=!1,this.notifyStatsChanged()}notifyStatsChanged(){this.onStatsChange?.(this.getStats())}};const Bp=`__virtual-transcript-captions__`;function Vp(e,t){let n=e.speed??1,r=e.sourceStart??0,i=e.sourceFps??t,a=r+_(e.durationInFrames,n,t,i);return{sourceStart:r,sourceEnd:e.sourceEnd??a,sourceFps:i,speed:n}}function Hp(e){let{clip:t,cues:n,timelineFps:r,canvasWidth:i,canvasHeight:a,trackId:o,source:s,styleTemplate:c,label:l}=e,{sourceStart:u,sourceEnd:d,sourceFps:f,speed:p}=Vp(t,r),m=u/f,h=d/f,g=[],_=1/0,v=0;for(let e of n){let t=Math.max(e.startSeconds,m),n=Math.min(e.endSeconds,h);if(n<=t)continue;let i=(t-m)/p,a=(n-m)/p,o=Math.floor(i*r),s=Math.ceil(a*r);s<=o||(g.push({id:e.id,startSeconds:i,endSeconds:a,text:e.text}),o<_&&(_=o),s>v&&(v=s))}if(g.length===0)return null;let y=Math.max(0,Math.min(_,t.durationInFrames-1)),b=Math.min(t.durationInFrames,Math.max(v,y+1)),x=t.from+y,S=Math.max(1,b-y),C=g.map(e=>({id:e.id,startSeconds:e.startSeconds-y/r,endSeconds:e.endSeconds-y/r,text:e.text})),w={fontSize:Math.max(36,Math.round(a*.045)),fontFamily:`Inter`,fontWeight:`semibold`,fontStyle:`normal`,underline:!1,color:`#ffffff`,backgroundColor:`rgba(0, 0, 0, 0.55)`,textAlign:`center`,verticalAlign:`middle`,lineHeight:1.15,letterSpacing:0,textShadow:{offsetX:0,offsetY:3,blur:10,color:`rgba(0, 0, 0, 0.75)`},transform:{x:0,y:Math.round(a*.32),width:i*.82,height:a*.16,rotation:0,opacity:1}};return{id:crypto.randomUUID(),type:`subtitle`,trackId:o,from:x,durationInFrames:S,label:l??(s.type===`embedded-subtitles`?s.trackName??s.language??`Subtitles`:s.type===`subtitle-import`?s.fileName:`Transcript`),mediaId:t.mediaId,linkedGroupId:t.linkedGroupId,sourceLabel:l,source:s,cues:C,...w,...c}}function Up(e,t,n,r){let i=e.filter(e=>e.id!==Bp),a=new Set(i.flatMap(e=>(e.items??[]).filter(e=>(e.type===`video`||e.type===`audio`)&&e.isReversed===!0).map(e=>e.id))),o=i.map(e=>{let t=(e.items??[]).filter(e=>e.type===`text`&&e.captionSource?.clipId?!a.has(e.captionSource.clipId):e.type===`subtitle`&&(e.source.type===`transcript`||e.source.type===`embedded-subtitles`)?!a.has(e.source.clipId):!0);return t.length===(e.items??[]).length?e:{...e,items:t}}),s=o.some(e=>e.solo),c=o.filter(e=>s?e.solo===!0:e.visible!==!1),l=[];for(let e of c)for(let i of e.items??[]){if(i.type!==`video`&&i.type!==`audio`||!i.mediaId||i.isReversed===!0)continue;let e=i.transcriptCaptions;if(!e?.enabled||e.type!==`transcript`||e.cues.length===0)continue;let a=Hp({trackId:Bp,cues:e.cues,clip:i,timelineFps:t,canvasWidth:n,canvasHeight:r,label:`Transcript`,source:{type:`transcript`,mediaId:e.mediaId||i.mediaId,clipId:i.id},styleTemplate:e.style});a&&l.push({...a,id:`virtual-transcript-${i.id}`,trackId:Bp,linkedGroupId:void 0})}if(l.length===0)return o;let u=o.length>0?Math.min(...o.map(e=>e.order??0)):0,d={id:Bp,name:`Transcript Captions`,kind:`video`,height:1,locked:!0,syncLock:!1,visible:!0,muted:!0,solo:s,volume:0,order:u-1,items:l};return[...o,d]}var Wp=class{cache=/* @__PURE__ */ new Map;configuredMaxFrames;maxFrames;device=null;texW=0;texH=0;hint=null;constructor(e){this.configuredMaxFrames=Math.max(1,e),this.maxFrames=this.configuredMaxFrames}setEvictionHint(e){this.hint=e}setDevice(e,t,n){if(this.device===e&&this.texW===t&&this.texH===n)return;this.clear(),this.device=e,this.texW=t,this.texH=n;let r=navigator.deviceMemory,i=r===void 0?5e8:Math.min(r*.125,1)*1e9,a=t*n*4;this.maxFrames=Math.max(1,Math.min(this.configuredMaxFrames,Math.floor(i/a)))}get(e){let t=this.cache.get(e);if(t)return this.cache.delete(e),this.cache.set(e,t),t}put(e,t){if(!this.device||this.texW<2||this.texH<2)return null;if(this.cache.has(e))return this.cache.get(e);if(this.cache.size>=this.maxFrames){let e=this.pickEvictionVictim();e!==void 0&&(this.cache.get(e)?.texture.destroy(),this.cache.delete(e))}try{let n=this.device.createTexture({size:{width:this.texW,height:this.texH},format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});this.device.queue.copyExternalImageToTexture({source:t,flipY:!1},{texture:n},{width:this.texW,height:this.texH});let r={texture:n,view:n.createView()};return this.cache.set(e,r),r}catch{return null}}pickEvictionVictim(){if(!this.hint||this.hint.direction===0)return this.cache.keys().next().value;let{currentFrame:e,direction:t}=this.hint;for(let n of this.cache.keys())if(t>0?n<e:n>e)return n;return this.cache.keys().next().value}has(e){return this.cache.has(e)}get size(){return this.cache.size}deleteMatching(e){for(let[t,n]of this.cache.entries())e(t)&&(n.texture.destroy(),this.cache.delete(t))}clear(){for(let e of this.cache.values())e.texture.destroy();this.cache.clear()}},Gp=class{cache=/* @__PURE__ */ new Map;maxEntriesPerItem;constructor(e=4){this.maxEntriesPerItem=Math.max(1,e)}get(e,t,n=1/0){let r=this.cache.get(e);if(!r||r.length===0)return;if(t===void 0)return r[r.length-1];let i=-1,a=1/0;for(let e=0;e<r.length;e++){let o=r[e],s=Math.abs(o.sourceTime-t);s>n||s>=a||(a=s,i=e)}if(i===-1)return;let[o]=r.splice(i,1);return r.push(o),o}put(e,t,n){let r=this.cache.get(e)??[],i=r.findIndex(e=>Math.abs(e.sourceTime-n)<=2**-52);if(i!==-1){let[e]=r.splice(i,1);e?.frame.close()}for(r.push({frame:t,sourceTime:n});r.length>this.maxEntriesPerItem;)r.shift()?.frame.close();this.cache.set(e,r)}has(e){return this.cache.has(e)}get size(){let e=0;for(let t of this.cache.values())e+=t.length;return e}clear(){for(let e of this.cache.values())for(let t of e)t.frame.close();this.cache.clear()}},Kp=class{cache=/* @__PURE__ */ new Map;maxFrames;maxBytes;currentBytes=0;bytesPerFrame=0;hint=null;constructor(e,t){this.maxFrames=e,this.maxBytes=t}setEvictionHint(e){this.hint=e}setDimensions(e,t){let n=e*t*4;return this.bytesPerFrame!==n&&(this.bytesPerFrame!==0&&this.clear(),this.bytesPerFrame=n,!0)}get(e){let t=this.cache.get(e);if(t)return this.cache.delete(e),this.cache.set(e,t),t}put(e,t){if(this.cache.has(e)){t.close();return}for(;(this.cache.size>=this.maxFrames||this.currentBytes+this.bytesPerFrame>this.maxBytes)&&this.cache.size>0;){let e=this.pickEvictionVictim();if(e===void 0)break;this.cache.get(e).close(),this.cache.delete(e),this.currentBytes-=this.bytesPerFrame}this.cache.set(e,t),this.currentBytes+=this.bytesPerFrame}pickEvictionVictim(){if(!this.hint||this.hint.direction===0)return this.cache.keys().next().value;let{currentFrame:e,direction:t}=this.hint;for(let n of this.cache.keys())if(t>0?n<e:n>e)return n;return this.cache.keys().next().value}has(e){return this.cache.has(e)}get size(){return this.cache.size}get bytes(){return this.currentBytes}get budgetBytes(){return this.maxBytes}deleteMatching(e){for(let[t,n]of this.cache.entries())e(t)&&(n.close(),this.cache.delete(t),this.currentBytes-=this.bytesPerFrame);this.currentBytes=Math.max(0,this.currentBytes)}clear(){for(let e of this.cache.values())e.close();this.cache.clear(),this.currentBytes=0}};function qp(e){return!e||!Number.isFinite(e)?384e6:Math.max(256e6,Math.min(1e9,Math.round(e*.0625*1e9)))}function Jp(){return qp(typeof navigator>`u`?void 0:navigator.deviceMemory)}var Yp=class{tier1;tier2;tier3;_tier1Hits=0;_tier2Hits=0;_tier3Hits=0;_misses=0;ramGeneration=0;disposed=!1;pendingRamFrames=/* @__PURE__ */ new Map;invalidatedPendingRamFrames=/* @__PURE__ */ new Set;blitPipeline=null;blitBindGroupLayout=null;blitSampler=null;blitCanvas=null;blitCtx=null;blitDevice=null;blitFormat=`rgba8unorm`;blitW=0;blitH=0;constructor(e=300,t=900,n=Jp()){this.tier1=new Wp(e),this.tier2=new Gp,this.tier3=new Kp(t,n)}setGpuDevice(e,t,n){let r=this.blitDevice!==e;this.tier1.setDevice(e,t,n),this.tier3.setDimensions(t,n)&&this.invalidateAllPendingRamFrames(),r&&(this.blitDevice=e,this.blitFormat=navigator.gpu.getPreferredCanvasFormat(),this.blitSampler=e.createSampler({magFilter:`linear`,minFilter:`linear`}),this.initBlitPipeline(e),this.blitCanvas=null,this.blitCtx=null),(this.blitW!==t||this.blitH!==n)&&(this.blitW=t,this.blitH=n,this.blitCanvas=null,this.blitCtx=null)}setEvictionHint(e,t){let n={currentFrame:e,direction:t};this.tier1.setEvictionHint(n),this.tier3.setEvictionHint(n)}getGpuFrame(e){let t=this.tier1.get(e);if(!t)return null;let n=this.blitToCanvas(t);return n?(this._tier1Hits++,n):null}putGpuFrame(e,t){this.tier1.put(e,t)}getVideoFrameEntry(e,t,n=1/0){let r=this.tier2.get(e,t,n);if(r)return this._tier2Hits++,r}putVideoFrame(e,t,n){this.tier2.put(e,t,n)}getRamFrame(e){let t=this.tier3.get(e);if(t)return this._tier3Hits++,this.tier1.put(e,t),t}putRamFrame(e,t){this.tier3.put(e,t)}getFrame(e){return this.getGpuFrame(e)||this.getRamFrame(e)||(this._misses++,null)}cacheFrame(e,t,n=!1){if(!this.disposed&&(this.tier1.has(e)||this.tier1.put(e,t),!n&&!this.tier3.has(e)&&!this.pendingRamFrames.has(e)&&this.pendingRamFrames.size<2)){let n=this.ramGeneration;this.pendingRamFrames.set(e,n),createImageBitmap(t).then(t=>{let r=this.pendingRamFrames.get(e);this.pendingRamFrames.delete(e);let i=this.invalidatedPendingRamFrames.delete(e);!this.disposed&&!i&&r===n&&n===this.ramGeneration&&!this.tier3.has(e)?this.tier3.put(e,t):t.close()},()=>{this.pendingRamFrames.delete(e),this.invalidatedPendingRamFrames.delete(e)})}}invalidate(e){if(!e||!qt(e)){this.invalidateAllPendingRamFrames(),this.tier1.clear(),this.tier3.clear();return}let t=e.frames?new Set(e.frames):null,n=e.ranges??[],r=e=>(t?.has(e)??!1)||Yt(e,n);for(let e of this.pendingRamFrames.keys())r(e)&&this.invalidatedPendingRamFrames.add(e);this.tier1.deleteMatching(r),this.tier3.deleteMatching(r)}invalidateVideoFrames(){this.tier2.clear()}getStats(){return{tier1Size:this.tier1.size,tier2Size:this.tier2.size,tier3Size:this.tier3.size,tier1Hits:this._tier1Hits,tier2Hits:this._tier2Hits,tier3Hits:this._tier3Hits,misses:this._misses,tier3Bytes:this.tier3.bytes,tier3BudgetBytes:this.tier3.budgetBytes,pendingRamFrames:this.pendingRamFrames.size}}dispose(){this.disposed=!0,this.invalidateAllPendingRamFrames(),this.tier1.clear(),this.tier2.clear(),this.tier3.clear(),this.blitCanvas=null,this.blitCtx=null,this.blitPipeline=null,this.blitBindGroupLayout=null,this.blitSampler=null,this.blitDevice=null}invalidateAllPendingRamFrames(){this.ramGeneration++,this.invalidatedPendingRamFrames.clear()}initBlitPipeline(e){let t=e.createShaderModule({label:`scrub-cache-blit`,code:`
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};
@vertex fn vertexMain(@builtin(vertex_index) vi: u32) -> VertexOutput {
  var pos = array<vec2f, 6>(
    vec2f(-1, -1), vec2f(1, -1), vec2f(-1, 1),
    vec2f(-1, 1), vec2f(1, -1), vec2f(1, 1)
  );
  var uv = array<vec2f, 6>(
    vec2f(0, 1), vec2f(1, 1), vec2f(0, 0),
    vec2f(0, 0), vec2f(1, 1), vec2f(1, 0)
  );
  var o: VertexOutput;
  o.position = vec4f(pos[vi], 0, 1);
  o.uv = uv[vi];
  return o;
}
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@fragment fn blitFragment(input: VertexOutput) -> @location(0) vec4f {
  return textureSample(inputTex, texSampler, input.uv);
}`});this.blitBindGroupLayout=e.createBindGroupLayout({label:`scrub-cache-blit-layout`,entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.blitPipeline=e.createRenderPipeline({label:`scrub-cache-blit-pipeline`,layout:e.createPipelineLayout({bindGroupLayouts:[this.blitBindGroupLayout]}),vertex:{module:t,entryPoint:`vertexMain`},fragment:{module:t,entryPoint:`blitFragment`,targets:[{format:this.blitFormat}]},primitive:{topology:`triangle-list`}})}blitToCanvas(e){if(!this.blitDevice||!this.blitPipeline||!this.blitBindGroupLayout||!this.blitSampler)return null;if(!this.blitCanvas||this.blitCanvas.width!==this.blitW||this.blitCanvas.height!==this.blitH){this.blitCanvas=new OffscreenCanvas(this.blitW,this.blitH);let e=this.blitCanvas.getContext(`webgpu`);if(!e)return null;e.configure({device:this.blitDevice,format:this.blitFormat,alphaMode:`premultiplied`}),this.blitCtx=e}if(!this.blitCtx)return null;let t=e.blitBindGroup??=this.blitDevice.createBindGroup({layout:this.blitBindGroupLayout,entries:[{binding:0,resource:this.blitSampler},{binding:1,resource:e.view}]}),n=this.blitDevice.createCommandEncoder(),r=n.beginRenderPass({colorAttachments:[{view:this.blitCtx.getCurrentTexture().createView(),loadOp:`clear`,storeOp:`store`}]});return r.setPipeline(this.blitPipeline),r.setBindGroup(0,t),r.draw(6),r.end(),this.blitDevice.queue.submit([n.finish()]),this.blitCanvas}};n(`DecoderPrewarm`);const Xp=1/240;Math.max(3,Math.min(6,Math.floor((navigator.hardwareConcurrency??4)/2)));const Zp=/* @__PURE__ */ new Map,Qp=/* @__PURE__ */ new Map,$p=/* @__PURE__ */ new Map,em=/* @__PURE__ */ new Set,tm={requests:0,cacheHits:0,inflightReuses:0,workerPosts:0,workerSuccesses:0,workerFailures:0,queuedRequests:0,supersededRequests:0,waitRequests:0,waitMatches:0,waitResolved:0,waitTimeouts:0,cacheSources:0,cacheBitmaps:0,cacheSourceEvictions:0,poolSize:0,activeWorkerReady:!1,activeRequests:0,activeCacheHits:0,activeWorkerPosts:0,activeCancellations:0,activeSupersededRequests:0,activeLookaheadPosts:0,activeExtractorCount:0,activeExtractorPeak:0,activeReadyNotifications:0,activeWorkerRestarts:0,activeLastInitMs:0,activeLastDecodeMs:0,fallbackRequests:0,fallbackCacheHits:0,fallbackBitmaps:0,fallbackSourceEvictions:0,fallbackReadyNotifications:0,exactFallbackReplacements:0},nm=/* @__PURE__ */ new Map,rm=/* @__PURE__ */ new Map;function im(e,t,n){let r=Zp.get(e);if(!r||r.length===0)return null;Zp.delete(e),Zp.set(e,r);let i=null,a=1/0;for(let e of r){let r=Math.abs(e.timestamp-t);r<=n&&r<a&&(a=r,i=e)}return i}function am(e,t,n){let r=nm.get(e);if(!r||r.length===0)return null;let i=null,a=1/0;for(let e of r){let r=Math.abs(e.timestamp-t);r<=n&&r<a&&(a=r,i=e)}return i}function om(e,t,n=Xp){let r=$p.get(e);if(!r||r.length===0)return null;$p.delete(e),$p.set(e,r);let i=null,a=1/0;for(let e of r){let r=Math.abs(e.timestamp-t);r<=n&&r<a&&(i=e,a=r)}return i&&(tm.fallbackCacheHits+=1),i?.bitmap??null}const sm=/* @__PURE__ */ new Map,cm=/* @__PURE__ */ new Set;s.onRevoke(e=>{let t=sm.delete(e),n=Zp.has(e)||$p.has(e);em.delete(e),cm.delete(e),(t||n)&&gm(e)});function lm(e){return!1}function um(e){return!1}function dm(e){if(!um(e)||rm.size===0)return!0;for(let[e,t]of rm)for(let n of t)if(!mm(e,n,Xp)&&!om(e,n,Xp))return!1;return!0}function fm(e,t,n=Xp){return!1}function pm(e,t,n=Xp){return!1}function mm(e,t,n=.5){return im(e,t,n)?.bitmap??null}async function hm(e,t,n=.5,r=12){tm.waitRequests+=1;let i=am(e,t,n);if(!i)return null;tm.waitMatches+=1;let a=null;return r<=0?(a=await i.promise,a&&(tm.waitResolved+=1)):a=await new Promise(e=>{let t=setTimeout(()=>{tm.waitTimeouts+=1,e(null)},r);i.promise.then(n=>{clearTimeout(t),n&&(tm.waitResolved+=1),e(n)}).catch(()=>{clearTimeout(t),e(null)})}),mm(e,t,n)}function gm(e){if(e){let t=Zp.get(e);if(t)for(let e of t)e.bitmap.close();Zp.delete(e),Qp.delete(e);let n=$p.get(e);for(let e of n??[])e.bitmap.close();$p.delete(e),sm.delete(e),em.delete(e),cm.delete(e)}else{for(let e of Zp.values())for(let t of e)t.bitmap.close();Zp.clear(),Qp.clear();for(let e of $p.values())for(let t of e)t.bitmap.close();$p.clear(),sm.clear(),em.clear(),cm.clear()}}function _m(e){return(e.type===`video`||e.type===`audio`)&&e.isReversed===!0&&e.reverseConformStatus===`ready`&&typeof e.reverseConformSrc==`string`&&e.reverseConformSrc.length>0}function vm(e){return e.type===`video`&&e.isReversed===!0&&e.reverseConformStatus===`ready`&&typeof e.reverseConformPreviewSrc==`string`&&e.reverseConformPreviewSrc.length>0}function ym(e,t,n={}){let r=n.mode!==`export`&&vm(e)&&(n.useProxy===!0||e.reverseConformPreviewUsesProxy!==!0||!_m(e)),i=r?e.reverseConformPreviewSrc:_m(e)?e.reverseConformSrc:null;if(!i)return e;if(e.reverseConformPreviewIsSourceLevel===!0&&r){let n=Math.max(.001,e.sourceFps??t),r=Math.max(.001,e.reverseConformPreviewFps??n),a=Math.max(1,e.reverseConformPreviewSourceDuration??e.sourceDuration??e.durationInFrames),o=e.sourceStart??e.trimStart??e.offset??0,s=e.durationInFrames*(e.speed??1)*n/t,c=(a-Math.min(a,e.sourceEnd??o+s))*r/n,l=(a-o)*r/n;return{...e,src:i,audioSrc:i,isReversed:void 0,sourceStart:c,trimStart:c,offset:c,sourceEnd:l,sourceDuration:a*r/n,sourceFps:r}}let a=e.reverseConformLocalStart??0,o=a+e.durationInFrames;return{...e,src:i,audioSrc:i,isReversed:void 0,speed:1,sourceStart:a,trimStart:a,offset:a,sourceEnd:o,sourceDuration:o,sourceFps:t}}function bm({tracks:e,fps:t,renderText:n,isComparisonMode:r,renderMode:i,useProxy:a}){let o=n===!1?e?.map(e=>({...e,items:(e.items??[]).filter(e=>e.type!==`text`)})):e,s=r?`preview`:i;return o?.map(e=>({...e,items:(e.items??[]).map(e=>e.type===`video`?ym(e,t,{mode:s,useProxy:a}):e)}))??[]}function xm(e){let t=[];for(let n of e)for(let e of n.items??[])e.type===`video`&&t.push(e);return t}function Sm(e){let t={lottieItems:[],imageItems:[],gifItems:[],webpItems:[]};for(let n of e)for(let e of n.items??[])Cm(e,t);return t}function Cm(e,t){if(e.type===`lottie`){(e.src||e.mediaId)&&t.lottieItems.push(e);return}if(e.type!==`image`||!e.src&&!e.mediaId)return;let n=e;t.imageItems.push(n),Cp(n)&&(wp(n)?t.gifItems.push(n):t.webpItems.push(n))}function wm(e,t){let n=/* @__PURE__ */ new Map;for(let r of e){let e=r.transition.trackId,i=e?t.get(e)??0:0;n.set(r.transition.id,i)}return n}var Tm=class{maxBytes;itemWindows=/* @__PURE__ */ new Map;constructor(e=100663296){this.maxBytes=e}async getFrame(e){let t=this.itemWindows.get(e.item.id),n=this.getSourceFrameKey(e);if(t&&e.frame>=t.startFrame&&e.frame<t.endFrame&&t.frames.has(n))return t.frames.get(n)?.frame??null;let r=await this.buildWindow(e);return this.replaceWindow(e.item.id,r),r.frames.get(n)?.frame??null}dispose(){for(let e of this.itemWindows.values())this.closeWindow(e);this.itemWindows.clear()}async buildWindow(e){let t=e.extractor.getDimensions(),n=Math.max(1,t.width*t.height*4),r=Math.floor(this.maxBytes/n),i=Math.max(2,Math.min(4,r||2)),a=e.frame,o=Math.min(e.renderSpan.from+e.renderSpan.durationInFrames,a+i),s=/* @__PURE__ */ new Map;for(let t=a;t<o;t+=1){let n=this.getSourceTime(e,t);s.set(this.sourceFrameKey(n,e.sourceFps),n)}let c=[...s.entries()].sort((e,t)=>e[1]-t[1]),l=/* @__PURE__ */ new Map;for(let[t,n]of c){let r=await e.extractor.captureFrame(n);r.success&&r.frame&&l.set(t,{frame:r.frame})}return{startFrame:a,endFrame:o,frames:l}}replaceWindow(e,t){let n=this.itemWindows.get(e);n&&this.closeWindow(n),this.itemWindows.set(e,t)}closeWindow(e){for(let t of e.frames.values())try{t.frame.close()}catch{}e.frames.clear()}getSourceFrameKey(e){return this.sourceFrameKey(this.getSourceTime(e,e.frame),e.sourceFps)}getSourceTime(e,t){let n=t-e.renderSpan.from,r=Qn(e.item,e.renderSpan),i=e.item.durationInFrames*e.speed*e.sourceFps/e.fps,a=e.item.sourceEnd??r+i,o=Jn(r,e.sourceFps,n,e.speed,e.fps,0,!0,a),s=e.extractor.getDuration();return s>0?Math.max(0,Math.min(o,s-1e-4)):Math.max(0,o)}sourceFrameKey(e,t){return Math.round(e*t)}};const Em={preview:Ia,export:void 0};function Dm(e){let t=e===`preview`;return{reverseVideoFrameCache:e===`export`?new Tm:void 0,textRasterCache:t?/* @__PURE__ */ new Map:void 0,cornerPinWarpCache:t?/* @__PURE__ */ new Map:void 0}}function Z(){return n(`ClientRenderEngine`)}function Om(e){let t=Up(e.tracks.map(t=>({...t,items:e.items.filter(e=>e.trackId===t.id)})),e.fps,e.width,e.height),{visibleTrackIds:n}=fn(t);return t.sort((e,t)=>(t.order??0)-(e.order??0)).map(e=>({order:e.order??0,visible:n.has(e.id),items:(e.items??[]).filter(e=>e.type!==`audio`&&e.type!==`adjustment`)}))}function km(e,t,n){let r=t-e.from,i=e.sourceStart??e.trimStart??0,a=e.sourceFps??n,o=e.speed??1,s=e.durationInFrames*o*a/n,c=e.sourceEnd??i+s;return Jn(i,a,r,o,n,0,e.isReversed===!0,c)}function Am(e){let t=[...new Set(e.candidates.filter(e=>!!e))];if(e.sourceTime!==void 0){for(let n of t)if(e.getCachedPredecodedBitmap?.(n,e.sourceTime,e.toleranceSeconds)||e.getCachedActivePreviewFallbackBitmap?.(n,e.sourceTime,e.toleranceSeconds))return n}if(e.sourceTime!==void 0){let n=t.find(t=>e.isActivePreviewSourceTarget?.(t,e.sourceTime,e.toleranceSeconds));if(n)return n}return t[0]??null}function jm({itemSource:e,proxySource:t,registeredSource:n,cachedSource:r,useProxyMedia:i}){return i?[t,e,n,r]:[r,n,e].map(e=>e===t?null:e)}function Mm(e){let t=e===`preview`;return{itemRenderMode:t?`preview`:`export`,usesSharedPreviewPool:t,usesStrictPreviewDecode:t,allowsPredecodedVideoFrames:e===`comparison`}}function Nm(e,t){if(e!==`comparison`)return t===`skip`?900:void 0}function Pm(e,t,n,r){return e===`comparison`?t.filter(e=>n.has(r(e))):[...t]}function Fm({useProxyMedia:e,proxyUrl:t,sourceUrl:n}){return(e?t:null)??n}function Im(e){return e.find(e=>!!e)??null}function Lm(e,t,n){return Im([t,n&&e.mediaId?A(e.mediaId):null,e.src,e.mediaId?s.get(e.mediaId):null])}function Rm(e,t){return Im([e.mediaId?s.get(e.mediaId):null,t,e.src])}function Q(e){if(e?.aborted)throw e.reason??new DOMException(`Renderer preload aborted`,`AbortError`)}function zm(e){let{video:t,itemId:n,signal:r,context:i}=e;return Q(r),new Promise((e,a)=>{let o=!1,s=()=>{clearTimeout(f),t.removeEventListener(`loadeddata`,l),t.removeEventListener(`error`,u),r?.removeEventListener(`abort`,d)},c=()=>{o||(o=!0,s(),e())},l=()=>c(),u=()=>{Z().warn(`Fallback video preload failed (non-fatal)`,{context:i,itemId:n,mediaErrorCode:t.error?.code,mediaErrorMessage:t.error?.message}),c()},d=()=>{if(!o){o=!0,s();try{t.pause()}catch{}a(r?.reason??new DOMException(`Video preload aborted`,`AbortError`))}},f=setTimeout(()=>{Z().warn(`Fallback video load timeout`,{context:i,itemId:n}),c()},1e4);t.addEventListener(`loadeddata`,l,{once:!0}),t.addEventListener(`error`,u,{once:!0}),r?.addEventListener(`abort`,d,{once:!0}),t.readyState>=2?c():t.load()})}async function Bm(e,t,n){if(Q(n),t&&e.type===`video`&&e.mediaId){let t=A(e.mediaId);if(t)return t}if(e.src)return e.src;if(!e.mediaId)return null;let r=s.get(e.mediaId);if(r)return r;let i=await te(e.mediaId);return Q(n),i||null}function Vm(e,t,n){let r=[...new Set(t)],i=new Set(r),a=[...new Set(n)].filter(e=>i.has(e)),o=new Set(a),s=r.filter(e=>!o.has(e));return{priorityItemIds:a,eagerItemIds:e===`export`?s:[],deferredItemIds:e===`export`?[]:s}}function Hm(e,t,n){return n&&!n.has(e.trackId)?!1:t>=e.from&&t<e.from+e.durationInFrames}function Um(e){switch(e.type){case`video`:case`image`:case`lottie`:return e.type;default:return null}}function Wm(e){return e.tracks.length===0?null:new Set(e.tracks.filter(e=>e.visible).map(e=>e.id))}function Gm({tracks:e,frame:t,fps:n,compositionById:r}){let i={video:/* @__PURE__ */ new Set,image:/* @__PURE__ */ new Set,lottie:/* @__PURE__ */ new Set},a=(e,t,n,o,s)=>{for(let c of e){if(!Hm(c,t,o))continue;let e=Um(c);if(e){i[e].add(c.id);continue}if(c.type!==`composition`||s.has(c.compositionId))continue;let l=r[c.compositionId];if(!l)continue;let u=$n(c,t,n,l.fps);if(u<0||u>=l.durationInFrames)continue;let d=new Set(s);d.add(c.compositionId);let f=Wm(l);a(l.items,u,l.fps,f,d)}};for(let r of e)r.visible&&a(r.items??[],t,n,null,/* @__PURE__ */ new Set);return{video:[...i.video],image:[...i.image],lottie:[...i.lottie]}}function Km({tracks:e,frames:t,fps:n,compositionById:r}){let i={video:/* @__PURE__ */ new Set,image:/* @__PURE__ */ new Set,lottie:/* @__PURE__ */ new Set};for(let a of t){let t=Gm({tracks:e,frame:a,fps:n,compositionById:r});for(let e of t.video)i.video.add(e);for(let e of t.image)i.image.add(e);for(let e of t.lottie)i.lottie.add(e)}return{video:[...i.video],image:[...i.image],lottie:[...i.lottie]}}function qm({previousFrame:e,frame:t,fps:n}){if(e===null)return`full`;let r=t-e;return r>0&&r<=3?`gpu-only`:Math.abs(r)>Math.max(12,Math.round(Math.max(1,n)))?`skip`:`full`}function Jm(e){return JSON.stringify({a:e.animationId??null,m:e.themeId??null,t:e.textOverrides??null,c:e.colorOverrides??null,s:e.slotOverrides??null})}async function Ym(e,t,n,r={}){let{fps:i,transitions:a=[],backgroundColor:o=`#000000`,keyframes:l=[]}=e,f=r.mode??`export`,p=Mm(f),m=p.itemRenderMode,g=f===`comparison`,_=r.useProxyMedia===!0,v=bm({tracks:e.tracks,fps:i,renderText:r.renderText,isComparisonMode:g,renderMode:m,useProxy:r.useProxyMedia}),b=r.getPreviewTransformOverride,x=r.getPreviewEffectsOverride,S=r.getPreviewCornerPinOverride,C=r.getPreviewPathVerticesOverride,w=r.getLiveItemSnapshot,T=r.getLiveKeyframes,E=r.domVideoElementProvider,D=typeof document<`u`,O=p.usesStrictPreviewDecode,k=D&&!O,j={width:t.width,height:t.height,logicalWidth:e.width,logicalHeight:e.height,fps:i,getPreviewTransform:m===`preview`?b:void 0},ee=un(),M=0,N=pn({tracks:v,transitions:a}),{trackRenderState:P}=N,{visibleTrackIds:F,visibleTracksByOrderDesc:ne,visibleTracksByOrderAsc:re,trackOrderMap:ie}=P,ae=new kp(t.width,t.height,10,24,Em[m]),oe=new Ap,I=m===`preview`?new Yp:null,se=null,ce,le=!!E,ue=e=>{if(!I||!It.scrubbingFrameCacheActive||It.activePreviewFallbackUsed)return;let n=qm({previousFrame:se,frame:e,fps:i});se=e,n!==`skip`&&(L.effects&&I.setGpuDevice(L.effects.getDevice(),t.width,t.height),I.cacheFrame(e,t,n===`gpu-only`))},L=new wa,de=Er(l),fe=e=>T?.(e)??de.get(e),pe=e=>{let t=w?.(e.id),n=t&&t.type===e.type?t:e;if(n.type!==`video`)return n;let a=ym(n,i,{mode:m,useProxy:r.useProxyMedia});return nt(a),a},me=new Map(v.flatMap(e=>e.items.map(e=>[e.id,e])));j.getExpressionItem=e=>w?.(e)??me.get(e),j.getExpressionKeyframes=fe;let he=-1,ge=N,_e=()=>!w||he===M?ge:(ge=mn({renderPlan:N,transitions:a,getCurrentItem:pe}),he=M,ge),ve=w?e=>{let t=w(e);return t&&t.type===`shape`?t:void 0}:void 0,ye=p.usesSharedPreviewPool?Lp():null,be=ye?.pool??new zp({maxLanesPerSource:4,logFrameFailuresAsDebug:!1}),R=/* @__PURE__ */ new Map,xe=/* @__PURE__ */ new Map,Se=/* @__PURE__ */ new Map,Ce=/* @__PURE__ */ new Map,we=/* @__PURE__ */ new Map,Te=k?new bt:null,Ee=/* @__PURE__ */ new Set,De=/* @__PURE__ */ new Map,z=0,Oe=(e,t)=>{if(!t)return;let n=xe.get(e);if(n&&n!==t){let t=Se.get(n);t?.delete(e),t&&t.size===0&&Se.delete(n),be.releaseItem(e,n)}xe.set(e,t);let r=Se.get(t);r||(r=/* @__PURE__ */ new Set,Se.set(t,r)),r.add(e),R.set(e,be.getOrCreateItemExtractor(e,t))},ke=(e,t)=>{if(!Te)return;let n=De.get(e);n||(n=`export-fallback-${++z}-${e}`,De.set(e,n));let r=Te.acquireForClip(n,t);r&&(r.crossOrigin=`anonymous`,r.muted=!0,r.preload=`auto`,Ee.has(t)||(Ee.add(t),Te.preloadSource(t).catch(()=>{})),we.set(e,r))},Ae=e=>{Ce.set(e.id,e),e.src&&(Z().debug(`Registering shared video extractor`,{itemId:e.id,src:e.src.substring(0,80)}),Oe(e.id,e.src),k&&!g&&ke(e.id,e.src))};for(let e of xm(v))Ae(e);let B=!1,je=/* @__PURE__ */ new Map,Me=/* @__PURE__ */ new Map,Ne=/* @__PURE__ */ new Map,Pe=/* @__PURE__ */ new Map,Fe=new d,Ie=e=>{let t=w?.(e.id);return t&&t.type===`lottie`?t:e},Le=/* @__PURE__ */ new Map,Re=async(e,t)=>{if(Fe.get(e.id))return;let n=Ie(e),r=await Bm(n,!1,t);if(!r||!u(r))return;let i=Jm(n),a=`${n.id}\u0000${r}\u0000${i}`,o=Le.get(a);if(o)return o;let s=(async()=>{Q(t);let e=n.sourceWidth&&n.sourceWidth>0?n.sourceWidth:512,a=n.sourceHeight&&n.sourceHeight>0?n.sourceHeight:512,o=await gt(r,n);Q(t),!B&&(await Fe.preload(n.id,r,e,a,o.data??void 0,i,o.themeData??void 0,o.slots??void 0),Q(t))})().finally(()=>{Le.delete(a)});return Le.set(a,s),s},ze=async(e,t,n)=>{if(!D||!Cp(e)||Pe.has(e.id))return;let r=`${e.id}\u0000${t}`,i=Ne.get(r);if(i)return i;let a=(async()=>{Q(n);let r=e.mediaId??e.id,i=wp(e)?await c.getGifFrames(r,t):await c.getWebpFrames(r,t);Q(n),B||Pe.set(e.id,i)})().catch(t=>{n?.aborted||Z().error(`Failed to load animated image frames`,{itemId:e.id,error:t})}).finally(()=>{Ne.delete(r)});return Ne.set(r,a),a},Be=async(e,t)=>{let n=await Bm(e,!1,t);if(!n)return;let r=e.src===n?e:{...e,src:n},i=`${r.id}\u0000${n}`,a=Me.get(i);!je.has(r.id)&&!a&&(a=(async()=>{if(Q(t),D&&typeof Image<`u`)await new Promise((e,i)=>{let a=new Image;a.crossOrigin=`anonymous`;let o=()=>t?.removeEventListener(`abort`,s),s=()=>{o(),a.src=``,i(t?.reason??new DOMException(`Image load aborted`,`AbortError`))};a.onload=()=>{o(),B||je.set(r.id,{source:a,width:a.naturalWidth,height:a.naturalHeight}),e()},a.onerror=()=>{o(),i(/* @__PURE__ */ Error(`Failed to load image: ${n}`))},t?.addEventListener(`abort`,s,{once:!0}),a.src=n});else{if(typeof createImageBitmap!=`function`)throw Error(`WORKER_REQUIRES_MAIN_THREAD:imagebitmap`);let e=await fetch(n,{signal:t});if(!e.ok)throw Error(`Failed to load image: ${n}`);let i=await createImageBitmap(await e.blob());Q(t),B?i.close():je.set(r.id,{source:i,width:i.width,height:i.height})}})().catch(e=>{if(t?.aborted||Z().error(`Failed to load image`,{itemId:r.id,error:e}),t?.aborted)throw e}).finally(()=>{Me.delete(i)}),Me.set(i,a)),await Promise.all([a,ze(r,n,t)])},Ve=()=>Ue.some(e=>Fe.getSignature(e.id)!==Jm(Ie(e))),He=async()=>{await Promise.all(Ue.map(async e=>{let t=Ie(e);if(!u(t.src))return;let n=Jm(t);if(Fe.getSignature(e.id)===n)return;let r=t.sourceWidth&&t.sourceWidth>0?t.sourceWidth:512,i=t.sourceHeight&&t.sourceHeight>0?t.sourceHeight:512,a=await gt(t.src,t);await Fe.rebuild(e.id,t.src,r,i,a.data??void 0,n,a.themeData??void 0,a.slots??void 0)}))},{lottieItems:Ue,imageItems:We,gifItems:Ge,webpItems:Ke}=Sm(v),qe=g?[]:We.map(e=>Be(e)),Je=N.visibleAdjustmentLayers,Ye=wm(N.transitionWindows,ie),Xe=j,Ze=qa(v,Xe),V=/* @__PURE__ */ new Set,Qe=/* @__PURE__ */ new Map,$e=/* @__PURE__ */ new Map,et=/* @__PURE__ */ new Set,tt=/* @__PURE__ */ new Map;function nt(e){e.src&&(xe.get(e.id)!==e.src&&(V.delete(e.id),et.delete(e.id),Qe.delete(e.id),$e.delete(e.id),tt.delete(e.id),Oe(e.id,e.src),D&&!O&&ke(e.id,e.src)),Ce.set(e.id,e))}let rt=/* @__PURE__ */ new Map,it=e=>{let t=Om(e),n=/* @__PURE__ */ new Map;for(let t of e.keyframes??[])n.set(t.itemId,t);let r=[];for(let t of fn(e.tracks).visibleTracks){let n=t.order??0;for(let i of e.items)i.trackId===t.id&&i.type===`adjustment`&&r.push({layer:i,trackOrder:n})}return{fps:e.fps,durationInFrames:e.durationInFrames,compositionControls:e.compositionControls,sortedTracks:t,keyframesMap:n,itemsById:new Map(e.items.map(e=>[e.id,e])),adjustmentLayers:r}},at=null,ot=null,st=!1,{reverseVideoFrameCache:ct,textRasterCache:lt,cornerPinWarpCache:ut}=Dm(m),H={fps:i,canvasSettings:j,canvasPool:ae,textMeasureCache:oe,renderMode:m,renderItem:xc,scrubbingCache:I,getCurrentItemSnapshot:pe,getLiveItemSnapshotById:w,getCurrentKeyframes:fe,getPreviewTransformOverride:b,getPreviewCornerPinOverride:S,videoExtractors:R,videoElements:we,useMediabunny:V,mediabunnyDisabledItems:et,mediabunnyFailureCountByItem:Qe,allowPredecodedVideoFrames:p.allowsPredecodedVideoFrames,workerPredecodeWaitMs:void 0,getResolvedVideoSource:(e,t,n)=>{let r=xe.get(e.id);return m===`preview`?Am({candidates:jm({itemSource:e.src,proxySource:e.mediaId?A(e.mediaId):null,registeredSource:r,cachedSource:e.mediaId?s.get(e.mediaId):null,useProxyMedia:_}),sourceTime:t,toleranceSeconds:n,getCachedPredecodedBitmap:H.getCachedPredecodedBitmap,getCachedActivePreviewFallbackBitmap:_?H.getCachedActivePreviewFallbackBitmap:void 0,isActivePreviewSourceTarget:H.isActivePreviewSourceTarget}):g?Lm(e,r,_):Rm(e,r)},reverseVideoFrameCache:ct,imageElements:je,gifFramesMap:Pe,ensureImageItemReady:e=>Be(e),lottieProvider:Fe,ensureLottieItemReady:e=>Re(e),keyframesMap:de,adjustmentLayers:Je,getPreviewEffectsOverride:x,getPreviewPathVerticesOverride:C,subCompRenderData:rt,instanceSubCompRenderDataCache:/* @__PURE__ */ new Map,gpuPipeline:null,gpuTransitionPipeline:null,gpuMediaPipeline:null,gpuMediaBlendPipeline:null,gpuShapePipeline:null,gpuTextPipeline:null,gpuMaskCombinePipeline:null,gpuTextTextureCache:L.textTextureCache,gpuBitmapMaskTextureCache:L.bitmapMaskTextureCache,textRasterCache:lt,cornerPinWarpCache:ut,gpuScratchTexturePool:{acquire:(e,t,n)=>L.texturePool?.acquire(e,t,n)??L.ensureTexturePool().acquire(e,t,n),release:e=>{L.texturePool?.release(e)}},domVideoElementProvider:E};H.markActivePreviewFramePending=()=>{It.activePreviewFramePending=!0},H.markActivePreviewFallbackUsed=()=>{It.activePreviewFallbackUsed=!0};let dt=/* @__PURE__ */ new Map,ft=e=>{let t=y(v,e);for(let n of t){let t=e[n];t&&dt.get(n)!==t&&(rt.set(n,it(t)),dt.set(n,t))}};ft(h.getState().compositionById);let pt=()=>{if(st)return ot;if(st=!0,typeof OffscreenCanvas<`u`)return at=new OffscreenCanvas(1,1),ot=at.getContext(`2d`),ot;if(typeof document<`u`){let e=document.createElement(`canvas`);return e.width=1,e.height=1,at=e,ot=e.getContext(`2d`),ot}return null},mt=e=>Dn({tracksByOrderAsc:re,visibleTrackIds:F,minFrame:e-1,maxFrame:e+1,maxItems:6}).map(e=>pe(e)),ht=async(e,t)=>{let n=/* @__PURE__ */ new Map;if(e.length===0)return n;Q(t);let r=/* @__PURE__ */ new Map;for(let t of e){let e=xe.get(t);if(!e){n.set(t,!1);continue}let i=r.get(e);i||(i=[],r.set(e,i)),i.push(t)}return await Promise.all([...r.entries()].map(async([e,r])=>{Q(t);let i=await be.initSource(e);if(Q(t),B)return;let a=Se.get(e)??new Set(r);for(let e of a)i?V.add(e):V.delete(e);for(let e of r)n.set(e,i)})),n},_t=(e,t)=>{let n=e-t,r=e+t,i=[];for(let e of v)if(F.has(e.id))for(let t of e.items??[]){if(t.type!==`video`)continue;let e=t.from;if(t.from+t.durationInFrames<n||e>r)continue;let a=pe(t);R.has(a.id)&&i.push(a.id)}return i},vt=async(e,t,n)=>{if(R.has(e))return!0;if(!t)return!1;let r=await Bm(t,_,n);return B||!r?!1:(Oe(e,r),Ce.set(e,t),D&&!O&&ke(e,r),!0)},yt=async(e,t,n)=>{if(V.has(e))return!0;if(et.has(e)||!await vt(e,t,n))return!1;let r=tt.get(e);if(r)return r;let i=ht([e],n).then(t=>{if(B)return!1;if(t.get(e)===!0)return $e.delete(e),!0;let n=($e.get(e)??0)+1;return $e.set(e,n),n>=4&&et.add(e),!1}).finally(()=>{tt.delete(e)});return tt.set(e,i),i};H.ensureVideoItemReady=yt,(m===`preview`||g)&&await(async()=>{try{let{getCachedPredecodedBitmap:e,getCachedActivePreviewFallbackBitmap:t,isActivePreviewFrameCurrent:n,isActivePreviewFrameDecodeReady:r,isActivePreviewSourceTarget:i,isActivePreviewFrameSuperseded:a,isActivePreviewTargetSuperseded:o,waitForInflightPredecodedBitmap:s}=await import(`./preview-contract-CaC-cSAs.js`);H.getCachedPredecodedBitmap=e,H.waitForInflightPredecodedBitmap=s,m===`preview`&&(H.getCachedActivePreviewFallbackBitmap=t,H.isActivePreviewFrameCurrent=n,H.isActivePreviewFrameDecodeReady=r,H.isActivePreviewSourceTarget=i,H.isActivePreviewFrameSuperseded=a,H.isActivePreviewTargetSuperseded=o)}catch{}})();let xt=e=>{if(O){let t=[...e].filter(e=>!V.has(e));if(t.length===0)return;Z().debug(`Preview Mediabunny coverage incomplete; fallback paths remain available`,{failedCount:t.length,failedItemIds:t})}},St=e=>{for(let t of ne)if(F.has(t.id))for(let n of t.items??[]){let t=pe(n);if(!(e<t.from||e>=t.from+t.durationInFrames)&&(xp(t,m===`preview`?x:void 0)||t.type===`composition`&&Sp(t.compositionId,rt,{getCurrentItem:pe,getPreviewEffectsOverride:m===`preview`?x:void 0})))return!0}return!1},Ct=async(e,t)=>{if(!D&&e.some(e=>!V.has(e)))throw Error(`WORKER_REQUIRES_MAIN_THREAD:video-fallback`);if(D&&!O&&e.length>0){let n=new Set(e),r=/* @__PURE__ */ new Map;for(let[e,t]of we.entries())n.has(e)&&(r.has(t)||r.set(t,e));let i=Array.from(r.entries()).map(([e,n])=>zm({video:e,itemId:n,signal:t,context:`root`}));await Promise.all(i)}},wt=async()=>{!g&&D&&Ue.length>0&&(Z().debug(`Preloading Lottie animations`,{lottieCount:Ue.length}),await Promise.all(Ue.map(async e=>{try{let t=e.sourceWidth&&e.sourceWidth>0?e.sourceWidth:512,n=e.sourceHeight&&e.sourceHeight>0?e.sourceHeight:512,r=await gt(e.src,e);if(B||(await Fe.preload(e.id,e.src,t,n,r.data??void 0,Jm(e),r.themeData??void 0,r.slots??void 0),B))return}catch(t){Z().error(`Failed to preload Lottie`,{itemId:e.id,error:t})}})),Z().debug(`All Lottie animations loaded`))},Tt=async()=>{if(D&&Ke.some(e=>!Pe.has(e.id))){Z().debug(`Preloading animated WebP frames`,{webpCount:Ke.length});let e=Ke.map(async e=>{try{let t=e.mediaId??e.id,n=await c.getWebpFrames(t,e.src);Pe.set(e.id,n),Z().debug(`Animated WebP frames loaded`,{itemId:e.id.substring(0,8),frameCount:n.frames.length,totalDuration:n.totalDuration})}catch(t){Z().error(`Failed to load WebP frames`,{itemId:e.id,error:t})}});await Promise.all(e)}},Et=(e,t,n)=>{if(e.type===`video`||e.type===`image`||e.type===`lottie`){if(e.mediaId){let r=Fm({useProxyMedia:_,proxyUrl:_?A(e.mediaId):null,sourceUrl:s.get(e.mediaId)});r?t.push({subItem:e,src:r}):n.push({subItem:e,mediaId:e.mediaId})}else{let n=e.src??``;n&&t.push({subItem:e,src:n})}}},Dt=(e,t,n,r,i)=>{let a=y(v,e);for(let r of a){Q(i);let a=e[r];if(!a){Z().warn(`Sub-composition not found in store!`,{compositionId:r,storeCompositionCount:h.getState().compositions.length,storeCompositionIds:h.getState().compositions.map(e=>e.id.substring(0,8))});continue}dt.get(r)!==a&&(rt.set(r,it(a)),dt.set(r,a));for(let e of a.items)Et(e,t,n)}if(g){let e=Pm(f,t,r,({subItem:e})=>e.id);t.splice(0,t.length,...e)}},Ot=e=>{let t=[];for(let{subItem:n,src:r}of e)n.type===`video`&&!R.has(n.id)&&(Oe(n.id,r),t.push(n.id),D&&!O&&ke(n.id,r));return t},kt=async(e,t)=>{if(D&&!O){let n=e.filter(({subItem:e})=>e.type===`video`&&!V.has(e.id)).map(({subItem:e})=>e.id);if(n.length>0){let e=/* @__PURE__ */ new Map;for(let t of n){let n=we.get(t);n&&!e.has(n)&&e.set(n,t)}let r=Array.from(e.entries()).map(([e,n])=>zm({video:e,itemId:n,signal:t,context:`nested`}));await Promise.all(r)}}},At=e=>V.has(e)&&!et.has(e),jt=(e,t,n)=>{let r=km(e,t,i);return Math.max(0,Math.min(r,n.getDuration()-.01))},Mt=e=>{let t=(Qe.get(e)??0)+1;return Qe.set(e,t),t>=3&&(et.add(e),V.delete(e)),t},Nt=e=>{let t=!1;return()=>{if(!t){t=!0;try{e?.()}catch(e){Z().warn(`onPriorityMediaReady callback threw`,{error:e})}}}},Pt=async(e,t)=>{Q(t);let n=await Promise.all(e.map(async({subItem:e,mediaId:t})=>({subItem:e,src:await te(t)})));return Q(t),n.filter(({src:e})=>!!e)},Ft=async(e,t)=>{let n=e.flatMap(({subItem:e,src:t})=>e.type===`image`?[{...e,src:t}]:[]),r=e.flatMap(({subItem:e,src:t})=>e.type===`lottie`?[{...e,src:t}]:[]);return await Promise.all(n.map(e=>Be(e,t))),D&&r.length>0&&await Promise.all(r.map(e=>Re(e,t))),{subImageItems:n,subLottieItems:r}},It={gpu:L,canvasPool:ae,canvasSettings:j,maskSettings:Xe,itemRenderContext:H,adjustmentLayers:Je,lottieItems:Ue,transitionTrackOrderById:Ye,videoExtractors:R,sortedTracks:ne,tracksTopToBottom:re,visibleTrackIds:F,setupGpuCompositor:async e=>{e&&!H.gpuPipeline&&(H.gpuPipeline=await L.ensureEffects(),H.gpuPipeline||Z().warn(`GPU pipeline init failed - blend modes will use Canvas2D fallback`));let t=!!(e&&H.gpuPipeline&&L.effects&&L.ensureCompositor());return{useGpuCompositor:t,gpuCompositeOutput:t?L.ensureCompositeOutput(j.width,j.height):null}},scrubbingCache:I,ctx:n,canvas:t,renderMode:m,scrubbingFrameCacheActive:_p(!!I,le),lastRenderAborted:!1,activePreviewFramePending:!1,activePreviewFallbackUsed:!1,cacheRenderedFrame:ue,detectFrameGpuEffects:St,discardFrameResults:(e,t)=>{for(let t of e)if(t){for(let e of t.poolCanvases)ae.release(e);t.gpuTexture&&L.texturePool?.release(t.gpuTexture)}ae.release(t)},ensureFrameGpuPipelines:async(e,t)=>{(e||t)&&(H.gpuPipeline||=await L.ensureEffects(),H.gpuPipeline&&(e&&(H.gpuMediaPipeline||L.ensureMedia(),H.gpuMediaPipeline=L.media),t&&(H.gpuTransitionPipeline||L.ensureTransition(),H.gpuMediaPipeline||L.ensureMedia(),H.gpuMediaBlendPipeline||L.ensureMediaBlend(),H.gpuShapePipeline||L.ensureShape(),H.gpuTextPipeline||L.ensureText(),H.gpuMaskCombinePipeline||L.ensureMaskCombine(),H.gpuTransitionPipeline=L.transition,H.gpuMediaPipeline=L.media,H.gpuMediaBlendPipeline=L.mediaBlend,H.gpuShapePipeline=L.shape,H.gpuTextPipeline=L.text,H.gpuMaskCombinePipeline=L.maskCombine)))},ensureLottieOverridesFresh:He,lottieOverridesAreStale:Ve,refreshFrameRenderContext:e=>{let t=qm({previousFrame:se,frame:e,fps:i});H.captureDecodedVideoFrames=!!(I&&It.scrubbingFrameCacheActive)&&t!==`skip`,H.nonBlockingVideoFrameToleranceSeconds=ce,H.workerPredecodeWaitMs=ce===void 0?Nm(f,t):0,m===`preview`&&ft(h.getState().compositionById)},resolveFrameSceneState:e=>{n.fillStyle=o,n.fillRect(0,0,t.width,t.height);let r=Ja(Ze,e,Xe,fe,m===`preview`?b:void 0,m===`preview`?C:void 0,m===`preview`?ve:void 0,j.getExpressionItem),i=ee.resolve({renderPlan:_e(),frame:e,canvas:ur(j),getKeyframes:fe,getItem:j.getExpressionItem,getPreviewTransform:m===`preview`?b:void 0,getPreviewPathVertices:m===`preview`?C:void 0},M),{activeTransitions:a,transitionClipIds:s}=i.transitionFrameState;return{activeMasks:r,frameScene:i}},perfMarkIfEnabled:e=>e>=0?performance.now():-1,getCurrentKeyframes:fe,getCurrentItem:pe,getPreviewTransformOverride:b,getPreviewEffectsOverride:x,getPreviewCornerPinOverride:S,getLiveItemSnapshot:w},Lt=new Dp(It);return{async preload(e={}){let{signal:t}=e;Q(t);let n=y(v,h.getState().compositionById).length>0;if(!D&&n)throw Error(`WORKER_REQUIRES_MAIN_THREAD:composition`);let r=[e.priorityFrame,...e.priorityFrames??[]].filter(e=>Number.isFinite(e)).map(e=>Math.round(e)).filter((e,t,n)=>n.indexOf(e)===t),a=r[0]??null,o=Math.max(4,Math.round(e.priorityWindowFrames??i*4)),s=h.getState().compositionById,c=Km({tracks:v,frames:r,fps:i,compositionById:s}),l=new Set(c.image),u=new Set(c.lottie),d=a===null?[]:g?c.video.filter(e=>Ce.has(e)):_t(a,o);Z().debug(`Preloading media`,{videoCount:R.size,videoSourceCount:new Set(xe.values()).size,imageCount:je.size});let p=[{name:`top-level-images`,run:async()=>{let e=g?Pm(f,We,l,e=>e.id).map(e=>Be(e,t)):qe;await Promise.all(e),Q(t)}},{name:`worker-guards`,run:async()=>{if(!D&&(Ge.length>0||Ke.length>0))throw Error(`WORKER_REQUIRES_MAIN_THREAD:animated-image`);if(!D&&Ue.length>0)throw Error(`WORKER_REQUIRES_MAIN_THREAD:lottie`)}},{name:`top-level-lotties`,run:async()=>{let e=g?Pm(f,Ue,u,e=>e.id):Ue;g&&D&&e.length>0&&await Promise.all(e.map(e=>Re(e,t).catch(n=>{if(t?.aborted)throw n;Z().error(`Failed to preload Lottie`,{itemId:e.id,error:n})}))),Q(t)}},{name:`comparison-main-videos`,run:async()=>{g&&await Promise.all(d.map(e=>yt(e,Ce.get(e),t)))}},{name:`main-video-extractors`,run:async()=>{d.length>0&&await ht(d,t);let e=Vm(f,R.keys(),d);e.eagerItemIds.length>0&&await ht(e.eagerItemIds,t),Q(t),Z().info(`Video initialization complete`,{mediabunny:V.size,deferred:e.deferredItemIds.length,fallback:m===`export`?R.size-V.size:void 0,uniqueSources:new Set(xe.values()).size}),xt(d)}},{name:`comparison-fallback-bind`,run:async()=>{if(g&&D)for(let e of d){if(V.has(e))continue;let t=xe.get(e);t&&ke(e,t)}}},{name:`fallback-videos`,run:async()=>{let e=Array.from(we.keys());await Ct(g?d:e,t),Q(t)}},{name:`lottie-renderers`,run:async()=>{await wt()}},{name:`animated-webp-frames`,run:async()=>{await Tt()}}];for(let e of p)await e.run();let _={items:[],pending:[],deferredPending:[],resolveDeferredBeforeRegistration:!1},b=new Set(c.video),x=/* @__PURE__ */ new Set([...c.video,...c.image,...c.lottie]),S=Nt(e.onPriorityMediaReady),C=[{name:`sub-comp-collect`,run:async()=>{Dt(s,_.items,_.pending,x,t);let e=_.pending.filter(({subItem:e})=>x.has(e.id));_.deferredPending=_.pending.filter(({subItem:e})=>!x.has(e.id)),_.items.push(...await Pt(e,t)),_.resolveDeferredBeforeRegistration=!g&&_.items.length===0,_.resolveDeferredBeforeRegistration&&(S(),_.items.push(...await Pt(_.deferredPending,t)))}},{name:`sub-comp-videos`,run:async()=>{if(_.items.length===0)return;Z().debug(`Preloading sub-composition media`,{count:_.items.length});let e=Ot(_.items),n=e.filter(e=>b.has(e));n.length>0&&await ht(n,t),g||S();let r=g||_.resolveDeferredBeforeRegistration?[]:await Pt(_.deferredPending,t);_.items.push(...r);for(let{subItem:t,src:n}of r)t.type===`video`&&!R.has(t.id)&&(Oe(t.id,n),e.push(t.id),D&&!O&&ke(t.id,n));let i=Vm(f,e,n);i.eagerItemIds.length>0&&await ht(i.eagerItemIds,t),Q(t),xt(n)}},{name:`sub-comp-fallback-videos`,run:async()=>{_.items.length!==0&&await kt(_.items,t)}},{name:`sub-comp-images`,run:async()=>{if(_.items.length===0)return;let{subImageItems:e,subLottieItems:n}=await Ft(_.items,t);Q(t),g&&S(),Z().debug(`Sub-composition media loaded`,{videos:_.items.filter(e=>e.subItem.type===`video`).length,images:_.items.filter(e=>e.subItem.type===`image`).length,animatedImages:e.filter(Cp).length,lotties:n.length})}}];for(let e of C)await e.run();g&&S(),Z().debug(`All media loaded`)},async renderFrame(e){await Lt.run(e)},wasLastRenderAborted(){return It.lastRenderAborted},wasLastRenderFallback(){return It.activePreviewFallbackUsed},async prewarmFrame(e){let t=pt();if(!t)return;let n=mt(e),r=n.map(e=>e.id).filter(e=>!V.has(e)&&!et.has(e));r.length>0&&await ht(r);for(let r of n){if(!At(r.id))continue;let n=R.get(r.id);if(!n)continue;let i=jt(r,e,n);try{await n.drawFrame(t,i,0,0,1,1)?Qe.set(r.id,0):n.getLastFailureKind()!==`no-sample`&&Mt(r.id)}catch(t){if(t instanceof DOMException&&t.name===`AbortError`)continue;let n=Mt(r.id);Z().warn(`Prewarm decode failed`,{itemId:r.id,frame:e,failures:n,error:t})}}},async prewarmFrames(e){if(e.length===0)return;let t=pt();if(!t)return;let n=/* @__PURE__ */ new Map,r=[];for(let t of e){let e=mt(t);for(let i of e){if(!At(i.id))continue;let e=R.get(i.id);if(!e)continue;if(!e.isBatchPrewarmAvailable()){r.includes(t)||r.push(t);continue}let a=jt(i,t,e),o=n.get(i.id);o?o.timestamps.push(a):n.set(i.id,{extractor:e,timestamps:[a]})}}let i=[...n.keys()].filter(e=>!V.has(e)&&!et.has(e));i.length>0&&await ht(i),await Promise.all([...n.entries()].map(async([e,{extractor:n,timestamps:r}])=>{!B&&n&&(r.sort((e,t)=>e-t),await n.prewarmBatch(t,r,0,0,1,1)>=0&&Qe.set(e,0))}));for(let e of r){if(B)break;let n=mt(e);for(let r of n){if(!At(r.id))continue;let n=R.get(r.id);if(!n)continue;let i=jt(r,e,n);try{await n.drawFrame(t,i,0,0,1,1)}catch{}}}},setDomVideoElementProvider(e){H.domVideoElementProvider=e,le=!!e,It.scrubbingFrameCacheActive=_p(!!I,le)},setNonBlockingVideoFrameTolerance(e){ce=e===void 0?void 0:Math.max(1/Math.max(1,i),Math.min(.5,e))},async prewarmItems(e,t){let n=e.filter(e=>R.has(e)&&!V.has(e)&&!et.has(e));if(n.length>0&&await ht(n),t!==void 0){let n=pt();if(!n)return;await Promise.all(e.map(async e=>{if(B)return;let r=R.get(e);if(!r||!V.has(e))return;let a=Ce.get(e);if(!a||a.type!==`video`||t-a.from>=a.durationInFrames)return;let o=km(a,t,i);try{await r.drawFrame(n,Math.max(0,o),0,0,1,1)}catch{}}))}},invalidateFrameCache(e){M+=1,ee.invalidate(e),I?.invalidate(e)},getScrubbingCache(){return I},getCanvas(){return t},async warmGpuPipeline(){let e=await L.ensureEffects();e&&(L.ensureTransition(),L.ensureMedia(),L.ensureMediaBlend(),L.ensureShape(),L.ensureText(),L.ensureMaskCombine(),H.gpuPipeline=e,H.gpuTransitionPipeline=L.transition,H.gpuMediaPipeline=L.media,H.gpuMediaBlendPipeline=L.mediaBlend,H.gpuShapePipeline=L.shape,H.gpuTextPipeline=L.text,H.gpuMaskCombinePipeline=L.maskCombine)},dispose(){B=!0,tt.clear();for(let[e,t]of xe)be.releaseItem(e,t);if(ye?ye.release():be.dispose(),R.clear(),xe.clear(),Se.clear(),Ce.clear(),V.clear(),Qe.clear(),$e.clear(),et.clear(),Te){for(let e of De.values())Te.releaseClip(e);Te.dispose()}Ee.clear(),De.clear(),we.clear();for(let e of je.values())`close`in e.source&&typeof e.source.close==`function`&&e.source.close();je.clear(),Pe.clear(),Fe.destroy(),rt.clear(),H.instanceSubCompRenderDataCache?.clear(),dt.clear(),ot=null,at=null,st=!1,I?.dispose(),ct?.dispose(),H.textRasterCache?.clear(),H.cornerPinWarpCache?.clear(),L.dispose(),ee.invalidate(),ae.dispose(),oe.clear()}}}async function Xm(e){let{totalFrames:t,signal:n,getPendingError:r,renderFrame:i,captureSample:a,encodeSample:o,onAbort:s,onFrameProgress:c}=e,l=null;for(let e=0;e<t;e++){let t=r?.();if(t)throw t;if(n?.aborted){if(l)try{await l}catch{}throw await s(),new DOMException(`Render cancelled`,`AbortError`)}await i(e),l&&await l;let u=a(e),d=e===0;l=(async()=>{try{await o(u,d)}finally{u.close()}})(),c(e)}l&&await l}function $(){return n(`CanvasRenderOrchestrator`)}let Zm=null;async function Qm(){return Zm||=import(`./canvas-audio-CCp54b5K.js`),Zm}const $m=48e3;function eh(e){let t=Math.max(0,Math.floor(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}:${String(r).padStart(2,`0`)}:${String(i).padStart(2,`0`)}`:`${r}:${String(i).padStart(2,`0`)}`}async function th(e,t,n,r,i=0,a){let o=n.samples[0]?.length??0;for(let s=0;s<o;s+=$m){if(r?.aborted)throw new DOMException(`Audio encoding cancelled`,`AbortError`);let c=Math.min($m,o-s),l=new Float32Array(c*n.channels);for(let e=0;e<n.channels;e++){let t=n.samples[e];t&&l.set(t.subarray(s,s+c),e*c)}let u=new t({data:l,format:`f32-planar`,numberOfChannels:n.channels,sampleRate:n.sampleRate,timestamp:i+s/n.sampleRate});try{await e.add(u),a?.(c)}finally{u.close()}}}async function nh(e){let{audioSource:t,AudioSample:n,canvasAudio:r,composition:i,signal:a,onProgress:o}=e,s=0,c=e=>{s+=e,o?.(s)};if(e.useWindowedAudio){for await(let e of r.processAudioWindows(i,a))await th(t,n,e,a,s/e.sampleRate,c);return s}let l=await r.processAudio(i,a);return l?(await th(t,n,l,a,0,c),s):0}async function rh(e){let t=e.canvasAudio.getAudioPacketPassthroughPlan(e.composition);if(!t)return null;let{mediabunny:n}=e,r=new n.Input({formats:n.ALL_FORMATS,source:a(n,t.src)}),i=!1;try{let a=await r.getPrimaryAudioTrack();if(!a)return null;let o=await a.getCodec(),s=await a.getFirstTimestamp();if(!o||!e.supportedCodecs.includes(o)||Math.abs(s)>.001)return null;let c={input:r,track:a,source:new n.EncodedAudioPacketSource(o),durationSeconds:t.durationSeconds};return i=!0,c}catch(e){return $().warn(`Audio packet-copy preflight failed; audio will be re-encoded`,{error:e}),null}finally{i||r.dispose()}}async function ih(e){let{mediabunny:t,prepared:n,signal:r,onProgress:i}=e;try{let e=new t.EncodedPacketSink(n.track),a={decoderConfig:await n.track.getDecoderConfig()??void 0};for await(let t of e.packets()){if(r?.aborted)throw new DOMException(`Audio copy cancelled`,`AbortError`);if(t.timestamp>=n.durationSeconds)break;let e=t.clone({timestamp:t.timestamp});await n.source.add(e,a),i?.(Math.min(n.durationSeconds,t.timestamp+t.duration))}}finally{try{n.source.close()}finally{n.input.dispose()}}}async function ah(e){if(e===`mp3`)try{let{registerMp3Encoder:e}=await import(`./mediabunny-mp3-encoder-CRkw2ITP.js`);e(),$().info(`MP3 encoder registered`)}catch(e){$().warn(`Failed to load MP3 encoder extension`,e)}}async function oh(e,t){if(e!==`pcm-s16`){if(!await De(e,{bitrate:t,numberOfChannels:2,sampleRate:48e3}))throw Error(`${e.toUpperCase()} encoding is not supported in this browser. Try exporting as WAV (lossless) instead.`);$().info(`Using ${e.toUpperCase()} codec`)}}async function sh(e){let{output:t,AudioSampleSource:n,settings:r,durationSeconds:i,useWindowedAudio:a}=e,o=et(r.container);if(!await De(o,{bitrate:r.audioBitrate??192e3,numberOfChannels:2,sampleRate:48e3}))throw Error(`${o.toUpperCase()} audio encoding is not supported in this browser. Choose WebM or MKV with Opus audio.`);let s=new n({codec:o,bitrate:r.audioBitrate??192e3});return t.addAudioTrack(s),$().info(`Audio track added to output`,{duration:i,channels:2,sampleRate:48e3,codec:o,windowed:a}),s}function ch(e){let{onProgress:t,totalFrames:n,durationSeconds:r,hasVideoRenderingStarted:i}=e;return(e,a)=>{if(i())return;let o=Math.min(r,e),s=20+Math.round(o/r*15);t({phase:`preparing`,progress:s,totalFrames:n,message:`${a===`copying`?`Copying`:`Processing`} audio ${eh(o)} / ${eh(r)}`})}}function lh(e){let{output:t,TextSubtitleSource:n,container:r}=e,i=new n(`webvtt`);return t.addSubtitleTrack(i,{languageCode:`eng`,name:`Transcript`,disposition:{default:!0}}),$().info(`Transcript subtitles will be embedded as WebVTT track`,{container:r}),i}async function uh(e){let{settings:t,composition:n,onProgress:r,signal:i}=e,o=n.durationInFrames??0,s=n.fps,c=o/Math.max(s,1),l=Fe(t,n);if(!l)return null;if(i?.aborted)throw new DOMException(`Render cancelled`,`AbortError`);let u=await import(`./src-B-ojgZKZ.js`),{Input:d,Output:f,Conversion:p,ALL_FORMATS:m}=u,h=await Ce(t.container,{fastStart:!1}),g=new d({formats:m,source:a(u,l.src)}),_=null,v=()=>{_&&_.cancel().catch(()=>void 0)};i?.addEventListener(`abort`,v,{once:!0});try{let e=await g.getPrimaryVideoTrack();if(!Ne({codec:e?.codec??null,displayWidth:e?.displayWidth??0,displayHeight:e?.displayHeight??0,getSupportedCodecs:()=>h.getSupportedVideoCodecs?.()??[]},t)||l.includeAudio&&!Pe({codec:(await g.getPrimaryAudioTrack())?.codec??null,getSupportedCodecs:()=>h.getSupportedAudioCodecs?.()??[]}))return null;r({phase:`preparing`,progress:5,totalFrames:o,message:`Preparing packet remux...`});let n=we(t.container,t.codec),i=await Be(u,t.container,n),a=new f({format:await Ce(t.container,{fastStart:i.kind===`buffer`}),target:i.target}),s=!1;try{if(_=await p.init({input:g,output:a,trim:{start:l.trimStartSeconds,end:l.trimEndSeconds},video:{codec:t.codec,forceTranscode:!1},audio:l.includeAudio?{forceTranscode:!1}:{discard:!0},showWarnings:!1}),!_.isValid)return null;_.onProgress=e=>{let t=Math.max(0,Math.min(1,e));r({phase:`encoding`,progress:Math.round(t*90),currentFrame:Math.round(t*o),totalFrames:o,message:`Remuxing packets...`})},await _.execute();let e=await i.complete();s=!0;let{blob:u}=e;return r({phase:`finalizing`,progress:100,currentFrame:o,totalFrames:o,message:`Complete!`}),$().info(`Packet remux export completed`,{durationSeconds:c,fileSize:u.size,container:t.container,codec:t.codec,includeAudio:l.includeAudio}),{blob:u,mimeType:n,duration:c,fileSize:u.size,temporaryOutput:e.temporaryOutput}}finally{a.dispose?.(),s||await i.discard()}}catch(e){if(i?.aborted||e instanceof Error&&e.name===`ConversionCanceledError`)throw new DOMException(`Render cancelled`,`AbortError`);return $().warn(`Packet remux path failed; falling back to frame render`,{error:e}),null}finally{i?.removeEventListener(`abort`,v),g.dispose()}}async function dh(e){let{settings:t,composition:n,onProgress:r,signal:i}=e,{fps:a,durationInFrames:o=0}=n,s=await Qm();if($().info(`Starting enhanced client render`,{fps:a,durationInFrames:o,durationSeconds:o/a,width:t.resolution.width,height:t.resolution.height,codec:t.codec,...V(n)}),o<=0)throw Error(`Composition has no duration`);let c=o,l=c/a;if(r({phase:`preparing`,progress:0,totalFrames:c,message:`Loading encoder...`}),i?.aborted)throw new DOMException(`Render cancelled`,`AbortError`);let u=await uh(e);if(u)return u;let d=await import(`./src-B-ojgZKZ.js`),{Output:f,VideoSampleSource:p,VideoSample:m,AudioSampleSource:h,AudioSample:g,TextSubtitleSource:_}=d;r({phase:`preparing`,progress:5,totalFrames:c,message:`Processing audio...`});let v=await s.hasAudioContent(n),y=Ze({hasAudioContent:v,durationSeconds:l,supportsWindowedProcessing:()=>s.supportsWindowedAudioProcessing(n)});r({phase:`preparing`,progress:15,totalFrames:c,message:`Creating encoder...`});let b=we(t.container,t.codec),x=await Be(d,t.container,b),S=await Ce(t.container,{fastStart:x.kind===`buffer`}),C=v?await rh({mediabunny:d,canvasAudio:s,composition:n,supportedCodecs:S.getSupportedAudioCodecs()}):null,w=new f({format:S,target:x.target}),{embedTranscriptSubtitles:T,fallbackToBurnIn:E,transcriptSubtitleVtt:D,renderCompositionInput:O}=$e({composition:n,subtitleMode:t.subtitleMode,container:t.container,supportsWebVttSubtitles:S.getSupportedSubtitleCodecs().includes(`webvtt`)});E&&$().warn(`${t.container.toUpperCase()} can't embed a soft subtitle track; burning captions into the video instead.`);let k=T?lh({output:w,TextSubtitleSource:_,container:t.container}):null,{compositionWidth:A,compositionHeight:j,exportWidth:ee,exportHeight:M,needsScaling:N}=Qe(O,t.resolution);$().info(`Resolution settings`,{composition:{width:A,height:j},export:{width:ee,height:M},needsScaling:N});let P=new OffscreenCanvas(A,j),F=P.getContext(`2d`);if(!F)throw C&&(C.source.close(),C.input.dispose()),Error(`Failed to create OffscreenCanvas 2D context`);F.imageSmoothingEnabled=!0,F.imageSmoothingQuality=`high`;let te=N?new OffscreenCanvas(ee,M):P,ne=N?te.getContext(`2d`):F;N&&(ne.imageSmoothingEnabled=!0,ne.imageSmoothingQuality=`high`),r({phase:`preparing`,progress:20,totalFrames:c,message:`Setting up video encoder...`});let re=new p({codec:t.codec,bitrate:t.videoBitrate??1e7,bitrateMode:t.bitrateMode??`variable`,keyFrameInterval:2,latencyMode:`quality`});w.addVideoTrack(re,{frameRate:a});let ie=null;if(C)w.addAudioTrack(C.source),$().info(`Audio will be copied without decoding or re-encoding`);else if(v)try{ie=await sh({output:w,AudioSampleSource:h,settings:t,durationSeconds:l,useWindowedAudio:y})}catch(e){throw $().error(`Failed to setup audio track`,{error:e}),await x.discard(),e}try{await w.start(),k&&D&&(await k.add(D),k.close())}catch(e){if(C)try{C.source.close()}finally{C.input.dispose()}throw await x.discard(),e}let ae=!1,oe,I=ch({onProgress:r,totalFrames:c,durationSeconds:l,hasVideoRenderingStarted:()=>ae}),se=C?ih({mediabunny:d,prepared:C,signal:i,onProgress:e=>I(e,`copying`)}):ie?(async()=>{try{let e=await nh({audioSource:ie,AudioSample:g,canvasAudio:s,composition:n,useWindowedAudio:y,signal:i,onProgress:e=>I(e/48e3,`processing`)});$().info(`Audio chunks fed to encoder`,{duration:e/48e3,samples:e,windowed:y})}finally{ie.close(),ie=null}})():null;se?.catch(e=>{oe=e}),r({phase:`rendering`,progress:0,currentFrame:0,totalFrames:c,message:`Rendering frames...`});let ce=null;try{if(ce=await Ym(O,P,F),await ce.preload(),ae=!0,oe)throw oe;let e=ce;await Xm({totalFrames:c,signal:i,getPendingError:()=>oe,renderFrame:async t=>{await e.renderFrame(t),N&&(ne.clearRect(0,0,ee,M),ne.drawImage(P,0,0,ee,M))},captureSample:e=>new m(te,{timestamp:e/a,duration:1/a}),encodeSample:(e,t)=>t?re.add(e,{keyFrame:!0}):re.add(e),onAbort:()=>w.cancel(),onFrameProgress:e=>{r({phase:`rendering`,progress:Math.round(e/c*100),currentFrame:e,totalFrames:c,message:`Rendering frame ${e+1}/${c}`})}}),se&&(r({phase:`encoding`,progress:94,currentFrame:c,totalFrames:c,message:`Finishing audio...`}),await se),r({phase:`finalizing`,progress:95,currentFrame:c,totalFrames:c,message:`Finalizing video...`}),await w.finalize();let t=await x.complete(),{blob:n}=t;return r({phase:`finalizing`,progress:100,currentFrame:c,totalFrames:c,message:`Complete!`}),ce.dispose(),s.clearAudioDecodeCache(),{blob:n,mimeType:b,duration:l,fileSize:n.size,temporaryOutput:t.temporaryOutput}}catch(e){ce?.dispose(),s.clearAudioDecodeCache();try{w.state===`started`&&await w.cancel()}catch{}throw se&&await Promise.allSettled([se]),await x.discard(),e}}async function fh(e){let{composition:t,frame:n,width:r=320,height:i=180,quality:a=.85,format:o=`image/jpeg`}=e,s=t.width||1920,c=t.height||1080;$().debug(`Rendering single frame`,{frame:n,width:r,height:i,compositionWidth:s,compositionHeight:c});let l=new OffscreenCanvas(s,c),u=l.getContext(`2d`);if(!u)throw Error(`Failed to get 2d context`);u.imageSmoothingEnabled=!0,u.imageSmoothingQuality=`high`;let d=await Ym(t,l,u);try{await d.preload(),await d.renderFrame(n);let e=l,t=s,u=c;for(;t>r*2||u>i*2;){let n=Math.max(Math.ceil(t/2),r),a=Math.max(Math.ceil(u/2),i),o=new OffscreenCanvas(n,a),s=o.getContext(`2d`);s.imageSmoothingQuality=`high`,s.drawImage(e,0,0,n,a),e=o,t=n,u=a}let f=new OffscreenCanvas(r,i),p=f.getContext(`2d`);if(!p)throw Error(`Failed to get thumbnail 2d context`);return p.imageSmoothingQuality=`high`,p.drawImage(e,0,0,r,i),await f.convertToBlob({type:o,quality:a})}finally{try{d.dispose()}catch(e){$().warn(`Failed to dispose single-frame renderer`,{error:e})}}}async function ph(e){let{settings:t,composition:n,onProgress:r,signal:i}=e,{fps:a,durationInFrames:o=0}=n,s=await Qm();if($().info(`Starting audio-only render`,{fps:a,durationInFrames:o,durationSeconds:o/a,container:t.container,audioCodec:t.audioCodec,audioBitrate:t.audioBitrate}),o<=0)throw Error(`Composition has no duration`);let c=o/a;if(r({phase:`preparing`,progress:0,totalFrames:o,message:`Loading encoder...`}),i?.aborted)throw new DOMException(`Render cancelled`,`AbortError`);let l=await import(`./src-B-ojgZKZ.js`),{Output:u,AudioSampleSource:d,AudioSample:f}=l;if(await ah(t.container),r({phase:`preparing`,progress:10,totalFrames:o,message:`Processing audio...`}),!await s.hasAudioContent(n))throw Error(`No audio content found in composition`);let p=Ze({hasAudioContent:!0,durationSeconds:c,supportsWindowedProcessing:()=>s.supportsWindowedAudioProcessing(n)});r({phase:`preparing`,progress:50,totalFrames:o,message:`Creating encoder...`});let m=tt(t.container),h=t.audioBitrate??192e3;await oh(m,h);let g=we(t.container),_=await Be(l,t.container,g),v=new u({format:await Ce(t.container,{fastStart:_.kind===`buffer`}),target:_.target}),y=new d({codec:m,bitrate:h});v.addAudioTrack(y),$().info(`Audio track configured`,{duration:c,channels:2,sampleRate:48e3,codec:m,windowed:p}),r({phase:`encoding`,progress:60,totalFrames:o,message:`Encoding audio...`});let b;try{await v.start(),await nh({audioSource:y,AudioSample:f,canvasAudio:s,composition:n,useWindowedAudio:p,signal:i,onProgress:e=>{r({phase:`encoding`,progress:60+Math.round(e/48e3/c*30),totalFrames:o,message:`Encoding audio ${eh(e/48e3)} / ${eh(c)}`})}}),r({phase:`finalizing`,progress:90,totalFrames:o,message:`Finalizing audio...`}),y.close(),await v.finalize(),b=await _.complete()}catch(e){try{v.state===`started`&&await v.cancel()}catch{}throw await _.discard(),e}let{blob:x}=b;return r({phase:`finalizing`,progress:100,totalFrames:o,message:`Complete!`}),{blob:x,mimeType:g,duration:c,fileSize:x.size,temporaryOutput:b.temporaryOutput}}export{lm as a,hm as c,dm as i,Yp as l,mm as n,fm as o,um as r,ph as renderAudioOnly,dh as renderComposition,fh as renderSingleFrame,pm as s,om as t};
//# sourceMappingURL=canvas-render-orchestrator-CnXqNgHy.js.map