<template>
  <div class="ia">
    <div class="ia__title">{{ title }}</div>
    <div class="ia__desc">{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title:       'Claimed Athletes Only',
  description: 'This content is only available for claimed athlete profiles.',
})
</script>

<style scoped>
.ia {
  background: var(--color-info-bg-purple);
  border-radius: var(--radius-badge);
  padding: var(--space-lg);
  border: 1px solid var(--color-info-border-purple);
}

.ia__title {
  font-family: var(--font-family-base);
  font-size: var(--text-body2);
  font-weight: var(--font-bold);
  color: var(--color-claimed-purple);
  margin-bottom: var(--space-xs2);
}

.ia__desc {
  font-family: var(--font-family-base);
  font-size: var(--text-caption);
  color: var(--color-gray-500);
}
</style>
