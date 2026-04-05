<template>
  <div class="pbi">
    <Bell :size="24" class="pbi__bell" aria-label="Notifications" />
    <div v-if="count > 0" class="pbi__badge" :aria-label="`${count} notifications`">
      <span class="pbi__badge-count">{{ count }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bell } from 'lucide-vue-next'

withDefaults(defineProps<{
  count?: number
}>(), {
  count: 0,
})
</script>

<style scoped>
.pbi {
  position: relative;
  display: inline-flex;
}

.pbi__bell {
  color: var(--color-gray-500);
}

.pbi__badge {
  position: absolute;
  top: -4px;
  right: -6px;
  min-width: 16px;
  height: 16px;
  border-radius: var(--radius-thumb);
  background: var(--color-notif-badge-red);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--space-xs);
  box-sizing: border-box;
}

.pbi__badge-count {
  font-family: var(--font-family-base);
  font-size: var(--text-2xs);
  font-weight: var(--font-bold);
  color: var(--color-white);
  line-height: 1;
}
</style>
