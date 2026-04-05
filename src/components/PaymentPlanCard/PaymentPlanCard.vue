<template>
  <div class="ppc" :class="{ 'ppc--highlighted': isHighlighted }">

    <!-- Most Popular badge (highlighted only) -->
    <div v-if="isHighlighted" class="ppc__badge">
      <span class="ppc__badge-fire">🔥</span>
      <span class="ppc__badge-label">Most Popular</span>
    </div>

    <!-- Title -->
    <p class="ppc__title">{{ title }}</p>

    <!-- Description + Show more -->
    <p class="ppc__desc">
      {{ description }}&nbsp;&nbsp;
      <span class="ppc__show-more">Show more...</span>
    </p>

    <!-- Features list (highlighted variant only, if provided) -->
    <div v-if="features && features.length" class="ppc__features">
      <p class="ppc__features-label">You will get access to:</p>
      <div class="ppc__features-list">
        <div
          v-for="(feat, idx) in features"
          :key="idx"
          class="ppc__feature-item"
        >
          <Check :size="16" class="ppc__check-icon" aria-hidden="true" />
          <span class="ppc__feature-text">{{ feat }}</span>
        </div>
      </div>
    </div>

    <!-- Footer: price + buy button -->
    <div class="ppc__footer">
      <span class="ppc__price">{{ price }}</span>
      <button
        class="ppc__btn"
        :class="{ 'ppc__btn--premium': isHighlighted }"
        @click="$emit('buy')"
      >
        Buy Now
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  variant?:     'default' | 'highlighted'
  title?:       string
  description?: string
  price?:       string
  features?:    string[]
}>(), {
  variant:     'default',
  title:       'Single Download',
  description: 'Download a single highlight of your favourite moment from the season!',
  price:       '$5.00',
})

defineEmits<{ buy: [] }>()

const isHighlighted = computed(() => props.variant === 'highlighted')
</script>

<style scoped>
.ppc {
  background: var(--color-gray-50);
  border-radius: var(--radius-card);
  padding: 20px 16px;
  border: none;
}

.ppc--highlighted {
  border: 2px solid var(--color-premium-yellow);
}

/* Most Popular badge */
.ppc__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  background: var(--color-premium-yellow);
  border-radius: var(--radius-lg);
  padding: 6px 14px;
  margin-bottom: var(--space-sm2);
}

.ppc__badge-fire {
  font-size: var(--text-caption);
  line-height: 12px;
}

.ppc__badge-label {
  font-family: var(--font-family-base);
  font-size: var(--text-body2);
  font-weight: var(--font-bold);
  color: #161616; /* hardcoded — yellow badge bg doesn't change with theme */
}

/* Title */
.ppc__title {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  margin: 0 0 6px;
  line-height: 24px;
}

/* Description */
.ppc__desc {
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  font-weight: var(--font-regular);
  color: var(--color-gray-500);
  margin: 0 0 16px;
  line-height: 1.5;
}

.ppc__show-more {
  color: var(--color-primary);
  font-weight: var(--font-medium);
  cursor: pointer;
}

/* Features */
.ppc__features {
  background: var(--color-gray-100);
  border-radius: var(--radius-badge);
  padding: var(--space-md2) var(--space-lg);
  margin-bottom: var(--space-md2);
}

.ppc__features-label {
  font-family: var(--font-family-base);
  font-size: var(--text-caption);
  font-weight: var(--font-medium);
  color: var(--color-gray-400);
  margin: 0 0 8px;
}

.ppc__features-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs2);
}

.ppc__feature-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.ppc__check-icon {
  color: var(--color-success-green);
  flex-shrink: 0;
}

.ppc__feature-text {
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
}

/* Footer */
.ppc__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ppc__price {
  font-family: var(--font-family-base);
  font-size: var(--text-display);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
}

/* Buy Now button — default (action) style */
.ppc__btn {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  height: var(--size-button-height);
  padding: 0 var(--space-xl);
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  background: var(--color-primary);
  color: var(--color-white);
  transition: background var(--duration-fast);
}

.ppc__btn:hover {
  background: var(--color-primary-hover);
}

/* Premium button variant */
.ppc__btn--premium {
  background: var(--color-premium-yellow);
  color: var(--color-premium-dark);
}

.ppc__btn--premium:hover {
  background: var(--color-premium-amber);
}
</style>
