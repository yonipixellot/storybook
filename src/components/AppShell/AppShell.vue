<template>
  <div class="ash" :class="`ash--${variant}`">

    <!-- Header (home variant only) -->
    <AppHeader
      v-if="variant === 'home'"
      class="ash__header"
      :org-name="orgName"
      :logo-url="logoUrl"
      :user-initials="userInitials"
      :notif-count="notifCount"
      :show-menu="false"
      @menu="$emit('menu')"
      @search="$emit('search')"
      @notifications="$emit('notifications')"
    >
      <template #nav>
        <AppNavTabs
          v-if="navTabs.length"
          :tabs="navTabs"
          :model-value="activeTab"
          aria-label="Main navigation"
          @update:model-value="$emit('update:activeTab', $event)"
        />
      </template>
    </AppHeader>

    <!-- Header (back variant) -->
    <AppHeader
      v-else-if="variant === 'back'"
      class="ash__header"
      variant="back"
      :org-name="orgName"
      :logo-url="logoUrl"
      :page-title="pageTitle"
      :show-menu="false"
      @back="$emit('back')"
      @search="$emit('search')"
    />

    <!-- Page content -->
    <main class="ash__main" role="main">
      <div class="ash__content">
        <slot />
      </div>
    </main>

    <!-- Bottom tab bar (mobile only — hidden at ≥1024px via its own CSS) -->
    <BottomTabBar
      v-if="variant === 'home'"
      class="ash__btb"
      :active="activeTab"
    />

    <!-- Footer (home variant at desktop) -->
    <Footer
      v-if="variant === 'home'"
      class="ash__footer"
      :org-name="orgName"
    />

  </div>
</template>

<script setup lang="ts">
import AppHeader from '../AppHeader/AppHeader.vue'
import AppNavTabs from '../AppNavTabs/AppNavTabs.vue'
import BottomTabBar from '../BottomTabBar/BottomTabBar.vue'
import Footer from '../Footer/Footer.vue'

export interface NavTab {
  id:    string
  label: string
}

const props = withDefaults(defineProps<{
  /** 'home' = standard page with nav, 'back' = inner page with back arrow */
  variant?:    'home' | 'back'
  orgName?:    string
  logoUrl?:    string
  pageTitle?:  string
  userInitials?: string
  notifCount?: number
  navTabs?:    NavTab[]
  activeTab?:  string
}>(), {
  variant:     'home',
  orgName:     'PBA',
  pageTitle:   'Page',
  notifCount:  0,
  navTabs:     () => [],
  activeTab:   '',
})

defineEmits<{
  menu:              []
  search:            []
  notifications:     []
  back:              []
  'update:activeTab': [value: string]
}>()
</script>

<style scoped>
/* ── Shell layout ── */
.ash {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-white);
}

/* Header sticks to top */
.ash__header {
  position: sticky;
  top: 0;
  z-index: var(--z-header, 100);
}

/* Content grows to fill available space */
.ash__main {
  flex: 1;
}

/* Centered, max-width content at desktop */
.ash__content {
  width: 100%;
  padding: var(--space-lg);
}

/* Footer hidden on mobile (below BottomTabBar); shown at desktop */
.ash__footer {
  display: none;
}

@media (min-width: 1024px) {
  .ash__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-xl) var(--space-xl);
  }

  .ash__footer {
    display: block;
  }
}
</style>
