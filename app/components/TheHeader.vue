<script setup lang="ts">
const nav = useNavigation()
const open = ref(false)
const route = useRoute()

// Ferme le menu mobile à chaque changement de page.
watch(() => route.path, () => (open.value = false))
</script>

<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <NuxtLink to="/" class="brand" @click="open = false">
        <span class="brand__mark">ÉG</span>
        <span class="brand__name">Élan Gymnique<br />de Vauréal</span>
      </NuxtLink>

      <button
        class="burger"
        :aria-expanded="open"
        aria-label="Ouvrir le menu"
        @click="open = !open"
      >
        <span></span><span></span><span></span>
      </button>

      <nav class="nav" :class="{ 'nav--open': open }" aria-label="Navigation principale">
        <ul class="nav__list">
          <li v-for="item in nav" :key="item.to" class="nav__item">
            <NuxtLink :to="item.to" class="nav__link">{{ item.label }}</NuxtLink>
            <ul v-if="item.children" class="nav__submenu">
              <li v-for="child in item.children" :key="child.to">
                <NuxtLink :to="child.to" class="nav__sublink">{{ child.label }}</NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
        <AdhererButton class="nav__cta" />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--c-primary);
  color: var(--c-text-invert);
}
.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 68px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--c-text-invert);
  text-decoration: none;
  font-weight: 700;
}
.brand__mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--c-accent);
  color: #fff;
  font-weight: 800;
}
.brand__name { font-size: 0.95rem; line-height: 1.1; }

.burger {
  display: inline-flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 8px;
}
.burger span { width: 26px; height: 3px; background: #fff; border-radius: 2px; }

.nav { display: none; }
.nav--open { display: block; }
.nav__list { list-style: none; margin: 0; padding: 0; }
.nav__link,
.nav__sublink {
  display: block;
  padding: 0.6rem 0;
  color: var(--c-text-invert);
  text-decoration: none;
  font-weight: 600;
}
.nav__sublink { font-weight: 400; padding-left: 1rem; opacity: 0.9; }
.nav__link.router-link-exact-active { color: var(--c-accent); }
.nav__cta { margin-top: 0.75rem; }
.nav__submenu { list-style: none; margin: 0; padding: 0; }

/* Desktop */
@media (min-width: 980px) {
  .burger { display: none; }
  .nav { display: flex !important; align-items: center; gap: 1.25rem; }
  .nav__list { display: flex; align-items: center; gap: 1.25rem; }
  .nav__item { position: relative; }
  .nav__link { padding: 0.4rem 0; }
  .nav__submenu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 230px;
    background: #fff;
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow);
    padding: 0.4rem 0;
    display: none;
  }
  .nav__item:hover .nav__submenu,
  .nav__item:focus-within .nav__submenu { display: block; }
  .nav__sublink { color: var(--c-text); padding: 0.5rem 1rem; }
  .nav__sublink:hover { background: var(--c-bg-soft); color: var(--c-primary); }
  .nav__cta { margin-top: 0; }
}
</style>
