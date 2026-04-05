<template>
  <div class="sg" role="group" aria-label="Statistics">
    <PStatCard
      v-for="(stat, idx) in stats"
      :key="idx"
      :label="stat.label"
      :label-lines="stat.labelLines"
      :value="stat.value"
    />
  </div>
</template>

<script setup lang="ts">
import PStatCard from '../PStatCard/PStatCard.vue'

export interface StatItem {
  label?: string
  labelLines?: string[]
  value: string
}

withDefaults(defineProps<{
  stats?: StatItem[]
}>(), {
  stats: () => [
    { labelLines: ['Minutes', 'Played'], value: '1245' },
    { labelLines: ['Games',   'Played'], value: '64'   },
    { labelLines: ['Tournaments', 'Played'], value: '18' },
  ],
})
</script>

<style scoped>
.sg {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-md);
}
</style>
