<template>
  <div
    class="ab"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <!-- Slide track -->
    <div class="ab__track" :style="trackStyle">
      <div
        v-for="(slide, idx) in resolvedSlides"
        :key="idx"
        class="ab__slide"
        :style="{ background: slide.bg }"
      >
        <span v-if="slide.label" class="ab__label">{{ slide.label }}</span>
      </div>
    </div>

    <!-- Dot indicators -->
    <div class="ab__dots" aria-hidden="true">
      <div
        v-for="(_, idx) in resolvedSlides"
        :key="idx"
        class="ab__dot"
        :class="{ 'ab__dot--active': idx === activeIndex }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface AdSlide {
  /** CSS background value (color, gradient, or url) */
  bg:     string
  label?: string
}

const DEFAULT_SLIDES: AdSlide[] = [
  { bg: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)', label: 'Ad Slot 1' },
  { bg: 'linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)', label: 'Ad Slot 2' },
]

const props = withDefaults(defineProps<{
  slides?:      AdSlide[]
  startIndex?:  number
}>(), {
  startIndex: 0,
})

const activeIndex = ref(props.startIndex)
const dragOffset  = ref(0)
const isDragging  = ref(false)
const dragStart   = ref(0)

const resolvedSlides = computed(() => props.slides ?? DEFAULT_SLIDES)

const trackStyle = computed(() => ({
  transform:  `translateX(calc(-${activeIndex.value * 100}% + ${dragOffset.value}px))`,
  transition: isDragging.value ? 'none' : 'transform 0.3s',
}))

function onPointerDown(e: PointerEvent) {
  dragStart.value = e.clientX
  isDragging.value = true
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  dragOffset.value = e.clientX - dragStart.value
}

function onPointerUp() {
  if (!isDragging.value) return
  isDragging.value = false
  const count = resolvedSlides.value.length
  if (dragOffset.value < -40 && activeIndex.value < count - 1) {
    activeIndex.value++
  } else if (dragOffset.value > 40 && activeIndex.value > 0) {
    activeIndex.value--
  }
  dragOffset.value = 0
}
</script>

<style scoped>
.ab {
  position: relative;
  width: 100%;
  overflow: hidden;
  touch-action: pan-y;
  cursor: grab;
  user-select: none;
}

.ab:active {
  cursor: grabbing;
}

/* ── Slide track ── */
.ab__track {
  display: flex;
}

/* ── Individual slide ── */
.ab__slide {
  min-width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ab__label {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-white);
  opacity: 0.7;
}

/* ── Dot indicators ── */
.ab__dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-sm);
}

.ab__dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.5);
  transition: background 0.2s;
}

.ab__dot--active {
  background: var(--color-white);
}
</style>
