<template>
  <div class="bb">
    <!-- Back button -->
    <button class="bb__back" aria-label="Go back" @click="$emit('back')">
      <ArrowLeft :size="16" class="bb__back-icon" aria-hidden="true" />
      <span class="bb__back-label">{{ label }}</span>
    </button>

    <!-- Share button (optional) -->
    <button
      v-if="showShare"
      class="bb__share"
      aria-label="Share"
      @click="$emit('share')"
    >
      <Share2 :size="20" class="bb__share-icon" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Share2 } from 'lucide-vue-next'

withDefaults(defineProps<{
  label?:     string
  showShare?: boolean
}>(), {
  label:     'Back',
  showShare: false,
})

defineEmits<{ back: []; share: [] }>()
</script>

<style scoped>
.bb {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
}

.bb__back {
  display: flex;
  align-items: center;
  gap: var(--space-xs2);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.bb__back:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
  border-radius: var(--radius-xs);
}

.bb__back-icon {
  color: var(--color-gray-500);
}

.bb__back-label {
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-gray-500);
}

.bb__share {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
}

.bb__share-icon {
  color: var(--color-gray-500);
}
.bb__share:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
  border-radius: var(--radius-full);
}
</style>
