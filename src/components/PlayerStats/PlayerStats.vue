<template>
  <div class="ps" :class="{ 'ps--paywall': paywall }">

    <!-- Content (blurred when paywall) -->
    <div class="ps__content" :class="{ 'ps__content--blurred': paywall }">

      <!-- Team Tabs (hidden when parent page owns the tab bar) -->
      <div v-if="showTabs" class="ps__tabs">
        <button
          v-for="(team, idx) in teams"
          :key="team"
          class="ps__tab"
          :class="{ 'ps__tab--active': activeTab === idx }"
          :aria-pressed="activeTab === idx"
          :aria-label="`Show ${team} stats`"
          @click="activeTab = idx"
        >
          {{ team }}
        </button>
      </div>

      <!-- Column Headers -->
      <div class="ps__header-row">
        <span class="ps__col ps__col--player ps__col--label">{{ columns[0] }}</span>
        <span
          v-for="col in columns.slice(1)"
          :key="col"
          class="ps__col ps__col--stat ps__col--label"
        >{{ col }}</span>
      </div>

      <!-- Divider -->
      <hr class="ps__hr ps__hr--track" />

      <!-- Data Rows -->
      <div v-for="(row, rIdx) in rows" :key="rIdx" class="ps__data-row-wrap">
        <div class="ps__data-row">
          <span class="ps__col ps__col--player">{{ row[0] }}</span>
          <span
            v-for="(cell, cIdx) in row.slice(1)"
            :key="cIdx"
            class="ps__col ps__col--stat"
          >{{ cell }}</span>
        </div>
        <hr class="ps__hr ps__hr--red" />
      </div>

    </div>

    <!-- Paywall overlay -->
    <div v-if="paywall" class="ps__overlay">
      <div class="ps__lock-group">
        <div class="ps__lock-circle">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" fill="var(--color-premium-yellow)"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="var(--color-premium-yellow)" stroke-width="2.67" stroke-linecap="round"/>
          </svg>
        </div>
        <p class="ps__lock-label">{{ paywallLabel }}</p>
      </div>
      <button class="ps__buy-btn" @click="$emit('buy')">Buy Now</button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  teams?: string[]
  columns?: string[]
  rows?: string[][]
  paywall?: boolean
  paywallLabel?: string
  showTabs?: boolean
}>(), {
  teams:   () => ['Maccabi Kiryat Gat', 'Ironi Nahariya'],
  columns: () => ['Player', 'MIN', 'PTS', 'REB', 'AST'],
  rows:    () => [
    ['#5',  '32', '18', '7', '3'],
    ['#3',  '28', '14', '4', '5'],
    ['#22', '35', '22', '9', '2'],
    ['#13', '26', '8',  '3', '1'],
    ['#11', '30', '16', '5', '7'],
    ['#23', '18', '4',  '2', '1'],
    ['#8',  '24', '10', '3', '2'],
    ['#7',  '15', '6',  '2', '3'],
  ],
  paywall:      false,
  paywallLabel: 'Buy Team Stats',
  showTabs:     true,
})

defineEmits<{ buy: [] }>()

const activeTab = ref(0)
</script>

<style scoped>
.ps {
  position: relative;
  font-family: var(--font-family-base);
  border-radius: var(--radius-card);
  overflow: hidden;
}

/* Blurred content when locked */
.ps__content--blurred {
  filter: blur(4px);
  opacity: 0.5;
  pointer-events: none;
  user-select: none;
}

/* Team Tabs */
.ps__tabs {
  display: flex;
  margin-bottom: var(--space-md2, 14px);
}

.ps__tab {
  flex: 1;
  background: none;
  border: none;
  border-bottom: 2px solid var(--color-bar-track);
  padding: 0 0 var(--space-sm);
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-gray-400);
  cursor: pointer;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  outline: none;
  transition: color var(--duration-fast), border-color var(--duration-fast);
}

.ps__tab--active {
  border-bottom-color: var(--color-jersey-red);
  color: var(--color-dark-text);
}

.ps__tab:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Column header row */
.ps__header-row {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-sm2, 10px);
}

.ps__col {
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.ps__col--player {
  width: 80px;
  text-align: left;
  flex-shrink: 0;
}

.ps__col--stat {
  flex: 1;
  text-align: center;
}

.ps__col--label {
  font-size: var(--text-caption);
  color: var(--color-gray-400);
}

/* Dividers */
.ps__hr {
  border: none;
  margin: 0;
}

.ps__hr--track {
  border-top: 1px solid var(--color-bar-track);
  margin-bottom: var(--space-sm);
}

.ps__hr--red {
  border-top: 1px solid var(--color-jersey-red);
  opacity: 0.15;
}

/* Data rows */
.ps__data-row-wrap {
  /* wrapper to pair row + divider */
}

.ps__data-row {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.ps__data-row .ps__col {
  color: var(--color-dark-text);
}

/* Paywall overlay */
.ps__overlay {
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

.ps__lock-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.ps__lock-circle {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: var(--color-premium-dark);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ps__lock-label {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-dark-text);
  margin: 0;
}

.ps__buy-btn {
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

.ps__buy-btn:hover {
  background: var(--color-premium-amber);
}

/* Content padding (matches DS: 16px 20px) */
.ps__content {
  padding: var(--space-lg) 20px;
}
</style>
