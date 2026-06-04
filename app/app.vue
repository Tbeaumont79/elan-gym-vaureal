<script setup lang="ts">
const SITE_NAME = 'Élan Gymnique de Vauréal'

// Favicon avec baseURL (compatible sous-chemin GitHub Pages).
const base = useRuntimeConfig().app.baseURL
useHead({
  // Chaque page définit son titre court (useSeoMeta) ; on suffixe le nom du club,
  // sans le doubler sur l'accueil dont le titre EST déjà le nom du club.
  titleTemplate: (title) =>
    title && title !== SITE_NAME ? `${title} · ${SITE_NAME}` : SITE_NAME,
  link: [{ rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
})

// SEO de base : valeurs OpenGraph par défaut (partage réseaux sociaux) + locale.
// Les titres/descriptions précis sont posés page par page via useSeoMeta.
useSeoMeta({
  ogSiteName: SITE_NAME,
  ogType: 'website',
  ogLocale: 'fr_FR',
  ogTitle: SITE_NAME,
  ogDescription:
    'La gymnastique artistique pour tous à Vauréal (95), des tout-petits aux adultes. Loisir et compétition dans une ambiance conviviale.',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
