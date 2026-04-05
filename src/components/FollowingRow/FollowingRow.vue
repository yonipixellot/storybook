<template>
  <div class="fr" :class="{ 'fr--no-border': !borderBottom }" role="listitem">

    <!-- Avatar slot -->
    <slot name="avatar" />

    <!-- Title + subtitle -->
    <div class="fr__info">
      <div class="fr__title">{{ title }}</div>
      <div v-if="subtitle" class="fr__subtitle">{{ subtitle }}</div>
    </div>

    <!-- Action slot -->
    <slot name="action" />

  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?:        string
  subtitle?:     string
  borderBottom?: boolean
}>(), {
  title:        'Team or Player',
  borderBottom: true,
})
</script>

<style scoped>
.fr {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--color-gray-100);
}

.fr--no-border {
  border-bottom: none;
}

.fr__info {
  flex: 1;
  min-width: 0;
}

.fr__title {
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-dark-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fr__subtitle {
  font-family: var(--font-family-base);
  font-size: var(--text-caption);
  color: var(--color-gray-400);
  margin-top: var(--space-xxs);
}
</style>
