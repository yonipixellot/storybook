<template>
  <button class="psal" :aria-label="label" @click="$emit('click')">
    {{ label }}
    <svg aria-hidden="true" width="8" height="8" viewBox="0 0 8 8" fill="none" class="psal__chevron">
      <path
        d="M2 1.5L5 4L2 6.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'See all',
})

defineEmits<{ click: [] }>()
</script>

<style scoped>
.psal {
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-link-blue);
  padding: 0;
}

.psal:hover {
  text-decoration: underline;
}
.psal:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-xs);
}

.psal__chevron {
  flex-shrink: 0;
}
</style>
