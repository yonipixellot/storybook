<template>
  <div class="live-game-card" :style="{ cursor: clickable ? 'pointer' : 'default' }">
    <!-- Header: LIVE badge + date -->
    <div class="live-game-card__header">
      <div class="live-game-card__badge">
        <span class="live-game-card__dot"></span>
        <span>LIVE</span>
      </div>
      <span class="live-game-card__date">{{ date }}</span>
    </div>

    <!-- Body: team rows + league -->
    <div class="live-game-card__body">
      <div class="live-game-card__teams">
        <!-- Home team -->
        <div class="live-game-card__row">
          <div class="live-game-card__team">
            <div class="live-game-card__logo" :style="{ backgroundColor: homeTeam.logoColor || '#fff' }">
              {{ homeTeam.logoInitial }}
            </div>
            <span class="live-game-card__name live-game-card__name--leading">{{ homeTeam.name }}</span>
          </div>
          <span class="live-game-card__score">{{ homeTeam.score }}</span>
        </div>

        <!-- Away team -->
        <div class="live-game-card__row">
          <div class="live-game-card__team">
            <div class="live-game-card__logo" :style="{ backgroundColor: awayTeam.logoColor || '#fff' }">
              {{ awayTeam.logoInitial }}
            </div>
            <span class="live-game-card__name">{{ awayTeam.name }}</span>
          </div>
          <span class="live-game-card__score live-game-card__score--away">{{ awayTeam.score }}</span>
        </div>
      </div>

      <span v-if="league" class="live-game-card__league">{{ league }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TeamInfo {
  name: string
  score: number | string
  logoInitial: string
  logoColor?: string
}

withDefaults(defineProps<{
  homeTeam: TeamInfo
  awayTeam: TeamInfo
  date: string
  league?: string
  clickable?: boolean
}>(), {
  clickable: true,
})
</script>

<style scoped>
@keyframes liveDotFlicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.live-game-card {
  border-radius: 14px;
  overflow: hidden;
  font-family: var(--font-family-base);
}

.live-game-card__header {
  background-color: var(--color-gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}

.live-game-card__badge {
  background-color: var(--color-live-red);
  color: var(--color-white);
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.live-game-card__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-white);
  animation: liveDotFlicker 1.5s ease-in-out infinite;
}

.live-game-card__date {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-black);
}

.live-game-card__body {
  background-color: var(--color-gray-100);
  padding: 12px 16px;
}

.live-game-card__teams {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.live-game-card__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.live-game-card__team {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.live-game-card__logo {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  color: var(--color-dark-text);
  flex-shrink: 0;
}

.live-game-card__name {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-gray-500);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.live-game-card__name--leading {
  color: var(--color-black);
}

.live-game-card__score {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-black);
}

.live-game-card__score--away {
  color: var(--color-gray-500);
}

.live-game-card__league {
  display: block;
  margin-top: 10px;
  font-size: 10px;
  font-weight: 500;
  color: var(--color-gray-400);
}
</style>
