<template>
  <div class="sb">
    <Search
      :size="iconSize"
      class="sb__icon"
      :class="{ 'sb__icon--disabled': disabled }"
      aria-hidden="true"
    />
    <input
      class="sb__input"
      :class="{
        'sb__input--focused': focused,
        'sb__input--disabled': disabled,
        'sb__input--readonly': readonly,
      }"
      :placeholder="placeholder"
      :value="modelValue"
      :readonly="readonly"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="focused = true"
      @blur="focused = false"
    />
    <button
      v-if="modelValue && clearable && !disabled"
      class="sb__clear"
      aria-label="Clear search"
      @click="$emit('update:modelValue', '')"
    >
      <X :size="14" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, X } from 'lucide-vue-next'

withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  clearable?:   boolean
  readonly?:    boolean
  disabled?:    boolean
  iconSize?:    number
}>(), {
  modelValue:  '',
  placeholder: 'Search any team or competition...',
  clearable:   true,
  readonly:    false,
  disabled:    false,
  iconSize:    18,
})

defineEmits<{ 'update:modelValue': [value: string] }>()

const focused = ref(false)
</script>

<style scoped>
.sb {
  position: relative;
  width: 100%;
}

.sb__icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-dark-text); /* DS: icon inherits container color (#161616), not gray-400 */
}

.sb__icon--disabled {
  color: var(--color-gray-200);
}

.sb__input {
  width: 100%;
  padding: 12px 12px 12px 42px;
  border-radius: var(--radius-pill);
  border: 2px solid transparent;
  background: var(--color-gray-50);
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  color: var(--color-dark-text);
  outline: none;
  box-sizing: border-box;
  transition: border-color var(--duration-fast);
}

.sb__input--focused {
  border-color: var(--color-primary);
}

.sb__input--disabled {
  background: var(--color-gray-100);
  color: var(--color-gray-300);
  opacity: 0.6;
  cursor: not-allowed;
}

.sb__input--readonly {
  color: var(--color-gray-400);
  cursor: pointer;
}

.sb__input:not(.sb__input--disabled):has(+ .sb__clear) {
  padding-right: 40px;
}

.sb__clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-400);
}

.sb__clear:hover {
  color: var(--color-dark-text);
}

.sb__clear:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-xs);
}
</style>
