<template>
  <div class="jg" role="group" aria-label="Select jersey number">
    <JerseyItem
      v-for="num in resolvedNumbers"
      :key="num"
      :number="num"
      :color="color"
      :selected="selectedSet.has(num)"
      @click="toggle(num)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import JerseyItem from '../JerseyItem/JerseyItem.vue'

const DEFAULT_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8]

const props = withDefaults(defineProps<{
  numbers?:  number[]
  /** Initial selected jersey numbers */
  selected?: number[]
  /** Jersey fill color (hex) */
  color?:    string
}>(), {
  color: '#D0142C',
})

const emit = defineEmits<{ change: [selected: number[]] }>()

const internalSelected = ref<Set<number>>(new Set(props.selected ?? []))

const resolvedNumbers = computed(() => props.numbers ?? DEFAULT_NUMBERS)

const selectedSet = computed(() => internalSelected.value)

function toggle(num: number) {
  const s = new Set(internalSelected.value)
  if (s.has(num)) s.delete(num)
  else s.add(num)
  internalSelected.value = s
  emit('change', [...s])
}
</script>

<style scoped>
.jg {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-xl);
  max-width: 398px;
  padding: 0 var(--space-xs);
}
</style>
