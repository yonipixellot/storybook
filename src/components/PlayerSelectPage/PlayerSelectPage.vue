<template>
  <div class="player-select">
    <!-- Header -->
    <header class="player-select__header">
      <!-- Pixellot Logo -->
      <svg aria-hidden="true" width="42" height="42" viewBox="0 0 235 163" fill="none" style="flex-shrink:0">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M172.002 54.528L161.909 108.355C160.962 113.497 157.913 116.015 152.867 116.015H69.176C64.13 116.015 62.027 113.497 63.078 108.355L73.172 54.528C74.118 49.386 77.167 46.868 82.214 46.868H165.904C170.951 46.868 173.053 49.386 172.002 54.528ZM182.095 0.7H83.265C42.6813 0.7 19.5508 16.1242 13.7682 46.868L0.731 116.12C-5.0516 146.863 12.2963 162.288 52.8798 162.288H151.71C192.294 162.288 215.424 146.863 221.207 116.12L234.244 46.868C240.027 16.1242 222.679 0.7 182.095 0.7Z"
          fill="#00D6FE" />
      </svg>
      <button class="player-select__cancel focus-ring" @click="$emit('cancel')">Cancel</button>
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
  transition: background 0.15s;
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
  padding: var(--space-xxl) var(--space-lg) 90px;
  width: 100%;
  box-sizing: border-box;
}

.player-select__title {
  margin: 0 0 12px;
  font-size: var(--text-h1);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  line-height: 1.25;
}

.player-select__description {
  margin: 0 0 var(--space-xl);
  font-size: var(--text-sm);
  font-weight: var(--font-regular);
  color: var(--color-gray-500);
  line-height: 1.5;
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
  transition: background 0.15s;
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
