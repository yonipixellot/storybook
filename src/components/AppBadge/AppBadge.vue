<template>
  <div
    :class="['app-badge', `app-badge--${variant}`, `app-badge--${size}`]"
    :aria-label="ariaLabel || label"
    role="status"
  >
    <span v-if="variant === 'live'" class="app-badge__dot" />
    <svg v-if="variant === 'highlights'" class="app-badge__play" width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" fill="var(--color-premium-yellow)" />
    </svg>
    {{ label }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'live' | 'premium' | 'free' | 'claimed' | 'highlights' | 'new'
  size?: 'md' | 'sm'
  ariaLabel?: string
}>(), {
  variant: 'live',
  size: 'md',
})

const labels: Record<string, string> = {
  live: 'Live',
  premium: 'Premium',
  free: 'Free',
  claimed: 'Claimed',
  highlights: 'Highlights',
  new: 'New',
}
const label = computed(() => labels[props.variant || 'live'])
</script>

<style scoped>
/* ── Base ── */
.app-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-family-system); /* DS uses system font, not Red Hat Display */
  font-weight: 700;
  text-transform: uppercase;
  border-radius: var(--radius-badge);
  box-sizing: border-box;
  white-space: nowrap;
}

/* ── Sizes ── */
.app-badge--md {
  padding: 4px 12px;
  font-size: var(--text-2xs);
}
.app-badge--sm {
  padding: 2px 6px;
  font-size: 9px;
}

/* ── Live ── */
.app-badge--live {
  background: var(--color-live-red);
  color: var(--color-white);
}
.app-badge--live.app-badge--md {
  font-size: var(--text-caption);
  font-weight: 600;
}

.app-badge__dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background: var(--color-white);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* ── Premium ── */
.app-badge--premium {
  background: var(--color-premium-amber);
  color: var(--color-white);
}

/* ── Free ── */
.app-badge--free {
  background: var(--color-primary);
  color: var(--color-white);
}

/* ── Claimed ── */
.app-badge--claimed {
  background: var(--color-claimed-purple);
  color: var(--color-white);
}

/* ── Highlights ── */
.app-badge--highlights {
  background: var(--color-gray-500);
  color: var(--color-premium-yellow);
  border: 0.5px solid var(--color-premium-yellow);
}

.app-badge__play {
  display: block;
  flex-shrink: 0;
}

/* ── New ── */
.app-badge--new {
  background: var(--color-gray-100);
  color: var(--color-dark-text);
}

/* ── Dark mode overrides ── */
[data-theme="dark"] .app-badge--highlights {
  /* DS dark: bg shifts from gray-500 (#6C6C6C) → gray-200 (#444444 in dark) */
  background: var(--color-gray-200);
}
/* Static colored backgrounds — pin text/dot to white so they don't invert */
[data-theme="dark"] .app-badge--live,
[data-theme="dark"] .app-badge--premium,
[data-theme="dark"] .app-badge--free,
[data-theme="dark"] .app-badge--claimed {
  color: #FFFFFF;
}
[data-theme="dark"] .app-badge__dot {
  background: #FFFFFF;
}
</style>
