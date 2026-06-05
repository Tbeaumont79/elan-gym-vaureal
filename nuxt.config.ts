// https://nuxt.com/docs/api/configuration/nuxt-config

// Cloudflare Pages fixe automatiquement CF_PAGES=1 (+ CF_PAGES_URL) dans son CI.
// On s'en sert pour auto-configurer l'hébergement → le fondateur n'a AUCUNE variable à régler.
const isCloudflare = process.env.CF_PAGES === '1'

// Sous-chemin d'hébergement. Cloudflare sert à la racine (`/`) ; GitHub Pages projet sous `/<repo>/`.
// Surchargeable via NUXT_APP_BASE_URL (domaine custom = avenant).
const baseURL =
  process.env.NUXT_APP_BASE_URL || (isCloudflare ? '/' : '/elan-gym-vaureal/')

// Origine du site (SEO/sitemap). Sur Cloudflare, CF_PAGES_URL pointe le sous-domaine *.pages.dev.
const siteUrl =
  process.env.NUXT_PUBLIC_SITE_URL ||
  (isCloudflare ? process.env.CF_PAGES_URL : undefined) ||
  'https://tbeaumont79.github.io'

// Preset Nitro : on garde `github_pages` même sur Cloudflare. C'est un site 100 % pré-rendu →
// sortie 100 % statique dans `.output/public` (ce que wrangler.toml sert). On évite délibérément
// le preset `cloudflare_pages` qui génère un `_worker.js` Node (bundle better-sqlite3 de @nuxt/content,
// module natif non exécutable sur le runtime Workers) + sort dans `dist` + exige le flag nodejs_compat.
// Le `.nojekyll` ajouté par github_pages est inerte sur Cloudflare. Surchargeable via NITRO_PRESET.
const nitroPreset = process.env.NITRO_PRESET || 'github_pages'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxtjs/sitemap'],

  // SSG : tout le site est pré-rendu en statique (rapide, sécurisé, SEO, hébergement gratuit).
  // Preset auto-détecté (Cloudflare vs GitHub Pages) — voir en-tête de fichier.
  nitro: {
    preset: nitroPreset,
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  // Sous-chemin d'hébergement (GitHub Pages projet : https://<user>.github.io/<repo>/).
  // Surchargeable via NUXT_APP_BASE_URL pour un futur déploiement sur domaine custom (= avenant).
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'fr' },
      // Favicon défini dans app.vue pour respecter le baseURL (sous-chemin GitHub Pages).
    },
  },

  // SEO : sitemap. crawlLinks (preset Pages) découvre le lien d'accueil sous sa forme
  // préfixée par le baseURL et l'enregistre comme route « /<repo> » ; on l'exclut pour
  // éviter une entrée doublonnée (.../<repo>/<repo>). Vide et inerte sur domaine custom (baseURL = '/').
  sitemap: {
    exclude: [baseURL.replace(/\/$/, '')].filter(Boolean),
  },

  // Identité du site (SEO de base). url = origine seule ; le sous-chemin vient de app.baseURL.
  site: {
    url: siteUrl,
    name: 'Élan Gymnique de Vauréal',
  },

  content: {
    // Recherche & navigation activées côté build.
    build: {
      markdown: {
        toc: { depth: 3 },
      },
    },
    // Nuxt Studio (auto-hébergé) : l'édition se connecte via l'API de prévisualisation.
    // NUXT_STUDIO_API est renseigné une fois l'instance Studio déployée (voir README).
    preview: {
      api: process.env.NUXT_STUDIO_API || 'https://api.nuxt.studio',
    },
  },

  css: ['~/assets/css/main.css'],

  future: { compatibilityVersion: 4 },
})
