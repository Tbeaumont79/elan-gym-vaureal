<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: page } = await useAsyncData(
  () => `activite-${slug.value}`,
  () => queryCollection('activites').path(`/activites/${slug.value}`).first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Activité introuvable', fatal: true })
}

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})
</script>

<template>
  <div v-if="page">
    <PageHeader :title="page.title" :subtitle="`${page.age} · ${page.description}`" />
    <section class="section">
      <div class="container activite">
        <div class="prose">
          <p v-if="page.horaire" class="activite__horaire">🕒 <strong>Horaire :</strong> {{ page.horaire }}</p>
          <ContentRenderer :value="page" />
          <div style="margin-top: 2rem">
            <AdhererButton />
            <NuxtLink to="/activites" class="btn btn--ghost" style="margin-left: 0.5rem">
              ← Toutes les activités
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.activite__horaire { background: var(--c-bg-soft); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--c-border); }
</style>
