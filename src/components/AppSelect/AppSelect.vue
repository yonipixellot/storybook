<template>
  <div class="app-select-wrapper">
    <select
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      :disabled="disabled"
      :class="{ 'error': error }"
      class="app-select"
    >
      <option value="" disabled selected hidden>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
    <svg
      class="chevron-icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span v-if="error && errorMsg" class="error-message">{{ errorMsg }}</span>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string
  value: string
}

defineProps<{
  modelValue?: string
  placeholder?: string
  ariaLabel?: string
  options: Option[]
  error?: boolean
  errorMsg?: string
  disabled?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.app-select-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.app-select {
  width: 100%;
  height: var(--size-input-height);
  padding: var(--space-xs) var(--space-lg);
  padding-right: 40px;
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  font-family: var(--font-family-base);
  background-color: var(--color-gray-100);
  color: var(--color-dark-text); /* DS: selected text = dark-text, not gray-400 */
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  appearance: none;
  cursor: pointer;
  transition: all var(--duration-base) var(--easing-standard);
  box-sizing: border-box;
}

.app-select:hover:not(:disabled) {
  background-color: var(--color-gray-200);
  border: 2px solid transparent;
}

.app-select:focus-visible {
  outline: 2px solid var(--color-primary); /* DS: outline, not border-swap */
  outline-offset: 2px;
}

.app-select.error {
  background-color: var(--color-gray-100);
  border: 2px solid var(--color-error-red); /* DS: use --color-error-red (has dark mode override) */
}

.app-select:disabled {
  background-color: var(--color-gray-overlay);
  border: 2px solid transparent;
  color: var(--color-gray-400);
  cursor: not-allowed;
  opacity: 0.5;
}

.chevron-icon {
  position: absolute;
  right: 14px;
  top: 15px;
  color: var(--color-gray-400);
  pointer-events: none;
  flex-shrink: 0;
}

.error-message {
  display: block;
  color: var(--color-error-red); /* DS: consistent with --color-error-red (has dark mode override) */
  font-size: var(--text-caption);
  padding-left: 16px;
  margin-top: 4px;
  font-family: var(--font-family-base);
}
</style>