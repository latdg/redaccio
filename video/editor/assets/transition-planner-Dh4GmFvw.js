import{n as e}from"./rolldown-runtime-DBVvNlSN.js";import{n as t,t as n}from"./export-render.worker-BDG-g7om.js";import{o as r,s as i}from"./timeline-services-B5BHOjYP.js";import{t as a}from"./constants-BWopjn6x.js";import{p as o,q as s,s as c}from"./storage-BQsh1OA0.js";import{l,n as u,r as d}from"./mediabunny-input-source-Bpwi6RYm.js";import{t as f}from"./managed-worker-BekZBr6U.js";import{t as p}from"./blob-url-manager-36AWZ4WK.js";const m={"text.text":e=>e.type===`text`&&!e.textSpans?.length?e.text:null,"text.color":e=>e.type===`text`&&!e.textSpans?.length?e.color:null,"shape.fillColor":e=>e.type===`shape`&&e.fillType!==`linear`?e.fillColor:null,"shape.strokeColor":e=>e.type===`shape`&&e.strokeEnabled&&e.strokeColor?e.strokeColor:null},h={"text.text":(e,t)=>e.type===`text`&&!e.textSpans?.length&&e.text!==t?{...e,text:t}:e,"text.color":(e,t)=>e.type===`text`&&!e.textSpans?.length&&e.color!==t?{...e,color:t}:e,"shape.fillColor":(e,t)=>e.type===`shape`&&e.fillType!==`linear`&&e.fillColor!==t?{...e,fillColor:t}:e,"shape.strokeColor":(e,t)=>e.type===`shape`&&e.strokeColor!==t?{...e,strokeColor:t}:e};function g(e,t){return m[t](e)}function _(e,t,n){return h[t](e,n)}function v(e,t,n){if(!t?.controls.length||!n||Object.keys(n).length===0)return e;let r=/* @__PURE__ */ new Map;for(let e of t.controls){if(typeof n[e.id]!=`string`)continue;let t=r.get(e.targetItemId);t?t.push(e):r.set(e.targetItemId,[e])}if(r.size===0)return e;let i=!1,a=e.map(e=>{let t=r.get(e.id);if(!t)return e;let a=e;for(let e of t)a=_(a,e.property,n[e.id]);return i||=a!==e,a});return i?a:e}function y(e){return e===`text.text`||e===`text.color`||e===`shape.fillColor`||e===`shape.strokeColor`}function b(e){if(typeof e!=`string`)return null;let t=e.trim();return t.length>0?t:null}function ee(e){if(!e||typeof e!=`object`)return null;let t=e,n=b(t.id),r=b(t.name),i=b(t.targetItemId);return!n||!r||!i||!y(t.property)?null:{id:n,name:r,targetItemId:i,property:t.property,kind:t.kind,defaultValue:t.defaultValue}}function te(e,t){let n=t.get(e.targetItemId);if(!n)return null;let r=g(n,e.property);if(r===null)return null;let i=e.property===`text.text`?`text`:`color`;return e.kind===i?{id:e.id,name:e.name,targetItemId:e.targetItemId,property:e.property,kind:i,defaultValue:typeof e.defaultValue==`string`?e.defaultValue:r}:null}function ne(e,t){if(!e||typeof e!=`object`)return;let n=e;if(n.version!==1||!Array.isArray(n.controls))return;let r=new Map(t.map(e=>[e.id,e])),i=/* @__PURE__ */ new Set,a=/* @__PURE__ */ new Set,o=[];for(let e of n.controls){let t=ee(e);if(!t||i.has(t.id))continue;let n=te(t,r);if(!n)continue;let s=`${n.targetItemId}:${n.property}`;a.has(s)||(i.add(n.id),a.add(s),o.push(n))}return o.length>0?{version:1,controls:o}:void 0}function re(e,t){return(e.order??0)-(t.order??0)}function ie(e,t){return{id:e,name:`Track ${t+1}`,height:a,locked:!1,syncLock:!0,visible:!0,muted:!1,solo:!1,order:t,items:[]}}function ae(e,t){let n=/* @__PURE__ */ new Map;for(let t of e){let e=n.get(t.trackId);if(e){e.push(t);continue}n.set(t.trackId,[t])}let r=[...t].sort(re),i=new Set(r.map(e=>e.id)),a=r.reduce((e,t)=>Math.max(e,t.order??0),-1),o=r.map(e=>({...e,items:n.get(e.id)??[]}));for(let[e,t]of n.entries())i.has(e)||(a+=1,o.push({...ie(e,a),items:t}));return o.sort(re)}function oe(e){let t=ne(e.compositionControls,e.items);return{...e,editorKind:e.editorKind===`composite-2d`?`composite-2d`:`sequence`,tracks:ae(e.items,e.tracks),...t?{compositionControls:t}:{compositionControls:void 0}}}function se(e){let t=/* @__PURE__ */ new Set;for(let n of e)for(let e of n.items)e.mediaId&&t.add(e.mediaId);return[...t].sort()}function ce(e){return e.join(`|`)}const x=i()((e,t)=>({compositions:[],compositionById:{},mediaDependencyIds:[],mediaDependencyVersion:0,addComposition:t=>e(e=>({compositions:[...e.compositions,oe(t)]})),updateComposition:(t,n)=>e(e=>({compositions:e.compositions.map(e=>e.id===t?oe({...e,...n}):e)})),removeComposition:t=>e(e=>({compositions:e.compositions.filter(e=>e.id!==t)})),getComposition:e=>t().compositionById[e],setCompositions:t=>e({compositions:t.map(e=>oe(e))})}));let le=x.getState().compositions,ue=x.getState().mediaDependencyIds,de=ce(ue);x.subscribe(e=>{if(e.compositions===le)return;le=e.compositions;let t={};for(let n of e.compositions)t[n.id]=n;let n=se(e.compositions),r=ce(n),i=r===de?e.mediaDependencyIds:n,a=r===de?e.mediaDependencyVersion:e.mediaDependencyVersion+1;ue=i,de=r,x.setState({compositionById:t,mediaDependencyIds:ue,mediaDependencyVersion:a})});function fe(e){return!!e.compositionId&&(e.type===`composition`||e.type===`audio`)}function pe(e){let t=/* @__PURE__ */ new Set;for(let n of e)fe(n)&&t.add(n.compositionId);return[...t]}function me(e,t,n=/* @__PURE__ */ new Set){let r=[];for(let i of pe(e)){if(n.has(i))continue;n.add(i),r.push(i);let e=t[i];e&&r.push(...me(e.items,t,n))}return r}function he(e,t){return me(e.flatMap(e=>e.items??[]),t)}function ge(e,t){return e===void 0||!Number.isFinite(e)||e<=0?t:e}function _e(e,t,n=30,r=n){let i=ge(n,30),a=ge(r,i),o=e/i;return Math.round(o*a*t)}function ve(e,t,n=30,r=n){let i=ge(n,30),a=ge(r,i),o=e/i;return Math.floor(o*a/t)}const ye=/* @__PURE__ */ new Set([`position`,`scale`,`anchor`]);function be(e){return ye.has(e)}const xe=/* @__PURE__ */ new Set([`x`,`y`,`width`,`height`,`anchorX`,`anchorY`,`rotation`,`opacity`,`cornerRadius`]);function Se(e){return xe.has(e)}const Ce=/* @__PURE__ */ new Set([`trimPathStart`,`trimPathEnd`,`trimPathOffset`,`taperStartWidth`,`taperEndWidth`,`taperStartLength`,`taperEndLength`]);function we(e){return Ce.has(e)}function Te(e){return Se(e)||we(e)}function Ee(e){return Te(e)||be(e)}function De(e){if(!e)return[];let t=(e.expressions??[]).filter(e=>e.type===`link`);return[...e.propertyLinks??[],...t]}function Oe(e){return(e?.expressions??[]).filter(e=>e.type===`expression`)}const ke={x:`X Position`,y:`Y Position`,width:`Width`,height:`Height`,anchorX:`Anchor X`,anchorY:`Anchor Y`,rotation:`Rotation`,opacity:`Opacity`,cornerRadius:`Layer Radius`,cropLeft:`Crop Left`,cropRight:`Crop Right`,cropTop:`Crop Top`,cropBottom:`Crop Bottom`,cropSoftness:`Crop Softness`,volume:`Volume (dB)`,textStyleScale:`Style Preset Scale`,fontSize:`Font Size`,lineHeight:`Line Height`,textPadding:`Text Padding`,backgroundRadius:`Background Radius`,textShadowOffsetX:`Shadow X`,textShadowOffsetY:`Shadow Y`,textShadowBlur:`Shadow Blur`,strokeWidth:`Stroke Width`,trimPathStart:`Trim Paths Start`,trimPathEnd:`Trim Paths End`,trimPathOffset:`Trim Paths Offset`,taperStartWidth:`Taper Start Width`,taperEndWidth:`Taper End Width`,taperStartLength:`Taper Start Length`,taperEndLength:`Taper End Length`},Ae=new Set(Object.keys(ke));function je(e){return Ae.has(e)}function Me(e,t,n){return`effect:${e}:${t}:${n}`}function Ne(e){if(!e.startsWith(`effect:`))return null;let[,t=``,n=``,r=``]=e.split(`:`);return!t||!n||!r?null:{gpuEffectType:t,effectId:n,paramKey:r}}function Pe(e,t){return`pathVertex:${e}:${t}`}function Fe(e){let t=/^pathVertex:(\d+):(positionX|positionY|inX|inY|outX|outY)$/.exec(e);return t?{vertexIndex:Number(t[1]),component:t[2]}:null}function Ie(e){if(je(e))return ke[e];let t=Fe(e);if(t)return`Vertex ${t.vertexIndex+1} ${{positionX:`X`,positionY:`Y`,inX:`In X`,inY:`In Y`,outX:`Out X`,outY:`Out Y`}[t.component]}`;let n=Ne(e);return n?n.paramKey:e}new Proxy({...ke},{get(e,t){if(typeof t==`string`)return e[t]??Ie(t)}});const Le={tension:170,friction:26,mass:1},Re={x1:.42,y1:0,x2:.58,y2:1};function ze(e){return e}function Be(e){return 0}function Ve(e){return e*e}function He(e){return e*(2-e)}function Ue(e){return e<.5?2*e*e:-1+(4-2*e)*e}function We(e,t){let{x1:n,y1:r,x2:i,y2:a}=t;if(e===0)return 0;if(e===1)return 1;let o=3*n,s=3*(i-n)-o,c=1-o-s,l=3*r,u=3*(a-r)-l,d=1-l-u,f=e;for(let t=0;t<8;t++){let t=((c*f+s)*f+o)*f-e;if(Math.abs(t)<1e-6)break;let n=(3*c*f+2*s)*f+o;if(Math.abs(n)<1e-6)break;f-=t/n,f=Math.max(0,Math.min(1,f))}return((d*f+u)*f+l)*f}function Ge(e,t){let{tension:n,friction:r,mass:i}=t;if(e===0)return 0;if(e===1)return 1;let a=Math.sqrt(n/i),o=r/(2*Math.sqrt(n*i)),s=e*(4/(o*a)),c;if(o<1){let e=a*Math.sqrt(1-o*o);c=1-Math.exp(-o*a*s)*(Math.cos(e*s)+o*a/e*Math.sin(e*s))}else if(o===1)c=1-Math.exp(-a*s)*(1+a*s);else{let e=-a*(o-Math.sqrt(o*o-1)),t=-a*(o+Math.sqrt(o*o-1));c=1-(t*Math.exp(e*s)-e*Math.exp(t*s))/(t-e)}return Math.max(0,Math.min(1.2,c))}const Ke={linear:ze,"ease-in":Ve,"ease-out":He,"ease-in-out":Ue,hold:Be,"cubic-bezier":e=>We(e,Re),spring:e=>Ge(e,Le)};function qe(e){return Ke[e]??ze}function Je(e,t){let n=Math.max(0,Math.min(1,e));return qe(t)(n)}function Ye(e,t){let n=Math.max(0,Math.min(1,e));switch(t.type){case`cubic-bezier`:return We(n,t.bezier??Re);case`spring`:return Ge(n,t.spring??Le);default:return qe(t.type)(n)}}function Xe(e,t,n){let r=t.frame-e.frame;if(r<=0)return e.value;let i=(n-e.frame)/r,a=e.easingConfig?Ye(i,e.easingConfig):Je(i,e.easing);return e.value+(t.value-e.value)*a}function S(e,t,n){if(e.length===0)return n;let r=e[0];if(e.length===1||t<=r.frame)return r.value;let i=e[e.length-1];if(t>=i.frame)return i.value;for(let n=0;n<e.length-1;n++){let r=e[n],i=e[n+1];if(r.frame<=t&&i.frame>t)return Xe(r,i,t)}return n}function C(e,t){return e?e.properties.find(e=>e.property===t)?.keyframes??[]:[]}const Ze=.999;function w(e){return!Number.isFinite(e)||e<=0?0:e>=1?1:e}function Qe(e){return Number.isFinite(e)?e<=-1?-1:e>=1?1:e:0}function $e(e,t){let n=e+t;if(n<=Ze)return[e,t];if(n<=0)return[0,0];let r=Ze/n;return[e*r,t*r]}function et(e,t,n){if(!Number.isFinite(n)||n<=0)return[0,0];let r=Math.max(0,Math.min(e,n)),i=Math.max(0,Math.min(t,n)),a=r+i;if(a<=n)return[r,i];if(a<=0)return[0,0];let o=n/a;return[r*o,i*o]}function tt(e,t){let n=Number.isFinite(e)&&e>0?e:0,r=Number.isFinite(t)&&t>0?t:0;return n===0||r===0?Math.max(n,r):Math.min(n,r)}function nt(e){let[t,n]=$e(w(e?.left??0),w(e?.right??0)),[r,i]=$e(w(e?.top??0),w(e?.bottom??0));return{left:t,right:n,top:r,bottom:i,softness:Qe(e?.softness??0)}}function rt(e){if(!e)return;let t=nt(e);if(t.left!==0||t.right!==0||t.top!==0||t.bottom!==0)return t}function it(e){let t=nt(e);return t.left>0||t.right>0||t.top>0||t.bottom>0}function at(e,t){return!Number.isFinite(t)||t<=0?0:w(e??0)*t}function ot(e,t){return!Number.isFinite(t)||t<=0?0:w(e/t)}function st(e,t){return!Number.isFinite(t)||t<=0?0:Qe(e??0)*t}function ct(e,t){return!Number.isFinite(t)||t<=0?0:Qe(e/t)}function lt(e,t,n,r){if(!Number.isFinite(e)||e<=0||!Number.isFinite(t)||t<=0||!Number.isFinite(n)||n<=0||!Number.isFinite(r)||r<=0)return{x:0,y:0,width:Math.max(0,n),height:Math.max(0,r)};let i=Math.min(n/e,r/t),a=e*i,o=t*i;return{x:(n-a)/2,y:(r-o)/2,width:a,height:o}}function ut(e){return Number.isFinite(e)&&e>0}function dt(e,t,n,r,i){let a=Math.max(1e-6,1-i.left-i.right),o=Math.max(1e-6,1-i.top-i.bottom),s=e*a,c=lt(s,t*o,n,r),l=c.width/s;return{x:c.x-e*i.left*l,y:c.y-t*i.top*l,width:e*l,height:t*l}}function ft(e,t,n,r,i,a,o){let s=[e,t,n,r].every(ut);return i?.refit===!0&&s?dt(e,t,n,r,a):o===`fill`?{x:0,y:0,width:Math.max(0,n),height:Math.max(0,r)}:lt(e,t,n,r)}function pt(e,t,n,r,i,a=`contain`){let o=nt(i),s=ft(e,t,n,r,i,o,a),c={left:s.width*o.left,right:s.width*o.right,top:s.height*o.top,bottom:s.height*o.bottom},l={x:s.x+c.left,y:s.y+c.top,width:Math.max(0,s.width-c.left-c.right),height:Math.max(0,s.height-c.top-c.bottom)},u=st(o.softness,tt(s.width,s.height)),d=Math.abs(u),f=u>0?{left:c.left>0?Math.min(d,c.left):0,right:c.right>0?Math.min(d,c.right):0,top:c.top>0?Math.min(d,c.top):0,bottom:c.bottom>0?Math.min(d,c.bottom):0}:{left:0,right:0,top:0,bottom:0},p=l.x-f.left,m=l.y-f.top,h=p+Math.max(0,l.width+f.left+f.right),g=m+Math.max(0,l.height+f.top+f.bottom),_={x:Math.floor(p),y:Math.floor(m),width:Math.ceil(h)-Math.floor(p),height:Math.ceil(g)-Math.floor(m)},v={left:c.left>0?u>0?f.left:d:0,right:c.right>0?u>0?f.right:d:0,top:c.top>0?u>0?f.top:d:0,bottom:c.bottom>0?u>0?f.bottom:d:0},[y,b]=et(v.left,v.right,_.width),[ee,te]=et(v.top,v.bottom,_.height);return{mediaRect:s,cropViewportRect:l,viewportRect:_,cropPixels:c,crop:o,softnessPixels:d,featherPixels:{left:y,right:b,top:ee,bottom:te}}}const mt=[`cropLeft`,`cropRight`,`cropTop`,`cropBottom`,`cropSoftness`];function ht(e){return Math.max(1,Math.min(e.width,e.height))}function gt(e,t,n){switch(t){case`cropLeft`:return at(e?.left,Math.max(1,n.width));case`cropRight`:return at(e?.right,Math.max(1,n.width));case`cropTop`:return at(e?.top,Math.max(1,n.height));case`cropBottom`:return at(e?.bottom,Math.max(1,n.height));case`cropSoftness`:return st(e?.softness,ht(n))}}function _t(e,t,n,r){let i={...e},a=Math.max(1,r.width),o=Math.max(1,r.height);switch(t){case`cropLeft`:i.left=ot(n,a);break;case`cropRight`:i.right=ot(n,a);break;case`cropTop`:i.top=ot(n,o);break;case`cropBottom`:i.bottom=ot(n,o);break;case`cropSoftness`:i.softness=ct(n,ht(r))}return rt(i)}function vt(e,t,n,r){let i=rt(e);for(let e of mt){let a=C(t,e);if(a.length===0)continue;let o=S(a,n,gt(i,e,r));i=_t(i,e,o,r)}return i}function yt({device:e,context:t,pipeline:n,bindGroup:r,encoder:i=e.createCommandEncoder(),submit:a=!0}){let o=i.beginRenderPass({colorAttachments:[{view:t.getCurrentTexture().createView(),loadOp:`clear`,storeOp:`store`}]});o.setPipeline(n),o.setBindGroup(0,r),o.draw(6),o.end(),a&&e.queue.submit([i.finish()])}const bt=`
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  var positions = array<vec2f, 6>(
    vec2f(-1.0, -1.0),
    vec2f(1.0, -1.0),
    vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0),
    vec2f(1.0, -1.0),
    vec2f(1.0, 1.0)
  );
  var uvs = array<vec2f, 6>(
    vec2f(0.0, 1.0),
    vec2f(1.0, 1.0),
    vec2f(0.0, 0.0),
    vec2f(0.0, 0.0),
    vec2f(1.0, 1.0),
    vec2f(1.0, 0.0)
  );
  var output: VertexOutput;
  output.position = vec4f(positions[vertexIndex], 0.0, 1.0);
  output.uv = uvs[vertexIndex];
  return output;
}
`,xt=`
${bt}

fn rgb2hsv(c: vec3f) -> vec3f {
  let K = vec4f(0.0, -1.0/3.0, 2.0/3.0, -1.0);
  let p = mix(vec4f(c.bg, K.wz), vec4f(c.gb, K.xy), step(c.b, c.g));
  let q = mix(vec4f(p.xyw, c.r), vec4f(c.r, p.yzx), step(p.x, c.r));
  let d = q.x - min(q.w, q.y);
  let e = 1.0e-10;
  return vec3f(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

fn hsv2rgb(c: vec3f) -> vec3f {
  let K = vec4f(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  let p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, vec3f(0.0), vec3f(1.0)), c.y);
}

fn rgb2hsl(c: vec3f) -> vec3f {
  let maxC = max(max(c.r, c.g), c.b);
  let minC = min(min(c.r, c.g), c.b);
  let l = (maxC + minC) * 0.5;
  if (maxC == minC) { return vec3f(0.0, 0.0, l); }
  let d = maxC - minC;
  let s = select(d / (2.0 - maxC - minC), d / (maxC + minC), l > 0.5);
  var h: f32;
  if (maxC == c.r) {
    h = (c.g - c.b) / d + select(0.0, 6.0, c.g < c.b);
  } else if (maxC == c.g) {
    h = (c.b - c.r) / d + 2.0;
  } else {
    h = (c.r - c.g) / d + 4.0;
  }
  h /= 6.0;
  return vec3f(h, s, l);
}

fn hue2rgb(p: f32, q: f32, t: f32) -> f32 {
  var tt = t;
  if (tt < 0.0) { tt += 1.0; }
  if (tt > 1.0) { tt -= 1.0; }
  if (tt < 1.0/6.0) { return p + (q - p) * 6.0 * tt; }
  if (tt < 1.0/2.0) { return q; }
  if (tt < 2.0/3.0) { return p + (q - p) * (2.0/3.0 - tt) * 6.0; }
  return p;
}

fn hsl2rgb(c: vec3f) -> vec3f {
  if (c.y == 0.0) { return vec3f(c.z); }
  let q = select(c.z + c.y - c.z * c.y, c.z * (1.0 + c.y), c.z < 0.5);
  let p = 2.0 * c.z - q;
  return vec3f(
    hue2rgb(p, q, c.x + 1.0/3.0),
    hue2rgb(p, q, c.x),
    hue2rgb(p, q, c.x - 1.0/3.0)
  );
}

fn luminance(c: vec3f) -> f32 {
  return dot(c, vec3f(0.2126, 0.7152, 0.0722));
}

fn luminance601(c: vec3f) -> f32 {
  return dot(c, vec3f(0.299, 0.587, 0.114));
}

const PI: f32 = 3.14159265359;
const TAU: f32 = 6.28318530718;
const E: f32 = 2.71828182846;

fn gaussian(x: f32, sigma: f32) -> f32 {
  return exp(-(x * x) / (2.0 * sigma * sigma));
}

fn smootherstep(edge0: f32, edge1: f32, x: f32) -> f32 {
  let t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

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
`;function T(e,t,n){return Math.max(t,Math.min(n,e))}function St(e){if(e.length<=1)return[0];let t=e.length-1,n=Array(t);for(let r=0;r<t;r+=1){let t=e[r],i=e[r+1],a=Math.max(1e-6,i.x-t.x);n[r]=(i.y-t.y)/a}let r=Array(e.length);r[0]=n[0],r[e.length-1]=n[t-1];for(let t=1;t<e.length-1;t+=1){let e=n[t-1],i=n[t];r[t]=e*i<=0?0:(e+i)/2}for(let e=0;e<t;e+=1){let t=n[e];if(Math.abs(t)<1e-6){r[e]=0,r[e+1]=0;continue}let i=r[e]/t,a=r[e+1]/t,o=i*i+a*a;if(o>9){let n=3/Math.sqrt(o);r[e]=n*i*t,r[e+1]=n*a*t}}return r}function Ct(e){if(!e||e.length===0)return[{x:0,y:0},{x:1,y:1}];let t=e.map(e=>({x:T(e.x,0,1),y:T(e.y,0,1)})).sort((e,t)=>e.x-t.x),n=[];for(let e of t){let t=n[n.length-1];(!t||Math.abs(t.x-e.x)>5e-4)&&n.push(e)}if(n.length===0)return[{x:0,y:0},{x:1,y:1}];n[0].x>1e-4?n.unshift({x:0,y:n[0].y}):n[0]={x:0,y:n[0].y};let r=n[n.length-1];return r.x<.9999?n.push({x:1,y:r.y}):Math.abs(r.x-1)>1e-4&&(n[n.length-1]={x:1,y:r.y}),n}function wt(e,t){let n=Ct(e),r=T(t,0,1);if(r<=n[0].x)return n[0].y;if(r>=n[n.length-1].x)return n[n.length-1].y;let i=n.length-2;for(let e=0;e<n.length-1;e+=1){let t=n[e],a=n[e+1];if(r>=t.x&&r<=a.x){i=e;break}}let a=n[i],o=n[i+1],s=Math.max(1e-6,o.x-a.x),c=T((r-a.x)/s,0,1),l=c*c,u=l*c,d=St(n),f=d[i],p=d[i+1],m=2*u-3*l+1,h=u-2*l+c,g=-2*u+3*l,_=u-l;return T(m*a.y+h*s*f+g*o.y+_*s*p,0,1)}const E={shadow:.25,highlight:.75},Tt=[`master`,`red`,`green`,`blue`],Et=.02,Dt=.98,Ot=.04;function D(e,t,n){return Math.max(t,Math.min(n,e))}function O(e,t){return typeof e==`number`&&Number.isFinite(e)?e:t}function kt(e,t){return D(O(e[t],0)/200,-.5,.5)}function At(e,t){let n=1-e;return e+n*n*t*.5}function jt(e,t){return e+4*e*(1-e)*t*.25}function Mt(e,t){return e+e*e*t*.5}function Nt(e,t){return(e-.5)*(1+t)+.5}function Pt(e,t){let n=O(e.shadows,0)/100,r=O(e.midtones,0)/100,i=O(e.highlights,0)/100,a=O(e.contrast,0)/100,o=t;return o=At(o,n),o=jt(o,r),o=Mt(o,i),o=Nt(o,a),D(o,0,1)}function Ft(e){let t=e.charAt(0).toUpperCase()+e.slice(1);return{shadowX:`${e}ShadowX`,shadowY:`${e}ShadowY`,highlightX:`${e}HighlightX`,highlightY:`${e}HighlightY`,prefix:t}}function It(){return{shadow:{x:E.shadow,y:E.shadow},highlight:{x:E.highlight,y:E.highlight}}}function Lt(e){let t=It(),n=D(O(e.shadow.x,t.shadow.x),Et,Dt),r=D(O(e.highlight.x,t.highlight.x),Et,Dt);if(n>r&&([n,r]=[r,n]),r-n<.04){let e=D((n+r)/2,.04,Dt-Ot/2);n=e-Ot/2,r=e+Ot/2}return{shadow:{x:n,y:D(O(e.shadow.y,t.shadow.y),0,1)},highlight:{x:r,y:D(O(e.highlight.y,t.highlight.y),0,1)}}}function Rt(e){let t=Lt(e);return[{x:0,y:0},t.shadow,t.highlight,{x:1,y:1}]}function zt(e,t){let n=Ft(t);if([n.shadowX,n.shadowY,n.highlightX,n.highlightY].some(t=>typeof e[t]==`number`&&Number.isFinite(e[t])))return Lt({shadow:{x:O(e[n.shadowX],E.shadow),y:O(e[n.shadowY],E.shadow)},highlight:{x:O(e[n.highlightX],E.highlight),y:O(e[n.highlightY],E.highlight)}});if(t===`master`)return Lt({shadow:{x:E.shadow,y:Pt(e,E.shadow)},highlight:{x:E.highlight,y:Pt(e,E.highlight)}});let r=kt(e,t);return Lt({shadow:{x:E.shadow,y:E.shadow+r},highlight:{x:E.highlight,y:E.highlight+r}})}function Bt(e){return`${e}Points`}function Vt(e){let t=e.filter(e=>Number.isFinite(e.x)&&Number.isFinite(e.y)).map(e=>({x:D(e.x,0,1),y:D(e.y,0,1)})).sort((e,t)=>e.x-t.x).slice(0,16),n=[];for(let e of t){let t=n[n.length-1];t&&e.x-t.x<.04/2||n.push(e)}return n.length<2?[{x:0,y:0},{x:1,y:1}]:n}function Ht(e){try{let t=JSON.parse(e);if(!Array.isArray(t))return null;let n=[];for(let e of t){if(!Array.isArray(e)||e.length<2)return null;let[t,r]=e;if(typeof t!=`number`||typeof r!=`number`)return null;n.push({x:t,y:r})}return n.length>=2?Vt(n):null}catch{return null}}function Ut(e,t){let n=e[Bt(t)];if(typeof n==`string`&&n.length>0){let e=Ht(n);if(e)return e}return Rt(zt(e,t))}function Wt(e){let t=Ut(e,`master`),n=Ut(e,`red`),r=Ut(e,`green`),i=Ut(e,`blue`),a=/* @__PURE__ */ new Uint8Array(1024);for(let e=0;e<256;e++){let o=wt(t,e/255);a[e*4]=Math.round(D(wt(n,o),0,1)*255),a[e*4+1]=Math.round(D(wt(r,o),0,1)*255),a[e*4+2]=Math.round(D(wt(i,o),0,1)*255),a[e*4+3]=255}return a}function Gt(e){let t=[];for(let n of Tt){let r=Ft(n);t.push(O(e[r.shadowX],-1),O(e[r.shadowY],-1),O(e[r.highlightX],-1),O(e[r.highlightY],-1),typeof e[Bt(n)]==`string`?e[Bt(n)]:``)}return t.join(`|`)}var Kt=/* @__PURE__ */ e({GRADIENT_MAP_PRESETS:()=>pn,brightness:()=>Jt,colorWheels:()=>on,contrast:()=>Yt,curves:()=>an,exposure:()=>Xt,gradientMap:()=>_n,grayscale:()=>nn,hueShift:()=>Zt,invert:()=>Qt,levels:()=>$t,powerWindow:()=>dn,saturation:()=>en,secondaryQualifier:()=>cn,sepia:()=>rn,temperature:()=>tn,vibrance:()=>fn});function k(e,t,n){let r=e[t];return typeof r==`number`?r:n}function qt(e,t){if(typeof e!=`string`||!e.startsWith(`#`))return t;let n=e.slice(1),r=n.length===3?n.split(``).map(e=>e+e).join(``):n;if(!/^[0-9a-fA-F]{6}$/.test(r))return t;let i=parseInt(r.slice(0,2),16)/255,a=parseInt(r.slice(2,4),16)/255,o=parseInt(r.slice(4,6),16)/255;return[i,a,o].every(Number.isFinite)?[i,a,o]:t}const Jt={id:`gpu-brightness`,name:`Brightness`,category:`color`,entryPoint:`brightnessFragment`,uniformSize:16,shader:`
struct BrightnessParams { amount: f32, _p1: f32, _p2: f32, _p3: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: BrightnessParams;
@fragment
fn brightnessFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let adjusted = color.rgb + params.amount;
  return vec4f(clamp(adjusted, vec3f(0.0), vec3f(1.0)), color.a);
}`,params:{amount:{type:`number`,label:`Amount`,default:0,min:-1,max:1,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.amount??0,0,0,0])},Yt={id:`gpu-contrast`,name:`Contrast`,category:`color`,entryPoint:`contrastFragment`,uniformSize:16,shader:`
struct ContrastParams { amount: f32, _p1: f32, _p2: f32, _p3: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: ContrastParams;
@fragment
fn contrastFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let adjusted = (color.rgb - 0.5) * params.amount + 0.5;
  return vec4f(clamp(adjusted, vec3f(0.0), vec3f(1.0)), color.a);
}`,params:{amount:{type:`number`,label:`Amount`,default:1,min:0,max:3,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.amount??1,0,0,0])},Xt={id:`gpu-exposure`,name:`Exposure`,category:`color`,entryPoint:`exposureFragment`,uniformSize:16,shader:`
struct ExposureParams { exposure: f32, offset: f32, gamma: f32, _pad: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: ExposureParams;
@fragment
fn exposureFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  var adjusted = color.rgb * pow(2.0, params.exposure);
  adjusted += params.offset;
  adjusted = pow(max(adjusted, vec3f(0.0)), vec3f(1.0 / params.gamma));
  return vec4f(clamp(adjusted, vec3f(0.0), vec3f(1.0)), color.a);
}`,params:{exposure:{type:`number`,label:`Exposure (EV)`,default:0,min:-3,max:3,step:.1,animatable:!0},offset:{type:`number`,label:`Offset`,default:0,min:-.5,max:.5,step:.01,animatable:!0},gamma:{type:`number`,label:`Gamma`,default:1,min:.2,max:3,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.exposure??0,e.offset??0,e.gamma??1,0])},Zt={id:`gpu-hue-shift`,name:`Hue Shift`,category:`color`,entryPoint:`hueShiftFragment`,uniformSize:16,shader:`
struct HueShiftParams { shift: f32, span: f32, flow: f32, time: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: HueShiftParams;
@fragment
fn hueShiftFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  var hsv = rgb2hsv(color.rgb);
  // span compresses (<1) or expands (>1) the hue range around the shift offset;
  // span = 1 is a plain hue rotation (backward compatible), span = 0 maps every
  // pixel to a single hue (monochrome tint). flow cycles the offset over time.
  hsv.x = fract(params.shift + params.flow * params.time + hsv.x * params.span);
  return vec4f(hsv2rgb(hsv), color.a);
}`,params:{shift:{type:`number`,label:`Shift`,default:0,min:0,max:1,step:.01,animatable:!0},span:{type:`number`,label:`Span`,default:1,min:0,max:2,step:.01,animatable:!0},flow:{type:`number`,label:`Flow`,default:0,min:0,max:2,step:.05,animatable:!1}},packUniforms:(e,t,n,r=0)=>new Float32Array([e.shift??0,e.span??1,e.flow??0,r])},Qt={id:`gpu-invert`,name:`Invert`,category:`color`,entryPoint:`invertFragment`,uniformSize:0,shader:`
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@fragment
fn invertFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  return vec4f(1.0 - color.rgb, color.a);
}`,params:{},packUniforms:()=>null},$t={id:`gpu-levels`,name:`Levels`,category:`color`,entryPoint:`levelsFragment`,uniformSize:32,shader:`
struct LevelsParams {
  inputBlack: f32, inputWhite: f32, gamma: f32, outputBlack: f32,
  outputWhite: f32, _p1: f32, _p2: f32, _p3: f32,
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: LevelsParams;
@fragment
fn levelsFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  var adjusted = (color.rgb - vec3f(params.inputBlack)) /
                 (params.inputWhite - params.inputBlack);
  adjusted = clamp(adjusted, vec3f(0.0), vec3f(1.0));
  adjusted = pow(adjusted, vec3f(1.0 / params.gamma));
  adjusted = mix(vec3f(params.outputBlack), vec3f(params.outputWhite), adjusted);
  return vec4f(adjusted, color.a);
}`,params:{inputBlack:{type:`number`,label:`Input Black`,default:0,min:0,max:1,step:.01,animatable:!0},inputWhite:{type:`number`,label:`Input White`,default:1,min:0,max:1,step:.01,animatable:!0},gamma:{type:`number`,label:`Gamma`,default:1,min:.1,max:3,step:.01,animatable:!0},outputBlack:{type:`number`,label:`Output Black`,default:0,min:0,max:1,step:.01,animatable:!0},outputWhite:{type:`number`,label:`Output White`,default:1,min:0,max:1,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.inputBlack??0,e.inputWhite??1,e.gamma??1,e.outputBlack??0,e.outputWhite??1,0,0,0])},en={id:`gpu-saturation`,name:`Saturation`,category:`color`,entryPoint:`saturationFragment`,uniformSize:16,shader:`
struct SaturationParams { amount: f32, _p1: f32, _p2: f32, _p3: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: SaturationParams;
@fragment
fn saturationFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let gray = luminance601(color.rgb);
  let adjusted = mix(vec3f(gray), color.rgb, params.amount);
  return vec4f(clamp(adjusted, vec3f(0.0), vec3f(1.0)), color.a);
}`,params:{amount:{type:`number`,label:`Amount`,default:1,min:0,max:3,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.amount??1,0,0,0])},tn={id:`gpu-temperature`,name:`Temperature`,category:`color`,entryPoint:`temperatureFragment`,uniformSize:16,shader:`
struct TemperatureParams { temperature: f32, tint: f32, _p1: f32, _p2: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: TemperatureParams;
@fragment
fn temperatureFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  var adjusted = color.rgb;
  adjusted.r += params.temperature * 0.1;
  adjusted.b -= params.temperature * 0.1;
  adjusted.g -= params.tint * 0.1;
  adjusted.r += params.tint * 0.05;
  adjusted.b += params.tint * 0.05;
  return vec4f(clamp(adjusted, vec3f(0.0), vec3f(1.0)), color.a);
}`,params:{temperature:{type:`number`,label:`Temperature`,default:0,min:-1,max:1,step:.01,animatable:!0},tint:{type:`number`,label:`Tint`,default:0,min:-1,max:1,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.temperature??0,e.tint??0,0,0])},nn={id:`gpu-grayscale`,name:`Grayscale`,category:`color`,entryPoint:`grayscaleFragment`,uniformSize:16,shader:`
struct GrayscaleParams { amount: f32, _p1: f32, _p2: f32, _p3: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: GrayscaleParams;
@fragment
fn grayscaleFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let gray = luminance601(color.rgb);
  let adjusted = mix(color.rgb, vec3f(gray), params.amount);
  return vec4f(adjusted, color.a);
}`,params:{amount:{type:`number`,label:`Amount`,default:1,min:0,max:1,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.amount??1,0,0,0])},rn={id:`gpu-sepia`,name:`Sepia`,category:`color`,entryPoint:`sepiaFragment`,uniformSize:16,shader:`
struct SepiaParams { amount: f32, _p1: f32, _p2: f32, _p3: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: SepiaParams;
@fragment
fn sepiaFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let sepiaR = dot(color.rgb, vec3f(0.393, 0.769, 0.189));
  let sepiaG = dot(color.rgb, vec3f(0.349, 0.686, 0.168));
  let sepiaB = dot(color.rgb, vec3f(0.272, 0.534, 0.131));
  let sepiaColor = vec3f(sepiaR, sepiaG, sepiaB);
  let adjusted = mix(color.rgb, sepiaColor, params.amount);
  return vec4f(clamp(adjusted, vec3f(0.0), vec3f(1.0)), color.a);
}`,params:{amount:{type:`number`,label:`Amount`,default:1,min:0,max:1,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.amount??1,0,0,0])},an={id:`gpu-curves`,name:`Curves`,category:`color`,entryPoint:`curvesFragment`,uniformSize:0,shader:`
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(3) var curveLut: texture_2d<f32>;

fn sampleCurveLut(value: f32) -> vec3f {
  let lutWidth = 256.0;
  let u = (clamp(value, 0.0, 1.0) * (lutWidth - 1.0) + 0.5) / lutWidth;
  return textureSample(curveLut, texSampler, vec2f(u, 0.5)).rgb;
}

@fragment
fn curvesFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let c = vec3f(
    sampleCurveLut(color.r).r,
    sampleCurveLut(color.g).g,
    sampleCurveLut(color.b).b,
  );
  return vec4f(c, color.a);
}`,params:Object.fromEntries([...Tt.flatMap(e=>{let t=Ft(e),n=It(),r=e.charAt(0).toUpperCase()+e.slice(1);return[[t.shadowX,{type:`number`,label:`${r} Shadow X`,default:n.shadow.x,min:0,max:1,step:.001,animatable:!0}],[t.shadowY,{type:`number`,label:`${r} Shadow Y`,default:n.shadow.y,min:0,max:1,step:.001,animatable:!0}],[t.highlightX,{type:`number`,label:`${r} Highlight X`,default:n.highlight.x,min:0,max:1,step:.001,animatable:!0}],[t.highlightY,{type:`number`,label:`${r} Highlight Y`,default:n.highlight.y,min:0,max:1,step:.001,animatable:!0}]]}),...Tt.map(e=>{let t=e.charAt(0).toUpperCase()+e.slice(1);return[Bt(e),{type:`json`,label:`${t} Points`,default:``}]})]),packUniforms:()=>null,dataTexture:{dimension:`2d`,key:Gt,build:e=>({width:256,height:1,depth:1,data:Wt(e)})}},on={id:`gpu-color-wheels`,name:`Color Wheels`,category:`color`,entryPoint:`colorWheelsFragment`,uniformSize:112,shader:`
struct WheelsParams {
  shHue: f32, shAmount: f32, midHue: f32, midAmount: f32,
  hlHue: f32, hlAmount: f32, temperature: f32, tint: f32,
  saturation: f32, exposure: f32, contrast: f32, pivot: f32,
  lift: f32, gamma: f32, gain: f32, offset: f32,
  blackPoint: f32, whitePoint: f32, offHue: f32, offAmount: f32,
  midDetail: f32, colorBoost: f32, shadows: f32, highlights: f32,
  hue: f32, lumMix: f32, _pad1: f32, _pad2: f32,
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: WheelsParams;

fn wheelTint(color: vec3f, hue: f32, amount: f32, mask: f32) -> vec3f {
  if (amount < 0.001) { return color; }
  let rad = hue * TAU / 360.0;
  let tintColor = hsv2rgb(vec3f(hue / 360.0, 1.0, 1.0));
  return mix(color, color * mix(vec3f(1.0), tintColor, amount), mask);
}

@fragment
fn colorWheelsFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  var c = color.rgb;
  let luma = luminance601(c);
  let shadowMask = 1.0 - smoothstep(0.0, 0.5, luma);
  let highlightMask = smoothstep(0.5, 1.0, luma);
  let midtoneMask = 1.0 - shadowMask - highlightMask;
  c = wheelTint(c, params.shHue, params.shAmount, shadowMask);
  c = wheelTint(c, params.midHue, params.midAmount, midtoneMask);
  c = wheelTint(c, params.hlHue, params.hlAmount, highlightMask);
  c = wheelTint(c, params.offHue, params.offAmount, 1.0);
  let temp = params.temperature / 100.0;
  c.r += temp * 0.1;
  c.b -= temp * 0.1;
  let ti = params.tint / 100.0;
  c.g -= ti * 0.1;
  c.r += ti * 0.05;
  c.b += ti * 0.05;

  c *= pow(2.0, params.exposure);
  c = (c - vec3f(params.pivot)) * params.contrast + vec3f(params.pivot);
  if (abs(params.midDetail) > 0.001) {
    let detailLuma = luminance601(c);
    let detailAdjusted = vec3f(detailLuma) +
      (c - vec3f(detailLuma)) * (1.0 + params.midDetail / 100.0);
    c = mix(c, detailAdjusted, midtoneMask);
  }
  c = (c + vec3f(params.lift) + vec3f(params.offset)) * params.gain;
  c = pow(max(c, vec3f(0.0)), vec3f(1.0 / max(params.gamma, 0.05)));
  c = (c - vec3f(params.blackPoint)) /
      vec3f(max(params.whitePoint - params.blackPoint, 0.001));
  c += vec3f(params.shadows / 100.0) * shadowMask;
  c += vec3f(params.highlights / 100.0) * highlightMask;

  let sat = 1.0 + params.saturation / 100.0;
  let gray = luminance601(c);
  c = mix(vec3f(gray), c, sat);
  let colorBoost = params.colorBoost / 100.0;
  if (abs(colorBoost) > 0.001) {
    let boostedGray = luminance601(c);
    let chroma = c - vec3f(boostedGray);
    c = vec3f(boostedGray) + chroma * (1.0 + colorBoost * (1.0 - clamp(length(chroma), 0.0, 1.0)));
  }
  if (abs(params.hue - 50.0) > 0.001) {
    var hsv = rgb2hsv(c);
    hsv.x = fract(hsv.x + ((params.hue - 50.0) / 100.0));
    c = hsv2rgb(hsv);
  }
  let postLuma = luminance601(c);
  c = mix(vec3f(postLuma), c, clamp(params.lumMix / 100.0, 0.0, 1.0));
  return vec4f(clamp(c, vec3f(0.0), vec3f(1.0)), color.a);
}`,params:{shadowsHue:{type:`number`,label:`Lift Hue`,default:0,min:0,max:360,step:1,animatable:!0},shadowsAmount:{type:`number`,label:`Lift Amount`,default:0,min:0,max:1,step:.01,animatable:!0},midtonesHue:{type:`number`,label:`Gamma Hue`,default:0,min:0,max:360,step:1,animatable:!0},midtonesAmount:{type:`number`,label:`Gamma Amount`,default:0,min:0,max:1,step:.01,animatable:!0},highlightsHue:{type:`number`,label:`Gain Hue`,default:0,min:0,max:360,step:1,animatable:!0},highlightsAmount:{type:`number`,label:`Gain Amount`,default:0,min:0,max:1,step:.01,animatable:!0},offsetHue:{type:`number`,label:`Offset Hue`,default:0,min:0,max:360,step:1,animatable:!0},offsetAmount:{type:`number`,label:`Offset Amount`,default:0,min:0,max:1,step:.01,animatable:!0},temperature:{type:`number`,label:`Temperature`,default:0,min:-100,max:100,step:1,animatable:!0},tint:{type:`number`,label:`Tint`,default:0,min:-100,max:100,step:1,animatable:!0},saturation:{type:`number`,label:`Saturation`,default:0,min:-100,max:100,step:1,animatable:!0},exposure:{type:`number`,label:`Exposure`,default:0,min:-3,max:3,step:.05,animatable:!0},contrast:{type:`number`,label:`Contrast`,default:1,min:0,max:2,step:.01,animatable:!0},pivot:{type:`number`,label:`Pivot`,default:.5,min:0,max:1,step:.01,animatable:!0},lift:{type:`number`,label:`Lift`,default:0,min:-2,max:2,step:.01,animatable:!0},gamma:{type:`number`,label:`Gamma`,default:1,min:0,max:4,step:.01,animatable:!0},gain:{type:`number`,label:`Gain`,default:1,min:0,max:16,step:.01,animatable:!0},offset:{type:`number`,label:`Offset`,default:0,min:-2,max:2,step:.0025,animatable:!0},blackPoint:{type:`number`,label:`Black Point`,default:0,min:0,max:.5,step:.005,animatable:!0},whitePoint:{type:`number`,label:`White Point`,default:1,min:.5,max:1.5,step:.005,animatable:!0},midDetail:{type:`number`,label:`Mid/Detail`,default:0,min:-100,max:100,step:1,animatable:!0},colorBoost:{type:`number`,label:`Color Boost`,default:0,min:-100,max:100,step:1,animatable:!0},shadows:{type:`number`,label:`Shadows`,default:0,min:-100,max:100,step:1,animatable:!0},highlights:{type:`number`,label:`Highlights`,default:0,min:-100,max:100,step:1,animatable:!0},hue:{type:`number`,label:`Hue`,default:50,min:0,max:100,step:1,animatable:!0},lumMix:{type:`number`,label:`Lum Mix`,default:100,min:0,max:100,step:1,animatable:!0}},packUniforms:e=>new Float32Array(sn.map(([t,n])=>k(e,t,n)))},sn=[[`shadowsHue`,0],[`shadowsAmount`,0],[`midtonesHue`,0],[`midtonesAmount`,0],[`highlightsHue`,0],[`highlightsAmount`,0],[`temperature`,0],[`tint`,0],[`saturation`,0],[`exposure`,0],[`contrast`,1],[`pivot`,.5],[`lift`,0],[`gamma`,1],[`gain`,1],[`offset`,0],[`blackPoint`,0],[`whitePoint`,1],[`offsetHue`,0],[`offsetAmount`,0],[`midDetail`,0],[`colorBoost`,0],[`shadows`,0],[`highlights`,0],[`hue`,50],[`lumMix`,100],[`_pad1`,0],[`_pad2`,0]],cn={id:`gpu-secondary-qualifier`,name:`Secondary Qualifier`,category:`color`,entryPoint:`secondaryQualifierFragment`,uniformSize:64,shader:`
struct SecondaryQualifierParams {
  hueCenter: f32, hueWidth: f32, hueSoftness: f32, satLow: f32,
  satHigh: f32, satSoftness: f32, lumaLow: f32, lumaHigh: f32,
  lumaSoftness: f32, invertMask: f32, showMask: f32, exposure: f32,
  saturation: f32, temperature: f32, tint: f32, strength: f32,
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: SecondaryQualifierParams;

fn circularHueDistance(hue: f32, center: f32) -> f32 {
  let diff = abs(hue - center);
  return min(diff, 1.0 - diff);
}

fn centeredRangeMask(value: f32, lowValue: f32, highValue: f32, softness: f32) -> f32 {
  let low = min(lowValue, highValue);
  let high = max(lowValue, highValue);
  let soft = max(softness, 0.0001);
  let lowMask = smoothstep(low - soft, low, value);
  let highMask = 1.0 - smoothstep(high, high + soft, value);
  return clamp(lowMask * highMask, 0.0, 1.0);
}

@fragment
fn secondaryQualifierFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let hsv = rgb2hsv(color.rgb);
  let luma = luminance601(color.rgb);
  let hueDistance = circularHueDistance(hsv.x, fract(params.hueCenter / 360.0));
  let hueWidth = clamp(params.hueWidth / 360.0, 0.0, 0.5);
  let hueSoftness = max(params.hueSoftness / 360.0, 0.0001);
  var mask = 1.0 - smoothstep(hueWidth, hueWidth + hueSoftness, hueDistance);
  mask *= centeredRangeMask(hsv.y, params.satLow, params.satHigh, params.satSoftness);
  mask *= centeredRangeMask(luma, params.lumaLow, params.lumaHigh, params.lumaSoftness);
  if (params.invertMask > 0.5) {
    mask = 1.0 - mask;
  }
  mask = clamp(mask * params.strength, 0.0, 1.0);

  if (params.showMask > 0.5) {
    return vec4f(vec3f(mask), color.a);
  }

  var corrected = color.rgb;
  corrected *= pow(2.0, params.exposure);
  let temp = params.temperature / 100.0;
  corrected.r += temp * 0.1;
  corrected.b -= temp * 0.1;
  let ti = params.tint / 100.0;
  corrected.g -= ti * 0.1;
  corrected.r += ti * 0.05;
  corrected.b += ti * 0.05;
  let sat = 1.0 + params.saturation / 100.0;
  let gray = luminance601(corrected);
  corrected = mix(vec3f(gray), corrected, sat);

  return vec4f(clamp(mix(color.rgb, corrected, mask), vec3f(0.0), vec3f(1.0)), color.a);
}`,params:{hueCenter:{type:`number`,label:`Hue Center`,default:0,min:0,max:360,step:1,animatable:!0},hueWidth:{type:`number`,label:`Hue Width`,default:35,min:0,max:180,step:1,animatable:!0},hueSoftness:{type:`number`,label:`Hue Softness`,default:20,min:0,max:120,step:1,animatable:!0},satLow:{type:`number`,label:`Sat Low`,default:0,min:0,max:1,step:.01,animatable:!0},satHigh:{type:`number`,label:`Sat High`,default:1,min:0,max:1,step:.01,animatable:!0},satSoftness:{type:`number`,label:`Sat Softness`,default:.1,min:0,max:1,step:.01,animatable:!0},lumaLow:{type:`number`,label:`Luma Low`,default:0,min:0,max:1,step:.01,animatable:!0},lumaHigh:{type:`number`,label:`Luma High`,default:1,min:0,max:1,step:.01,animatable:!0},lumaSoftness:{type:`number`,label:`Luma Softness`,default:.1,min:0,max:1,step:.01,animatable:!0},invertMask:{type:`boolean`,label:`Invert Mask`,default:!1},showMask:{type:`boolean`,label:`Show Mask`,default:!1},exposure:{type:`number`,label:`Exposure`,default:0,min:-3,max:3,step:.05,animatable:!0},saturation:{type:`number`,label:`Saturation`,default:0,min:-100,max:100,step:1,animatable:!0},temperature:{type:`number`,label:`Temperature`,default:0,min:-100,max:100,step:1,animatable:!0},tint:{type:`number`,label:`Tint`,default:0,min:-100,max:100,step:1,animatable:!0},strength:{type:`number`,label:`Strength`,default:1,min:0,max:1,step:.01,animatable:!0}},packUniforms:e=>new Float32Array(ln.map(([t,n])=>{let r=e[t];return typeof r==`boolean`?+!!r:typeof r==`number`?r:n}))},ln=[[`hueCenter`,0],[`hueWidth`,35],[`hueSoftness`,20],[`satLow`,0],[`satHigh`,1],[`satSoftness`,.1],[`lumaLow`,0],[`lumaHigh`,1],[`lumaSoftness`,.1],[`invertMask`,0],[`showMask`,0],[`exposure`,0],[`saturation`,0],[`temperature`,0],[`tint`,0],[`strength`,1]],un={ellipse:0,rectangle:1},dn={id:`gpu-power-window`,name:`Power Window`,category:`color`,entryPoint:`powerWindowFragment`,uniformSize:64,shader:`
struct PowerWindowParams {
  shapeKind: f32, centerX: f32, centerY: f32, sizeX: f32,
  sizeY: f32, rotation: f32, feather: f32, invertMask: f32,
  showMask: f32, exposure: f32, saturation: f32, temperature: f32,
  tint: f32, strength: f32, sourceWidth: f32, sourceHeight: f32,
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: PowerWindowParams;

fn rotateWindowPoint(point: vec2f, angleDeg: f32) -> vec2f {
  let angle = -angleDeg * PI / 180.0;
  let c = cos(angle);
  let s = sin(angle);
  return vec2f(point.x * c - point.y * s, point.x * s + point.y * c);
}

fn powerWindowMask(uv: vec2f) -> f32 {
  let aspect = max(params.sourceWidth / max(params.sourceHeight, 1.0), 0.0001);
  var local = uv - vec2f(params.centerX, params.centerY);
  local.x *= aspect;
  local = rotateWindowPoint(local, params.rotation);

  let size = max(vec2f(params.sizeX * aspect, params.sizeY) * 0.5, vec2f(0.0001));
  let normalized = local / size;
  let shapeKind = i32(params.shapeKind + 0.5);
  var dist = length(normalized);
  if (shapeKind == 1) {
    dist = max(abs(normalized.x), abs(normalized.y));
  }
  let feather = clamp(params.feather, 0.001, 1.0);
  return clamp(1.0 - smoothstep(1.0 - feather, 1.0, dist), 0.0, 1.0);
}

@fragment
fn powerWindowFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  var mask = powerWindowMask(input.uv);
  if (params.invertMask > 0.5) {
    mask = 1.0 - mask;
  }
  mask = clamp(mask * params.strength, 0.0, 1.0);

  if (params.showMask > 0.5) {
    return vec4f(vec3f(mask), color.a);
  }

  var corrected = color.rgb;
  corrected *= pow(2.0, params.exposure);
  let temp = params.temperature / 100.0;
  corrected.r += temp * 0.1;
  corrected.b -= temp * 0.1;
  let ti = params.tint / 100.0;
  corrected.g -= ti * 0.1;
  corrected.r += ti * 0.05;
  corrected.b += ti * 0.05;
  let sat = 1.0 + params.saturation / 100.0;
  let gray = luminance601(corrected);
  corrected = mix(vec3f(gray), corrected, sat);

  return vec4f(clamp(mix(color.rgb, corrected, mask), vec3f(0.0), vec3f(1.0)), color.a);
}`,params:{shape:{type:`select`,label:`Shape`,default:`ellipse`,options:[{value:`ellipse`,label:`Ellipse`},{value:`rectangle`,label:`Rectangle`}]},centerX:{type:`number`,label:`Center X`,default:.5,min:0,max:1,step:.01,animatable:!0},centerY:{type:`number`,label:`Center Y`,default:.5,min:0,max:1,step:.01,animatable:!0},sizeX:{type:`number`,label:`Width`,default:.5,min:.02,max:1.5,step:.01,animatable:!0},sizeY:{type:`number`,label:`Height`,default:.5,min:.02,max:1.5,step:.01,animatable:!0},rotation:{type:`number`,label:`Rotation`,default:0,min:-180,max:180,step:1,animatable:!0},feather:{type:`number`,label:`Feather`,default:.3,min:0,max:1,step:.01,animatable:!0},invertMask:{type:`boolean`,label:`Invert Mask`,default:!1},showMask:{type:`boolean`,label:`Show Mask`,default:!1},exposure:{type:`number`,label:`Exposure`,default:.3,min:-3,max:3,step:.05,animatable:!0},saturation:{type:`number`,label:`Saturation`,default:0,min:-100,max:100,step:1,animatable:!0},temperature:{type:`number`,label:`Temperature`,default:0,min:-100,max:100,step:1,animatable:!0},tint:{type:`number`,label:`Tint`,default:0,min:-100,max:100,step:1,animatable:!0},strength:{type:`number`,label:`Strength`,default:1,min:0,max:1,step:.01,animatable:!0}},packUniforms:(e,t,n)=>new Float32Array([un[e.shape]??0,k(e,`centerX`,.5),k(e,`centerY`,.5),k(e,`sizeX`,.5),k(e,`sizeY`,.5),k(e,`rotation`,0),k(e,`feather`,.3),+(e.invertMask===!0),+(e.showMask===!0),k(e,`exposure`,.3),k(e,`saturation`,0),k(e,`temperature`,0),k(e,`tint`,0),k(e,`strength`,1),t,n])},fn={id:`gpu-vibrance`,name:`Vibrance`,category:`color`,entryPoint:`vibranceFragment`,uniformSize:16,shader:`
struct VibranceParams { amount: f32, _p1: f32, _p2: f32, _p3: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: VibranceParams;
@fragment
fn vibranceFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let maxC = max(max(color.r, color.g), color.b);
  let minC = min(min(color.r, color.g), color.b);
  let sat = (maxC - minC) / (maxC + 0.001);
  let vibrance = params.amount * (1.0 - sat);
  let gray = luminance601(color.rgb);
  let adjusted = mix(vec3f(gray), color.rgb, 1.0 + vibrance);
  return vec4f(clamp(adjusted, vec3f(0.0), vec3f(1.0)), color.a);
}`,params:{amount:{type:`number`,label:`Amount`,default:0,min:-1,max:1,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.amount??0,0,0,0])},pn={inferno:[`#000004`,`#420a68`,`#932667`,`#dd513a`,`#fca50a`,`#f0f921`],magma:[`#000004`,`#3b0f70`,`#8c2981`,`#de4968`,`#fe9f6d`,`#fcfdbf`],plasma:[`#0d0887`,`#6a00a8`,`#b12a90`,`#e16462`,`#fca636`,`#f0f921`],viridis:[`#440154`,`#3b528b`,`#21918c`,`#5ec962`,`#fde725`],turbo:[`#30123b`,`#4675ed`,`#1bcfd4`,`#a4fc3b`,`#fe9b2d`,`#cb2a04`,`#7a0403`],fire:[`#000000`,`#7a0000`,`#ff4800`,`#ffd000`,`#ffffff`],ice:[`#000010`,`#003b6f`,`#1b78c2`,`#7ec8ff`,`#ffffff`],sunset:[`#241634`,`#c2456b`,`#ffd9a0`],grayscale:[`#000000`,`#ffffff`]},mn=pn.inferno.join(`, `);function hn(e,t){let n=(e===`custom`?t.split(`,`).map(e=>e.trim()).filter(e=>e.length>0):pn[e]??pn.inferno).map(e=>qt(e,[0,0,0]));return n.length===0?[[0,0,0],[1,1,1]]:n.length===1?[n[0],n[0]]:n}function gn(e){let t=/* @__PURE__ */ new Uint8Array(1024),n=e.length-1;for(let r=0;r<256;r++){let i=r/255*n,a=Math.min(Math.floor(i),n-1),o=i-a,s=e[a],c=e[a+1];t[r*4]=Math.round((s[0]+(c[0]-s[0])*o)*255),t[r*4+1]=Math.round((s[1]+(c[1]-s[1])*o)*255),t[r*4+2]=Math.round((s[2]+(c[2]-s[2])*o)*255),t[r*4+3]=255}return{width:256,height:1,depth:1,data:t}}const _n={id:`gpu-gradient-map`,name:`Gradient Map`,category:`color`,entryPoint:`gradientMapFragment`,uniformSize:16,shader:`
struct GradientMapParams { mix: f32, _p1: f32, _p2: f32, _p3: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: GradientMapParams;
@group(0) @binding(3) var gradientLut: texture_2d<f32>;
@fragment
fn gradientMapFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let lum = clamp(luminance601(color.rgb), 0.0, 1.0);
  let mapped = textureSampleLevel(gradientLut, texSampler, vec2f(lum, 0.5), 0.0).rgb;
  let outRgb = mix(color.rgb, mapped, clamp(params.mix, 0.0, 1.0));
  return vec4f(outRgb, color.a);
}`,params:{preset:{type:`select`,label:`Palette`,default:`inferno`,options:[{value:`inferno`,label:`Inferno`},{value:`magma`,label:`Magma`},{value:`plasma`,label:`Plasma`},{value:`viridis`,label:`Viridis`},{value:`turbo`,label:`Turbo`},{value:`fire`,label:`Fire`},{value:`ice`,label:`Ice`},{value:`sunset`,label:`Sunset`},{value:`grayscale`,label:`Grayscale`},{value:`custom`,label:`Custom`}]},customStops:{type:`text`,label:`Custom Stops`,default:mn,visibleWhen:e=>e.preset===`custom`},mix:{type:`number`,label:`Mix`,default:1,min:0,max:1,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([k(e,`mix`,1),0,0,0]),dataTexture:{dimension:`2d`,key:e=>{let t=e.preset??`inferno`;return t===`custom`?`custom:${e.customStops??``}`:`preset:${t}`},build:e=>gn(hn(e.preset??`inferno`,e.customStops??``))}};function vn(e){let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return n}function yn(e){let t=new Uint8Array(e*e*e*4),n=e>1?e-1:1,r=0;for(let i=0;i<e;i++){let a=Math.round(i/n*255);for(let i=0;i<e;i++){let o=Math.round(i/n*255);for(let i=0;i<e;i++)t[r]=Math.round(i/n*255),t[r+1]=o,t[r+2]=a,t[r+3]=255,r+=4}}return t}var bn=/* @__PURE__ */ e({lut3d:()=>xn});const xn={id:`gpu-lut`,name:`LUT (.cube)`,category:`color`,entryPoint:`lutFragment`,uniformSize:16,shader:`
struct LutParams { intensity: f32, size: f32, _p2: f32, _p3: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: LutParams;
@group(0) @binding(3) var lutTex: texture_3d<f32>;
@fragment
fn lutFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let size = max(params.size, 2.0);
  let coords = (clamp(color.rgb, vec3f(0.0), vec3f(1.0)) * (size - 1.0) + vec3f(0.5)) / size;
  let graded = textureSample(lutTex, texSampler, coords).rgb;
  return vec4f(mix(color.rgb, graded, clamp(params.intensity, 0.0, 1.0)), color.a);
}`,params:{intensity:{type:`number`,label:`Intensity`,default:1,min:0,max:1,step:.01,animatable:!0},lutName:{type:`json`,label:`LUT Name`,default:``},lutSize:{type:`json`,label:`LUT Size`,default:`0`},lutData:{type:`json`,label:`LUT Data`,default:``}},packUniforms:e=>{let t=typeof e.intensity==`number`?e.intensity:1,n=Sn(e);return new Float32Array([t,n,0,0])},dataTexture:{dimension:`3d`,key:e=>typeof e.lutData==`string`?e.lutData:``,build:e=>{let t=Sn(e),n=typeof e.lutData==`string`?e.lutData:``;if(t>=2&&n.length>0)try{let e=vn(n);if(e.length===t*t*t*4)return{width:t,height:t,depth:t,data:e}}catch{}return{width:2,height:2,depth:2,data:yn(2)}}}};function Sn(e){let t=e.lutSize,n=typeof t==`number`?t:typeof t==`string`?Number(t):0;return!Number.isFinite(n)||n<2||n>129?2:Math.floor(n)}var Cn=/* @__PURE__ */ e({boxBlur:()=>Tn,gaussianBlur:()=>wn,motionBlur:()=>En,radialBlur:()=>Dn,zoomBlur:()=>On});const wn={id:`gpu-gaussian-blur`,name:`Gaussian Blur`,category:`blur`,entryPoint:`gaussianBlurFragment`,uniformSize:16,shader:`
struct GaussianBlurParams { radius: f32, width: f32, height: f32, samples: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: GaussianBlurParams;
@fragment
fn gaussianBlurFragment(input: VertexOutput) -> @location(0) vec4f {
  if (params.radius < 0.5) {
    return textureSample(inputTex, texSampler, input.uv);
  }
  let texelSize = vec2f(1.0 / params.width, 1.0 / params.height);
  let sampleRadius = i32(clamp(params.samples, 1.0, 64.0));
  var color = vec4f(0.0);
  var totalWeight = 0.0;
  let sigma = params.radius / 3.0;
  let twoSigmaSq = 2.0 * sigma * sigma;
  for (var x = -sampleRadius; x <= sampleRadius; x++) {
    for (var y = -sampleRadius; y <= sampleRadius; y++) {
      let offset = vec2f(f32(x), f32(y)) * texelSize * (params.radius / f32(sampleRadius));
      let distSq = f32(x * x + y * y);
      let weight = exp(-distSq / twoSigmaSq);
      color += textureSample(inputTex, texSampler, input.uv + offset) * weight;
      totalWeight += weight;
    }
  }
  return color / totalWeight;
}`,params:{radius:{type:`number`,label:`Radius`,default:10,min:0,max:50,step:1,animatable:!0},samples:{type:`number`,label:`Samples`,default:5,min:1,max:64,step:1,animatable:!1,quality:!0}},packUniforms:(e,t,n)=>new Float32Array([e.radius??10,t,n,e.samples??5])},Tn={id:`gpu-box-blur`,name:`Box Blur`,category:`blur`,entryPoint:`boxBlurFragment`,uniformSize:16,shader:`
struct BoxBlurParams { radius: f32, width: f32, height: f32, _pad: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: BoxBlurParams;
@fragment
fn boxBlurFragment(input: VertexOutput) -> @location(0) vec4f {
  if (params.radius < 0.5) {
    return textureSample(inputTex, texSampler, input.uv);
  }
  let texelSize = vec2f(1.0 / params.width, 1.0 / params.height);
  let samples = i32(params.radius);
  var color = vec4f(0.0);
  var count = 0.0;
  for (var x = -samples; x <= samples; x++) {
    for (var y = -samples; y <= samples; y++) {
      let offset = vec2f(f32(x), f32(y)) * texelSize;
      color += textureSample(inputTex, texSampler, input.uv + offset);
      count += 1.0;
    }
  }
  return color / count;
}`,params:{radius:{type:`number`,label:`Radius`,default:5,min:0,max:20,step:1,animatable:!0}},packUniforms:(e,t,n)=>new Float32Array([e.radius??5,t,n,0])},En={id:`gpu-motion-blur`,name:`Motion Blur`,category:`blur`,entryPoint:`motionBlurFragment`,uniformSize:32,shader:`
struct MotionBlurParams {
  amount: f32,
  angle: f32,
  shutterAngle: f32,
  samples: f32,
  maxRadius: f32,
  _pad0: f32,
  _pad1: f32,
  _pad2: f32,
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: MotionBlurParams;
@fragment
fn motionBlurFragment(input: VertexOutput) -> @location(0) vec4f {
  let exposure = clamp(params.shutterAngle / 360.0, 0.0, 1.0);
  let radius = min(max(params.amount, 0.0) * exposure, params.maxRadius);
  if (radius < 0.001 || exposure < 0.001) {
    return textureSample(inputTex, texSampler, input.uv);
  }
  let direction = vec2f(cos(params.angle), sin(params.angle));
  // Quality is deliberately bounded: shutter blur is on a per-layer hot path.
  let samples = i32(clamp(params.samples, 4.0, 32.0));
  var color = vec4f(0.0);
  var totalWeight = 0.0;
  for (var i = 0; i < samples; i++) {
    let t = (f32(i) / f32(samples - 1) - 0.5) * 2.0;
    let offset = direction * t * radius;
    let weight = exp(-t * t * 2.0);
    color += textureSample(inputTex, texSampler, input.uv + offset) * weight;
    totalWeight += weight;
  }
  return color / totalWeight;
}`,params:{amount:{type:`number`,label:`Amount`,default:.05,min:0,max:.3,step:.005,animatable:!0},angle:{type:`number`,label:`Angle`,default:0,min:0,max:6.28318,step:.01,animatable:!0},samples:{type:`number`,label:`Samples`,default:16,min:4,max:32,step:1,animatable:!1,quality:!0},shutterAngle:{type:`number`,label:`Shutter Angle`,default:180,min:0,max:360,step:1,animatable:!0}},packUniforms:e=>new Float32Array([e.amount??.05,e.angle??0,e.shutterAngle??(Object.keys(e).length>0?360:180),e.samples??16,.2,0,0,0])},Dn={id:`gpu-radial-blur`,name:`Radial Blur`,category:`blur`,entryPoint:`radialBlurFragment`,uniformSize:16,shader:`
struct RadialBlurParams { amount: f32, centerX: f32, centerY: f32, samples: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: RadialBlurParams;
@fragment
fn radialBlurFragment(input: VertexOutput) -> @location(0) vec4f {
  let center = vec2f(params.centerX, params.centerY);
  let dir = input.uv - center;
  let dist = length(dir);
  if (params.amount < 0.01) {
    return textureSample(inputTex, texSampler, input.uv);
  }
  var color = vec4f(0.0);
  let samples = i32(clamp(params.samples, 4.0, 256.0));
  let amount = params.amount * 0.2;
  var totalWeight = 0.0;
  for (var i = 0; i < samples; i++) {
    let t = f32(i) / f32(samples - 1);
    let scale = 1.0 - amount * t * dist;
    let weight = 1.0 - t * 0.5;
    let samplePos = center + dir * scale;
    color += textureSample(inputTex, texSampler, samplePos) * weight;
    totalWeight += weight;
  }
  return color / totalWeight;
}`,params:{amount:{type:`number`,label:`Amount`,default:.5,min:0,max:2,step:.01,animatable:!0},centerX:{type:`number`,label:`Center X`,default:.5,min:0,max:1,step:.01,animatable:!0},centerY:{type:`number`,label:`Center Y`,default:.5,min:0,max:1,step:.01,animatable:!0},samples:{type:`number`,label:`Samples`,default:32,min:4,max:256,step:1,animatable:!1,quality:!0}},packUniforms:e=>new Float32Array([e.amount??.5,e.centerX??.5,e.centerY??.5,e.samples??32])},On={id:`gpu-zoom-blur`,name:`Zoom Blur`,category:`blur`,entryPoint:`zoomBlurFragment`,uniformSize:16,shader:`
struct ZoomBlurParams { amount: f32, centerX: f32, centerY: f32, samples: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: ZoomBlurParams;
@fragment
fn zoomBlurFragment(input: VertexOutput) -> @location(0) vec4f {
  let center = vec2f(params.centerX, params.centerY);
  let dir = input.uv - center;
  var color = vec4f(0.0);
  let samples = i32(clamp(params.samples, 4.0, 256.0));
  let amount = params.amount * 0.5;
  for (var i = 0; i < samples; i++) {
    let t = f32(i) / f32(samples - 1);
    let scale = 1.0 + amount * t;
    let samplePos = center + dir * scale;
    color += textureSample(inputTex, texSampler, samplePos);
  }
  return color / f32(samples);
}`,params:{amount:{type:`number`,label:`Amount`,default:.3,min:0,max:1,step:.01,animatable:!0},centerX:{type:`number`,label:`Center X`,default:.5,min:0,max:1,step:.01,animatable:!0},centerY:{type:`number`,label:`Center Y`,default:.5,min:0,max:1,step:.01,animatable:!0},samples:{type:`number`,label:`Samples`,default:16,min:4,max:256,step:1,animatable:!1,quality:!0}},packUniforms:e=>new Float32Array([e.amount??.3,e.centerX??.5,e.centerY??.5,e.samples??16])};var kn=/* @__PURE__ */ e({blocks:()=>Vn,bulge:()=>Fn,droste:()=>Hn,flutedGlass:()=>Rn,glassMosaic:()=>Bn,kaleidoscope:()=>In,mirror:()=>Ln,pixelate:()=>An,rgbSplit:()=>jn,rippleGlass:()=>zn,triggerWave:()=>Pn,twirl:()=>Mn,wave:()=>Nn});function A(e,t){if(!e.startsWith(`#`))return t;let n=e.slice(1);if(n.length===3||n.length===4){let e=n.split(``).map(e=>parseInt(e+e,16)/255);return e.slice(0,3).every(e=>Number.isFinite(e))?[e[0]??t[0],e[1]??t[1],e[2]??t[2],e[3]??1]:t}if(n.length===6||n.length===8){let e=[parseInt(n.slice(0,2),16)/255,parseInt(n.slice(2,4),16)/255,parseInt(n.slice(4,6),16)/255,n.length===8?parseInt(n.slice(6,8),16)/255:1];if(e.every(e=>Number.isFinite(e)))return e}return t}const An={id:`gpu-pixelate`,name:`Pixelate`,category:`distort`,entryPoint:`pixelateFragment`,uniformSize:16,shader:`
struct PixelateParams { pixelSize: f32, width: f32, height: f32, _p: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: PixelateParams;
@fragment
fn pixelateFragment(input: VertexOutput) -> @location(0) vec4f {
  let pixelX = params.pixelSize / params.width;
  let pixelY = params.pixelSize / params.height;
  let uv = vec2f(
    floor(input.uv.x / pixelX) * pixelX + pixelX * 0.5,
    floor(input.uv.y / pixelY) * pixelY + pixelY * 0.5
  );
  return textureSample(inputTex, texSampler, uv);
}`,params:{size:{type:`number`,label:`Pixel Size`,default:8,min:1,max:64,step:1,animatable:!0}},packUniforms:(e,t,n)=>new Float32Array([e.size??8,t,n,0])},jn={id:`gpu-rgb-split`,name:`RGB Split`,category:`distort`,entryPoint:`rgbSplitFragment`,uniformSize:16,shader:`
struct RGBSplitParams { amount: f32, angle: f32, _p1: f32, _p2: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: RGBSplitParams;
@fragment
fn rgbSplitFragment(input: VertexOutput) -> @location(0) vec4f {
  let offset = vec2f(cos(params.angle), sin(params.angle)) * params.amount;
  let r = textureSample(inputTex, texSampler, input.uv + offset).r;
  let g = textureSample(inputTex, texSampler, input.uv).g;
  let b = textureSample(inputTex, texSampler, input.uv - offset).b;
  let a = textureSample(inputTex, texSampler, input.uv).a;
  return vec4f(r, g, b, a);
}`,params:{amount:{type:`number`,label:`Amount`,default:.01,min:0,max:.1,step:.001,animatable:!0},angle:{type:`number`,label:`Angle`,default:0,min:0,max:6.28318,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.amount??.01,e.angle??0,0,0])},Mn={id:`gpu-twirl`,name:`Twirl`,category:`distort`,entryPoint:`twirlFragment`,uniformSize:16,shader:`
struct TwirlParams { amount: f32, radius: f32, centerX: f32, centerY: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: TwirlParams;
@fragment
fn twirlFragment(input: VertexOutput) -> @location(0) vec4f {
  let center = vec2f(params.centerX, params.centerY);
  let delta = input.uv - center;
  let dist = length(delta);
  let safeRadius = max(params.radius, 0.0001);
  let factor = 1.0 - min(dist / safeRadius, 1.0);
  let angle = params.amount * factor * factor;
  let s = sin(angle);
  let c = cos(angle);
  let rotated = vec2f(delta.x * c - delta.y * s, delta.x * s + delta.y * c);
  let twirledUV = center + rotated;
  let inRadius = dist < params.radius;
  let finalUV = select(input.uv, twirledUV, inRadius);
  return textureSample(inputTex, texSampler, finalUV);
}`,params:{amount:{type:`number`,label:`Amount`,default:1,min:-10,max:10,step:.1,animatable:!0},radius:{type:`number`,label:`Radius`,default:.5,min:.1,max:1,step:.01,animatable:!0},centerX:{type:`number`,label:`Center X`,default:.5,min:0,max:1,step:.01,animatable:!0},centerY:{type:`number`,label:`Center Y`,default:.5,min:0,max:1,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.amount??1,e.radius??.5,e.centerX??.5,e.centerY??.5])},Nn={id:`gpu-wave`,name:`Wave`,category:`distort`,entryPoint:`waveFragment`,uniformSize:16,shader:`
struct WaveParams { amplitudeX: f32, amplitudeY: f32, frequencyX: f32, frequencyY: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: WaveParams;
@fragment
fn waveFragment(input: VertexOutput) -> @location(0) vec4f {
  var uv = input.uv;
  uv.y += sin(uv.x * params.frequencyX * TAU) * params.amplitudeX;
  uv.x += sin(uv.y * params.frequencyY * TAU) * params.amplitudeY;
  return textureSample(inputTex, texSampler, uv);
}`,params:{amplitudeX:{type:`number`,label:`Horizontal Amp`,default:.02,min:0,max:.1,step:.001,animatable:!0},amplitudeY:{type:`number`,label:`Vertical Amp`,default:.02,min:0,max:.1,step:.001,animatable:!0},frequencyX:{type:`number`,label:`Horizontal Freq`,default:5,min:1,max:20,step:.5,animatable:!0},frequencyY:{type:`number`,label:`Vertical Freq`,default:5,min:1,max:20,step:.5,animatable:!0}},packUniforms:e=>new Float32Array([e.amplitudeX??.02,e.amplitudeY??.02,e.frequencyX??5,e.frequencyY??5])},Pn={id:`gpu-trigger-wave`,name:`Trigger Wave`,category:`distort`,entryPoint:`triggerWaveFragment`,uniformSize:64,shader:`
struct TriggerWaveParams {
  settingsA: vec4f,
  settingsB: vec4f,
  settingsC: vec4f,
  settingsD: vec4f,
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: TriggerWaveParams;

@fragment
fn triggerWaveFragment(input: VertexOutput) -> @location(0) vec4f {
  let strength = params.settingsA.x;
  let radius = max(params.settingsA.y, 0.001);
  let frequency = max(params.settingsA.z, 0.001);
  let decay = max(params.settingsA.w, 0.001);

  let center = vec2f(params.settingsB.x, params.settingsB.y);
  let phase = fract(params.settingsB.z + params.settingsB.w * params.settingsC.z);
  let chroma = params.settingsC.x;
  let scanlineMix = clamp(params.settingsC.y, 0.0, 1.0);
  let aspect = max(params.settingsC.w, 0.001);
  let glowColor = params.settingsD.rgb * params.settingsD.a;

  let aspectDelta = vec2f((input.uv.x - center.x) * aspect, input.uv.y - center.y);
  let dist = length(aspectDelta);
  let safeDist = max(dist, 0.0001);
  let direction = vec2f(aspectDelta.x / aspect, aspectDelta.y) / safeDist;

  let ringRadius = phase * radius;
  let band = exp(-abs(dist - ringRadius) / decay);
  let tail = 1.0 - smoothstep(0.2, 1.0, phase);
  let carrier = sin((dist - ringRadius) * frequency * TAU);
  let force = carrier * band * tail * strength;
  let warpedUv = input.uv + direction * force;

  var color = textureSample(inputTex, texSampler, warpedUv);
  if (chroma > 0.0) {
    let chromaOffset = direction * chroma * band * (0.25 + abs(strength) * 20.0);
    let red = textureSample(inputTex, texSampler, warpedUv + chromaOffset).r;
    let blue = textureSample(inputTex, texSampler, warpedUv - chromaOffset).b;
    color = vec4f(red, color.g, blue, color.a);
  }

  if (scanlineMix > 0.0) {
    let line = 0.78 + 0.22 * sin(input.position.y * 2.4 + phase * TAU * 8.0);
    color = vec4f(mix(color.rgb, color.rgb * line, scanlineMix), color.a);
  }

  let glow = band * tail * clamp(abs(strength) * 12.0, 0.0, 1.0);
  color = vec4f(color.rgb + glowColor * glow, color.a);
  return vec4f(clamp(color.rgb, vec3f(0.0), vec3f(1.0)), color.a);
}`,params:{strength:{type:`number`,label:`Strength`,default:.035,min:-.15,max:.15,step:.001,animatable:!0},radius:{type:`number`,label:`Radius`,default:.85,min:.1,max:1.5,step:.01,animatable:!0},frequency:{type:`number`,label:`Frequency`,default:18,min:2,max:64,step:1,animatable:!0},decay:{type:`number`,label:`Decay`,default:.08,min:.01,max:.3,step:.01,animatable:!0},phase:{type:`number`,label:`Phase`,default:0,min:0,max:1,step:.01,animatable:!0},speed:{type:`number`,label:`Speed`,default:1,min:0,max:4,step:.1,animatable:!1},centerX:{type:`number`,label:`Center X`,default:.5,min:0,max:1,step:.01,animatable:!0},centerY:{type:`number`,label:`Center Y`,default:.5,min:0,max:1,step:.01,animatable:!0},chroma:{type:`number`,label:`Chroma`,default:.006,min:0,max:.05,step:.001,animatable:!0},scanlineMix:{type:`number`,label:`Scanlines`,default:.18,min:0,max:1,step:.01,animatable:!0},glowColor:{type:`color`,label:`Glow Color`,default:`#2e6b8c`,animatable:!0}},packUniforms:(e,t,n,r=0)=>{let i=r,a=A(e.glowColor??`#2e6b8c`,[.18,.42,.55,1]);return new Float32Array([e.strength??.035,e.radius??.85,e.frequency??18,e.decay??.08,e.centerX??.5,e.centerY??.5,e.phase??0,e.speed??1,e.chroma??.006,e.scanlineMix??.18,i,t/Math.max(n,1),a[0],a[1],a[2],a[3]])}},Fn={id:`gpu-bulge`,name:`Bulge/Pinch`,category:`distort`,entryPoint:`bulgeFragment`,uniformSize:16,shader:`
struct BulgeParams { amount: f32, radius: f32, centerX: f32, centerY: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: BulgeParams;
@fragment
fn bulgeFragment(input: VertexOutput) -> @location(0) vec4f {
  let center = vec2f(params.centerX, params.centerY);
  let delta = input.uv - center;
  let dist = length(delta);
  let safeDist = max(dist, 0.0001);
  let normalizedDist = safeDist / params.radius;
  let factor = pow(normalizedDist, params.amount);
  let newDist = factor * params.radius;
  let direction = delta / safeDist;
  let bulgedUV = center + direction * newDist;
  let inRadius = dist < params.radius && dist > 0.0;
  let finalUV = select(input.uv, bulgedUV, inRadius);
  return textureSample(inputTex, texSampler, finalUV);
}`,params:{amount:{type:`number`,label:`Amount`,default:.5,min:.1,max:3,step:.1,animatable:!0},radius:{type:`number`,label:`Radius`,default:.5,min:.1,max:1,step:.01,animatable:!0},centerX:{type:`number`,label:`Center X`,default:.5,min:0,max:1,step:.01,animatable:!0},centerY:{type:`number`,label:`Center Y`,default:.5,min:0,max:1,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.amount??.5,e.radius??.5,e.centerX??.5,e.centerY??.5])},In={id:`gpu-kaleidoscope`,name:`Kaleidoscope`,category:`distort`,entryPoint:`kaleidoscopeFragment`,uniformSize:16,shader:`
struct KaleidoscopeParams { segments: f32, rotation: f32, _p1: f32, _p2: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: KaleidoscopeParams;
@fragment
fn kaleidoscopeFragment(input: VertexOutput) -> @location(0) vec4f {
  var uv = input.uv - 0.5;
  let angle = atan2(uv.y, uv.x) + params.rotation;
  let radius = length(uv);
  let segmentAngle = TAU / params.segments;
  var a = fract(angle / segmentAngle) * segmentAngle;
  if (a > segmentAngle * 0.5) { a = segmentAngle - a; }
  uv = vec2f(cos(a), sin(a)) * radius + 0.5;
  return textureSample(inputTex, texSampler, uv);
}`,params:{segments:{type:`number`,label:`Segments`,default:6,min:2,max:16,step:1,animatable:!0},rotation:{type:`number`,label:`Rotation`,default:0,min:0,max:6.28318,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.segments??6,e.rotation??0,0,0])},Ln={id:`gpu-mirror`,name:`Mirror`,category:`distort`,entryPoint:`mirrorFragment`,uniformSize:16,shader:`
struct MirrorParams { horizontal: f32, vertical: f32, _p1: f32, _p2: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: MirrorParams;
@fragment
fn mirrorFragment(input: VertexOutput) -> @location(0) vec4f {
  var uv = input.uv;
  if (params.horizontal > 0.5 && uv.x > 0.5) { uv.x = 1.0 - uv.x; }
  if (params.vertical > 0.5 && uv.y > 0.5) { uv.y = 1.0 - uv.y; }
  return textureSample(inputTex, texSampler, uv);
}`,params:{horizontal:{type:`boolean`,label:`Horizontal`,default:!0},vertical:{type:`boolean`,label:`Vertical`,default:!1}},packUniforms:e=>new Float32Array([e.horizontal===!1?0:1,+(e.vertical===!0),0,0])},Rn={id:`gpu-fluted-glass`,name:`Fluted Glass`,category:`distort`,entryPoint:`flutedGlassFragment`,uniformSize:128,shader:`
struct FlutedGlassParams {
  colorBack: vec4f,
  colorShadow: vec4f,
  colorHighlight: vec4f,
  settingsA: vec4f,
  settingsB: vec4f,
  settingsC: vec4f,
  settingsD: vec4f,
  margins: vec4f,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: FlutedGlassParams;

fn rotate2d(p: vec2f, angle: f32) -> vec2f {
  let c = cos(angle);
  let s = sin(angle);
  return vec2f(p.x * c - p.y * s, p.x * s + p.y * c);
}

fn rotateAspect(p: vec2f, angle: f32, aspect: f32) -> vec2f {
  var q = p;
  q.x *= aspect;
  q = rotate2d(q, angle);
  q.x /= aspect;
  return q;
}

fn smoothFract(x: f32) -> f32 {
  let f = fract(x);
  let w = fwidth(x);
  let edge = abs(f - 0.5) - 0.5;
  let band = smoothstep(-w, w, edge);
  return mix(f, 1.0 - f, band);
}

fn getUvFrame(uv: vec2f, softness: f32) -> f32 {
  let aax = 2.0 * fwidth(uv.x);
  let aay = 2.0 * fwidth(uv.y);
  let left = smoothstep(0.0, aax + softness, uv.x);
  let right = 1.0 - smoothstep(1.0 - softness - aax, 1.0, uv.x);
  let bottom = smoothstep(0.0, aay + softness, uv.y);
  let top = 1.0 - smoothstep(1.0 - softness - aay, 1.0, uv.y);
  return left * right * bottom * top;
}

fn samplePremultiplied(uv: vec2f) -> vec4f {
  let c = textureSampleLevel(inputTex, texSampler, uv, 0.0);
  return vec4f(c.rgb * c.a, c.a);
}

fn getBlur(uv: vec2f, texelSize: vec2f, dir: vec2f, sigma: f32) -> vec4f {
  if (sigma <= 0.5) {
    return textureSampleLevel(inputTex, texSampler, uv, 0.0);
  }

  let maxRadius = 50;
  let radius = i32(min(f32(maxRadius), ceil(3.0 * sigma)));
  let twoSigma2 = 2.0 * sigma * sigma;
  let gaussianNorm = 1.0 / sqrt(TAU * sigma * sigma);

  var sum = samplePremultiplied(uv) * gaussianNorm;
  var weightSum = gaussianNorm;

  for (var i = 1; i <= maxRadius; i = i + 1) {
    if (i > radius) {
      break;
    }

    let x = f32(i);
    let w = exp(-(x * x) / twoSigma2) * gaussianNorm;
    let offset = dir * texelSize * x;
    let s1 = samplePremultiplied(uv + offset);
    let s2 = samplePremultiplied(uv - offset);
    sum += (s1 + s2) * w;
    weightSum += 2.0 * w;
  }

  let result = sum / weightSum;
  if (result.a > 0.0) {
    return vec4f(result.rgb / result.a, result.a);
  }
  return result;
}

fn flutedOverlayNoise(p: vec2f) -> f32 {
  let coarse = noise2d(p * 0.83 + vec2f(4.1, -7.3));
  let medium = noise2d(vec2f(
    p.x * 1.27 - p.y * 0.58,
    p.x * 0.71 + p.y * 1.19
  ) + vec2f(-10.2, 5.4));
  let fine = noise2d(vec2f(
    p.x * -0.92 + p.y * 1.11,
    p.x * -1.06 - p.y * 0.82
  ) + vec2f(7.8, 9.6));
  return coarse * 0.45 + medium * 0.35 + fine * 0.2;
}

@fragment
fn flutedGlassFragment(input: VertexOutput) -> @location(0) vec4f {
  let width = max(params.settingsD.y, 1.0);
  let height = max(params.settingsD.z, 1.0);
  let aspect = max(params.settingsD.w, 0.0001);

  let size = clamp(params.settingsA.x, 0.0, 1.0);
  let shadowsAmount = clamp(params.settingsA.y, 0.0, 1.0);
  let angle = params.settingsA.z * PI / 180.0;
  let stretchAmount = clamp(params.settingsA.w, 0.0, 1.0);

  let shape = i32(params.settingsB.x);
  let distortionAmount = clamp(params.settingsB.y, 0.0, 1.0);
  let highlightsAmount = clamp(params.settingsB.z, 0.0, 1.0);
  let distortionShape = i32(params.settingsB.w);

  let shiftAmount = params.settingsC.x;
  let blurAmount = clamp(params.settingsC.y, 0.0, 1.0);
  let edgesAmount = clamp(params.settingsC.z, 0.0, 1.0);
  let grainMixer = clamp(params.settingsC.w, 0.0, 1.0);
  let grainOverlay = clamp(params.settingsD.x, 0.0, 1.0);

  let marginLeft = params.margins.x;
  let marginTop = params.margins.y;
  let marginRight = params.margins.z;
  let marginBottom = params.margins.w;

  let patternRotation = -angle;
  let patternSize = mix(200.0, 5.0, size);

  var uv = input.uv;
  let uvMask = input.position.xy / vec2f(width, height);
  let sw = vec2f(0.005);
  let mask =
    smoothstep(marginLeft, marginLeft + sw.x, uvMask.x + sw.x) *
    smoothstep(marginRight, marginRight + sw.x, 1.0 - uvMask.x + sw.x) *
    smoothstep(marginTop, marginTop + sw.y, uvMask.y + sw.y) *
    smoothstep(marginBottom, marginBottom + sw.y, 1.0 - uvMask.y + sw.y);
  let maskOuter =
    smoothstep(marginLeft - sw.x, marginLeft, uvMask.x + sw.x) *
    smoothstep(marginRight - sw.x, marginRight, 1.0 - uvMask.x + sw.x) *
    smoothstep(marginTop - sw.y, marginTop, uvMask.y + sw.y) *
    smoothstep(marginBottom - sw.y, marginBottom, 1.0 - uvMask.y + sw.y);
  let maskStroke = maskOuter - mask;
  let maskInner =
    smoothstep(marginLeft - 2.0 * sw.x, marginLeft, uvMask.x) *
    smoothstep(marginRight - 2.0 * sw.x, marginRight, 1.0 - uvMask.x) *
    smoothstep(marginTop - 2.0 * sw.y, marginTop, uvMask.y) *
    smoothstep(marginBottom - 2.0 * sw.y, marginBottom, 1.0 - uvMask.y);
  let maskStrokeInner = maskInner - mask;

  uv -= 0.5;
  uv *= patternSize;
  uv = rotateAspect(uv, patternRotation, aspect);

  var curve = 0.0;
  let patternY = uv.y / aspect;
  if (shape == 5) {
    curve = 0.5 + 0.5 * sin(0.5 * PI * uv.x) * cos(0.5 * PI * patternY);
  } else if (shape == 4) {
    curve = 10.0 * abs(fract(0.1 * patternY) - 0.5);
  } else if (shape == 3) {
    curve = 4.0 * sin(0.23 * patternY);
  } else if (shape == 2) {
    curve = 0.5 + 0.5 * sin(0.5 * uv.x) * sin(1.7 * uv.x);
  }

  let uvToFract = uv + curve;
  var fractOrigUV = fract(uv);
  var floorOrigUV = floor(uv);
  var x = smoothFract(uvToFract.x);
  let xNonSmooth = fract(uvToFract.x) + 0.0001;

  var highlightsWidth = 2.0 * max(0.001, fwidth(uvToFract.x));
  highlightsWidth += 2.0 * maskStrokeInner;
  var highlights = smoothstep(0.0, highlightsWidth, xNonSmooth);
  highlights *= smoothstep(1.0, 1.0 - highlightsWidth, xNonSmooth);
  highlights = 1.0 - highlights;
  highlights *= highlightsAmount;
  highlights = clamp(highlights, 0.0, 1.0);
  highlights *= mask;

  var shadows = pow(x, 1.3);
  var distortion = 0.0;
  var fadeX = 1.0;
  var frameFade = 0.0;

  var aa = fwidth(xNonSmooth);
  aa = max(aa, fwidth(uv.x));
  aa = max(aa, fwidth(uvToFract.x));
  aa = max(aa, 0.0001);

  if (distortionShape == 1) {
    distortion = -pow(1.5 * x, 3.0);
    distortion += 0.5 - shiftAmount;
    frameFade = pow(1.5 * x, 3.0);
    aa = max(0.2, aa);
    aa += mix(0.2, 0.0, size);
    fadeX = smoothstep(0.0, aa, xNonSmooth) * smoothstep(1.0, 1.0 - aa, xNonSmooth);
    distortion = mix(0.5, distortion, fadeX);
  } else if (distortionShape == 2) {
    distortion = 2.0 * pow(x, 2.0);
    distortion -= 0.5 + shiftAmount;
    frameFade = pow(abs(x - 0.5), 4.0);
    aa = max(0.2, aa);
    aa += mix(0.2, 0.0, size);
    fadeX = smoothstep(0.0, aa, xNonSmooth) * smoothstep(1.0, 1.0 - aa, xNonSmooth);
    distortion = mix(0.5, distortion, fadeX);
    frameFade = mix(1.0, frameFade, 0.5 * fadeX);
  } else if (distortionShape == 3) {
    distortion = pow(2.0 * (xNonSmooth - 0.5), 6.0);
    distortion -= 0.25;
    distortion -= shiftAmount;
    frameFade = 1.0 - 2.0 * pow(abs(x - 0.4), 2.0);
    aa = 0.15;
    aa += mix(0.1, 0.0, size);
    fadeX = smoothstep(0.0, aa, xNonSmooth) * smoothstep(1.0, 1.0 - aa, xNonSmooth);
    frameFade = mix(1.0, frameFade, fadeX);
  } else if (distortionShape == 4) {
    x = xNonSmooth;
    distortion = sin((x + 0.25) * TAU);
    shadows = 0.5 + 0.5 * asin(distortion) / (0.5 * PI);
    distortion *= 0.5;
    distortion -= shiftAmount;
    frameFade = 0.5 + 0.5 * sin(x * TAU);
  } else if (distortionShape == 5) {
    distortion -= pow(abs(x), 0.2) * x;
    distortion += 0.33;
    distortion -= 3.0 * shiftAmount;
    distortion *= 0.33;
    frameFade = 0.3 * smoothstep(0.0, 1.0, x);
    shadows = pow(x, 2.5);
    aa = max(0.1, aa);
    aa += mix(0.1, 0.0, size);
    fadeX = smoothstep(0.0, aa, xNonSmooth) * smoothstep(1.0, 1.0 - aa, xNonSmooth);
    distortion *= fadeX;
  }

  // Grain UV (and its derivatives) are only needed when grain or grain overlay
  // are active. grainMixer/grainOverlay are uniform, so these branches are
  // coherent across the draw — no divergence — and the dpdx/dpdy derivatives
  // stay in uniform control flow. Skips ~36 sin-based hash() calls per pixel
  // when grain is off (the common case), which dominates this shader's ALU.
  let grainActive = grainMixer > 0.0 || grainOverlay > 0.0;
  var grainUV = input.uv;
  if (grainActive) {
    let dudx = dpdx(input.uv);
    let dudy = dpdy(input.uv);
    var gUV = input.uv - 0.5;
    let derivativeScale = 0.8 / max(vec2f(length(dudx), length(dudy)), vec2f(0.0001));
    gUV *= derivativeScale;
    gUV += 0.5;
    grainUV = gUV;
  }
  if (grainMixer > 0.0) {
    var grain = flutedOverlayNoise(grainUV);
    grain = smoothstep(0.4, 0.7, grain);
    grain *= grainMixer;
    distortion = mix(distortion, 0.0, grain);
  }

  shadows = min(shadows, 1.0);
  shadows += maskStrokeInner;
  shadows *= mask;
  shadows = min(shadows, 1.0);
  shadows *= pow(shadowsAmount, 2.0);
  shadows = clamp(shadows, 0.0, 1.0);

  distortion *= 3.0 * distortionAmount;
  frameFade *= distortionAmount;

  fractOrigUV = vec2f(fractOrigUV.x + distortion, fractOrigUV.y);
  floorOrigUV = rotateAspect(floorOrigUV, -patternRotation, aspect);
  fractOrigUV = rotateAspect(fractOrigUV, -patternRotation, aspect);

  uv = (floorOrigUV + fractOrigUV) / patternSize;
  uv += vec2f(pow(maskStroke, 4.0));
  uv += 0.5;

  uv = mix(input.uv, uv, smoothstep(0.0, 0.7, mask));
  var blur = mix(0.0, 50.0, blurAmount);
  blur = mix(0.0, blur, smoothstep(0.5, 1.0, mask));

  var edgeDistortion = mix(0.0, 0.04, edgesAmount);
  edgeDistortion += 0.06 * frameFade * edgesAmount;
  edgeDistortion *= mask;
  let frame = getUvFrame(uv, edgeDistortion);

  // stretchAmount is uniform — skip the stretch warp (and its getUvFrame /
  // fwidth work) entirely when stretch is off.
  if (stretchAmount > 0.0) {
    var stretch = 1.0 - smoothstep(0.0, 0.5, xNonSmooth) * smoothstep(1.0, 0.5, xNonSmooth);
    stretch = pow(stretch, 2.0);
    stretch *= mask;
    stretch *= getUvFrame(uv, 0.1 + 0.05 * mask * frameFade);
    uv = vec2f(uv.x, mix(uv.y, 0.5, stretchAmount * stretch));
  }

  let imageSample = getBlur(uv, 1.0 / vec2f(width, height), vec2f(0.0, 1.0), blur);
  let image = vec4f(imageSample.rgb * imageSample.a, imageSample.a);
  let backColor = vec4f(params.colorBack.rgb * params.colorBack.a, params.colorBack.a);
  let highlightColor = vec4f(params.colorHighlight.rgb * params.colorHighlight.a, params.colorHighlight.a);
  let shadowColor = params.colorShadow;

  var color = highlightColor.rgb * highlights;
  var opacity = highlightColor.a * highlights;

  shadows = mix(shadows * shadowColor.a, 0.0, highlights);
  color = mix(color, shadowColor.rgb * shadowColor.a, 0.5 * shadows);
  color += 0.5 * pow(shadows, 0.5) * shadowColor.rgb;
  opacity += shadows;
  color = clamp(color, vec3f(0.0), vec3f(1.0));
  opacity = clamp(opacity, 0.0, 1.0);

  color += image.rgb * (1.0 - opacity) * frame;
  opacity += image.a * (1.0 - opacity) * frame;
  color += backColor.rgb * (1.0 - opacity);
  opacity += backColor.a * (1.0 - opacity);

  // grainOverlay is uniform — the two-octave overlay noise (24 sin-based
  // hash() calls) only runs when the overlay is actually dialed in.
  if (grainOverlay > 0.0) {
    var grainOverlayNoise = flutedOverlayNoise(rotate2d(grainUV, 1.0) + vec2f(3.0));
    grainOverlayNoise = mix(grainOverlayNoise, flutedOverlayNoise(rotate2d(grainUV, 2.0) + vec2f(-1.0)), 0.5);
    grainOverlayNoise = pow(grainOverlayNoise, 1.3);

    let grainOverlayV = grainOverlayNoise * 2.0 - 1.0;
    let grainOverlayColor = vec3f(select(0.0, 1.0, grainOverlayV >= 0.0));
    var grainOverlayStrength = grainOverlay * abs(grainOverlayV);
    grainOverlayStrength = pow(grainOverlayStrength, 0.8);
    grainOverlayStrength *= mask;
    color = mix(color, grainOverlayColor, 0.35 * grainOverlayStrength);
    opacity += 0.5 * grainOverlayStrength;
  }
  opacity = clamp(opacity, 0.0, 1.0);

  return vec4f(color, opacity);
}`,params:{colorBack:{type:`color`,label:`Back Color`,default:`#00000000`,animatable:!0},colorShadow:{type:`color`,label:`Shadow Color`,default:`#000000`,animatable:!0},colorHighlight:{type:`color`,label:`Highlight Color`,default:`#ffffff`,animatable:!0},shadows:{type:`number`,label:`Shadows`,default:.25,min:0,max:1,step:.01,animatable:!0},highlights:{type:`number`,label:`Highlights`,default:.1,min:0,max:1,step:.01,animatable:!0},size:{type:`number`,label:`Size`,default:.5,min:0,max:1,step:.01,animatable:!0},shape:{type:`select`,label:`Shape`,default:`lines`,options:[{value:`lines`,label:`Lines`},{value:`linesIrregular`,label:`Irregular Lines`},{value:`wave`,label:`Wave`},{value:`zigzag`,label:`Zigzag`},{value:`pattern`,label:`Pattern`}]},angle:{type:`number`,label:`Angle`,default:0,min:0,max:180,step:1,animatable:!0},distortionShape:{type:`select`,label:`Distortion Shape`,default:`prism`,options:[{value:`prism`,label:`Prism`},{value:`lens`,label:`Lens`},{value:`contour`,label:`Contour`},{value:`cascade`,label:`Cascade`},{value:`flat`,label:`Flat`}]},distortion:{type:`number`,label:`Distortion`,default:.5,min:0,max:1,step:.01,animatable:!0},shift:{type:`number`,label:`Shift`,default:0,min:-1,max:1,step:.01,animatable:!0},stretch:{type:`number`,label:`Stretch`,default:0,min:0,max:1,step:.01,animatable:!0},blur:{type:`number`,label:`Blur`,default:0,min:0,max:1,step:.01,animatable:!0},edges:{type:`number`,label:`Edges`,default:.25,min:0,max:1,step:.01,animatable:!0},margin:{type:`number`,label:`Margin`,default:0,min:0,max:1,step:.01,animatable:!0},marginLeft:{type:`number`,label:`Left Margin`,default:0,min:0,max:1,step:.01,animatable:!0},marginRight:{type:`number`,label:`Right Margin`,default:0,min:0,max:1,step:.01,animatable:!0},marginTop:{type:`number`,label:`Top Margin`,default:0,min:0,max:1,step:.01,animatable:!0},marginBottom:{type:`number`,label:`Bottom Margin`,default:0,min:0,max:1,step:.01,animatable:!0},grainMixer:{type:`number`,label:`Grain Mixer`,default:0,min:0,max:1,step:.01,animatable:!0},grainOverlay:{type:`number`,label:`Grain Overlay`,default:0,min:0,max:1,step:.01,animatable:!0}},packUniforms:(e,t,n)=>{let r={lines:1,linesIrregular:2,wave:3,zigzag:4,pattern:5},i={prism:1,lens:2,contour:3,cascade:4,flat:5},a=e.margin??0,o=e.marginLeft??a,s=e.marginRight??a,c=e.marginTop??a,l=e.marginBottom??a,u=A(e.colorBack??`#00000000`,[0,0,0,0]),d=A(e.colorShadow??`#000000`,[0,0,0,1]),f=A(e.colorHighlight??`#ffffff`,[1,1,1,1]);return new Float32Array([u[0],u[1],u[2],u[3],d[0],d[1],d[2],d[3],f[0],f[1],f[2],f[3],e.size??.5,e.shadows??.25,e.angle??0,e.stretch??0,r[e.shape]??1,e.distortion??.5,e.highlights??.1,i[e.distortionShape]??1,e.shift??0,e.blur??0,e.edges??.25,e.grainMixer??0,e.grainOverlay??0,t,n,t/Math.max(n,1),o,c,s,l])}},zn={id:`gpu-ripple-glass`,name:`Ripple Glass`,category:`distort`,entryPoint:`rippleGlassFragment`,uniformSize:80,shader:`
struct RippleGlassParams {
  colorShadow: vec4f,
  colorHighlight: vec4f,
  settingsA: vec4f,
  settingsB: vec4f,
  settingsC: vec4f,
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: RippleGlassParams;

@fragment
fn rippleGlassFragment(input: VertexOutput) -> @location(0) vec4f {
  let amount = params.settingsA.x;
  let rings = max(params.settingsA.y, 1.0);
  let shadowsAmount = clamp(params.settingsA.z, 0.0, 1.0);
  let highlightsAmount = clamp(params.settingsA.w, 0.0, 1.0);

  let origin = vec2f(params.settingsB.x, params.settingsB.y);
  let phase = params.settingsB.z;
  let falloff = max(params.settingsB.w, 0.001);

  let aberration = params.settingsC.x;
  let aspect = max(params.settingsC.w, 0.0001);

  // Aspect-corrected radial vector from the ripple origin.
  var p = input.uv - origin;
  p.x *= aspect;
  let dist = length(p);
  let dir = p / max(dist, 1e-4);
  // Radial offset expressed back in uv space (undo the aspect scaling on x).
  let radialUv = vec2f(dir.x / aspect, dir.y);

  let ringWidth = 1.0 / rings;
  let ringCoord = dist / ringWidth - phase;   // integer part = ring index
  let x = fract(ringCoord);                     // 0..1 within the ring
  let centered = x - 0.5;

  // Cylindrical lens bend: soft at the ring centre, steep toward the seams,
  // pulling samples back toward each ring centre (magnifying the band).
  let bend = -sign(centered) * pow(abs(centered) * 2.0, 1.5);

  // Reach envelope — fades the ripple away from the origin.
  let envelope = exp(-dist / falloff);

  let push = bend * amount * ringWidth * 1.5 * envelope;
  let offsetUv = radialUv * push;

  var color: vec4f;
  if (aberration > 0.0) {
    let ca = radialUv * aberration * ringWidth * envelope;
    let r = textureSample(inputTex, texSampler, input.uv + offsetUv + ca).r;
    let g = textureSample(inputTex, texSampler, input.uv + offsetUv).g;
    let b = textureSample(inputTex, texSampler, input.uv + offsetUv - ca).b;
    let a = textureSample(inputTex, texSampler, input.uv + offsetUv).a;
    color = vec4f(r, g, b, a);
  } else {
    color = textureSample(inputTex, texSampler, input.uv + offsetUv);
  }

  // Thin bright seam between rings + groove shadow that deepens toward it.
  let aa = 2.0 * max(0.001, fwidth(ringCoord));
  var highlights = 1.0 - (smoothstep(0.0, aa, x) * smoothstep(1.0, 1.0 - aa, x));
  highlights = clamp(highlights * highlightsAmount * envelope, 0.0, 1.0);

  var shadows = pow(abs(centered) * 2.0, 1.3);
  shadows = clamp(shadows * shadowsAmount * envelope, 0.0, 1.0);

  let shadowColor = params.colorShadow;
  let highlightColor = params.colorHighlight;

  var rgb = color.rgb;
  rgb = mix(rgb, shadowColor.rgb, 0.5 * shadows * shadowColor.a);
  rgb += highlightColor.rgb * highlights * highlightColor.a;
  rgb = clamp(rgb, vec3f(0.0), vec3f(1.0));

  return vec4f(rgb, color.a);
}`,params:{colorShadow:{type:`color`,label:`Shadow Color`,default:`#000000`,animatable:!0},colorHighlight:{type:`color`,label:`Highlight Color`,default:`#ffffff`,animatable:!0},amount:{type:`number`,label:`Amount`,default:.5,min:0,max:1,step:.01,animatable:!0},rings:{type:`number`,label:`Rings`,default:14,min:1,max:64,step:1,animatable:!0},shadows:{type:`number`,label:`Shadows`,default:.25,min:0,max:1,step:.01,animatable:!0},highlights:{type:`number`,label:`Highlights`,default:.1,min:0,max:1,step:.01,animatable:!0},originX:{type:`number`,label:`Origin X`,default:.5,min:0,max:1,step:.01,animatable:!0},originY:{type:`number`,label:`Origin Y`,default:.5,min:0,max:1,step:.01,animatable:!0},phase:{type:`number`,label:`Phase`,default:0,min:-1,max:1,step:.01,animatable:!0},falloff:{type:`number`,label:`Falloff`,default:.35,min:.05,max:2,step:.01,animatable:!0},aberration:{type:`number`,label:`Aberration`,default:0,min:0,max:1,step:.01,animatable:!0}},packUniforms:(e,t,n)=>{let r=A(e.colorShadow??`#000000`,[0,0,0,1]),i=A(e.colorHighlight??`#ffffff`,[1,1,1,1]);return new Float32Array([r[0],r[1],r[2],r[3],i[0],i[1],i[2],i[3],e.amount??.5,e.rings??14,e.shadows??.25,e.highlights??.1,e.originX??.5,e.originY??.5,e.phase??0,e.falloff??.35,e.aberration??0,t,n,t/Math.max(n,1)])}},Bn={id:`gpu-glass-mosaic`,name:`Glass Mosaic`,category:`distort`,entryPoint:`glassMosaicFragment`,uniformSize:64,shader:`
struct GlassMosaicParams {
  colorShadow: vec4f,
  colorHighlight: vec4f,
  settingsA: vec4f,
  settingsB: vec4f,
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: GlassMosaicParams;

@fragment
fn glassMosaicFragment(input: VertexOutput) -> @location(0) vec4f {
  let amount = params.settingsA.x;
  let cells = max(params.settingsA.y, 1.0);
  let shadowsAmount = clamp(params.settingsA.z, 0.0, 1.0);
  let highlightsAmount = clamp(params.settingsA.w, 0.0, 1.0);
  let aberration = params.settingsB.x;
  let aspect = max(params.settingsB.w, 0.0001);

  // Square-ish cells: cellsX counts columns across the width; rows scale by
  // aspect so each tile stays roughly square regardless of frame proportions.
  let cellUvSize = vec2f(1.0 / cells, aspect / cells);
  let grid = input.uv / cellUvSize;
  let local = fract(grid) - 0.5;                 // -0.5..0.5 within the cell
  let localUv = local * cellUvSize;              // same offset, in uv space

  // Spherical lens: magnify toward each cell centre, fading out near the rim.
  let dd = dot(local * 2.0, local * 2.0);        // 0 centre .. up to 2 at corners
  let lens = amount * pow(clamp(1.0 - dd, 0.0, 1.0), 0.5);
  let sampleUv = input.uv - localUv * lens;

  var color: vec4f;
  if (aberration > 0.0) {
    let ca = localUv * aberration;
    let r = textureSample(inputTex, texSampler, sampleUv - ca).r;
    let g = textureSample(inputTex, texSampler, sampleUv).g;
    let b = textureSample(inputTex, texSampler, sampleUv + ca).b;
    let a = textureSample(inputTex, texSampler, sampleUv).a;
    color = vec4f(r, g, b, a);
  } else {
    color = textureSample(inputTex, texSampler, sampleUv);
  }

  // Rounded-square edge factor: 0 at the cell centre, 1 at the rim.
  let edge = max(abs(local.x), abs(local.y)) * 2.0;
  let fw = fwidth(edge) + 0.001;

  // Bright bevel just inside each cell border.
  var highlights = smoothstep(1.0 - 6.0 * fw, 1.0 - 2.0 * fw, edge);
  highlights *= highlightsAmount;

  // Darker mortar at the seams + a gentle vignette toward the rim.
  let gap = smoothstep(1.0 - 2.0 * fw, 1.0, edge);
  var shadows = pow(edge, 3.0) * 0.5 + gap;
  shadows = clamp(shadows * shadowsAmount, 0.0, 1.0);

  // Diagonal bevel (light from top-left) gives each tile a glassy roundness.
  let bevel = (-local.x - local.y) * amount * 0.5;

  let shadowColor = params.colorShadow;
  let highlightColor = params.colorHighlight;

  var rgb = color.rgb * (1.0 + bevel);
  rgb = mix(rgb, shadowColor.rgb, 0.5 * shadows * shadowColor.a);
  rgb += highlightColor.rgb * highlights * highlightColor.a;
  rgb = clamp(rgb, vec3f(0.0), vec3f(1.0));

  return vec4f(rgb, color.a);
}`,params:{colorShadow:{type:`color`,label:`Shadow Color`,default:`#000000`,animatable:!0},colorHighlight:{type:`color`,label:`Highlight Color`,default:`#ffffff`,animatable:!0},amount:{type:`number`,label:`Amount`,default:.55,min:0,max:1,step:.01,animatable:!0},cells:{type:`number`,label:`Cells`,default:18,min:2,max:80,step:1,animatable:!0},shadows:{type:`number`,label:`Shadows`,default:.3,min:0,max:1,step:.01,animatable:!0},highlights:{type:`number`,label:`Highlights`,default:.12,min:0,max:1,step:.01,animatable:!0},aberration:{type:`number`,label:`Aberration`,default:0,min:0,max:1,step:.01,animatable:!0}},packUniforms:(e,t,n)=>{let r=A(e.colorShadow??`#000000`,[0,0,0,1]),i=A(e.colorHighlight??`#ffffff`,[1,1,1,1]);return new Float32Array([r[0],r[1],r[2],r[3],i[0],i[1],i[2],i[3],e.amount??.55,e.cells??18,e.shadows??.3,e.highlights??.12,e.aberration??0,t,n,t/Math.max(n,1)])}},Vn={id:`gpu-blocks`,name:`Blocks`,category:`distort`,entryPoint:`blocksFragment`,uniformSize:32,shader:`
struct BlocksParams {
  size: f32, depth: f32, studSize: f32, gap: f32,
  width: f32, height: f32, pad0: f32, pad1: f32
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: BlocksParams;
@fragment
fn blocksFragment(input: VertexOutput) -> @location(0) vec4f {
  let cellX = max(params.size, 1.0) / params.width;
  let cellY = max(params.size, 1.0) / params.height;
  let cellIndex = vec2f(floor(input.uv.x / cellX), floor(input.uv.y / cellY));
  let cellCenter = vec2f((cellIndex.x + 0.5) * cellX, (cellIndex.y + 0.5) * cellY);
  let color = textureSample(inputTex, texSampler, cellCenter);

  // local position within the cell, centered at 0 (range -0.5..0.5)
  let local = vec2f(fract(input.uv.x / cellX), fract(input.uv.y / cellY)) - vec2f(0.5);
  let edge = max(abs(local.x), abs(local.y));

  // bevel: light from top-left, shadow toward bottom-right
  let shade = (-local.x - local.y) * params.depth;

  // raised stud at the cell center with its own bevel
  let studR = clamp(params.studSize, 0.0, 1.0) * 0.4;
  let stud = smoothstep(studR, studR - 0.03, length(local));
  let studShade = stud * ((-local.x - local.y) * params.depth * 2.0 + params.depth * 0.18);

  var rgb = color.rgb * (1.0 + shade) + color.rgb * studShade;

  // darken the mortar gap between blocks
  let gapMask = step(edge, 0.5 - clamp(params.gap, 0.0, 0.4));
  rgb = rgb * mix(0.55, 1.0, gapMask);

  return vec4f(clamp(rgb, vec3f(0.0), vec3f(1.0)), color.a);
}`,params:{size:{type:`number`,label:`Block Size`,default:24,min:4,max:120,step:1,animatable:!0},depth:{type:`number`,label:`Depth`,default:.5,min:0,max:1.5,step:.01,animatable:!0},studSize:{type:`number`,label:`Stud Size`,default:.55,min:0,max:1,step:.01,animatable:!0},gap:{type:`number`,label:`Gap`,default:.06,min:0,max:.4,step:.01,animatable:!0}},packUniforms:(e,t,n)=>new Float32Array([e.size??24,e.depth??.5,e.studSize??.55,e.gap??.06,t,n,0,0])},Hn={id:`gpu-droste`,name:`Droste`,category:`distort`,entryPoint:`drosteFragment`,uniformSize:32,shader:`
struct DrosteParams {
  strength: f32, scale: f32, centerX: f32, centerY: f32,
  spin: f32, width: f32, height: f32, pad: f32
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: DrosteParams;
@fragment
fn drosteFragment(input: VertexOutput) -> @location(0) vec4f {
  let aspect = params.width / max(params.height, 1.0);
  let center = vec2f(params.centerX, params.centerY);
  let p = (input.uv - center) * vec2f(aspect, 1.0);

  let r = max(length(p), 1e-4);
  let a = atan2(p.y, p.x);
  var z = vec2f(log(r), a);

  let period = log(max(params.scale, 1.0001));
  // Escher twist; strength dials from plain recursive zoom (0) to full spiral
  let alpha = atan2(period, TAU) * clamp(params.strength, 0.0, 2.0);
  let co = max(cos(alpha), 1e-3);
  let si = sin(alpha);
  z = vec2f(z.x * co - z.y * si, z.x * si + z.y * co) / co;

  // tile the log-radius into a single repeating band
  z.x = z.x - period * floor(z.x / period);

  let er = exp(z.x);
  let na = z.y + params.spin;
  let uv = center + vec2f(cos(na), sin(na)) * er / vec2f(aspect, 1.0);
  return textureSample(inputTex, texSampler, fract(uv));
}`,params:{strength:{type:`number`,label:`Spiral`,default:1,min:0,max:2,step:.01,animatable:!0},scale:{type:`number`,label:`Scale`,default:2,min:1.1,max:6,step:.05,animatable:!0},centerX:{type:`number`,label:`Center X`,default:.5,min:0,max:1,step:.01,animatable:!0},centerY:{type:`number`,label:`Center Y`,default:.5,min:0,max:1,step:.01,animatable:!0},spin:{type:`number`,label:`Spin`,default:0,min:-6.28318,max:6.28318,step:.01,animatable:!0}},packUniforms:(e,t,n)=>new Float32Array([e.strength??1,e.scale??2,e.centerX??.5,e.centerY??.5,e.spin??0,t,n,0])};var Un=/* @__PURE__ */ e({ascii:()=>hr,blockGlitch:()=>Qn,colorGlitch:()=>Zn,crt:()=>$n,dither:()=>mr,edgeDetect:()=>Yn,glow:()=>Jn,grain:()=>Gn,halftone:()=>rr,ink:()=>vr,pixelSort:()=>yr,pixelSortHq:()=>br,posterize:()=>qn,scanlines:()=>Xn,sharpen:()=>Kn,threshold:()=>gr,vhs:()=>_r,vignette:()=>Wn});const Wn={id:`gpu-vignette`,name:`Vignette`,category:`stylize`,entryPoint:`vignetteFragment`,uniformSize:16,shader:`
struct VignetteParams { amount: f32, size: f32, softness: f32, roundness: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: VignetteParams;
@fragment
fn vignetteFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let center = input.uv - 0.5;
  let aspect = vec2f(1.0, params.roundness);
  let dist = length(center * aspect) * 2.0;
  let vig = 1.0 - smoothstep(params.size, params.size + params.softness, dist);
  let vigColor = mix(vec3f(0.0), color.rgb, mix(1.0, vig, params.amount));
  return vec4f(vigColor, color.a);
}`,params:{amount:{type:`number`,label:`Amount`,default:.5,min:0,max:1,step:.01,animatable:!0},size:{type:`number`,label:`Size`,default:.5,min:0,max:1.5,step:.01,animatable:!0},softness:{type:`number`,label:`Softness`,default:.5,min:0,max:1,step:.01,animatable:!0},roundness:{type:`number`,label:`Roundness`,default:1,min:.5,max:2,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.amount??.5,e.size??.5,e.softness??.5,e.roundness??1])},Gn={id:`gpu-grain`,name:`Film Grain`,category:`stylize`,entryPoint:`grainFragment`,uniformSize:16,shader:`
struct GrainParams { amount: f32, size: f32, speed: f32, time: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: GrainParams;
fn grainNoise(uv: vec2f, t: f32) -> f32 {
  let seed = uv + vec2f(t * 0.1, t * 0.07);
  return fract(sin(dot(seed, vec2f(12.9898, 78.233))) * 43758.5453);
}
@fragment
fn grainFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let grainUV = input.uv * (100.0 / params.size);
  // Wrap the time seed: the sin() inside grainNoise loses precision once the
  // unbounded (time * speed) term grows large, freezing the grain over long
  // sessions. The 600s period is imperceptible but keeps the seed bounded.
  let gt = params.time * params.speed;
  let noise = grainNoise(grainUV, gt - floor(gt / 600.0) * 600.0) * 2.0 - 1.0;
  let luma = luminance(color.rgb);
  let grainIntensity = params.amount * (1.0 - luma * 0.5);
  let grainColor = color.rgb + vec3f(noise * grainIntensity);
  return vec4f(clamp(grainColor, vec3f(0.0), vec3f(1.0)), color.a);
}`,params:{amount:{type:`number`,label:`Amount`,default:.1,min:0,max:.5,step:.01,animatable:!0},size:{type:`number`,label:`Size`,default:1,min:.5,max:5,step:.1,animatable:!0},speed:{type:`number`,label:`Speed`,default:1,min:0,max:5,step:.1,animatable:!1}},packUniforms:(e,t,n,r=0)=>{let i=r;return new Float32Array([e.amount??.1,e.size??1,e.speed??1,i])}},Kn={id:`gpu-sharpen`,name:`Sharpen`,category:`stylize`,entryPoint:`sharpenFragment`,uniformSize:16,shader:`
struct SharpenParams { amount: f32, radius: f32, width: f32, height: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: SharpenParams;
@fragment
fn sharpenFragment(input: VertexOutput) -> @location(0) vec4f {
  let texelSize = vec2f(1.0 / params.width, 1.0 / params.height);
  let center = textureSample(inputTex, texSampler, input.uv);
  var blur = vec4f(0.0);
  var totalWeight = 0.0;
  let samples = 3;
  let sigma = params.radius * 0.5 + 0.5;
  for (var x = -samples; x <= samples; x++) {
    for (var y = -samples; y <= samples; y++) {
      let offset = vec2f(f32(x), f32(y)) * texelSize * params.radius;
      let distSq = f32(x * x + y * y);
      let weight = exp(-distSq / (2.0 * sigma * sigma));
      blur += textureSample(inputTex, texSampler, input.uv + offset) * weight;
      totalWeight += weight;
    }
  }
  blur /= totalWeight;
  let sharpened = center.rgb + (center.rgb - blur.rgb) * params.amount;
  return vec4f(clamp(sharpened, vec3f(0.0), vec3f(1.0)), center.a);
}`,params:{amount:{type:`number`,label:`Amount`,default:1,min:0,max:5,step:.1,animatable:!0},radius:{type:`number`,label:`Radius`,default:1,min:.5,max:5,step:.1,animatable:!0}},packUniforms:(e,t,n)=>new Float32Array([e.amount??1,e.radius??1,t,n])},qn={id:`gpu-posterize`,name:`Posterize`,category:`stylize`,entryPoint:`posterizeFragment`,uniformSize:16,shader:`
struct PosterizeParams { levels: f32, _p1: f32, _p2: f32, _p3: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: PosterizeParams;
@fragment
fn posterizeFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let levels = max(params.levels, 2.0);
  let posterized = floor(color.rgb * levels) / (levels - 1.0);
  return vec4f(posterized, color.a);
}`,params:{levels:{type:`number`,label:`Levels`,default:6,min:2,max:32,step:1,animatable:!0}},packUniforms:e=>new Float32Array([e.levels??6,0,0,0])},Jn={id:`gpu-glow`,name:`Glow`,category:`stylize`,entryPoint:`glowFragment`,uniformSize:32,shader:`
struct GlowParams {
  amount: f32, threshold: f32, radius: f32, softness: f32,
  width: f32, height: f32, rings: f32, samplesPerRing: f32,
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: GlowParams;
@fragment
fn glowFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let texelSize = vec2f(1.0 / params.width, 1.0 / params.height);
  var glowVal = vec3f(0.0);
  var totalWeight = 0.0;
  let rings = i32(clamp(params.rings, 1.0, 32.0));
  let samplesPerRing = i32(clamp(params.samplesPerRing, 4.0, 64.0));
  for (var ring = 1; ring <= rings; ring++) {
    let ringRadius = f32(ring) * params.radius * texelSize.x * 10.0;
    let ringWeight = gaussian(f32(ring) / f32(rings), params.softness + 0.3);
    for (var i = 0; i < samplesPerRing; i++) {
      let angle = f32(i) * TAU / f32(samplesPerRing) + f32(ring) * 0.5;
      let offset = vec2f(cos(angle), sin(angle)) * ringRadius;
      let sampleColor = textureSample(inputTex, texSampler, input.uv + offset);
      let sampleLuma = luminance(sampleColor.rgb);
      let brightFactor = smoothstep(params.threshold - 0.1, params.threshold + 0.1, sampleLuma);
      let brightColor = sampleColor.rgb * brightFactor;
      glowVal += brightColor * ringWeight;
      totalWeight += ringWeight;
    }
  }
  let centerLuma = luminance(color.rgb);
  let centerBright = smoothstep(params.threshold - 0.1, params.threshold + 0.1, centerLuma);
  glowVal += color.rgb * centerBright * 2.0;
  totalWeight += 2.0;
  glowVal /= totalWeight;
  let result = color.rgb + glowVal * params.amount * 2.0;
  return vec4f(clamp(result, vec3f(0.0), vec3f(1.0)), color.a);
}`,params:{amount:{type:`number`,label:`Amount`,default:1,min:0,max:5,step:.1,animatable:!0},threshold:{type:`number`,label:`Threshold`,default:.6,min:0,max:1,step:.01,animatable:!0},radius:{type:`number`,label:`Radius`,default:20,min:1,max:100,step:1,animatable:!0},softness:{type:`number`,label:`Softness`,default:.5,min:.1,max:1,step:.05,animatable:!0},rings:{type:`number`,label:`Rings`,default:4,min:1,max:32,step:1,animatable:!1,quality:!0},samplesPerRing:{type:`number`,label:`Samples/Ring`,default:16,min:4,max:64,step:1,animatable:!1,quality:!0}},packUniforms:(e,t,n)=>new Float32Array([e.amount??1,e.threshold??.6,e.radius??20,e.softness??.5,t,n,e.rings??4,e.samplesPerRing??16])},Yn={id:`gpu-edge-detect`,name:`Edge Detect`,category:`stylize`,entryPoint:`edgeDetectFragment`,uniformSize:16,shader:`
struct EdgeDetectParams { strength: f32, width: f32, height: f32, invertFlag: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: EdgeDetectParams;
@fragment
fn edgeDetectFragment(input: VertexOutput) -> @location(0) vec4f {
  let texelSize = vec2f(1.0 / params.width, 1.0 / params.height);
  let tl = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(-texelSize.x, -texelSize.y)).rgb);
  let t  = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(0.0, -texelSize.y)).rgb);
  let tr = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(texelSize.x, -texelSize.y)).rgb);
  let l  = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(-texelSize.x, 0.0)).rgb);
  let r  = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(texelSize.x, 0.0)).rgb);
  let bl = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(-texelSize.x, texelSize.y)).rgb);
  let b  = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(0.0, texelSize.y)).rgb);
  let br = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(texelSize.x, texelSize.y)).rgb);
  let gx = -tl - 2.0*l - bl + tr + 2.0*r + br;
  let gy = -tl - 2.0*t - tr + bl + 2.0*b + br;
  var edge = sqrt(gx*gx + gy*gy) * params.strength;
  edge = clamp(edge, 0.0, 1.0);
  if (params.invertFlag > 0.5) { edge = 1.0 - edge; }
  return vec4f(vec3f(edge), 1.0);
}`,params:{strength:{type:`number`,label:`Strength`,default:1,min:0,max:5,step:.1,animatable:!0},invert:{type:`boolean`,label:`Invert`,default:!1}},packUniforms:(e,t,n)=>new Float32Array([e.strength??1,t,n,+!!e.invert])},Xn={id:`gpu-scanlines`,name:`Scanlines`,category:`stylize`,entryPoint:`scanlinesFragment`,uniformSize:16,shader:`
struct ScanlinesParams { density: f32, opacity: f32, speed: f32, time: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: ScanlinesParams;
@fragment
fn scanlinesFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let scrollOffset = params.time * params.speed * 0.1;
  let scanline = sin((input.uv.y + scrollOffset) * params.density * 100.0) * 0.5 + 0.5;
  let darken = 1.0 - params.opacity * (1.0 - scanline);
  return vec4f(color.rgb * darken, color.a);
}`,params:{density:{type:`number`,label:`Density`,default:5,min:1,max:20,step:.5,animatable:!0},opacity:{type:`number`,label:`Opacity`,default:.3,min:0,max:1,step:.01,animatable:!0},speed:{type:`number`,label:`Scroll Speed`,default:0,min:0,max:5,step:.1,animatable:!1}},packUniforms:(e,t,n,r=0)=>{let i=r;return new Float32Array([e.density??5,e.opacity??.3,e.speed??0,i])}},Zn={id:`gpu-color-glitch`,name:`Color Glitch`,category:`stylize`,entryPoint:`colorGlitchFragment`,uniformSize:16,shader:`
struct ColorGlitchParams { intensity: f32, speed: f32, time: f32, _pad: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: ColorGlitchParams;
@fragment
fn colorGlitchFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let amt = clamp(params.intensity, 0.0, 1.0);

  // Discrete time steps give the stuttering digital-glitch cadence and keep the
  // look readable even when playback is paused (the seed stays fixed per step).
  // The seed MUST be wrapped into a small range: the shared sin() hash loses all
  // precision with large inputs, so an unbounded (time * speed) seed collapses
  // bandNoise to a constant at higher speeds / long sessions and the effect looks
  // frozen. Wrapping keeps the seed usable at any speed.
  let rawStep = floor(params.time * params.speed * 12.0);
  let t = rawStep - floor(rawStep / 64.0) * 64.0;

  // Tear the frame into horizontal bands; each band glitches independently.
  // Jitter shared boundaries, not independent heights: no gaps or overlapping bands.
        let band_position = min(uv.y, 0.999999) * 28.0;
        let cell = floor(band_position);
        let start = cell + select((hash(vec2f(cell, t + 11.0)) - 0.5) * 0.8, 0.0, cell == 0.0);
        let end = cell + 1.0 + select((hash(vec2f(cell + 1.0, t + 11.0)) - 0.5) * 0.8, 0.0, cell >= 27.0);
        var band = cell;
        if (band_position < start) { band = cell - 1.0; }
        if (band_position >= end) { band = cell + 1.0; }
  let bandNoise = hash(vec2f(band, t));

  // More bands corrupt as intensity rises (full frame at intensity = 1).
  let glitchOn = step(1.0 - amt, bandNoise);

  // Per-band horizontal block displacement.
  let shift = (hash(vec2f(band * 1.7, t + 3.0)) - 0.5) * 0.15 * amt * glitchOn;

  // RGB channel separation — the signature colour-glitch fringing, scaled so even
  // a single still frame reads clearly.
  let split = (0.004 + 0.02 * amt) * glitchOn;
  let baseUv = vec2f(uv.x + shift, uv.y);
  let r = textureSample(inputTex, texSampler, baseUv + vec2f(split, 0.0)).r;
  let g = textureSample(inputTex, texSampler, baseUv).g;
  let b = textureSample(inputTex, texSampler, baseUv - vec2f(split, 0.0)).b;
  let a = textureSample(inputTex, texSampler, baseUv).a;
  var rgb = vec3f(r, g, b);

  // Hard hue corruption on the strongest bands for the "colour" in colour glitch.
  let hueHit = step(0.82, bandNoise) * glitchOn;
  var hsv = rgb2hsv(rgb);
  hsv.x = fract(hsv.x + hash(vec2f(band, t + 7.0)));
  rgb = mix(rgb, hsv2rgb(hsv), hueHit);

  return vec4f(rgb, a);
}`,params:{intensity:{type:`number`,label:`Intensity`,default:.5,min:0,max:1,step:.01,animatable:!0},speed:{type:`number`,label:`Speed`,default:1,min:.1,max:5,step:.1,animatable:!1}},packUniforms:(e,t,n,r=0)=>{let i=r;return new Float32Array([e.intensity??.5,e.speed??1,i,0])}},Qn={id:`gpu-block-glitch`,name:`Block Glitch`,category:`stylize`,entryPoint:`blockGlitchFragment`,uniformSize:32,shader:`
struct BlockGlitchParams {
  coverage: f32, intensity: f32, blockSize: f32, speed: f32,
  time: f32, width: f32, height: f32, pad: f32
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: BlockGlitchParams;
@fragment
fn blockGlitchFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let amt = clamp(params.intensity, 0.0, 1.0);
  let cov = clamp(params.coverage, 0.0, 1.0);

  // Discrete, wrapped time step — keeps the sin() hash seed in its precise range
  // so the glitch stays alive at any speed / session length.
  let rawStep = floor(params.time * params.speed * 8.0);
  let t = rawStep - floor(rawStep / 64.0) * 64.0;

  // Block grid in pixels.
  let cell = max(params.blockSize, 2.0);
  let cols = max(params.width / cell, 1.0);
  let rows = max(params.height / cell, 1.0);
  let block = vec2f(floor(uv.x * cols), floor(uv.y * rows));

  // Per-block, per-step decision: does this block glitch?
  let r1 = hash(vec2f(block.x + block.y * 3.0, t));
  let glitchOn = step(1.0 - cov, r1);

  // Block displacement: a horizontal datamosh slab plus a smaller vertical jump.
  let dispX = (hash(vec2f(block.y, t + 5.0)) - 0.5) * 0.25 * amt * glitchOn;
  let vJump = step(0.6, hash(vec2f(block.x + block.y, t + 13.0)));
  let dispY = (hash(vec2f(block.x, t + 9.0)) - 0.5) * 0.06 * amt * glitchOn * vJump;
  let srcUv = vec2f(uv.x + dispX, uv.y + dispY);

  // RGB channel split on glitched blocks.
  let split = (0.01 + 0.03 * amt) * glitchOn;
  let rr = textureSample(inputTex, texSampler, srcUv + vec2f(split, 0.0)).r;
  let gg = textureSample(inputTex, texSampler, srcUv).g;
  let bb = textureSample(inputTex, texSampler, srcUv - vec2f(split, 0.0)).b;
  let aa = textureSample(inputTex, texSampler, srcUv).a;
  let rgb = vec3f(rr, gg, bb);

  // Digital corruption on a subset of glitched blocks: channel rotate / invert /
  // posterize. Sampling already done above, so this control flow is safe.
  let corrupt = step(0.7, hash(vec2f(block.x * 1.3 + block.y, t + 21.0))) * glitchOn;
  let mode = hash(vec2f(block.y * 2.1 + block.x, t + 27.0));
  var c = rgb;
  if (mode < 0.34) {
    c = rgb.gbr;
  } else if (mode < 0.67) {
    c = vec3f(1.0) - rgb;
  } else {
    c = floor(rgb * 4.0) / 4.0;
  }

  return vec4f(mix(rgb, c, corrupt), aa);
}`,params:{coverage:{type:`number`,label:`Coverage`,default:.3,min:0,max:1,step:.01,animatable:!0},intensity:{type:`number`,label:`Intensity`,default:.6,min:0,max:1,step:.01,animatable:!0},blockSize:{type:`number`,label:`Block Size`,default:40,min:8,max:200,step:1,animatable:!0},speed:{type:`number`,label:`Speed`,default:1,min:.1,max:5,step:.1,animatable:!1}},packUniforms:(e,t,n,r=0)=>new Float32Array([e.coverage??.3,e.intensity??.6,e.blockSize??40,e.speed??1,r,t,n,0])},$n={id:`gpu-crt`,name:`CRT`,category:`stylize`,entryPoint:`crtFragment`,uniformSize:32,shader:`
struct CrtParams {
  curvature: f32, scanlines: f32, vignette: f32, chroma: f32,
  width: f32, height: f32, pad0: f32, pad1: f32
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: CrtParams;
@fragment
fn crtFragment(input: VertexOutput) -> @location(0) vec4f {
  // Barrel-warp the sampling coordinate around the screen centre.
  let curveAmt = clamp(params.curvature, 0.0, 1.0) * 0.35;
  let cc = input.uv * 2.0 - 1.0;
  let r2 = dot(cc, cc);
  let warped = cc * (1.0 + r2 * curveAmt);
  let cuv = warped * 0.5 + 0.5;

  // Soft black border where the warped image leaves the tube.
  let edge = 0.004 + curveAmt * 0.02;
  let mask = smoothstep(0.0, edge, cuv.x) * smoothstep(0.0, edge, 1.0 - cuv.x)
           * smoothstep(0.0, edge, cuv.y) * smoothstep(0.0, edge, 1.0 - cuv.y);

  // Chromatic aberration that grows toward the edges.
  let ca = params.chroma * 0.012 * r2;
  let dir = normalize(cc + vec2f(0.00001, 0.00001));
  let rC = textureSample(inputTex, texSampler, cuv + dir * ca).r;
  let gC = textureSample(inputTex, texSampler, cuv).g;
  let bC = textureSample(inputTex, texSampler, cuv - dir * ca).b;
  let aC = textureSample(inputTex, texSampler, cuv).a;
  var rgb = vec3f(rC, gC, bC);

  // Scanlines (resolution-independent line count).
  let sl = 0.5 + 0.5 * sin(cuv.y * 320.0 * PI);
  rgb = rgb * (1.0 - clamp(params.scanlines, 0.0, 1.0) * (1.0 - sl));

  // Vignette toward the corners.
  rgb = rgb * (1.0 - clamp(params.vignette, 0.0, 1.0) * smoothstep(0.35, 1.5, r2));

  return vec4f(rgb * mask, aC);
}`,params:{curvature:{type:`number`,label:`Curvature`,default:.3,min:0,max:1,step:.01,animatable:!0},scanlines:{type:`number`,label:`Scanlines`,default:.3,min:0,max:1,step:.01,animatable:!0},vignette:{type:`number`,label:`Vignette`,default:.3,min:0,max:1,step:.01,animatable:!0},chroma:{type:`number`,label:`Chroma`,default:.4,min:0,max:2,step:.01,animatable:!0}},packUniforms:(e,t,n)=>new Float32Array([e.curvature??.3,e.scanlines??.3,e.vignette??.3,e.chroma??.4,t,n,0,0])};function er(e){return Math.min(1,Math.max(0,e))}function j(e,t){if(!e.startsWith(`#`))return t;let n=e.slice(1);if(n.length===3||n.length===4){let e=n.split(``).map(e=>parseInt(e+e,16)/255);return[e[0]??t[0],e[1]??t[1],e[2]??t[2],e[3]??1]}if(n.length===6||n.length===8){let e=[parseInt(n.slice(0,2),16)/255,parseInt(n.slice(2,4),16)/255,parseInt(n.slice(4,6),16)/255,n.length===8?parseInt(n.slice(6,8),16)/255:1];if(e.every(e=>Number.isFinite(e)))return e}return t}function tr(e,t){return!e||e<=0||!Number.isFinite(e)?.5:er((300-Math.max(7,Math.min(300,t/e)))/293)**(1/.7)}function nr(e,t){return!e||!t||t<=0?1.25:Math.max(0,Math.min(2,e/t*2))}const rr={id:`gpu-halftone`,name:`Halftone`,category:`stylize`,entryPoint:`halftoneFragment`,uniformSize:80,shader:`
struct HalftoneParams {
  colorFront: vec4f,
  colorBack: vec4f,
  primary: vec4f,
  secondary: vec4f,
  tertiary: vec4f,
};

struct HalftoneSample {
  shape: f32,
  color: vec4f,
};

@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: HalftoneParams;

fn rotateHalftonePoint(p: vec2f, angleRad: f32) -> vec2f {
  let c = cos(angleRad);
  let s = sin(angleRad);
  return vec2f(p.x * c - p.y * s, p.x * s + p.y * c);
}

fn halftoneLinearStep(edge0: f32, edge1: f32, x: f32) -> f32 {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

fn halftoneSmoothStep(edge0: f32, edge1: f32, x: f32) -> f32 {
  return smoothstep(edge0, edge1, x);
}

fn halftoneSigmoid(x: f32, k: f32) -> f32 {
  return 1.0 / (1.0 + exp(-k * (x - 0.5)));
}

fn getCircle(uv: vec2f, r: f32, baseR: f32) -> f32 {
  let rr = mix(0.25 * baseR, 0.0, r);
  let d = length(uv - 0.5);
  let aa = 0.02;
  return 1.0 - smoothstep(rr - aa, rr + aa, d);
}

fn getCell(uv: vec2f) -> f32 {
  let insideX = step(0.0, uv.x) * (1.0 - step(1.0, uv.x));
  let insideY = step(0.0, uv.y) * (1.0 - step(1.0, uv.y));
  return insideX * insideY;
}

fn getCircleWithHole(uv: vec2f, r: f32, baseR: f32) -> f32 {
  let cell = getCell(uv);
  let rr = mix(0.75 * baseR, 0.0, r);
  let rMod = rr - floor(rr / 0.5) * 0.5;
  let d = length(uv - 0.5);
  let aa = 0.02;
  let circle = 1.0 - smoothstep(rMod - aa, rMod + aa, d);
  if (rr < 0.5) {
    return circle;
  }
  return cell - circle;
}

fn getGooeyBall(uv: vec2f, r: f32, baseR: f32, gridType: i32) -> f32 {
  var d = length(uv - 0.5);
  var sizeRadius = 0.3;
  if (gridType == 1) {
    sizeRadius = 0.42;
  }
  sizeRadius = mix(sizeRadius * baseR, 0.0, r);
  d = 1.0 - halftoneSmoothStep(0.0, sizeRadius, d);
  d = pow(d, 2.0 + baseR);
  return d;
}

fn getSoftBall(uv: vec2f, r: f32, baseR: f32) -> f32 {
  var d = length(uv - 0.5);
  var sizeRadius = clamp(baseR, 0.0, 1.0);
  sizeRadius = mix(0.5 * sizeRadius, 0.0, r);
  d = 1.0 - halftoneLinearStep(0.0, sizeRadius, d);
  let powRadius = 1.0 - halftoneLinearStep(0.0, 2.0, baseR);
  d = pow(d, 4.0 + 3.0 * powRadius);
  return d;
}

fn getLumAtPx(uv: vec2f, contrast: f32, inverted: bool) -> f32 {
  let tex = textureSampleLevel(inputTex, texSampler, uv, 0.0);
  if (tex.a <= 1e-4) {
    return select(0.0, 1.0, inverted);
  }
  let color = vec3f(
    halftoneSigmoid(tex.r, contrast),
    halftoneSigmoid(tex.g, contrast),
    halftoneSigmoid(tex.b, contrast)
  );
  var lum = luminance(color);
  if (inverted) {
    lum = 1.0 - lum;
  }
  return lum;
}

fn getLumBall(
  p: vec2f,
  pad: vec2f,
  texelSize: vec2f,
  inCellOffset: vec2f,
  contrast: f32,
  baseR: f32,
  stepSize: f32,
  styleType: i32,
  gridType: i32,
  inverted: bool,
  grainMixer: f32,
  grainSizeParam: f32
) -> HalftoneSample {
  let pp = p + inCellOffset;
  let uv_i = floor(pp);
  let uv_f = fract(pp);
  let samplingUV = (uv_i + 0.5 - inCellOffset) * pad + 0.5;
  let safeSamplingUV = clamp(samplingUV, texelSize * 0.5, vec2f(1.0) - texelSize * 0.5);
  var lum = getLumAtPx(safeSamplingUV, contrast, inverted);
  if (grainMixer > 0.001) {
    let grainSizeCurve = pow(grainSizeParam, 0.72);
    let grainDomainScale = mix(2600.0, 55.0, grainSizeCurve);
    let grainDomain = safeSamplingUV * grainDomainScale + inCellOffset * 37.0 + vec2f(21.0, -14.0);
    let grainPrimary = halftoneOverlayNoise(grainDomain * mix(1.15, 0.2, grainSizeCurve));
    let grainSecondary = halftoneNoise(
      grainDomain * mix(2.1, 0.38, grainSizeCurve) +
      uv_f * mix(14.0, 4.0, grainSizeCurve)
    );
    let edgeWeight = 1.0 - abs(lum * 2.0 - 1.0);
    let lumJitter = (grainSecondary * 2.0 - 1.0) * (0.08 + 0.32 * grainMixer) * (0.3 + 0.7 * edgeWeight);
    let lumCut = smoothstep(0.45, 0.85 - 0.2 * grainMixer, grainPrimary) * grainMixer * (0.1 + 0.8 * edgeWeight);
    lum = clamp(lum + lumJitter - lumCut, 0.0, 1.0);
  }
  let sampledColor = textureSampleLevel(inputTex, texSampler, safeSamplingUV, 0.0);
  let sourceCoverage = sampledColor.a;
  if (sourceCoverage <= 1e-4) {
    return HalftoneSample(0.0, vec4f(0.0));
  }
  var ballColor = vec4f(sampledColor.rgb * sourceCoverage, sourceCoverage);
  var ball = 0.0;
  if (styleType == 0) {
    ball = getCircle(uv_f, lum, baseR);
  } else if (styleType == 1) {
    ball = getGooeyBall(uv_f, lum, baseR, gridType);
  } else if (styleType == 2) {
    ball = getCircleWithHole(uv_f, lum, baseR);
  } else {
    ball = getSoftBall(uv_f, lum, baseR);
  }
  return HalftoneSample(ball * sourceCoverage, ballColor);
}

fn halftoneNoise(p: vec2f) -> f32 {
  let layerA = noise2d(p);
  let layerB = noise2d(vec2f(
    p.x * 1.31 + p.y * 0.74,
    p.x * -0.68 + p.y * 1.27
  ) + vec2f(11.7, 3.9));
  let layerC = noise2d(vec2f(
    p.x * -0.57 + p.y * 1.43,
    p.x * 1.19 + p.y * 0.53
  ) + vec2f(-7.4, 13.1));
  return (layerA + layerB + layerC) / 3.0;
}

fn halftoneOverlayNoise(p: vec2f) -> f32 {
  let coarse = halftoneNoise(p * 0.73 + vec2f(5.31, -8.17));
  let medium = halftoneNoise(vec2f(
    p.x * 1.41 - p.y * 0.52,
    p.x * 0.67 + p.y * 1.28
  ) + vec2f(-11.4, 4.6));
  let fine = halftoneNoise(vec2f(
    p.x * -0.88 + p.y * 1.19,
    p.x * -1.07 - p.y * 0.79
  ) + vec2f(8.2, 10.7));
  return coarse * 0.45 + medium * 0.35 + fine * 0.2;
}

fn getStepCount(styleType: i32) -> i32 {
  if (styleType == 1) {
    return 6;
  }
  if (styleType == 3) {
    return 6;
  }
  if (styleType == 0) {
    return 2;
  }
  return 1;
}

@fragment
fn halftoneFragment(input: VertexOutput) -> @location(0) vec4f {
  let sourceSample = textureSampleLevel(inputTex, texSampler, input.uv, 0.0);
  let sourceAlpha = sourceSample.a;
  if (sourceAlpha <= 1e-4) {
    return vec4f(0.0);
  }

  let dims = vec2f(textureDimensions(inputTex));
  let aspect = max(dims.x / max(dims.y, 1.0), 0.0001);
  let size = clamp(params.primary.x, 0.0, 1.0);
  let radius = clamp(params.primary.y, 0.0, 2.0);
  let contrastParam = clamp(params.primary.z, 0.0, 1.0);
  let originalColors = params.secondary.x > 0.5;
  let inverted = params.secondary.y > 0.5;
  let grainMixer = clamp(params.secondary.z, 0.0, 1.0);
  let grainOverlay = clamp(params.secondary.w, 0.0, 1.0);
  let grainSizeParam = clamp(params.tertiary.x, 0.0, 1.0);
  let gridType = i32(params.tertiary.y);
  let styleType = i32(params.tertiary.z);

  let stepCount = getStepCount(styleType);
  let stepSize = 1.0 / f32(stepCount);

  var cellsPerSide = mix(300.0, 7.0, pow(size, 0.7));
  cellsPerSide /= f32(stepCount);
  let cellSizeY = 1.0 / cellsPerSide;
  var pad = cellSizeY * vec2f(1.0 / aspect, 1.0);
  if (styleType == 1 && gridType == 1) {
    pad *= 0.7;
  }
  // Snap to whole cells AND force odd counts.  With an odd cell count the
  // centered grid puts uv = ±N.5 at the texture edges, which lands at
  // fract = 0.5 — right on the dot center.  Even counts land at fract = 0
  // (cell boundary), exposing the paper/background as a rectangular border.
  var rawCols = max(1.0, round(1.0 / max(pad.x, 1e-4)));
  var rawRows = max(1.0, round(1.0 / max(pad.y, 1e-4)));
  let cols = rawCols + select(0.0, 1.0, fract(rawCols * 0.5) < 0.25);
  let rows = rawRows + select(0.0, 1.0, fract(rawRows * 0.5) < 0.25);
  pad = vec2f(1.0 / cols, 1.0 / rows);
  let texelSize = 1.0 / max(dims, vec2f(1.0));

  var uv = input.uv - 0.5;
  uv /= pad;

  var contrast = mix(0.0, 15.0, pow(contrastParam, 1.5));
  var baseRadius = radius;
  if (originalColors) {
    contrast = mix(0.1, 4.0, pow(contrastParam, 2.0));
    baseRadius = 2.0 * pow(0.5 * radius, 0.3);
  }

  var totalShape = 0.0;
  var totalColor = vec3f(0.0);
  var totalOpacity = 0.0;

  for (var xi = 0; xi < 6; xi = xi + 1) {
    if (xi >= stepCount) {
      continue;
    }

    for (var yi = 0; yi < 6; yi = yi + 1) {
      if (yi >= stepCount) {
        continue;
      }

      var offset = vec2f(f32(xi) / f32(stepCount) - 0.5, f32(yi) / f32(stepCount) - 0.5);
      if (gridType == 1) {
        var rowIndex = f32(yi);
        var colIndex = f32(xi);
        if (stepCount == 1) {
          rowIndex = floor(uv.y + offset.y + 1.0);
          if (styleType == 1) {
            colIndex = floor(uv.x + offset.x + 1.0);
          }
        }
        if (styleType == 1) {
          if (fract((rowIndex + colIndex) * 0.5) >= 0.5) {
            continue;
          }
        } else if (fract(rowIndex * 0.5) >= 0.5) {
          offset.x += 0.5 * stepSize;
        }
      }

      let sample = getLumBall(
        uv,
        pad,
        texelSize,
        offset,
        contrast,
        baseRadius,
        stepSize,
        styleType,
        gridType,
        inverted,
        grainMixer,
        grainSizeParam
      );
      totalColor += sample.color.rgb * sample.shape;
      totalShape += sample.shape;
      totalOpacity += sample.shape;
    }
  }

  let eps = 1e-4;
  totalColor /= max(totalShape, eps);
  totalOpacity /= max(totalShape, eps);

  var finalShape = 0.0;
  if (styleType == 0) {
    finalShape = min(1.0, totalShape);
  } else if (styleType == 1) {
    let aa = 0.08;
    finalShape = smoothstep(0.5 - aa, 0.5 + aa, totalShape);
  } else if (styleType == 2) {
    finalShape = min(1.0, totalShape);
  } else {
    finalShape = totalShape;
  }

  let grainSizeCurve = pow(grainSizeParam, 0.72);
  let grainScale = mix(3200.0, 42.0, grainSizeCurve) * vec2f(1.0, 1.0 / aspect);
  let grainUV = input.uv * grainScale + vec2f(13.1, -9.7);
  let edgeBand = pow(clamp(1.0 - abs(finalShape * 2.0 - 1.0), 0.0, 1.0), 0.55);
  let grainField = halftoneOverlayNoise(grainUV * mix(0.95, 0.16, grainSizeCurve));
  let grainDetail = halftoneNoise(
    grainUV * mix(1.9, 0.28, grainSizeCurve) +
    vec2f(-17.3, 6.4)
  );
  let grainCut = smoothstep(0.42, 0.9, grainField);
  let grainWarp = (grainDetail * 2.0 - 1.0) * edgeBand * grainMixer * 0.24;
  let grainErode = edgeBand * grainCut * grainMixer * (0.35 + 1.75 * grainMixer);
  finalShape = clamp(finalShape + grainWarp - grainErode, 0.0, 1.0);

  var color = vec3f(0.0);
  var opacity = 0.0;
  if (originalColors) {
    color = totalColor * finalShape;
    opacity = totalOpacity * finalShape;
    let bgColor = params.colorBack.rgb * params.colorBack.a;
    color += bgColor * (1.0 - opacity);
    opacity += params.colorBack.a * (1.0 - opacity);
  } else {
    let fgColor = params.colorFront.rgb * params.colorFront.a;
    let bgColor = params.colorBack.rgb * params.colorBack.a;
    color = fgColor * finalShape;
    opacity = params.colorFront.a * finalShape;
    color += bgColor * (1.0 - opacity);
    opacity += params.colorBack.a * (1.0 - opacity);
  }

  var grainOverlayNoise = halftoneOverlayNoise(grainUV * mix(0.9, 0.14, grainSizeCurve));
  grainOverlayNoise = pow(grainOverlayNoise, 1.3);
  let grainOverlayV = grainOverlayNoise * 2.0 - 1.0;
  let grainOverlayColor = vec3f(select(0.0, 1.0, grainOverlayV >= 0.0));
  var grainOverlayStrength = grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, 0.8);
  color = mix(color, grainOverlayColor, 0.5 * grainOverlayStrength);
  opacity += 0.5 * grainOverlayStrength;

  opacity = clamp(opacity, 0.0, 1.0) * sourceAlpha;

  // Output STRAIGHT alpha (RGB not premultiplied) — the final blit premultiplies
  // once for the premultiplied output canvas. Multiplying RGB by sourceAlpha here
  // too would premultiply twice on masked/transparent content (sourceAlpha^2),
  // darkening the mask edge into a visible seam. Opaque pixels (sourceAlpha = 1)
  // are unchanged.
  return vec4f(clamp(color, vec3f(0.0), vec3f(1.0)), opacity);
}`,params:{colorFront:{type:`color`,label:`Front Color`,default:`#2b2b2b`,animatable:!0},colorBack:{type:`color`,label:`Back Color`,default:`#f2f1e8`,animatable:!0},originalColors:{type:`boolean`,label:`Original Colors`,default:!1},inverted:{type:`boolean`,label:`Inverted`,default:!1},grid:{type:`select`,label:`Grid`,default:`hex`,options:[{value:`hex`,label:`Hex`},{value:`square`,label:`Square`}]},type:{type:`select`,label:`Type`,default:`gooey`,options:[{value:`classic`,label:`Classic`},{value:`gooey`,label:`Gooey`},{value:`holes`,label:`Holes`},{value:`soft`,label:`Soft`}]},size:{type:`number`,label:`Size`,default:.5,min:0,max:1,step:.01,animatable:!0},radius:{type:`number`,label:`Radius`,default:1.25,min:0,max:2,step:.01,animatable:!0},contrast:{type:`number`,label:`Contrast`,default:.4,min:0,max:1,step:.01,animatable:!0},grainMixer:{type:`number`,label:`Grain Mixer`,default:.2,min:0,max:1,step:.01,animatable:!0},grainOverlay:{type:`number`,label:`Grain Overlay`,default:.2,min:0,max:1,step:.01,animatable:!0},grainSize:{type:`number`,label:`Grain Size`,default:.5,min:0,max:1,step:.01,animatable:!0}},packUniforms:(e,t,n)=>{let r={square:0,hex:1},i={classic:0,gooey:1,holes:2,soft:3},a=j(e.colorFront??`#2b2b2b`,[43/255,43/255,43/255,1]),o=j(e.colorBack??`#f2f1e8`,[242/255,241/255,232/255,1]),s=e.size??tr(e.spacing,n),c=e.radius??nr(e.dotSize,e.spacing),l=e.contrast??.4,u=e.originalColors??!1,d=e.inverted??e.invert??!1,f=e.grainMixer??.2,p=e.grainOverlay??.2,m=e.grainSize??.5,h=e.grid??`hex`,g=e.type??e.dotStyle??`gooey`;return new Float32Array([a[0],a[1],a[2],a[3],o[0],o[1],o[2],o[3],s,c,l,t/Math.max(n,1),+!!u,+!!d,f,p,m,r[h]??1,i[g]??1,0])}},ir={bayer2:0,bayer4:1,bayer8:2,halftone:3,lines:4,crosses:5,dots:6,grid:7,scales:8},ar={image:0,linear:1,radial:2},or={threshold:0,scaled:1},sr={circle:0,square:1,diamond:2},cr={bw:0,gameboy:1,cga:2,sepia:3},lr={standard:0,simple:1,blocks:2,dots:3,minimal:4},ur={ascii:`@%#*+=-:. `,dense:`@WB#$oahkbn+=-:. `,binary:`01`,symbols:`#@&$%*+!=;:-. `},dr={monospace:`monospace`,courier:`"Courier New", Courier, monospace`,consolas:`Consolas, "Lucida Console", monospace`,lucida:`"Lucida Console", Monaco, monospace`};function fr(e,t){if(e===`custom`){let e=[...t].slice(0,64);return e.length>0?e.join(``):null}return ur[e]??null}function pr(e,t){let n=[...e].slice(0,64),r=Math.max(n.length,1)*24,i=new Uint8Array(r*24*4),a=(typeof OffscreenCanvas<`u`?new OffscreenCanvas(r,24):null)?.getContext(`2d`,{willReadFrequently:!0});if(!a)return i.fill(255),{width:r,height:24,depth:1,data:i};let o=dr[t]??dr.monospace;a.clearRect(0,0,r,24),a.fillStyle=`#ffffff`,a.font=`20px ${o}`,a.textAlign=`center`,a.textBaseline=`middle`;for(let e=0;e<n.length;e++)a.fillText(n[e],e*24+12,13);let s=a.getImageData(0,0,r,24).data;for(let e=0;e<r*24;e++){let t=s[e*4+3]??0;i[e*4]=t,i[e*4+1]=t,i[e*4+2]=t,i[e*4+3]=t}return{width:r,height:24,depth:1,data:i}}const mr={id:`gpu-dither`,name:`Dither`,category:`stylize`,entryPoint:`ditherFragment`,uniformSize:48,shader:`
struct DitherParams {
  cellSize: f32, angleDeg: f32, scalePercent: f32, width: f32,
  height: f32, offsetX: f32, offsetY: f32, patternKind: f32,
  modeKind: f32, styleKind: f32, shapeKind: f32, paletteKind: f32,
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: DitherParams;

fn bayer2Threshold(cell: vec2i) -> f32 {
  let x = cell.x % 2;
  let y = cell.y % 2;
  var raw = 0.0;
  if (y == 0) {
    raw = select(0.0, 2.0, x == 1);
  } else {
    raw = select(3.0, 1.0, x == 1);
  }
  return (raw + 0.5) / 4.0;
}

fn bayer4Index(cell: vec2i) -> i32 {
  let x = cell.x % 4;
  let y = cell.y % 4;
  if (y == 0) {
    if (x == 0) { return 0; }
    if (x == 1) { return 8; }
    if (x == 2) { return 2; }
    return 10;
  }
  if (y == 1) {
    if (x == 0) { return 12; }
    if (x == 1) { return 4; }
    if (x == 2) { return 14; }
    return 6;
  }
  if (y == 2) {
    if (x == 0) { return 3; }
    if (x == 1) { return 11; }
    if (x == 2) { return 1; }
    return 9;
  }
  if (x == 0) { return 15; }
  if (x == 1) { return 7; }
  if (x == 2) { return 13; }
  return 5;
}

fn bayer4Threshold(cell: vec2i) -> f32 {
  return (f32(bayer4Index(cell)) + 0.5) / 16.0;
}

fn bayer8Threshold(cell: vec2i) -> f32 {
  let base = bayer4Index(vec2i(cell.x % 4, cell.y % 4));
  let quad = select(0, 1, (cell.x % 8) >= 4) + select(0, 2, (cell.y % 8) >= 4);
  let offset = select(0, select(2, select(3, 1, quad == 3), quad == 2), quad > 0);
  let raw = 4 * base + offset;
  return (f32(raw) + 0.5) / 64.0;
}

fn patternThreshold(patternKind: i32, cell: vec2f, patternCellSize: f32) -> f32 {
  if (patternKind == 0) {
    return bayer2Threshold(vec2i(cell));
  }
  if (patternKind == 1) {
    return bayer4Threshold(vec2i(cell));
  }
  if (patternKind == 2) {
    return bayer8Threshold(vec2i(cell));
  }

  let safeCellSize = max(2.0, patternCellSize);
  let nx = fract(cell.x / safeCellSize);
  let ny = fract(cell.y / safeCellSize);
  let cx = 0.5;
  let cy = 0.5;

  if (patternKind == 3 || patternKind == 6) {
    let dx = nx - cx;
    let dy = ny - cy;
    return sqrt(dx * dx + dy * dy) * 1.41421356237;
  }
  if (patternKind == 4) {
    return ny;
  }
  if (patternKind == 5) {
    let distX = abs(nx - cx);
    let distY = abs(ny - cy);
    return min(distX, distY) * 2.0;
  }
  if (patternKind == 7) {
    let distX = abs(nx - cx);
    let distY = abs(ny - cy);
    return max(distX, distY) * 2.0;
  }
  if (patternKind == 8) {
    let sx = fract(nx * 2.0);
    let sy = fract(ny * 2.0);
    let dx = sx - 0.5;
    let dy = sy - 0.5;
    return sqrt(dx * dx + dy * dy) * 1.41421356237;
  }
  return 0.5;
}

fn paletteLastIndex(paletteKind: i32) -> i32 {
  if (paletteKind == 0) { return 1; }
  return 3;
}

fn paletteIndex(value: f32, paletteKind: i32) -> i32 {
  if (paletteKind == 0) {
    return select(1, 0, value <= 0.5);
  }
  if (value <= 0.25) { return 0; }
  if (value <= 0.5) { return 1; }
  if (value <= 0.75) { return 2; }
  return 3;
}

fn paletteColor(paletteKind: i32, colorIndex: i32) -> vec3f {
  if (paletteKind == 0) {
    if (colorIndex == 0) { return vec3f(0.0, 0.0, 0.0); }
    return vec3f(1.0, 1.0, 1.0);
  }
  if (paletteKind == 1) {
    if (colorIndex == 0) { return vec3f(0.0588, 0.2196, 0.0588); }
    if (colorIndex == 1) { return vec3f(0.1882, 0.3843, 0.1882); }
    if (colorIndex == 2) { return vec3f(0.5451, 0.6745, 0.0588); }
    return vec3f(0.6078, 0.7373, 0.0588);
  }
  if (paletteKind == 2) {
    if (colorIndex == 0) { return vec3f(0.0, 0.0, 0.0); }
    if (colorIndex == 1) { return vec3f(0.3333, 1.0, 1.0); }
    if (colorIndex == 2) { return vec3f(1.0, 0.3333, 1.0); }
    return vec3f(1.0, 1.0, 1.0);
  }
  if (colorIndex == 0) { return vec3f(0.1686, 0.1137, 0.0549); }
  if (colorIndex == 1) { return vec3f(0.4196, 0.2588, 0.1490); }
  if (colorIndex == 2) { return vec3f(0.7686, 0.5843, 0.4157); }
  return vec3f(0.9608, 0.9020, 0.7843);
}

fn clampTexelCoord(coord: vec2i, texSize: vec2i) -> vec2i {
  return vec2i(
    clamp(coord.x, 0, max(texSize.x - 1, 0)),
    clamp(coord.y, 0, max(texSize.y - 1, 0))
  );
}

fn loadInputTexel(coord: vec2i, texSize: vec2i) -> vec4f {
  return textureLoad(inputTex, clampTexelCoord(coord, texSize), 0);
}

fn sampleCellBrightness(cell: vec2f, cellSize: f32, texSizeI: vec2i) -> f32 {
  let sampleOffsets = array<vec2f, 4>(
    vec2f(0.25, 0.25),
    vec2f(0.75, 0.25),
    vec2f(0.25, 0.75),
    vec2f(0.75, 0.75)
  );
  var luminanceSum = 0.0;
  var alphaSum = 0.0;
  for (var i = 0; i < 4; i++) {
    let sampleCoord = vec2i((cell + sampleOffsets[i]) * cellSize);
    let sampleColor = loadInputTexel(sampleCoord, texSizeI);
    luminanceSum += luminance601(sampleColor.rgb) * sampleColor.a;
    alphaSum += sampleColor.a;
  }
  if (alphaSum <= 0.0001) {
    return 0.0;
  }
  return luminanceSum / alphaSum;
}

fn applyMode(brightness: f32, cell: vec2f, gridSize: vec2f, modeKind: i32, angleDeg: f32, scalePercent: f32, offsetX: f32, offsetY: f32) -> f32 {
  var adjusted = brightness;
  let nx = cell.x / max(gridSize.x, 1.0);
  let ny = cell.y / max(gridSize.y, 1.0);
  if (modeKind == 1) {
    let angleRad = angleDeg * PI / 180.0;
    let gradient = nx * cos(angleRad) + ny * sin(angleRad);
    adjusted = clamp(adjusted * 0.7 + gradient * 0.3, 0.0, 1.0);
  } else if (modeKind == 2) {
    let ox = offsetX / 100.0;
    let oy = offsetY / 100.0;
    let dx = nx - (0.5 + ox);
    let dy = ny - (0.5 + oy);
    let dist = length(vec2f(dx, dy)) * (scalePercent / 100.0) * 2.0;
    adjusted = clamp(adjusted * 0.7 + dist * 0.3, 0.0, 1.0);
  }
  return adjusted;
}

fn shapeMask(shapeKind: i32, localUv: vec2f, sizeFactor: f32, cellSize: f32) -> f32 {
  let centered = abs(localUv - 0.5) * 2.0;
  let radius = clamp(sizeFactor, 0.0, 1.0);
  let aa = max(1.0 / max(cellSize, 1.0), 0.003);

  if (shapeKind == 0) {
    return 1.0 - smoothstep(radius, radius + aa, length(centered));
  }
  if (shapeKind == 2) {
    return 1.0 - smoothstep(radius, radius + aa, centered.x + centered.y);
  }
  return 1.0 - smoothstep(radius, radius + aa, max(centered.x, centered.y));
}

@fragment
fn ditherFragment(input: VertexOutput) -> @location(0) vec4f {
  let texSize = vec2f(params.width, params.height);
  let texSizeI = vec2i(max(i32(params.width), 1), max(i32(params.height), 1));
  let cellSize = max(params.cellSize, 1.0);
  let pixelPos = input.uv * texSize;
  let base = loadInputTexel(vec2i(pixelPos), texSizeI);
  if (base.a <= 0.0001) {
    return vec4f(0.0);
  }

  let cell = floor(pixelPos / cellSize);
  let localUv = fract(pixelPos / cellSize);
  let gridSize = vec2f(
    max(1.0, ceil(texSize.x / cellSize)),
    max(1.0, ceil(texSize.y / cellSize))
  );

  let modeKind = i32(params.modeKind + 0.5);
  let styleKind = i32(params.styleKind + 0.5);
  let shapeKind = i32(params.shapeKind + 0.5);
  let paletteKind = i32(params.paletteKind + 0.5);
  let patternKind = i32(params.patternKind + 0.5);

  var brightness = sampleCellBrightness(cell, cellSize, texSizeI);
  brightness = applyMode(
    brightness,
    cell,
    gridSize,
    modeKind,
    params.angleDeg,
    params.scalePercent,
    params.offsetX,
    params.offsetY
  );

  var quantized = brightness;
  var sizeFactor = 1.0;
  if (styleKind == 1) {
    sizeFactor = 1.0 - brightness;
  } else {
    let threshold = patternThreshold(patternKind, cell, max(2.0, floor(cellSize * 0.5)));
    quantized = clamp(brightness + (threshold - 0.5) * 0.5, 0.0, 1.0);
  }

  let colorIndex = paletteIndex(quantized, paletteKind);
  let background = paletteColor(paletteKind, paletteLastIndex(paletteKind));
  let foreground = paletteColor(paletteKind, colorIndex);
  let mask = shapeMask(shapeKind, localUv, sizeFactor, cellSize);
  let color = mix(background, foreground, mask);

  return vec4f(color, base.a);
}`,params:{pattern:{type:`select`,label:`Pattern`,default:`bayer4`,options:[{value:`bayer2`,label:`Bayer 2x2`},{value:`bayer4`,label:`Bayer 4x4`},{value:`bayer8`,label:`Bayer 8x8`},{value:`halftone`,label:`Halftone`},{value:`lines`,label:`Lines`},{value:`crosses`,label:`Crosses`},{value:`dots`,label:`Dots`},{value:`grid`,label:`Grid`},{value:`scales`,label:`Scales`}]},mode:{type:`select`,label:`Mode`,default:`image`,options:[{value:`image`,label:`Image`},{value:`linear`,label:`Linear`},{value:`radial`,label:`Radial`}]},style:{type:`select`,label:`Style`,default:`threshold`,options:[{value:`threshold`,label:`Threshold`},{value:`scaled`,label:`Scaled`}]},shape:{type:`select`,label:`Shape`,default:`square`,options:[{value:`circle`,label:`Circle`},{value:`square`,label:`Square`},{value:`diamond`,label:`Diamond`}]},palette:{type:`select`,label:`Palette`,default:`gameboy`,options:[{value:`bw`,label:`B&W`},{value:`gameboy`,label:`Game Boy`},{value:`cga`,label:`CGA`},{value:`sepia`,label:`Sepia`}]},cellSize:{type:`number`,label:`Cell Size`,default:8,min:2,max:32,step:1,animatable:!0},angle:{type:`number`,label:`Angle`,default:45,min:0,max:360,step:1,animatable:!0,visibleWhen:e=>e.mode===`linear`},scale:{type:`number`,label:`Scale`,default:100,min:25,max:200,step:1,animatable:!0,visibleWhen:e=>e.mode===`radial`},offsetX:{type:`number`,label:`Offset X`,default:0,min:-100,max:100,step:1,animatable:!0,visibleWhen:e=>e.mode===`radial`},offsetY:{type:`number`,label:`Offset Y`,default:0,min:-100,max:100,step:1,animatable:!0,visibleWhen:e=>e.mode===`radial`}},packUniforms:(e,t,n)=>new Float32Array([e.cellSize??8,e.angle??45,e.scale??100,t,n,e.offsetX??0,e.offsetY??0,ir[e.pattern]??ir.bayer4??0,ar[e.mode]??ar.image??0,or[e.style]??or.threshold??0,sr[e.shape]??sr.square??0,cr[e.palette]??cr.gameboy??0])},hr={id:`gpu-ascii`,name:`ASCII`,category:`stylize`,entryPoint:`asciiFragment`,uniformSize:96,shader:`
struct AsciiParams {
  fontSize: f32, letterSpacing: f32, lineHeight: f32, charsetKind: f32,
  matchSourceColor: f32, invert: f32, asciiOpacity: f32, originalOpacity: f32,
  contrast: f32, brightness: f32, saturation: f32, width: f32,
  height: f32, transparentBg: f32, edgeDetect: f32, glyphCount: f32,
  textColor: vec4f,
  bgColor: vec4f,
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: AsciiParams;
@group(0) @binding(3) var asciiAtlas: texture_2d<f32>;

fn asciiClampTexelCoord(coord: vec2i, texSize: vec2i) -> vec2i {
  return vec2i(
    clamp(coord.x, 0, max(texSize.x - 1, 0)),
    clamp(coord.y, 0, max(texSize.y - 1, 0))
  );
}

fn asciiLoadTexel(coord: vec2i, texSize: vec2i) -> vec4f {
  return textureLoad(inputTex, asciiClampTexelCoord(coord, texSize), 0);
}

fn asciiAdjustColor(color: vec3f, contrast: f32, brightness: f32) -> vec3f {
  return clamp((color - 0.5) * contrast + 0.5 + vec3f(brightness), vec3f(0.0), vec3f(1.0));
}

fn asciiApplySaturation(color: vec3f, saturation: f32) -> vec3f {
  let gray = vec3f(luminance601(color));
  return clamp(gray + (color - gray) * saturation, vec3f(0.0), vec3f(1.0));
}

fn asciiSegmentDistance(p: vec2f, a: vec2f, b: vec2f) -> f32 {
  let pa = p - a;
  let ba = b - a;
  let denom = max(dot(ba, ba), 0.0001);
  let h = clamp(dot(pa, ba) / denom, 0.0, 1.0);
  return length(pa - ba * h);
}

fn asciiLineMask(p: vec2f, a: vec2f, b: vec2f, thickness: f32, blur: f32) -> f32 {
  let d = asciiSegmentDistance(p, a, b);
  return 1.0 - smoothstep(thickness, thickness + blur, d);
}

fn asciiBoxMask(p: vec2f, center: vec2f, halfSize: vec2f, blur: f32) -> f32 {
  let d = abs(p - center) - halfSize;
  return 1.0 - smoothstep(0.0, blur, max(d.x, d.y));
}

fn asciiCircleMask(p: vec2f, center: vec2f, radius: f32, blur: f32) -> f32 {
  let d = distance(p, center);
  return 1.0 - smoothstep(radius, radius + blur, d);
}

fn asciiRingMask(p: vec2f, center: vec2f, outerRadius: f32, innerRadius: f32, blur: f32) -> f32 {
  let outer = asciiCircleMask(p, center, outerRadius, blur);
  let inner = asciiCircleMask(p, center, innerRadius, blur);
  return clamp(outer - inner, 0.0, 1.0);
}

fn asciiBayer4Index(cell: vec2i) -> i32 {
  let x = cell.x % 4;
  let y = cell.y % 4;
  if (y == 0) {
    if (x == 0) { return 0; }
    if (x == 1) { return 8; }
    if (x == 2) { return 2; }
    return 10;
  }
  if (y == 1) {
    if (x == 0) { return 12; }
    if (x == 1) { return 4; }
    if (x == 2) { return 14; }
    return 6;
  }
  if (y == 2) {
    if (x == 0) { return 3; }
    if (x == 1) { return 11; }
    if (x == 2) { return 1; }
    return 9;
  }
  if (x == 0) { return 15; }
  if (x == 1) { return 7; }
  if (x == 2) { return 13; }
  return 5;
}

fn asciiBayer4Threshold(cell: vec2i) -> f32 {
  return (f32(asciiBayer4Index(cell)) + 0.5) / 16.0;
}

fn asciiBlocksMask(glyphIndex: i32, localUv: vec2f) -> f32 {
  if (glyphIndex <= 0) {
    return 0.0;
  }
  if (glyphIndex >= 4) {
    return 1.0;
  }

  var density = 0.25;
  if (glyphIndex == 2) {
    density = 0.5;
  } else if (glyphIndex == 3) {
    density = 0.75;
  }
  let patternCell = vec2i(floor(localUv * 4.0));
  return select(0.0, 1.0, density > asciiBayer4Threshold(patternCell));
}

fn asciiStandardMask(glyphIndex: i32, localUv: vec2f, blur: f32) -> f32 {
  if (glyphIndex <= 0) {
    return 0.0;
  }
  if (glyphIndex == 1) {
    return asciiCircleMask(localUv, vec2f(0.5, 0.76), 0.06, blur);
  }
  if (glyphIndex == 2) {
    let topDot = asciiCircleMask(localUv, vec2f(0.5, 0.34), 0.05, blur);
    let bottomDot = asciiCircleMask(localUv, vec2f(0.5, 0.72), 0.05, blur);
    return clamp(topDot + bottomDot, 0.0, 1.0);
  }
  if (glyphIndex == 3) {
    return asciiBoxMask(localUv, vec2f(0.5, 0.56), vec2f(0.23, 0.05), blur);
  }
  if (glyphIndex == 4) {
    let topLine = asciiBoxMask(localUv, vec2f(0.5, 0.38), vec2f(0.23, 0.04), blur);
    let bottomLine = asciiBoxMask(localUv, vec2f(0.5, 0.66), vec2f(0.23, 0.04), blur);
    return clamp(topLine + bottomLine, 0.0, 1.0);
  }
  if (glyphIndex == 5) {
    let horizontal = asciiBoxMask(localUv, vec2f(0.5, 0.52), vec2f(0.23, 0.04), blur);
    let vertical = asciiBoxMask(localUv, vec2f(0.5, 0.52), vec2f(0.04, 0.23), blur);
    return clamp(horizontal + vertical, 0.0, 1.0);
  }
  if (glyphIndex == 6) {
    let horizontal = asciiBoxMask(localUv, vec2f(0.5, 0.52), vec2f(0.22, 0.035), blur);
    let vertical = asciiBoxMask(localUv, vec2f(0.5, 0.52), vec2f(0.035, 0.22), blur);
    let diagA = asciiLineMask(localUv, vec2f(0.22, 0.22), vec2f(0.78, 0.78), 0.03, blur);
    let diagB = asciiLineMask(localUv, vec2f(0.78, 0.22), vec2f(0.22, 0.78), 0.03, blur);
    return clamp(horizontal + vertical + diagA + diagB, 0.0, 1.0);
  }
  if (glyphIndex == 7) {
    let left = asciiBoxMask(localUv, vec2f(0.34, 0.52), vec2f(0.03, 0.26), blur);
    let right = asciiBoxMask(localUv, vec2f(0.66, 0.52), vec2f(0.03, 0.26), blur);
    let top = asciiBoxMask(localUv, vec2f(0.5, 0.36), vec2f(0.24, 0.03), blur);
    let bottom = asciiBoxMask(localUv, vec2f(0.5, 0.68), vec2f(0.24, 0.03), blur);
    return clamp(left + right + top + bottom, 0.0, 1.0);
  }
  if (glyphIndex == 8) {
    let diag = asciiLineMask(localUv, vec2f(0.18, 0.82), vec2f(0.82, 0.18), 0.03, blur);
    let topCircle = asciiRingMask(localUv, vec2f(0.3, 0.3), 0.12, 0.065, blur);
    let bottomCircle = asciiRingMask(localUv, vec2f(0.7, 0.7), 0.12, 0.065, blur);
    return clamp(diag + topCircle + bottomCircle, 0.0, 1.0);
  }

  let ring = asciiRingMask(localUv, vec2f(0.5, 0.5), 0.34, 0.19, blur);
  let inner = asciiCircleMask(localUv, vec2f(0.55, 0.49), 0.1, blur);
  let tail = asciiLineMask(localUv, vec2f(0.53, 0.52), vec2f(0.74, 0.58), 0.035, blur);
  return clamp(ring + inner + tail, 0.0, 1.0);
}

fn asciiGlyphCount(charsetKind: i32) -> i32 {
  if (charsetKind == 1) { return 6; }
  if (charsetKind == 2) { return 5; }
  if (charsetKind == 3) { return 4; }
  if (charsetKind == 4) { return 3; }
  return 10;
}

fn asciiGlyphMask(charsetKind: i32, glyphIndex: i32, localUv: vec2f, blur: f32) -> f32 {
  if (charsetKind == 0) {
    return asciiStandardMask(glyphIndex, localUv, blur);
  }
  if (charsetKind == 1) {
    let mapped = array<i32, 6>(0, 1, 3, 5, 6, 7);
    return asciiStandardMask(mapped[clamp(glyphIndex, 0, 5)], localUv, blur);
  }
  if (charsetKind == 2) {
    return asciiBlocksMask(glyphIndex, localUv);
  }
  if (charsetKind == 3) {
    if (glyphIndex <= 0) { return 0.0; }
    if (glyphIndex == 1) { return asciiCircleMask(localUv, vec2f(0.5, 0.56), 0.05, blur); }
    if (glyphIndex == 2) { return asciiCircleMask(localUv, vec2f(0.5, 0.54), 0.1, blur); }
    return asciiCircleMask(localUv, vec2f(0.5, 0.52), 0.16, blur);
  }
  if (glyphIndex <= 0) {
    return 0.0;
  }
  if (glyphIndex == 1) {
    return asciiCircleMask(localUv, vec2f(0.5, 0.58), 0.055, blur);
  }
  let diagA = asciiLineMask(localUv, vec2f(0.24, 0.24), vec2f(0.76, 0.76), 0.035, blur);
  let diagB = asciiLineMask(localUv, vec2f(0.76, 0.24), vec2f(0.24, 0.76), 0.035, blur);
  return clamp(diagA + diagB, 0.0, 1.0);
}

fn asciiGlyphIndex(brightness: f32, charsetKind: i32) -> i32 {
  let maxIndex = max(asciiGlyphCount(charsetKind) - 1, 0);
  let scaled = floor(clamp(brightness, 0.0, 1.0) * f32(maxIndex));
  return i32(clamp(scaled, 0.0, f32(maxIndex)));
}

// Sobel edge magnitude sampled at cell scale (steps = one cell), used to drive
// glyph density in edge-detection mode so glyphs trace contours instead of tone.
fn asciiEdgeStrength(centerPx: vec2f, texSize: vec2i, stepX: f32, stepY: f32) -> f32 {
  let sx = max(stepX, 1.0);
  let sy = max(stepY, 1.0);
  let tl = luminance601(asciiLoadTexel(vec2i(centerPx + vec2f(-sx, -sy)), texSize).rgb);
  let tc = luminance601(asciiLoadTexel(vec2i(centerPx + vec2f(0.0, -sy)), texSize).rgb);
  let tr = luminance601(asciiLoadTexel(vec2i(centerPx + vec2f(sx, -sy)), texSize).rgb);
  let ml = luminance601(asciiLoadTexel(vec2i(centerPx + vec2f(-sx, 0.0)), texSize).rgb);
  let mr = luminance601(asciiLoadTexel(vec2i(centerPx + vec2f(sx, 0.0)), texSize).rgb);
  let bl = luminance601(asciiLoadTexel(vec2i(centerPx + vec2f(-sx, sy)), texSize).rgb);
  let bc = luminance601(asciiLoadTexel(vec2i(centerPx + vec2f(0.0, sy)), texSize).rgb);
  let br = luminance601(asciiLoadTexel(vec2i(centerPx + vec2f(sx, sy)), texSize).rgb);
  let gx = (tr + 2.0 * mr + br) - (tl + 2.0 * ml + bl);
  let gy = (bl + 2.0 * bc + br) - (tl + 2.0 * tc + tr);
  return clamp(length(vec2f(gx, gy)), 0.0, 1.0);
}

@fragment
fn asciiFragment(input: VertexOutput) -> @location(0) vec4f {
  let texSize = vec2f(params.width, params.height);
  let texSizeI = vec2i(max(i32(params.width), 1), max(i32(params.height), 1));
  let pixelPos = input.uv * texSize;
  let base = asciiLoadTexel(vec2i(pixelPos), texSizeI);
  if (base.a <= 0.0001) {
    return vec4f(0.0);
  }

  let adjustedBase = asciiAdjustColor(base.rgb, params.contrast, params.brightness);
  let background = mix(params.bgColor.rgb, adjustedBase, params.originalOpacity);

  let charAspect = max(0.25, 0.6 + params.letterSpacing * 0.05);
  let cellWidth = max(params.fontSize * charAspect, 1.0);
  let cellHeight = max(params.fontSize * max(params.lineHeight, 0.25), 1.0);
  let cols = max(1.0, floor(params.width / cellWidth));
  let rows = max(1.0, floor(params.height / cellHeight));
  let gridSize = vec2f(cols * cellWidth, rows * cellHeight);
  let origin = (texSize - gridSize) * 0.5;

  let transparent = params.transparentBg >= 0.5;

  if (
    pixelPos.x < origin.x ||
    pixelPos.y < origin.y ||
    pixelPos.x >= origin.x + gridSize.x ||
    pixelPos.y >= origin.y + gridSize.y
  ) {
    // Border (grid letterboxing): no glyphs here. Transparent mode shows only the
    // original at its opacity; opaque mode shows the filled background.
    if (transparent) {
      return vec4f(adjustedBase, base.a * params.originalOpacity);
    }
    return vec4f(background, base.a);
  }

  let gridPos = (pixelPos - origin) / vec2f(cellWidth, cellHeight);
  let cell = floor(gridPos);
  let localUv = fract(gridPos);
  let samplePos = origin + (cell + vec2f(0.5)) * vec2f(cellWidth, cellHeight);
  let sampleColor = asciiLoadTexel(vec2i(samplePos), texSizeI);
  let adjustedSample = asciiAdjustColor(sampleColor.rgb, params.contrast, params.brightness);

  // Glyph density is driven by tone, or by edge magnitude in edge-detection mode.
  var density = luminance601(adjustedSample);
  if (params.edgeDetect >= 0.5) {
    density = asciiEdgeStrength(samplePos, texSizeI, cellWidth, cellHeight);
  }
  if (params.invert >= 0.5) {
    density = 1.0 - density;
  }

  // Atlas charsets (glyphCount > 0) sample real glyphs; otherwise fall back to
  // the procedural mask shapes of the legacy charsets.
  var mask = 0.0;
  if (params.glyphCount > 0.5) {
    let n = i32(params.glyphCount + 0.5);
    let gi = clamp(i32(floor(density * f32(n))), 0, n - 1);
    let lx = clamp(localUv.x, 0.04, 0.96);
    let atlasUv = vec2f((f32(gi) + lx) / f32(n), localUv.y);
    mask = textureSampleLevel(asciiAtlas, texSampler, atlasUv, 0.0).a;
  } else {
    let charsetKind = i32(params.charsetKind + 0.5);
    let glyphIndex = asciiGlyphIndex(density, charsetKind);
    let blur = max(0.5 / min(cellWidth, cellHeight), 0.002);
    mask = asciiGlyphMask(charsetKind, glyphIndex, localUv, blur);
  }

  var glyphColor = params.textColor.rgb;
  if (params.matchSourceColor >= 0.5) {
    glyphColor = asciiApplySaturation(adjustedSample, params.saturation);
  }

  let inkAlpha = clamp(mask * params.asciiOpacity, 0.0, 1.0);

  if (transparent) {
    // Composite glyph ink over the (optional) original underlay over transparency.
    let underA = params.originalOpacity * (1.0 - inkAlpha);
    let outA = inkAlpha + underA;
    let outRGB = (glyphColor * inkAlpha + adjustedBase * underA) / max(outA, 0.0001);
    return vec4f(outRGB, base.a * outA);
  }

  let color = mix(background, glyphColor, inkAlpha);
  return vec4f(color, base.a);
}`,params:{charSet:{type:`select`,label:`Character Set`,default:`ascii`,options:[{value:`ascii`,label:`ASCII Ramp`},{value:`dense`,label:`Dense`},{value:`binary`,label:`Binary`},{value:`symbols`,label:`Symbols`},{value:`custom`,label:`Custom`},{value:`standard`,label:`Standard (shapes)`},{value:`simple`,label:`Simple (shapes)`},{value:`blocks`,label:`Blocks (shapes)`},{value:`dots`,label:`Dots (shapes)`},{value:`minimal`,label:`Minimal (shapes)`}]},customChars:{type:`text`,label:`Custom Characters`,default:`FREECUT 01`,visibleWhen:e=>e.charSet===`custom`},font:{type:`select`,label:`Font`,default:`monospace`,options:[{value:`monospace`,label:`Monospace`},{value:`courier`,label:`Courier`},{value:`consolas`,label:`Consolas`},{value:`lucida`,label:`Lucida Console`}],visibleWhen:e=>fr(e.charSet??`ascii`,e.customChars??``)!==null},fontSize:{type:`number`,label:`Font Size`,default:8,min:4,max:24,step:1,animatable:!0},letterSpacing:{type:`number`,label:`Letter Spacing`,default:0,min:-2,max:5,step:.1,animatable:!0},lineHeight:{type:`number`,label:`Line Height`,default:1,min:.5,max:2,step:.1,animatable:!0},matchSourceColor:{type:`boolean`,label:`Match Source Color`,default:!0},textColor:{type:`color`,label:`Text Color`,default:`#ffffff`,animatable:!0,visibleWhen:e=>e.matchSourceColor!==!0},bgColor:{type:`color`,label:`Background`,default:`#0a0a0f`,animatable:!0,visibleWhen:e=>e.transparentBg!==!0},transparentBg:{type:`boolean`,label:`Transparent Background`,default:!1},edgeDetect:{type:`boolean`,label:`Edge Detection`,default:!1},colorSaturation:{type:`number`,label:`Saturation`,default:100,min:0,max:200,step:1,animatable:!0,visibleWhen:e=>e.matchSourceColor===!0},asciiOpacity:{type:`number`,label:`ASCII Opacity`,default:100,min:0,max:100,step:1,animatable:!0},originalOpacity:{type:`number`,label:`Original Opacity`,default:0,min:0,max:100,step:1,animatable:!0},contrast:{type:`number`,label:`Contrast`,default:100,min:50,max:200,step:1,animatable:!0},brightness:{type:`number`,label:`Brightness`,default:0,min:-100,max:100,step:1,animatable:!0},invert:{type:`boolean`,label:`Invert`,default:!1}},packUniforms:(e,t,n)=>{let r=j(e.textColor??`#ffffff`,[1,1,1,1]),i=j(e.bgColor??`#0a0a0f`,[10/255,10/255,15/255,1]),a=fr(e.charSet??`ascii`,e.customChars??``),o=a?[...a].length:0;return new Float32Array([e.fontSize??8,e.letterSpacing??0,e.lineHeight??1,lr[e.charSet]??lr.standard??0,e.matchSourceColor===!1?0:1,+(e.invert===!0),(e.asciiOpacity??100)/100,(e.originalOpacity??0)/100,(e.contrast??100)/100,(e.brightness??0)/255,(e.colorSaturation??100)/100,t,n,+(e.transparentBg===!0),+(e.edgeDetect===!0),o,r[0],r[1],r[2],r[3],i[0],i[1],i[2],i[3]])},dataTexture:{dimension:`2d`,key:e=>{let t=fr(e.charSet??`ascii`,e.customChars??``);return t?`${t}|${e.font??`monospace`}`:``},build:e=>{let t=fr(e.charSet??`ascii`,e.customChars??``);return t?pr(t,e.font??`monospace`):{width:1,height:1,depth:1,data:new Uint8Array([0,0,0,0])}}}},gr={id:`gpu-threshold`,name:`Threshold`,category:`stylize`,entryPoint:`thresholdFragment`,uniformSize:16,shader:`
struct ThresholdParams { level: f32, _p1: f32, _p2: f32, _p3: f32 };
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: ThresholdParams;
@fragment
fn thresholdFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let luma = luminance(color.rgb);
  let result = select(0.0, 1.0, luma > params.level);
  return vec4f(vec3f(result), color.a);
}`,params:{level:{type:`number`,label:`Level`,default:.5,min:0,max:1,step:.01,animatable:!0}},packUniforms:e=>new Float32Array([e.level??.5,0,0,0])},_r={id:`gpu-vhs`,name:`VHS`,category:`stylize`,entryPoint:`vhsFragment`,uniformSize:32,shader:`
struct VhsParams {
  bleed: f32, waviness: f32, noise: f32, scanline: f32,
  time: f32, width: f32, height: f32, pad: f32
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: VhsParams;
@fragment
fn vhsFragment(input: VertexOutput) -> @location(0) vec4f {
  let t = params.time;
  var uv = input.uv;

  // horizontal tracking wobble (sin-based, stable at any phase)
  let wave = (sin(uv.y * 120.0 + t * 5.0) + sin(uv.y * 17.0 - t * 2.3)) * 0.5;
  uv.x = uv.x + wave * params.waviness * 0.015;

  // occasional tracking-band jump. Wrap every time-derived term before it feeds
  // hash() — the sin()-based hash collapses to a constant once the unbounded
  // (time * speed) seed grows large, killing the jumps over a session / at speed.
  let bandScroll = (t * 0.7) - floor((t * 0.7) / 64.0) * 64.0;
  let jumpStep = floor(t * 3.0) - floor(floor(t * 3.0) / 64.0) * 64.0;
  let bandId = floor(uv.y * 6.0 + bandScroll);
  let bandHit = step(0.92, hash(vec2f(bandId, jumpStep)));
  uv.x = uv.x + bandHit * (hash(vec2f(bandId, 7.0)) - 0.5) * 0.06;

  // chroma bleed (luma/chroma drift)
  let off = params.bleed * 0.012;
  let r = textureSample(inputTex, texSampler, vec2f(uv.x + off, uv.y)).r;
  let g = textureSample(inputTex, texSampler, uv).g;
  let b = textureSample(inputTex, texSampler, vec2f(uv.x - off, uv.y)).b;
  let a = textureSample(inputTex, texSampler, uv).a;
  var rgb = vec3f(r, g, b);

  // scanlines
  let sl = 0.82 + 0.18 * sin(input.position.y * PI);
  rgb = mix(rgb, rgb * sl, clamp(params.scanline, 0.0, 1.0));

  // tape noise — wrap the (unbounded) time addends so the per-pixel seed stays
  // bounded and the noise doesn't go static after ~30min of playback.
  let tnx = (t * 120.0) - floor((t * 120.0) / 512.0) * 512.0;
  let tny = (t * 60.0) - floor((t * 60.0) / 512.0) * 512.0;
  let n = hash(uv * vec2f(params.width, params.height) * 0.5 + vec2f(tnx, tny)) - 0.5;
  rgb = rgb + n * params.noise * 0.5;

  return vec4f(clamp(rgb, vec3f(0.0), vec3f(1.0)), a);
}`,params:{bleed:{type:`number`,label:`Chroma Bleed`,default:.4,min:0,max:2,step:.01,animatable:!0},waviness:{type:`number`,label:`Tracking`,default:.3,min:0,max:2,step:.01,animatable:!0},noise:{type:`number`,label:`Tape Noise`,default:.25,min:0,max:1,step:.01,animatable:!0},scanline:{type:`number`,label:`Scanlines`,default:.35,min:0,max:1,step:.01,animatable:!0},speed:{type:`number`,label:`Speed`,default:1,min:0,max:4,step:.1,animatable:!1}},packUniforms:(e,t,n,r=0)=>new Float32Array([e.bleed??.4,e.waviness??.3,e.noise??.25,e.scanline??.35,r*(e.speed??1),t,n,0])},vr={id:`gpu-ink`,name:`Ink`,category:`stylize`,entryPoint:`inkFragment`,uniformSize:64,shader:`
struct InkParams {
  strength: f32, spacing: f32, thickness: f32, edgeStrength: f32,
  tone: f32, width: f32, height: f32, _pad0: f32,
  inkR: f32, inkG: f32, inkB: f32,
  paperR: f32, paperG: f32, paperB: f32,
  _pad1: f32, _pad2: f32,
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: InkParams;

// Coverage of a single hatch-line set at \`angle\`, in screen-space pixels.
// Returns 1 on a line, fading to 0 between lines (smoothstep gives spatial AA).
fn inkHatch(p: vec2f, angle: f32, spacing: f32, thickness: f32) -> f32 {
  let s = sin(angle);
  let c = cos(angle);
  let coord = p.x * c - p.y * s;
  let m = coord - floor(coord / spacing) * spacing;
  let d = min(m, spacing - m);
  return 1.0 - smoothstep(thickness * 0.5, thickness * 0.5 + 1.0, d);
}

// A hatch layer that fades in as tone drops below \`hi\` (over a soft window) so
// the four tonal bands blend smoothly instead of popping on gradients.
fn inkLayer(p: vec2f, angle: f32, spacing: f32, thickness: f32, lum: f32, hi: f32) -> f32 {
  let w = 1.0 - smoothstep(hi - 0.15, hi, lum);
  return inkHatch(p, angle, spacing, thickness) * w;
}

@fragment
fn inkFragment(input: VertexOutput) -> @location(0) vec4f {
  let src = textureSample(inputTex, texSampler, input.uv);
  let texel = vec2f(1.0 / params.width, 1.0 / params.height);

  // Sobel magnitude → contour outlines.
  let tl = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(-texel.x, -texel.y)).rgb);
  let t  = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(0.0, -texel.y)).rgb);
  let tr = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(texel.x, -texel.y)).rgb);
  let l  = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(-texel.x, 0.0)).rgb);
  let r  = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(texel.x, 0.0)).rgb);
  let bl = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(-texel.x, texel.y)).rgb);
  let b  = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(0.0, texel.y)).rgb);
  let br = luminance(textureSample(inputTex, texSampler, input.uv + vec2f(texel.x, texel.y)).rgb);
  let gx = -tl - 2.0 * l - bl + tr + 2.0 * r + br;
  let gy = -tl - 2.0 * t - tr + bl + 2.0 * b + br;
  let edge = clamp(sqrt(gx * gx + gy * gy) * params.edgeStrength, 0.0, 1.0);

  let lum = clamp(luminance(src.rgb) * params.tone, 0.0, 1.0);
  let p = input.uv * vec2f(params.width, params.height);
  let sp = max(params.spacing, 1.0);
  let th = params.thickness;

  var hatch = 0.0;
  hatch = max(hatch, inkLayer(p, 0.7854, sp, th, lum, 0.85));   // 45°
  hatch = max(hatch, inkLayer(p, -0.7854, sp, th, lum, 0.65));  // -45°
  hatch = max(hatch, inkLayer(p, 0.0, sp, th, lum, 0.45));      // horizontal
  hatch = max(hatch, inkLayer(p, 1.5708, sp, th, lum, 0.25));   // vertical

  let inkAmt = clamp(max(hatch, edge) * params.strength, 0.0, 1.0);
  let paper = vec3f(params.paperR, params.paperG, params.paperB);
  let inkColor = vec3f(params.inkR, params.inkG, params.inkB);
  return vec4f(mix(paper, inkColor, inkAmt), src.a);
}`,params:{strength:{type:`number`,label:`Ink Amount`,default:1,min:0,max:1,step:.01,animatable:!0},spacing:{type:`number`,label:`Line Spacing`,default:6,min:2,max:24,step:.5,animatable:!0},thickness:{type:`number`,label:`Line Width`,default:1.2,min:.5,max:4,step:.1,animatable:!0},edgeStrength:{type:`number`,label:`Outline`,default:1.5,min:0,max:5,step:.1,animatable:!0},tone:{type:`number`,label:`Shading`,default:1,min:.2,max:2.5,step:.05,animatable:!0},inkColor:{type:`color`,label:`Ink`,default:`#141414`,animatable:!0},paperColor:{type:`color`,label:`Paper`,default:`#f4f1e8`,animatable:!0}},packUniforms:(e,t,n)=>{let r=j(e.inkColor??`#141414`,[.08,.08,.08,1]),i=j(e.paperColor??`#f4f1e8`,[.96,.95,.91,1]);return new Float32Array([e.strength??1,e.spacing??6,e.thickness??1.2,e.edgeStrength??1.5,e.tone??1,t,n,0,r[0],r[1],r[2],i[0],i[1],i[2],0,0])}},yr={id:`gpu-pixel-sort`,name:`Pixel Sort (Streak)`,category:`stylize`,entryPoint:`pixelSortFragment`,uniformSize:32,shader:`
struct PixelSortParams {
  dirX: f32, dirY: f32, low: f32, high: f32,
  length: f32, order: f32, width: f32, height: f32,
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: PixelSortParams;

// Statically-bounded scan cap keeps the loop compilable and its cost bounded;
// the animatable \`length\` param clamps the effective steps below this ceiling.
const PS_MAX_STEPS: i32 = 512;

// Sort key: carry the brightest value (order>0.5) or the darkest (order<=0.5).
fn psKey(lum: f32, order: f32) -> f32 {
  return select(-lum, lum, order > 0.5);
}

@fragment
fn pixelSortFragment(input: VertexOutput) -> @location(0) vec4f {
  let src = textureSample(inputTex, texSampler, input.uv);
  let lum0 = luminance(src.rgb);

  // Pixels outside the brightness band are left untouched — only masked spans
  // are sorted (the classic pixel-sort threshold behaviour).
  if (lum0 < params.low || lum0 > params.high) {
    return src;
  }

  let texel = vec2f(1.0 / params.width, 1.0 / params.height);
  let stepUv = vec2f(params.dirX, params.dirY) * texel;
  let maxN = i32(clamp(params.length, 1.0, f32(PS_MAX_STEPS)));

  var bestKey = psKey(lum0, params.order);
  var bestColor = src.rgb;

  for (var i: i32 = 1; i <= PS_MAX_STEPS; i = i + 1) {
    if (i > maxN) { break; }
    let uv = input.uv + stepUv * f32(i);
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) { break; }
    let s = textureSampleLevel(inputTex, texSampler, uv, 0.0);
    let l = luminance(s.rgb);
    if (l < params.low || l > params.high) { break; } // span boundary
    let k = psKey(l, params.order);
    if (k > bestKey) {
      bestKey = k;
      bestColor = s.rgb;
    }
  }
  return vec4f(bestColor, src.a);
}`,params:{direction:{type:`select`,label:`Direction`,default:`right`,options:[{value:`right`,label:`Right`},{value:`left`,label:`Left`},{value:`down`,label:`Down`},{value:`up`,label:`Up`}]},order:{type:`select`,label:`Carry`,default:`bright`,options:[{value:`bright`,label:`Bright streaks`},{value:`dark`,label:`Dark streaks`}]},low:{type:`number`,label:`Threshold Low`,default:.25,min:0,max:1,step:.01,animatable:!0},high:{type:`number`,label:`Threshold High`,default:1,min:0,max:1,step:.01,animatable:!0},length:{type:`number`,label:`Length`,default:60,min:2,max:400,step:1,quality:!0}},packUniforms:(e,t,n)=>{let r=e.direction??`right`,i=1,a=0;return r===`left`?(i=-1,a=0):r===`down`?(i=0,a=1):r===`up`&&(i=0,a=-1),new Float32Array([i,a,e.low??.25,e.high??1,e.length??60,e.order===`dark`?0:1,t,n])}},br={id:`gpu-pixel-sort-hq`,name:`Pixel Sort`,category:`stylize`,entryPoint:`pixelSortHqMain`,uniformSize:32,compute:{dispatch:(e,t)=>[Math.ceil(e/8),Math.ceil(t/8),1]},shader:`
struct PixelSortHqParams {
  low: f32, high: f32, vertical: f32, descending: f32,
  width: f32, height: f32, _p0: f32, _p1: f32,
};
@group(0) @binding(0) var inputTex: texture_2d<f32>;
@group(0) @binding(1) var outputTex: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(2) var<uniform> params: PixelSortHqParams;

fn psInBand(l: f32) -> bool {
  return l >= params.low && l <= params.high;
}

// Luminance at an axis index \`i\` (perpendicular coordinate fixed at \`perp\`).
fn psLumAt(i: i32, perp: i32, vertical: bool) -> f32 {
  let c = select(vec2i(i, perp), vec2i(perp, i), vertical);
  return luminance(textureLoad(inputTex, c, 0).rgb);
}

@compute @workgroup_size(8, 8, 1)
fn pixelSortHqMain(@builtin(global_invocation_id) gid: vec3u) {
  let W = i32(params.width);
  let H = i32(params.height);
  let x = i32(gid.x);
  let y = i32(gid.y);
  if (x >= W || y >= H) { return; }

  let selfColor = textureLoad(inputTex, vec2i(x, y), 0);
  let selfLum = luminance(selfColor.rgb);

  // Pixels outside the brightness band stay exactly where they are.
  if (!psInBand(selfLum)) {
    textureStore(outputTex, vec2i(x, y), selfColor);
    return;
  }

  let vertical = params.vertical > 0.5;
  let axisLen = select(W, H, vertical);
  let perp = select(y, x, vertical);
  let pos = select(x, y, vertical);

  // Grow the contiguous masked span [s, e] that contains this pixel.
  var s = pos;
  loop {
    if (s == 0) { break; }
    if (!psInBand(psLumAt(s - 1, perp, vertical))) { break; }
    s = s - 1;
  }
  var e = pos;
  loop {
    if (e == axisLen - 1) { break; }
    if (!psInBand(psLumAt(e + 1, perp, vertical))) { break; }
    e = e + 1;
  }

  // Rank = count of span pixels that sort before this one. Equal luminances are
  // ordered by original index so ranks are unique across the span (a bijection
  // onto [s, e]) — every destination texel receives exactly one writer.
  var rank = 0;
  for (var i = s; i <= e; i = i + 1) {
    if (i == pos) { continue; }
    let li = psLumAt(i, perp, vertical);
    if (li < selfLum || (li == selfLum && i < pos)) {
      rank = rank + 1;
    }
  }

  // Ascending places the darkest at \`s\`; descending flips the span end-for-end.
  let dstIndex = select(s + rank, e - rank, params.descending > 0.5);
  let outCoord = select(vec2i(dstIndex, perp), vec2i(perp, dstIndex), vertical);
  textureStore(outputTex, outCoord, selfColor);
}`,params:{orientation:{type:`select`,label:`Orientation`,default:`horizontal`,options:[{value:`horizontal`,label:`Horizontal`},{value:`vertical`,label:`Vertical`}]},order:{type:`select`,label:`Order`,default:`ascending`,options:[{value:`ascending`,label:`Dark → Bright`},{value:`descending`,label:`Bright → Dark`}]},low:{type:`number`,label:`Threshold Low`,default:.25,min:0,max:1,step:.01,animatable:!0},high:{type:`number`,label:`Threshold High`,default:.9,min:0,max:1,step:.01,animatable:!0}},packUniforms:(e,t,n)=>new Float32Array([e.low??.25,e.high??.9,+(e.orientation===`vertical`),+(e.order===`descending`),t,n,0,0])};var xr=/* @__PURE__ */ e({chromaKey:()=>Sr});const Sr={id:`gpu-chroma-key`,name:`Chroma Key`,category:`keying`,entryPoint:`chromaKeyFragment`,uniformSize:32,shader:`
struct ChromaKeyParams {
  keyR: f32, keyG: f32, keyB: f32, tolerance: f32,
  softness: f32, spillSuppression: f32, _p1: f32, _p2: f32,
};
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: ChromaKeyParams;

fn rgb2ycbcr(rgb: vec3f) -> vec3f {
  let y = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  let cb = 0.564 * (rgb.b - y);
  let cr = 0.713 * (rgb.r - y);
  return vec3f(y, cb, cr);
}

@fragment
fn chromaKeyFragment(input: VertexOutput) -> @location(0) vec4f {
  let color = textureSample(inputTex, texSampler, input.uv);
  let keyColor = vec3f(params.keyR, params.keyG, params.keyB);
  let colorYCbCr = rgb2ycbcr(color.rgb);
  let keyYCbCr = rgb2ycbcr(keyColor);
  let cbcrDist = length(colorYCbCr.yz - keyYCbCr.yz);
  let innerTolerance = params.tolerance;
  let outerTolerance = params.tolerance + params.softness;
  var alpha = smoothstep(innerTolerance, outerTolerance, cbcrDist);
  var finalColor = color.rgb;
  if (params.spillSuppression > 0.0) {
    if (params.keyG > params.keyR && params.keyG > params.keyB) {
      let spillAmount = max(0.0, finalColor.g - max(finalColor.r, finalColor.b)) * params.spillSuppression;
      finalColor.g -= spillAmount;
      finalColor.r += spillAmount * 0.5;
      finalColor.b += spillAmount * 0.5;
    } else if (params.keyB > params.keyR && params.keyB > params.keyG) {
      let spillAmount = max(0.0, finalColor.b - max(finalColor.r, finalColor.g)) * params.spillSuppression;
      finalColor.b -= spillAmount;
      finalColor.r += spillAmount * 0.5;
      finalColor.g += spillAmount * 0.5;
    }
  }
  return vec4f(finalColor, color.a * alpha);
}`,params:{keyColor:{type:`select`,label:`Key Color`,default:`green`,options:[{value:`green`,label:`Green Screen`},{value:`blue`,label:`Blue Screen`}]},tolerance:{type:`number`,label:`Tolerance`,default:.2,min:0,max:1,step:.01,animatable:!0},softness:{type:`number`,label:`Edge Softness`,default:.1,min:0,max:.5,step:.01,animatable:!0},spillSuppression:{type:`number`,label:`Spill Suppression`,default:.5,min:0,max:1,step:.01,animatable:!0}},packUniforms:e=>{let t=0,n=1,r=0;return e.keyColor===`blue`&&(t=0,n=0,r=1),new Float32Array([t,n,r,e.tolerance??.2,e.softness??.1,e.spillSuppression??.5,0,0])}},Cr=/* @__PURE__ */ new Map,wr={color:[],blur:[],distort:[],stylize:[],keying:[]};function Tr(e){return typeof e==`object`&&!!e&&`id`in e&&`name`in e&&`category`in e&&`shader`in e&&`entryPoint`in e&&`packUniforms`in e}function M(e){Object.values(e).forEach(e=>{Tr(e)&&(Cr.set(e.id,e),wr[e.category]?.push(e))})}M(Kt),M(bn),M(Cn),M(kn),M(Un),M(xr);function Er(e){return Cr.get(e)}function Dr(){return n(`EffectsPipeline`)}const Or=bt,kr=`
${Or}
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var inputTex: texture_2d<f32>;
@fragment
fn blitFragment(input: VertexOutput) -> @location(0) vec4f {
  // Effect textures carry straight (non-premultiplied) alpha, but the output
  // canvas is configured alphaMode:'premultiplied'. Premultiply here so that a
  // pixel an effect left with colour at alpha 0 (e.g. a gradient map over a
  // transparent Lottie) reads as fully transparent instead of leaking that
  // colour over the layers below. Opaque pixels (a = 1) are unchanged.
  let c = textureSample(inputTex, texSampler, input.uv);
  return vec4f(c.rgb * c.a, c.a);
}
`,Ar=/* @__PURE__ */ new Map([[`gpu-brightness`,1],[`gpu-contrast`,2],[`gpu-exposure`,3],[`gpu-hue-shift`,4],[`gpu-invert`,5],[`gpu-levels`,6],[`gpu-saturation`,7],[`gpu-temperature`,8],[`gpu-grayscale`,9],[`gpu-sepia`,10],[`gpu-vibrance`,11],[`gpu-posterize`,12],[`gpu-threshold`,13]]);function jr(e,t){if(!t)return e.map(e=>({kind:`single`,effect:e}));let n=[];for(let t=0;t<e.length;){if(!Ar.has(e[t].type)){n.push({kind:`single`,effect:e[t]}),t++;continue}let r=t;for(;t<e.length&&t-r<12&&Ar.has(e[t].type);)t++;let i=e.slice(r,t);i.length>1?n.push({kind:`color-batch`,effects:i}):n.push({kind:`single`,effect:i[0]})}return n}const Mr=`
${Or}
@group(0) @binding(0) var texSampler: sampler;
@group(0) @binding(1) var videoTex: texture_external;
@group(0) @binding(2) var<uniform> destRect: vec4f;
@fragment
fn importFragment(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.uv;
  let r = destRect;
  if (uv.x < r.x || uv.x > r.z || uv.y < r.y || uv.y > r.w) {
    return vec4f(0.0);
  }
  let videoUv = (uv - r.xy) / (r.zw - r.xy);
  return textureSampleBaseClampToEdge(videoTex, texSampler, videoUv);
}
`;function Nr(e){if(e instanceof HTMLVideoElement)return{width:e.videoWidth,height:e.videoHeight};if(typeof VideoFrame<`u`&&e instanceof VideoFrame)return{width:e.displayWidth,height:e.displayHeight};if(e instanceof HTMLImageElement)return{width:e.naturalWidth,height:e.naturalHeight};let t=e;return{width:t.width,height:t.height}}var Pr=class e{static sharedPipelineState=/* @__PURE__ */ new WeakMap;device;format;pipelines=/* @__PURE__ */ new Map;bindGroupLayouts=/* @__PURE__ */ new Map;computePipelines=/* @__PURE__ */ new Map;computeBindGroupLayouts=/* @__PURE__ */ new Map;sampler;blitPipeline=null;blitBindGroupLayout=null;importPipeline=null;importBindGroupLayout=null;importUniformBuffer=null;colorBatchPipeline=null;colorBatchBindGroupLayout=null;pingTexture=null;pongTexture=null;texW=0;texH=0;initialized=!1;uniformBuffers=[];pingView=null;pongView=null;effectBindGroupCache=/* @__PURE__ */ new Map;dataTextureCache=/* @__PURE__ */ new Map;blitBindGroupPing=null;blitBindGroupPong=null;outputCanvas=null;outputCtx=null;outputW=0;outputH=0;poolMode=!1;outputPool=[];batchIndex=0;constructor(e){this.device=e,this.format=navigator.gpu.getPreferredCanvasFormat(),this.sampler=e.createSampler({magFilter:`linear`,minFilter:`linear`})}static _cachedDevice=null;static _devicePromise=null;static async requestCachedDevice(){return e._cachedDevice?e._cachedDevice:(e._devicePromise||=(async()=>{if(typeof navigator>`u`||!navigator.gpu)return null;try{let t=await navigator.gpu.requestAdapter();if(!t)return null;let n=await t.requestDevice();return e._cachedDevice=n,n.lost.then(()=>{e._cachedDevice===n&&(e._cachedDevice=null)}),n}catch{return null}finally{e._devicePromise=null}})(),e._devicePromise)}static async create(){let t=await e.requestCachedDevice();if(!t)return null;try{let n=new e(t);return await n.createPipelines(),n}catch{return null}}async createPipelines(){if(this.initialized)return;let t=e.sharedPipelineState.get(this.device);if(t){this.pipelines=new Map(t.pipelines),this.bindGroupLayouts=new Map(t.bindGroupLayouts),this.computePipelines=new Map(t.computePipelines),this.computeBindGroupLayouts=new Map(t.computeBindGroupLayouts),this.blitPipeline=t.blitPipeline,this.blitBindGroupLayout=t.blitBindGroupLayout,this.importPipeline=t.importPipeline,this.importBindGroupLayout=t.importBindGroupLayout,this.colorBatchPipeline=t.colorBatchPipeline,this.colorBatchBindGroupLayout=t.colorBatchBindGroupLayout,this.initialized=!0;return}this.createBlitPipeline(),this.createImportExternalPipeline(),this.createColorBatchPipeline();for(let[e,t]of Cr)t.compute?this.createComputeEffectPipeline(e,t):this.createEffectPipeline(e,t);e.sharedPipelineState.set(this.device,{pipelines:new Map(this.pipelines),bindGroupLayouts:new Map(this.bindGroupLayouts),computePipelines:new Map(this.computePipelines),computeBindGroupLayouts:new Map(this.computeBindGroupLayouts),blitPipeline:this.blitPipeline,blitBindGroupLayout:this.blitBindGroupLayout,importPipeline:this.importPipeline,importBindGroupLayout:this.importBindGroupLayout,colorBatchPipeline:this.colorBatchPipeline,colorBatchBindGroupLayout:this.colorBatchBindGroupLayout}),this.initialized=!0}createBlitPipeline(){let e=this.device.createShaderModule({label:`blit`,code:kr});this.blitBindGroupLayout=this.device.createBindGroupLayout({label:`blit-layout`,entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.blitPipeline=this.device.createRenderPipeline({label:`blit-pipeline`,layout:this.device.createPipelineLayout({bindGroupLayouts:[this.blitBindGroupLayout]}),vertex:{module:e,entryPoint:`vertexMain`},fragment:{module:e,entryPoint:`blitFragment`,targets:[{format:this.format}]},primitive:{topology:`triangle-list`}})}createImportExternalPipeline(){try{let e=this.device.createShaderModule({label:`import-external`,code:Mr});this.importBindGroupLayout=this.device.createBindGroupLayout({label:`import-external-layout`,entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,externalTexture:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:`uniform`}}]}),this.importPipeline=this.device.createRenderPipeline({label:`import-external-pipeline`,layout:this.device.createPipelineLayout({bindGroupLayouts:[this.importBindGroupLayout]}),vertex:{module:e,entryPoint:`vertexMain`},fragment:{module:e,entryPoint:`importFragment`,targets:[{format:`rgba8unorm`}]},primitive:{topology:`triangle-list`}}),this.importUniformBuffer=this.device.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}catch{this.importPipeline=null,this.importBindGroupLayout=null,this.importUniformBuffer=null}}createColorBatchPipeline(){try{let e=this.device.createShaderModule({label:`effect-inline-color-batch`,code:`${xt}\n
struct ColorOp {
  header: vec4u,
  values0: vec4f,
  values1: vec4f,
};
struct ColorBatchParams {
  header: vec4u,
  ops: array<ColorOp, 12>,
};
@group(0) @binding(0) var colorBatchSampler: sampler;
@group(0) @binding(1) var colorBatchInput: texture_2d<f32>;
@group(0) @binding(2) var<uniform> colorBatch: ColorBatchParams;

@fragment
fn colorBatchFragment(input: VertexOutput) -> @location(0) vec4f {
  let sampled = textureSample(colorBatchInput, colorBatchSampler, input.uv);
  var color = sampled.rgb;
  for (var index = 0u; index < 12u; index += 1u) {
    if (index < colorBatch.header.x) {
      let op = colorBatch.ops[index];
      if (op.header.x == 1u) {
        color = color + vec3f(op.values0.x);
      } else if (op.header.x == 2u) {
        color = (color - vec3f(0.5)) * op.values0.x + vec3f(0.5);
      } else if (op.header.x == 3u) {
        color = color * pow(2.0, op.values0.x) + vec3f(op.values0.y);
        color = pow(max(color, vec3f(0.0)), vec3f(1.0 / op.values0.z));
      } else if (op.header.x == 4u) {
        var hsv = rgb2hsv(color);
        hsv.x = fract(op.values0.x + op.values0.z * op.values0.w + hsv.x * op.values0.y);
        color = hsv2rgb(hsv);
      } else if (op.header.x == 5u) {
        color = vec3f(1.0) - color;
      } else if (op.header.x == 6u) {
        color = (color - vec3f(op.values0.x)) / (op.values0.y - op.values0.x);
        color = clamp(color, vec3f(0.0), vec3f(1.0));
        color = pow(color, vec3f(1.0 / op.values0.z));
        color = mix(vec3f(op.values0.w), vec3f(op.values1.x), color);
      } else if (op.header.x == 7u) {
        let gray = luminance601(color);
        color = mix(vec3f(gray), color, op.values0.x);
      } else if (op.header.x == 8u) {
        color.r += op.values0.x * 0.1;
        color.b -= op.values0.x * 0.1;
        color.g -= op.values0.y * 0.1;
        color.r += op.values0.y * 0.05;
        color.b += op.values0.y * 0.05;
      } else if (op.header.x == 9u) {
        color = mix(color, vec3f(luminance601(color)), op.values0.x);
      } else if (op.header.x == 10u) {
        let sepia = vec3f(
          dot(color, vec3f(0.393, 0.769, 0.189)),
          dot(color, vec3f(0.349, 0.686, 0.168)),
          dot(color, vec3f(0.272, 0.534, 0.131))
        );
        color = mix(color, sepia, op.values0.x);
      } else if (op.header.x == 11u) {
        let maxChannel = max(max(color.r, color.g), color.b);
        let minChannel = min(min(color.r, color.g), color.b);
        let saturation = (maxChannel - minChannel) / (maxChannel + 0.001);
        let amount = op.values0.x * (1.0 - saturation);
        color = mix(vec3f(luminance601(color)), color, 1.0 + amount);
      } else if (op.header.x == 12u) {
        let levels = max(op.values0.x, 2.0);
        color = floor(color * levels) / (levels - 1.0);
      } else if (op.header.x == 13u) {
        let value = select(0.0, 1.0, luminance(color) > op.values0.x);
        color = vec3f(value);
      }
      // Separate rgba8unorm passes clamp and quantize after every operation.
      color = round(clamp(color, vec3f(0.0), vec3f(1.0)) * 255.0) / 255.0;
    }
  }
  return vec4f(color, sampled.a);
}`});this.colorBatchBindGroupLayout=this.device.createBindGroupLayout({label:`effect-inline-color-batch-layout`,entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:`uniform`}}]}),this.colorBatchPipeline=this.device.createRenderPipeline({label:`effect-inline-color-batch-pipeline`,layout:this.device.createPipelineLayout({bindGroupLayouts:[this.colorBatchBindGroupLayout]}),vertex:{module:e,entryPoint:`vertexMain`},fragment:{module:e,entryPoint:`colorBatchFragment`,targets:[{format:`rgba8unorm`}]},primitive:{topology:`triangle-list`}})}catch(e){this.colorBatchPipeline=null,this.colorBatchBindGroupLayout=null,Dr().warn(`Failed to create inline color batch pipeline`,e)}}createEffectPipeline(e,t){try{let n=`${xt}\n${t.shader}`,r=this.device.createShaderModule({label:`effect-${e}`,code:n}),i=[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}}];t.uniformSize>0&&i.push({binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:`uniform`}}),t.dataTexture&&i.push({binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:t.dataTexture.dimension}});let a=this.device.createBindGroupLayout({label:`effect-${e}-layout`,entries:i});this.bindGroupLayouts.set(e,a);let o=this.device.createRenderPipeline({label:`effect-${e}-pipeline`,layout:this.device.createPipelineLayout({bindGroupLayouts:[a]}),vertex:{module:r,entryPoint:`vertexMain`},fragment:{module:r,entryPoint:t.entryPoint,targets:[{format:`rgba8unorm`}]},primitive:{topology:`triangle-list`}});this.pipelines.set(e,o)}catch(t){Dr().warn(`Failed to create pipeline for ${e}`,t)}}createComputeEffectPipeline(e,t){try{let n=`${xt}\n${t.shader}`,r=this.device.createShaderModule({label:`effect-${e}-compute`,code:n}),i=[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:`float`}},{binding:1,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:`write-only`,format:`rgba8unorm`,viewDimension:`2d`}}];t.uniformSize>0&&i.push({binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:`uniform`}});let a=this.device.createBindGroupLayout({label:`effect-${e}-compute-layout`,entries:i});this.computeBindGroupLayouts.set(e,a);let o=this.device.createComputePipeline({label:`effect-${e}-compute-pipeline`,layout:this.device.createPipelineLayout({bindGroupLayouts:[a]}),compute:{module:r,entryPoint:t.entryPoint}});this.computePipelines.set(e,o)}catch(t){Dr().warn(`Failed to create compute pipeline for ${e}`,t)}}ensurePingPong(e,t){if(this.pingTexture&&this.texW===e&&this.texH===t)return;this.pingTexture?.destroy(),this.pongTexture?.destroy();let n={size:{width:e,height:t},format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC|GPUTextureUsage.COPY_DST};this.pingTexture=this.device.createTexture(n),this.pongTexture=this.device.createTexture(n),this.pingView=this.pingTexture.createView(),this.pongView=this.pongTexture.createView(),this.effectBindGroupCache.clear(),this.blitBindGroupPing=null,this.blitBindGroupPong=null,this.texW=e,this.texH=t}getOrUpdateDataTexture(e,t,n){let r=n.dataTexture;if(!r)return null;let i=`${e}:${t.type}`,a=r.key(t.params),o=this.dataTextureCache.get(i);if(o&&o.key===a)return o.view;let s;try{s=r.build(t.params)}catch(e){return Dr().warn(`Failed to build data texture for ${t.type}`,e),o?.view??null}let c=this.acquireDataTextureEntry(i,t.type,r,s,a,o);return this.device.queue.writeTexture({texture:c.texture},s.data,{bytesPerRow:s.width*4,rowsPerImage:s.height},{width:s.width,height:s.height,depthOrArrayLayers:s.depth}),c.view}acquireDataTextureEntry(e,t,n,r,i,a){let o=a!==void 0&&a.width===r.width&&a.height===r.height&&a.depth===r.depth;if(a&&o)return a.key=i,a;a?.texture.destroy();let s=this.device.createTexture({label:`effect-${t}-data`,size:{width:r.width,height:r.height,depthOrArrayLayers:r.depth},dimension:n.dimension===`3d`?`3d`:`2d`,format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),c={key:i,texture:s,view:s.createView({dimension:n.dimension}),width:r.width,height:r.height,depth:r.depth};return this.dataTextureCache.set(e,c),this.effectBindGroupCache.clear(),c}getOrCreateUniformBuffer(e,t){let n=this.uniformBuffers[e];return n&&n.size>=t?n:(n?.destroy(),n=this.device.createBuffer({size:t,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniformBuffers[e]=n,this.effectBindGroupCache.clear(),n)}runEffectChain(e,t,n,r,i,a){let o=n,s=r,c=o===this.pingTexture?this.pingView:this.pongView,l=s===this.pingTexture?this.pingView:this.pongView,u=jr(t,this.colorBatchPipeline!==null&&this.colorBatchBindGroupLayout!==null);for(let t=0;t<u.length;t++){let n=u[t];if(n.kind===`color-batch`){if(!this.colorBatchPipeline||!this.colorBatchBindGroupLayout)continue;let r=/* @__PURE__ */ new ArrayBuffer(592);new Uint32Array(r,0,4)[0]=n.effects.length;for(let e=0;e<n.effects.length;e++){let t=n.effects[e],o=Ar.get(t.type),s=Er(t.type),c=16+e*48;new Uint32Array(r,c,4)[0]=o;let l=s.packUniforms(t.params,i,a,t.timelineTimeSeconds??0);l&&new Float32Array(r,c+16,8).set(l.subarray(0,8))}let u=this.getOrCreateUniformBuffer(t,592);this.device.queue.writeBuffer(u,0,r);let d=c===this.pingView?`ping`:`pong`,f=`${t}:inline-color-batch:${d}`,p=this.effectBindGroupCache.get(f);p||(p=this.device.createBindGroup({layout:this.colorBatchBindGroupLayout,entries:[{binding:0,resource:this.sampler},{binding:1,resource:c},{binding:2,resource:{buffer:u}}]}),this.effectBindGroupCache.set(f,p));let m=e.beginRenderPass({colorAttachments:[{view:l,loadOp:`clear`,storeOp:`store`}]});m.setPipeline(this.colorBatchPipeline),m.setBindGroup(0,p),m.draw(6),m.end(),[o,s]=[s,o],[c,l]=[l,c];continue}let r=n.effect,d=Er(r.type);if(!d)continue;let f=d.packUniforms(r.params,i,a,r.timelineTimeSeconds??0),p;f&&(p=this.getOrCreateUniformBuffer(t,f.byteLength),this.device.queue.writeBuffer(p,0,f.buffer));let m=c===this.pingView?`ping`:`pong`;if(d.compute){let n=this.computePipelines.get(r.type),u=this.computeBindGroupLayouts.get(r.type);if(!n||!u)continue;let f=`${t}:${r.type}:compute:${m}`,h=this.effectBindGroupCache.get(f);if(!h){let e=[{binding:0,resource:c},{binding:1,resource:l}];p&&e.push({binding:2,resource:{buffer:p}}),h=this.device.createBindGroup({layout:u,entries:e}),this.effectBindGroupCache.set(f,h)}let[g,_,v]=d.compute.dispatch(i,a),y=e.beginComputePass();y.setPipeline(n),y.setBindGroup(0,h),y.dispatchWorkgroups(g,_,v),y.end();let b=o;o=s,s=b;let ee=c;c=l,l=ee;continue}let h=this.pipelines.get(r.type),g=this.bindGroupLayouts.get(r.type);if(!h||!g)continue;let _=null;if(d.dataTexture&&(_=this.getOrUpdateDataTexture(t,r,d),!_))continue;let v=`${t}:${r.type}:${m}`,y=this.effectBindGroupCache.get(v);if(!y){let e=[{binding:0,resource:this.sampler},{binding:1,resource:c}];p&&e.push({binding:2,resource:{buffer:p}}),_&&e.push({binding:3,resource:_}),y=this.device.createBindGroup({layout:g,entries:e}),this.effectBindGroupCache.set(v,y)}let b=e.beginRenderPass({colorAttachments:[{view:l,loadOp:`clear`,storeOp:`store`}]});b.setPipeline(h),b.setBindGroup(0,y),b.draw(6),b.end();let ee=o;o=s,s=ee;let te=c;c=l,l=te}return o}configureCanvas(e){try{let t=e.getContext(`webgpu`);return t?(t.configure({device:this.device,format:this.format,alphaMode:`premultiplied`}),t):null}catch{return null}}beginBatch(){this.poolMode=!0,this.batchIndex=0}endBatch(){this.poolMode=!1,this.batchIndex=0}isBatching(){return this.poolMode}async waitForSubmittedWork(){await this.device.queue.onSubmittedWorkDone()}acquirePooledOutput(e,t){let n=this.outputPool[this.batchIndex];if(n){if(n.w!==e||n.h!==t){n.canvas.width=e,n.canvas.height=t;let r=this.configureCanvas(n.canvas);if(!r)return null;n.ctx=r,n.w=e,n.h=t}}else{let r=new OffscreenCanvas(e,t),i=this.configureCanvas(r);if(!i)return null;n={canvas:r,ctx:i,w:e,h:t},this.outputPool.push(n)}return this.batchIndex++,n}applyEffectsToCanvas(e,t){let n=t.filter(e=>e.enabled);if(n.length===0||!this.blitPipeline||!this.blitBindGroupLayout)return null;let r=e instanceof HTMLVideoElement?e.videoWidth:e.width,i=e instanceof HTMLVideoElement?e.videoHeight:e.height;if(r<2||i<2)return null;let a,o;if(this.poolMode){let e=this.acquirePooledOutput(r,i);if(!e)return null;a=e.canvas,o=e.ctx}else{if((!this.outputCanvas||this.outputW!==r||this.outputH!==i)&&(this.outputCanvas=new OffscreenCanvas(r,i),this.outputCtx=this.configureCanvas(this.outputCanvas),this.outputW=r,this.outputH=i),!this.outputCtx)return null;a=this.outputCanvas,o=this.outputCtx}if(this.ensurePingPong(r,i),!this.pingTexture||!this.pongTexture)return null;this.device.queue.copyExternalImageToTexture({source:e,flipY:!1},{texture:this.pingTexture},{width:r,height:i});let s=this.device.createCommandEncoder(),c=this.runEffectChain(s,n,this.pingTexture,this.pongTexture,r,i)===this.pingTexture?this.blitBindGroupPing??=this.device.createBindGroup({layout:this.blitBindGroupLayout,entries:[{binding:0,resource:this.sampler},{binding:1,resource:this.pingView}]}):this.blitBindGroupPong??=this.device.createBindGroup({layout:this.blitBindGroupLayout,entries:[{binding:0,resource:this.sampler},{binding:1,resource:this.pongView}]});return yt({device:this.device,context:o,pipeline:this.blitPipeline,bindGroup:c,encoder:s}),a}applyEffectsToTexture(e,t,n){let r=t.filter(e=>e.enabled),{width:i,height:a}=Nr(e);if(i<2||a<2||n.width!==i||n.height!==a)return!1;if(r.length===0)return this.device.queue.copyExternalImageToTexture({source:e,flipY:!1},{texture:n},{width:i,height:a}),!0;if(this.ensurePingPong(i,a),!this.pingTexture||!this.pongTexture)return!1;this.device.queue.copyExternalImageToTexture({source:e,flipY:!1},{texture:this.pingTexture},{width:i,height:a});let o=this.device.createCommandEncoder(),s=this.runEffectChain(o,r,this.pingTexture,this.pongTexture,i,a);return o.copyTextureToTexture({texture:s},{texture:n},{width:i,height:a}),this.device.queue.submit([o.finish()]),!0}applyTextureEffectsToTexture(e,t,n,r,i){let a=t.filter(e=>e.enabled);if(r<2||i<2||e.width!==r||e.height!==i||n.width!==r||n.height!==i)return!1;let o=this.device.createCommandEncoder();if(a.length===0)return o.copyTextureToTexture({texture:e},{texture:n},{width:r,height:i}),this.device.queue.submit([o.finish()]),!0;if(this.ensurePingPong(r,i),!this.pingTexture||!this.pongTexture)return!1;o.copyTextureToTexture({texture:e},{texture:this.pingTexture},{width:r,height:i});let s=this.runEffectChain(o,a,this.pingTexture,this.pongTexture,r,i);return o.copyTextureToTexture({texture:s},{texture:n},{width:r,height:i}),this.device.queue.submit([o.finish()]),!0}applyEffectsToVideo(e,t,n,r,i){let a=t.filter(e=>e.enabled);if(a.length===0||!this.importPipeline||!this.importBindGroupLayout||!this.importUniformBuffer||!this.blitPipeline||!this.blitBindGroupLayout||e.readyState<2||e.videoWidth<2)return null;let o=r,s=i;if(o<2||s<2)return null;let c,l;if(this.poolMode){let e=this.acquirePooledOutput(o,s);if(!e)return null;c=e.canvas,l=e.ctx}else{if((!this.outputCanvas||this.outputW!==o||this.outputH!==s)&&(this.outputCanvas=new OffscreenCanvas(o,s),this.outputCtx=this.configureCanvas(this.outputCanvas),this.outputW=o,this.outputH=s),!this.outputCtx)return null;c=this.outputCanvas,l=this.outputCtx}if(this.ensurePingPong(o,s),!this.pingTexture||!this.pongTexture)return null;let u;try{u=this.device.importExternalTexture({source:e})}catch{return null}let d=new Float32Array([n.x/o,n.y/s,(n.x+n.width)/o,(n.y+n.height)/s]);this.device.queue.writeBuffer(this.importUniformBuffer,0,d.buffer);let f=this.device.createCommandEncoder(),p=this.device.createBindGroup({layout:this.importBindGroupLayout,entries:[{binding:0,resource:this.sampler},{binding:1,resource:u},{binding:2,resource:{buffer:this.importUniformBuffer}}]}),m=f.beginRenderPass({colorAttachments:[{view:this.pingView,loadOp:`clear`,clearValue:{r:0,g:0,b:0,a:0},storeOp:`store`}]});m.setPipeline(this.importPipeline),m.setBindGroup(0,p),m.draw(6),m.end();let h=this.runEffectChain(f,a,this.pingTexture,this.pongTexture,o,s)===this.pingTexture?this.blitBindGroupPing??=this.device.createBindGroup({layout:this.blitBindGroupLayout,entries:[{binding:0,resource:this.sampler},{binding:1,resource:this.pingView}]}):this.blitBindGroupPong??=this.device.createBindGroup({layout:this.blitBindGroupLayout,entries:[{binding:0,resource:this.sampler},{binding:1,resource:this.pongView}]});return yt({device:this.device,context:l,pipeline:this.blitPipeline,bindGroup:h,encoder:f}),c}applyEffectsToVideoTexture(e,t,n,r,i,a){let o=t.filter(e=>e.enabled);if(!this.importPipeline||!this.importBindGroupLayout||!this.importUniformBuffer||e.readyState<2||e.videoWidth<2)return!1;let s=r,c=i;if(s<2||c<2||a.width!==s||a.height!==c||a.format!==`rgba8unorm`||(this.ensurePingPong(s,c),!this.pingTexture||!this.pongTexture))return!1;let l;try{l=this.device.importExternalTexture({source:e})}catch{return!1}let u=new Float32Array([n.x/s,n.y/c,(n.x+n.width)/s,(n.y+n.height)/c]);this.device.queue.writeBuffer(this.importUniformBuffer,0,u.buffer);let d=this.device.createCommandEncoder(),f=this.device.createBindGroup({layout:this.importBindGroupLayout,entries:[{binding:0,resource:this.sampler},{binding:1,resource:l},{binding:2,resource:{buffer:this.importUniformBuffer}}]}),p=d.beginRenderPass({colorAttachments:[{view:this.pingView,loadOp:`clear`,clearValue:{r:0,g:0,b:0,a:0},storeOp:`store`}]});p.setPipeline(this.importPipeline),p.setBindGroup(0,f),p.draw(6),p.end();let m=o.length>0?this.runEffectChain(d,o,this.pingTexture,this.pongTexture,s,c):this.pingTexture;return d.copyTextureToTexture({texture:m},{texture:a},{width:s,height:c}),this.device.queue.submit([d.finish()]),!0}getDevice(){return this.device}destroy(){this.pingTexture?.destroy(),this.pongTexture?.destroy(),this.pingTexture=null,this.pongTexture=null,this.pingView=null,this.pongView=null,this.outputCanvas=null,this.outputCtx=null,this.outputW=0,this.outputH=0,this.poolMode=!1,this.outputPool=[],this.batchIndex=0;for(let e of this.uniformBuffers)e?.destroy();this.uniformBuffers=[];for(let e of this.dataTextureCache.values())e.texture.destroy();this.dataTextureCache.clear(),this.effectBindGroupCache.clear(),this.blitBindGroupPing=null,this.blitBindGroupPong=null,this.pipelines.clear(),this.bindGroupLayouts.clear(),this.computePipelines.clear(),this.computeBindGroupLayouts.clear(),this.blitPipeline=null,this.blitBindGroupLayout=null,this.importPipeline=null,this.importBindGroupLayout=null,this.importUniformBuffer?.destroy(),this.importUniformBuffer=null,this.initialized=!1}};const Fr=16777215,N=4294967296,P=/* @__PURE__ */ new Map;function F(e,t,n){return Math.max(t,Math.min(n,e))}function Ir(e){return F(Math.round(e),0,255)}function I(e){if(!Number.isFinite(e))return 0;let t=Math.round(e);return t<=Fr?F(t,0,Fr):t<N?Fr:F(t,N,8589934591)}function Lr({r:e,g:t,b:n,a:r,hasAlpha:i}){let a=Ir(e),o=Ir(t),s=Ir(n);if(!i)return a*65536+o*256+s;let c=Ir(r);return N+a*16777216+o*65536+s*256+c}function Rr(e){let t=I(e);if(t>=N){let e=t-N;return{r:Math.floor(e/16777216)&255,g:Math.floor(e/65536)&255,b:Math.floor(e/256)&255,a:e&255,hasAlpha:!0}}return{r:Math.floor(t/65536)&255,g:Math.floor(t/256)&255,b:t&255,a:255,hasAlpha:!1}}function zr(e){let t=F(e/255,0,1);return t<=.04045?t/12.92:((t+.055)/1.055)**2.4}function Br(e){return F(e<=.0031308?e*12.92:1.055*e**(1/2.4)-.055,0,1)*255}function Vr(e){let t=zr(e.r),n=zr(e.g),r=zr(e.b),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*r),a=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*r),o=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*r),s=.2104542553*i+.793617785*a-.0040720468*o,c=1.9779984951*i-2.428592205*a+.4505937099*o,l=.0259040371*i+.7827717662*a-.808675766*o;return{l:s,c:Math.hypot(c,l),h:(Math.atan2(l,c)*180/Math.PI+360)%360}}function Hr(e){let t=I(e),n=P.get(t);if(n)return{...n};let r=Vr(Rr(t));if(P.size>=512){let e=P.keys().next().value;e!==void 0&&P.delete(e)}return P.set(t,r),{...r}}function Ur(e){let t=e.h*Math.PI/180,n=e.c*Math.cos(t),r=e.c*Math.sin(t),i=e.l+.3963377774*n+.2158037573*r,a=e.l-.1055613458*n-.0638541728*r,o=e.l-.0894841775*n-1.291485548*r,s=i**3,c=a**3,l=o**3;return{r:Br(4.0767416621*s-3.3077115913*c+.2309699292*l),g:Br(-1.2684380046*s+2.6097574011*c-.3413193965*l),b:Br(-.0041960863*s-.7034186147*c+1.707614701*l)}}function Wr(e){let t=e.trim(),n=/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.exec(t);if(!n)return null;let r=n[1];return r.length===3||r.length===4?`#${r.split(``).map(e=>e+e).join(``).toLowerCase()}`:`#${r.toLowerCase()}`}function Gr(e){let t=Wr(e);if(!t)return null;let n=t.slice(1);return n.length===6?Number.parseInt(n,16):N+Number.parseInt(n,16)}function Kr(e){let t=I(e);return t>=N?`#${(t-N).toString(16).padStart(8,`0`)}`:`#${t.toString(16).padStart(6,`0`)}`}function qr(e,t,n){let r=Rr(e),i=Rr(t),a=Hr(e),o=Hr(t);a.c<1e-7&&(a.h=o.h),o.c<1e-7&&(o.h=a.h);let s=(o.h-a.h+540)%360-180;return Lr({...Ur({l:a.l+(o.l-a.l)*n,c:a.c+(o.c-a.c)*n,h:a.h+s*n}),a:r.a+(i.a-r.a)*n,hasAlpha:r.hasAlpha||i.hasAlpha})}function Jr(e,t,n){if(e.length===0)return I(n);let r=e[0];if(e.length===1||t<=r.frame)return I(r.value);let i=e[e.length-1];if(t>=i.frame)return I(i.value);for(let n=0;n<e.length-1;n+=1){let r=e[n],i=e[n+1];if(r.frame>t||i.frame<=t)continue;let a=i.frame-r.frame;if(a<=0)return I(r.value);let o=(t-r.frame)/a,s=r.easingConfig?Ye(o,r.easingConfig):Je(o,r.easing);return qr(r.value,i.value,s)}return I(n)}function Yr(e,t,n){let r=Gr(n);return r===null?null:Kr(Jr(e,t,r))}function Xr(e,t,n){return Math.max(t,Math.min(n,e))}function Zr(e,t,n){let r=Xr(n,0,1),i=e>>16&255,a=e>>8&255,o=e&255,s=t>>16&255,c=t>>8&255,l=t&255;return(Math.round(i+(s-i)*r)<<16)+(Math.round(a+(c-a)*r)<<8)+Math.round(o+(l-o)*r)}function Qr(e){let t=Xr(e,0,1);return t*t*(3-2*t)}function $r(e){return e<.15?Qr(e/.15):1-Qr((e-.15)/.85)}function ei(e,t){if(!e.enabled||e.beats.length===0)return null;let n=Math.max(1,e.durationFrames),r=0,i=0,a=0,o=!1;for(let s of e.beats){let e=(t-s.frame)/n;if(e<0||e>=1)continue;let c=$r(e)*(.5+.5*s.amplitude);c>r&&(r=c,i=e,a=s.amplitude,o=!0)}if(!o)return{strength:0,chroma:0,phase:0,glowColor:e.glowColorBase};let s=Zr(e.glowColorBase,16777215,.18+.28*a);return{strength:e.strength*r,chroma:e.chroma*(1-i)*(.5+.5*a),phase:i,glowColor:Zr(e.glowColorBase,s,Qr(r))}}function ti(e,t){let n=e.audioPulse;return!n?.enabled||e.effect.type!==`gpu-effect`||e.effect.gpuEffectType!==`gpu-trigger-wave`?null:ei(n,t)}function ni(e,t){switch(t){case`strength`:return e.strength;case`chroma`:return e.chroma;case`phase`:return e.phase;case`glowColor`:return Kr(e.glowColor);default:return null}}const ri={"gpu-gaussian-blur":/* @__PURE__ */ new Set([`samples`]),"gpu-motion-blur":/* @__PURE__ */ new Set([`samples`]),"gpu-radial-blur":/* @__PURE__ */ new Set([`samples`]),"gpu-zoom-blur":/* @__PURE__ */ new Set([`samples`]),"gpu-grain":/* @__PURE__ */ new Set([`speed`]),"gpu-glow":/* @__PURE__ */ new Set([`rings`,`samplesPerRing`]),"gpu-scanlines":/* @__PURE__ */ new Set([`speed`]),"gpu-color-glitch":/* @__PURE__ */ new Set([`speed`]),"gpu-block-glitch":/* @__PURE__ */ new Set([`speed`]),"gpu-pixel-sort":/* @__PURE__ */ new Set([`length`])};function ii(e,t,n){switch(e){case`gpu-dither`:return n===`angle`?t.mode===`linear`:n===`scale`||n===`offsetX`||n===`offsetY`?t.mode===`radial`:!0;case`gpu-ascii`:return n===`textColor`?t.matchSourceColor!==!0:n!==`colorSaturation`||t.matchSourceColor===!0;default:return!0}}function ai(e,t){return typeof e.params[t]==`number`&&!ri[e.gpuEffectType]?.has(t)}function oi(e,t){let n=Er(e.gpuEffectType)?.params[t],r=e.params[t];return n?.type===`color`&&n.animatable===!0&&typeof r==`string`&&Gr(r)!==null}function si(e,t){return ai(e,t)||oi(e,t)}function ci(e,t){let n=e.params[t];return typeof n==`number`?n:null}function li(e,t){let n=e.params[t];return typeof n==`string`?Gr(n)===null?null:n:null}function ui(e,t){if(e.effect.type!==`gpu-effect`||!t)return[];let n=/* @__PURE__ */ new Set;for(let r of t.properties){let t=Ne(r.property);t&&t.effectId===e.id&&t.gpuEffectType===e.effect.gpuEffectType&&n.add(t.paramKey)}return[...n]}function di(e,t,n){let r=e?.some(e=>e.audioPulse?.enabled)??!1;if(!e||e.length===0||!t&&!r)return e;let i=!1,a=e.map(e=>{if(e.effect.type!==`gpu-effect`)return e;let r=e.effect,a=r.params,o=!1,s=ti(e,n),c=/* @__PURE__ */ new Set([...Object.keys(r.params),...ui(e,t)]);for(let i of c){if(!si(r,i)||!ii(r.gpuEffectType,a,i))continue;let c=s?ni(s,i):null,l=c===null?(()=>{let a=C(t,Me(r.gpuEffectType,e.id,i));return a.length===0?null:oi(r,i)?(()=>{let e=li(r,i);return e===null?null:Yr(a,n,e)})():(()=>{let e=ci(r,i);return e===null?null:S(a,n,e)})()})():c;l!==null&&a[i]!==l&&(o||=(a={...r.params},!0),a[i]=l)}return o?(i=!0,{...e,effect:{...r,params:a}}):e});return i?a:e}const fi=di;function pi(e){if(Array.isArray(e.textSpans)&&e.textSpans.length>0){let t=e.textSpans.filter(e=>typeof e.text==`string`).map(e=>({...e}));if(t.length>0)return t}return[{text:e.text??``}]}function mi(e){return(e.split(`
`)[0]?.trim()??``)||`Text`}const hi={"clean-title":{id:`clean-title`,label:`Clean`,previewKind:`clean`,layout:`single`,sample:{title:`Main`,subtitle:`Title`},style:{fontFamily:`Inter Tight`,fontWeight:`bold`,fontStyle:`normal`,underline:!1,size:{token:`title`},color:`#ffffff`,backgroundColor:void 0,backgroundRadius:`none`,textAlign:`center`,verticalAlign:`middle`,lineHeight:.95,letterSpacing:`tight`,textPadding:`sm`,textShadow:{token:`md`,color:`#111827`},stroke:void 0}},poster:{id:`poster`,label:`Poster`,previewKind:`poster`,layout:`single`,sample:{title:`Tonight`},style:{fontFamily:`Anton`,fontWeight:`normal`,fontStyle:`normal`,underline:!1,size:{token:`display`,multiplier:.98},color:`#fef3c7`,backgroundColor:void 0,backgroundRadius:`none`,textAlign:`center`,verticalAlign:`middle`,lineHeight:.88,letterSpacing:`tight`,textPadding:`sm`,textShadow:{token:`xl`,color:`#7f1d1d`},stroke:{width:2,color:`#991b1b`}}},"outline-pill":{id:`outline-pill`,label:`Outline`,previewKind:`outline-pill`,layout:`single`,sample:{title:`Featured`},style:{fontFamily:`Inter`,fontWeight:`bold`,fontStyle:`normal`,underline:!1,size:{token:`badge`,multiplier:.96},color:`#e2e8f0`,backgroundColor:`#0f172a`,backgroundRadius:`pill`,textAlign:`center`,verticalAlign:`middle`,lineHeight:1,letterSpacing:`badge`,textPadding:`badge`,textShadow:{token:`sm`,color:`#020617`},stroke:{width:1,color:`#38bdf8`}}},"lower-third":{id:`lower-third`,label:`Lower Third`,previewKind:`lower-third`,layout:`two`,sample:{title:`Name`,subtitle:`Role or subtitle`},style:{fontFamily:`Inter`,fontWeight:`semibold`,fontStyle:`normal`,underline:!1,size:{token:`title`,multiplier:.587},color:`#f9fafb`,backgroundColor:`#111827`,backgroundRadius:`md`,textAlign:`left`,verticalAlign:`middle`,lineHeight:1.05,letterSpacing:`normal`,textPadding:`lg`,textShadow:{token:`sm`,color:`#030712`},stroke:void 0}},"speaker-card":{id:`speaker-card`,label:`Speaker`,previewKind:`speaker`,layout:`two`,sample:{title:`Alex Morgan`,subtitle:`Product Designer`},style:{fontFamily:`Inter Tight`,fontWeight:`bold`,fontStyle:`normal`,underline:!1,size:{token:`title`,multiplier:.61},color:`#f8fafc`,backgroundColor:`#1e293b`,backgroundRadius:`lg`,textAlign:`left`,verticalAlign:`middle`,lineHeight:1,letterSpacing:`tight`,textPadding:`xl`,textShadow:{token:`md`,color:`#020617`},stroke:void 0}},cinematic:{id:`cinematic`,label:`Cinematic`,previewKind:`cinematic`,layout:`single`,sample:{title:`CINEMA`,subtitle:`PRESENTS`},style:{fontFamily:`Bebas Neue`,fontWeight:`normal`,fontStyle:`normal`,underline:!1,size:{token:`display`},color:`#f8e6b8`,backgroundColor:void 0,backgroundRadius:`none`,textAlign:`center`,verticalAlign:`middle`,lineHeight:.92,letterSpacing:`cinematic`,textPadding:`sm`,textShadow:{token:`lg`,color:`#111827`},stroke:{width:1,color:`#2b2112`}}},quote:{id:`quote`,label:`Quote`,previewKind:`quote`,layout:`two`,sample:{title:`Quote`,subtitle:`Attribution`},style:{fontFamily:`Playfair Display`,fontWeight:`semibold`,fontStyle:`italic`,underline:!1,size:{token:`title`,multiplier:.83},color:`#f8fafc`,backgroundColor:`#1f2937`,backgroundRadius:`lg`,textAlign:`center`,verticalAlign:`middle`,lineHeight:1.08,letterSpacing:`normal`,textPadding:`quote`,textShadow:{token:`lg`,color:`#020617`},stroke:void 0}},neon:{id:`neon`,label:`Neon`,previewKind:`neon`,layout:`single`,sample:{title:`NEON`,subtitle:`Glow`},style:{fontFamily:`Orbitron`,fontWeight:`semibold`,fontStyle:`normal`,underline:!1,size:{token:`title`,multiplier:.935},color:`#67e8f9`,backgroundColor:`#082f49`,backgroundRadius:`sm`,textAlign:`center`,verticalAlign:`middle`,lineHeight:1,letterSpacing:`wide`,textPadding:`md`,textShadow:{token:`glow`,color:`#22d3ee`},stroke:{width:1,color:`#22d3ee`}}},"headline-stack":{id:`headline-stack`,label:`Headline`,previewKind:`stacked`,layout:`three`,sample:{eyebrow:`TOP STORY`,title:`Headline`,subtitle:`Subhead`},style:{fontFamily:`Inter Tight`,fontWeight:`bold`,fontStyle:`normal`,underline:!1,size:{token:`title`,multiplier:.913},color:`#f8fafc`,backgroundColor:void 0,backgroundRadius:`none`,textAlign:`center`,verticalAlign:`middle`,lineHeight:.96,letterSpacing:`tight`,textPadding:`sm`,textShadow:{token:`lg`,color:`#020617`},stroke:void 0}},"breaking-update":{id:`breaking-update`,label:`Breaking`,previewKind:`breaking`,layout:`three`,sample:{eyebrow:`BREAKING`,title:`Major Update`,subtitle:`Developing now`},style:{fontFamily:`Inter Tight`,fontWeight:`bold`,fontStyle:`normal`,underline:!1,size:{token:`title`,multiplier:.92},color:`#f8fafc`,backgroundColor:`#111827`,backgroundRadius:`md`,textAlign:`left`,verticalAlign:`middle`,lineHeight:.94,letterSpacing:`tight`,textPadding:`lg`,textShadow:{token:`lg`,color:`#020617`},stroke:void 0}},"event-card":{id:`event-card`,label:`Event`,previewKind:`event`,layout:`three`,sample:{eyebrow:`LIVE`,title:`Summer Fest`,subtitle:`Friday 8 PM`},style:{fontFamily:`Inter Tight`,fontWeight:`bold`,fontStyle:`normal`,underline:!1,size:{token:`title`,multiplier:.848},color:`#f8fafc`,backgroundColor:`#0f172a`,backgroundRadius:`lg`,textAlign:`center`,verticalAlign:`middle`,lineHeight:.98,letterSpacing:-.5,textPadding:`xl`,textShadow:{token:`xl`,color:`#020617`},stroke:void 0}},"launch-stack":{id:`launch-stack`,label:`Launch`,previewKind:`launch`,layout:`three`,sample:{eyebrow:`NOW LIVE`,title:`New Collection`,subtitle:`Shop the drop`},style:{fontFamily:`Space Grotesk`,fontWeight:`bold`,fontStyle:`normal`,underline:!1,size:{token:`title`,multiplier:.88},color:`#f8fafc`,backgroundColor:`#0f172a`,backgroundRadius:`lg`,textAlign:`center`,verticalAlign:`middle`,lineHeight:.96,letterSpacing:`tight`,textPadding:`xl`,textShadow:{token:`glow`,color:`#60a5fa`},stroke:{width:1,color:`#1d4ed8`}}},badge:{id:`badge`,label:`Badge`,previewKind:`badge`,layout:`single`,sample:{title:`NEW DROP`,subtitle:`Tag`},style:{fontFamily:`Inter`,fontWeight:`bold`,fontStyle:`normal`,underline:!1,size:{token:`badge`},color:`#f8fafc`,backgroundColor:`#111827`,backgroundRadius:`pill`,textAlign:`center`,verticalAlign:`middle`,lineHeight:1,letterSpacing:`badge`,textPadding:`badge`,textShadow:{token:`sm`,color:`#020617`},stroke:{width:1,color:`#334155`}}}};Object.values(hi).map(({id:e,label:t,previewKind:n,layout:r,sample:i})=>({id:e,label:t,previewKind:n,layout:r,sample:i}));function gi(e,t,n){return Math.min(n,Math.max(t,e))}function _i(e,t,n,r){return gi(Math.round(e.height*t),n,r)}function L(e,t,n,r){let i=Math.min(e.width,e.height);return gi(Math.round(i*t),n,r)}function R(e){return e.map(e=>e.text).join(`
`)}function vi(e){let t=hi[e];if(!t)throw Error(`Unknown text style preset: ${e}`);return t}function yi(e,t){let n=e.sizes[t.token];return Math.round(n*(t.multiplier??1))}function bi(e,t){return typeof t==`number`?t:e.tracking[t]}function xi(e){return{sizes:{badge:_i(e,.048,32,68),title:_i(e,.085,56,132),display:_i(e,.11,72,164)},spacing:{sm:L(e,.0148,16,16),badge:L(e,.0167,18,18),md:L(e,.0185,20,20),lg:L(e,.0222,24,24),xl:L(e,.0259,28,28),quote:L(e,.0278,30,30)},radius:{none:0,sm:L(e,.0167,18,18),md:L(e,.0185,20,20),lg:L(e,.0259,28,28),pill:999},tracking:{tight:-1,normal:0,wide:1,badge:2,cinematic:4},shadows:{sm:{offsetX:0,offsetY:4,blur:14},md:{offsetX:0,offsetY:6,blur:18},lg:{offsetX:0,offsetY:8,blur:24},xl:{offsetX:0,offsetY:10,blur:24},glow:{offsetX:0,offsetY:0,blur:22}}}}function Si(e,t,n=1){let r=vi(e),i=xi(t),a=r.style.textShadow?i.shadows[r.style.textShadow.token]:void 0;return{fontFamily:r.style.fontFamily,fontWeight:r.style.fontWeight,fontStyle:r.style.fontStyle,underline:r.style.underline,fontSize:Math.round(yi(i,r.style.size)*n),color:r.style.color,backgroundColor:r.style.backgroundColor,backgroundRadius:r.style.backgroundRadius===`pill`?i.radius[r.style.backgroundRadius]:Math.round(i.radius[r.style.backgroundRadius]*n),textAlign:r.style.textAlign,verticalAlign:r.style.verticalAlign,lineHeight:r.style.lineHeight,letterSpacing:bi(i,r.style.letterSpacing)*n,textPadding:Math.round(i.spacing[r.style.textPadding]*n),textShadow:a?{offsetX:a.offsetX*n,offsetY:a.offsetY*n,blur:a.blur*n,color:r.style.textShadow?.color??`#000000`}:void 0,stroke:r.style.stroke?{...r.style.stroke,width:r.style.stroke.width*n}:void 0,textStylePresetId:e,textStyleScale:n}}function Ci(e,t,n=1){let r=vi(e),i=Si(e,t,n),a=i.fontSize??60;switch(e){case`speaker-card`:{let e=[{text:r.sample.title,fontWeight:`bold`},{text:r.sample.subtitle??`Product Designer`,fontSize:Math.max(20,Math.round(a*.44)),fontWeight:`medium`,color:`#cbd5e1`}];return{...i,label:r.label,text:R(e),textSpans:e}}case`lower-third`:{let e=[{text:r.sample.title,fontWeight:`bold`},{text:r.sample.subtitle??`Role or subtitle`,fontSize:Math.max(22,Math.round(a*.54)),fontWeight:`medium`,color:`#cbd5e1`}];return{...i,label:r.label,text:R(e),textSpans:e}}case`quote`:{let e=[{text:r.sample.title,fontStyle:`italic`},{text:r.sample.subtitle??`Attribution`,fontSize:Math.max(18,Math.round(a*.4)),fontStyle:`normal`,fontWeight:`medium`,color:`#cbd5e1`,letterSpacing:1}];return{...i,label:r.label,text:R(e),textSpans:e}}case`breaking-update`:{let e=[{text:r.sample.eyebrow??`BREAKING`,fontSize:Math.max(16,Math.round(a*.28)),fontWeight:`bold`,color:`#fca5a5`,letterSpacing:2},{text:r.sample.title},{text:r.sample.subtitle??`Developing now`,fontSize:Math.max(20,Math.round(a*.38)),fontWeight:`semibold`,color:`#fde68a`}];return{...i,label:r.label,text:R(e),textSpans:e}}case`headline-stack`:{let e=[{text:r.sample.eyebrow??`TOP STORY`,fontSize:Math.max(16,Math.round(a*.3)),fontWeight:`semibold`,color:`#fbbf24`,letterSpacing:2},{text:r.sample.title},{text:r.sample.subtitle??`Subhead`,fontSize:Math.max(20,Math.round(a*.42)),fontWeight:`medium`,color:`#cbd5e1`}];return{...i,label:r.label,text:R(e),textSpans:e}}case`launch-stack`:{let e=[{text:r.sample.eyebrow??`NOW LIVE`,fontSize:Math.max(16,Math.round(a*.26)),fontWeight:`bold`,color:`#67e8f9`,letterSpacing:2},{text:r.sample.title},{text:r.sample.subtitle??`Shop the drop`,fontSize:Math.max(20,Math.round(a*.4)),fontWeight:`medium`,color:`#bfdbfe`}];return{...i,label:r.label,text:R(e),textSpans:e}}case`event-card`:{let e=[{text:r.sample.eyebrow??`LIVE`,fontSize:Math.max(18,Math.round(a*.28)),fontWeight:`bold`,color:`#fca5a5`,letterSpacing:2},{text:r.sample.title},{text:r.sample.subtitle??`Friday 8 PM`,fontSize:Math.max(22,Math.round(a*.38)),fontWeight:`semibold`,color:`#bfdbfe`,letterSpacing:1}];return{...i,label:r.label,text:R(e),textSpans:e}}case`badge`:return{...i,label:r.label,text:r.sample.title,textSpans:[{text:r.sample.title,letterSpacing:2}]};default:return{...i,label:r.label,text:r.sample.title,textSpans:void 0}}}function wi(e){if(!e)return{};let t={...e};return delete t.text,t}function Ti(e,t,n,r=1){let i=Ci(t,n,r),a=Array.isArray(e.textSpans)&&e.textSpans.length>0?e.textSpans:void 0,o=Array.isArray(i.textSpans)&&i.textSpans.length>0?i.textSpans:void 0,s=a?a.map((e,t)=>{let n=o?.[Math.min(t,Math.max(0,(o?.length??1)-1))];return{...e,...wi(n),text:e.text}}):void 0,c=s?s.map(e=>e.text).join(`
`):e.text;return{...i,text:c,textSpans:s,label:mi(c)}}const Ei={textStyleScale:e=>e.textStyleScale??1,fontSize:e=>e.fontSize??60,lineHeight:e=>e.lineHeight??1.2,textPadding:e=>e.textPadding??16,backgroundRadius:e=>e.backgroundRadius??0,textShadowOffsetX:e=>e.textShadow?.offsetX??0,textShadowOffsetY:e=>e.textShadow?.offsetY??0,textShadowBlur:e=>e.textShadow?.blur??0,strokeWidth:e=>e.stroke?.width??0};function Di(e,t){return Ei[t](e)}function Oi(e,t,n,r){return S(C(t,r),n,Di(e,r))}function ki(e,t){return C(e,t).length>0}function Ai(e,t,n,r,i,a){let o=ki(t,r);if(!o)return{isAnimated:o,value:i};let s=Oi(e,t,n,r);return{isAnimated:o,value:a===void 0?s:Math.max(a,s)}}function ji(e){if(e.offsetX!==0||e.offsetY!==0||e.blur!==0)return e}function Mi(e){if(!(e.width<=0))return e}function Ni(e,t,n){return!e.textStylePresetId||!n.isAnimated?e:{...e,...Ti(e,e.textStylePresetId,t,n.value??1)}}function Pi(e,t,n){return e.textStylePresetId&&n.isAnimated?n.value:t.textStyleScale}function Fi(e){return e.some(e=>e.isAnimated)}function Ii(e,t){return e.value===void 0?t:e.value}function Li(e,t){return t.textShadow?.color?t.textShadow.color:e.textShadow?.color?e.textShadow.color:`#000000`}function Ri(e,t,n,r,i){if(Fi([n,r,i])||t.textShadow)return ji({offsetX:Ii(n,0),offsetY:Ii(r,0),blur:Ii(i,0),color:Li(e,t)})}function zi(e,t,n){if(n.isAnimated||t.stroke)return Mi({width:n.value??0,color:t.stroke?.color??e.stroke?.color??`#111827`})}function Bi(e,t,n,r){let i=(r,i,a)=>Ai(e,t,n,r,i,a),a=i(`textStyleScale`,e.textStyleScale),o=Ni(e,r,a),s=i(`fontSize`,o.fontSize,1),c=i(`lineHeight`,o.lineHeight,.1),l=i(`textPadding`,o.textPadding,0),u=i(`backgroundRadius`,o.backgroundRadius,0),d=i(`textShadowOffsetX`,o.textShadow?.offsetX),f=i(`textShadowOffsetY`,o.textShadow?.offsetY),p=i(`textShadowBlur`,o.textShadow?.blur,0),m=i(`strokeWidth`,o.stroke?.width,0);return{...o,fontSize:s.value,lineHeight:c.value,textPadding:l.value,backgroundRadius:u.value,textStyleScale:Pi(e,o,a),textShadow:Ri(e,o,d,f,p),stroke:zi(e,o,m)}}function z(){throw Error(`Media library service loader is not registered`)}const Vi=`interpolation-tmp`;function Hi(e,t){let n=e.lastIndexOf(`.`);return`${n>0?e.slice(0,n):e} (${Math.round(t*100)/100}fps).mp4`}const B=n(`FrameInterpolationService`);async function Ui(e){try{return await(await(await(await navigator.storage.getDirectory()).getDirectoryHandle(Vi,{create:!0})).getFileHandle(`${e}.mp4`)).getFile()}catch{return null}}async function Wi(e){try{await(await(await navigator.storage.getDirectory()).getDirectoryHandle(Vi,{create:!0})).removeEntry(`${e}.mp4`)}catch{}}const Gi=new class{pendingJobs=[];jobsByMediaId=/* @__PURE__ */ new Map;activeJob=null;cancelledJobIds=/* @__PURE__ */ new Set;statusListener=null;mediaListener=null;lastEmit=/* @__PURE__ */ new Map;workerManager=f({createWorker:()=>new Worker(new URL(
/* @vite-ignore */
`/redaccio/video/editor/assets/frame-interpolation-worker-BzEq1IuI.js`,``+import.meta.url),{type:`module`}),setupWorker:e=>(e.onmessage=e=>{this.handleWorkerMessage(e.data)},e.onerror=e=>B.error(`Frame interpolation worker error`,{error:e}),()=>{e.onmessage=null,e.onerror=null})});onStatusChange(e){this.statusListener=e}onMediaCreated(e){this.mediaListener=e}canInterpolate(e){return e.startsWith(`video/`)}isGenerating(e){return this.jobsByMediaId.has(e)}generate(e){if(this.jobsByMediaId.has(e.mediaId))return;let t={...e,jobId:crypto.randomUUID()};this.jobsByMediaId.set(e.mediaId,t),this.pendingJobs.push(t),this.statusListener?.(e.mediaId,`generating`,0,`preparing`),this.drain()}cancel(e){let t=this.jobsByMediaId.get(e);if(!t)return;let n=this.pendingJobs.findIndex(e=>e.jobId===t.jobId);if(n>=0){this.pendingJobs.splice(n,1),this.finish(t,`idle`);return}this.cancelledJobIds.add(t.jobId),this.finish(t,`idle`),this.activeJob?.jobId===t.jobId&&this.post({type:`cancel`,jobId:t.jobId})}cancelAll(){for(let e of[...this.jobsByMediaId.keys()])this.cancel(e)}post(e){this.workerManager.getWorker().postMessage(e)}emitProgress(e,t,n,r){let i=this.lastEmit.get(e.jobId),a=Date.now();i&&a-i.at<150&&Math.abs(t-i.progress)<.01&&t<1||(this.lastEmit.set(e.jobId,{at:a,progress:t}),this.statusListener?.(e.mediaId,`generating`,t,n,r))}finish(e,t){this.jobsByMediaId.delete(e.mediaId),this.lastEmit.delete(e.jobId),this.statusListener?.(e.mediaId,t)}async drain(){if(this.activeJob)return;let e=this.pendingJobs.shift();if(!e)return;this.activeJob=e;let t,n,r;try{if(e.source instanceof Blob)t=e.source;else if(typeof e.source==`function`){let n=await e.source();if(!n)throw Error(`Source bytes unavailable`);t=n}else n=e.source.path,r=e.source.mimeType}catch(t){if(this.activeJob=null,this.cancelledJobIds.delete(e.jobId)){this.drain();return}B.error(`Frame interpolation source load failed`,{mediaId:e.mediaId,error:t}),this.finish(e,`error`),this.drain();return}if(this.cancelledJobIds.delete(e.jobId)){this.activeJob=null,await Wi(e.jobId),this.drain();return}this.post({type:`interpolate`,jobId:e.jobId,source:t,sourceOpfsPath:n,sourceMimeType:r,sourceFps:e.sourceFps,factor:e.factor})}async handleWorkerMessage(e){let t=this.activeJob;if(t&&t.jobId===e.jobId){if(e.type===`progress`){this.cancelledJobIds.has(t.jobId)||this.emitProgress(t,e.progress,e.stage,e.etaSeconds);return}this.activeJob=null;try{this.cancelledJobIds.has(t.jobId)?await Wi(t.jobId):e.type===`complete`?await this.importResult(t,e.result.outputFps):e.type===`error`?(B.error(`Frame interpolation failed`,{mediaId:t.mediaId,error:e.error}),this.finish(t,`error`)):this.finish(t,`idle`)}finally{this.cancelledJobIds.delete(t.jobId),this.drain()}}}async importResult(e,t){try{let n=await Ui(e.jobId);if(this.cancelledJobIds.has(e.jobId))return;if(!n||n.size===0)throw Error(`Interpolated render produced no file`);let r=new File([n],Hi(e.fileName,t),{type:`video/mp4`}),{mediaLibraryService:i}=await import(`./media-library-service-BBDnvzgZ.js`);if(this.cancelledJobIds.has(e.jobId))return;let a=await i.importGeneratedVideo(r,e.projectId,{fps:t,tags:[`interpolated`]});if(this.cancelledJobIds.has(e.jobId)){await i.deleteMediaFromProject(e.projectId,a.id);return}this.mediaListener?.(a,e.projectId),this.finish(e,`ready`),B.info(`Interpolated media imported`,{sourceMediaId:e.mediaId,mediaId:a.id,fps:t})}catch(t){if(this.cancelledJobIds.has(e.jobId)){B.error(`Failed to roll back cancelled interpolation import`,{mediaId:e.mediaId,error:t});return}B.error(`Failed to import interpolated media`,{mediaId:e.mediaId,error:t}),this.finish(e,`error`)}finally{await Wi(e.jobId)}}};function Ki(e,t){if(!Number.isInteger(e)||!Number.isInteger(t)||e<=0||t<=0)throw Error(`upscaledSize: invalid source size ${e}x${t}`);return{width:e*2,height:t*2}}function qi(e,t){if(!Number.isInteger(e)||!Number.isInteger(t)||e<=0||t<=0)return!1;let n=Ki(e,t);return n.width<=4096&&n.height<=4096&&n.width*n.height<=8294400}n(`Anime4kUpscaler`);const Ji=`upscale-tmp`;function Yi(e,t,n){let r=e.lastIndexOf(`.`);return`${r>0?e.slice(0,r):e} (${t}x${n}).mp4`}const V=n(`UpscaleService`);async function Xi(e){try{return await(await(await(await navigator.storage.getDirectory()).getDirectoryHandle(Ji,{create:!0})).getFileHandle(`${e}.mp4`)).getFile()}catch{return null}}async function Zi(e){try{await(await(await navigator.storage.getDirectory()).getDirectoryHandle(Ji,{create:!0})).removeEntry(`${e}.mp4`)}catch{}}const Qi=new class{pendingJobs=[];jobsByMediaId=/* @__PURE__ */ new Map;activeJob=null;cancelledJobIds=/* @__PURE__ */ new Set;statusListener=null;mediaListener=null;lastEmit=/* @__PURE__ */ new Map;workerManager=f({createWorker:()=>new Worker(new URL(
/* @vite-ignore */
`/redaccio/video/editor/assets/upscale-worker-zo1wnRvb.js`,``+import.meta.url),{type:`module`}),setupWorker:e=>(e.onmessage=e=>{this.handleWorkerMessage(e.data)},e.onerror=e=>V.error(`Upscale worker error`,{error:e}),()=>{e.onmessage=null,e.onerror=null})});onStatusChange(e){this.statusListener=e}onMediaCreated(e){this.mediaListener=e}canUpscaleMedia(e,t,n){return e.startsWith(`video/`)&&qi(t,n)}isGenerating(e){return this.jobsByMediaId.has(e)}generate(e){if(this.jobsByMediaId.has(e.mediaId))return;let t={...e,jobId:crypto.randomUUID()};this.jobsByMediaId.set(e.mediaId,t),this.pendingJobs.push(t),this.statusListener?.(e.mediaId,`generating`,0,`preparing`),this.drain()}cancel(e){let t=this.jobsByMediaId.get(e);if(!t)return;let n=this.pendingJobs.findIndex(e=>e.jobId===t.jobId);if(n>=0){this.pendingJobs.splice(n,1),this.finish(t,`idle`);return}this.cancelledJobIds.add(t.jobId),this.finish(t,`idle`),this.activeJob?.jobId===t.jobId&&this.post({type:`cancel`,jobId:t.jobId})}cancelAll(){for(let e of[...this.jobsByMediaId.keys()])this.cancel(e)}post(e){this.workerManager.getWorker().postMessage(e)}emitProgress(e,t,n,r){let i=this.lastEmit.get(e.jobId),a=Date.now();i&&a-i.at<150&&Math.abs(t-i.progress)<.01&&t<1||(this.lastEmit.set(e.jobId,{at:a,progress:t}),this.statusListener?.(e.mediaId,`generating`,t,n,r))}finish(e,t){this.jobsByMediaId.delete(e.mediaId),this.lastEmit.delete(e.jobId),this.statusListener?.(e.mediaId,t)}async drain(){if(this.activeJob)return;let e=this.pendingJobs.shift();if(!e)return;this.activeJob=e;let t,n,r;try{if(e.source instanceof Blob)t=e.source;else if(typeof e.source==`function`){let n=await e.source();if(!n)throw Error(`Source bytes unavailable`);t=n}else n=e.source.path,r=e.source.mimeType}catch(t){if(this.activeJob=null,this.cancelledJobIds.delete(e.jobId)){this.drain();return}V.error(`Upscale source load failed`,{mediaId:e.mediaId,error:t}),this.finish(e,`error`),this.drain();return}if(this.cancelledJobIds.delete(e.jobId)){this.activeJob=null,await Zi(e.jobId),this.drain();return}this.post({type:`upscale`,jobId:e.jobId,source:t,sourceOpfsPath:n,sourceMimeType:r,sourceFps:e.sourceFps,variant:e.variant})}async handleWorkerMessage(e){let t=this.activeJob;if(t&&t.jobId===e.jobId){if(e.type===`progress`){this.cancelledJobIds.has(t.jobId)||this.emitProgress(t,e.progress,e.stage,e.etaSeconds);return}this.activeJob=null;try{this.cancelledJobIds.has(t.jobId)?await Zi(t.jobId):e.type===`complete`?await this.importResult(t,e.result.width,e.result.height,e.result.fps):e.type===`error`?(V.error(`Upscale failed`,{mediaId:t.mediaId,error:e.error}),this.finish(t,`error`)):this.finish(t,`idle`)}finally{this.cancelledJobIds.delete(t.jobId),this.drain()}}}async importResult(e,t,n,r){try{let i=await Xi(e.jobId);if(this.cancelledJobIds.has(e.jobId))return;if(!i||i.size===0)throw Error(`Upscale render produced no file`);let a=new File([i],Yi(e.fileName,t,n),{type:`video/mp4`}),{mediaLibraryService:o}=await import(`./media-library-service-BBDnvzgZ.js`);if(this.cancelledJobIds.has(e.jobId))return;let s=await o.importGeneratedVideo(a,e.projectId,{fps:r,tags:[`upscaled`]});if(this.cancelledJobIds.has(e.jobId)){await o.deleteMediaFromProject(e.projectId,s.id);return}this.mediaListener?.(s,e.projectId),this.finish(e,`ready`),V.info(`Upscaled media imported`,{sourceMediaId:e.mediaId,mediaId:s.id,width:t,height:n})}catch(t){if(this.cancelledJobIds.has(e.jobId)){V.error(`Failed to roll back cancelled upscale import`,{mediaId:e.mediaId,error:t});return}V.error(`Failed to import upscaled media`,{mediaId:e.mediaId,error:t}),this.finish(e,`error`)}finally{await Zi(e.jobId)}}},$i=[{description:`Media files`,accept:{"video/*":[`.mp4`,`.webm`,`.mov`,`.avi`,`.mkv`],"audio/*":[`.mp3`,`.wav`,`.ogg`,`.m4a`,`.aac`],"image/*":[`.jpg`,`.jpeg`,`.png`,`.gif`,`.webp`,`.svg`],"application/lottie+json":[`.json`,`.lottie`]}}];function ea(){return typeof window<`u`&&`showOpenFilePicker`in window}async function ta(e){return window.showOpenFilePicker({multiple:e?.multiple??!0,types:$i})}function na(e,t){return`${e}:${t}`}const H=i()(e=>({tasks:/* @__PURE__ */ new Map,queueTask:(t,n)=>e(e=>{let r=na(t,n),i=new Map(e.tasks);return i.set(r,{id:r,mediaId:t,type:n,status:`queued`,progress:0,updatedAt:Date.now()}),{tasks:i}}),updateTask:(t,n,r)=>e(e=>{let i=na(t,n),a=e.tasks.get(i);if(!a)return e;let o=new Map(e.tasks);return o.set(i,{...a,...r,progress:Math.max(0,Math.min(1,r.progress??a.progress)),updatedAt:Date.now()}),{tasks:o}}),completeTask:(t,n)=>e(e=>{let r=new Map(e.tasks);return r.delete(na(t,n)),{tasks:r}}),clearMedia:t=>e(e=>{let n=new Map(e.tasks);for(let[e,r]of n)r.mediaId===t&&n.delete(e);return{tasks:n}}),clearAll:()=>e({tasks:/* @__PURE__ */ new Map})})),U=n(`MediaImport`);function ra(e,t,n,r){let i=Date.now();return{id:n,storageType:r===`link`?`handle`:`workspace`,fileHandle:r===`link`?e:void 0,fileName:t.name,fileSize:t.size,fileLastModified:t.lastModified,mimeType:d(t),duration:0,width:0,height:0,fps:30,codec:`importing...`,bitrate:0,tags:[],createdAt:i,updatedAt:i}}function ia(e,t){H.getState().clearMedia(t),e(e=>({mediaItems:e.mediaItems.filter(e=>e.id!==t),importingIds:e.importingIds.filter(e=>e!==t)}))}function aa(e,t,n){let r=!1;return H.getState().clearMedia(t),e(e=>{let i=e.mediaItems.filter(e=>e.id!==t);return r=i.some(e=>e.id===n.id),{mediaItems:r?i.map(e=>e.id===n.id?n:e):[n,...i],importingIds:e.importingIds.filter(e=>e!==t)}}),r}function oa(e,t){e(e=>({mediaItems:[t,...e.mediaItems.filter(e=>e.id!==t.id)],error:null,errorLink:null}))}function sa(e){if(!l.canGenerateProxy(e.mimeType))return;l.setProxyKey(e.id,u(e));let t=Math.min(e.width||0,e.height||0)>720,n=/hev|hvc|h\.?265/i.test(e.codec||``);(t||n)&&l.generateProxy(e.id,e.storageType===`opfs`&&e.opfsPath?{kind:`opfs`,path:e.opfsPath,mimeType:e.mimeType}:async()=>(await z()).mediaLibraryService.getMediaFile(e.id),e.width,e.height,u(e),{priority:`background`})}function ca(e){let t=H.getState();t.queueTask(e,`import`),t.updateTask(e,`import`,{status:`queued`,progress:.05})}function la(e){H.getState().updateTask(e,`import`,{status:`running`,progress:.2})}function ua(e,t,n,r){let i=[],a=[],o=[],s=0,c=0;return e.forEach((e,l)=>{let u=t[l];if(u){if(e.status===`fulfilled`){let{metadata:t,tempId:c,file:l,handle:u}=e.value,d=aa(n,c,t);t.isDuplicate&&d?(a.push(l.name),r?.includeDuplicatesInResults&&i.push(t)):(sa(t),i.push(t),s+=1,t.hasUnsupportedCodec&&t.audioCodec&&o.push({fileName:l.name,audioCodec:t.audioCodec,handle:u}))}else c++,ia(n,u.tempId),U.error(`Failed to import ${u.file.name}`,e.reason)}}),{results:i,importedCount:s,duplicateNames:a,unsupportedCodecFiles:o,failedCount:c}}function da(e){return e===1?`file`:`files`}function fa(e){return e.length===0?``:e.length<=3?e.join(`, `):`${e.slice(0,3).join(`, `)} and ${e.length-3} more`}function pa({importedCount:e,duplicateNames:t,unsupportedCodecFiles:n,failedCount:r}){if(!(t.length>0||n.length>0||r>0))return null;let i=[];if(e>0&&i.push(`Imported ${e} ${da(e)}.`),t.length>0&&(e===0&&n.length===0&&r===0?i.push(t.length===1?`"${t[0]}" already exists in library`:`${t.length} files already exist in library`):t.length===1?i.push(`Skipped 1 duplicate: ${t[0]}.`):i.push(`Skipped ${t.length} duplicates: ${fa(t)}.`)),n.length>0){let e=[...new Set(n.map(e=>e.audioCodec))].join(`, `);i.push(`${n.length} ${da(n.length)} ${n.length===1?`has`:`have`} unsupported audio codec (${e}). Waveforms may not be available.`)}return r>0&&i.push(r===1?`1 file failed to import. Check the file and try again.`:`${r} files failed to import. Check the files and try again.`),i.length>0?i.join(` `):null}function W(e,t,n,r,i){let a=pa({importedCount:e,duplicateNames:t,unsupportedCodecFiles:n,failedCount:r});if(!a)return;let o=r>0||n.length>0?`warning`:`info`;i().showNotification({type:o,message:a})}function ma(e,n){let r=async(t,n)=>{let r=[];for(let i of t){if(!i)continue;let t=crypto.randomUUID(),a;try{a=await i.getFile()}catch(e){U.error(`Failed to read file from handle "${i.name}":`,e);continue}let o=ra(i,a,t,n);e(e=>({mediaItems:[o,...e.mediaItems],importingIds:[...e.importingIds,t],error:null})),ca(t),r.push({handle:i,tempId:t,file:a})}return r},i=async(e,t,n,r)=>{let i=Array(e.length),a=0,{mediaLibraryService:o}=await n,s=async()=>{for(;a<e.length;){let n=a++,s=e[n];if(s)try{la(s.tempId);let e=await o.importMediaWithHandle(s.handle,t,{storageMode:r});i[n]={status:`fulfilled`,value:{metadata:e,tempId:s.tempId,file:s.file,handle:s.handle}}}catch(e){i[n]={status:`rejected`,reason:e}}}},c=Math.min(2,e.length);return await Promise.all(Array.from({length:c},s)),i},a=async(a,o)=>{let{currentProjectId:s}=n();if(!s)return e({error:`No project selected`}),[];let c=t(),l=U.startEvent(`import`,c);l.merge({source:`drag-drop`,projectId:s,fileCount:a.length});let u=o?.storageMode??`copy`,d=z(),f=await r(a,u),{results:p,importedCount:m,duplicateNames:h,unsupportedCodecFiles:g,failedCount:_}=ua(await i(f,s,d,u),f,e,o);if(W(m,h,g,_,n),o?.waitForPreparation&&p.length>0){let{mediaLibraryService:e}=await d;await e.waitForMediaPreparation(p.map(e=>e.id))}return l.success({imported:m,duplicates:h.length,failed:_,unsupportedCodecs:g.length}),p};return{importMedia:async a=>{let{currentProjectId:o}=n();if(!o)return e({error:`No project selected`}),[];if(!ea()){let t=`brave`in navigator;return e({error:t?`File System Access API is disabled in Brave. Copy the URL below, paste it in your address bar, set the flag to Enabled, and relaunch.`:`File picker not supported in this browser. Use Chrome or Edge.`,errorLink:t?`brave://flags/#file-system-access-api`:null}),[]}let s=t(),c=U.startEvent(`import`,s);c.set(`source`,`picker`),c.set(`projectId`,o);try{let t=await ta({multiple:!0});c.set(`fileCount`,t.length);let s=z(),l=a?.storageMode??`copy`,u=await r(t,l),{results:d,importedCount:f,duplicateNames:p,unsupportedCodecFiles:m,failedCount:h}=ua(await i(u,o,s,l),u,e);return W(f,p,m,h,n),c.success({imported:f,duplicates:p.length,failed:h,unsupportedCodecs:m.length}),d}catch(t){return t instanceof Error&&t.name!==`AbortError`?(e({error:t.message}),c.failure(t)):c.success({outcome:`cancelled`,imported:0,duplicates:0,failed:0,unsupportedCodecs:0}),[]}},importMediaFromUrl:async r=>{let{currentProjectId:i}=n(),a=r.trim();if(!i)return e({error:`No project selected`,errorLink:null}),[];if(a.length===0)return e({error:`Enter a media URL.`,errorLink:null}),[];e({error:null,errorLink:null});let o=t(),s=U.startEvent(`import`,o);s.set(`source`,`url`),s.set(`projectId`,i);try{let e=new URL(a);s.set(`urlHost`,e.hostname)}catch{s.set(`urlHost`,`invalid`)}try{let{mediaLibraryService:t}=await z(),r=await t.importMediaFromUrl(a,i);if(r.isDuplicate)return W(0,[r.fileName],[],0,n),s.success({imported:0,duplicates:1,failed:0,unsupportedCodecs:0}),[];oa(e,r),sa(r);let o=r.hasUnsupportedCodec&&r.audioCodec?[{fileName:r.fileName,audioCodec:r.audioCodec}]:[];return W(1,[],o,0,n),s.success({imported:1,duplicates:0,failed:0,unsupportedCodecs:o.length}),[r]}catch(t){let n=t instanceof Error?t:Error(String(t));return e({error:n.message,errorLink:null}),s.failure(n),[]}},importRemoteLottie:async r=>{let{currentProjectId:i}=n();if(!i)return e({error:`No project selected`,errorLink:null}),null;e({error:null,errorLink:null});let a=t(),o=U.startEvent(`import`,a);o.set(`source`,`lottiefiles`),o.set(`projectId`,i),o.set(`provider`,r.attribution?.provider??`unknown`);try{let{mediaLibraryService:t}=await z(),a=await t.importLottieFromUrl(r.url,i,{fileName:r.fileName,attribution:r.attribution});return a.isDuplicate?(W(0,[a.fileName],[],0,n),o.success({imported:0,duplicates:1,failed:0,unsupportedCodecs:0}),a):(oa(e,a),W(1,[],[],0,n),o.success({imported:1,duplicates:0,failed:0,unsupportedCodecs:0}),a)}catch(t){let n=t instanceof Error?t:Error(String(t));return e({error:n.message,errorLink:null}),o.failure(n),null}},importHandles:async(e,t)=>a(e,t),importHandlesForPlacement:async e=>a(e,{includeDuplicatesInResults:!0,waitForPreparation:!0,storageMode:`copy`})}}const ha=/* @__PURE__ */ new Set;function ga(e,t=[]){for(let n of ha)n(e,t)}function _a(e,t){e(e=>({mediaItems:e.mediaItems.filter(e=>!t.includes(e.id)),selectedMediaIds:e.selectedMediaIds.filter(e=>!t.includes(e))}))}function va(e){return e?.aiCaptions?.map(e=>e.thumbRelPath)??[]}function ya(e,t){let n=new Map(t.map(e=>[e.id,e]));for(let t of e)p.release(t),l.clearProxyKey(t),ga(t,va(n.get(t))),H.getState().clearMedia(t)}function ba(e,t){let n=async(n,r,i)=>{e({error:null});let a=t().mediaItems,o=t().selectedMediaIds;_a(e,n);try{await r(),ya(n,a)}catch(t){throw e({mediaItems:a,selectedMediaIds:o,error:t instanceof Error?t.message:i}),t}};return{deleteMedia:async e=>{let{currentProjectId:r}=t();await n([e],async()=>{let{mediaLibraryService:t}=await z();return r?t.deleteMediaFromProject(r,e):t.deleteMedia(e)},`Delete failed`)},deleteMediaBatch:async e=>{let{currentProjectId:r}=t();await n(e,async()=>{let{mediaLibraryService:t}=await z();return r?t.deleteMediaBatchFromProject(r,e):t.deleteMediaBatch(e)},`Batch delete failed`)}}}function G(){return null}const K=n(`MediaRelinkingActions`);function xa(e,t,n){e(e=>({mediaItems:e.mediaItems.map(e=>e.id===t?n:e)}))}function Sa(e,t,n,r){p.invalidate(n),xa(e,n,r);let i=G();if(i)for(let e of i.getItemsState().items)e.mediaId===n&&i.updateProjectItem(e.id,{src:void 0,reverseConformSrc:void 0,reverseConformPath:void 0,reverseConformKey:void 0,reverseConformPreviewSrc:void 0,reverseConformPreviewPath:void 0,reverseConformPreviewKey:void 0,reverseConformPreviewUsesProxy:void 0,reverseConformPreviewIsSourceLevel:void 0,reverseConformPreviewSourceDuration:void 0,reverseConformPreviewFps:void 0,reverseConformStatus:void 0,reverseConformLocalStart:void 0});t().markMediaHealthy(n)}function Ca(e,t){let n={mediaId:e.id,label:e.fileName,src:void 0,thumbnailUrl:void 0,waveformData:void 0};if(e.width>0&&e.height>0&&(n.sourceWidth=e.width,n.sourceHeight=e.height),e.duration>0){let r=e.fps>0?e.fps:t;n.sourceFps=r,n.sourceDuration=Math.round(e.duration*r)}return n}function wa(e,t){let n=G();if(!n)return K.error(`[getOrphanedRelinkTargetIds] Timeline relinking actions are not registered`),[e];let{items:r,itemById:i}=n.getItemsState(),a=i[e];if(!a)return[e];let o=n.getSynchronizedLinkedItems(r,e),s=a.mediaId;if(!s||s===t){let n=o.filter(e=>e.mediaId===t).map(e=>e.id);return n.length>0?n:[e]}let c=o.filter(e=>e.mediaId===s).map(e=>e.id);return c.length>0?c:[e]}function Ta(e){let t=/* @__PURE__ */ new Set;for(let n of e){let e=G()?.getItemsState().itemById[n];wa(n,e?.mediaId??``).forEach(e=>t.add(e))}return t.size>0?Array.from(t):e}function Ea(e,t){return{markMediaBroken:(t,n)=>{e(e=>{if(e.brokenMediaIds.includes(t))return e;let r=new Map(e.brokenMediaInfo);return r.set(t,n),{brokenMediaIds:[...e.brokenMediaIds,t],brokenMediaInfo:r}})},markMediaHealthy:t=>{e(e=>{let n=new Map(e.brokenMediaInfo);return n.delete(t),{brokenMediaIds:e.brokenMediaIds.filter(e=>e!==t),brokenMediaInfo:n,dismissedMissingMediaIds:(e.dismissedMissingMediaIds??[]).filter(e=>e!==t),orphanedClips:(e.orphanedClips??[]).filter(e=>e.mediaId!==t)}})},dismissMissingMediaWarnings:t=>{e(e=>({dismissedMissingMediaIds:Array.from(/* @__PURE__ */ new Set([...e.dismissedMissingMediaIds??[],...t])),showMissingMediaDialog:!1}))},relinkMedia:async(n,r)=>{try{let{mediaLibraryService:i}=await z(),a=await i.relinkMediaHandle(n,r);return Sa(e,t,n,a),t().showNotification({type:`success`,message:`"${a.fileName}" relinked successfully`}),!0}catch(e){return K.error(`[relinkMedia] error:`,e),t().showNotification({type:`error`,message:e instanceof Error?e.message:`Failed to relink file`}),!1}},relinkMediaBatch:async n=>{let r=[],i=[],{mediaLibraryService:a}=await z();for(let{mediaId:o,handle:s}of n)try{Sa(e,t,o,await a.relinkMediaHandle(o,s)),r.push(o)}catch(e){K.error(`[relinkMediaBatch] error for ${o}:`,e),i.push(o)}return r.length>0?t().showNotification({type:i.length>0?`warning`:`success`,message:`Relinked ${r.length} file${r.length===1?``:`s`}${i.length>0?`, ${i.length} failed`:``}`}):i.length>0&&t().showNotification({type:`error`,message:`Failed to relink ${i.length} file${i.length===1?``:`s`}`}),{success:r,failed:i}},openMissingMediaDialog:()=>e({showMissingMediaDialog:!0}),closeMissingMediaDialog:()=>e({showMissingMediaDialog:!1}),setOrphanedClips:t=>e({orphanedClips:t}),clearOrphanedClips:()=>e({orphanedClips:[]}),openOrphanedClipsDialog:()=>e({showOrphanedClipsDialog:!0}),closeOrphanedClipsDialog:()=>e({showOrphanedClipsDialog:!1}),relinkOrphanedClip:async(n,r)=>{try{let{mediaLibraryService:i}=await z(),a=await i.getMedia(r);if(!a)return K.error(`[relinkOrphanedClip] Media not found: ${r}`),t().showNotification({type:`error`,message:`Selected media not found`}),!1;let o=wa(n,r);if(o.length===0)return!1;if(o.every(e=>G()?.getItemsState().itemById[e]?.mediaId===r))return e(e=>({orphanedClips:e.orphanedClips.filter(e=>!o.includes(e.itemId))})),!0;let s=G();if(!s)return K.error(`[relinkOrphanedClip] Timeline relinking actions are not registered`),t().showNotification({type:`error`,message:`Timeline actions are unavailable`}),!1;let c=Ca(a,s.getFps()),l=o.filter(e=>s.updateProjectItem(e,c));return l.length===0?(t().showNotification({type:`error`,message:`Clip not found`}),!1):(K.debug(`[relinkOrphanedClip] Relinked clip ${n} to media ${r}`,{relinkedItemIds:l}),e(e=>({orphanedClips:e.orphanedClips.filter(e=>!l.includes(e.itemId))})),t().showNotification({type:`success`,message:l.length>1?`Linked clips relinked to "${a.fileName}"`:`Clip relinked to "${a.fileName}"`}),!0)}catch(e){return K.error(`[relinkOrphanedClip] error:`,e),t().showNotification({type:`error`,message:e instanceof Error?e.message:`Failed to relink clip`}),!1}},removeOrphanedClips:n=>{try{let r=Ta(n),i=G();if(!i){K.error(`[removeOrphanedClips] Timeline relinking actions are not registered`),t().showNotification({type:`error`,message:`Timeline actions are unavailable`});return}i.removeProjectItems(r),e(e=>({orphanedClips:e.orphanedClips.filter(e=>!n.includes(e.itemId))})),t().showNotification({type:`info`,message:`Removed ${n.length} orphaned clip${n.length===1?``:`s`}`})}catch(e){K.error(`[removeOrphanedClips] error:`,e)}}}}function Da(e,t){return t.kind===`permission`?{mediaId:e.id,fileName:e.fileName,errorType:`permission_denied`}:t.kind===`missing`?{mediaId:e.id,fileName:e.fileName,errorType:`file_missing`}:null}function Oa(e){let t=[],n=[];for(let r of e){if(r.validation.kind===`ok`){t.push(r.media.id);continue}let e=Da(r.media,r.validation);e&&n.push(e)}return{healthyIds:t,broken:n}}async function ka(e,t,n){return Oa(await Promise.all(e.map(async e=>{let r=await t(e.id);return n&&(r.kind===`missing`||r.kind===`permission`)&&await n(e.id)?{media:e,validation:{kind:`ok`}}:{media:e,validation:r}})))}function Aa(e){return Math.max(0,Math.min(1,e))}function ja(e){return e===`downloading`||e===`preparing`}function Ma(e){return e.stage===`preparing`&&Aa(e.progress)>=1}function Na(e){let t=Aa(e.progress);switch(e.stage){case`queued`:return 0;case`downloading`:return t*.6;case`preparing`:return .6+t*.15;case`decoding`:return .75+t*.05;case`transcribing`:return .8+t*.2}}function Pa(e,t){let n={...t,progress:Aa(t.progress)};if(!e||e.stage===`queued`)return n;let r=ja(n.stage);return r===ja(e.stage)?n.stage===`downloading`&&n.restarted&&e.stage===`preparing`&&!Ma(e)||Na(n)>=Na(e)?n:e:r?Ma(n)?e:n:Ma(e)?n:e}const q=n(`MediaLibraryStore`);let J=null;function Fa(e,t){if(e===t)return!0;if(e.length!==t.length)return!1;for(let n=0;n<e.length;n+=1)if(e[n]!==t[n])return!1;return!0}function Ia(e){let t={};for(let n of e)t[n.id]=n;return t}function La(e,t){let n=/* @__PURE__ */ new Map;for(let r of e)n.set(r.id,t?.has(r.id)?`ready`:`idle`);return n}async function Ra(e){try{return La(e,await o(e.map(e=>e.id)))}catch(t){return q.warn(`[MediaLibraryStore] Failed to load transcript availability:`,t),La(e)}}function za(e){return e.filter(e=>l.canGenerateProxy(e.mimeType))}async function Ba(e){let t=za(e);if(t.length!==0){for(let e of t)l.setProxyKey(e.id,u(e));await l.loadExistingProxies(t.map(e=>e.id))}}const Y=i()(r((e,n)=>({currentProjectId:null,mediaItems:[],mediaById:{},isLoading:!1,importingIds:[],error:null,errorLink:null,notification:null,selectedMediaIds:[],selectedCompositionIds:[],searchQuery:``,filterByType:null,sortBy:`date`,viewMode:`grid`,mediaItemSize:1,brokenMediaIds:[],brokenMediaInfo:/* @__PURE__ */ new Map,dismissedMissingMediaIds:[],showMissingMediaDialog:!1,isScanningMediaHealth:!1,orphanedClips:[],showOrphanedClipsDialog:!1,unsupportedCodecFiles:[],showUnsupportedCodecDialog:!1,unsupportedCodecResolver:null,proxyStatus:/* @__PURE__ */ new Map,proxyProgress:/* @__PURE__ */ new Map,interpolationStatus:/* @__PURE__ */ new Map,interpolationProgress:/* @__PURE__ */ new Map,interpolationStage:/* @__PURE__ */ new Map,interpolationEtaSeconds:/* @__PURE__ */ new Map,upscaleStatus:/* @__PURE__ */ new Map,upscaleProgress:/* @__PURE__ */ new Map,upscaleStage:/* @__PURE__ */ new Map,upscaleEtaSeconds:/* @__PURE__ */ new Map,transcriptStatus:/* @__PURE__ */ new Map,transcriptProgress:/* @__PURE__ */ new Map,taggingMediaIds:/* @__PURE__ */ new Set,analysisProgress:null,setCurrentProject:t=>{n().currentProjectId!==t&&(Gi.cancelAll(),Qi.cancelAll());let r=n().mediaItems.map(e=>e.id);for(let e of r)l.clearProxyKey(e);e({currentProjectId:t,mediaItems:[],mediaById:{},selectedMediaIds:[],selectedCompositionIds:[],isLoading:!!t,proxyStatus:/* @__PURE__ */ new Map,proxyProgress:/* @__PURE__ */ new Map,interpolationStatus:/* @__PURE__ */ new Map,interpolationProgress:/* @__PURE__ */ new Map,interpolationStage:/* @__PURE__ */ new Map,interpolationEtaSeconds:/* @__PURE__ */ new Map,upscaleStatus:/* @__PURE__ */ new Map,upscaleProgress:/* @__PURE__ */ new Map,upscaleStage:/* @__PURE__ */ new Map,upscaleEtaSeconds:/* @__PURE__ */ new Map,transcriptStatus:/* @__PURE__ */ new Map,transcriptProgress:/* @__PURE__ */ new Map,taggingMediaIds:/* @__PURE__ */ new Set,analysisProgress:null,dismissedMissingMediaIds:[],isScanningMediaHealth:!1}),H.getState().clearAll()},loadMediaItems:async()=>{let{currentProjectId:r}=n();if(!r){e({isLoading:!1});return}e({isLoading:!0,error:null});let i=t(),a=q.startEvent(`loadMediaItems`,i);a.set(`projectId`,r);try{let{mediaLibraryService:t}=await z(),i=await t.getMediaForProject(r);e({mediaItems:i,mediaById:Ia(i),isLoading:!1}),a.set(`mediaCount`,i.length),t.prefetchThumbnails(i.map(e=>({id:e.id,thumbnailId:e.thumbnailId}))).catch(e=>q.warn(`[MediaLibraryStore] Thumbnail prefetch failed:`,e)),n().scanMediaHealth(),t.mirrorOpfsMediaToWorkspace(i).catch(e=>q.warn(`[MediaLibraryStore] OPFS→workspace mirror sweep failed:`,e));let o=await Ra(i);e({transcriptStatus:o,transcriptProgress:/* @__PURE__ */ new Map}),a.set(`transcriptsReady`,[...o.values()].filter(e=>e===`ready`).length);try{await Ba(i)}catch(e){q.warn(`[MediaLibraryStore] Proxy initialization failed:`,e)}a.success({mediaCount:i.length})}catch(t){throw a.failure(t instanceof Error?t:Error(String(t))),e({error:t instanceof Error?t.message:`Failed to load media`,isLoading:!1}),t}},...ma(e,n),...ba(e,n),...Ea(e,n),scanMediaHealth:async()=>{let{currentProjectId:t,mediaItems:r}=n();if(!t||r.length===0){e({isScanningMediaHealth:!1});return}e({isScanningMediaHealth:!0});try{let e=await ka(r,s,c);if(n().currentProjectId!==t)return;for(let t of e.healthyIds)n().markMediaHealthy(t);for(let t of e.broken)n().markMediaBroken(t.mediaId,t)}catch(e){q.warn(`[MediaLibraryStore] Workspace health scan failed:`,e)}finally{n().currentProjectId===t&&e({isScanningMediaHealth:!1})}},prependMediaItem:t=>{e(e=>({mediaItems:[t,...e.mediaItems]}))},setSelection:({mediaIds:t,compositionIds:r})=>{let i=n(),a=Fa(i.selectedMediaIds,t),o=Fa(i.selectedCompositionIds,r);a&&o||e({selectedMediaIds:a?i.selectedMediaIds:t,selectedCompositionIds:o?i.selectedCompositionIds:r})},selectMedia:t=>{Fa(n().selectedMediaIds,t)||e({selectedMediaIds:t})},selectCompositions:t=>{Fa(n().selectedCompositionIds,t)||e({selectedCompositionIds:t})},toggleMediaSelection:t=>e(e=>({selectedMediaIds:e.selectedMediaIds.includes(t)?e.selectedMediaIds.filter(e=>e!==t):[...e.selectedMediaIds,t]})),toggleCompositionSelection:t=>e(e=>({selectedCompositionIds:e.selectedCompositionIds.includes(t)?e.selectedCompositionIds.filter(e=>e!==t):[...e.selectedCompositionIds,t]})),clearSelection:()=>{let t=n();(t.selectedMediaIds.length!==0||t.selectedCompositionIds.length!==0)&&e({selectedMediaIds:[],selectedCompositionIds:[]})},setSearchQuery:t=>e({searchQuery:t}),setFilterByType:t=>e({filterByType:t}),setSortBy:t=>e({sortBy:t}),setViewMode:t=>e({viewMode:t}),setMediaItemSize:t=>e({mediaItemSize:Math.max(1,Math.min(5,t))}),clearError:()=>e({error:null,errorLink:null}),showNotification:t=>{e({notification:t}),J!==null&&clearTimeout(J),J=setTimeout(()=>{J=null,e(e=>e.notification===t?{notification:null}:e)},4e3)},clearNotification:()=>{J!==null&&(clearTimeout(J),J=null),e({notification:null})},confirmUnsupportedCodecs:t=>new Promise(n=>{e({unsupportedCodecFiles:t,showUnsupportedCodecDialog:!0,unsupportedCodecResolver:n})}),resolveUnsupportedCodecDialog:t=>{let{unsupportedCodecResolver:r}=n();r&&r(t),e({unsupportedCodecFiles:[],showUnsupportedCodecDialog:!1,unsupportedCodecResolver:null})},setProxyStatus:(t,n)=>{e(e=>{let r=new Map(e.proxyStatus);return r.set(t,n),{proxyStatus:r}})},clearProxyStatus:t=>{e(e=>{let n=new Map(e.proxyStatus);n.delete(t);let r=new Map(e.proxyProgress);return r.delete(t),{proxyStatus:n,proxyProgress:r}})},setProxyProgress:(t,n)=>{e(e=>{let r=new Map(e.proxyProgress);return r.set(t,n),{proxyProgress:r}})},setInterpolationStatus:(t,n)=>{e(e=>{let r=new Map(e.interpolationStatus);return r.set(t,n),{interpolationStatus:r}})},clearInterpolationStatus:t=>{e(e=>{let n=new Map(e.interpolationStatus);n.delete(t);let r=new Map(e.interpolationProgress);r.delete(t);let i=new Map(e.interpolationStage);i.delete(t);let a=new Map(e.interpolationEtaSeconds);return a.delete(t),{interpolationStatus:n,interpolationProgress:r,interpolationStage:i,interpolationEtaSeconds:a}})},setInterpolationProgress:(t,n,r,i)=>{e(e=>{let a=new Map(e.interpolationProgress);a.set(t,n);let o=new Map(e.interpolationStage);o.set(t,r);let s=new Map(e.interpolationEtaSeconds);return typeof i==`number`&&s.set(t,i),{interpolationProgress:a,interpolationStage:o,interpolationEtaSeconds:s}})},setUpscaleStatus:(t,n)=>{e(e=>{let r=new Map(e.upscaleStatus);return r.set(t,n),{upscaleStatus:r}})},clearUpscaleStatus:t=>{e(e=>{let n=new Map(e.upscaleStatus);n.delete(t);let r=new Map(e.upscaleProgress);r.delete(t);let i=new Map(e.upscaleStage);i.delete(t);let a=new Map(e.upscaleEtaSeconds);return a.delete(t),{upscaleStatus:n,upscaleProgress:r,upscaleStage:i,upscaleEtaSeconds:a}})},setUpscaleProgress:(t,n,r,i)=>{e(e=>{let a=new Map(e.upscaleProgress);a.set(t,n);let o=new Map(e.upscaleStage);o.set(t,r);let s=new Map(e.upscaleEtaSeconds);return typeof i==`number`&&s.set(t,i),{upscaleProgress:a,upscaleStage:o,upscaleEtaSeconds:s}})},setTranscriptStatus:(t,n)=>{e(e=>{let r=new Map(e.transcriptStatus);return r.set(t,n),{transcriptStatus:r}})},setTranscriptProgress:(t,n)=>{e(e=>{let r=new Map(e.transcriptProgress);return r.set(t,Pa(r.get(t),n)),{transcriptProgress:r}})},clearTranscriptProgress:t=>{e(e=>{let n=new Map(e.transcriptProgress);return n.delete(t),{transcriptProgress:n}})},setTaggingMedia:(t,n)=>{e(e=>{let r=new Set(e.taggingMediaIds);return n?r.add(t):r.delete(t),{taggingMediaIds:r}})},updateMediaCaptions:(t,n)=>{e(e=>({mediaItems:e.mediaItems.map(e=>e.id===t?{...e,aiCaptions:n,updatedAt:Date.now()}:e)}))},beginAnalysisRun:t=>{t<=0||e(e=>{let n=e.analysisProgress;return n?{analysisProgress:{total:n.total+t,completed:n.completed,cancelRequested:n.cancelRequested}}:{analysisProgress:{total:t,completed:0,cancelRequested:!1}}})},incrementAnalysisCompleted:(t=1)=>{e(e=>e.analysisProgress?{analysisProgress:{...e.analysisProgress,completed:Math.min(e.analysisProgress.total,e.analysisProgress.completed+t)}}:e)},requestAnalysisCancel:()=>{e(e=>e.analysisProgress?{analysisProgress:{...e.analysisProgress,cancelRequested:!0}}:e)},endAnalysisRun:()=>{e({analysisProgress:null})}}),{name:`MediaLibraryStore`,enabled:!1}));{let e=Y.getState().mediaItems;Y.subscribe(t=>{t.mediaItems!==e&&(e=t.mediaItems,Y.setState({mediaById:Ia(t.mediaItems)}))}),l.onStatusChange((e,t,n)=>{let r=Y.getState();if(t===`idle`){r.clearProxyStatus(e);return}r.setProxyStatus(e,t),n!==void 0&&r.setProxyProgress(e,n)}),Gi.onStatusChange((e,t,n,r,i)=>{let a=Y.getState();if(t===`idle`||t===`ready`){a.clearInterpolationStatus(e);return}a.setInterpolationStatus(e,t),n!==void 0&&r&&a.setInterpolationProgress(e,n,r,i)}),Gi.onMediaCreated((e,t)=>{let n=Y.getState();n.currentProjectId===t&&n.prependMediaItem(e)}),Qi.onStatusChange((e,t,n,r,i)=>{let a=Y.getState();if(t===`idle`||t===`ready`){a.clearUpscaleStatus(e);return}a.setUpscaleStatus(e,t),n!==void 0&&r&&a.setUpscaleProgress(e,n,r,i)}),Qi.onMediaCreated((e,t)=>{let n=Y.getState();n.currentProjectId===t&&n.prependMediaItem(e)}),l.setMediaResolver(e=>Y.getState().mediaById[e]),l.setFilmstripPrewarm(async(e,t,n,r)=>{let{importFilmstripCache:i}=await import(`./timeline-services-B5BHOjYP.js`).then(e=>e.t),{filmstripCache:a}=await i();await a.prewarmPriorityWindow(e,t,n,r)})}function Va(e,t,n){let r=e.transform,i=n?.width??t.width,a=n?.height??t.height,o=t.width/i,s=t.height/a,c=Math.min(o,s),l=i*c,u=a*c,d=r?.width??l,f=r?.height??u,p=r?.anchorX??d/2,m=r?.anchorY??f/2;return{x:r?.x??0,y:r?.y??0,width:d,height:f,anchorX:p,anchorY:m,rotation:r?.rotation??0,opacity:r?.opacity??1,cornerRadius:r?.cornerRadius??0}}function Ha(e){if(e.type===`video`){let t=e;if(t.sourceWidth&&t.sourceHeight)return{width:t.sourceWidth,height:t.sourceHeight};if(t.mediaId){let e=Y.getState().mediaById[t.mediaId];if(e?.width&&e?.height)return{width:e.width,height:e.height}}}if(e.type===`image`||e.type===`lottie`){let t=e;if(t.sourceWidth&&t.sourceHeight)return{width:t.sourceWidth,height:t.sourceHeight};if(t.mediaId){let e=Y.getState().mediaById[t.mediaId];if(e?.width&&e?.height)return{width:e.width,height:e.height}}}if(e.type===`composition`){let t=e;return t.compositionWidth&&t.compositionHeight?{width:t.compositionWidth,height:t.compositionHeight}:void 0}}const Ua=[{value:`Roboto`,label:`Roboto`,family:`Roboto`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Open Sans`,label:`Open Sans`,family:`Open Sans`,weights:[300,400,500,600,700,800]},{value:`Google Sans`,label:`Google Sans`,family:`Google Sans`,weights:[400,500,600,700]},{value:`Noto Sans JP`,label:`Noto Sans JP`,family:`Noto Sans JP`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Inter`,label:`Inter`,family:`Inter`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Montserrat`,label:`Montserrat`,family:`Montserrat`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Poppins`,label:`Poppins`,family:`Poppins`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Lato`,label:`Lato`,family:`Lato`,weights:[100,300,400,700,900]},{value:`Roboto Condensed`,label:`Roboto Condensed`,family:`Roboto Condensed`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Roboto Mono`,label:`Roboto Mono`,family:`Roboto Mono`,weights:[100,200,300,400,500,600,700]},{value:`Arimo`,label:`Arimo`,family:`Arimo`,weights:[400,500,600,700]},{value:`Oswald`,label:`Oswald`,family:`Oswald`,weights:[200,300,400,500,600,700]},{value:`Noto Sans`,label:`Noto Sans`,family:`Noto Sans`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Raleway`,label:`Raleway`,family:`Raleway`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Nunito`,label:`Nunito`,family:`Nunito`,weights:[200,300,400,500,600,700,800,900,1e3]},{value:`Nunito Sans`,label:`Nunito Sans`,family:`Nunito Sans`,weights:[200,300,400,500,600,700,800,900,1e3]},{value:`Playfair Display`,label:`Playfair Display`,family:`Playfair Display`,weights:[400,500,600,700,800,900]},{value:`Rubik`,label:`Rubik`,family:`Rubik`,weights:[300,400,500,600,700,800,900]},{value:`Ubuntu`,label:`Ubuntu`,family:`Ubuntu`,weights:[300,400,500,700]},{value:`Roboto Slab`,label:`Roboto Slab`,family:`Roboto Slab`,weights:[100,200,300,400,500,600,700,800,900]},{value:`DM Sans`,label:`DM Sans`,family:`DM Sans`,weights:[100,200,300,400,500,600,700,800,900,1e3]},{value:`Merriweather`,label:`Merriweather`,family:`Merriweather`,weights:[300,400,700,900]},{value:`Noto Sans KR`,label:`Noto Sans KR`,family:`Noto Sans KR`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Work Sans`,label:`Work Sans`,family:`Work Sans`,weights:[100,200,300,400,500,600,700,800,900]},{value:`PT Sans`,label:`PT Sans`,family:`PT Sans`,weights:[400,700]},{value:`Kanit`,label:`Kanit`,family:`Kanit`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Lora`,label:`Lora`,family:`Lora`,weights:[400,500,600,700]},{value:`Mulish`,label:`Mulish`,family:`Mulish`,weights:[200,300,400,500,600,700,800,900,1e3]},{value:`Fjalla One`,label:`Fjalla One`,family:`Fjalla One`,weights:[400]},{value:`Manrope`,label:`Manrope`,family:`Manrope`,weights:[200,300,400,500,600,700,800]},{value:`Archivo`,label:`Archivo`,family:`Archivo`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Quicksand`,label:`Quicksand`,family:`Quicksand`,weights:[300,400,500,600,700]},{value:`Outfit`,label:`Outfit`,family:`Outfit`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Figtree`,label:`Figtree`,family:`Figtree`,weights:[300,400,500,600,700,800,900]},{value:`Fira Sans`,label:`Fira Sans`,family:`Fira Sans`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Inconsolata`,label:`Inconsolata`,family:`Inconsolata`,weights:[200,300,400,500,600,700,800,900]},{value:`Barlow`,label:`Barlow`,family:`Barlow`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Bebas Neue`,label:`Bebas Neue`,family:`Bebas Neue`,weights:[400]},{value:`Noto Sans TC`,label:`Noto Sans TC`,family:`Noto Sans TC`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Archivo Black`,label:`Archivo Black`,family:`Archivo Black`,weights:[400]},{value:`Source Sans 3`,label:`Source Sans 3`,family:`Source Sans 3`,weights:[200,300,400,500,600,700,800,900]},{value:`Hind Siliguri`,label:`Hind Siliguri`,family:`Hind Siliguri`,weights:[300,400,500,600,700]},{value:`IBM Plex Sans`,label:`IBM Plex Sans`,family:`IBM Plex Sans`,weights:[100,200,300,400,500,600,700]},{value:`Prompt`,label:`Prompt`,family:`Prompt`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Bungee`,label:`Bungee`,family:`Bungee`,weights:[400]},{value:`Titillium Web`,label:`Titillium Web`,family:`Titillium Web`,weights:[200,300,400,600,700,900]},{value:`Karla`,label:`Karla`,family:`Karla`,weights:[200,300,400,500,600,700,800]},{value:`Heebo`,label:`Heebo`,family:`Heebo`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Saira`,label:`Saira`,family:`Saira`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Noto Serif`,label:`Noto Serif`,family:`Noto Serif`,weights:[100,200,300,400,500,600,700,800,900]},{value:`PT Serif`,label:`PT Serif`,family:`PT Serif`,weights:[400,700]},{value:`Jost`,label:`Jost`,family:`Jost`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Plus Jakarta Sans`,label:`Plus Jakarta Sans`,family:`Plus Jakarta Sans`,weights:[200,300,400,500,600,700,800]},{value:`Bricolage Grotesque`,label:`Bricolage Grotesque`,family:`Bricolage Grotesque`,weights:[200,300,400,500,600,700,800]},{value:`Noto Color Emoji`,label:`Noto Color Emoji`,family:`Noto Color Emoji`,weights:[400]},{value:`Share Tech`,label:`Share Tech`,family:`Share Tech`,weights:[400]},{value:`Smooch Sans`,label:`Smooch Sans`,family:`Smooch Sans`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Source Code Pro`,label:`Source Code Pro`,family:`Source Code Pro`,weights:[200,300,400,500,600,700,800,900]},{value:`Libre Baskerville`,label:`Libre Baskerville`,family:`Libre Baskerville`,weights:[400,700]},{value:`Dancing Script`,label:`Dancing Script`,family:`Dancing Script`,weights:[400,500,600,700]},{value:`Lobster Two`,label:`Lobster Two`,family:`Lobster Two`,weights:[400,700]},{value:`EB Garamond`,label:`EB Garamond`,family:`EB Garamond`,weights:[400,500,600,700,800]},{value:`Josefin Sans`,label:`Josefin Sans`,family:`Josefin Sans`,weights:[100,200,300,400,500,600,700]},{value:`Cairo`,label:`Cairo`,family:`Cairo`,weights:[200,300,400,500,600,700,800,900,1e3]},{value:`Libre Franklin`,label:`Libre Franklin`,family:`Libre Franklin`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Gravitas One`,label:`Gravitas One`,family:`Gravitas One`,weights:[400]},{value:`Noto Serif JP`,label:`Noto Serif JP`,family:`Noto Serif JP`,weights:[200,300,400,500,600,700,800,900]},{value:`Public Sans`,label:`Public Sans`,family:`Public Sans`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Anton`,label:`Anton`,family:`Anton`,weights:[400]},{value:`Mukta`,label:`Mukta`,family:`Mukta`,weights:[200,300,400,500,600,700,800]},{value:`Schibsted Grotesk`,label:`Schibsted Grotesk`,family:`Schibsted Grotesk`,weights:[400,500,600,700,800,900]},{value:`Dosis`,label:`Dosis`,family:`Dosis`,weights:[200,300,400,500,600,700,800]},{value:`Barlow Condensed`,label:`Barlow Condensed`,family:`Barlow Condensed`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Bitter`,label:`Bitter`,family:`Bitter`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Roboto Flex`,label:`Roboto Flex`,family:`Roboto Flex`,weights:[100,200,300,400,500,600,700,800,900,1e3]},{value:`Cabin`,label:`Cabin`,family:`Cabin`,weights:[400,500,600,700]},{value:`Noto Sans SC`,label:`Noto Sans SC`,family:`Noto Sans SC`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Ramabhadra`,label:`Ramabhadra`,family:`Ramabhadra`,weights:[400]},{value:`Noto Sans Telugu`,label:`Noto Sans Telugu`,family:`Noto Sans Telugu`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Nanum Gothic`,label:`Nanum Gothic`,family:`Nanum Gothic`,weights:[400,700,800]},{value:`Space Grotesk`,label:`Space Grotesk`,family:`Space Grotesk`,weights:[300,400,500,600,700]},{value:`Changa One`,label:`Changa One`,family:`Changa One`,weights:[400]},{value:`Anek Telugu`,label:`Anek Telugu`,family:`Anek Telugu`,weights:[100,200,300,400,500,600,700,800]},{value:`Assistant`,label:`Assistant`,family:`Assistant`,weights:[200,300,400,500,600,700,800]},{value:`Oxygen`,label:`Oxygen`,family:`Oxygen`,weights:[300,400,700]},{value:`Pacifico`,label:`Pacifico`,family:`Pacifico`,weights:[400]},{value:`Alfa Slab One`,label:`Alfa Slab One`,family:`Alfa Slab One`,weights:[400]},{value:`Lexend`,label:`Lexend`,family:`Lexend`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Hind`,label:`Hind`,family:`Hind`,weights:[300,400,500,600,700]},{value:`M PLUS Rounded 1c`,label:`M PLUS Rounded 1c`,family:`M PLUS Rounded 1c`,weights:[100,300,400,500,700,800,900]},{value:`Red Hat Display`,label:`Red Hat Display`,family:`Red Hat Display`,weights:[300,400,500,600,700,800,900]},{value:`Exo 2`,label:`Exo 2`,family:`Exo 2`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Slabo 27px`,label:`Slabo 27px`,family:`Slabo 27px`,weights:[400]},{value:`Lobster`,label:`Lobster`,family:`Lobster`,weights:[400]},{value:`Cormorant Garamond`,label:`Cormorant Garamond`,family:`Cormorant Garamond`,weights:[300,400,500,600,700]},{value:`Sora`,label:`Sora`,family:`Sora`,weights:[100,200,300,400,500,600,700,800]},{value:`Crimson Text`,label:`Crimson Text`,family:`Crimson Text`,weights:[400,600,700]},{value:`Inter Tight`,label:`Inter Tight`,family:`Inter Tight`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Overpass`,label:`Overpass`,family:`Overpass`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Caveat`,label:`Caveat`,family:`Caveat`,weights:[400,500,600,700]},{value:`Urbanist`,label:`Urbanist`,family:`Urbanist`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Comfortaa`,label:`Comfortaa`,family:`Comfortaa`,weights:[300,400,500,600,700]},{value:`Tajawal`,label:`Tajawal`,family:`Tajawal`,weights:[200,300,400,500,700,800,900]},{value:`Arvo`,label:`Arvo`,family:`Arvo`,weights:[400,700]},{value:`PT Sans Narrow`,label:`PT Sans Narrow`,family:`PT Sans Narrow`,weights:[400,700]},{value:`Rajdhani`,label:`Rajdhani`,family:`Rajdhani`,weights:[300,400,500,600,700]},{value:`DM Serif Display`,label:`DM Serif Display`,family:`DM Serif Display`,weights:[400]},{value:`Abel`,label:`Abel`,family:`Abel`,weights:[400]},{value:`Teko`,label:`Teko`,family:`Teko`,weights:[300,400,500,600,700]},{value:`Source Serif 4`,label:`Source Serif 4`,family:`Source Serif 4`,weights:[200,300,400,500,600,700,800,900]},{value:`Noto Sans Arabic`,label:`Noto Sans Arabic`,family:`Noto Sans Arabic`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Almarai`,label:`Almarai`,family:`Almarai`,weights:[300,400,700,800]},{value:`Merriweather Sans`,label:`Merriweather Sans`,family:`Merriweather Sans`,weights:[300,400,500,600,700,800]},{value:`Lexend Deca`,label:`Lexend Deca`,family:`Lexend Deca`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Satisfy`,label:`Satisfy`,family:`Satisfy`,weights:[400]},{value:`Orbitron`,label:`Orbitron`,family:`Orbitron`,weights:[400,500,600,700,800,900]},{value:`Barlow Semi Condensed`,label:`Barlow Semi Condensed`,family:`Barlow Semi Condensed`,weights:[100,200,300,400,500,600,700,800,900]},{value:`Domine`,label:`Domine`,family:`Domine`,weights:[400,500,600,700]},{value:`Shadows Into Light`,label:`Shadows Into Light`,family:`Shadows Into Light`,weights:[400]},{value:`M PLUS 1p`,label:`M PLUS 1p`,family:`M PLUS 1p`,weights:[100,300,400,500,700,800,900]}];n(`FontLoader`);const Wa={normal:400,medium:500,semibold:600,bold:700},Ga=/* @__PURE__ */ new Map;function Ka(e){let t=[...new Set(e)].filter(e=>Number.isFinite(e)&&e>0).sort((e,t)=>e-t);return t.length>0?t:[400]}function qa(e,t){return{family:e,weights:Ka(t),display:`swap`}}function Ja(e,t=e,n=[400]){if(typeof t==`string`){Ga.set(e,qa(t,n));return}Ga.set(e,qa(e,t))}function Ya(e){for(let t of e)Ja(t.value,t.family,t.weights)}Ya(Ua);const X={fontSize:60,fontFamily:`Inter`,fontWeight:`normal`,fontStyle:`normal`,lineHeight:1.2,letterSpacing:0,textAlign:`center`,verticalAlign:`middle`,textPadding:16,color:`#ffffff`,underline:!1};function Xa(e,t,n,r){return`${e} ${t} ${n}px "${r}", sans-serif`}function Za(e){return{lineHeight:e.lineHeight??X.lineHeight,letterSpacing:e.letterSpacing??X.letterSpacing,textAlign:e.textAlign??X.textAlign,verticalAlign:e.verticalAlign??X.verticalAlign,textPadding:Math.max(0,e.textPadding??X.textPadding),color:e.color??X.color,backgroundColor:e.backgroundColor,backgroundRadius:Math.max(0,e.backgroundRadius??0),textShadow:e.textShadow,stroke:e.stroke}}function Qa(e){let t=e.fontSize??X.fontSize,n=e.fontFamily??X.fontFamily,r=e.fontStyle??X.fontStyle,i=e.fontWeight??X.fontWeight,a=e.letterSpacing??X.letterSpacing,o=e.color??X.color,s=e.underline??X.underline;return pi(e).map(e=>{let c=e.fontSize??t,l=e.fontFamily??n,u=e.fontStyle??r,d=e.fontWeight??i,f=Wa[d]??400;return{text:e.text??``,fontSize:c,fontFamily:l,fontStyle:u,fontWeightName:d,fontWeight:f,letterSpacing:e.letterSpacing??a,color:e.color??o,underline:e.underline??s,cssFont:Xa(u,f,c,l)}})}function $a(e,t,n,r,i){let a=[],o=``;for(let s of e){let e=o+s;i.measure(e,t,n)>r&&o?(a.push(o),o=s):o=e}return o&&a.push(o),a}function eo(e,t,n,r,i){let a=[];for(let o of e.split(`
`)){if(o===``){a.push(``);continue}let e=``;for(let s of o.split(` `)){let o=e?`${e} ${s}`:s;if(i.measure(o,t,n)>r&&e){if(a.push(e),e=s,i.measure(s,t,n)>r){let o=$a(s,t,n,r,i);for(let e=0;e<o.length-1;e++)a.push(o[e]??``);e=o[o.length-1]??``}}else e=o}e&&a.push(e)}return a.length>0?a:[``]}function to(e){let t=[[]],n=null,r=``,i=[],a=()=>{let e={text:``,charStyles:[],leading:r,leadingStyles:i};return r=``,i=[],e},o=()=>{n&&t[t.length-1].push(n),n=null},s=()=>{r.length>0&&t[t.length-1].push(a())};for(let c=0;c<e.length;c++)for(let l of e[c].text)l===`
`?(o(),s(),t.push([])):l===` `?(o(),r+=l,i.push(c)):(n||=a(),n.text+=l,n.charStyles.push(c));return o(),s(),t}function no(e,t,n,r){let i=[],a=0;for(let o=1;o<=e.length;o++){if(o!==e.length&&t[o]===t[a])continue;let s=n[t[a]??0]??n[0],c=a===0?0:r(e.slice(0,a));i.push({text:e.slice(a,o),color:s.color,underline:s.underline,offsetX:c,width:r(e.slice(0,o))-c}),a=o}return i}function ro(e,t,n,r){let i=e[0],a=r.fontMetrics(i.cssFont),o=i.fontSize*t,s=(o-(a.ascent+a.descent))/2+a.ascent,c=to(e),l=e=>r.measure(e,i.cssFont,i.letterSpacing),u=[],d=(t,n=!1)=>{let r=``,a=[];for(let[e,i]of t.entries())(e>0||!n)&&(r+=i.leading,a.push(...i.leadingStyles)),r+=i.text,a.push(...i.charStyles);let c=no(r,a,e,l);u.push({text:r,cssFont:i.cssFont,fontSize:i.fontSize,color:i.color,letterSpacing:i.letterSpacing,underline:!1,width:l(r),top:0,baselineY:s,startX:0,lineHeightPx:o,runs:c})};for(let e of c){if(e.length===0){d([]);continue}let t=[],r=``,i=!1;for(let a of e){let e=t.length>0||!i?a.leading:``,o=r+e+a.text;l(o)>n&&t.length>0?(d(t,i),i=!0,t=[a],r=a.text):(t.push(a),r=o)}t.length>0&&d(t,i)}return u}function io(e,t,n,r){let i=Za(e),a=Qa(e),o=i.textPadding,s=Math.max(1,t-o*2),c=n-o*2,l=e.spanLayout===`inline`&&a.length>0,u=l?ro(a,i.lineHeight,s,r):[];if(!l)for(let e of a){let t=r.fontMetrics(e.cssFont),n=e.fontSize*i.lineHeight,a=(n-(t.ascent+t.descent))/2+t.ascent;for(let t of eo(e.text,e.cssFont,e.letterSpacing,s,r))u.push({text:t,cssFont:e.cssFont,fontSize:e.fontSize,color:e.color,letterSpacing:e.letterSpacing,underline:e.underline,width:r.measure(t,e.cssFont,e.letterSpacing),top:0,baselineY:a,startX:0,lineHeightPx:n})}let d=u.reduce((e,t)=>e+t.lineHeightPx,0),f=i.verticalAlign===`top`?o:i.verticalAlign===`bottom`?n-o-d:o+(c-d)/2,p=f;for(let e of u)e.top=p,e.baselineY=p+e.baselineY,e.startX=i.textAlign===`left`?o:i.textAlign===`right`?t-o-e.width:(t-e.width)/2,p+=e.lineHeightPx;let m;if(i.backgroundColor&&u.length>0){let e=Math.max(...u.map(e=>e.width)),n=i.textAlign===`left`?o+e/2:i.textAlign===`right`?t-o-e/2:t/2,r=Math.min(t,e+o*2),a=d+o*2;m={x:n-r/2,y:f-o,width:r,height:a,radius:Math.max(0,Math.min(i.backgroundRadius,r/2,a/2))}}return{lines:u,totalHeight:d,background:m}}function ao(e){return Math.max(0,e.width-e.letterSpacing)}function oo(e){let t=/(\d+(?:\.\d+)?)px/.exec(e);return t?parseFloat(t[1]):16}function so(e,t){`letterSpacing`in e&&(e.letterSpacing=`${t}px`)}function co(e,t){return`fontKerning`in e&&(e.fontKerning=`normal`),{measure(n,r,i){return e.font!==r&&(e.font=r),so(e,i),t?t(n,i):e.measureText(n).width},fontMetrics(t){e.font!==t&&(e.font=t);let n=oo(t),r=e.measureText(`Hg`);return{ascent:r.fontBoundingBoxAscent||n*.8,descent:r.fontBoundingBoxDescent||n*.2}}}}let Z;function lo(){return Z!==void 0||typeof OffscreenCanvas<`u`&&(Z=new OffscreenCanvas(1,1).getContext(`2d`),Z)?Z:typeof document<`u`?(Z=document.createElement(`canvas`).getContext(`2d`),Z):(Z=null,Z)}function uo(){let e=lo();return e?co(e):{measure:(e,t,n)=>{let r=oo(t);return e.length*r*.6+e.length*n},fontMetrics:e=>{let t=oo(e);return{ascent:t*.8,descent:t*.2}}}}function fo(e,t){if(!t)return e;let n=Object.prototype.hasOwnProperty.call(t,`stroke`),r=Object.prototype.hasOwnProperty.call(t,`textShadow`);return{...e,text:t.text??e.text,textSpans:t.textSpans??e.textSpans,fontSize:t.fontSize??e.fontSize,letterSpacing:t.letterSpacing??e.letterSpacing,lineHeight:t.lineHeight??e.lineHeight,textPadding:t.textPadding??e.textPadding,backgroundRadius:t.backgroundRadius??e.backgroundRadius,stroke:n?t.stroke:e.stroke,textShadow:r?t.textShadow:e.textShadow}}function po(e,t,n){let r=fo(e,n),i=Za(r),a=io(r,t,0,uo()),o=(i.stroke?.width??0)*2,s=i.textShadow?Math.abs(i.textShadow.offsetY)+i.textShadow.blur:0;return a.totalHeight+i.textPadding*2+o+s*2}function mo(e,t,n){let r=po(e,t.width,n);return r<=t.height+.5?t:{...t,height:r}}const ho=[`trimPathStart`,`trimPathEnd`,`trimPathOffset`,`taperStartWidth`,`taperEndWidth`,`taperStartLength`,`taperEndLength`],go={trimPathStart:0,trimPathEnd:100,trimPathOffset:0,taperStartWidth:100,taperEndWidth:100,taperStartLength:0,taperEndLength:0};function _o(e,t){return e[t]??go[t]}function vo(e){return Math.max(0,Math.min(100,e))/100}function yo(e,t,n){return n?Ye(e,n):Je(e,t)}function bo(e,t){return Math.hypot(t.x-e.x,t.y-e.y)}function xo(e,t){return{influence:vo(e?.influence??33.333333333333336),speed:Math.max(0,e?.speed??t)}}function So(e,t,n,r){let i=e.temporalEase?.out,a=t.temporalEase?.in;if(!i&&!a)return yo(n,e.easing,e.easingConfig);let o=(t.frame-e.frame)/Math.max(1,r),s=bo(e.value,t.value);if(o<=0||s<=2**-52)return yo(n,e.easing,e.easingConfig);let c=s/o,l=xo(i,c),u=xo(a,c);return We(n,{x1:l.influence,y1:l.influence*(l.speed/c),x2:1-u.influence,y2:1-u.influence*(u.speed/c)})}function Co(e,t,n){return{x:e.x+(t.x-e.x)*n,y:e.y+(t.y-e.y)*n}}function wo(e,t,n,r,i){let a=1-i,o=a*a*a,s=3*a*a*i,c=3*a*i*i,l=i*i*i;return{x:o*e.x+s*t.x+c*n.x+l*r.x,y:o*e.y+s*t.y+c*n.y+l*r.y}}function To(e,t,n){return e===`position`&&!!(t.spatial||n.spatial)}function Eo(e,t,n){let r=e.spatial?.outTangent??{x:0,y:0},i=t.spatial?.inTangent??{x:0,y:0};return wo(e.value,{x:e.value.x+r.x,y:e.value.y+r.y},{x:t.value.x+i.x,y:t.value.y+i.y},t.value,n)}function Do(e,t,n,r,i){let a=n.frame-t.frame;if(a<=0||t.easing===`hold`)return t.value;let o=So(t,n,(r-t.frame)/a,i);return To(e,t,n)?Eo(t,n,o):Co(t.value,n.value,o)}function Oo(e,t,n,r,i=30){if(t.length===0)return r;let a=t[0];if(t.length===1||n<=a.frame)return a.value;let o=t[t.length-1];if(n>=o.frame)return o.value;for(let r=0;r<t.length-1;r++){let a=t[r],o=t[r+1];if(a.frame<=n&&o.frame>n)return Do(e,a,o,n,i)}return r}function ko(e,t){return e?.vectorProperties?.find(e=>e.property===t)?.keyframes??[]}function Q(e){return typeof e!=`number`}function Ao(e,t){return Q(e)?{x:t(e.x),y:t(e.y)}:t(e)}function $(e,t,n){if(Q(e)&&Q(t))return{x:n(e.x,t.x),y:n(e.y,t.y)};if(Q(e)){let r=t;return{x:n(e.x,r),y:n(e.y,r)}}if(Q(t)){let r=e;return{x:n(r,t.x),y:n(r,t.y)}}return n(e,t)}function jo(e){if((Q(e)?[e.x,e.y]:[e]).some(e=>!Number.isFinite(e)))throw Error(`Expression produced a non-finite value`);return e}function Mo(e,t){let n=t,r=0;for(;n<e.length&&/[0-9.]/.test(e[n]);)e[n]===`.`&&(r+=1),n+=1;let i=e.slice(t,n);if(r>1||i===`.`||!Number.isFinite(Number(i)))throw Error(`Invalid number at ${t+1}`);return{token:{type:`number`,value:i,position:t},nextIndex:n}}function No(e,t){let n=t+1;for(;n<e.length&&/[A-Za-z0-9_]/.test(e[n]);)n+=1;return{token:{type:`identifier`,value:e.slice(t,n),position:t},nextIndex:n}}function Po(e,t){let n=e[t],r=t+1,i=``;for(;r<e.length&&e[r]!==n;){if(e[r]===`\\`&&(r+=1),r>=e.length)throw Error(`Unterminated string at ${t+1}`);i+=e[r],r+=1}if(e[r]!==n)throw Error(`Unterminated string at ${t+1}`);return{token:{type:`string`,value:i,position:t},nextIndex:r+1}}function Fo(e,t){let n=e[t];if(/[0-9.]/.test(n))return Mo(e,t);if(/[A-Za-z_]/.test(n))return No(e,t);if(n===`"`||n===`'`)return Po(e,t);if(`+-*/(),[]`.includes(n))return{token:{type:`punctuation`,value:n,position:t},nextIndex:t+1};throw Error(`Unexpected character "${n}" at ${t+1}`)}function Io(e){if(e.length>2048)throw Error(`Expression is too long`);let t=[],n=0;for(;n<e.length;){if(/\s/.test(e[n])){n+=1;continue}let r=Fo(e,n);if(t.push(r.token),n=r.nextIndex,t.length>512)throw Error(`Expression has too many tokens`)}return t.push({type:`eof`,value:``,position:e.length}),t}function Lo(e,t){if(t.length!==1)throw Error(`${e} expects 1 argument`);let n={abs:Math.abs,sin:Math.sin,cos:Math.cos};return Ao(t[0],n[e])}function Ro(e,t){if(t.length<2)throw Error(`${e} expects at least 2 arguments`);let n=e===`min`?Math.min:Math.max;return t.slice(1).reduce((e,t)=>$(e,t,n),t[0])}function zo(e){if(e.length!==3)throw Error(`clamp expects 3 arguments`);return $($(e[0],e[1],Math.max),e[2],Math.min)}function Bo(e,t){if(e.length!==3)throw Error(`lerp expects 3 arguments`);let n=t(e[2],`lerp amount`);return $(e[0],e[1],(e,t)=>e+(t-e)*n)}const Vo={abs:e=>Lo(`abs`,e),sin:e=>Lo(`sin`,e),cos:e=>Lo(`cos`,e),min:e=>Ro(`min`,e),max:e=>Ro(`max`,e),clamp:zo,lerp:Bo};function Ho(e,t,n){let r=Vo[e];if(r)return r(t,n);throw Error(`Unknown function "${e}"`)}var Uo=class{tokens;context;index=0;depth=0;constructor(e,t){this.tokens=e,this.context=t}parse(){let e=this.parseAdditive();if(this.current().type!==`eof`)throw Error(`Unexpected token at ${this.current().position+1}`);return jo(e)}current(){return this.tokens[this.index]}consume(e){let t=this.current();if(e!==void 0&&t.value!==e)throw Error(`Expected "${e}" at ${t.position+1}`);return this.index+=1,t}withDepth(e){if(this.depth+=1,this.depth>64)throw Error(`Expression is too deeply nested`);try{return e()}finally{--this.depth}}parseAdditive(){let e=this.parseMultiplicative();for(;this.current().value===`+`||this.current().value===`-`;){let t=this.consume().value,n=this.parseMultiplicative();e=$(e,n,t===`+`?(e,t)=>e+t:(e,t)=>e-t)}return e}parseMultiplicative(){let e=this.parseUnary();for(;this.current().value===`*`||this.current().value===`/`;){let t=this.consume().value,n=this.parseUnary();if(t===`/`&&(Q(n)?n.x===0||n.y===0:n===0))throw Error(`Division by zero`);e=$(e,n,t===`*`?(e,t)=>e*t:(e,t)=>e/t)}return e}parseUnary(){return this.current().value===`+`?(this.consume(`+`),this.parseUnary()):this.current().value===`-`?(this.consume(`-`),Ao(this.parseUnary(),e=>-e)):this.parsePrimary()}parsePrimary(){return this.withDepth(()=>this.parsePrimaryValue())}parsePrimaryValue(){let e=this.current();if(e.type===`number`)return Number(this.consume().value);if(e.value===`(`)return this.parseGroupedValue();if(e.value===`[`)return this.parseVectorValue();if(e.type===`identifier`)return this.parseIdentifierValue();throw Error(`Expected a value at ${e.position+1}`)}parseGroupedValue(){this.consume(`(`);let e=this.parseAdditive();return this.consume(`)`),e}parseVectorValue(){this.consume(`[`);let e=this.requireScalar(this.parseAdditive(),`Vector X`);this.consume(`,`);let t=this.requireScalar(this.parseAdditive(),`Vector Y`);return this.consume(`]`),{x:e,y:t}}parseIdentifierValue(){let e=this.consume().value;if(e===`value`||e===`preValue`)return this.context.preValue;if(e===`frame`)return this.context.globalFrame;if(e===`time`)return this.context.globalFrame/Math.max(1,this.context.fps);if(this.current().value!==`(`)throw Error(`Unknown identifier "${e}"`);return this.parseCall(e)}parseCall(e){if(this.consume(`(`),e===`prop`)return this.parsePropertyReference();let t=this.parseCallArguments();return this.consume(`)`),Ho(e,t,(e,t)=>this.requireScalar(e,t))}parseCallArguments(){let e=[];if(this.current().value===`)`)return e;for(;;){if(e.push(this.parseAdditive()),this.current().value!==`,`)return e;this.consume(`,`)}}parsePropertyReference(){let e=this.consumeString(`Layer ID`);this.consume(`,`);let t=this.consumeString(`Property`);if(this.consume(`)`),!Ee(t))throw Error(`Unknown property "${t}"`);let n=this.context.resolveProperty(e,t);if(n===null)throw Error(`Property reference is unavailable`);return n}consumeString(e){let t=this.current();if(t.type!==`string`)throw Error(`${e} must be a quoted string`);return this.consume(),t.value}requireScalar(e,t){if(Q(e))throw Error(`${t} must be a scalar`);return e}};function Wo(e,t){return be(e)===Q(t)}function Go(e,t){try{return{value:new Uo(Io(e),t).parse()}}catch(e){return{value:t.preValue,error:e instanceof Error?e.message:`Expression failed`}}}const Ko=[`x`,`y`,`width`,`height`,`anchorX`,`anchorY`,`rotation`,`opacity`,`cornerRadius`];function qo(e,t,n){let r;if(Se(t))return fs(Va(e,n.canvas,Ha(e)),n.getKeyframes(e.id),n.globalFrame-e.from)[t];if(we(t)&&e.type===`shape`)r=_o(e,t);else return null;return S(C(n.getKeyframes(e.id),t),n.globalFrame-e.from,r)}function Jo(e,t,n,r,i={cache:/* @__PURE__ */ new Map,vectorCache:/* @__PURE__ */ new Map,expressionCache:/* @__PURE__ */ new Map,active:/* @__PURE__ */ new Set}){let a=`${e}:${t}`,o=`${a}@${r.globalFrame}`,s=i.cache.get(o);if(s!==void 0)return s;if(i.active.has(a))return n;let c=De(r.getKeyframes(e)).find(e=>e.targetProperty===t&&e.enabled);if(!c)return i.cache.set(o,n),n;let l=r.getItem(c.sourceItemId);if(!l)return i.cache.set(o,n),n;i.active.add(a);let u=c.timeOffsetFrames===0?r:{...r,globalFrame:r.globalFrame-c.timeOffsetFrames,getPreviewTransform:void 0};if(be(c.sourceProperty))return i.active.delete(a),i.cache.set(o,n),n;let d=qo(l,c.sourceProperty,u);if(d===null)return i.active.delete(a),i.cache.set(o,n),n;let f=Jo(l.id,c.sourceProperty,d,u,i),p=Xo(l.id,c.sourceProperty,f,u);return i.active.delete(a),i.cache.set(o,p),p}function Yo(e,t,n){let r=Va(e,n.canvas,Ha(e)),i=fs(r,n.getKeyframes(e.id),n.globalFrame-e.from);return t===`position`?{x:i.x,y:i.y}:t===`anchor`?{x:i.anchorX,y:i.anchorY}:{x:r.width===0?100:i.width/r.width*100,y:r.height===0?100:i.height/r.height*100}}function Xo(e,t,n,r){if(!Se(t))return n;let i=r.getPreviewTransform?.(e)?.[t];return typeof i==`number`?i:n}function Zo(e,t,n,r){let i=r.getPreviewTransform?.(e.id);return i?t===`position`?Qo(i,n):t===`anchor`?$o(i,n):es(e,i,n,r.canvas):n}function Qo(e,t){return{x:e.x??t.x,y:e.y??t.y}}function $o(e,t){return{x:e.anchorX??t.x,y:e.anchorY??t.y}}function es(e,t,n,r){let i=Va(e,r,Ha(e));return{x:ts(t.width,n.x,i.width),y:ts(t.height,n.y,i.height)}}function ts(e,t,n){return e===void 0||n===0?t:e/n*100}function ns(e,t,n,r,i){let a=`${e}:${t}`,o=`${a}@${r.globalFrame}`,s=i.vectorCache.get(o);if(s)return s;if(i.active.has(a))return n;let c=De(r.getKeyframes(e)).find(e=>e.targetProperty===t&&e.enabled);if(!c||!be(c.sourceProperty))return i.vectorCache.set(o,n),n;let l=r.getItem(c.sourceItemId);if(!l)return i.vectorCache.set(o,n),n;i.active.add(a);let u=c.timeOffsetFrames===0?r:{...r,globalFrame:r.globalFrame-c.timeOffsetFrames,getPreviewTransform:void 0},d=Yo(l,c.sourceProperty,u),f=ns(l.id,c.sourceProperty,d,u,i),p=Zo(l,c.sourceProperty,f,u);return i.active.delete(a),i.vectorCache.set(o,p),p}function rs(e,t,n,r){let i=n.getItem(e);if(!i)return null;if(be(t)){let e=Yo(i,t,n),a=ns(i.id,t,e,n,r);return is(i.id,t,a,n,r).value}let a=qo(i,t,n);if(a===null)return null;let o=Jo(i.id,t,a,n,r);return is(i.id,t,o,n,r).value}function is(e,t,n,r,i={cache:/* @__PURE__ */ new Map,vectorCache:/* @__PURE__ */ new Map,expressionCache:/* @__PURE__ */ new Map,active:/* @__PURE__ */ new Set}){let a=Oe(r.getKeyframes(e)).find(e=>e.targetProperty===t&&e.enabled);if(!a)return{value:n};let o=`expression:${e}:${t}`,s=`${o}@${r.globalFrame}`,c=i.expressionCache.get(s);if(c!==void 0)return{value:c};if(i.active.has(o))return{value:n,error:`Expression dependency cycle`};i.active.add(o);let l=Go(a.source,{preValue:n,globalFrame:r.globalFrame,fps:r.canvas.fps,resolveProperty:(e,t)=>rs(e,t,r,i)});return i.active.delete(o),l.error||!Wo(t,l.value)?{value:n,error:l.error??`Expression result has the wrong value type`}:(i.expressionCache.set(s,l.value),l)}function as(e,t,n,r){let i={...e},a=ko(t,`position`),o=ko(t,`scale`),s=ko(t,`anchor`);if(a.length>0){let t=Oo(`position`,a,n,{x:e.x,y:e.y},r);i.x=t.x,i.y=t.y}if(o.length>0){let t=Oo(`scale`,o,n,{x:100,y:100},r);i.width=e.width*(t.x/100),i.height=e.height*(t.y/100)}if(s.length>0){let t=Oo(`anchor`,s,n,{x:e.anchorX,y:e.anchorY},r);i.anchorX=t.x,i.anchorY=t.y}return{result:i,hasPosition:a.length>0,hasScale:o.length>0,hasAnchor:s.length>0}}function os(e,t){return t.hasPosition&&(e===`x`||e===`y`)||t.hasScale&&(e===`width`||e===`height`)?!0:t.hasAnchor&&(e===`anchorX`||e===`anchorY`)}function ss(e,t,n){return e===`position`?{x:n.result.x,y:n.result.y}:e===`anchor`?{x:n.result.anchorX,y:n.result.anchorY}:{x:t.width===0?100:n.result.width/t.width*100,y:t.height===0?100:n.result.height/t.height*100}}function cs(e,t,n,r){if(e===`position`){r.result.x=t.x,r.result.y=t.y,r.hasPosition=!0;return}if(e===`anchor`){r.result.anchorX=t.x,r.result.anchorY=t.y,r.hasAnchor=!0;return}r.result.width=n.width*(t.x/100),r.result.height=n.height*(t.y/100),r.hasScale=!0}function ls(e){let{baseResolved:t,itemKeyframes:n,vectorAnimation:r,context:i,state:a}=e;for(let e of[`position`,`scale`,`anchor`]){if(!De(n).some(t=>t.targetProperty===e&&t.enabled))continue;let o=ss(e,t,r);cs(e,ns(n.itemId,e,o,i,a),t,r)}}function us(e){let{baseResolved:t,itemKeyframes:n,vectorAnimation:r,context:i,state:a}=e;for(let e of[`position`,`scale`,`anchor`]){if(!Oe(n).some(t=>t.targetProperty===e&&t.enabled))continue;let o=ss(e,t,r),s=is(n.itemId,e,o,i,a).value;typeof s!=`number`&&cs(e,s,t,r)}}function ds(e){let{property:t,baseResolved:n,vectorAnimation:r,itemKeyframes:i,frame:a,expressionContext:o,expressionState:s}=e,c=C(i,t),l=os(t,r),u=l?r.result[t]:n[t],d=l?u:S(c,a,u);if(o){let e=Jo(i.itemId,t,d,o,s),n=is(i.itemId,t,e,o,s).value;return typeof n==`number`?n:e}return c.length>0?d:r.result[t]}function fs(e,t,n,r){if(!t)return e;let i=as(e,t,n,r?.canvas.fps),a={cache:/* @__PURE__ */ new Map,vectorCache:/* @__PURE__ */ new Map,expressionCache:/* @__PURE__ */ new Map,active:/* @__PURE__ */ new Set};r&&(ls({baseResolved:e,itemKeyframes:t,vectorAnimation:i,context:r,state:a}),us({baseResolved:e,itemKeyframes:t,vectorAnimation:i,context:r,state:a}));for(let o of Ko)i.result[o]=ds({property:o,baseResolved:e,vectorAnimation:i,itemKeyframes:t,frame:n,expressionContext:r,expressionState:a});return i.result}function ps(e){return e?e.properties.some(e=>e.keyframes.length>0)||(e.vectorProperties?.some(e=>e.keyframes.length>0)??!1)||De(e).some(e=>e.enabled)||(e.expressions?.some(e=>e.type===`expression`&&e.enabled)??!1):!1}const ms=[`positionX`,`positionY`,`inX`,`inY`,`outX`,`outY`];function hs(e,t){switch(t){case`positionX`:return e.position[0];case`positionY`:return e.position[1];case`inX`:return e.inHandle[0];case`inY`:return e.inHandle[1];case`outX`:return e.outHandle[0];case`outY`:return e.outHandle[1]}}function gs(e,t,n){switch(t){case`positionX`:e.position[0]=n;return;case`positionY`:e.position[1]=n;return;case`inX`:e.inHandle[0]=n;return;case`inY`:e.inHandle[1]=n;return;case`outX`:e.outHandle[0]=n;return;case`outY`:e.outHandle[1]=n}}function _s(e){return e?e.flatMap((e,t)=>ms.map(e=>Pe(t,e))):[]}function vs(e,t){let n=Fe(t),r=n?e?.[n.vertexIndex]:void 0;return n&&r?hs(r,n.component):0}function ys(e,t,n){let r=Fe(t),i=r?e[r.vertexIndex]:void 0;return!r||!i?!1:(gs(i,r.component,n),!0)}function bs(e){return e.map(e=>({...e,position:[...e.position],inHandle:[...e.inHandle],outHandle:[...e.outHandle]}))}function xs(e,t,n){if(e.shapeType!==`path`||!e.pathVertices)return;let r=bs(e.pathVertices),i=!1;for(let a of _s(e.pathVertices)){let o=C(t,a);o.length!==0&&(ys(r,a,S(o,n,vs(e.pathVertices,a))),i=!0)}return i?r:void 0}function Ss(e,t,n,r){if(!t)return e;let i={...e};for(let a of ho){let o=C(t,a),s=S(o,n,_o(e,a));if(r){let t=Jo(e.id,a,s,r),n=is(e.id,a,t,r).value;i[a]=typeof n==`number`?n:t}else o.length>0&&(i[a]=s)}let a=xs(e,t,n);return a&&(i.pathVertices=a),i}const Cs=/* @__PURE__ */ new Map;function ws(e,t){if(e.length===0||e[0]>t)return null;let n=0,r=e.length-1;for(;n<r;){let i=n+r+1>>>1;e[i]<=t?n=i:r=i-1}return e[n]}const Ts=/* @__PURE__ */ new Map;function Es(e,t){Ts.set(e,t)}function Ds(e,t,n=.05){let r=Ts.get(e);if(!r||r.length===0)return null;let i=ws(r,t);return i===null?null:Math.max(0,i-n)}const Os=n(`MediaResolver`);async function ks(e){let t=p.get(e);if(t)return t;if(Cs.has(e))return Cs.get(e);let n=(async()=>{let{mediaLibraryService:t,FileAccessError:n}=await import(`./media-library-service-BBDnvzgZ.js`);try{let n=await t.getMedia(e);if(!n)return Os.warn(`Media not found: ${e}`),``;let r=await t.getMediaFile(n);if(!r)return Os.warn(`Media blob not found: ${e}`),Y.getState().markMediaBroken(e,{mediaId:e,fileName:n.fileName??`Unknown file`,errorType:`file_missing`}),``;let i=p.acquire(e,r,{mediaId:e,storageType:n.storageType,fileHandle:n.storageType===`handle`?n.fileHandle:void 0,opfsPath:n.storageType===`opfs`?n.opfsPath:void 0,fileSize:n.fileSize});return n.keyframeTimestamps&&n.keyframeTimestamps.length>0&&Es(i,n.keyframeTimestamps),Y.getState().markMediaHealthy(e),i}catch(r){if(Os.error(`Failed to resolve media ${e}:`,r),r instanceof n){let n=await t.getMedia(e);Y.getState().markMediaBroken(e,{mediaId:e,fileName:n?.fileName??`Unknown file`,errorType:r.type===`permission_denied`?`permission_denied`:`file_missing`})}return``}finally{Cs.delete(e)}})();return Cs.set(e,n),n}function As(e){let t=Y.getState().mediaById[e];if(t){let n=u(t);return l.getProxyKey(e)!==n&&l.setProxyKey(e,n),l.getProxyBlobUrl(e,n)}return l.getProxyBlobUrl(e)}function js(e){if(!e)return;let t=Y.getState().mediaById[e];if(t){if(t.mimeType.startsWith(`video/`))return t.audioCodec;if(t.mimeType.startsWith(`audio/`))return t.codec}}function Ms(e,t){return Math.abs(e-t)<=1}function Ns(e,t){return t<e-1}function Ps(e){return Math.max(0,Math.min(1,e??.5))}function Fs(e,t){let n=Math.max(1,Math.floor(e)),r=Ps(t),i=Math.floor(n*r);return{leftPortion:i,rightPortion:n-i}}function Is(e,t,n){let r=Math.max(0,Math.floor(e)),i=Math.max(0,Math.floor(t)),a=Math.max(0,Math.floor(n)),o=i+a;if(o<=r)return{incomingPortion:i,outgoingPortion:a};if(r===0)return{incomingPortion:0,outgoingPortion:0};let s=r/o,c=Math.floor(i*s),l=Math.floor(a*s),u=r-(c+l);for(;u>0;){let e=i-c,t=a-l;if(e===0&&t===0)break;e>=t&&e>0?c+=1:t>0?l+=1:e>0&&(c+=1),--u}return{incomingPortion:c,outgoingPortion:l}}function Ls(e,t){let n=/* @__PURE__ */ new Map,r=/* @__PURE__ */ new Map,i=/* @__PURE__ */ new Map;for(let a of e){let e=t.get(a.leftClipId),o=t.get(a.rightClipId);if(!e||!o)continue;let s=e.from+e.durationInFrames;if(Ms(s,o.from)){let t=o.from,s=Fs(a.durationInFrames,a.alignment);n.set(a.id,{transition:a,leftClip:e,rightClip:o,cutPoint:t,leftPortion:s.leftPortion,rightPortion:s.rightPortion,mode:`cut-centered`}),i.set(e.id,a.id),r.set(o.id,a.id);continue}if(!Ns(s,o.from))continue;let c=s-o.from;n.set(a.id,{transition:a,leftClip:e,rightClip:o,cutPoint:s,leftPortion:c,rightPortion:c,mode:`legacy-overlap`}),i.set(e.id,a.id),r.set(o.id,a.id)}for(let[e,a]of r){let r=i.get(e);if(!r)continue;let o=n.get(a),s=n.get(r),c=t.get(e);if(!o||!s||!c)continue;let l=Is(c.durationInFrames,o.rightPortion,s.leftPortion);o.rightPortion=l.incomingPortion,s.leftPortion=l.outgoingPortion}let a=[];for(let e of n.values()){let t=e.leftClip,n=e.rightClip,r=t.from+t.durationInFrames,i=e.mode===`cut-centered`?e.cutPoint-Math.max(0,e.leftPortion):n.from,o=e.mode===`cut-centered`?e.cutPoint+Math.max(0,e.rightPortion):r,s=Math.max(1,o-i);a.push({transition:e.transition,leftClip:e.leftClip,rightClip:e.rightClip,cutPoint:e.cutPoint,startFrame:i,endFrame:o,durationInFrames:s,leftPortion:Math.max(0,e.leftPortion),rightPortion:Math.max(0,e.rightPortion)})}return a.toSorted((e,t)=>e.startFrame===t.startFrame?e.cutPoint===t.cutPoint?e.transition.id.localeCompare(t.transition.id):e.cutPoint-t.cutPoint:e.startFrame-t.startFrame)}export{Ue as A,vt as C,S as D,C as E,x as F,v as I,ve as M,_e as N,We as O,he as P,yt as S,it as T,Bi as _,Ds as a,Pr as b,fs as c,co as d,oo as f,Va as g,Ha as h,As as i,He as j,Ve as k,mo as l,ao as m,js as n,Ss as o,io as p,ks as r,ps as s,Ls as t,so as u,fi as v,pt as w,bt as x,Xr as y};
//# sourceMappingURL=transition-planner-Dh4GmFvw.js.map