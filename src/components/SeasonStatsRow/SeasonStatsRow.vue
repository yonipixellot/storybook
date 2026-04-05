<template>
  <div class="ssr" role="group" aria-label="Season statistics">
    <PStatCard
      v-for="(stat, idx) in stats"
      :key="idx"
      :label="stat.label"
      :value="stat.value"
    />
  </div>
</template>

<script setup lang="ts">
import PStatCard from '../PStatCard/PStatCard.vue'

export interface SeasonStat {
  label: string
  value: string
}

withDefaults(defineProps<{
  stats?: SeasonStat[]
}>(), {
  stats: () => [
    { label: 'MPG', value: '23.4' },
    { label: 'PPG', value: '18.6' },
    { label: 'APG', value: '4.5'  },
    { label: 'RPG', value: '3.2'  },
  ],
})
</script>

<style scoped>
.ssr {
  display: flex;
  gap: var(--space-md);
}
</style>
