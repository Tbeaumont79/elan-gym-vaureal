<script setup lang="ts">
const { data: page } = await useAsyncData('acces-contact', () =>
  queryCollection('pages').path('/pages/acces-contact').first(),
)

useSeoMeta({
  title: 'Accès & contact',
  description: "Adresse, accès et contact de l'Élan Gymnique de Vauréal à Vauréal (95).",
})

// Carte OpenStreetMap (embed, sans clé API). Coordonnées du Gymnase de la Bussie
// vérifiées via Nominatim/OSM : 49.0313386, 2.0198829.
const osmSrc =
  'https://www.openstreetmap.org/export/embed.html?bbox=2.0099%2C49.0263%2C2.0299%2C49.0363&layer=mapnik&marker=49.0313386%2C2.0198829'
</script>

<template>
  <div>
    <PageHeader title="Accès & contact" subtitle="Où nous trouver et comment nous joindre." />
    <section class="section">
      <div class="container acces">
        <div class="prose">
          <ContentRenderer v-if="page" :value="page" />
          <p><a :href="FACEBOOK_URL" target="_blank" rel="noopener">Suivez-nous sur Facebook →</a></p>
          <AdhererButton />
        </div>
        <div class="acces__map">
          <iframe :src="osmSrc" title="Carte d'accès" loading="lazy"></iframe>
          <p class="acces__note">Gymnase de la Bussie, rue de la Gerbe d'Or, 95490 Vauréal.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.acces { display: grid; gap: 2rem; grid-template-columns: 1fr; }
@media (min-width: 860px) { .acces { grid-template-columns: 1fr 1fr; } }
.acces__map iframe { width: 100%; aspect-ratio: 4 / 3; border: 1px solid var(--c-border); border-radius: var(--radius); }
.acces__note { font-size: 0.85rem; color: var(--c-text-soft); margin-top: 0.5rem; }
</style>
