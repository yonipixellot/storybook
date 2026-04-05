<template>
  <div class="skc" aria-hidden="true" aria-label="Loading…">
    <!-- Image placeholder -->
    <SkeletonBlock :height="imageHeight" :border-radius="0" />

    <!-- Text lines -->
    <div class="skc__body">
      <SkeletonBlock :height="20" width="80%" />
      <SkeletonBlock :height="16" />
      <SkeletonBlock :height="16" width="90%" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SkeletonBlock from '../SkeletonBlock/SkeletonBlock.vue'

withDefaults(defineProps<{
  imageHeight?: number
}>(), {
  imageHeight: 180,
})
</script>

<style scoped>
.skc {
  background: var(--color-gray-50); /* #F5F5F5 light */
  border: 1px solid var(--color-gray-100);
  border-radius: var(--radius-md);
  overflow: hidden;
}

[data-theme="dark"] .skc {
  background: var(--color-gray-100); /* #333333 — visible against #1A1A1A page bg */
  border-color: var(--color-gray-200); /* #444444 */
}

.skc__body {
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
</style>
