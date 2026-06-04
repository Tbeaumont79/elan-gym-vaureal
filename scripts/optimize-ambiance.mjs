// Optimisation des visuels d'ambiance libres de droits (THI-30).
// Recadre, redimensionne et exporte en AVIF + WebP via sharp (même approche que le
// pipeline d'extraction). Sources Pexels (licence Pexels) — voir public/CREDITS-IMAGES.md.
//
// Usage :
//   1. Télécharger les sources JPEG dans .img-src/ (hero.jpg, sol.jpg, barres.jpg,
//      poutre.jpg, enfants.jpg, club.jpg). URLs Pexels listées dans CREDITS-IMAGES.md.
//   2. node scripts/optimize-ambiance.mjs
//      → écrit public/images/ambiance/<nom>.{webp,avif}
import { createRequire } from 'node:module'
import { mkdir, readdir } from 'node:fs/promises'

const ROOT = new URL('../', import.meta.url).pathname

// sharp est une dépendance transitive (pnpm strict) : pas toujours de symlink
// node_modules/sharp. On tente la résolution standard, puis le store .pnpm.
const require = createRequire(import.meta.url)
async function loadSharp() {
  try {
    return require('sharp')
  } catch {
    const store = ROOT + 'node_modules/.pnpm/'
    const dir = (await readdir(store)).find((d) => d.startsWith('sharp@'))
    if (!dir) throw new Error('sharp introuvable — exécuter d\'abord `pnpm install`.')
    return require(store + dir + '/node_modules/sharp/lib/index.js')
  }
}
const sharp = await loadSharp()
const SRC = ROOT + '.img-src/'
const OUT = ROOT + 'public/images/ambiance/'
await mkdir(OUT, { recursive: true })

// [source, nom de sortie, largeur, hauteur (recadrage couvrant), qualité webp]
const jobs = [
  ['hero.jpg', 'hero-accueil', 1920, 840, 70], // bannière paysage ~16:7, < 200 Ko
  ['sol.jpg', 'sol', 800, 600, 72], // vignettes 4:3
  ['barres.jpg', 'barres', 800, 600, 72],
  ['poutre.jpg', 'poutre', 800, 600, 72],
  ['enfants.jpg', 'enfants', 800, 600, 72],
  ['club.jpg', 'club', 800, 600, 72],
]

for (const [src, name, w, h, q] of jobs) {
  const base = sharp(SRC + src).resize(w, h, { fit: 'cover', position: 'attention' })
  await base.clone().webp({ quality: q }).toFile(OUT + name + '.webp')
  await base.clone().avif({ quality: Math.max(q - 20, 45) }).toFile(OUT + name + '.avif')
  console.log('✓', name)
}
console.log('Terminé →', OUT)
