<script setup lang="ts">
const { data: activites } = await useAsyncData('activites-list', () =>
  queryCollection('activites').order('order', 'ASC').all(),
)

useSeoMeta({
  title: 'Nos activités',
  description:
    "Toutes les activités de l'Élan Gymnique de Vauréal : baby-gym, école de gym, loisir, pré-compétition, compétition et adultes.",
})
</script>

<template>
  <div>
    <PageHeader
      title="Nos activités"
      subtitle="Une discipline adaptée à chaque âge, du tout-petit à l'adulte."
    />
    <section class="section">
      <div class="container">
        <div class="grid grid--3">
          <NuxtLink v-for="a in activites" :key="a.path" :to="a.path" class="card activity-card">
            <div class="card__body">
              <span class="activity-card__age">{{ a.age }}</span>
              <h3>{{ a.title }}</h3>
              <p>{{ a.description }}</p>
              <span v-if="a.horaire" class="activity-card__horaire">🕒 {{ a.horaire }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.activity-card { text-decoration: none; color: inherit; transition: transform 0.12s ease; }
.activity-card:hover { transform: translateY(-3px); }
.activity-card__age {
  display: inline-block; background: var(--c-accent); color: #fff; font-size: 0.8rem;
  font-weight: 700; padding: 0.15rem 0.6rem; border-radius: 999px; margin-bottom: 0.5rem;
}
.activity-card__horaire { display: block; margin-top: 0.75rem; color: var(--c-text-soft); font-size: 0.9rem; }
</style>
