<template>
  <div class="vtc" role="tablist" :aria-label="ariaLabel">
    <button
      v-for="chip in chips"
      :key="chip.label"
      role="tab"
      :aria-selected="modelValue === chip.label"
      :disabled="chip.disabled"
      class="vtc__chip"
      :class="{
        'vtc__chip--active': modelValue === chip.label,
        'vtc__chip--inactive': modelValue !== chip.label,
      }"
      @click="!chip.disabled && $emit('update:modelValue', chip.label)"
    >
      <span
        v-if="chip.locked"
        class="vtc__lock"
        aria-hidden="true"
      >
        <svg class="vtc__lock-icon" width="12" height="15" viewBox="0 0 8 10">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.026 4.069H6.738L6.737 2.701C6.736 1.211 5.465-.001 3.903 0 2.341.001 1.07 1.213 1.072 2.703L1.074 4.071H.971C.434 4.072-.001 4.488 0 5v4.072c0 .512.437.928.974.928l6.055-.003c.537 0 .972-.416.972-.928V4.996c0-.512-.437-.928-.974-.928ZM2.118 4.071L2.115 2.703c0-.94.802-1.707 1.788-1.707.987 0 1.789.765 1.789 1.706l.003 1.368H2.118Z" />
        </svg>
      </span>
      <span class="vtc__label">{{ chip.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
export interface VideoChip {
  label: string
  locked?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  chips?: VideoChip[]
  modelValue?: string
  ariaLabel?: string
}>(), {
  chips: () => [
    { label: 'Full Game' },
    { label: 'Condensed Game', locked: true },
    { label: 'Game Highlights' },
  ],
  modelValue: 'Full Game',
  ariaLabel: 'Video type',
})

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<style scoped>
/* ── Row container ── */
.vtc {
  display: flex;
  gap: var(--space-md);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-right: 16px;
}

.vtc::-webkit-scrollbar {
  display: none;
}

/* ── Chip base ── */
.vtc__chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  height: 40px;
  border-radius: var(--radius-chip);
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  white-space: nowrap;
  flex-shrink: 0;
  scroll-snap-align: start;
  transition: background var(--duration-instant) var(--easing-standard);
  outline: none;
}

.vtc__chip:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── Active state ── */
.vtc__chip--active {
  background: var(--color-jersey-red);
  color: #FFFFFF;
  font-weight: var(--font-bold);
}

.vtc__chip--active:hover:not(:disabled) {
  background: var(--color-jersey-red-hover);
}

.vtc__chip--active:active:not(:disabled) {
  background: var(--color-jersey-red-active);
}

/* ── Inactive state ── */
.vtc__chip--inactive {
  background: var(--color-gray-100);
  color: var(--color-black);
  font-weight: var(--font-regular);
}

.vtc__chip--inactive:hover:not(:disabled) {
  background: var(--color-gray-200);
}

.vtc__chip--inactive:active:not(:disabled) {
  background: var(--color-gray-300);
}

/* ── Disabled ── */
.vtc__chip:disabled {
  background: var(--color-gray-overlay);
  color: var(--color-gray-400);
  cursor: not-allowed;
}

/* ── Label ── */
.vtc__label {
  line-height: 1;
}

/* ── Lock icon circle ── */
.vtc__lock {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background: var(--color-premium-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ── Lock SVG fill via CSS (never use fill="hex" attribute) ── */
.vtc__lock-icon {
  fill: var(--color-premium-yellow);
}
</style>
