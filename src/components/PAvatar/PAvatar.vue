<template>
  <div class="pa" role="img" :aria-label="initials" :style="{ width: size + 'px', height: size + 'px', fontSize: fontSize + 'px' }">
    {{ initials }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  initials?: string
  size?:     number
}>(), {
  initials: 'BR',
  size:     40,
})

const fontSize = computed(() => Math.round(props.size * 0.38))
</script>

<style scoped>
.pa {
  border-radius: var(--radius-full);
  background: var(--color-gray-500);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font-family: var(--font-family-base);
  font-weight: var(--font-bold);
  flex-shrink: 0;
}
</style>
