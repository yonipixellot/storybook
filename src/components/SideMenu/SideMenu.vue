<template>
  <div class="sm">
    <!-- Dark backdrop -->
    <div class="sm__backdrop" @click="$emit('close')" />

    <!-- Panel -->
    <nav class="sm__panel" role="navigation" aria-label="Side menu">

      <!-- ── Header ── -->
      <!-- Profile variant: avatar + user name -->
      <div v-if="variant === 'profile'" class="sm__header sm__header--profile">
        <div class="sm__avatar">
          <span class="sm__avatar-initials">{{ userInitials }}</span>
        </div>
        <span class="sm__user-name">{{ userName }}</span>
        <button class="sm__close-btn" aria-label="Close" @click="$emit('close')">
          <X :size="20" aria-hidden="true" />
        </button>
      </div>

      <!-- Org variant: logo + org name + subtitle -->
      <div v-else class="sm__header sm__header--org">
        <div class="sm__logo">
          <img
            v-if="logoUrl && !logoError"
            :src="logoUrl"
            :alt="orgName"
            class="sm__logo-img"
            @error="logoError = true"
          />
          <div v-else class="sm__logo-placeholder">
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="var(--color-gray-400)" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <rect x="7" y="7" width="4" height="4" rx="1" />
              <rect x="13" y="7" width="4" height="4" rx="1" />
              <rect x="7" y="13" width="4" height="4" rx="1" />
              <rect x="13" y="13" width="4" height="4" rx="1" />
            </svg>
          </div>
        </div>
        <div class="sm__org-info">
          <div class="sm__org-name">{{ orgName }}</div>
          <div class="sm__org-subtitle">{{ orgSubtitle }}</div>
        </div>
        <button class="sm__close-btn" aria-label="Close" @click="$emit('close')">
          <X :size="18" aria-hidden="true" />
        </button>
      </div>

      <!-- ── Accordion items (with subItems) ── -->
      <div class="sm__content">
        <template v-for="(item, idx) in resolvedItems" :key="`item-${idx}`">
          <!-- Accordion item -->
          <div v-if="item.subItems && item.subItems.length > 0" class="sm__accordion-item">
            <button
              class="sm__accordion-header"
              :aria-expanded="openSet.has(idx)"
              :aria-label="item.label"
              @click="toggleItem(idx)"
            >
              <span class="sm__item-label">{{ item.label }}</span>
              <ChevronDown
                :size="16"
                class="sm__chevron"
                :class="{ 'sm__chevron--open': openSet.has(idx) }"
                aria-hidden="true"
              />
            </button>
            <div v-if="openSet.has(idx)" class="sm__accordion-content">
              <button
                v-for="(sub, sIdx) in item.subItems"
                :key="sIdx"
                class="sm__sub-item"
                :aria-label="sub"
              >{{ sub }}</button>
            </div>
          </div>
        </template>

        <!-- Divider before plain items -->
        <div v-if="hasAccordionItems" class="sm__divider" />

        <!-- Plain nav items -->
        <template v-for="(item, idx) in plainItems" :key="`plain-${idx}`">
          <button class="sm__nav-item" :aria-label="item.label">
            <span class="sm__item-label">{{ item.label }}</span>
            <template v-if="item.label === 'Language'">
              <span class="sm__lang-value">English</span>
              <ChevronDown
                :size="16"
                class="sm__chevron sm__chevron--left"
                aria-hidden="true"
              />
            </template>
          </button>
        </template>
      </div>

      <!-- ── Footer: Log Out ── -->
      <div class="sm__footer">
        <div class="sm__separator" />
        <button class="sm__logout" @click="$emit('logout')">Log Out</button>
      </div>

    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, ChevronDown } from 'lucide-vue-next'

export interface SideMenuItem {
  label: string
  subItems?: string[]
}

const DEFAULT_ORG_ITEMS: SideMenuItem[] = [
  { label: 'Divisions', subItems: ['Varsity', 'Junior Varsity', 'Regional', "Women's Varsity", "Women's JV"] },
  { label: 'Tournaments' },
  { label: 'Saved Videos' },
  { label: 'My Highlights' },
  { label: 'My Account' },
  { label: 'Manage Following' },
  { label: 'Language' },
]

const DEFAULT_PROFILE_ITEMS: SideMenuItem[] = [
  { label: 'Premier League', subItems: ['Division 1', 'Division 2'] },
  { label: 'Championship', subItems: ['East', 'West'] },
  { label: 'League One', subItems: ['Group A', 'Group B'] },
  { label: 'League Two', subItems: ['North', 'South'] },
]

const PROFILE_PLAIN_ITEMS: SideMenuItem[] = [
  { label: 'Language' },
  { label: 'My Account' },
  { label: 'Saved Videos' },
  { label: 'My Highlights' },
]

const props = withDefaults(defineProps<{
  variant?:      'org' | 'profile'
  orgName?:      string
  orgSubtitle?:  string
  logoUrl?:      string
  items?:        SideMenuItem[]
  userName?:     string
  userInitials?: string
}>(), {
  variant:      'org',
  orgName:      'PBA',
  orgSubtitle:  'Basketball Association',
  userName:     'Brenden Rogers',
  userInitials: 'BR',
})

defineEmits<{ close: []; logout: [] }>()

const logoError = ref(false)

const resolvedItems = computed<SideMenuItem[]>(() => {
  if (props.items) return props.items
  return props.variant === 'profile' ? DEFAULT_PROFILE_ITEMS : DEFAULT_ORG_ITEMS
})

const hasAccordionItems = computed(() =>
  resolvedItems.value.some(i => i.subItems && i.subItems.length > 0)
)

const plainItems = computed<SideMenuItem[]>(() => {
  if (props.variant === 'profile') return PROFILE_PLAIN_ITEMS
  return resolvedItems.value.filter(i => !i.subItems || i.subItems.length === 0)
})

const openSet = ref<Set<number>>(new Set())

function toggleItem(idx: number) {
  const s = new Set(openSet.value)
  if (s.has(idx)) s.delete(idx)
  else s.add(idx)
  openSet.value = s
}
</script>

<style scoped>
/* ── Outer wrapper (positions backdrop + panel) ── */
.sm {
  position: relative;
  width: 100%;
  height: 520px;
  border-radius: var(--radius-card);
  overflow: hidden;
}

/* ── Backdrop ── */
.sm__backdrop {
  position: absolute;
  inset: 0;
  background: var(--color-overlay);
}

/* ── Panel ── */
.sm__panel {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  background: var(--color-white);
  padding: 20px 20px var(--space-xl);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* ── Header ── */
.sm__header {
  display: flex;
  align-items: center;
  gap: var(--space-sm2);
}

.sm__header--org {
  margin-bottom: var(--space-xl);
}

.sm__header--profile {
  margin-bottom: var(--space-lg);
}

.sm__logo {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-logo);
  overflow: hidden;
  flex-shrink: 0;
}

.sm__logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.sm__logo-placeholder {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-logo);
  background: var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sm__org-info {
  flex: 1;
}

.sm__org-name {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
}

.sm__org-subtitle {
  font-family: var(--font-family-base);
  font-size: var(--text-caption);
  color: var(--color-gray-400);
}

/* ── Avatar (profile variant) ── */
.sm__avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--color-gray-500);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sm__avatar-initials {
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  color: var(--color-white);
}

.sm__user-name {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-black);
  flex: 1;
}

/* ── Close button ── */
.sm__close-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--color-gray-100);
  border: none;
  cursor: pointer;
  color: var(--color-gray-400);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sm__close-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── Content ── */
.sm__content {
  flex: 1;
}

/* ── Accordion items ── */
.sm__accordion-header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--space-md2) var(--space-sm);
  background: none;
  border: none;
  cursor: pointer;
  gap: var(--space-md);
  border-radius: var(--radius-logo);
  margin: 0 -8px;
}

.sm__accordion-header:hover {
  background: var(--color-gray-50);
}

.sm__item-label {
  flex: 1;
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  color: var(--color-dark-text);
  text-align: left;
}

.sm__chevron {
  color: var(--color-gray-400);
  flex-shrink: 0;
  transform: rotate(-90deg);
  transition: transform var(--duration-base);
}

.sm__chevron--open {
  transform: rotate(0deg);
}

.sm__chevron--left {
  transform: rotate(-90deg) !important;
}

.sm__accordion-content {
  padding-left: var(--space-lg);
}

.sm__sub-item {
  display: block;
  width: 100%;
  padding: var(--space-sm2) 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  color: var(--color-dark-text);
  text-align: left;
}

/* ── Divider ── */
.sm__divider {
  height: 1px;
  width: 100%;
  background: var(--color-gray-100);
  margin: var(--space-sm) 0;
}

/* ── Plain nav items ── */
.sm__nav-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--space-md2) 0;
  background: none;
  border: none;
  cursor: pointer;
  gap: var(--space-md);
}

.sm__nav-item:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-xs);
}

.sm__lang-value {
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  color: var(--color-gray-400);
  margin-right: var(--space-xs);
}

/* ── Footer ── */
.sm__footer {
  padding-top: var(--space-sm);
}

.sm__separator {
  height: 1px;
  background: var(--color-gray-100);
  margin-bottom: var(--space-sm);
}

.sm__logout {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  background: none;
  border: none;
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  color: var(--color-error-red);
  cursor: pointer;
  text-align: left;
  padding: var(--space-lg) 0;
}

.sm__logout:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-xs);
}
</style>
