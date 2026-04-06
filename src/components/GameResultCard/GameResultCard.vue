<template>
  <div
    class="game-result-card"
    :style="{ cursor: clickable ? 'pointer' : 'default' }"
    role="article"
    :aria-label="`${homeTeam.name} ${homeTeam.score} vs ${awayTeam.name} ${awayTeam.score}, ${month} ${day} ${year}`"
  >
    <!-- Date column -->
    <div class="game-result-card__date-col">
      <div class="game-result-card__date-inner">
        <span class="game-result-card__day">{{ day }}</span>
        <span class="game-result-card__month">{{ month }}</span>
        <span class="game-result-card__year">{{ year }}</span>
      </div>
    </div>

    <!-- Right content -->
    <div class="game-result-card__content">
      <!-- Home team -->
      <div class="game-result-card__row">
        <div class="game-result-card__team">
          <PTeamLogo :name="homeTeam.name" :logoUrl="homeTeam.logoUrl" :size="28" />
          <span class="game-result-card__name game-result-card__name--home">{{ homeTeam.name }}</span>
        </div>
        <span class="game-result-card__score game-result-card__score--home">{{ homeTeam.score }}</span>
      </div>

      <!-- Away team -->
      <div class="game-result-card__row">
        <div class="game-result-card__team">
          <PTeamLogo :name="awayTeam.name" :logoUrl="awayTeam.logoUrl" :size="28" />
          <span class="game-result-card__name game-result-card__name--away">{{ awayTeam.name }}</span>
        </div>
        <span class="game-result-card__score game-result-card__score--away">{{ awayTeam.score }}</span>
      </div>

      <!-- League + Highlights badge -->
      <div class="game-result-card__footer">
        <span v-if="league" class="game-result-card__league">{{ league }}</span>
        <span v-else></span>
        <button v-if="hasHighlights" class="game-result-card__highlights">
          <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
            <polygon points="0,0 8,5 0,10" />
          </svg>
          HIGHLIGHTS
        </button>
      </div>
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
  day: string | number
  month: string
  year: string | number
  league?: string
  hasHighlights?: boolean
  clickable?: boolean
}>(), {
  hasHighlights: true,
  clickable: true,
})
</script>

<style scoped>
.game-result-card {
  display: flex;
  gap: var(--space-lg);
  border-radius: var(--radius-card);
  overflow: visible;
  background-color: var(--color-gray-100);
  font-family: var(--font-family-system); /* DS uses system font throughout this card */
  min-height: 116px;
}

.game-result-card__date-col {
  width: 72px;
  flex: 0 0 72px;
  background-color: var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  /* self-clips into the card's left rounded corners without overflow:hidden on parent */
  border-radius: var(--radius-card) 0 0 var(--radius-card);
}

.game-result-card__date-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
}

.game-result-card__day {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-black);
}

.game-result-card__month {
  font-size: var(--text-caption);
  font-weight: 700;
  color: var(--color-black);
  text-transform: uppercase;
}

.game-result-card__year {
  font-size: var(--text-micro);
  font-weight: 400;
  color: var(--color-black);
}

.game-result-card__content {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-sm);
  padding: 0 16px 0 0;
}

.game-result-card__row {
  display: flex;
  align-items: center;
}

.game-result-card__team {
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

/* logo: PTeamLogo component handles circle shape, tinting, initial, and logoUrl image */

.game-result-card__name {
  font-size: var(--text-base);
  font-weight: 400;
}

.game-result-card__name--home {
  color: var(--color-black);
}

.game-result-card__name--away {
  color: var(--color-gray-500);
}

.game-result-card__score {
  font-size: var(--text-base);
  font-weight: 400;
}

.game-result-card__score--home {
  color: var(--color-black);
}

.game-result-card__score--away {
  color: var(--color-gray-500);
}

.game-result-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.game-result-card__league {
  font-size: var(--text-micro);
  font-weight: 400;
  color: var(--color-gray-400);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  flex: 1;
  margin-right: var(--space-xs);
}

.game-result-card__highlights {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  background-color: var(--color-gray-500);
  color: var(--color-premium-yellow);
  border: 0.5px solid var(--color-premium-yellow);
  border-radius: var(--radius-badge);
  padding: 4px 12px;
  font-size: var(--text-2xs);
  font-weight: 700;
  /* inherits var(--font-family-system) from .game-result-card — no override needed */
  cursor: pointer;
  outline: none;
  line-height: 1;
}
.game-result-card__highlights:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── Dark Mode ── */
[data-theme="dark"] .game-result-card__highlights {
  background-color: var(--color-gray-200); /* DS dark: same pattern as AppBadge highlights — gray-500 → gray-200 (#444444) */
}
</style>
