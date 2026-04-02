<template>
  <div class="tp" :style="{ width: width + 'px' }">

    <!-- Back Bar -->
    <div class="tp__nav">
      <button class="tp__back-btn" @click="$emit('back')" aria-label="Go back">
        <ArrowLeft :size="16" class="tp__nav-icon" />
        <span class="tp__back-label">{{ teamName }}</span>
      </button>
    </div>

    <!-- Hero Card -->
    <div class="tp__hero-wrap">
      <div class="tp__hero-card">

        <!-- Team Logo -->
        <div class="tp__logo" :style="{ background: logoUrl ? 'transparent' : accentColor }">
          <img v-if="logoUrl" :src="logoUrl" :alt="teamName" class="tp__logo-img" />
          <span v-else class="tp__logo-initials">{{ initials }}</span>
        </div>

        <!-- Team Info -->
        <div class="tp__info">
          <h2 class="tp__name">{{ teamName }}</h2>
          <p class="tp__sport">{{ sport }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="tp__actions">
          <button class="tp__btn tp__btn--primary" @click="$emit('follow')">Follow</button>
          <button class="tp__btn tp__btn--secondary" @click="$emit('share')">Share</button>
        </div>

      </div>
    </div>

    <!-- Recent Games Section -->
    <div class="tp__section">
      <div class="tp__section-header">
        <h3 class="tp__section-title">Recent Games</h3>
      </div>

      <!-- Placeholder game cards -->
      <div class="tp__games">
        <div v-for="i in 3" :key="i" class="tp__game-card">
          <div class="tp__game-team">
            <div class="tp__game-logo tp__game-logo--a" />
            <span class="tp__game-name">S.D Spartans</span>
          </div>
          <div class="tp__game-score">
            <span class="tp__score-num">{{ 80 + i * 3 }}</span>
            <span class="tp__score-sep">-</span>
            <span class="tp__score-num">{{ 75 + i * 2 }}</span>
          </div>
          <div class="tp__game-team tp__game-team--right">
            <div class="tp__game-logo tp__game-logo--b" />
            <span class="tp__game-name">Opponents</span>
          </div>
        </div>
      </div>

      <!-- See All -->
      <div class="tp__see-all-wrap">
        <button class="tp__see-all" @click="$emit('see-all-games')">
          See all
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
            <path d="M1 4h6M4 1l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  teamName?: string
  sport?: string
  logoUrl?: string
  accentColor?: string
  width?: number
}>(), {
  teamName:    'S.D Spartans',
  sport:       "Men's Basketball",
  accentColor: '#116DFF',
  width:       390,
})

defineEmits<{
  back: []
  follow: []
  share: []
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
</script>

<style scoped>
.tp {
  font-family: var(--font-family-base);
  background: linear-gradient(
    180deg,
    var(--color-white) 0%,
    var(--color-gray-100) 25%,
    var(--color-gray-200) 50%,
    var(--color-gray-100) 75%,
    var(--color-white) 100%
  );
  overflow-x: hidden;
}

/* ── Nav ── */
.tp__nav {
  display: flex;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
}

.tp__back-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs2);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.tp__nav-icon {
  color: var(--color-gray-500);
}

.tp__back-label {
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-gray-500);
}

/* ── Hero ── */
.tp__hero-wrap {
  padding: var(--space-xl) var(--space-lg);
}

.tp__hero-card {
  background: var(--color-gray-50);
  border-radius: var(--radius-badge);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}

/* Team Logo */
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
  font-size: var(--text-h1);
  font-weight: var(--font-bold);
  color: var(--color-white);
}

/* Team Info */
.tp__info {
  text-align: center;
}

.tp__name {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-h2);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
}

.tp__sport {
  margin: 4px 0 0;
  font-family: var(--font-family-base);
  font-size: var(--text-caption);
  color: var(--color-gray-500);
}

/* Action Buttons */
.tp__actions {
  display: flex;
  gap: var(--space-md);
}

.tp__btn {
  height: var(--size-button-height);
  padding: 0 var(--space-lg2);
  border-radius: var(--radius-chip);
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tp__btn--primary {
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
}

.tp__btn--primary:hover {
  background: var(--color-primary-hover);
}

.tp__btn--secondary {
  background: transparent;
  color: var(--color-dark-text);
  border: 1px solid var(--color-gray-300);
}

.tp__btn--secondary:hover {
  background: var(--color-gray-50);
}

/* ── Recent Games ── */
.tp__section {
  padding: 0 var(--space-lg) var(--space-xl);
}

.tp__section-header {
  margin-bottom: var(--space-md);
}

.tp__section-title {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-black);
}

/* Game Cards */
.tp__games {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.tp__game-card {
  background: var(--color-white);
  border-radius: var(--radius-badge);
  padding: var(--space-md) var(--space-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 56px;
}

.tp__game-team {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex: 1;
}

.tp__game-team--right {
  justify-content: flex-end;
}

.tp__game-logo {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background: var(--color-gray-200);
  flex-shrink: 0;
}

.tp__game-logo--a {
  background: var(--color-primary);
  opacity: 0.7;
}

.tp__game-logo--b {
  background: var(--color-gray-400);
  opacity: 0.7;
}

.tp__game-name {
  font-family: var(--font-family-base);
  font-size: var(--text-body2);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
}

.tp__game-score {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0 var(--space-md);
}

.tp__score-num {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
}

.tp__score-sep {
  font-size: var(--text-body2);
  color: var(--color-gray-400);
}

/* See All */
.tp__see-all-wrap {
  display: flex;
  justify-content: center;
  padding: var(--space-lg) 0 0;
}

.tp__see-all {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-link-blue);
}
</style>
