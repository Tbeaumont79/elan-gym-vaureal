<script setup lang="ts">
// Bouton « Adhérer » — lien sortant vers HelloAsso (gestion hors périmètre vitrine).
withDefaults(defineProps<{ variant?: 'primary' | 'ghost' }>(), {
  variant: 'primary',
})
</script>

<template>
  <a
    :href="HELLOASSO_URL"
    target="_blank"
    rel="noopener"
    class="btn"
    :class="variant === 'ghost' ? 'btn--ghost' : 'btn--primary'"
  >
    Adhérer / S'inscrire
  </a>
</template>
