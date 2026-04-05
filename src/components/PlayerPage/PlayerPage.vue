<template>
  <div class="player-page">
    <!-- Sticky header -->
    <AppHeader variant="home" org-name="S.D Spartans" />

    <!-- Scrollable content -->
    <div class="player-page__scroll" role="main">
      <!-- AthleteProfile contains: BackBar, Hero, Career Stats, My Highlights, Season Stats -->
      <AthleteProfile
        :name="playerName"
        :number="playerNumber"
        :position="playerPosition"
        :team-name="teamName"
        :accent-color="accentColor"
        :width="390"
      />
    </div>

    <!-- Bottom navigation -->
    <BottomTabBar active="home" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../AppHeader/AppHeader.vue'
import AthleteProfile from '../AthleteProfile/AthleteProfile.vue'
import BottomTabBar from '../BottomTabBar/BottomTabBar.vue'

withDefaults(defineProps<{
  playerName?: string
  playerNumber?: number
  playerPosition?: string
  teamName?: string
  accentColor?: string
}>(), {
  playerName:     'James Carter',
  playerNumber:   1,
  playerPosition: 'Forward',
  teamName:       'S.D Spartans',
  accentColor:    '#E8332B',
})
</script>

<style scoped>
.player-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-white);
  font-family: var(--font-family-base);
  max-width: 430px;
  margin: 0 auto;
  position: relative;
}

.player-page__scroll {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 60px;
}
</style>
