<template>
  <div class="home-page">
    <!-- Scrollable content -->
    <div class="home-page__scroll">

      <!-- Following strip: circular team + player avatars -->
      <div class="home-page__following-strip" role="list" aria-label="Following">
        <div
          v-for="item in followingAvatars"
          :key="item.id"
          class="home-page__avatar"
          :class="item.isPlayer ? 'home-page__avatar--player' : 'home-page__avatar--team'"
          role="listitem"
          :aria-label="item.name"
        >
          <span class="home-page__avatar-initial">{{ item.initial }}</span>
        </div>
      </div>

      <!-- Hero banner -->
      <div class="home-page__banner">
        <div class="home-page__hero">
          <p class="home-page__hero-text">Every move. Every Play.<br>Your Highlights await.</p>
          <AppButton variant="premium">Notify Me</AppButton>
          <div class="home-page__hero-dots" aria-hidden="true">
            <span class="home-page__hero-dot home-page__hero-dot--active"></span>
            <span class="home-page__hero-dot"></span>
          </div>
        </div>
      </div>

      <!-- Live section -->
      <div class="home-page__section">
        <PSectionHeader title="Live" :see-all="true" />
        <div class="home-page__hscroll" role="list" aria-label="Live games">
          <div v-for="game in liveGames" :key="game.id" class="home-page__hscroll-item" role="listitem">
            <LiveGameCard
              :home-team="game.homeTeam"
              :away-team="game.awayTeam"
              :date="game.date"
              :league="game.league"
            />
          </div>
        </div>
      </div>

      <!-- Recent Games section -->
      <div class="home-page__section">
        <PSectionHeader title="Recent Games" :see-all="false" />
        <div class="home-page__games-list">
          <GameResultCard
            v-for="game in recentGames"
            :key="game.id"
            :home-team="game.homeTeam"
            :away-team="game.awayTeam"
            :day="game.day"
            :month="game.month"
            :year="game.year"
            :league="game.league"
            :has-highlights="game.hasHighlights"
          />
        </div>
        <div class="home-page__see-all">
          <button class="home-page__see-all-btn">See all &rsaquo;</button>
        </div>
      </div>

      <!-- Upcoming section -->
      <div class="home-page__section">
        <PSectionHeader title="Upcoming" :see-all="false" />
        <div class="home-page__games-list">
          <GameResultCard
            v-for="game in upcomingGames"
            :key="game.id"
            :home-team="game.homeTeam"
            :away-team="game.awayTeam"
            :day="game.day"
            :month="game.month"
            :year="game.year"
            :league="game.league"
            :has-highlights="false"
            :clickable="false"
          />
        </div>
        <div class="home-page__see-all">
          <button class="home-page__see-all-btn">See all &rsaquo;</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '../AppButton/AppButton.vue'
import PSectionHeader from '../PSectionHeader/PSectionHeader.vue'
import LiveGameCard from '../LiveGameCard/LiveGameCard.vue'
import GameResultCard from '../GameResultCard/GameResultCard.vue'

const props = withDefaults(defineProps<{
  /** Initial active bottom tab */
  initialActiveTab?: string
}>(), {
  initialActiveTab: 'games',
})

// Following strip avatars (team logo + player photos)
const followingAvatars = [
  { id: 'team',     name: 'S.D Spartans',  initial: 'S', isPlayer: false, color: '#E8332B' },
  { id: 'player-1', name: 'Player #1',     initial: '1', isPlayer: true,  color: '#3B82F6' },
]


const liveGames = [
  {
    id: 1,
    homeTeam: { name: 'Spartans',      score: 12 },
    awayTeam: { name: 'Thunder',       score: 6 },
    date: '21 Nov, 2024',
    league: 'MEN | NBL 1 | League phase | Game 22',
  },
  {
    id: 2,
    homeTeam: { name: 'Spartans',      score: 45 },
    awayTeam: { name: 'Thunder',       score: 38 },
    date: '21 Nov, 2024',
    league: 'MEN | NBL 1 | League phase | Game 22',
  },
]

const recentGames = [
  {
    id: 1,
    homeTeam: { name: 'S.D Spartans',  score: 121 },
    awayTeam: { name: 'Logan Thunder', score: 89 },
    day: 20, month: 'NOV', year: 2024,
    league: 'NBL 1 | League phase | Game 22',
    hasHighlights: true,
  },
  {
    id: 2,
    homeTeam: { name: 'S.D Spartans',  score: 112 },
    awayTeam: { name: 'Ipswich Force', score: 88 },
    day: 13, month: 'NOV', year: 2024,
    league: 'NBL 1 | League phase | Game 22',
    hasHighlights: true,
  },
  {
    id: 3,
    homeTeam: { name: 'S.D Spartans',       score: 104 },
    awayTeam: { name: 'Queens Park Rangers', score: 79 },
    day: 7, month: 'NOV', year: 2024,
    league: 'NBL 1 | League phase | Game 22',
    hasHighlights: true,
  },
]

const upcomingGames = [
  {
    id: 1,
    homeTeam: { name: 'Peterhead',    score: '' },
    awayTeam: { name: 'Queens Park',  score: '' },
    day: 25, month: 'NOV', year: 2024,
    league: 'MEN | NBL 1 | League phase | Game 22',
  },
  {
    id: 2,
    homeTeam: { name: 'S.D Spartans', score: '' },
    awayTeam: { name: 'Logan Thunder', score: '' },
    day: 26, month: 'NOV', year: 2024,
    league: 'MEN | NBL 1 | League phase | Game 23',
  },
  {
    id: 3,
    homeTeam: { name: 'River Hawks',  score: '' },
    awayTeam: { name: 'City Bulls',   score: '' },
    day: 27, month: 'NOV', year: 2024,
    league: 'MEN | NBL 1 | League phase | Game 24',
  },
]
</script>

<style scoped>
.home-page {
  background: var(--color-white);
  font-family: var(--font-family-base);
}

.home-page__scroll {
  padding-bottom: var(--space-2xl);
}

/* Following strip */
.home-page__following-strip {
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-sm2) var(--space-lg);
  overflow-x: auto;
  scrollbar-width: none;
}

.home-page__following-strip::-webkit-scrollbar {
  display: none;
}

.home-page__avatar {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-gray-200);
  background: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}

.home-page__avatar--player {
  background: var(--color-gray-100);
}

.home-page__avatar-initial {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
}

/* Banner / Hero — full bleed edge-to-edge */
.home-page__banner {
  padding: 0;
}

.home-page__hero {
  border-radius: 0;
  overflow: hidden;
  background: linear-gradient(160deg, #1a1a1a 0%, #2a2a2a 100%);
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-xl) var(--space-lg) var(--space-lg);
  position: relative;
}

.home-page__hero-text {
  font-family: var(--font-family-base);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-white);
  text-align: center;
  line-height: 1.3;
  margin: 0;
}


.home-page__hero-dots {
  display: flex;
  gap: var(--space-sm);
}

.home-page__hero-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.4);
}

.home-page__hero-dot--active {
  background: var(--color-white);
}

/* Sections */
.home-page__section {
  padding: var(--space-sm2) 0;
}

/* Live horizontal scroll */
.home-page__hscroll {
  display: flex;
  gap: var(--space-sm);
  overflow-x: auto;
  padding: var(--space-sm) var(--space-lg);
  scrollbar-width: none;
}

.home-page__hscroll::-webkit-scrollbar {
  display: none;
}

.home-page__hscroll-item {
  flex-shrink: 0;
  width: 220px;
}

/* Games list */
.home-page__games-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs2);
  padding: 0 var(--space-lg);
}

/* See all */
.home-page__see-all {
  display: flex;
  justify-content: center;
  padding: var(--space-sm2) var(--space-lg);
}

.home-page__see-all-btn {
  background: transparent;
  border: none;
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-primary);
  cursor: pointer;
  padding: var(--space-xs2) var(--space-sm);
  border-radius: var(--radius-sm);
  transition: background var(--duration-fast);
}

.home-page__see-all-btn:hover {
  background: var(--color-gray-100);
}

/* ── Desktop responsive ── */
@media (min-width: 1024px) {
  /* Live section: 4 cards fixed-width, extras scroll horizontally */
  .home-page__hscroll {
    padding: var(--space-sm) 0;
  }

  .home-page__hscroll-item {
    /* 4 equal columns within the container, accounting for 3 gaps */
    width: calc(25% - var(--space-sm) * 3 / 4);
    flex-shrink: 0;
  }

  /* Recent Games / Upcoming: 3-column grid */
  .home-page__games-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
    padding: 0;
  }
}
</style>
