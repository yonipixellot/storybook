<template>
  <div class="psh">
    <h3 class="psh__title" :style="titleFontSize ? { fontSize: titleFontSize + 'px' } : {}">
      {{ title }}
    </h3>
    <button
      v-if="seeAll"
      class="psh__see-all"
      :aria-label="`See all ${title}`"
      @click="$emit('see-all')"
    >
      See all &gt;
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?:         string
  seeAll?:        boolean
  titleFontSize?: number
}>(), {
  title:  'Section Title',
  seeAll: false,
})

defineEmits<{ 'see-all': [] }>()
</script>

<style scoped>
.psh {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-md);
}

.psh__title {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-black);
}

.psh__see-all {
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--text-body2);
  font-weight: var(--font-semibold); /* DS: 600, not 400 */
  color: var(--color-link-blue);     /* DS: #2563EB, not primary #116DFF */
  padding: 0;
}

.psh__see-all:hover {
  text-decoration: underline;
}
.psh__see-all:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-xs);
}
</style>
