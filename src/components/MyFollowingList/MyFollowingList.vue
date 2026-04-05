<template>
  <div class="mfl">

    <!-- ── Teams section ── -->
    <div class="mfl__section-header">
      <span class="mfl__section-title">Teams ({{ visibleTeams.length }})</span>
      <button class="mfl__add-btn" aria-label="Add team" @click="$emit('addTeam')">
        <span class="mfl__add-icon">+</span>
        Add
      </button>
    </div>

    <div v-for="(team, idx) in resolvedTeams" :key="`team-${idx}`">
      <FollowingRow
        v-if="!removedTeams.has(idx)"
        :title="team.name"
        :subtitle="team.division"
      >
        <template #avatar>
          <PTeamLogo :name="team.name" :logoUrl="team.logoUrl" :size="40" />
        </template>
        <template #action>
          <button
            class="mfl__unfollow-btn"
            :aria-label="`Unfollow ${team.name}`"
            @click="removeTeam(idx)"
          >Unfollow</button>
        </template>
      </FollowingRow>
    </div>

    <!-- ── Players section ── -->
    <div class="mfl__section-header mfl__section-header--mt">
      <span class="mfl__section-title">Players ({{ visiblePlayers.length }})</span>
      <button class="mfl__add-btn" aria-label="Add player" @click="$emit('addPlayer')">
        <span class="mfl__add-icon">+</span>
        Add
      </button>
    </div>

    <div v-for="(player, idx) in resolvedPlayers" :key="`player-${idx}`">
      <FollowingRow
        v-if="!removedPlayers.has(idx)"
        :title="`#${player.number} — ${player.name}`"
      >
        <template #avatar>
          <PlayerNumberBadge :number="player.number" :teamColor="player.teamColor" :size="40" />
        </template>
        <template #action>
          <button
            class="mfl__unfollow-btn"
            :aria-label="`Unfollow player ${player.number}`"
            @click="removePlayer(idx)"
          >Unfollow</button>
        </template>
      </FollowingRow>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FollowingRow from '../FollowingRow/FollowingRow.vue'
import PTeamLogo from '../PTeamLogo/PTeamLogo.vue'
import PlayerNumberBadge from '../PlayerNumberBadge/PlayerNumberBadge.vue'

export interface FollowedTeam {
  name:      string
  division?: string
  logoUrl?:  string
}

export interface FollowedPlayer {
  name:       string
  number:     number
  teamColor?: string
}

const DEFAULT_TEAMS: FollowedTeam[] = [
  { name: 'Riverside Mustangs', division: 'PBA Varsity Division' },
]

const DEFAULT_PLAYERS: FollowedPlayer[] = [
  { name: 'Marcus Caldwell', number: 1, teamColor: 'var(--color-primary)' },
]

const props = withDefaults(defineProps<{
  teams?:   FollowedTeam[]
  players?: FollowedPlayer[]
}>(), {})

defineEmits<{ addTeam: []; addPlayer: [] }>()

const resolvedTeams   = computed(() => props.teams   ?? DEFAULT_TEAMS)
const resolvedPlayers = computed(() => props.players ?? DEFAULT_PLAYERS)

const removedTeams   = ref<Set<number>>(new Set())
const removedPlayers = ref<Set<number>>(new Set())

const visibleTeams   = computed(() => resolvedTeams.value.filter((_, i) => !removedTeams.value.has(i)))
const visiblePlayers = computed(() => resolvedPlayers.value.filter((_, i) => !removedPlayers.value.has(i)))

function removeTeam(idx: number)   { removedTeams.value   = new Set([...removedTeams.value,   idx]) }
function removePlayer(idx: number) { removedPlayers.value = new Set([...removedPlayers.value, idx]) }
</script>

<style scoped>
.mfl {
  width: 100%;
  max-width: 390px;
  background: var(--color-white);
  padding: var(--space-xl) var(--space-lg);
  font-family: var(--font-family-base);
}

/* ── Section header ── */
.mfl__section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
}

.mfl__section-header--mt {
  margin-top: 28px;
}

.mfl__section-title {
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
}

/* ── Add button (social style) ── */
.mfl__add-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  background: none;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-pill);
  padding: var(--space-xs2) var(--space-md);
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  cursor: pointer;
  transition: background var(--duration-fast);
}

.mfl__add-btn:hover {
  background: var(--color-gray-50);
}

.mfl__add-icon {
  font-size: var(--text-base);
  line-height: 1;
}

/* ── Unfollow button ── */
.mfl__unfollow-btn {
  background: none;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-pill);
  padding: var(--space-xs2) var(--space-md);
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-error-red);
  cursor: pointer;
  white-space: nowrap;
  transition: background var(--duration-fast);
}

.mfl__unfollow-btn:hover {
  background: var(--color-error-bg);
}
</style>
