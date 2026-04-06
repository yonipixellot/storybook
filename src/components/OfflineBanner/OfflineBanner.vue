<template>
  <div class="ob" role="alert">
    <!-- Red dot indicator -->
    <div class="ob__dot" aria-hidden="true" />

    <!-- Message -->
    <div class="ob__message">
      <div class="ob__title">You're offline</div>
      <div class="ob__subtitle">Check your connection and try again</div>
    </div>

    <!-- Retry button -->
    <button class="ob__retry" aria-label="Retry connection" @click="$emit('retry')">
      Retry
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ retry: [] }>()
</script>

<style scoped>
.ob {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  background: var(--color-error-bg);
  border-radius: var(--radius-badge);
  padding: var(--space-md) var(--space-lg);
  border: 1px solid var(--color-error-border);
}

/* ── Red dot ── */
.ob__dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-error-red);
  flex-shrink: 0;
}

/* ── Message ── */
.ob__message {
  flex: 1;
}

.ob__title {
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-dark-text);
  line-height: 1.3;
}

.ob__subtitle {
  font-family: var(--font-family-base);
  font-size: var(--text-caption);
  font-weight: var(--font-regular);
  color: var(--color-gray-500);
}

/* ── Retry button ── */
.ob__retry {
  background: none;
  border: none;
  font-family: var(--font-family-base);
  font-size: var(--text-body2);
  font-weight: var(--font-semibold);
  color: var(--color-error-red);
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

.ob__retry:hover {
  opacity: 0.8;
}
</style>
