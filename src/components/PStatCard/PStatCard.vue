<template>
  <div class="psc">
    <!-- Multi-line label -->
    <div v-if="labelLines && labelLines.length" class="psc__label">
      <div v-for="(line, i) in labelLines" :key="i">{{ line }}</div>
    </div>
    <!-- Single-line label -->
    <div v-else class="psc__label">{{ label }}</div>

    <!-- Value -->
    <div class="psc__value">{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  labelLines?: string[]
  value?: string
}>(), {
  label: 'Stat',
  value: '0',
})
</script>

<style scoped>
.psc {
  flex: 1;
  background: var(--color-card-bg);
  padding: var(--space-md);
  border-radius: var(--radius-badge);
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
}

.psc__label {
  font-family: var(--font-family-base);
  font-size: var(--text-2xs);
  font-weight: var(--font-medium);
  color: var(--color-gray-500);
  line-height: 16px;
}

.psc__value {
  font-family: var(--font-family-base);
  font-size: var(--text-2xl); /* DS: 24px, not 22px (--text-xl) */
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  line-height: normal;
  margin-top: auto;
}
</style>
