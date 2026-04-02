<template>
  <div class="ub">

    <!-- Lock circle -->
    <div class="ub__lock-circle">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" :fill="'var(--color-premium-yellow)'"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" :stroke="'var(--color-premium-yellow)'" stroke-width="2.67" stroke-linecap="round"/>
      </svg>
    </div>

    <!-- Message -->
    <p class="ub__message">{{ message }}</p>

    <!-- Upgrade button -->
    <button class="ub__btn" @click="$emit('upgrade')">Upgrade</button>

  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  message?: string
}>(), {
  message: 'Upgrade to access personal highlights for all players in this game',
})

defineEmits<{ upgrade: [] }>()
</script>

<style scoped>
.ub {
  background: var(--color-info-bg-purple);
  border-radius: var(--radius-badge);
  padding: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  border: var(--stroke-thin) solid var(--color-premium-amber);
}

/* Lock circle */
.ub__lock-circle {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--color-premium-dark);
  border: var(--stroke-thin) solid var(--color-premium-yellow);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Message */
.ub__message {
  font-family: var(--font-family-base);
  font-size: var(--text-body2);
  font-weight: var(--font-regular);
  color: var(--color-black);
  margin: 0;
  flex: 1;
  line-height: 1.5;
}

/* Upgrade button */
.ub__btn {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  background: var(--color-premium-yellow);
  color: var(--color-premium-dark);
  flex-shrink: 0;
  transition: background 0.15s;
}

.ub__btn:hover {
  background: var(--color-premium-amber);
}
</style>
