<template>
  <div class="gl" role="region" aria-label="Game Leaders">

    <!-- Title -->
    <h3 class="gl__title">Game Leaders</h3>

    <!-- Team Logos Row -->
    <div class="gl__team-row" role="presentation">
      <div class="gl__team-logo">
        <img v-if="leftLogoUrl" :src="leftLogoUrl" :alt="leftTeam" class="gl__team-logo-img" />
      </div>
      <div class="gl__team-logo">
        <img v-if="rightLogoUrl" :src="rightLogoUrl" :alt="rightTeam" class="gl__team-logo-img" />
      </div>
    </div>

    <!-- Stat Leader Rows -->
    <template v-for="(row, idx) in leaders" :key="row.label">
      <div class="gl__row" role="row" :aria-label="`${row.label}: ${leftTeam} ${row.left.detail}, ${rightTeam} ${row.right.detail}`">
        <!-- Left leader -->
        <div class="gl__leader gl__leader--left">
          <p class="gl__player-num">{{ row.left.num }}</p>
          <p class="gl__player-detail">{{ row.left.detail }}</p>
        </div>

        <!-- Center label -->
        <div class="gl__center">
          <p class="gl__label">{{ row.label }}</p>
        </div>

        <!-- Right leader -->
        <div class="gl__leader gl__leader--right">
          <p class="gl__player-num">{{ row.right.num }}</p>
          <p class="gl__player-detail">{{ row.right.detail }}</p>
        </div>
      </div>

      <!-- Divider (not after last row) -->
      <hr v-if="idx < leaders.length - 1" class="gl__divider" />
    </template>

    <!-- See All button -->
    <div class="gl__footer">
      <button class="gl__see-all" @click="$emit('see-all')">
        See All
        <ChevronDown :size="14" class="gl__chevron" />
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

export interface LeaderEntry {
  num: string
  detail: string
}

export interface LeaderRow {
  label: string
  left: LeaderEntry
  right: LeaderEntry
}

withDefaults(defineProps<{
  leaders?: LeaderRow[]
  leftTeam?: string
  rightTeam?: string
  leftLogoUrl?: string
  rightLogoUrl?: string
}>(), {
  leaders: () => [
    { label: 'Points',   left: { num: '#22', detail: '22 PTS, 9 REB' },  right: { num: '#9',  detail: '19 PTS, 6 REB' } },
    { label: 'Rebounds', left: { num: '#22', detail: '9 REB, 4 OFF' },   right: { num: '#11', detail: '8 REB, 3 OFF'  } },
    { label: 'Assists',  left: { num: '#11', detail: '7 AST, 30 MIN' },  right: { num: '#7',  detail: '6 AST, 28 MIN' } },
  ],
  leftTeam:  'Home',
  rightTeam: 'Away',
})

defineEmits<{ 'see-all': [] }>()
</script>

<style scoped>
.gl {
  padding: var(--space-lg) 20px;
  font-family: var(--font-family-base);
}

/* Title */
.gl__title {
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  margin: 0 0 10px;
}

/* Team logos */
.gl__team-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm2, 10px);
}

.gl__team-logo {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  background: var(--color-gray-100);
  border: 0.5px solid var(--color-gray-300);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.gl__team-logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Leader row */
.gl__row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-sm2, 10px);
}

.gl__leader {
  flex: 1;
}

.gl__leader--left  { text-align: left; }
.gl__leader--right { text-align: right; }

.gl__player-num {
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  margin: 0;
}

.gl__player-detail {
  font-size: var(--text-caption);
  font-weight: var(--font-medium);
  color: var(--color-gray-500);
  margin: 0;
}

/* Center label */
.gl__center {
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
}

.gl__label {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  margin: 0;
}

/* Divider */
.gl__divider {
  border: none;
  border-top: 0.5px solid var(--color-divider-dark); /* DS: divider-dark (#444746), not gray-300 */
  margin: 0 0 var(--space-sm2, 10px);
}

/* Footer */
.gl__footer {
  display: flex;
  justify-content: center;
  margin-top: var(--space-sm2, 10px);
}

.gl__see-all {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  background: var(--color-gray-50); /* DS: gray-50 (#F5F5F5), not gray-100 (#EDEDED) */
  border: none;
  cursor: pointer;
  border-radius: var(--radius-stat-bar);
  padding: 8px 28px;
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold); /* DS: 600, not 500 */
  color: var(--color-dark-text); /* DS: dark-text (#161616), not gray-500 (#6C6C6C) */
}

.gl__see-all:hover {
  background: var(--color-gray-200);
}

.gl__chevron {
  color: var(--color-dark-text); /* DS: matches button text color */
}
</style>
