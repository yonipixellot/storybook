<template>
  <button
    class="tfc"
    :class="{ 'tfc--followed': isFollowed }"
    :aria-pressed="isFollowed"
    :aria-label="(isFollowed ? 'Unfollow ' : 'Follow ') + teamName"
    @click="handleClick"
  >
    <!-- Team logo -->
    <PTeamLogo :name="teamName" :logoUrl="logoUrl" :size="48" />

    <!-- Team name (2-line clamp) -->
    <span class="tfc__name">{{ teamName }}</span>

    <!-- Divider -->
    <div class="tfc__divider" />

    <!-- Follow status -->
    <div class="tfc__status">
      <span class="tfc__status-text" :class="{ 'tfc__status-text--followed': isFollowed }">
        {{ isFollowed ? 'Following' : 'Follow' }}
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PTeamLogo from '../PTeamLogo/PTeamLogo.vue'

const props = withDefaults(defineProps<{
  teamName?: string
  logoUrl?:  string
  followed?: boolean
}>(), {
  teamName: 'S.D Spartans Men',
  followed: false,
})

const emit = defineEmits<{ click: [] }>()

// Internal state — mirrors `followed` prop and self-toggles on click,
// matching DS behavior where cards toggle their own state immediately.
const isFollowed = ref(props.followed)
watch(() => props.followed, (val) => { isFollowed.value = val })

function handleClick() {
  isFollowed.value = !isFollowed.value
  emit('click')
}
</script>

<style scoped>
.tfc {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  flex: 1 0 0;
  min-width: 0;
  padding: var(--space-md) var(--space-lg) var(--space-sm);
  background: var(--color-gray-50);
  border-radius: var(--radius-badge);
  border: 1px solid var(--color-gray-200);
  cursor: pointer;
  transition: background var(--duration-fast), border var(--duration-fast);
  box-sizing: border-box;
}

.tfc:hover {
  background: var(--color-gray-100);
}

.tfc:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-badge);
}

.tfc--followed {
  border: 2px solid var(--color-primary);
}

/* ── Team name ── */
.tfc__name {
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  text-align: center;
  line-height: 20px;
  height: 40px;
  overflow: hidden;
  align-self: stretch;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* ── Divider ── */
.tfc__divider {
  height: 1px;
  background: var(--color-gray-200);
  align-self: stretch;
}

/* ── Follow status ── */
.tfc__status {
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
}

.tfc__status-text {
  font-family: var(--font-family-base);
  font-size: var(--text-caption);
  font-weight: var(--font-semibold);
  color: var(--color-dark-text);
}

.tfc__status-text--followed {
  color: var(--color-primary);
}
</style>
