<template>
  <div class="bh" :style="heroStyle">
    <!-- Logo image -->
    <img
      v-if="logoUrl && !logoError"
      :src="logoUrl"
      :alt="logoAlt"
      class="bh__logo-img"
      :style="{ width: `${logoSize}px`, height: `${logoSize}px` }"
      @error="logoError = true"
    />

    <!-- Placeholder SVG when no logo -->
    <div v-else class="bh__placeholder" :style="placeholderStyle">
      <svg
        :width="logoSize * 1.1"
        :height="logoSize * 1.1"
        viewBox="0 0 80 80"
        fill="none"
        aria-hidden="true"
      >
        <rect x="4" y="4" width="72" height="72" rx="14" fill="rgba(255,255,255,0.2)" />
        <path d="M28 52 L40 28 L52 52 Z" fill="rgba(255,255,255,0.5)" />
        <circle cx="33" cy="35" r="5" fill="rgba(255,255,255,0.5)" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Primary brand color for the gradient top stop (hex string) */
  primaryColor?: string
  /** Optional logo image URL */
  logoUrl?:      string
  logoAlt?:      string
  /** Logo size in px */
  logoSize?:     number
  /** Hero height in px */
  height?:       number
}>(), {
  primaryColor: 'var(--color-hero-bg-raw, #1A3B8A)',
  logoAlt:      'Brand logo',
  logoSize:     80,
  height:       340,
})

const logoError = ref(false)

/** Darken a hex color by 30% (multiply each channel by 0.7) */
function darken30(hex: string): string {
  const h = hex.replace('#', '')
  if (h.length !== 6) return hex
  const r = Math.max(0, Math.round(parseInt(h.substring(0, 2), 16) * 0.7))
  const g = Math.max(0, Math.round(parseInt(h.substring(2, 4), 16) * 0.7))
  const b = Math.max(0, Math.round(parseInt(h.substring(4, 6), 16) * 0.7))
  return `rgb(${r},${g},${b})`
}

const resolvedColor = computed<string>(() => {
  const c = props.primaryColor ?? '#1A3B8A'
  // If it's a CSS variable reference, fall back to the default hex
  return c.startsWith('var(') ? '#1A3B8A' : c
})

const heroStyle = computed(() => ({
  height:           `${props.height}px`,
  background:       `linear-gradient(180deg, ${resolvedColor.value} 0%, ${darken30(resolvedColor.value)} 100%)`,
}))

const placeholderStyle = computed(() => ({
  width:  `${props.logoSize * 2.2}px`,
  height: `${props.logoSize * 2.2}px`,
}))
</script>

<style scoped>
.bh {
  width: 100%;
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.bh__logo-img {
  object-fit: contain;
  border-radius: var(--radius-md);
}

.bh__placeholder {
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.15);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
