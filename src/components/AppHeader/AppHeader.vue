<template>
  <div class="ah">

    <!-- Main header row -->
    <div class="ah__main">

      <!-- Left: logo + org name -->
      <div class="ah__brand">
        <div v-if="logoUrl" class="ah__logo">
          <img :src="logoUrl" :alt="orgName" class="ah__logo-img" />
        </div>
        <div v-else class="ah__logo ah__logo--placeholder">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gray-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="m21 15-5-5L5 21"/>
          </svg>
        </div>
        <span class="ah__org-name">{{ orgName }}</span>
      </div>

      <!-- Center (desktop only): slot for AppNavTabs -->
      <div class="ah__nav">
        <slot name="nav" />
      </div>

      <!-- Right: action icons -->
      <div class="ah__actions">
        <button v-if="showSearch" class="ah__action-btn" aria-label="Search" @click="$emit('search')">
          <Search :size="24" class="ah__icon" aria-hidden="true" />
        </button>
        <button v-if="showNotifications" class="ah__action-btn" aria-label="Notifications" @click="$emit('notifications')">
          <PBellIcon :count="notifCount" />
        </button>

        <!-- Mobile: hamburger menu -->
        <button v-if="showMenu" class="ah__action-btn ah__menu-btn" aria-label="Menu" @click="$emit('menu')">
          <MenuIcon :size="24" class="ah__icon" aria-hidden="true" />
        </button>

        <!-- Desktop: avatar button (replaces hamburger) -->
        <button class="ah__action-btn ah__avatar-btn" aria-label="User menu" @click="$emit('menu')">
          <PAvatar :initials="userInitials || defaultInitials" :size="32" />
        </button>
      </div>
    </div>

    <!-- Back sub-bar (variant = "back") -->
    <BackBar
      v-if="variant === 'back'"
      :label="pageTitle"
      :show-share="showShare"
      style="padding: 6px 16px 10px"
      @back="$emit('back')"
      @share="$emit('share')"
    />

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Search, Menu as MenuIcon } from 'lucide-vue-next'
import PBellIcon from '../PBellIcon/PBellIcon.vue'
import PAvatar from '../PAvatar/PAvatar.vue'
import BackBar from '../BackBar/BackBar.vue'

const props = withDefaults(defineProps<{
  variant?:           'home' | 'back'
  orgName?:           string
  logoUrl?:           string
  pageTitle?:         string
  showSearch?:        boolean
  showNotifications?: boolean
  showMenu?:          boolean
  showShare?:         boolean
  notifCount?:        number
  /** Desktop: user initials shown in avatar button (e.g. "BR") */
  userInitials?:      string
}>(), {
  variant:           'home',
  orgName:           'PBA',
  pageTitle:         'All Games',
  showSearch:        true,
  showNotifications: true,
  showMenu:          true,
  showShare:         false,
  notifCount:        0,
})

defineEmits<{
  search:        []
  notifications: []
  menu:          []
  back:          []
  share:         []
}>()

/** Fallback initials derived from orgName when userInitials not provided */
const defaultInitials = computed(() =>
  props.orgName
    .split(' ')
    .slice(0, 2)
    .map(w => w[0] ?? '')
    .join('')
    .toUpperCase()
)
</script>

<style scoped>
.ah {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-gray-100);
}

.ah__main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
}

/* ── Brand ── */
.ah__brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm2);
  flex-shrink: 0;
}

.ah__logo {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-thumb);
  overflow: hidden;
  flex-shrink: 0;
}

.ah__logo--placeholder {
  background: var(--color-gray-100);
  border: 1px dashed var(--color-gray-300);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ah__logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ah__org-name {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-dark-text);
}

/* ── Center nav slot ── */
/* Hidden on mobile; shown on desktop */
.ah__nav {
  display: none;
  flex: 1;
  justify-content: center;
  padding: 0 var(--space-xl);
}

/* ── Actions ── */
.ah__actions {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-shrink: 0;
}

.ah__action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.ah__action-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.ah__icon {
  color: var(--color-gray-500);
}

/* Avatar button: hidden on mobile, shown on desktop */
.ah__avatar-btn {
  display: none;
  border-radius: var(--radius-full);
}

/* ── Desktop breakpoint ── */
@media (min-width: 1024px) {
  .ah__main {
    padding: var(--space-md) var(--space-xl);
  }

  /* Show nav slot */
  .ah__nav {
    display: flex;
  }

  /* Swap hamburger → avatar */
  .ah__menu-btn {
    display: none;
  }

  .ah__avatar-btn {
    display: flex;
  }
}
</style>
