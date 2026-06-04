<script setup lang="ts">
// Visuel d'ambiance libre de droits (Pexels License — voir public/CREDITS-IMAGES.md).
// Images neutres d'illustration : ce ne sont PAS des photos du club (alt explicites).
// Sert l'AVIF puis le WebP, préfixés par le baseURL (sous-chemin GitHub Pages).
const props = defineProps<{
  name: string
  alt: string
  eager?: boolean
}>()

const base = useRuntimeConfig().app.baseURL
const src = (ext: string) => `${base}images/ambiance/${props.name}.${ext}`
</script>

<template>
  <picture class="ambiance">
    <source :srcset="src('avif')" type="image/avif" />
    <source :srcset="src('webp')" type="image/webp" />
    <img
      :src="src('webp')"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
    />
  </picture>
</template>

<style scoped>
.ambiance { display: block; }
.ambiance img { width: 100%; height: 100%; object-fit: cover; }
</style>
