<template>
  <!-- With logo -->
  <div v-if="logoUrl" class="ptl ptl--image">
    <img :src="logoUrl" :alt="name" class="ptl__img" />
  </div>

  <!-- Placeholder: deterministic color + initial -->
  <div v-else class="ptl" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :viewBox="`0 0 28 28`" :width="size" :height="size">
      <circle cx="14" cy="14" r="13" :fill="teamColor" opacity="0.15" />
      <circle cx="14" cy="14" r="13" :stroke="teamColor" stroke-width="0.5" fill="none" opacity="0.4" />
      <text
        x="14"
        y="18.5"
        text-anchor="middle"
        font-family="Red Hat Display, sans-serif"
        font-size="14"
        font-weight="700"
        :fill="teamColor"
      >{{ initial }}</text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const TEAM_COLORS = [
  '#D0142C', '#116DFF', '#22C55E', '#E7A610', '#8B5CF6',
  '#0d9488', '#E8332B', '#1877F2', '#DD2A7B', '#0EA5E9',
  '#F97316', '#6366F1',
]

const props = withDefaults(defineProps<{
  size?:    number
  name?:    string
  logoUrl?: string
}>(), {
  size: 28,
  name: '',
})

const teamColor = computed(() => {
  if (!props.name) return TEAM_COLORS[0]
  const hash = [...props.name].reduce((acc, ch) => ((acc << 5) - acc + ch.charCodeAt(0)) | 0, 0)
  return TEAM_COLORS[Math.abs(hash) % TEAM_COLORS.length]
})

const initial = computed(() =>
  props.name ? props.name.charAt(0).toUpperCase() : 'T'
)
</script>

<style scoped>
.ptl {
  border-radius: var(--radius-full);
  background: var(--color-white);
  border: var(--stroke-thin) solid var(--color-bar-track);
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ptl--image {
  width: v-bind("size + 'px'");
  height: v-bind("size + 'px'");
}

.ptl__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-full);
}
</style>
