<template>
  <button
    :class="[
      'app-button',
      `app-button--${variant}`,
      `app-button--${size}`,
      { 'app-button--icon-only': iconOnly, 'app-button--full-width': fullWidth, 'app-button--disabled': disabled }
    ]"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="$emit('click')"
  >
    <span v-if="$slots.leading" class="app-button__icon"><slot name="leading" /></span>
    <slot v-if="!iconOnly" />
    <span v-if="$slots.trailing" class="app-button__icon"><slot name="trailing" /></span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?:   'primary' | 'premium' | 'social' | 'muted' | 'ghost' | 'link' | 'danger' | 'action'
  size?:      'sm' | 'md' | 'lg'
  iconOnly?:  boolean
  fullWidth?: boolean
  disabled?:  boolean
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
  gap: 8px;
  outline: none;
  box-sizing: border-box;
  white-space: nowrap;
}
.app-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── Sizes ── */
.app-button--sm  { height: 32px; font-size: 14px; font-weight: 600; padding: 0 16px; border-radius: 20px; }
.app-button--md  { height: 40px; font-size: 15px; font-weight: 500; padding: 0 24px; border-radius: 20px; }
.app-button--lg  { height: 48px; font-size: 16px; font-weight: 500; padding: 0 28px; border-radius: 24px; }

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
  border-radius: 26px;
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
  border-radius: 26px;
}
.app-button--action:hover:not(:disabled) {
  background: var(--color-primary-hover);
}
.app-button--action:active:not(:disabled) {
  background: var(--color-primary-active);
}

/* ── Disabled ── */
.app-button--disabled,
.app-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Icon slot ── */
.app-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}
</style>
