<template>
  <button
    class="ji"
    :class="{ 'ji--selected': selected }"
    :aria-label="`Jersey number ${number}`"
    :aria-pressed="selected"
    @click="$emit('click')"
    @focus="focused = true"
    @blur="focused = false"
  >
    <!-- Jersey SVG -->
    <svg viewBox="0 0 73 73" fill="none" class="ji__svg" aria-hidden="true">
      <path
        :d="JERSEY_PATH"
        :fill="color"
        :stroke="strokeColor"
        :stroke-width="selected ? STROKE_HEAVY : STROKE_THICK"
      />
    </svg>

    <!-- Selected checkmark badge -->
    <div v-if="selected" class="ji__check-badge" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>

    <!-- Jersey number -->
    <span class="ji__number" :style="numberStyle">{{ number }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

/** Jersey SVG path (73×73 viewBox) */
const JERSEY_PATH = 'M 30,6 Q 36.5,22 43,6 L 51,6 Q 51,28 59,28 L 59,62 Q 59,67 55,67 L 18,67 Q 14,67 14,62 L 14,28 Q 22,28 22,6 L 30,6 Z'
const STROKE_THICK = 1.7
const STROKE_HEAVY = 2.5

/** Returns true if the hex color has lightness > ~73% */
function isLight(hex: string): boolean {
  const h = hex.replace('#', '')
  if (h.length < 6) return false
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return 0.299 * r + 0.587 * g + 0.114 * b > 186
}

const props = withDefaults(defineProps<{
  number?:   number
  selected?: boolean
  /** Jersey fill color (hex) */
  color?:    string
}>(), {
  number:   7,
  selected: false,
  color:    '#D0142C',
})

defineEmits<{ click: [] }>()

const focused = ref(false)

const strokeColor = computed(() => {
  if (props.selected) return 'var(--color-success-green)'
  return isLight(props.color ?? '#D0142C')
    ? 'var(--color-gray-300)'
    : 'var(--color-white)'
})

const numberStyle = computed(() => ({
  color: isLight(props.color ?? '#D0142C')
    ? 'var(--color-dark-text)'
    : 'var(--color-white)',
}))
</script>

<style scoped>
.ji {
  position: relative;
  width: 73px;
  height: 73px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform var(--duration-fast);
  border-radius: var(--radius-md);
}

.ji:hover {
  transform: scale(1.05);
}

.ji--selected {
  transform: scale(1.1);
}

/* ── Jersey SVG ── */
.ji__svg {
  width: 100%;
  height: 100%;
}

/* ── Selected checkmark badge ── */
.ji__check-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  background: var(--color-success-green);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Jersey number ── */
.ji__number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  font-family: var(--font-family-base);
  font-size: var(--text-jersey);
  font-weight: var(--font-bold);
  pointer-events: none;
  line-height: 1;
}
</style>
