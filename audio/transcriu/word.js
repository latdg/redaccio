// Desa la transcripció en Word (.docx) al mateix navegador — La TdG · 21.11.2026
// Sense biblioteques: el .docx és un ZIP (sense comprimir) amb l'XML de Word.
// Capçalera amb el logotip de La torre de guaita, el títol i la data; les línies
// «— data · hora · font —» van en negreta i el minut de cada frase, en gris.

const crcTaula = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = b => { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = crcTaula[(c ^ b[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };

function zip(fitxers) {               // fitxers: [[nom, Uint8Array]]
  const enc = new TextEncoder(), parts = [], central = [];
  let pos = 0;
  for (const [nom, dades] of fitxers) {
    const n = enc.encode(nom), crc = crc32(dades);
    const cap = new DataView(new ArrayBuffer(30));
    cap.setUint32(0, 0x04034b50, true); cap.setUint16(4, 20, true); cap.setUint16(6, 0x0800, true);
    cap.setUint32(14, crc, true); cap.setUint32(18, dades.length, true); cap.setUint32(22, dades.length, true); cap.setUint16(26, n.length, true);
    parts.push(new Uint8Array(cap.buffer), n, dades);
    const c = new DataView(new ArrayBuffer(46));
    c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true);
    c.setUint32(16, crc, true); c.setUint32(20, dades.length, true); c.setUint32(24, dades.length, true); c.setUint16(28, n.length, true); c.setUint32(42, pos, true);
    central.push(new Uint8Array(c.buffer), n);
    pos += 30 + n.length + dades.length;
  }
  const midaCentral = central.reduce((a, b) => a + b.length, 0);
  const fi = new DataView(new ArrayBuffer(22));
  fi.setUint32(0, 0x06054b50, true); fi.setUint16(8, fitxers.length, true); fi.setUint16(10, fitxers.length, true);
  fi.setUint32(12, midaCentral, true); fi.setUint32(16, pos, true);
  return new Blob([...parts, ...central, new Uint8Array(fi.buffer)], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
}

const x = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const run = (t, prop = "") => `<w:r>${prop ? `<w:rPr>${prop}</w:rPr>` : ""}<w:t xml:space="preserve">${x(t)}</w:t></w:r>`;
const par = (contingut, prop = "") => `<w:p>${prop ? `<w:pPr>${prop}</w:pPr>` : ""}${contingut}</w:p>`;

function logoXml(cx) {
  return `<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cx}"/><wp:docPr id="1" name="La torre de guaita"/>` +
    `<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">` +
    `<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="0" name="logo.jpg"/><pic:cNvPicPr/></pic:nvPicPr>` +
    `<pic:blipFill><a:blip r:embed="rIdLogo"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>` +
    `<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cx}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic>` +
    `</a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`;
}

export async function transcripcioAWord(text, data) {
  let logo = null;
  try {
    const r = await fetch("https://latdg.github.io/tauler/logo-tdg.jpg");
    if (r.ok) logo = new Uint8Array(await r.arrayBuffer());
  } catch (e) {}
  const gris = `<w:color w:val="808080"/>`;
  let cos = "";
  cos += par((logo ? logoXml(720000) + run("  ") : "") + run("Transcripció", `<w:b/><w:sz w:val="36"/>`), `<w:spacing w:after="60"/>`);
  cos += par(run(`La TdG · Estudi d'àudio · ${data}`, gris + `<w:sz w:val="20"/>`), `<w:spacing w:after="240"/>`);
  for (const l of text.replace(/\r/g, "").split("\n")) {
    const t = l.trimEnd();
    if (!t) continue;
    if (/^— .* —$/.test(t)) { cos += par(run(t.slice(2, -2), `<w:b/>`), `<w:spacing w:before="240" w:after="120"/>`); continue; }
    const m = t.match(/^\[(\d{1,2}(?::\d{2}){1,2})\]\s*(.*)$/);
    cos += m ? par(run(`[${m[1]}] `, gris) + run(m[2])) : par(run(t));
  }
  const doc = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing">` +
    `<w:body>${cos}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  const estils = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">` +
    `<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="22"/><w:lang w:val="ca-ES"/></w:rPr></w:rPrDefault>` +
    `<w:pPrDefault><w:pPr><w:spacing w:after="100" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults></w:styles>`;
  const tipus = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
    `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="jpg" ContentType="image/jpeg"/>` +
    `<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>` +
    `<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`;
  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;
  const relsDoc = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    `<Relationship Id="rIdEstils" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>` +
    (logo ? `<Relationship Id="rIdLogo" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/logo.jpg"/>` : "") +
    `</Relationships>`;
  const e = new TextEncoder();
  const fitxers = [["[Content_Types].xml", e.encode(tipus)], ["_rels/.rels", e.encode(rels)], ["word/document.xml", e.encode(doc)],
    ["word/styles.xml", e.encode(estils)], ["word/_rels/document.xml.rels", e.encode(relsDoc)]];
  if (logo) fitxers.push(["word/media/logo.jpg", logo]);
  return zip(fitxers);
}
