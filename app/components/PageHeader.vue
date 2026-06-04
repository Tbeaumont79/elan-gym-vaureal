<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>

<template>
  <section class="page-header">
    <div class="container">
      <h1>{{ title }}</h1>
      <p v-if="subtitle" class="page-header__sub">{{ subtitle }}</p>
    </div>
  </section>
</template>

<style scoped>
.page-header { background: var(--c-bg-soft); border-bottom: 1px solid var(--c-border); padding-block: clamp(2rem, 5vw, 3rem); }
.page-header__sub { color: var(--c-text-soft); max-width: 60ch; margin-top: 0.5rem; }
</style>
