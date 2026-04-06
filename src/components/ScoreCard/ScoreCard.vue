<template>
  <div
    class="score-card"
    role="article"
    :aria-label="`${homeTeam.name} ${homeTeam.score} – ${awayTeam.name} ${awayTeam.score}, ${status}`"
  >
    <div class="score-card__row">
      <!-- Left team -->
      <div class="score-card__side score-card__side--left">
        <div class="score-card__logo-score">
          <PTeamLogo :name="homeTeam.name" :logoUrl="homeTeam.logoUrl" :size="44" />
          <span class="score-card__score" :style="{ color: homeScoreColor }">{{ homeTeam.score }}</span>
        </div>
        <span class="score-card__name" :style="{ color: homeScoreColor }">{{ homeTeam.name }}</span>
        <span v-if="homeTeam.standing" class="score-card__standing">{{ homeTeam.standing }}</span>
      </div>

      <!-- Center -->
      <div class="score-card__center">
        <span class="score-card__status">{{ status }}</span>
        <span class="score-card__date">{{ date }}</span>
      </div>

      <!-- Right team -->
      <div class="score-card__side score-card__side--right">
        <div class="score-card__logo-score">
          <span class="score-card__score" :style="{ color: awayScoreColor }">{{ awayTeam.score }}</span>
          <PTeamLogo :name="awayTeam.name" :logoUrl="awayTeam.logoUrl" :size="44" />
        </div>
        <span class="score-card__name" :style="{ color: awayScoreColor }">{{ awayTeam.name }}</span>
        <span v-if="awayTeam.standing" class="score-card__standing">{{ awayTeam.standing }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PTeamLogo from '../PTeamLogo/PTeamLogo.vue'

interface TeamInfo {
  name: string
  score: number | string
  standing?: string
  logoUrl?: string
}

const props = withDefaults(defineProps<{
  homeTeam: TeamInfo
  awayTeam: TeamInfo
  status?: string
  date?: string
}>(), {
  status: 'Final',
  date: '',
})

// Gray out the losing team's score (lower number), matching DS behaviour
// DS: winning score = rgb(0,0,0) = --color-black; losing score = rgb(108,108,108) = --color-gray-500
const homeScoreColor = computed(() =>
  Number(props.homeTeam.score) < Number(props.awayTeam.score)
    ? 'var(--color-gray-500)'
    : 'var(--color-black)'
)
const awayScoreColor = computed(() =>
  Number(props.awayTeam.score) < Number(props.homeTeam.score)
    ? 'var(--color-gray-500)'
    : 'var(--color-black)'
)
</script>

<style scoped>
.score-card {
  background-color: var(--color-gray-100);
  border-radius: var(--radius-card);
  padding: 16px;
  font-family: var(--font-family-system); /* DS uses system font, not Red Hat Display */
}

.score-card__row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.score-card__side {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.score-card__side--left {
  align-items: flex-start;
}

.score-card__side--right {
  align-items: flex-end;
}

.score-card__logo-score {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.score-card__score {
  font-size: var(--text-h1);
  font-weight: 400;
  color: var(--color-black);
}

.score-card__name {
  font-size: var(--text-xs);
  font-weight: 400;
  color: var(--color-black);
}

.score-card__standing {
  font-size: var(--text-caption);
  font-weight: 400;
  color: var(--color-gray-500);
}

.score-card__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.score-card__status {
  font-size: var(--text-caption);
  font-weight: 400;
  color: var(--color-gray-500);
}

.score-card__date {
  font-size: var(--text-caption);
  font-weight: 400;
  color: var(--color-gray-500);
}

</style>
