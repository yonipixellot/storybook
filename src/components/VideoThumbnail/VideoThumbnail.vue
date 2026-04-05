<template>
  <div
    ref="cardRef"
    class="vt"
    :class="[
      `vt--${orientation}`,
      { 'vt--locked': locked, 'vt--error': error }
    ]"
    :aria-label="computedAriaLabel"
    role="button"
    tabindex="0"
    @click="$emit('click')"
    @keydown.enter="$emit('click')"
  >
    <!-- Error Fallback -->
    <template v-if="error">
      <svg class="vt__error-icon" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" stroke="#979797" />
        <path d="M12 8v4m0 4h.01" stroke="#979797" />
      </svg>
      <span class="vt__error-text">Failed to load</span>
      <a href="#" class="vt__error-link" @click.stop>Report here</a>
    </template>

    <!-- Normal card content -->
    <template v-else>
      <!-- Thumbnail image or placeholder -->
      <img v-if="thumbnailUrl" :src="thumbnailUrl" :alt="title" class="vt__img" />
      <div v-else class="vt__placeholder"></div>

      <!-- Blur overlay for locked cards (not countdown/error) -->
      <div v-if="locked && activeVariant !== 'countdown'" class="vt__blur"></div>

      <!-- Countdown overlays -->
      <template v-if="activeVariant === 'countdown'">
        <div class="vt__countdown-bg"></div>
        <div class="vt__countdown-blur"></div>
        <div class="vt__countdown-overlay"></div>
        <div class="vt__countdown-center">
          <div class="vt__countdown-text">
            <p class="vt__countdown-label">NEW DROP IN</p>
            <p class="vt__countdown-timer">{{ countdownDisplay }}</p>
          </div>
          <!-- Notify button mode -->
          <button v-if="countdownNotify" class="vt__notify-btn" @click.stop="$emit('notify')">
            Notify me
          </button>
          <!-- Default: circular progress ring -->
          <div v-else class="vt__countdown-ring">
            <svg viewBox="0 0 56 56" width="56" height="56">
              <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.25)" stroke-width="4" fill="none" />
              <circle cx="28" cy="28" r="24" stroke="#FFFFFF" stroke-width="4" fill="none"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="dashOffset"
                stroke-linecap="round"
                transform="rotate(-90 28 28)" />
            </svg>
            <div class="vt__countdown-ring-icon">
              <svg viewBox="0 0 20 20" width="18" height="18" fill="white">
                <path d="M6 4l11 6-11 6V4z" />
              </svg>
            </div>
          </div>
        </div>
      </template>

      <!-- LIVE badge -->
      <div v-if="activeVariant === 'live'" class="vt__badge-wrap vt__badge-wrap--live">
        <div class="vt__live-badge">
          <div class="vt__live-dot"></div>
          <span>LIVE</span>
        </div>
      </div>

      <!-- NEW badge -->
      <div v-if="activeVariant === 'new'" class="vt__badge-wrap">
        <div class="vt__new-badge">New</div>
      </div>

      <!-- Duration badge (only when no variant badge) -->
      <div v-if="!activeVariant && !showJerseyBadge" class="vt__duration">
        <span>{{ duration }}</span>
      </div>
      <div v-if="showJerseyBadge && !activeVariant" class="vt__duration vt__duration--jersey">
        <span>{{ duration }}</span>
      </div>

      <!-- Lock icon (locked, not countdown) -->
      <div
        v-if="locked && activeVariant !== 'countdown'"
        class="vt__icon vt__icon--lock"
        role="img" aria-label="Locked"
      >
        <svg width="11" height="13.75" viewBox="0 0 8 10" fill="#FFE000">
          <path d="M7.026 4.069H6.738L6.737 2.701C6.736 1.211 5.465-.001 3.903 0 2.341.001 1.07 1.213 1.072 2.703L1.074 4.071H.971C.434 4.072-.001 4.488 0 5v4.072c0 .512.437.928.974.928l6.055-.003c.537 0 .972-.416.972-.928V4.996c0-.512-.437-.928-.974-.928ZM2.118 4.071L2.115 2.703c0-.94.802-1.707 1.788-1.707.987 0 1.789.765 1.789 1.706l.003 1.368H2.118Z" />
        </svg>
      </div>

      <!-- Play icon (free, not countdown) -->
      <div
        v-if="!locked && activeVariant !== 'countdown'"
        class="vt__icon vt__icon--play"
        :class="{ 'vt__icon--jersey-play': showJerseyBadge }"
        role="img" aria-label="Play video"
      >
        <svg :width="showJerseyBadge ? 16 : 12" :height="showJerseyBadge ? 16 : 12" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2">
          <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
        </svg>
      </div>

      <!-- Bottom overlay (not countdown, not error) -->
      <div v-if="activeVariant !== 'countdown'" class="vt__overlay">
        <!-- Jersey badge mode -->
        <template v-if="showJerseyBadge">
          <div class="vt__jersey-row">
            <div class="vt__jersey-icon" :style="{ '--jersey-color': jerseyColor }">
              <svg viewBox="12 4 50 66" class="vt__jersey-svg">
                <path d="M 30,6 Q 36.5,22 43,6 L 51,6 Q 51,28 59,28 L 59,62 Q 59,67 55,67 L 18,67 Q 14,67 14,62 L 14,28 Q 22,28 22,6 L 30,6 Z" :fill="jerseyColor" />
              </svg>
              <span class="vt__jersey-number" :style="{ color: jerseyTextColor }">{{ jerseyNumber }}</span>
            </div>
            <div class="vt__jersey-label">{{ jerseyLabel }}</div>
          </div>
        </template>
        <!-- Normal title/subtitle mode -->
        <template v-else>
          <div class="vt__title">{{ title }}</div>
          <div class="vt__subtitle">{{ subtitle }}</div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  orientation?: 'landscape' | 'vertical'
  locked?: boolean
  duration?: string
  title?: string
  subtitle?: string
  variant?: 'live' | 'countdown' | 'new'
  showJerseyBadge?: boolean
  jerseyNumber?: number
  jerseyLabel?: string
  jerseyColor?: string
  thumbnailUrl?: string
  error?: boolean
  countdownSeconds?: number
  countdownNotify?: boolean
  ariaLabel?: string
}>(), {
  orientation: 'landscape',
  locked: false,
  duration: '0:00',
  title: '',
  subtitle: '',
  showJerseyBadge: false,
  jerseyNumber: 0,
  jerseyLabel: 'Player Highlights',
  jerseyColor: '#D0142C',
  thumbnailUrl: '',
  error: false,
  countdownSeconds: 3839,
  countdownNotify: false,
})

defineEmits<{ click: [], notify: [] }>()

const computedAriaLabel = computed(() =>
  props.ariaLabel || `${props.title}${props.locked ? ', locked' : ''}`
)

/* Auto dark/light text on jersey number based on color luminance */
const jerseyTextColor = computed(() => {
  const hex = props.jerseyColor.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#161616' : '#ffffff'
})

/* Countdown logic */
const remaining = ref(props.countdownSeconds)
const circumference = 2 * Math.PI * 24 // ~150.796
const totalSeconds = props.countdownSeconds
const transitioned = ref(false)

const activeVariant = computed(() => {
  if (props.variant === 'countdown' && transitioned.value) return 'new'
  return props.variant
})

const dashOffset = computed(() => {
  const progress = remaining.value / totalSeconds
  return circumference * progress
})

const countdownDisplay = computed(() => {
  const h = Math.floor(remaining.value / 3600)
  const m = Math.floor((remaining.value % 3600) / 60)
  const s = remaining.value % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

let timer: ReturnType<typeof setInterval> | null = null
const cardRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

function startCountdown() {
  if (timer) return // already running
  timer = setInterval(() => {
    if (remaining.value > 0) {
      remaining.value--
    } else {
      transitioned.value = true
      if (timer) clearInterval(timer)
    }
  }, 1000)
}

onMounted(() => {
  if (props.variant === 'countdown') {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCountdown()
          observer?.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    const el = cardRef.value
    if (el) observer.observe(el)
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  observer?.disconnect()
})
</script>

<style scoped>
/* ── Base ── */
.vt {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  font-family: var(--font-family-base);
  outline: none;
  text-align: left;
}

.vt:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── Orientation: Landscape ── */
.vt--landscape {
  width: 398px;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  background-color: var(--color-hero-bg);
}

/* ── Orientation: Vertical ── */
.vt--vertical {
  width: 108px;
  height: 192px;
  border-radius: 12px;
  background-color: var(--color-hero-bg);
}

/* ── Error state ── */
.vt--error {
  background-color: var(--color-gray-100);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.vt__error-icon {
  width: 24px;
  height: 24px;
}

.vt__error-text {
  font-size: 10px;
  font-weight: 500;
  color: var(--color-gray-400);
}

.vt__error-link {
  font-size: 9px;
  font-weight: 400;
  color: var(--color-primary);
  text-decoration: none;
}

.vt__error-link:hover {
  text-decoration: underline;
}

/* ── Thumbnail / placeholder ── */
.vt__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Design Gap: --gradient-hero token needed for this multi-stop hero gradient */
.vt__placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2A4A7F 0%, #1A3A5C 40%, #3A6A9F 70%, #1A2A50 100%);
}

/* ── Blur overlay (locked) ── */
.vt__blur {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #2A4A7F 0%, #1A3A5C 40%, #3A6A9F 70%, #1A2A50 100%);
  filter: blur(8px);
}

/* ── Duration badge ── */
.vt__duration {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 9999px;
}

.vt--landscape .vt__duration {
  top: 8px;
  left: 8px;
  padding: 2px 8px;
}

.vt--vertical .vt__duration {
  top: 6px;
  left: 6px;
  padding: 2px 4px;
}

.vt__duration span {
  font-size: 11px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 11px;
}

/* ── Badge wrappers (LIVE / NEW) ── */
.vt__badge-wrap {
  position: absolute;
  top: 2px;
  left: 6px;
}

.vt__live-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--color-live-red);
  border-radius: 12px;
  padding: 2px 6px;
  font-size: 9px;
  font-weight: 600;
  color: #FFFFFF;
  line-height: normal;
}

.vt__live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #FFFFFF;
  animation: liveDotFlicker 1.2s ease-in-out infinite;
}

@keyframes liveDotFlicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

.vt__new-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--color-gray-100);
  border-radius: 12px;
  padding: 2px 6px;
  font-size: 9px;
  font-weight: 700;
  color: var(--color-dark-text);
  line-height: normal;
}

/* ── Lock / Play icons ── */
.vt__icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.vt__icon--lock {
  background: var(--color-premium-dark);
}

.vt__icon--play {
  background: var(--color-gray-500);
}

/* Landscape icon positioning */
.vt--landscape .vt__icon {
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
}

/* Vertical icon positioning */
.vt--vertical .vt__icon {
  top: 7px;
  right: 6px;
  width: 28px;
  height: 28px;
}

/* Jersey play icon — centered on card */
.vt__icon--jersey-play {
  top: 50% !important;
  left: 50% !important;
  right: auto !important;
  transform: translate(-50%, -50%);
  width: 36px !important;
  height: 36px !important;
}

/* ── Bottom overlay ── */
.vt__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.vt--landscape .vt__overlay {
  padding: 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0) 100%);
}

.vt--vertical .vt__overlay {
  padding: 8px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 49%, rgba(114, 123, 132, 0) 100%);
}

/* ── Title / subtitle ── */
.vt__title {
  font-size: 14px;
  font-weight: 700;
  color: #FFFFFF;
}

.vt--landscape .vt__title {
  line-height: 18px;
}

.vt--vertical .vt__title {
  line-height: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.vt__subtitle {
  color: var(--color-gray-300);
}

.vt--landscape .vt__subtitle {
  font-size: 11px;
  font-weight: 400;
  line-height: 16.5px;
}

.vt--vertical .vt__subtitle {
  font-size: 10px;
  font-weight: 700;
  line-height: 15px;
}

/* ── Jersey badge ── */
.vt__jersey-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Jersey overlay needs different padding */
.vt--vertical .vt__overlay:has(.vt__jersey-row) {
  padding: 12px 8px;
  display: flex;
  align-items: flex-end;
}

.vt__jersey-icon {
  position: relative;
  width: 19.25px;
  height: 28px;
  flex-shrink: 0;
}

.vt__jersey-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.vt__jersey-number {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translate(-50%, -4.6px);
  font-size: 10px;
  font-weight: 700;
  line-height: 10px;
  /* color set dynamically via :style based on jersey luminance */
}

.vt__jersey-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-gray-200);
  line-height: 14px;
}

/* ── Countdown variant ── */
.vt__countdown-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #2A4A7F 0%, #1A3A5C 40%, #3A6A9F 70%, #1A2A50 100%);
}

.vt__countdown-blur {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: linear-gradient(135deg, #2A4A7F 0%, #1A3A5C 40%, #3A6A9F 70%, #1A2A50 100%);
  filter: blur(8px);
}

.vt__countdown-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #2A4A7F 0%, #1A3A5C 40%, #3A6A9F 70%, #1A2A50 100%);
}

.vt__countdown-center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.vt__countdown-text {
  text-align: center;
}

.vt__countdown-label {
  font-size: 7px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.9px;
  margin: 0;
  font-family: var(--font-family-base);
}

.vt__countdown-timer {
  font-size: 30px;
  font-weight: 800;
  color: #FFFFFF;
  letter-spacing: -0.6px;
  margin: 0;
  font-family: var(--font-gala);
}

.vt__countdown-ring {
  position: relative;
  width: 56px;
  height: 56px;
}

.vt__countdown-ring svg {
  display: block;
}

.vt__countdown-ring-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Notify button (countdown variant) ── */
.vt__notify-btn {
  background: var(--color-primary);
  color: #FFFFFF;
  border: none;
  border-radius: 20px;
  padding: 0 16px;
  height: 32px;
  font-size: 12px;
  font-weight: 500;
  font-family: var(--font-family-base);
  cursor: pointer;
  white-space: nowrap;
  transition: background var(--duration-fast) var(--easing-standard);
}

.vt__notify-btn:hover {
  background: var(--color-primary-hover);
}

.vt__notify-btn:active {
  background: var(--color-primary-active);
}
</style>
