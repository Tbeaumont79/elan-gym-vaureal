<script setup lang="ts">
const { data } = await useAsyncData('galerie', () =>
  queryCollection('galerie').first(),
)

useSeoMeta({
  title: 'Galerie',
  description: "Photos et vidéos de l'Élan Gymnique de Vauréal.",
})

// Transforme une URL YouTube en URL d'embed.
function embedUrl(url: string): string {
  const m = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/)
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : url
}
</script>

<template>
  <div>
    <PageHeader title="Galerie" subtitle="Photos et vidéos du club." />
    <section class="section">
      <div class="container">
        <h2 v-if="data?.photos?.length">Photos</h2>
        <div v-if="data?.photos?.length" class="grid grid--3">
          <figure v-for="(p, i) in data.photos" :key="i" class="gallery-photo">
            <img :src="p.src" :alt="p.legende || 'Photo du club'" loading="lazy" />
            <figcaption v-if="p.legende">{{ p.legende }}</figcaption>
          </figure>
        </div>

        <h2 v-if="data?.videos?.length" style="margin-top: 2.5rem">Vidéos</h2>
        <div v-if="data?.videos?.length" class="grid grid--2">
          <div v-for="(v, i) in data.videos" :key="i" class="gallery-video">
            <iframe
              :src="embedUrl(v.url)"
              :title="v.titre || 'Vidéo'"
              loading="lazy"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <p v-if="!data?.photos?.length && !data?.videos?.length">
          La galerie sera enrichie prochainement.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.gallery-photo { margin: 0; border-radius: var(--radius); overflow: hidden; border: 1px solid var(--c-border); }
.gallery-photo figcaption { padding: 0.5rem 0.75rem; font-size: 0.9rem; color: var(--c-text-soft); }
.gallery-video { position: relative; aspect-ratio: 16 / 9; border-radius: var(--radius); overflow: hidden; }
.gallery-video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
</style>
