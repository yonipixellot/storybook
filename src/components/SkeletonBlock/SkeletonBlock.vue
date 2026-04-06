<template>
  <div class="skb" :style="blockStyle" data-skeleton aria-hidden="true" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Block height in px (default 16) */
  height?:       number | string
  /** Block width (default 100%) */
  width?:        number | string
  /** Border radius override */
  borderRadius?: number | string
}>(), {
  height: 16,
})

const blockStyle = computed(() => ({
  height:       typeof props.height === 'number'       ? `${props.height}px`       : props.height,
  width:        props.width
    ? (typeof props.width === 'number' ? `${props.width}px` : props.width)
    : '100%',
  borderRadius: props.borderRadius !== undefined
    ? (typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius)
    : undefined,
}))
</script>

<style scoped>
.skb {
  background: linear-gradient(
    90deg,
    var(--color-gray-100) 25%,
    var(--color-gray-50)  50%,
    var(--color-gray-100) 75%
  );
  background-size: 200% 100%;
  border-radius: var(--radius-xs); /* DS: 4px default, not 6px */
  animation: shimmer 1.5s infinite ease-in-out;
}

[data-theme="dark"] .skb {
  background: linear-gradient(
    90deg,
    var(--color-gray-300) 25%,
    var(--color-gray-400) 50%,
    var(--color-gray-300) 75%
  );
  /* #555555 → #888888 → #555555 on #333333 card bg — clear visible shimmer */
  background-size: 200% 100%;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
