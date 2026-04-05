<template>
  <div class="game-detail">
    <!-- Sticky header -->
    <AppHeader variant="home" org-name="S.D Spartans" />

    <!-- Back bar -->
    <BackBar label="Back" />

    <!-- Scrollable content -->
    <div class="game-detail__scroll">

      <!-- Score card -->
      <div class="game-detail__section game-detail__section--padded">
        <ScoreCard
          :home-team="homeTeam"
          :away-team="awayTeam"
          status="Final"
          :date="gameDate"
        />
      </div>

      <!-- Video type chips -->
      <div class="game-detail__chips">
        <VideoTypeChips
          v-model="activeChip"
          :chips="videoChips"
        />
      </div>

      <!-- ── Full Game ── -->
      <div class="game-detail__section game-detail__section--padded">
        <h2 class="game-detail__section-title">Full Game</h2>
        <VideoThumbnail
          orientation="landscape"
          :locked="false"
          duration="1:42:15"
          title="Full Game"
          :subtitle="`${homeTeam.name} vs ${awayTeam.name}`"
        />
      </div>

      <!-- ── Game Highlights ── -->
      <div class="game-detail__section game-detail__section--padded">
        <h2 class="game-detail__section-title">Game Highlights</h2>
        <div class="game-detail__hscroll">
          <VideoThumbnail
            orientation="vertical"
            :locked="false"
            duration="01:30"
            title="Game Recap"
            subtitle="NOV 13, 2025"
          />
          <VideoThumbnail
            orientation="vertical"
            :locked="false"
            duration="05:15"
            title="Game Highlight"
            subtitle="NOV 13, 2025"
          />
          <VideoThumbnail
            orientation="vertical"
            :locked="false"
            duration="03:45"
            title="Best Plays"
            subtitle="NOV 13, 2025"
          />
          <VideoThumbnail
            orientation="vertical"
            :locked="false"
            duration="02:20"
            title="Top Moments"
            subtitle="NOV 13, 2025"
          />
          <VideoThumbnail
            orientation="vertical"
            :locked="false"
            duration="04:10"
            title="Game Leaders"
            subtitle="NOV 13, 2025"
          />
        </div>
      </div>

      <!-- ── Player Highlights ── -->
      <div class="game-detail__section game-detail__section--padded">
        <h2 class="game-detail__section-title">Player Highlights</h2>

        <!-- Team tabs (Spartans / Away team) -->
        <div class="game-detail__team-tabs">
          <button
            class="game-detail__team-tab"
            :class="{ 'game-detail__team-tab--active': activeTeamTab === 'home' }"
            @click="activeTeamTab = 'home'"
          >{{ homeTeam.name }}</button>
          <button
            class="game-detail__team-tab"
            :class="{ 'game-detail__team-tab--active': activeTeamTab === 'away' }"
            @click="activeTeamTab = 'away'"
          >{{ awayTeam.name }}</button>
        </div>

        <!-- Followed Players subsection -->
        <div class="game-detail__subsection">
          <h3 class="game-detail__subsection-title">Followed Players</h3>
          <div class="game-detail__hscroll">
            <VideoThumbnail
              v-for="(player, i) in followedPlayers"
              :key="'fp-' + i"
              orientation="vertical"
              :locked="true"
              :duration="player.duration"
              :title="player.title"
              :subtitle="player.subtitle"
            />
          </div>
        </div>

        <!-- Other Players subsection -->
        <div class="game-detail__subsection">
          <h3 class="game-detail__subsection-title">Other Players</h3>
          <div class="game-detail__hscroll game-detail__hscroll--wrap">
            <VideoThumbnail
              v-for="(player, i) in otherPlayers"
              :key="'op-' + i"
              orientation="vertical"
              :locked="player.locked"
              :duration="player.duration"
              :title="player.title"
              :subtitle="player.subtitle"
            />
          </div>
        </div>

        <!-- See all link -->
        <div class="game-detail__see-all">
          <button class="game-detail__see-all-btn">See all &rsaquo;</button>
        </div>
      </div>

      <!-- ── Team Stats (paywalled) ── -->
      <div class="game-detail__section game-detail__section--padded">
        <h2 class="game-detail__section-title">Team Stats</h2>
        <PlayerStats
          :teams="[homeTeam.name, awayTeam.name]"
          :columns="['Player', 'MIN', 'PTS', 'REB', 'AST']"
          :paywall="true"
          paywall-label="Buy Team Stats"
          :show-tabs="true"
        />
      </div>

      <!-- ── Player Stats (paywalled) — includes Game Leaders ── -->
      <div class="game-detail__section game-detail__section--padded">
        <h2 class="game-detail__section-title">Player Stats</h2>
        <div class="game-detail__paywall-wrap">
          <div class="game-detail__paywall-blurred">
            <PlayerStats
              :teams="[homeTeam.name, awayTeam.name]"
              :columns="['Player', 'MIN', 'PTS', 'REB', 'AST']"
              :paywall="false"
              :show-tabs="true"
            />
            <GameLeaders
              :left-team="homeTeam.name"
              :right-team="awayTeam.name"
            />
          </div>
          <div class="game-detail__paywall-overlay">
            <div class="game-detail__paywall-lock-group">
              <div class="game-detail__paywall-lock-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" fill="var(--color-premium-yellow)"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="var(--color-premium-yellow)" stroke-width="2.67" stroke-linecap="round"/>
                </svg>
              </div>
              <p class="game-detail__paywall-label">Buy Player Stats</p>
            </div>
            <button class="game-detail__paywall-buy-btn">Buy Now</button>
          </div>
        </div>
      </div>

      <!-- ── More Games ── -->
      <div class="game-detail__section game-detail__section--padded">
        <h2 class="game-detail__section-title">More Games</h2>

        <div class="game-detail__more-games-group">
          <h3 class="game-detail__month-label">November 2025</h3>
          <div class="game-detail__more-games-list">
            <GameResultCard
              :home-team="{ name: 'S.D Spartans',  score: 121 }"
              :away-team="{ name: 'Logan Thunder',  score: 89 }"
              :day="20" month="NOV" :year="2024"
              league="NBL 1 | League phase | Game 22"
              :has-highlights="true"
            />
            <GameResultCard
              :home-team="{ name: 'S.D Spartans',  score: 112 }"
              :away-team="{ name: 'Ipswich Force',  score: 88 }"
              :day="13" month="NOV" :year="2024"
              league="NBL 1 | League phase | Game 22"
              :has-highlights="true"
            />
            <GameResultCard
              :home-team="{ name: 'S.D Spartans',       score: 104 }"
              :away-team="{ name: 'Queens Park Rangers', score: 79 }"
              :day="7" month="NOV" :year="2024"
              league="NBL 1 | League phase | Game 22"
              :has-highlights="true"
            />
          </div>
        </div>

        <div class="game-detail__more-games-group">
          <h3 class="game-detail__month-label">October 2025</h3>
          <div class="game-detail__more-games-list">
            <GameResultCard
              :home-team="{ name: 'S.D Spartans',  score: 98 }"
              :away-team="{ name: 'Logan Thunder',  score: 101 }"
              :day="28" month="OCT" :year="2024"
              league="NBL 1 | League phase | Game 21"
              :has-highlights="true"
            />
          </div>
        </div>
      </div>

      <div class="game-detail__footer-spacer" />
    </div>

    <!-- Bottom navigation -->
    <BottomTabBar active="games" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppHeader from '../AppHeader/AppHeader.vue'
import BackBar from '../BackBar/BackBar.vue'
import ScoreCard from '../ScoreCard/ScoreCard.vue'
import VideoTypeChips from '../VideoTypeChips/VideoTypeChips.vue'
import VideoThumbnail from '../VideoThumbnail/VideoThumbnail.vue'
import PlayerStats from '../PlayerStats/PlayerStats.vue'
import GameLeaders from '../GameLeaders/GameLeaders.vue'
import GameResultCard from '../GameResultCard/GameResultCard.vue'
import BottomTabBar from '../BottomTabBar/BottomTabBar.vue'

interface TeamInfo {
  name:     string
  score:    number
  isWinner?: boolean
}

const props = withDefaults(defineProps<{
  homeTeam?: TeamInfo
  awayTeam?: TeamInfo
  gameDate?: string
}>(), {
  homeTeam: () => ({ name: 'S.D Spartans',   score: 121, isWinner: true  }),
  awayTeam: () => ({ name: 'Logan Thunder',  score: 89,  isWinner: false }),
  gameDate: 'Feb 11, 2025',
})

const activeChip    = ref('Player Highlights')
const activeTeamTab = ref('home')

const followedPlayers = [
  { duration: '0:45', title: 'Weiss with the dimes', subtitle: 'NOV 13, 2025' },
  { duration: '0:45', title: 'Fast break layup',     subtitle: 'NOV 13, 2025' },
]

const otherPlayers = [
  { duration: '0:30', locked: false, title: '#4 Gets the ball Forward', subtitle: 'NOV 13, 2025' },
  { duration: '0:30', locked: false, title: 'Alley-oop finish',        subtitle: 'NOV 13, 2025' },
  { duration: '0:30', locked: false, title: 'Three pointer',           subtitle: 'NOV 13, 2025' },
  { duration: '0:30', locked: true,  title: 'Steal and score',         subtitle: 'NOV 13, 2025' },
  { duration: '0:30', locked: true,  title: 'Behind the back pass',    subtitle: 'NOV 13, 2025' },
  { duration: '0:30', locked: true,  title: 'Clutch free throws',      subtitle: 'NOV 13, 2025' },
]

const videoChips = computed(() => [
  { label: 'Full Game' },
  { label: 'Game Highlights' },
  { label: 'Player Highlights', locked: true },
  { label: 'Team Stats',        locked: true },
  { label: 'Player Stats',      locked: true },
])
</script>

<style scoped>
.game-detail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-white);
  font-family: var(--font-family-base);
  max-width: 430px;
  margin: 0 auto;
  position: relative;
}

.game-detail__scroll {
  flex: 1;
  overflow-y: auto;
}

.game-detail__section {
  margin-bottom: var(--space-xl);
}

.game-detail__section--padded {
  padding: 0 var(--space-lg);
}

/* Video type chips scroll */
.game-detail__chips {
  padding: var(--space-sm) var(--space-lg);
  overflow-x: auto;
  scrollbar-width: none;
}

.game-detail__chips::-webkit-scrollbar {
  display: none;
}

/* Section titles */
.game-detail__section-title {
  font-family: var(--font-family-base);
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  margin: 0 0 var(--space-lg) 0;
}

/* Player Highlights is a primary section — larger heading */
.game-detail__section-title--large {
  font-size: var(--text-2xl);
}

/* Horizontal scroll */
.game-detail__hscroll {
  display: flex;
  gap: 17px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: var(--space-xs2);
}

.game-detail__hscroll::-webkit-scrollbar {
  display: none;
}

/* Prevent hscroll cards from shrinking below their natural width */
.game-detail__hscroll .vt {
  flex-shrink: 0;
}

/* Type filter row */
.game-detail__type-filter {
  display: flex;
  align-items: center;
  gap: var(--space-xs2);
  margin-bottom: var(--space-sm);
}

.game-detail__type-label {
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  color: var(--color-gray-500);
}

.game-detail__type-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  background: transparent;
  border: none;
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  cursor: pointer;
  padding: 0;
}

/* Team tabs */
.game-detail__team-tabs {
  display: flex;
  border-bottom: 1px solid var(--color-gray-200);
  margin-bottom: var(--space-sm2);
}

.game-detail__team-tab {
  flex: 1;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: var(--space-xs2) 0 var(--space-sm);
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-gray-400);
  cursor: pointer;
  transition: color var(--duration-fast), border-color var(--duration-fast);
  margin-bottom: -1px;
}

.game-detail__team-tab--active {
  color: var(--color-dark-text);
  border-bottom-color: var(--color-error-red);
}

/* Subsections */
.game-detail__subsection {
  margin-bottom: var(--space-xl);
}

.game-detail__subsection-title {
  font-family: var(--font-family-base);
  font-size: var(--text-h3);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  margin: 0 0 var(--space-lg) 0;
}

/* Other Players: wrap into rows at natural card size */
.game-detail__hscroll--wrap {
  flex-wrap: wrap;
  overflow-x: visible;
}

/* See all link */
.game-detail__see-all {
  display: flex;
  justify-content: center;
  padding: var(--space-sm) 0 var(--space-xs2);
}

.game-detail__see-all-btn {
  background: transparent;
  border: none;
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-primary);
  cursor: pointer;
  padding: var(--space-xs2) var(--space-sm);
}

/* Player Stats + Game Leaders combined paywall */
.game-detail__paywall-wrap {
  position: relative;
  border-radius: var(--radius-card);
  overflow: hidden;
}

.game-detail__paywall-blurred {
  filter: blur(4px);
  opacity: 0.5;
  pointer-events: none;
  user-select: none;
}

.game-detail__paywall-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.08);
  border-radius: var(--radius-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg2, 20px);
}

.game-detail__paywall-lock-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.game-detail__paywall-lock-circle {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: var(--color-premium-dark);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-detail__paywall-label {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-dark-text);
  margin: 0;
}

.game-detail__paywall-buy-btn {
  width: 160px;
  height: var(--size-button-height);
  border-radius: var(--radius-stat-bar);
  border: none;
  cursor: pointer;
  background: var(--color-premium-yellow);
  color: var(--color-premium-dark);
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
}

.game-detail__paywall-buy-btn:hover {
  background: var(--color-premium-amber);
}

/* More Games section */
.game-detail__more-games-group {
  margin-bottom: var(--space-md);
}

.game-detail__month-label {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  margin: 0 0 var(--space-sm) 0;
}

.game-detail__more-games-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs2);
}

.game-detail__footer-spacer {
  height: 60px;
}
</style>
