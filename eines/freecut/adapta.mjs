// ADAPTA FREECUT A L'ESTUDI DE VÍDEO DE LA TdG · 01.11.2026
// S'executa dins d'una còpia de walterlow/freecut abans de «npm run build».
// Ús: node adapta.mjs /camí/a/freecut
//  1. Serveix l'editor des de /redaccio/video/editor/ (GitHub Pages).
//  2. Entra directament als projectes (sense la portada de FreeCut).
//  3. Interfície en català (traducció feta amb tradueix.py) i per defecte en català.
//  4. Botó «Mosca» a la biblioteca de mitjans: importa la mosca de La TdG.
//  5. Sense service worker propi (evita memòries cau velles a GitHub Pages).
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const arrel = process.argv[2]
if (!arrel) throw new Error('Cal el camí de freecut')
const BASE = '/redaccio/video/editor/'

function canvia(fitxer, de, a) {
  const cami = join(arrel, fitxer)
  const text = readFileSync(cami, 'utf8')
  if (!text.includes(de)) throw new Error(`No trobo el tros a ${fitxer}:\n${de}`)
  writeFileSync(cami, text.replace(de, a))
}

// 1. Subcarpeta
canvia('vite.config.ts', 'export default defineConfig({', `export default defineConfig({\n  base: '${BASE}',`)
canvia('src/app.tsx',
  'createRouter({ routeTree, defaultErrorComponent: RouteErrorScreen })',
  "createRouter({ routeTree, defaultErrorComponent: RouteErrorScreen, basepath: import.meta.env.BASE_URL.replace(/\\/$/, '') })")
canvia('src/features/workspace-gate/use-pathname.ts',
  "return typeof window === 'undefined' ? '/' : window.location.pathname",
  "if (typeof window === 'undefined') return '/'\n  const base = import.meta.env.BASE_URL.replace(/\\/$/, '')\n  const p = window.location.pathname\n  return p.startsWith(base) ? p.slice(base.length) || '/' : p")
canvia('src/shared/projects/last-editor-project.ts',
  "const projectId = pathname.match(",
  "const base = import.meta.env.BASE_URL.replace(/\\/$/, '')\n  if (base && pathname.startsWith(base)) pathname = pathname.slice(base.length) || '/'\n  const projectId = pathname.match(")
canvia('src/features/editor/services/moss-tts-service.ts', "'/moss-tts/", "import.meta.env.BASE_URL + 'moss-tts/")

// 2. Directament als projectes
canvia('src/routes/index.tsx', "import { createFileRoute, Link } from '@tanstack/react-router'",
  "import { createFileRoute, Link, redirect } from '@tanstack/react-router'")
canvia('src/routes/index.tsx', "export const Route = createFileRoute('/')({",
  "export const Route = createFileRoute('/')({\n  beforeLoad: () => {\n    throw redirect({ to: '/projects' })\n  },")

// 3. Català
canvia('src/i18n/languages.ts', "  { code: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr' },",
  "  { code: 'ca', nativeName: 'Català', englishName: 'Catalan', dir: 'ltr' },\n  { code: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr' },")
canvia('src/i18n/languages.ts', "if (!code) return DEFAULT_LANGUAGE", "if (!code) return 'ca'")
canvia('src/i18n/languages.ts', "return match ?? DEFAULT_LANGUAGE", "return match ?? 'ca'")
// Sempre en català, tret que es triï un altre idioma a la configuració
canvia('src/i18n/index.ts', "void i18n\n", "try {\n  // Un sol cop per navegador: passa al català encara que abans hi hagués desat un altre idioma\n  if (!localStorage.getItem('latdg-idioma-ca')) {\n    localStorage.setItem(I18N_STORAGE_KEY, 'ca')\n    localStorage.setItem('latdg-idioma-ca', '1')\n  }\n} catch {\n  // Sense emmagatzematge: es decideix per l'idioma del navegador\n}\n\nvoid i18n\n")

// 4. Botó «Mosca»
canvia('src/features/media-library/components/media-library.tsx',
  "            <HeaderActionTooltip label={t('media.library.importMediaFromUrl')}>",
  `            <HeaderActionTooltip label="Mosca de La TdG">
              <button
                onClick={() => void importMediaFromUrl(new URL('../mosca.png', window.location.origin + import.meta.env.BASE_URL).href)}
                disabled={!currentProjectId}
                className="flex items-center gap-1.5 h-7 px-2.5 rounded-md shrink-0 border
                  bg-secondary border-border text-muted-foreground
                  hover:text-primary hover:bg-primary/10 hover:border-primary/40
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition-colors duration-150"
              >
                <span aria-hidden="true">🪰</span>
                <span className={headerCompactLevel >= 2 ? 'hidden' : 'hidden @[360px]:inline'}>Mosca</span>
              </button>
            </HeaderActionTooltip>

            <HeaderActionTooltip label={t('media.library.importMediaFromUrl')}>`)

// 4b. Proxies automàtics (01.11.2026): l'ordinador de la redacció (MSI GS60) va just amb
// vídeo gran. En importar un vídeo de més de 720p o en HEVC/H.265, se'n fa una còpia lleugera
// per editar; l'exportació continua fent servir l'original.
canvia('src/features/media-library/stores/media-import-actions.ts',
  "  proxyService.setProxyKey(metadata.id, getSharedProxyKey(metadata))\n}",
  `  proxyService.setProxyKey(metadata.id, getSharedProxyKey(metadata))
  const gran = Math.min(metadata.width || 0, metadata.height || 0) > 720
  const hevc = /hev|hvc|h\\.?265/i.test(metadata.codec || '')
  if (gran || hevc) {
    proxyService.generateProxy(
      metadata.id,
      metadata.storageType === 'opfs' && metadata.opfsPath
        ? { kind: 'opfs', path: metadata.opfsPath, mimeType: metadata.mimeType }
        : async () => (await loadMediaLibraryService()).mediaLibraryService.getMediaFile(metadata.id),
      metadata.width,
      metadata.height,
      getSharedProxyKey(metadata),
      { priority: 'background' },
    )
  }
}`)

// 5. Sense service worker
canvia('src/main.tsx', "if (import.meta.env.PROD && 'serviceWorker' in navigator) {",
  "if (false && import.meta.env.PROD && 'serviceWorker' in navigator) {")

console.log('FreeCut adaptat per a La TdG')
