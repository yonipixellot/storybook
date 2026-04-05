<template>
  <div class="hfs">
    <button
      v-for="(item, idx) in resolvedItems"
      :key="idx"
      class="hfs__chip"
      :aria-label="item.type === 'team' ? `Go to ${item.name}` : `Player ${item.number}`"
      @click="item.type === 'team' ? $emit('teamClick', item.name!) : $emit('playerClick', item.number!)"
    >
      <!-- Team chip -->
      <template v-if="item.type === 'team'">
        <img
          v-if="item.logoUrl"
          :src="item.logoUrl"
          :alt="item.name"
          class="hfs__team-img"
        />
        <div v-else class="hfs__team-placeholder">
          <svg :width="CHIP_SIZE * 0.45" :height="CHIP_SIZE * 0.45" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="9"
              stroke="var(--color-gray-300)" stroke-width="1.5" />
            <circle cx="12" cy="10" r="3"
              stroke="var(--color-gray-300)" stroke-width="1.5" />
            <path d="M6 19c0-3.3 2.7-6 6-6s6 2.7 6 6"
              stroke="var(--color-gray-300)" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </div>
      </template>

      <!-- Player chip — claimed with photo -->
      <template v-else-if="item.type === 'player' && item.claimed && item.photoUrl">
        <img :src="item.photoUrl" :alt="`Player ${item.number}`" class="hfs__player-img" />
      </template>

      <!-- Player chip — claimed, no photo (silhouette) -->
      <template v-else-if="item.type === 'player' && item.claimed">
        <div class="hfs__player-claimed">
          <svg :width="CHIP_SIZE * 0.55" :height="CHIP_SIZE * 0.55" viewBox="0 0 24 24"
            fill="var(--color-gray-400)" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
      </template>

      <!-- Player chip — unclaimed (jersey number circle) -->
      <template v-else-if="item.type === 'player'">
        <div
          class="hfs__player-number"
          :style="{ background: item.teamColor ?? 'var(--color-jersey-red)' }"
        >
          <span class="hfs__number-text">{{ item.number }}</span>
        </div>
      </template>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type FollowChipItem =
  | { type: 'team';   name: string; logoUrl?: string }
  | { type: 'player'; number: number; teamColor?: string; claimed?: boolean; photoUrl?: string }

const CHIP_SIZE = 56

const DEFAULT_ITEMS: FollowChipItem[] = [
  { type: 'team',   name: 'S.D. Spartans Men' },
  { type: 'team',   name: 'S.D. Spartans Women' },
  { type: 'player', number: 7,  teamColor: 'var(--color-jersey-red)', claimed: true },
  { type: 'player', number: 3,  teamColor: 'var(--color-jersey-red)', claimed: false },
  { type: 'player', number: 11, teamColor: '#0052CC',                  claimed: false },
]

const props = withDefaults(defineProps<{
  items?: FollowChipItem[]
}>(), {})

defineEmits<{ teamClick: [name: string]; playerClick: [number: number] }>()

const resolvedItems = computed(() => props.items ?? DEFAULT_ITEMS)
</script>

<style scoped>
.hfs {
  display: flex;
  gap: var(--space-md);
  overflow-x: auto;
  overflow-y: visible;
  padding: var(--space-md) var(--space-lg);
  scrollbar-width: none;
}

.hfs::-webkit-scrollbar {
  display: none;
}

/* ── Chip base ── */
.hfs__chip {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  transition: transform var(--duration-fast) var(--easing-standard);
}

.hfs__chip:hover {
  transform: scale(1.05);
}
.hfs__chip:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-full);
}

/* ── Team variants ── */
.hfs__team-img {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  object-fit: cover;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.hfs__team-placeholder {
  width: 59px;
  height: 59px;
  border-radius: var(--radius-full);
  background: var(--color-gray-50);
  border: 1.5px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* ── Player variants ── */
.hfs__player-img {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.hfs__player-claimed {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.hfs__player-number {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.hfs__number-text {
  font-family: var(--font-family-base);
  font-size: var(--text-lg);
  font-weight: var(--font-extra-bold);
  color: var(--color-white);
  line-height: 1;
}
</style>
