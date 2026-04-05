<template>
  <div class="es">
    <!-- Icon circle -->
    <div class="es__icon-wrap" aria-hidden="true">
      <component :is="resolvedIcon" :size="28" color="var(--color-gray-400)" :role="'img'" :aria-label="resolvedTitle" />
    </div>

    <!-- Title -->
    <div class="es__title">{{ resolvedTitle }}</div>

    <!-- Subtitle -->
    <div class="es__subtitle" v-if="resolvedSubtitle">{{ resolvedSubtitle }}</div>

    <!-- CTA -->
    <button v-if="resolvedCta" class="es__cta" @click="$emit('action')">
      {{ resolvedCta }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Heart, User, Trophy, Search, Users,
  Bookmark, Eye, Check, Play, Bell,
  Download, Upload, Share2,
} from 'lucide-vue-next'

type PresetKey =
  | 'noFollowing' | 'noPersonal' | 'noFollowedPlayers'
  | 'noTeamsFound' | 'noClaimedPlayer' | 'noSearchResults'

interface EmptyPreset {
  icon:     string
  title:    string
  subtitle: string
  cta?:     string | null
}

const PRESETS: Record<PresetKey, EmptyPreset> = {
  noFollowing: {
    icon:     'heart',
    title:    'No Following Yet',
    subtitle: 'Follow your favourite teams and players to see their content here.',
    cta:      'Explore Teams',
  },
  noPersonal: {
    icon:     'user',
    title:    'No Personal Content',
    subtitle: 'Your personal highlights and saved moments will appear here.',
  },
  noFollowedPlayers: {
    icon:     'user',
    title:    'No Followed Players',
    subtitle: 'Follow players to get updates on their latest highlights.',
    cta:      'Browse Players',
  },
  noTeamsFound: {
    icon:     'team',
    title:    'No Teams Found',
    subtitle: "We couldn't find any teams matching your search. Try a different query.",
    cta:      null,
  },
  noClaimedPlayer: {
    icon:     'trophy',
    title:    'No Claimed Player',
    subtitle: 'Claim your player profile to see personalized highlights.',
    cta:      'Claim Player',
  },
  noSearchResults: {
    icon:     'search',
    title:    'No Results Found',
    subtitle: 'Try adjusting your search terms or filters.',
  },
}

const ICON_MAP: Record<string, unknown> = {
  heart:    Heart,
  user:     User,
  trophy:   Trophy,
  search:   Search,
  team:     Users,
  bookmark: Bookmark,
  eye:      Eye,
  check:    Check,
  play:     Play,
  bell:     Bell,
  download: Download,
  upload:   Upload,
  share:    Share2,
}

const props = withDefaults(defineProps<{
  /** One of the 12 built-in preset keys */
  preset?:   PresetKey
  /** Override icon (preset or custom key) */
  icon?:     string
  title?:    string
  subtitle?: string
  /** CTA button label. Pass empty string to hide. */
  cta?:      string | null
}>(), {})

defineEmits<{ action: [] }>()

const presetData = computed<EmptyPreset | undefined>(() =>
  props.preset ? PRESETS[props.preset] : undefined
)

const resolvedIcon     = computed(() => ICON_MAP[props.icon ?? presetData.value?.icon ?? 'search'] ?? Search)
const resolvedTitle    = computed(() => props.title    ?? presetData.value?.title    ?? 'Nothing Here')
const resolvedSubtitle = computed(() => props.subtitle ?? presetData.value?.subtitle ?? '')
const resolvedCta      = computed(() => {
  if (props.cta !== undefined) return props.cta || null
  return presetData.value?.cta ?? null
})
</script>

<style scoped>
.es {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px var(--space-xl);
  text-align: center;
}

/* ── Icon circle ── */
.es__icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  background: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-lg);
}

/* ── Title ── */
.es__title {
  font-family: var(--font-family-base);
  font-size: var(--text-h3);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
  margin-bottom: var(--space-sm);
}

/* ── Subtitle ── */
.es__subtitle {
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  font-weight: var(--font-regular);
  color: var(--color-gray-500);
  line-height: 1.5;
  max-width: 280px;
  margin-bottom: var(--space-xl);
}

/* ── CTA button (primary style) ── */
.es__cta {
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-pill);
  padding: 0 var(--space-xl); /* DS: 0px 24px */
  height: 40px;               /* DS: explicit 40px height */
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-medium); /* DS: 500, not 600 */
  cursor: pointer;
  transition: background var(--duration-fast);
}

.es__cta:hover {
  background: var(--color-primary-hover);
}
</style>
