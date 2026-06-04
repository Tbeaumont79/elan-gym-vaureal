// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxtjs/sitemap'],

  // SSG : tout le site est pré-rendu en statique (rapide, sécurisé, SEO, hébergement gratuit).
  // Preset GitHub Pages : génère .nojekyll + 404.html et respecte le sous-chemin /<repo>/.
  nitro: {
    preset: 'github_pages',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  // Sous-chemin d'hébergement (GitHub Pages projet : https://<user>.github.io/<repo>/).
  // Surchargeable via NUXT_APP_BASE_URL pour un futur déploiement sur domaine custom (= avenant).
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/elan-gym-vaureal/',
    head: {
      htmlAttrs: { lang: 'fr' },
      // Favicon défini dans app.vue pour respecter le baseURL (sous-chemin GitHub Pages).
    },
  },

  // Identité du site (SEO de base). url = origine seule ; le sous-chemin vient de app.baseURL.
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://tbeaumont79.github.io',
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
