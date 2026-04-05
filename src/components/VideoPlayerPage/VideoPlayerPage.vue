<template>
  <div class="vp-page">
    <!-- Sticky header -->
    <AppHeader variant="home" org-name="S.D Spartans" />

    <!-- Back bar -->
    <BackBar label="Back" />

    <!-- Scrollable content -->
    <div class="vp-page__scroll">

      <!-- Video player placeholder -->
      <div class="vp-page__player">
        <div class="vp-page__player-inner">
          <svg class="vp-page__play-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.45)" />
            <polygon points="19,14 36,24 19,34" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      <!-- Video title + action bar -->
      <div class="vp-page__section vp-page__section--padded">
        <h1 class="vp-page__video-title">{{ videoTitle }}</h1>
        <span class="vp-page__video-duration">{{ videoDuration }}</span>
        <VideoActionBar
          :views="videoViews"
          :bookmarked="false"
        />
      </div>

      <!-- Score Card -->
      <div class="vp-page__section vp-page__section--padded">
        <ScoreCard
          :home-team="homeTeam"
          :away-team="awayTeam"
          status="Final"
          :date="gameDate"
        />
      </div>

      <!-- Box Score table -->
      <div class="vp-page__section vp-page__section--padded">
        <PlayerStats
          :teams="[]"
          :columns="boxScoreColumns"
          :rows="boxScoreRows"
          :paywall="false"
          :show-tabs="false"
        />
      </div>

      <!-- Player Highlights -->
      <div class="vp-page__section vp-page__section--padded">
        <h2 class="vp-page__section-title">Player Highlights</h2>

        <!-- Team tabs -->
        <div class="vp-page__team-tabs">
          <button
            class="vp-page__team-tab"
            :class="{ 'vp-page__team-tab--active': activeTeamTab === 'home' }"
            @click="activeTeamTab = 'home'"
          >{{ homeTeam.name }}</button>
          <button
            class="vp-page__team-tab"
            :class="{ 'vp-page__team-tab--active': activeTeamTab === 'away' }"
            @click="activeTeamTab = 'away'"
          >{{ awayTeam.name }}</button>
        </div>

        <!-- Followed Players -->
        <div class="vp-page__subsection">
          <h3 class="vp-page__subsection-title">Followed Players</h3>
          <div class="vp-page__hscroll">
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

        <!-- Other Players -->
        <div class="vp-page__subsection">
          <h3 class="vp-page__subsection-title">Other Players</h3>
          <div class="vp-page__hscroll vp-page__hscroll--wrap">
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
      </div>

      <div class="vp-page__footer-spacer" />
    </div>

    <!-- Bottom navigation -->
    <BottomTabBar active="games" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '../AppHeader/AppHeader.vue'
import BackBar from '../BackBar/BackBar.vue'
import ScoreCard from '../ScoreCard/ScoreCard.vue'
import PlayerStats from '../PlayerStats/PlayerStats.vue'
import VideoActionBar from '../VideoActionBar/VideoActionBar.vue'
import VideoThumbnail from '../VideoThumbnail/VideoThumbnail.vue'
import BottomTabBar from '../BottomTabBar/BottomTabBar.vue'

interface TeamInfo {
  name: string
  score: number
  standing?: string
  logoUrl?: string
}

const props = withDefaults(defineProps<{
  homeTeam?: TeamInfo
  awayTeam?: TeamInfo
  gameDate?: string
  videoTitle?: string
  videoDuration?: string
  videoViews?: string
}>(), {
  homeTeam:      () => ({ name: 'S.D Spartans',  score: 121, standing: '(5-4)' }),
  awayTeam:      () => ({ name: 'Logan Thunder', score: 89,  standing: '(5-6)' }),
  gameDate:      'Mar 14, 2025',
  videoTitle:    'Full Game',
  videoDuration: '01:55:30',
  videoViews:    '1.2K views',
})

const activeTeamTab = ref('home')

const boxScoreColumns = ['Team', 'Q1', 'Q2', 'Q3', 'Q4', 'Final']
const boxScoreRows = [
  ['SPA', '12', '23', '16', '18', '121'],
  ['THU', '24', '16', '15', '13', '89'],
]

const followedPlayers = [
  { duration: '0:45', title: 'Weiss with the dimes',  subtitle: 'NOV 13, 2025' },
  { duration: '0:45', title: 'Fast break layup',      subtitle: 'NOV 13, 2025' },
]

const otherPlayers = [
  { duration: '0:30', locked: false, title: '#4 Gets the ball Forward', subtitle: 'NOV 13, 2025' },
  { duration: '0:30', locked: false, title: 'Alley-oop finish',        subtitle: 'NOV 13, 2025' },
  { duration: '0:30', locked: false, title: 'Three pointer',           subtitle: 'NOV 13, 2025' },
  { duration: '0:30', locked: true,  title: 'Steal and score',         subtitle: 'NOV 13, 2025' },
  { duration: '0:30', locked: true,  title: 'Behind the back pass',    subtitle: 'NOV 13, 2025' },
  { duration: '0:30', locked: true,  title: 'Clutch free throws',      subtitle: 'NOV 13, 2025' },
]
</script>

<style scoped>
.vp-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-white);
  font-family: var(--font-family-base);
  max-width: 430px;
  margin: 0 auto;
  position: relative;
}

.vp-page__scroll {
  flex: 1;
  overflow-y: auto;
}

/* ── Video player placeholder ── */
.vp-page__player {
  width: 100%;
  background: var(--color-video-bg);
  position: relative;
}

.vp-page__player-inner {
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.vp-page__play-icon {
  cursor: pointer;
  opacity: 0.9;
}

/* ── Sections ── */
.vp-page__section {
  margin-bottom: var(--space-xl);
}

.vp-page__section--padded {
  padding: 0 var(--space-lg);
}

/* ── Video title + duration ── */
.vp-page__video-title {
  font-family: var(--font-family-base);
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  margin: var(--space-lg) 0 var(--space-xs) 0;
}

.vp-page__video-duration {
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-gray-500);
}


/* ── Section titles ── */
.vp-page__section-title {
  font-family: var(--font-family-base);
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  margin: 0 0 var(--space-lg) 0;
}

/* ── Team tabs ── */
.vp-page__team-tabs {
  display: flex;
  border-bottom: 1px solid var(--color-gray-200);
  margin-bottom: var(--space-sm2);
}

.vp-page__team-tab {
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

.vp-page__team-tab--active {
  color: var(--color-dark-text);
  border-bottom-color: var(--color-error-red);
}

/* ── Subsections ── */
.vp-page__subsection {
  margin-bottom: var(--space-xl);
}

.vp-page__subsection-title {
  font-family: var(--font-family-base);
  font-size: var(--text-h3);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  margin: 0 0 var(--space-lg) 0;
}

/* ── Horizontal scroll ── */
.vp-page__hscroll {
  display: flex;
  gap: 17px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: var(--space-xs2);
}

.vp-page__hscroll::-webkit-scrollbar {
  display: none;
}

.vp-page__hscroll .vt {
  flex-shrink: 0;
}

.vp-page__hscroll--wrap {
  flex-wrap: wrap;
  overflow-x: visible;
}

/* ── Footer spacer ── */
.vp-page__footer-spacer {
  height: 60px;
}
</style>
