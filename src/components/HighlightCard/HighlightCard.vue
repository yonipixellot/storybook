<template>
  <button class="highlight-card"
    :aria-label="computedAriaLabel"
    @click="$emit('click')" @keydown.enter="$emit('click')">
    <img v-if="thumbnail" :src="thumbnail" :alt="title"
      class="highlight-card__img" />
    <div v-else class="highlight-card__placeholder"></div>
    <div class="highlight-card__duration">
      <span>{{ duration }}</span>
    </div>
    <div v-if="locked" class="highlight-card__lock"
      role="img" aria-label="This video is locked">
      <svg width="8" height="10" viewBox="0 0 7.999 10" fill="var(--color-premium-yellow)">
        <path d="M7.026 4.069H6.738L6.737 2.701C6.736 1.211 5.465-.001 3.903 0 2.341.001 1.07 1.213 1.072 2.703L1.074 4.071H.971C.434 4.072-.001 4.488 0 5v4.072c0 .512.437.928.974.928l6.055-.003c.537 0 .972-.416.972-.928V4.996c0-.512-.437-.928-.974-.928ZM2.118 4.071L2.115 2.703c0-.94.802-1.707 1.788-1.707.987 0 1.789.765 1.789 1.706l.003 1.368H2.118Z" />
      </svg>
    </div>
    <div v-else class="highlight-card__play"
      role="img" aria-label="Play video">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2">
        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
      </svg>
    </div>
    <div class="highlight-card__overlay">
      <span class="highlight-card__title">{{ title }}</span>
      <span class="highlight-card__date">{{ date }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  thumbnail?: string
  duration?: string
  title?: string
  date?: string
  locked?: boolean
  ariaLabel?: string
}>(), {
  thumbnail: '',
  duration: '0:00',
  title: 'Highlight',
  date: '',
  locked: true,
})

defineEmits<{ click: [] }>()

const computedAriaLabel = computed(() =>
  props.ariaLabel || `${props.title}, ${props.date}${props.locked ? ', locked' : ''}`
)
</script>

<style scoped>
.highlight-card {
  position: relative;
  width: 108px;
  height: 192px;
  border: none;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  display: block;
  background: transparent;
  outline: none;
  padding: 0;
  font-family: var(--font-family-base);
  transition: transform var(--duration-base);
  text-align: left;
}

.highlight-card:hover {
  transform: scale(0.98);
}

.highlight-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.highlight-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.highlight-card__placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgb(42, 74, 127) 0%, rgb(26, 58, 92) 40%, rgb(58, 106, 159) 70%, rgb(26, 42, 80) 100%);
}

.highlight-card__duration {
  position: absolute;
  top: 6px;
  left: 6px;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 9999px;
  padding: 1px 5px;
  display: flex;
  align-items: center;
}

.highlight-card__duration span {
  font-size: 8px;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1;
}

.highlight-card__lock {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-premium-dark);
  display: flex;
  align-items: center;
  justify-content: center;
}

.highlight-card__play {
  position: absolute;
  top: 7px;
  right: 6px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #6C6C6C; /* fixed — card bg is always dark, token inverts to #A0A0A0 in dark mode */
  display: flex;
  align-items: center;
  justify-content: center;
}

.highlight-card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
  padding: 24px 8px 8px;
  pointer-events: none;
}

.highlight-card__title {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 14px;
  text-align: left;
}

.highlight-card__date {
  display: block;
  font-size: 9px;
  font-weight: 400;
  color: var(--color-gray-300);
  margin-top: 2px;
  text-align: left;
}
</style>
