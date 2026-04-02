<template>
  <!-- Text Divider -->
  <div v-if="text" class="app-divider-text" role="separator">
    <span class="app-divider-text__line" aria-hidden="true" />
    <span class="app-divider-text__label">{{ text }}</span>
    <span class="app-divider-text__line" aria-hidden="true" />
  </div>
  <!-- Vertical Divider -->
  <div
    v-else-if="vertical"
    class="app-divider-vertical"
    role="separator"
    :style="{
      backgroundColor: color,
      width: thickness + 'px',
      height: '40px',
      margin: spacing ? spacing + 'px' : '0 12px',
    }"
  />
  <!-- Horizontal Divider -->
  <div
    v-else
    class="app-divider-horizontal"
    role="separator"
    :style="{
      backgroundColor: color,
      height: thickness + 'px',
      width: '100%',
      margin: spacing ? spacing + 'px 0' : '0',
    }"
  />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
  thickness?: number
  spacing?: number
  vertical?: boolean
  text?: string
}>(), {
  color: '#C7CBD0',
  thickness: 1,
  spacing: 0,
  vertical: false,
})
</script>

<style scoped>
/* Text Divider */
.app-divider-text {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-divider-text__line {
  flex: 1;
  height: 1px;
  background-color: var(--color-gray-200);
}

.app-divider-text__label {
  color: var(--color-gray-400);
  font-size: 16px;
  font-weight: 500;
  font-family: var(--font-family-base);
  white-space: nowrap;
}
</style>
