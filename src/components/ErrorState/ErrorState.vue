<template>
  <div class="ers">
    <!-- Error icon circle -->
    <div class="ers__icon-wrap" aria-hidden="true">
      <X :size="28" color="var(--color-error-red)" role="img" :aria-label="resolvedTitle" />
    </div>

    <!-- Title -->
    <div class="ers__title">{{ resolvedTitle }}</div>

    <!-- Subtitle -->
    <div class="ers__subtitle">{{ resolvedSubtitle }}</div>

    <!-- CTA button -->
    <button
      class="ers__cta"
      :class="{ 'ers__cta--primary': isAuthVariant }"
      @click="$emit('retry')"
    >
      {{ isAuthVariant ? 'Sign In' : 'Try Again' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { X } from 'lucide-vue-next'

type ErrorVariant = 'generic' | 'network' | 'timeout' | 'video' | 'data' | 'auth'

interface ErrorPreset {
  title:    string
  subtitle: string
}

const VARIANTS: Record<ErrorVariant, ErrorPreset> = {
  generic: {
    title:    'Something Went Wrong',
    subtitle: 'An unexpected error occurred. Please try again.',
  },
  network: {
    title:    'Connection Error',
    subtitle: 'Please check your internet connection and try again.',
  },
  timeout: {
    title:    'Request Timed Out',
    subtitle: 'The server took too long to respond. Please try again.',
  },
  video: {
    title:    'Video Unavailable',
    subtitle: 'This video failed to load. It may still be processing.',
  },
  data: {
    title:    'Failed to Load Data',
    subtitle: "We couldn't load this content right now. Please try again.",
  },
  auth: {
    title:    'Session Expired',
    subtitle: 'Your session has expired. Please sign in again.',
  },
}

const props = withDefaults(defineProps<{
  variant?:  ErrorVariant
  title?:    string
  subtitle?: string
}>(), {
  variant: 'generic',
})

defineEmits<{ retry: [] }>()

const preset     = computed(() => VARIANTS[props.variant ?? 'generic'] ?? VARIANTS.generic)
const resolvedTitle    = computed(() => props.title    ?? preset.value.title)
const resolvedSubtitle = computed(() => props.subtitle ?? preset.value.subtitle)
const isAuthVariant    = computed(() => props.variant === 'auth')
</script>

<style scoped>
.ers {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px var(--space-xl);
  text-align: center;
}

/* ── Error icon circle (red tinted background) ── */
.ers__icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  background: var(--color-error-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-lg);
}

/* ── Title ── */
.ers__title {
  font-family: var(--font-family-base);
  font-size: var(--text-h3);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  margin-bottom: var(--space-sm);
}

/* ── Subtitle ── */
.ers__subtitle {
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  font-weight: var(--font-regular);
  color: var(--color-gray-500);
  line-height: 1.5;
  max-width: 280px;
  margin-bottom: var(--space-xl);
}

/* ── CTA button (muted / primary) ── */
.ers__cta {
  background: var(--color-gray-100);
  color: var(--color-dark-text);
  border: none;
  border-radius: var(--radius-pill);
  padding: var(--space-sm2) var(--space-lg2);
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: background 0.15s;
}

.ers__cta:hover {
  background: var(--color-gray-200);
}

.ers__cta--primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.ers__cta--primary:hover {
  background: var(--color-primary-hover);
}
</style>
