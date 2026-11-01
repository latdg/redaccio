// ADAPTA FREECUT A L'ESTUDI DE VÍDEO DE LA TdG · 01.11.2026
// S'executa dins d'una còpia de walterlow/freecut abans de «npm run build».
// Ús: node adapta.mjs /camí/a/freecut
//  1. Serveix l'editor des de /redaccio/video/editor/ (GitHub Pages).
//  2. Entra directament als projectes (sense la portada de FreeCut).
//  3. Navegador en català → interfície en castellà (FreeCut no té català).
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

// 3. Català → castellà
canvia('src/i18n/languages.ts', "if (base === 'pt') return 'pt-BR'", "if (base === 'pt') return 'pt-BR'\n  if (base === 'ca') return 'es'")

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

// 5. Sense service worker
canvia('src/main.tsx', "if (import.meta.env.PROD && 'serviceWorker' in navigator) {",
  "if (false && import.meta.env.PROD && 'serviceWorker' in navigator) {")

console.log('FreeCut adaptat per a La TdG')
