<template>
  <div class="cfl">
    <!-- Search bar -->
    <div class="cfl__search">
      <SearchBar
        v-model="searchQuery"
        placeholder="Search any team or competition..."
        :readonly="true"
      />
    </div>

    <!-- Competition accordion list -->
    <div class="cfl__list">
      <div
        v-for="(comp, cIdx) in resolvedCompetitions"
        :key="cIdx"
        class="cfl__comp"
      >
        <!-- Competition header -->
        <button
          class="cfl__header"
          :aria-expanded="openSet.has(cIdx)"
          :aria-label="comp.name"
          @click="toggleComp(cIdx)"
        >
          <PTeamLogo :name="comp.name" :size="44" />
          <div class="cfl__header-info">
            <div class="cfl__comp-name">{{ comp.name }}</div>
            <div class="cfl__comp-meta">
              {{ comp.teamCount }} teams
              <template v-if="followCounts[cIdx] > 0">
                · {{ followCounts[cIdx] }} following
              </template>
            </div>
          </div>
          <ChevronDown
            :size="16"
            class="cfl__chevron"
            :class="{ 'cfl__chevron--open': openSet.has(cIdx) }"
            aria-hidden="true"
          />
        </button>

        <!-- Expanded team grid -->
        <div v-if="openSet.has(cIdx)" class="cfl__team-grid">
          <template v-if="comp.teams && comp.teams.length > 0">
            <TeamFollowCard
              v-for="(team, tIdx) in comp.teams"
              :key="tIdx"
              :teamName="team.name"
              :followed="followedMap[`${cIdx}-${tIdx}`] ?? team.followed"
              @click="toggleFollow(cIdx, tIdx)"
            />
          </template>
          <p v-else class="cfl__empty">No teams available</p>
        </div>
      </div>
    </div>

    <!-- Continue button -->
    <div class="cfl__footer">
      <AppButton variant="primary" size="lg" :fullWidth="true" @click="$emit('continue', totalFollowed)">
        {{ totalFollowed > 0 ? `Continue (${totalFollowed})` : 'Continue' }}
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import SearchBar from '../SearchBar/SearchBar.vue'
import PTeamLogo from '../PTeamLogo/PTeamLogo.vue'
import TeamFollowCard from '../TeamFollowCard/TeamFollowCard.vue'
import AppButton from '../AppButton/AppButton.vue'

export interface CompetitionTeam {
  name:     string
  followed: boolean
}

export interface Competition {
  name:       string
  teamCount:  number
  teams:      CompetitionTeam[]
}

const DEFAULT_COMPETITIONS: Competition[] = [
  {
    name: 'Varsity', teamCount: 14,
    teams: [
      { name: 'Riverside Mustangs',      followed: false },
      { name: 'Oakwood Eagles',           followed: false },
      { name: 'Valley Vista Cougars',     followed: false },
      { name: 'Lakeside Lancers',         followed: false },
      { name: 'Capital City Cavaliers',   followed: false },
      { name: 'Bayshore Hawks',           followed: false },
    ],
  },
  { name: 'Junior Varsity',  teamCount: 12, teams: [] },
  { name: 'Regional',        teamCount: 10, teams: [] },
  { name: "Women's Varsity", teamCount: 10, teams: [] },
  { name: "Women's JV",      teamCount: 10, teams: [] },
]

const props = withDefaults(defineProps<{
  competitions?: Competition[]
}>(), {})

defineEmits<{ continue: [count: number] }>()

const resolvedCompetitions = computed(() => props.competitions ?? DEFAULT_COMPETITIONS)

const searchQuery = ref('')
const openSet     = ref<Set<number>>(new Set())
const followedMap = ref<Record<string, boolean>>({})

function toggleComp(idx: number) {
  const s = new Set(openSet.value)
  if (s.has(idx)) s.delete(idx)
  else s.add(idx)
  openSet.value = s
}

function toggleFollow(cIdx: number, tIdx: number) {
  const key = `${cIdx}-${tIdx}`
  const current = followedMap.value[key] ?? resolvedCompetitions.value[cIdx]?.teams[tIdx]?.followed ?? false
  followedMap.value = { ...followedMap.value, [key]: !current }
}

const followCounts = computed(() =>
  resolvedCompetitions.value.map((comp, cIdx) =>
    comp.teams.filter((t, tIdx) =>
      followedMap.value[`${cIdx}-${tIdx}`] ?? t.followed
    ).length
  )
)

const totalFollowed = computed(() =>
  followCounts.value.reduce((a, b) => a + b, 0)
)
</script>

<style scoped>
.cfl {
  width: 100%;
  max-width: 390px;
  background: var(--color-white);
  padding: 0 var(--space-lg);
  font-family: var(--font-family-base);
}

/* ── Search ── */
.cfl__search {
  margin-bottom: var(--space-lg);
}

/* ── Competition row ── */
.cfl__header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--space-lg) 0;
  background: none;
  border: none;
  border-bottom: 1px solid var(--color-gray-100);
  cursor: pointer;
  gap: var(--space-md);
}

.cfl__header-info {
  flex: 1;
  text-align: left;
}

.cfl__comp-name {
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  line-height: 1.3;
}

.cfl__comp-meta {
  font-size: var(--text-2xs);
  color: var(--color-gray-400);
  margin-top: 2px;
}

.cfl__chevron {
  color: var(--color-gray-400);
  flex-shrink: 0;
  transform: rotate(-90deg);
  transition: transform var(--duration-base);
}

.cfl__chevron--open {
  transform: rotate(0deg);
}

/* ── Team grid ── */
.cfl__team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
  padding: var(--space-md) 0;
}

.cfl__empty {
  font-size: var(--text-xs);
  color: var(--color-gray-400);
  padding: var(--space-sm) 0;
  margin: 0;
  grid-column: 1 / -1;
}

/* ── Footer ── */
.cfl__footer {
  padding: 16px 0 var(--space-xl);
}
</style>
