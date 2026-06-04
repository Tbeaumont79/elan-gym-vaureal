<script setup lang="ts">
// Rend une page éditoriale simple depuis la collection `pages`.
const props = defineProps<{ path: string }>()

const { data: page } = await useAsyncData(`page:${props.path}`, () =>
  queryCollection('pages').path(props.path).first(),
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
    <section class="section">
      <div class="container prose">
        <ContentRenderer :value="page" />
      </div>
    </section>
  </div>
</template>
