<script setup lang="ts">
// Favicon avec baseURL (compatible sous-chemin GitHub Pages).
const base = useRuntimeConfig().app.baseURL
useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
