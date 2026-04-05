<template>
  <div
    class="live-game-card"
    role="article"
    :aria-label="`Live game: ${homeTeam.name} vs ${awayTeam.name}`"
    :style="{ cursor: clickable ? 'pointer' : 'default' }"
  >
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
            <PTeamLogo :name="homeTeam.name" :logoUrl="homeTeam.logoUrl" :size="28" />
            <span class="live-game-card__name live-game-card__name--leading">{{ homeTeam.name }}</span>
          </div>
          <span class="live-game-card__score">{{ homeTeam.score }}</span>
        </div>

        <!-- Away team -->
        <div class="live-game-card__row">
          <div class="live-game-card__team">
            <PTeamLogo :name="awayTeam.name" :logoUrl="awayTeam.logoUrl" :size="28" />
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
import PTeamLogo from '../PTeamLogo/PTeamLogo.vue'

interface TeamInfo {
  name:     string
  score:    number | string
  logoUrl?: string   // optional real logo — falls back to PTeamLogo tinted initial
}

withDefaults(defineProps<{
  homeTeam: TeamInfo
  awayTeam: TeamInfo
  date:     string
  league?:  string
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
  border-radius: var(--radius-card);
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
  font-size: var(--text-caption);
  font-weight: 600;
  font-family: var(--font-family-system); /* DS badge uses system font — matches AppBadge; Red Hat adds 2px to height */
  border-radius: var(--radius-badge);
  padding: 4px 12px;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.live-game-card__dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background-color: var(--color-white);
  animation: liveDotFlicker 1.5s ease-in-out infinite;
}

.live-game-card__date {
  font-size: var(--text-caption);
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
  gap: var(--space-sm2);
}

.live-game-card__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
}

.live-game-card__team {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex: 1;
  min-width: 0;
}

/* logo: PTeamLogo component handles circle shape, tinting, initial, and logoUrl image */

.live-game-card__name {
  font-size: var(--text-base);
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
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-black);
}

.live-game-card__score--away {
  color: var(--color-gray-500);
}

.live-game-card__league {
  display: block;
  margin-top: 10px;
  font-size: var(--text-micro);
  font-weight: 500;
  color: var(--color-gray-400);
}
</style>
