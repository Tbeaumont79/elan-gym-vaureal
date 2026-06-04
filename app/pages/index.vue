<script setup lang="ts">
// Contenu éditorial de la page d'accueil (édité via Studio).
const { data: page } = await useAsyncData('home', () =>
  queryCollection('pages').path('/pages/accueil').first(),
)

// Aperçu des activités, triées par ordre.
const { data: activites } = await useAsyncData('home-activites', () =>
  queryCollection('activites').order('order', 'ASC').all(),
)

useSeoMeta({
  title: () => page.value?.title || 'Accueil',
  description: () => page.value?.description,
})

// Visuel d'ambiance (illustration neutre) déduit du slug de l'activité.
const visuel = (path?: string) => useActiviteImage((path || '').split('/').pop() || '')
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <!-- Visuel d'ambiance libre de droits (illustration neutre, pas une photo du club). -->
      <AmbianceImage
        name="hero-accueil"
        alt="Gymnastes à l'entraînement dans un gymnase (image d'illustration)"
        eager
        class="hero__bg"
      />
      <div class="hero__overlay" aria-hidden="true"></div>
      <div class="container hero__inner">
        <h1>{{ page?.title || 'Élan Gymnique de Vauréal' }}</h1>
        <p class="hero__lead">
          {{ page?.description || 'La gymnastique pour tous à Vauréal, du baby-gym aux adultes.' }}
        </p>
        <div class="hero__actions">
          <AdhererButton />
          <NuxtLink to="/activites" class="btn btn--ghost hero__ghost">Découvrir nos activités</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Corps éditorial -->
    <section v-if="page" class="section">
      <div class="container prose">
        <ContentRenderer :value="page" />
      </div>
    </section>

    <!-- Aperçu activités -->
    <section class="section section--soft">
      <div class="container">
        <h2>Nos activités</h2>
        <p>Une discipline adaptée à chaque âge, du tout-petit à l'adulte.</p>
        <div class="grid grid--3" style="margin-top: 1.5rem">
          <NuxtLink
            v-for="a in activites"
            :key="a.path"
            :to="a.path"
            class="card activity-card"
          >
            <AmbianceImage
              :name="visuel(a.path).name"
              :alt="visuel(a.path).alt"
              class="activity-card__media"
            />
            <div class="card__body">
              <span class="activity-card__age">{{ a.age }}</span>
              <h3>{{ a.title }}</h3>
              <p>{{ a.description }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  background: linear-gradient(135deg, var(--c-primary), var(--c-primary-dark));
  color: var(--c-text-invert);
  overflow: hidden;
}
/* Le visuel d'ambiance couvre le héros ; le dégradé reste en repli si l'image manque. */
.hero__bg { position: absolute; inset: 0; z-index: -2; }
.hero__bg :deep(img) { width: 100%; height: 100%; object-fit: cover; }
/* Voile sombre : garantit la lisibilité AA du texte blanc par-dessus la photo. */
.hero__overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(135deg, rgba(19, 32, 63, 0.82), rgba(29, 44, 86, 0.68));
}
.hero__inner { position: relative; padding-block: clamp(3rem, 8vw, 6rem); }
.hero h1 { color: var(--c-text-invert); max-width: 18ch; }
.hero__lead { font-size: 1.2rem; max-width: 52ch; color: rgba(255, 255, 255, 0.9); }
.hero__actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem; }
.hero__ghost { color: #fff; border-color: rgba(255, 255, 255, 0.5); }
.activity-card { text-decoration: none; color: inherit; transition: transform 0.12s ease; overflow: hidden; }
.activity-card:hover { transform: translateY(-3px); }
.activity-card__media { aspect-ratio: 4 / 3; background: var(--c-bg-soft); }
.activity-card__age {
  display: inline-block;
  background: var(--c-accent);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  margin-bottom: 0.5rem;
}
</style>
