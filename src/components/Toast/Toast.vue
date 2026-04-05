<template>
  <Transition name="toast">
    <div
      v-if="isVisible"
      class="toast"
      :class="`toast--${variant}`"
      role="alert"
      :aria-live="variant === 'error' ? 'assertive' : 'polite'"
    >
      <!-- Icon -->
      <span class="toast__icon" aria-hidden="true">
        <CheckCircle   v-if="variant === 'success'" :size="18" />
        <XCircle       v-else-if="variant === 'error'" :size="18" />
        <AlertTriangle v-else-if="variant === 'warning'" :size="18" />
        <Info          v-else :size="18" />
      </span>

      <!-- Message -->
      <span class="toast__message">{{ message }}</span>

      <!-- Dismiss button -->
      <button
        v-if="dismissible"
        class="toast__dismiss"
        aria-label="Dismiss notification"
        @click="dismiss"
      >
        <X :size="14" />
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  message?:     string
  variant?:     'success' | 'error' | 'warning' | 'info'
  dismissible?: boolean
  /** Auto-dismiss after N ms. 0 = persistent. */
  duration?:    number
  modelValue?:  boolean
}>(), {
  message:     'Action completed successfully.',
  variant:     'success',
  dismissible: true,
  duration:    3000,
  modelValue:  true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  dismiss: []
}>()

const isVisible = ref(props.modelValue)
let timer: ReturnType<typeof setTimeout> | null = null

watch(() => props.modelValue, (val) => {
  isVisible.value = val
  if (val) startTimer()
})

function dismiss() {
  isVisible.value = false
  emit('update:modelValue', false)
  emit('dismiss')
  clearTimer()
}

function startTimer() {
  clearTimer()
  if (props.duration > 0) {
    timer = setTimeout(dismiss, props.duration)
  }
}

function clearTimer() {
  if (timer) { clearTimeout(timer); timer = null }
}

onMounted(() => { if (isVisible.value) startTimer() })
onUnmounted(clearTimer)
</script>

<style scoped>
/* ── Base ── */
.toast {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm2) var(--space-md);
  border-radius: var(--radius-chip);
  border: 1px solid transparent;
  box-shadow: var(--shadow-lg);
  font-family: var(--font-family-system);
  font-size: var(--text-xs);
  max-width: 340px;
  min-width: 200px;
  box-sizing: border-box;
}

/* ── Icon — color inherited from variant class via currentColor ── */
.toast__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

/* ── Message ── */
.toast__message {
  flex: 1;
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  line-height: var(--leading-tight);
}

/* ── Dismiss button ── */
.toast__dismiss {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: var(--space-xxs);
  cursor: pointer;
  color: var(--color-gray-400);
  border-radius: var(--radius-full);
  transition: color var(--duration-fast), background var(--duration-fast);
  line-height: 0;
}
.toast__dismiss:hover {
  color: var(--color-dark-text);
  background: var(--color-gray-overlay, rgba(0, 0, 0, 0.06));
}
.toast__dismiss:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── Variants: bg + border + icon color via currentColor ── */
.toast--success {
  background: var(--color-success-bg);
  border-color: var(--color-success-border);
  color: var(--color-success-green); /* icon inherits */
}
.toast--error {
  background: var(--color-error-bg);
  border-color: var(--color-error-border);
  color: var(--color-error-red);
}
.toast--warning {
  background: var(--color-warning-bg);
  border-color: var(--color-warning-border);
  color: var(--color-warning);
}
.toast--info {
  background: var(--color-primary-bg-light);
  border-color: var(--color-primary-bg-lighter);
  color: var(--color-primary);
}

/* ── Message text always uses dark-text for legibility ── */
/* (overrides the variant color set on .toast for the icon) */
.toast__message { color: var(--color-dark-text); }

/* ── Enter/leave animation — slides up and fades ── */
.toast-enter-active,
.toast-leave-active {
  transition:
    opacity var(--duration-base) var(--easing-out),
    transform var(--duration-base) var(--easing-out);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
