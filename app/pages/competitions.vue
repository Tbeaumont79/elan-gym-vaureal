<script setup lang="ts">
const { data } = await useAsyncData('competitions', () =>
  queryCollection('competitions').first(),
)

useSeoMeta({
  title: 'Compétitions',
  description: "Calendrier des compétitions de l'Élan Gymnique de Vauréal.",
})
</script>

<template>
  <div>
    <PageHeader title="Compétitions" subtitle="Le calendrier des compétitions de la saison." />
    <section class="section">
      <div class="container">
        <ul v-if="data?.dates?.length" class="comp-list">
          <li v-for="(d, i) in data.dates" :key="i" class="comp-item">
            <span class="comp-item__date">{{ d.date }}</span>
            <div>
              <strong>{{ d.intitule }}</strong>
              <p v-if="d.lieu || d.niveau">
                <template v-if="d.lieu">📍 {{ d.lieu }}</template>
                <template v-if="d.niveau"> · {{ d.niveau }}</template>
              </p>
            </div>
          </li>
        </ul>
        <p v-else>Le calendrier des compétitions sera publié prochainement.</p>
        <p style="margin-top: 1.5rem">
          <NuxtLink to="/equipement" class="btn btn--ghost">Équipement requis →</NuxtLink>
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.comp-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.75rem; }
.comp-item { display: flex; gap: 1rem; align-items: flex-start; background: var(--c-bg); border: 1px solid var(--c-border); border-radius: var(--radius-sm); padding: 1rem 1.25rem; }
.comp-item__date { background: var(--c-primary); color: #fff; font-weight: 700; padding: 0.3rem 0.7rem; border-radius: var(--radius-sm); white-space: nowrap; }
.comp-item p { margin: 0.25rem 0 0; color: var(--c-text-soft); }
</style>
