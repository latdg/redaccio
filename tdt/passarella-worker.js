// PASSAREL·LA DE SENYALS — La TdG control room · 05.11.2026
// Worker de Cloudflare «latdg-senyal» (https://latdg-senyal.ignasicorney.workers.dev).
// Demana el senyal d'una cadena o emissora i el torna a la pàgina tdt/ amb permís
// (CORS) perquè el navegador el pugui reproduir i gravar. Només l'usa la pàgina quan el
// camí directe falla. Amb les llistes .m3u8, reescriu les adreces de dins perquè també
// passin per aquí. Si la cadena demana «Referer», l'hi posa.
// Només atén la pàgina de La TdG i només deixa passar àudio, vídeo i llistes de
// reproducció (no és un servidor intermediari obert).

const ORIGENS = ["https://latdg.github.io"];
const TIPUS_PERMESOS = /^(audio\/|video\/|application\/(vnd\.apple\.mpegurl|x-mpegurl|octet-stream|mp4|dash\+xml)|binary\/octet-stream)/i;

export default {
  async fetch(req) {
    const origen = req.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": ORIGENS.includes(origen) ? origen : ORIGENS[0],
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Range",
      "Access-Control-Expose-Headers": "Content-Type, Content-Length, Content-Range",
      "Vary": "Origin",
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (!ORIGENS.includes(origen)) return new Response("Només per a La TdG.", { status: 403, headers: cors });

    const aqui = new URL(req.url);
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
