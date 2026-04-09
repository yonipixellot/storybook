<template>
  <div class="tp">

    <!-- Hero Card — centered column, matches DS bundle exactly -->
    <div class="tp__hero-wrap">
      <div class="tp__hero-card">

        <!-- Logo: 100×100px centered circle -->
        <div class="tp__logo" :style="{ background: logoUrl ? 'transparent' : accentColor }">
          <img v-if="logoUrl" :src="logoUrl" :alt="teamName" class="tp__logo-img" />
          <span v-else class="tp__logo-initials">{{ initials }}</span>
        </div>

        <!-- Info: centered text -->
        <div class="tp__info">
          <h2 class="tp__name">{{ teamName }}</h2>
          <p class="tp__sport">{{ sport }}</p>
        </div>

        <!-- Follow + Share side by side (DS: two AppButtons, primary + secondary) -->
        <div class="tp__actions">
          <AppButton variant="primary" size="md" @click="toggleFollow">
            {{ isFollowing ? 'Following' : 'Follow' }}
          </AppButton>
          <AppButton variant="secondary" size="md" @click="$emit('share')">
            Share
          </AppButton>
        </div>

        <!-- Social Links (DS feature: team_social_links) -->
        <SocialLinks :links="socialLinks" />

      </div>
    </div>

    <!-- Live Games Section -->
    <div class="tp__section tp__section--live">
      <PSectionHeader title="Live" :seeAll="true" @see-all="$emit('see-all-live')" />
      <div class="tp__live-scroll">
        <LiveGameCard
          :homeTeam="{ name: 'S.D Spartans', score: 58 }"
          :awayTeam="{ name: 'Logan Thunder', score: 51 }"
          date="Q3 7:42"
          league="Men's Basketball"
        />
        <LiveGameCard
          :homeTeam="{ name: 'River Hawks', score: 44 }"
          :awayTeam="{ name: 'City Bulls', score: 39 }"
          date="Q2 3:15"
          league="Men's Basketball"
        />
        <LiveGameCard
          :homeTeam="{ name: 'Ipswich Force', score: 71 }"
          :awayTeam="{ name: 'Queens Park', score: 68 }"
          date="Q4 1:08"
          league="Women's Basketball"
        />
        <LiveGameCard
          :homeTeam="{ name: 'Logan Thunder', score: 22 }"
          :awayTeam="{ name: 'S.D Spartans', score: 19 }"
          date="H1 18:30"
          league="Men's Basketball"
        />
        <LiveGameCard
          :homeTeam="{ name: 'Peterhead', score: 33 }"
          :awayTeam="{ name: 'Northside', score: 33 }"
          date="HT"
          league="Women's Basketball"
        />
      </div>
    </div>

    <!-- Recent Games Section -->
    <div class="tp__section">
      <PSectionHeader title="Recent Games" :seeAll="true" @see-all="$emit('see-all-games')" />
      <div class="tp__games">
        <GameResultCard
          :homeTeam="{ name: 'S.D Spartans', score: 89 }"
          :awayTeam="{ name: 'Logan Thunder', score: 76 }"
          day="28" month="MAR" year="2025"
          league="Men's Basketball"
          :hasHighlights="true"
        />
        <GameResultCard
          :homeTeam="{ name: 'River Hawks', score: 72 }"
          :awayTeam="{ name: 'S.D Spartans', score: 84 }"
          day="21" month="MAR" year="2025"
          league="Men's Basketball"
          :hasHighlights="true"
        />
        <GameResultCard
          :homeTeam="{ name: 'S.D Spartans', score: 91 }"
          :awayTeam="{ name: 'City Bulls', score: 88 }"
          day="14" month="MAR" year="2025"
          league="Men's Basketball"
          :hasHighlights="false"
        />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppButton      from '../AppButton/AppButton.vue'
import PSectionHeader from '../PSectionHeader/PSectionHeader.vue'
import SocialLinks    from '../SocialLinks/SocialLinks.vue'
import LiveGameCard   from '../LiveGameCard/LiveGameCard.vue'
import GameResultCard from '../GameResultCard/GameResultCard.vue'

const props = withDefaults(defineProps<{
  teamName?:    string
  sport?:       string
  logoUrl?:     string
  accentColor?: string
}>(), {
  teamName:    'S.D Spartans',
  sport:       "Men's Basketball",
  accentColor: '#116DFF',
})

defineEmits<{
  back:            []
  share:           []
  'see-all-live':  []
  'see-all-games': []
}>()

const initials = computed(() =>
  props.teamName
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
)

const isFollowing = ref(false)
function toggleFollow() { isFollowing.value = !isFollowing.value }

const socialLinks = [
  { type: 'x'         as const, url: 'https://x.com/sdspartans' },
  { type: 'facebook'  as const, url: 'https://facebook.com/sdspartans' },
  { type: 'instagram' as const, url: 'https://instagram.com/sdspartans' },
  { type: 'website'   as const, url: 'https://sdspartans.com' },
]
</script>

<style scoped>
/* ── Page — gradient from DS bundle exactly ── */
.tp {
  font-family: var(--font-family-base);
  background: linear-gradient(180deg, var(--color-white) 0%, var(--color-gray-100) 100%);
  overflow-x: hidden;
  min-height: 100vh;
}

/* ── Hero Wrap ── */
.tp__hero-wrap {
  padding: 24px 16px;
}

/* ── Hero Card — centered column, DS: gray50 bg, radius-badge, spacing-lg pad + gap ── */
.tp__hero-card {
  background: var(--color-gray-50);
  border-radius: var(--radius-badge);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}

/* ── Logo: 100×100px circle (DS exact) ── */
.tp__logo {
  width: 100px;
  height: 100px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.tp__logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tp__logo-initials {
  font-family: var(--font-family-base);
  font-size: var(--text-h1);   /* DS: typography.sizes.h1 */
  font-weight: var(--font-bold);
  color: #FFFFFF; /* hardcoded — sits on accent color bg that doesn't invert (Failure #16) */
}

/* ── Info: centered (DS: textAlign center) ── */
.tp__info {
  text-align: center;
}

.tp__name {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-h2);   /* DS: typography.sizes.h2 */
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
}

.tp__sport {
  margin: 4px 0 0;
  font-family: var(--font-family-base);
  font-size: var(--text-caption); /* DS: typography.sizes.caption */
  color: var(--color-gray-500);
}

/* ── Action Buttons: Follow + Share side by side (DS: gap spacing-md) ── */
.tp__actions {
  display: flex;
  gap: var(--space-md);
}

/* ── Sections ── */
.tp__section {
  padding: 0 var(--space-lg) var(--space-xl);
}

.tp__games {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

/* Live scroll row — mobile: stacked, desktop: horizontal */
.tp__live-scroll {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

/* ── Desktop responsive ── */
@media (min-width: 1024px) {
  /* Live: horizontal scroll row, 4 cards visible */
  .tp__live-scroll {
    flex-direction: row;
    overflow-x: auto;
    scrollbar-width: none;
    gap: var(--space-md);
  }

  .tp__live-scroll::-webkit-scrollbar {
    display: none;
  }

  .tp__live-scroll .live-game-card {
    flex: 0 0 calc(25% - var(--space-md) * 3 / 4);
  }

  /* Recent Games: 3-column grid */
  .tp__games {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
  }
}
</style>
