<template>
  <div class="tsb" :class="{ 'tsb--paywall': paywall }">

    <!-- Stat rows (always rendered; blurred when paywall=true) -->
    <div class="tsb__rows" :class="{ 'tsb__rows--blurred': paywall }">
      <div
        v-for="(row, idx) in rows"
        :key="idx"
        class="tsb__row"
        :class="{ 'tsb__row--divider': idx > 0 }"
      >
        <!-- Value / Label header -->
        <div class="tsb__header">
          <span class="tsb__val tsb__val--left">{{ row.leftVal }}</span>
          <span class="tsb__label">{{ row.label }}</span>
          <span class="tsb__val tsb__val--right">{{ row.rightVal }}</span>
        </div>

        <!-- Progress bars -->
        <div class="tsb__bars">
          <!-- Left bar (right-aligned fill) -->
          <div class="tsb__track tsb__track--left">
            <div
              class="tsb__fill tsb__fill--red"
              :style="{ width: leftPct(row) + '%' }"
            />
          </div>
          <!-- Right bar (left-aligned fill) -->
          <div class="tsb__track tsb__track--right">
            <div
              class="tsb__fill tsb__fill--gray"
              :style="{ width: rightPct(row) + '%' }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Paywall overlay -->
    <div v-if="paywall" class="tsb__overlay">
      <div class="tsb__lock-group">
        <div class="tsb__lock-circle">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" fill="var(--color-premium-yellow)"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="var(--color-premium-yellow)" stroke-width="2.67" stroke-linecap="round"/>
          </svg>
        </div>
        <p class="tsb__lock-label">{{ paywallLabel }}</p>
      </div>
      <button class="tsb__buy-btn" @click="$emit('buy')">Buy Now</button>
    </div>

  </div>
</template>

<script setup lang="ts">
export interface StatRow {
  label: string
  leftVal: number
  rightVal: number
}

const props = withDefaults(defineProps<{
  rows?: StatRow[]
  paywall?: boolean
  paywallLabel?: string
}>(), {
  rows: () => [
    { label: 'Points',       leftVal: 82, rightVal: 76 },
    { label: 'Field Goal %', leftVal: 48, rightVal: 42 },
    { label: '2-Point %',    leftVal: 54, rightVal: 49 },
  ],
  paywall: false,
  paywallLabel: 'Buy Team Stats',
})

defineEmits<{ buy: [] }>()

function leftPct(row: StatRow): number {
  const total = row.leftVal + row.rightVal
  return total === 0 ? 50 : (row.leftVal / total) * 100
}
function rightPct(row: StatRow): number {
  const total = row.leftVal + row.rightVal
  return total === 0 ? 50 : (row.rightVal / total) * 100
}
</script>

<style scoped>
.tsb {
  position: relative;
  font-family: var(--font-family-base);
  border-radius: var(--radius-card);
  overflow: hidden;
}

/* ── Rows ── */
.tsb__rows--blurred {
  filter: blur(4px);
  opacity: 0.5;
  pointer-events: none;
  user-select: none;
}

.tsb__row {
  padding: var(--space-lg) 20px;
}

.tsb__row--divider {
  border-top: 1px solid var(--color-gray-100);
}

/* Header */
.tsb__header {
  display: flex;
  align-items: center;
  gap: var(--space-sm2, 10px);
  margin-bottom: var(--space-sm2, 10px);
}

.tsb__val {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  width: 28px;
  flex-shrink: 0;
}

.tsb__val--left  { text-align: left; }
.tsb__val--right { text-align: right; }

.tsb__label {
  flex: 1;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  text-align: center;
}

/* Bars */
.tsb__bars {
  display: flex;
  gap: var(--space-sm2, 10px);
}

.tsb__track {
  flex: 1;
  height: 8px;
  background: var(--color-bar-track);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.tsb__track--left  { display: flex; justify-content: flex-end; }
.tsb__track--right { display: flex; justify-content: flex-start; }

.tsb__fill {
  height: 8px;
  border-radius: var(--radius-sm);
}

.tsb__fill--red  { background: var(--color-bar-red); }
.tsb__fill--gray { background: var(--color-bar-gray); }

/* ── Paywall Overlay ── */
.tsb__overlay {
  position: absolute;
  inset: 0;
  background: var(--color-frost-overlay);
  border-radius: var(--radius-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg2, 20px);
}

.tsb__lock-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.tsb__lock-circle {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: var(--color-premium-dark);
  border: 2.67px solid var(--color-premium-yellow);
  display: flex;
  align-items: center;
  justify-content: center;
}

.tsb__lock-label {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-dark-text);
  margin: 0;
}

.tsb__buy-btn {
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.tsb__buy-btn:hover {
  background: var(--color-premium-amber);
}
</style>
