<template>
  <div class="home-page">
    <!-- Sticky top bar -->
    <AppHeader
      variant="home"
      org-name="S.D Spartans"
      :show-search="true"
    />

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

      <!-- Footer -->
      <footer class="home-page__footer">
        <div class="home-page__footer-top">
          <div class="home-page__footer-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <circle cx="14" cy="14" r="14" fill="#E8332B"/>
              <text x="14" y="19" text-anchor="middle" fill="white" font-size="13" font-weight="700" font-family="sans-serif">S</text>
            </svg>
          </div>
          <nav class="home-page__footer-links" aria-label="Footer navigation">
            <a class="home-page__footer-link" href="#">About us</a>
            <a class="home-page__footer-link" href="#">FAQ</a>
            <a class="home-page__footer-link" href="#">Privacy</a>
          </nav>
        </div>

        <div class="home-page__footer-social" aria-label="Social media links">
          <!-- Facebook -->
          <a class="home-page__social-icon" href="#" aria-label="Facebook">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <!-- X (Twitter) -->
          <a class="home-page__social-icon" href="#" aria-label="X (Twitter)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <!-- Instagram -->
          <a class="home-page__social-icon" href="#" aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <!-- YouTube -->
          <a class="home-page__social-icon" href="#" aria-label="YouTube">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
          </a>
          <!-- TikTok -->
          <a class="home-page__social-icon" href="#" aria-label="TikTok">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/></svg>
          </a>
          <!-- Email -->
          <a class="home-page__social-icon" href="#" aria-label="Email">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
        </div>

        <p class="home-page__footer-copy">© 2025 S.D Spartans. All rights reserved</p>
        <p class="home-page__footer-powered">Powered by <strong>Pixellot</strong></p>
      </footer>
    </div>

    <!-- Bottom navigation -->
    <BottomTabBar active="games" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../AppHeader/AppHeader.vue'
import AppButton from '../AppButton/AppButton.vue'
import PSectionHeader from '../PSectionHeader/PSectionHeader.vue'
import LiveGameCard from '../LiveGameCard/LiveGameCard.vue'
import GameResultCard from '../GameResultCard/GameResultCard.vue'
import BottomTabBar from '../BottomTabBar/BottomTabBar.vue'

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
    homeTeam: { name: 'Peterhead',   score: '' },
    awayTeam: { name: 'Queens Park', score: '' },
    day: 25, month: 'NOV', year: 2024,
    league: 'MEN | NBL 1 | League phase | Game 22',
  },
  {
    id: 2,
    homeTeam: { name: 'Peterhead',   score: '' },
    awayTeam: { name: 'Queens Park', score: '' },
    day: 25, month: 'NOV', year: 2024,
    league: 'MEN | NBL 1 | League phase | Game 22',
  },
]
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-white);
  font-family: var(--font-family-base);
  max-width: 430px;
  margin: 0 auto;
  position: relative;
}

.home-page__scroll {
  flex: 1;
  overflow-y: auto;
  padding-bottom: var(--space-xxl);
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

/* Footer */
.home-page__footer {
  background: var(--color-gray-50);
  padding: var(--space-xl) var(--space-lg) var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  margin-top: var(--space-sm2);
}

.home-page__footer-top {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex-wrap: wrap;
  justify-content: center;
}

.home-page__footer-logo {
  display: flex;
  align-items: center;
}

.home-page__footer-links {
  display: flex;
  gap: var(--space-lg);
  align-items: center;
}

.home-page__footer-link {
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  text-decoration: none;
  cursor: pointer;
}

.home-page__footer-link:hover {
  text-decoration: underline;
}

.home-page__footer-social {
  display: flex;
  gap: var(--space-lg);
  align-items: center;
}

.home-page__social-icon {
  color: var(--color-dark-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity var(--duration-fast);
}

.home-page__social-icon:hover {
  opacity: 0.6;
}

.home-page__footer-copy {
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  color: var(--color-gray-500);
  text-align: center;
  margin: 0;
}

.home-page__footer-powered {
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  color: var(--color-gray-400);
  text-align: center;
  margin: 0;
}

.home-page__footer-powered strong {
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  font-style: italic;
}
</style>
