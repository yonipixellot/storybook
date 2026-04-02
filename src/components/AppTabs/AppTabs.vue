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
  border-radius: 16px;
  padding: 4px;
  border: none;
  gap: 0;
}

.app-tabs--pill .app-tabs__btn {
  flex: 1 1 0%;
  background-color: transparent;
  color: var(--color-gray-400);
  border-radius: 16px;
  height: 38px;
  padding: 1px 6px;
  font-size: 15px;
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
}

.app-tabs--pill .app-tabs__btn--disabled {
  color: var(--color-gray-300);
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Underline Variant ── */
.app-tabs--underline {
  display: flex;
  gap: 24px;
  padding: 0 16px;
  border-bottom: 1px solid var(--color-gray-100);
  background-color: transparent;
  border-radius: 0;
}

.app-tabs--underline .app-tabs__btn {
  background-color: transparent;
  color: var(--color-gray-400);
  border-bottom: none;
  padding: 16px 0;
  font-size: 15px;
  font-weight: 500;
  font-family: var(--font-family-base);
  border: none;
  cursor: pointer;
  outline: none;
  transition: all var(--duration-fast);
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
  color: var(--color-black);
  border-bottom: 3px solid;
  padding: 16px 0;
}

.app-tabs--underline .app-tabs__btn--disabled {
  color: var(--color-gray-300);
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
