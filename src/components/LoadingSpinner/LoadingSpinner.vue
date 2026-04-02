<template>
  <div
    class="ls"
    role="status"
    :aria-label="label"
    :style="spinnerStyle"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Spinner diameter in px */
  size?:  number
  label?: string
}>(), {
  size:  24,
  label: 'Loading…',
})

const spinnerStyle = computed(() => ({
  width:       `${props.size}px`,
  height:      `${props.size}px`,
  borderWidth: `${Math.max(2, Math.round(props.size / 8))}px`,
}))
</script>

<style scoped>
.ls {
  border-style: solid;
  border-color: var(--color-gray-100);
  border-top-color: var(--color-primary);
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
