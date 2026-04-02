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
  background: var(--color-white);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.skc__body {
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
</style>
