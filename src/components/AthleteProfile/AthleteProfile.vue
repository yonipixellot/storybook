<template>
  <div class="ap" :style="width ? { width: width + 'px' } : {}">

    <!-- Back Bar (hidden when embedded inside AppShell which provides its own back nav) -->
    <div v-if="showNav" class="ap__nav">
      <button class="ap__back-btn" @click="$emit('back')" aria-label="Go back">
        <ArrowLeft :size="16" class="ap__nav-icon" />
        <span class="ap__back-label">Back</span>
      </button>
      <button class="ap__share-btn" @click="$emit('share')" aria-label="Share">
        <Share2 :size="20" class="ap__share-icon" />
      </button>
    </div>

    <!-- Hero Card -->
    <div class="ap__hero-wrap">
      <div class="ap__hero-card">
        <!-- Player Photo -->
        <div class="ap__photo" :style="{ width: '120px', height: '120px' }">
          <img v-if="photoUrl" :src="photoUrl" :alt="name" class="ap__photo-img" />
          <div v-else class="ap__photo-placeholder">
            <UserIcon :size="66" class="ap__photo-icon" />
          </div>
        </div>

        <!-- Player Info -->
        <div class="ap__info">
          <!-- Number / Position -->
          <div class="ap__position">#{{ number }} | {{ position }}</div>

          <!-- Name (split over 2 lines) -->
          <div class="ap__name">
            <div>{{ firstName }}</div>
            <div v-if="lastName">{{ lastName }}</div>
          </div>

          <!-- Team Link -->
          <button class="ap__team-btn" @click="$emit('team-tap')" :aria-label="`View ${teamName} team`">
            <!-- Team Logo placeholder -->
            <div class="ap__team-logo">
              <img v-if="teamLogoUrl" :src="teamLogoUrl" :alt="teamName" class="ap__team-logo-img" />
              <div v-else class="ap__team-logo-placeholder" :style="{ background: teamColor }">
                <span class="ap__team-logo-initial">{{ teamName.charAt(0) }}</span>
              </div>
            </div>
            <span class="ap__team-name" :style="{ color: accentColor }">{{ teamName }}</span>
            <ChevronDown :size="12" class="ap__chevron" :style="{ color: accentColor, transform: 'rotate(-90deg)' }" />
          </button>
        </div>
      </div>
    </div>

    <!-- Career Stats Row 1 -->
    <div class="ap__stats-row">
      <div v-for="stat in careerStatsRow1" :key="stat.label" class="ap__stat-card">
        <div class="ap__stat-label">
          <div v-for="(line, i) in stat.lines" :key="i">{{ line }}</div>
        </div>
        <div class="ap__stat-value">{{ stat.value }}</div>
      </div>
    </div>

    <!-- Career Stats Row 2 -->
    <div class="ap__stats-row ap__stats-row--mt">
      <div v-for="stat in careerStatsRow2" :key="stat.label" class="ap__stat-card">
        <div class="ap__stat-label">
          <div v-for="(line, i) in stat.lines" :key="i">{{ line }}</div>
        </div>
        <div class="ap__stat-value">{{ stat.value }}</div>
      </div>
    </div>

    <!-- My Highlights Section -->
    <div class="ap__highlights">
      <div class="ap__section-header-wrap">
        <h3 class="ap__section-title" style="font-size: var(--text-2xl)">My Highlights</h3>
      </div>
      <!-- Highlights Grid -->
      <div class="ap__highlights-grid">
        <VideoThumbnail orientation="vertical" :show-jersey-badge="true" :jersey-number="number" duration="0:45" jersey-label="Player Highlights" />
        <VideoThumbnail orientation="vertical" :show-jersey-badge="true" :jersey-number="number" duration="1:23" jersey-label="Player Highlights" />
        <VideoThumbnail orientation="vertical" :show-jersey-badge="true" :jersey-number="number" duration="0:32" jersey-label="Player Highlights" />
        <VideoThumbnail orientation="vertical" :show-jersey-badge="true" :jersey-number="number" duration="1:05" jersey-label="Player Highlights" />
        <VideoThumbnail orientation="vertical" :show-jersey-badge="true" :jersey-number="number" duration="0:55" jersey-label="Player Highlights" />
        <VideoThumbnail orientation="vertical" :show-jersey-badge="true" :jersey-number="number" duration="2:10" jersey-label="Player Highlights" />
        <VideoThumbnail orientation="vertical" :show-jersey-badge="true" :jersey-number="number" duration="0:38" jersey-label="Player Highlights" />
        <VideoThumbnail orientation="vertical" :show-jersey-badge="true" :jersey-number="number" duration="1:47" jersey-label="Player Highlights" />
      </div>
      <!-- See All -->
      <div class="ap__see-all-wrap">
        <button class="ap__see-all" @click="$emit('see-all-highlights')">
          See all
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" class="ap__see-all-arrow" aria-hidden="true">
            <path d="M1 4h6M4 1l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Season Stats -->
    <div class="ap__season">
      <div class="ap__section-header-wrap">
        <h3 class="ap__section-title" style="font-size: var(--text-2xl)">Season Stats</h3>
      </div>
      <div class="ap__stats-row">
        <div v-for="stat in seasonStats" :key="stat.label" class="ap__stat-card">
          <div class="ap__stat-label">{{ stat.label }}</div>
          <div class="ap__stat-value">{{ stat.value }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft, Share2, ChevronDown, User as UserIcon } from 'lucide-vue-next'
import VideoThumbnail from '../VideoThumbnail/VideoThumbnail.vue'

interface StatCard {
  label: string
  lines: string[]
  value: string
}

const props = withDefaults(defineProps<{
  name?: string
  number?: number
  position?: string
  teamName?: string
  teamLogoUrl?: string
  accentColor?: string
  photoUrl?: string
  width?: number
  /** Set false when embedded inside AppShell, which provides its own back navigation */
  showNav?: boolean
}>(), {
  name: 'TAL WEISS',
  number: 1,
  position: 'Guard',
  teamName: 'S.D Spartans',
  accentColor: '#007cbe',
  showNav: true,
  // width intentionally has no default — omitting it lets the component fill its container
})

defineEmits<{
  back: []
  share: []
  'team-tap': []
  'see-all-highlights': []
}>()

const nameParts = computed(() => props.name.trim().toUpperCase().split(' '))
const firstName = computed(() => nameParts.value[0] ?? '')
const lastName = computed(() => nameParts.value.slice(1).join(' '))

// Derive a team color from accentColor for logo placeholder
const teamColor = computed(() => props.accentColor)

const careerStatsRow1: StatCard[] = [
  { label: 'Minutes Played', lines: ['Minutes', 'Played'], value: '1245' },
  { label: 'Games Played',   lines: ['Games', 'Played'],   value: '64'   },
  { label: 'Tournaments',    lines: ['Tournaments', 'Played'], value: '18' },
]
const careerStatsRow2: StatCard[] = [
  { label: 'Points Made',   lines: ['Points', 'Made'],   value: '100' },
  { label: 'Assists Made',  lines: ['Assists', 'Made'],  value: '20'  },
  { label: 'Rebounds Made', lines: ['Rebounds', 'Made'], value: '10'  },
]
const seasonStats: StatCard[] = [
  { label: 'MPG', lines: ['MPG'], value: '23.4' },
  { label: 'PPG', lines: ['PPG'], value: '18.6' },
  { label: 'APG', lines: ['APG'], value: '4.5'  },
  { label: 'RPG', lines: ['RPG'], value: '3.2'  },
]

</script>

<style scoped>
.ap {
  font-family: var(--font-family-base);
  background: linear-gradient(
    180deg,
    var(--color-white) 0%,
    var(--color-gray-100) 25%,
    var(--color-gray-200) 50%,
    var(--color-gray-100) 75%,
    var(--color-white) 100%
  );
  overflow-x: hidden;
}

/* ── Nav ── */
.ap__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-xl) var(--space-lg) 0;
}

.ap__back-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs2);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.ap__nav-icon {
  color: var(--color-gray-500);
}

.ap__back-label {
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-gray-500);
}

.ap__share-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
}

.ap__share-icon {
  color: var(--color-dark-text);
}

/* ── Hero ── */
.ap__hero-wrap {
  padding: var(--space-xl) var(--space-lg) var(--space-md);
}

.ap__hero-card {
  background: var(--color-gray-50);
  border-radius: var(--radius-badge);
  padding: var(--space-xl) var(--space-lg);
  display: flex;
  gap: var(--space-lg);
  align-items: center;
}

/* Player Photo */
.ap__photo {
  border-radius: var(--radius-full);
  flex-shrink: 0;
  overflow: hidden;
}

.ap__photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-full);
}

.ap__photo-placeholder {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-full);
  background: var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ap__photo-icon {
  color: var(--color-gray-400);
}

/* Player Info */
.ap__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.ap__position {
  font-family: var(--font-family-base);
  font-size: var(--text-caption);
  font-weight: var(--font-medium);
  color: var(--color-gray-500);
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.ap__name {
  font-family: var(--font-family-base);
  font-size: var(--text-h1);
  font-weight: var(--font-extra-bold);
  color: var(--color-dark-text);
  text-transform: uppercase;
  line-height: 30px;
}

.ap__team-btn {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.ap__team-logo {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ap__team-logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ap__team-logo-placeholder {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ap__team-logo-initial {
  font-size: 9px;
  font-weight: var(--font-bold);
  color: var(--color-white);
}

.ap__team-name {
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

/* ── Stat Cards ── */
.ap__stats-row {
  padding: 0 var(--space-lg);
  display: flex;
  gap: var(--space-md);
}

.ap__stats-row--mt {
  margin-top: var(--space-md);
}

.ap__stat-card {
  flex: 1;
  background: var(--color-card-bg);
  padding: var(--space-md);
  border-radius: var(--radius-badge);
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
  overflow: hidden;
}

.ap__stat-label {
  font-family: var(--font-family-base);
  font-size: var(--text-2xs);
  font-weight: var(--font-medium);
  color: var(--color-gray-500);
  line-height: 16px;
}

.ap__stat-value {
  font-family: var(--font-family-base);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  line-height: normal;
  margin-top: auto;
}

/* ── Highlights ── */
.ap__highlights {
  padding-top: var(--space-2xl);
}

.ap__section-header-wrap {
  padding: 0 var(--space-lg) var(--space-xl);
}

.ap__section-title {
  margin: 0;
  font-family: var(--font-family-base);
  font-weight: var(--font-bold);
  color: var(--color-black);
}

.ap__highlights-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md2);
  padding: 0 var(--space-lg);
  margin-bottom: var(--space-md2);
}

@media (min-width: 1024px) {
  .ap__highlights-grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

/* See All */
.ap__see-all-wrap {
  display: flex;
  justify-content: center;
  padding: var(--space-xl) 0;
}

.ap__see-all {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-link-blue);
}

.ap__see-all-arrow {
  color: var(--color-link-blue);
}

/* ── Season Stats ── */
.ap__season {
  padding: 0 var(--space-lg) var(--space-2xl);
}

.ap__season .ap__stats-row {
  padding: 0;
}

.ap__season .ap__section-header-wrap {
  padding: 0 0 var(--space-xl);
}
</style>
