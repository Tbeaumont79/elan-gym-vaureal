<script setup lang="ts">
const { data } = await useAsyncData('horaires', () =>
  queryCollection('horaires').first(),
)

useSeoMeta({
  title: 'Horaires',
  description: "Horaires et créneaux d'entraînement de l'Élan Gymnique de Vauréal.",
})
</script>

<template>
  <div>
    <PageHeader title="Horaires" subtitle="Les créneaux par activité. Sous réserve de modifications en cours de saison." />
    <section class="section">
      <div class="container">
        <div v-if="data?.creneaux?.length" style="overflow-x: auto">
          <table class="table">
            <thead>
              <tr>
                <th>Activité</th>
                <th>Jour</th>
                <th>Horaire</th>
                <th>Public</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(c, i) in data.creneaux" :key="i">
                <td>{{ c.activite }}</td>
                <td>{{ c.jour }}</td>
                <td>{{ c.heure }}</td>
                <td>{{ c.public || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else>Les horaires seront publiés prochainement.</p>
        <div style="margin-top: 2rem"><AdhererButton /></div>
      </div>
    </section>
  </div>
</template>
