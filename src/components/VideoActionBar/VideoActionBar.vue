<template>
  <div class="vab" role="toolbar" :aria-label="ariaLabel">
    <!-- View count -->
    <span class="vab__views" aria-label="Video view count">{{ views }}</span>

    <!-- Action buttons -->
    <div class="vab__actions" aria-label="Video actions">
      <!-- Download -->
      <button
        class="vab__btn"
        :class="{ 'vab__btn--disabled': disabled }"
        :disabled="disabled"
        aria-label="Download video"
        @click="$emit('download')"
      >
        <Download class="vab__icon" :size="20" aria-hidden="true" />
      </button>

      <!-- Share -->
      <button
        class="vab__btn"
        :class="{ 'vab__btn--disabled': disabled }"
        :disabled="disabled"
        aria-label="Share video"
        @click="$emit('share')"
      >
        <Upload class="vab__icon" :size="20" aria-hidden="true" />
      </button>

      <!-- Bookmark -->
      <button
        class="vab__btn"
        :class="{
          'vab__btn--active': bookmarked,
          'vab__btn--disabled': disabled,
          'vab__btn--animating': animating,
        }"
        :disabled="disabled"
        :aria-label="bookmarked ? 'Remove bookmark' : 'Bookmark video'"
        :aria-pressed="bookmarked"
        @click="handleBookmark"
      >
        <Bookmark
          class="vab__icon"
          :class="{ 'vab__icon--bookmark-active': bookmarked }"
          :size="20"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Download, Upload, Bookmark } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  views?: string
  bookmarked?: boolean
  disabled?: boolean
  ariaLabel?: string
}>(), {
  views: '0 views',
  bookmarked: false,
  disabled: false,
  ariaLabel: 'Video actions',
})

const emit = defineEmits<{
  download: []
  share: []
  bookmark: []
}>()

const animating = ref(false)

function handleBookmark() {
  if (props.disabled) return
  animating.value = true
  setTimeout(() => { animating.value = false }, 400)
  emit('bookmark')
}
</script>

<style scoped>
/* ── Wrapper ── */
.vab {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) 0;
  background: transparent;
}

/* ── View count ── */
.vab__views {
  font-family: var(--font-family-base);
  font-size: var(--text-xs);   /* 14px */
  font-weight: 500;
  color: var(--color-gray-500);
}

/* ── Actions row ── */
.vab__actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);   /* 12px */
}

/* ── Button base ── */
.vab__btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);  /* 50% — circle */
  background: var(--color-gray-100);
  color: var(--color-gray-500);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--duration-fast), color var(--duration-fast);
  outline: none;
  flex-shrink: 0;
}

.vab__btn:hover:not(:disabled) {
  background: var(--color-gray-200);
  color: var(--color-gray-400);
}

.vab__btn:active:not(:disabled) {
  background: var(--color-gray-300);
  color: var(--color-dark-text);
}

.vab__btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── Disabled ── */
.vab__btn--disabled,
.vab__btn:disabled {
  background: var(--color-gray-overlay);
  color: var(--color-gray-400);
  cursor: not-allowed;
}

/* ── Active (bookmarked) ── */
.vab__btn--active {
  background: var(--color-gray-100);
  color: var(--color-primary);
}

.vab__btn--active:hover:not(:disabled) {
  background: var(--color-gray-200);
  color: var(--color-primary-hover);
}

.vab__btn--active:active:not(:disabled) {
  background: var(--color-gray-300);
  color: var(--color-primary-active);
}

/* ── Icons — inherit color from button via currentColor ── */
.vab__icon {
  display: block;
  flex-shrink: 0;
}

/* Bookmark active: filled solid blue */
.vab__icon--bookmark-active {
  fill: var(--color-primary);
  stroke: var(--color-primary);
}

/* ── Bookmark pop animation ── */
@keyframes bookmarkPop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.25); }
  100% { transform: scale(1); }
}

.vab__btn--animating {
  animation: bookmarkPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
