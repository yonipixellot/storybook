<template>
  <!-- Photo (if provided and not errored) -->
  <div
    v-if="photoUrl && !imgError"
    class="ppp ppp--photo"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <img
      :src="photoUrl"
      :alt="name"
      class="ppp__img"
      @error="imgError = true"
    />
  </div>

  <!-- Placeholder -->
  <div
    v-else
    class="ppp ppp--placeholder"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <User :size="iconSize" class="ppp__icon" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { User } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  size?:     number
  name?:     string
  photoUrl?: string
}>(), {
  size: 48,
  name: '',
})

const imgError = ref(false)
const iconSize = computed(() => Math.round(props.size * 0.55))
</script>

<style scoped>
.ppp {
  border-radius: var(--radius-full);
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ppp--photo {}

.ppp--placeholder {
  background: var(--color-gray-200);
}

.ppp__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-full);
}

.ppp__icon {
  color: var(--color-gray-400);
}
</style>
