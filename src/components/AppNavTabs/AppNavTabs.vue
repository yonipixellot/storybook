<template>
  <nav class="ant" role="navigation" :aria-label="ariaLabel">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="ant__tab"
      :class="{ 'ant__tab--active': modelValue === tab.id }"
      :aria-current="modelValue === tab.id ? 'page' : undefined"
      @click="$emit('update:modelValue', tab.id)"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<script setup lang="ts">
export interface NavTab {
  id:    string
  label: string
}

withDefaults(defineProps<{
  tabs?:       NavTab[]
  modelValue?: string
  ariaLabel?:  string
}>(), {
  tabs: () => [
    { id: 'all',      label: 'All' },
    { id: 'nbl1',     label: 'NBL1' },
    { id: 'wnbl',     label: 'WNBL' },
    { id: 'domestic', label: 'Domestic' },
  ],
  modelValue: 'all',
  ariaLabel:  'Section navigation',
})

defineEmits<{ 'update:modelValue': [id: string] }>()
</script>

<style scoped>
.ant {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.ant__tab {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-sm) 0;
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-regular);
  color: var(--color-gray-500);
  white-space: nowrap;
  position: relative;
  transition: color var(--duration-fast) var(--easing-standard);
}

.ant__tab::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-primary);
  border-radius: 1px;
  transform: scaleX(0);
  transition: transform var(--duration-fast) var(--easing-standard);
}

.ant__tab:hover {
  color: var(--color-dark-text);
}

.ant__tab:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
  border-radius: var(--radius-sm);
}

.ant__tab--active {
  color: var(--color-dark-text);
  font-weight: var(--font-semibold);
}

.ant__tab--active::after {
  transform: scaleX(1);
}
</style>
