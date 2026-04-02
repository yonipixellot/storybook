<template>
  <div class="nc" role="region" aria-label="Notification Center">

    <!-- Header -->
    <div class="nc__header">
      <h3 class="nc__title">Notification Center</h3>
      <button
        class="nc__clear-btn"
        aria-label="Clear all notifications"
        @click="$emit('clearAll')"
      >Clear all</button>
    </div>

    <!-- Notification list -->
    <div class="nc__list">
      <div
        v-for="(notif, idx) in resolvedNotifications"
        :key="idx"
        class="nc__item"
      >
        <!-- Jersey icon with number -->
        <div class="nc__jersey-wrap" aria-hidden="true">
          <svg
            :width="JERSEY_W"
            :height="JERSEY_H"
            viewBox="0 0 73 67"
            fill="none"
          >
            <path
              :d="JERSEY_PATH"
              class="nc__jersey-path"
            />
          </svg>
          <span class="nc__jersey-number">{{ notif.jerseyNumber }}</span>
        </div>

        <!-- Notification text -->
        <span class="nc__text">{{ notif.text }}</span>
      </div>

      <!-- Empty state -->
      <p v-if="resolvedNotifications.length === 0" class="nc__empty">
        No new notifications
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface NotifItem {
  jerseyNumber: number
  text:         string
}

const DEFAULT_NOTIFICATIONS: NotifItem[] = [
  {
    jerseyNumber: 4,
    text: '"Player #4 Highlight" from the game "S.D Spartans vs. Logan Thunder (121-89, Nov 13, 2025)" is now ready!',
  },
  {
    jerseyNumber: 11,
    text: '"Player #11 Highlight" from the game "S.D Spartans vs. Logan Thunder (121-89, Nov 13, 2025)" is now ready!',
  },
  {
    jerseyNumber: 4,
    text: '"Player #4 Highlight" from the game "S.D Spartans vs. Logan Thunder (121-89, Nov 13, 2025)" is now ready!',
  },
]

/** Jersey SVG path (scaled to 73×67 viewBox) */
const JERSEY_PATH = 'M 30,6 Q 36.5,22 43,6 L 51,6 Q 51,28 59,28 L 59,62 Q 59,67 55,67 L 18,67 Q 14,67 14,62 L 14,28 Q 22,28 22,6 L 30,6 Z'

/** Rendered jersey dimensions (DS: 50px wide, aspect 67/73 of viewBox) */
const JERSEY_W = 50
const JERSEY_H = Math.round(50 * (67 / 73))

const props = withDefaults(defineProps<{
  notifications?: NotifItem[]
}>(), {})

defineEmits<{ clearAll: [] }>()

const resolvedNotifications = computed(() =>
  props.notifications ?? DEFAULT_NOTIFICATIONS
)
</script>

<style scoped>
/* ── Container ── */
.nc {
  width: 100%;
  max-width: 380px;
  background: var(--color-white);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-popup);
  overflow: hidden;
}

/* ── Header ── */
.nc__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-gray-100);
}

.nc__title {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-black);
}

.nc__clear-btn {
  background: none;
  border: none;
  font-family: var(--font-family-base);
  font-size: var(--text-body2);
  color: var(--color-gray-400);
  cursor: pointer;
  border-radius: var(--radius-sm);
  padding: 2px 4px;
}

.nc__clear-btn:hover {
  color: var(--color-dark-text);
}

/* ── List ── */
.nc__list {
  padding: 0 20px;
  max-height: 320px;
  overflow-y: auto;
}

/* ── Notification item ── */
.nc__item {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-md2) 0;
  border-bottom: 1px solid var(--color-gray-100);
  align-items: flex-start;
}

.nc__item:last-child {
  border-bottom: none;
}

/* ── Jersey ── */
.nc__jersey-wrap {
  position: relative;
  flex-shrink: 0;
}

.nc__jersey-path {
  fill: var(--color-jersey-red);
  stroke: var(--color-white);
  stroke-width: var(--stroke-thick);
}

.nc__jersey-number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -38%);
  font-family: var(--font-family-base);
  font-size: var(--text-h3);
  font-weight: var(--font-extra-bold);
  color: var(--color-white);
  line-height: 1;
}

/* ── Text ── */
.nc__text {
  font-family: var(--font-family-base);
  font-size: var(--text-body2);
  font-weight: var(--font-regular);
  color: var(--color-black);
  line-height: 1.5;
  flex: 1;
}

/* ── Empty state ── */
.nc__empty {
  padding: var(--space-lg) 0;
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  color: var(--color-gray-400);
  text-align: center;
  margin: 0;
}
</style>
