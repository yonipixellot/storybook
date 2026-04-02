<template>
  <div class="game-detail">
    <!-- Sticky header -->
    <AppHeader variant="home" org-name="Pixellot" />

    <!-- Back bar -->
    <BackBar label="Back" />

    <!-- Scrollable content -->
    <div class="game-detail__scroll">
      <!-- Score card -->
      <div class="game-detail__section">
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

      <!-- Full Game -->
      <div v-if="activeChip === 'full'" class="game-detail__section game-detail__section--padded">
        <div class="game-detail__badge-row">
          <AppBadge variant="free" />
        </div>
        <VideoThumbnail
          orientation="landscape"
          :locked="false"
          duration="1:42:15"
          title="Full Game"
          :subtitle="`${homeTeam.name} vs ${awayTeam.name}`"
        />
      </div>

      <!-- Condensed Game -->
      <div v-if="activeChip === 'condensed'" class="game-detail__section game-detail__section--padded">
        <div class="game-detail__badge-row">
          <AppBadge variant="premium" />
        </div>
        <VideoThumbnail
          orientation="landscape"
          :locked="true"
          duration="0:18:30"
          title="Condensed Game"
          :subtitle="`${homeTeam.name} vs ${awayTeam.name}`"
        />
      </div>

      <!-- Game Highlights -->
      <div v-if="activeChip === 'highlights'" class="game-detail__section game-detail__section--padded">
        <div class="game-detail__badge-row">
          <AppBadge variant="premium" />
        </div>
        <div class="game-detail__hscroll">
          <VideoThumbnail
            v-for="n in 4"
            :key="n"
            orientation="vertical"
            :locked="true"
            :duration="`0:0${n}:${n * 11}`"
            :title="`Highlight ${n}`"
          />
        </div>
      </div>

      <!-- Personal Highlights -->
      <div class="game-detail__section game-detail__section--padded">
        <div class="game-detail__badge-row">
          <AppBadge variant="claimed" />
          <span class="game-detail__section-label">Personal Highlights</span>
        </div>
        <InfoAlert
          title="Claimed Athletes Only"
          description="Personal highlights are only available for claimed athlete profiles."
        />
      </div>

      <!-- Team stats section -->
      <AppDivider />

      <!-- Team tabs -->
      <div class="game-detail__section game-detail__section--padded">
        <AppTabs
          :tabs="teamTabs"
          v-model:active="activeTeamTab"
          variant="underline"
        />
      </div>

      <!-- Player stats table -->
      <div class="game-detail__section game-detail__section--padded">
        <PlayerStats
          :teams="[homeTeam.name, awayTeam.name]"
          :columns="['Player', 'MIN', 'PTS', 'REB', 'AST']"
        />
      </div>

      <!-- Team stats bars -->
      <div class="game-detail__section game-detail__section--padded">
        <TeamStatsBar :rows="statsRows" />
      </div>

      <!-- Game leaders -->
      <div class="game-detail__section game-detail__section--padded">
        <GameLeaders
          :left-team="homeTeam.name"
          :right-team="awayTeam.name"
        />
      </div>

      <div class="game-detail__footer-spacer" />
    </div>

    <!-- Bottom navigation -->
    <BottomTabBar active="home" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppHeader from '../AppHeader/AppHeader.vue'
import BackBar from '../BackBar/BackBar.vue'
import ScoreCard from '../ScoreCard/ScoreCard.vue'
import VideoTypeChips from '../VideoTypeChips/VideoTypeChips.vue'
import VideoThumbnail from '../VideoThumbnail/VideoThumbnail.vue'
import AppBadge from '../AppBadge/AppBadge.vue'
import InfoAlert from '../InfoAlert/InfoAlert.vue'
import AppTabs from '../AppTabs/AppTabs.vue'
import PlayerStats from '../PlayerStats/PlayerStats.vue'
import TeamStatsBar from '../TeamStatsBar/TeamStatsBar.vue'
import GameLeaders from '../GameLeaders/GameLeaders.vue'
import AppDivider from '../AppDivider/AppDivider.vue'
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
  homeTeam: () => ({ name: 'Maccabi KG',     score: 89, isWinner: true  }),
  awayTeam: () => ({ name: 'Ironi Nahariya', score: 77, isWinner: false }),
  gameDate: 'Mar 12, 2026',
})

const activeChip   = ref('full')
const activeTeamTab = ref('home')

const videoChips = computed(() => [
  { label: 'Full Game',        value: 'full'      },
  { label: 'Condensed Game',   value: 'condensed', locked: true },
  { label: 'Game Highlights',  value: 'highlights', locked: true },
])

const teamTabs = computed(() => [
  { label: props.homeTeam.name, value: 'home' },
  { label: props.awayTeam.name, value: 'away' },
])

const statsRows = [
  { label: 'Points',   homeValue: props.homeTeam.score, awayValue: props.awayTeam.score, homeWins: props.homeTeam.score > props.awayTeam.score },
  { label: 'Rebounds', homeValue: 38,  awayValue: 31,  homeWins: true  },
  { label: 'Assists',  homeValue: 22,  awayValue: 18,  homeWins: true  },
]
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
  margin-bottom: var(--space-xs2);
}

.game-detail__section--padded {
  padding: 0 var(--space-lg);
}

.game-detail__chips {
  padding: var(--space-sm) var(--space-lg);
  overflow-x: auto;
  scrollbar-width: none;
}

.game-detail__chips::-webkit-scrollbar {
  display: none;
}

.game-detail__badge-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.game-detail__section-label {
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-dark-text);
}

.game-detail__hscroll {
  display: flex;
  gap: var(--space-sm);
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: var(--space-xs2);
}

.game-detail__hscroll::-webkit-scrollbar {
  display: none;
}

.game-detail__footer-spacer {
  height: 60px;
}
</style>
