<template>
  <div :class="['app-tabs', `app-tabs--${variant}`]" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="['app-tabs__btn', { 'app-tabs__btn--active': active === tab.value, 'app-tabs__btn--disabled': tab.disabled }]"
      :style="active === tab.value && variant === 'underline'
        ? { borderBottomColor: accentColor }
        : {}"
      role="tab"
      :aria-selected="active === tab.value"
      :aria-disabled="tab.disabled"
      :aria-controls="`tab-panel-${tab.value}`"
      :disabled="tab.disabled"
      @click="!tab.disabled && $emit('update:active', tab.value)">
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface TabItem {
  label: string
  value: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  tabs:        TabItem[]
  active:      string
  variant?:    'pill' | 'underline'
  accentColor?: string
}>(), {
  variant: 'pill',
  accentColor: '#EF4444',
})

defineEmits<{ 'update:active': [value: string] }>()
</script>

<style scoped>
/* ── Pill Variant ── */
.app-tabs--pill {
  display: flex;
  background-color: var(--color-gray-100);
  border-radius: var(--radius-md);
  padding: 4px;
  border: none;
  gap: 0;
}

.app-tabs--pill .app-tabs__btn {
  flex: 1 1 0%;
  background-color: transparent;
  color: var(--color-gray-400);
  border-radius: var(--radius-md);
  height: 38px;
  padding: 1px 6px;
  font-size: var(--text-sm);
  font-weight: 500;
  font-family: var(--font-family-base);
  border: none;
  cursor: pointer;
  outline: none;
  transition: all var(--duration-fast);
}

.app-tabs--pill .app-tabs__btn:hover:not(.app-tabs__btn--disabled) {
  background-color: var(--color-gray-300);
  color: var(--color-gray-500);
}

.app-tabs--pill .app-tabs__btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.app-tabs--pill .app-tabs__btn--active {
  background-color: var(--color-white);
  color: var(--color-black);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* DS-extracted: active pill elevation */
}

.app-tabs--pill .app-tabs__btn--disabled {
  color: var(--color-gray-300);
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Underline Variant ── */
.app-tabs--underline {
  display: flex;
  gap: 0;
  padding: 0 var(--space-lg);
  border-bottom: 1px solid var(--color-gray-100); /* DS: 1px + gray-100 (#EDEDED) */
  background-color: transparent;
  border-radius: 0;
}

.app-tabs--underline .app-tabs__btn {
  flex: 1 1 0%;
  background-color: transparent;
  color: var(--color-gray-400);
  border-bottom: none;
  padding: 16px 0;
  font-size: var(--text-sm);
  font-weight: 500;
  font-family: var(--font-family-base);
  border: none;
  cursor: pointer;
  outline: none;
  transition: all var(--duration-fast);
  text-align: center;
}

.app-tabs--underline .app-tabs__btn:hover:not(.app-tabs__btn--disabled) {
  color: var(--color-gray-500);
}

.app-tabs--underline .app-tabs__btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-xs);
}

.app-tabs--underline .app-tabs__btn--active {
  background-color: transparent;
  color: var(--color-dark-text, #161616);
  font-weight: var(--font-semibold);
  border-bottom: 3px solid;
  padding: 16px 0;
}

.app-tabs--underline .app-tabs__btn--disabled {
  color: var(--color-gray-300);
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Dark Mode ── */
[data-theme="dark"] .app-tabs--pill .app-tabs__btn--active {
  /* DS dark: active pill shifts from white to brand-blue */
  background-color: var(--color-primary); /* resolves to #3B8BFF in dark */
  color: var(--color-black); /* resolves to #FFFFFF in dark */
  box-shadow: none;
}
[data-theme="dark"] .app-tabs--underline {
  border-bottom-color: var(--color-gray-300); /* resolves to #555555 in dark — DS: #555555 */
}
</style>
