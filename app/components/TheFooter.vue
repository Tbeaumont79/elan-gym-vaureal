<script setup lang="ts">
const year = 2026
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div>
        <strong>Élan Gymnique de Vauréal</strong>
        <p>Club de gymnastique à Vauréal (95). Baby-gym, école de gym, loisir, compétition et adultes.</p>
        <AdhererButton variant="ghost" />
      </div>
      <div>
        <strong>Liens</strong>
        <ul>
          <li><NuxtLink to="/horaires">Horaires</NuxtLink></li>
          <li><NuxtLink to="/acces-contact">Accès &amp; contact</NuxtLink></li>
          <li><NuxtLink to="/competitions">Compétitions</NuxtLink></li>
          <li><a :href="FACEBOOK_URL" target="_blank" rel="noopener">Facebook</a></li>
        </ul>
      </div>
    </div>
    <div class="site-footer__bar">
      <div class="container">
        <span>© {{ year }} Élan Gymnique de Vauréal</span>
        <!-- Crédit d'agence retiré pour le pilote (décision THI-15/THI-25, repli sans crédit).
             Réversible : rebrancher la mention une fois la marque arrêtée. -->
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { background: var(--c-primary-dark); color: var(--c-text-invert); margin-top: auto; }
.site-footer__grid {
  display: grid;
  gap: 2rem;
  padding-block: 2.5rem;
  grid-template-columns: 1fr;
}
@media (min-width: 720px) { .site-footer__grid { grid-template-columns: 2fr 1fr; } }
.site-footer p { color: rgba(255, 255, 255, 0.8); }
.site-footer ul { list-style: none; margin: 0.5rem 0 0; padding: 0; }
.site-footer li { margin-bottom: 0.4rem; }
.site-footer a, .site-footer strong { color: var(--c-text-invert); }
.site-footer a { text-decoration: none; opacity: 0.85; }
.site-footer a:hover { opacity: 1; text-decoration: underline; }
.site-footer__bar { border-top: 1px solid rgba(255, 255, 255, 0.12); padding-block: 1rem; font-size: 0.85rem; }
.site-footer__bar .container { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; color: rgba(255, 255, 255, 0.7); }
</style>
