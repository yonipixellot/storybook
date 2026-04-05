<template>
  <button
    :class="[
      'app-button',
      `app-button--${variant}`,
      `app-button--${size}`,
      { 'app-button--icon-only': iconOnly, 'app-button--full-width': fullWidth, 'app-button--disabled': disabled || loading, 'app-button--loading': loading }
    ]"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
    :aria-busy="loading || undefined"
    @click="$emit('click')"
  >
    <span v-if="loading" class="app-button__spinner" aria-hidden="true" />
    <template v-else>
      <span v-if="$slots.leading" class="app-button__icon"><slot name="leading" /></span>
      <slot v-if="!iconOnly" />
      <span v-if="$slots.trailing" class="app-button__icon"><slot name="trailing" /></span>
    </template>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?:   'primary' | 'premium' | 'social' | 'muted' | 'ghost' | 'link' | 'danger' | 'action'
  size?:      'sm' | 'md' | 'lg'
  iconOnly?:  boolean
  fullWidth?: boolean
  disabled?:  boolean
  loading?:   boolean
  ariaLabel?: string
}>(), {
  variant: 'primary',
  size: 'md',
  iconOnly: false,
  fullWidth: false,
  disabled: false,
})
defineEmits<{ click: [] }>()
</script>

<style scoped>
/* ── Base ── */
.app-button {
  font-family: var(--font-family-base);
  border: none;
  cursor: pointer;
  transition: all var(--duration-fast) var(--easing-standard);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  outline: none;
  box-sizing: border-box;
  white-space: nowrap;
}
.app-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── Sizes ── */
.app-button--sm  { height: 32px; font-size: var(--text-xs); font-weight: 600; padding: 0 var(--space-lg); border-radius: var(--radius-lg); }
.app-button--md  { height: 40px; font-size: var(--text-sm); font-weight: 500; padding: 0 var(--space-xl); border-radius: var(--radius-lg); }
.app-button--lg  { height: 48px; font-size: var(--text-base); font-weight: 700; padding: 0 28px; border-radius: 28px; } /* DS: fw=700, radius=28px */

.app-button--full-width { width: 100%; }
.app-button--icon-only  { padding: 0; aspect-ratio: 1; }

/* ── Primary ── */
.app-button--primary {
  background: var(--color-primary);
  color: var(--color-white);
}
.app-button--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
}
.app-button--primary:active:not(:disabled) {
  background: var(--color-primary-active);
}

/* ── Premium ── */
.app-button--premium {
  background: var(--color-premium-yellow);
  color: var(--color-black);
  border-radius: var(--radius-chip);
}
.app-button--premium:hover:not(:disabled) {
  background: var(--color-premium-hover);
}
.app-button--premium:active:not(:disabled) {
  background: var(--color-premium-active);
}

/* ── Social ── */
.app-button--social {
  background: var(--color-white);
  color: var(--color-black);
  border: 0.5px solid var(--color-gray-200);
}
.app-button--social:hover:not(:disabled) {
  background: var(--color-gray-50);
}
.app-button--social:active:not(:disabled) {
  background: var(--color-gray-100);
}

/* ── Muted ── */
.app-button--muted {
  background: var(--color-gray-50);
  color: var(--color-dark-text);
}
.app-button--muted:hover:not(:disabled) {
  background: var(--color-gray-100);
}
.app-button--muted:active:not(:disabled) {
  background: var(--color-gray-300);
}

/* ── Ghost ── */
.app-button--ghost {
  background: transparent;
  color: var(--color-gray-400);
}
.app-button--ghost:hover:not(:disabled) {
  background: var(--color-gray-50);
}
.app-button--ghost:active:not(:disabled) {
  background: var(--color-gray-100);
}

/* ── Link ── */
.app-button--link {
  background: transparent;
  color: var(--color-link-blue);
  text-decoration: underline;
}
.app-button--link:hover:not(:disabled) {
  opacity: 0.8;
}

/* ── Danger ── */
.app-button--danger {
  background: transparent;
  color: var(--color-error-red);
}
.app-button--danger:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.08);
}

/* ── Action ── */
.app-button--action {
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-chip);
}
.app-button--action:hover:not(:disabled) {
  background: var(--color-primary-hover);
}
.app-button--action:active:not(:disabled) {
  background: var(--color-primary-active);
}

/* ── Disabled ── */
/* DS: colored-bg variants → gray semi-transparent bg + gray-400 text (NOT just opacity) */
.app-button:disabled,
.app-button--disabled {
  cursor: not-allowed;
  color: var(--color-gray-400);
}
.app-button--primary:disabled,
.app-button--primary.app-button--disabled,
.app-button--premium:disabled,
.app-button--premium.app-button--disabled,
.app-button--muted:disabled,
.app-button--muted.app-button--disabled,
.app-button--action:disabled,
.app-button--action.app-button--disabled {
  background: var(--color-gray-overlay, rgba(237, 237, 237, 0.6)); /* DS: gray-100 semi-transparent in light; rgba(255,255,255,0.08) in dark via --color-gray-overlay */
}
.app-button--social:disabled,
.app-button--social.app-button--disabled {
  background: var(--color-white); /* DS: social disabled keeps white bg */
}

/* ── Dark mode: colored-bg buttons keep fixed text color (bg doesn't invert) ── */
[data-theme="dark"] .app-button--primary:not(:disabled),
[data-theme="dark"] .app-button--action:not(:disabled) {
  color: #FFFFFF; /* blue bg stays blue → text must stay white */
}
[data-theme="dark"] .app-button--premium:not(:disabled) {
  color: var(--color-premium-dark); /* yellow bg stays yellow → text must stay dark */
}

/* ── Loading ── */
.app-button--loading {
  pointer-events: none;
}
.app-button__spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: var(--radius-full);
  animation: app-button-spin var(--duration-slow) linear infinite;
  opacity: 0.8;
}
@keyframes app-button-spin {
  to { transform: rotate(360deg); }
}

/* ── Icon slot ── */
.app-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}
</style>
