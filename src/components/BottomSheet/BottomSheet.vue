<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="bs-fade">
      <div
        v-if="open"
        class="bs__backdrop"
        :data-theme="currentTheme"
        role="presentation"
        @click="closeOnBackdrop && $emit('close')"
      />
    </Transition>

    <!-- Sheet -->
    <Transition name="bs-slide-up">
      <div
        v-if="open"
        class="bs"
        :data-theme="currentTheme"
        role="dialog"
        :aria-labelledby="title ? 'bs-title' : undefined"
        aria-modal="true"
      >
        <!-- Drag handle -->
        <div v-if="showHandle" class="bs__handle" aria-hidden="true" />

        <!-- Header (title + close) -->
        <div v-if="title || showClose" class="bs__header">
          <h3 v-if="title" id="bs-title" class="bs__title">{{ title }}</h3>
          <span v-else />
          <button
            v-if="showClose"
            class="bs__close"
            aria-label="Close"
            @click="$emit('close')"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Content slot -->
        <div class="bs__content">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

/* ── Theme detection — Teleport moves content outside [data-theme] wrapper ──
   MutationObserver watches for data-theme changes and mirrors onto the sheet. */
const currentTheme = ref('')

let themeObserver: MutationObserver | null = null

onMounted(() => {
  const getTheme = () => {
    const el = document.querySelector('[data-theme]')
    currentTheme.value = el?.getAttribute('data-theme') ?? ''
  }
  getTheme()
  themeObserver = new MutationObserver(getTheme)
  themeObserver.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ['data-theme'],
  })
})

onUnmounted(() => {
  themeObserver?.disconnect()
})

withDefaults(defineProps<{
  open?:             boolean
  title?:            string
  showHandle?:       boolean
  showClose?:        boolean
  closeOnBackdrop?:  boolean
}>(), {
  open:            false,
  showHandle:      true,
  showClose:       false,
  closeOnBackdrop: true,
})

defineEmits<{ close: [] }>()
</script>

<style scoped>
/* ── Backdrop ── */
.bs__backdrop {
  position: fixed;
  inset: 0;
  background: var(--color-overlay);
  z-index: var(--z-dropdown);
}

.bs-fade-enter-active {
  transition: opacity var(--duration-normal) var(--easing-standard);
}
.bs-fade-leave-active {
  transition: opacity var(--duration-normal) var(--easing-standard);
}
.bs-fade-enter-from,
.bs-fade-leave-to {
  opacity: 0;
}

/* ── Sheet ── */
.bs {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-white);
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  padding: var(--space-md) var(--space-lg) var(--space-xl);
  z-index: var(--z-modal);
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: var(--shadow-popup);
}

/* ── Slide-up transition ── */
.bs-slide-up-enter-active {
  transition: transform var(--duration-slow) var(--easing-out);
}
.bs-slide-up-leave-active {
  transition: transform var(--duration-slow) var(--easing-in);
}
.bs-slide-up-enter-from,
.bs-slide-up-leave-to {
  transform: translateY(100%);
}

/* ── Drag handle ── */
.bs__handle {
  width: 36px;
  height: 4px;
  border-radius: var(--radius-full);
  background: var(--color-gray-300);
  margin: 0 auto var(--space-md);
}

/* ── Header ── */
.bs__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
}

.bs__title {
  font-family: var(--font-family-base);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--color-dark-text);
  margin: 0;
}

/* ── Close button ── */
.bs__close {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--color-gray-100);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-dark-text);
  transition: background var(--duration-fast);
  flex-shrink: 0;
}

.bs__close:hover {
  background: var(--color-gray-200);
}

.bs__close:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── Content ── */
.bs__content {
  font-family: var(--font-family-base);
  color: var(--color-dark-text);
}
</style>
