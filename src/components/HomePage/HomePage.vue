<template>
  <div class="home-page">
    <!-- Sticky top bar -->
    <AppHeader
      variant="home"
      org-name="Pixellot"
      :show-search="true"
    />

    <!-- Main tabs: Following | All Teams | Team Shop -->
    <div class="home-page__tabs-wrap">
      <AppTabs
        :tabs="mainTabs"
        v-model:active="activeMainTab"
        variant="underline"
        accent-color="var(--color-accent)"
      />
    </div>

    <!-- Scrollable content -->
    <div class="home-page__scroll">
      <!-- Ad banner hero -->
      <div class="home-page__banner">
        <AdBanner :slides="adSlides" />
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

      <!-- Following section -->
      <div class="home-page__section">
        <PSectionHeader title="Following" :see-all="false" />

        <!-- Sub-tabs: Athletes | Teams -->
        <div class="home-page__subtabs">
          <AppTabs
            :tabs="followingTabs"
            v-model:active="activeFollowingTab"
            variant="underline"
          />
        </div>

        <!-- Following strip (jersey avatars) -->
        <HomeFollowingStrip :items="followingItems" />
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
          />
        </div>
        <div class="home-page__see-all">
          <button class="home-page__see-all-btn">See All &rsaquo;</button>
        </div>
      </div>

      <!-- Footer spacer for bottom tab bar -->
      <div class="home-page__footer-spacer" />
    </div>

    <!-- Bottom navigation -->
    <BottomTabBar :active="activeBottomTab" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '../AppHeader/AppHeader.vue'
import AppTabs from '../AppTabs/AppTabs.vue'
import AdBanner from '../AdBanner/AdBanner.vue'
import PSectionHeader from '../PSectionHeader/PSectionHeader.vue'
import LiveGameCard from '../LiveGameCard/LiveGameCard.vue'
import HomeFollowingStrip from '../HomeFollowingStrip/HomeFollowingStrip.vue'
import GameResultCard from '../GameResultCard/GameResultCard.vue'
import BottomTabBar from '../BottomTabBar/BottomTabBar.vue'

const props = withDefaults(defineProps<{
  /** Initial main tab */
  initialMainTab?: string
}>(), {
  initialMainTab: 'following',
})

const activeMainTab      = ref(props.initialMainTab)
const activeFollowingTab = ref('athletes')
const activeBottomTab    = ref('home')

const mainTabs = [
  { label: 'Following',  value: 'following' },
  { label: 'All Teams',  value: 'allteams'  },
  { label: 'Team Shop',  value: 'teamshop'  },
]

const followingTabs = [
  { label: 'Athletes', value: 'athletes' },
  { label: 'Teams',    value: 'teams'    },
]

const adSlides = [
  { bg: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)', label: 'Ad Slot 1' },
  { bg: 'linear-gradient(135deg, #116DFF 0%, #0A4AB0 100%)', label: 'Ad Slot 2' },
]

const liveGames = [
  {
    id: 1,
    homeTeam: { name: 'Maccabi TA',    score: 62, logoInitial: 'M', logoColor: '#FFE000' },
    awayTeam: { name: 'Hapoel Holon',  score: 55, logoInitial: 'H', logoColor: '#EF4444' },
    date: 'Q3 04:12',
    league: 'BSL',
  },
  {
    id: 2,
    homeTeam: { name: 'Ironi Nahariya', score: 48, logoInitial: 'I', logoColor: '#116DFF' },
    awayTeam: { name: 'Bnei Herzliya',  score: 51, logoInitial: 'B', logoColor: '#22C55E' },
    date: 'Q2 09:33',
    league: 'BSL',
  },
  {
    id: 3,
    homeTeam: { name: 'Hapoel TA',    score: 71, logoInitial: 'H', logoColor: '#EF4444' },
    awayTeam: { name: 'Maccabi Haifa', score: 68, logoInitial: 'M', logoColor: '#FFE000' },
    date: 'Q4 01:45',
    league: 'BSL',
  },
]

const followingItems = [
  { type: 'player'    as const, number: 5,  name: 'Ben S.',   color: '#E8332B' },
  { type: 'player'    as const, number: 23, name: 'Jordan K.', color: '#1A3B8A' },
  { type: 'player'    as const, number: 10, name: 'Marcus L.', color: '#22C55E' },
  { type: 'unclaimed' as const, name: 'Add Player' },
]

const recentGames = [
  {
    id: 1,
    homeTeam: { name: 'Maccabi KG', score: 89, isWinner: true  },
    awayTeam: { name: 'Ironi Nah.', score: 77, isWinner: false },
    day: 12, month: 'Mar', year: 2026,
  },
  {
    id: 2,
    homeTeam: { name: 'Hapoel TA',    score: 74, isWinner: false },
    awayTeam: { name: 'Maccabi KG',   score: 81, isWinner: true  },
    day: 5,  month: 'Mar', year: 2026,
  },
  {
    id: 3,
    homeTeam: { name: 'Maccabi KG',   score: 95, isWinner: true  },
    awayTeam: { name: 'Bnei Herzliya', score: 82, isWinner: false },
    day: 28, month: 'Feb', year: 2026,
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

.home-page__tabs-wrap {
  border-bottom: 1px solid var(--color-gray-200);
  background: var(--color-white);
  position: sticky;
  top: 56px;
  z-index: var(--z-above);
}

.home-page__scroll {
  flex: 1;
  overflow-y: auto;
  padding-bottom: var(--space-xxl);
}

.home-page__banner {
  padding: var(--space-sm) var(--space-lg);
}

.home-page__section {
  padding: var(--space-sm2) 0;
}

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
  width: 200px;
}

.home-page__subtabs {
  padding: 0 var(--space-lg);
  margin-bottom: var(--space-sm);
}

.home-page__games-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs2);
  padding: 0 var(--space-lg);
}

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

.home-page__footer-spacer {
  height: 60px;
}
</style>
