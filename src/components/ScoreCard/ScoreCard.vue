<template>
  <div class="score-card">
    <div class="score-card__row">
      <!-- Left team -->
      <div class="score-card__side score-card__side--left">
        <div class="score-card__logo-score">
          <div class="score-card__logo"></div>
          <span class="score-card__score">{{ homeTeam.score }}</span>
        </div>
        <span class="score-card__name">{{ homeTeam.name }}</span>
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
          <span class="score-card__score">{{ awayTeam.score }}</span>
          <div class="score-card__logo"></div>
        </div>
        <span class="score-card__name">{{ awayTeam.name }}</span>
        <span v-if="awayTeam.standing" class="score-card__standing">{{ awayTeam.standing }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TeamInfo {
  name: string
  score: number | string
  standing?: string
}

withDefaults(defineProps<{
  homeTeam: TeamInfo
  awayTeam: TeamInfo
  status?: string
  date?: string
}>(), {
  status: 'Final',
  date: '',
})
</script>

<style scoped>
.score-card {
  background-color: var(--color-gray-100);
  border-radius: 14px;
  padding: 16px;
  font-family: var(--font-family-base);
}

.score-card__row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.score-card__side {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  gap: 12px;
}

.score-card__logo {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--color-white);
  flex-shrink: 0;
}

.score-card__score {
  font-size: 28px;
  font-weight: 400;
  color: var(--color-black);
}

.score-card__name {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-black);
}

.score-card__standing {
  font-size: 12px;
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
  font-size: 12px;
  font-weight: 400;
  color: var(--color-gray-500);
}

.score-card__date {
  font-size: 12px;
  font-weight: 400;
  color: var(--color-gray-500);
}
</style>
