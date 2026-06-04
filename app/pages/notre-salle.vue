<script setup lang="ts">
const { data: page } = await useAsyncData('page:/pages/notre-salle', () =>
  queryCollection('pages').path('/pages/notre-salle').first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page introuvable', fatal: true })
}

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})
</script>

<template>
  <div v-if="page">
    <PageHeader :title="page.title" :subtitle="page.description" />
    <div class="container">
      <!-- Visuel d'ambiance neutre (libre de droits) — pas une photo du club. -->
      <AmbianceImage
        name="poutre"
        alt="Agrès de gymnastique dans un gymnase (image d'illustration)"
        class="salle__media"
      />
    </div>
    <section class="section">
      <div class="container prose">
        <ContentRenderer :value="page" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.salle__media {
  margin-top: clamp(1.5rem, 4vw, 2.5rem);
  aspect-ratio: 16 / 6;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--c-border);
}
</style>
