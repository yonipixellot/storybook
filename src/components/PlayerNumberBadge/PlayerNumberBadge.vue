<template>
  <!-- Photo (if provided and not errored) -->
  <div
    v-if="photoUrl && !imgError"
    class="pnb pnb--photo"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <img
      :src="photoUrl"
      :alt="`#${number}`"
      class="pnb__img"
      @error="imgError = true"
    />
  </div>

  <!-- Number badge -->
  <div
    v-else
    class="pnb"
    role="img"
    :aria-label="`#${number}`"
    :style="{
      width:      size + 'px',
      height:     size + 'px',
      background: resolvedColor,
    }"
  >
    <span
      class="pnb__number"
      :style="{
        fontSize:  numberFontSize + 'px',
        color:     textColor,
      }"
    >{{ number }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  number?:    number | string
  size?:      number
  teamColor?: string
  photoUrl?:  string
}>(), {
  number: 1,
  size:   40,
})

const imgError = ref(false)

// Fallback to primary token value if teamColor not provided
const resolvedColor = computed(() => props.teamColor ?? 'var(--color-primary)')

const numberFontSize = computed(() => Math.round(props.size * 0.4))

/** Returns true if the hex color is "light" (luminance > 0.5) */
function isLight(hex: string): boolean {
  if (!hex || !hex.startsWith('#')) return false
  const h = hex.replace('#', '')
  const r = parseInt(h.length === 3 ? h[0] + h[0] : h.substring(0, 2), 16)
  const g = parseInt(h.length === 3 ? h[1] + h[1] : h.substring(2, 4), 16)
  const b = parseInt(h.length === 3 ? h[2] + h[2] : h.substring(4, 6), 16)
  return 0.299 * r + 0.587 * g + 0.114 * b > 186
}

const textColor = computed(() => {
  const color = props.teamColor
  if (!color) return 'var(--color-white)'
  return isLight(color) ? 'var(--color-dark-text)' : 'var(--color-white)'
})
</script>

<style scoped>
.pnb {
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.pnb--photo {}

.pnb__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-full);
}

.pnb__number {
  font-family: var(--font-family-base);
  font-weight: var(--font-bold);
  line-height: 1;
}
</style>
