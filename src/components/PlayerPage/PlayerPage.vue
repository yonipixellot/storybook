<template>
  <div class="player-page">
    <!-- Scrollable content -->
    <div class="player-page__scroll" role="main">
      <!-- AthleteProfile contains: BackBar, Hero, Career Stats, My Highlights, Season Stats -->
      <AthleteProfile
        :name="playerName"
        :number="playerNumber"
        :position="playerPosition"
        :team-name="teamName"
        :accent-color="accentColor"
        :show-nav="false"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import AthleteProfile from '../AthleteProfile/AthleteProfile.vue'

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
}

.player-page__scroll {
}
</style>
