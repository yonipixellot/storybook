<template>
  <div class="player-select">
    <!-- Header -->
    <header class="player-select__header">
      <!-- Client logo -->
      <div class="player-select__logo">
        <img v-if="logoUrl" :src="logoUrl" alt="Team logo" class="player-select__logo-img" />
        <div v-else class="player-select__logo-placeholder">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gray-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="m21 15-5-5L5 21"/>
          </svg>
        </div>
      </div>
      <button class="player-select__cancel focus-ring" @click="$emit('cancel')">Skip</button>
    </header>

    <!-- Content -->
    <main class="player-select__content">
      <h1 class="player-select__title">{{ title }}</h1>
      <p class="player-select__description">{{ description }}</p>
      <h2 class="player-select__team-name">{{ teamName }}</h2>

      <JerseyGrid
        :jerseys="jerseys"
        :selected="selectedJerseys"
        :colors="jerseyColors"
        :aria-label="jerseyGridLabel"
        @toggle="handleToggle"
      />

      <button
        v-if="showSeeAll"
        class="player-select__see-all focus-ring"
        @click="$emit('seeAll')"
      >
        See All
        <ChevronDown :size="16" aria-hidden="true" />
      </button>
    </main>

    <!-- Footer -->
    <footer class="player-select__footer">
      <AppButton
        :disabled="selectedJerseys.length === 0"
        @click="$emit('finish', selectedJerseys)"
      >
        {{ selectedJerseys.length > 0
          ? `Continue (${selectedJerseys.length} selected)`
          : 'Select players to continue' }}
      </AppButton>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import JerseyGrid from '../JerseyGrid/JerseyGrid.vue'
import AppButton from '../AppButton/AppButton.vue'

const props = withDefaults(defineProps<{
  /** Client/team logo URL — shown in the top-left header */
  logoUrl?:        string
  /** Page title */
  title?:          string
  /** Description text */
  description?:    string
  /** Team name section heading */
  teamName?:       string
  /** All jersey numbers to display */
  jerseys?:        (string | number)[]
  /** Pre-selected jersey numbers */
  defaultSelected?: (string | number)[]
  /** Map of jersey number → hex color */
  jerseyColors?:   Record<string | number, string>
  jerseyGridLabel?: string
  /** Show "See All" button */
  showSeeAll?:     boolean
}>(), {
  logoUrl:         '',
  title:           'Select the players you want to follow',
  description:     "To personalize your experience, choose the player's jersey number you want to follow.",
  teamName:        'Maccabi Kiryat Gat',
  jerseys:         () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  defaultSelected: () => [],
  jerseyColors:    () => ({}),
  jerseyGridLabel: 'Select player jersey numbers',
  showSeeAll:      true,
})

const emit = defineEmits<{
  cancel:  []
  finish:  [selected: (string | number)[]]
  seeAll:  []
}>()

const selectedJerseys = ref<(string | number)[]>([...props.defaultSelected])

function handleToggle(num: string | number) {
  const idx = selectedJerseys.value.indexOf(num)
  if (idx > -1) {
    selectedJerseys.value.splice(idx, 1)
  } else {
    selectedJerseys.value.push(num)
  }
}
</script>

<style scoped>
.player-select {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-white);
  font-family: var(--font-family-base);
  max-width: 430px;
  margin: 0 auto;
}

.player-select__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px var(--space-lg) 0;
  height: 64px;
  flex-shrink: 0;
}

.player-select__cancel {
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  padding: var(--space-xs2) var(--space-sm);
  border-radius: var(--radius-md);
  outline: none;
  transition: background var(--duration-fast);
}

.player-select__cancel:hover {
  background: var(--color-gray-100);
}

.player-select__cancel:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.player-select__content {
  flex: 1;
  padding: var(--space-2xl) var(--space-lg) 90px;
  width: 100%;
  box-sizing: border-box;
}

.player-select__logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.player-select__logo-img {
  width: 42px;
  height: 42px;
  object-fit: contain;
  border-radius: var(--radius-sm);
}

.player-select__logo-placeholder {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-100);
  border-radius: var(--radius-sm);
}

.player-select__title {
  margin: 0 0 12px;
  font-size: var(--text-h1);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  line-height: 1.25;
  text-align: center;
}

.player-select__description {
  margin: 0 0 var(--space-xl);
  font-size: var(--text-sm);
  font-weight: var(--font-regular);
  color: var(--color-gray-500);
  line-height: 1.5;
  text-align: center;
}

.player-select__team-name {
  margin: var(--space-xl) 0 var(--space-md);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-dark-text);
}

.player-select__see-all {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs2);
  width: 100%;
  height: 40px;
  margin: var(--space-lg) 0;
  background: var(--color-gray-100);
  border: none;
  border-radius: var(--radius-chip);
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  cursor: pointer;
  outline: none;
  transition: background var(--duration-fast);
}

.player-select__see-all:hover {
  background: var(--color-gray-200);
}

.player-select__see-all:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.player-select__footer {
  position: sticky;
  bottom: 0;
  padding: var(--space-lg);
  border-top: 1px solid var(--color-gray-200);
  background: var(--color-white);
  flex-shrink: 0;
}
</style>
