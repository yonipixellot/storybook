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

      <!-- Right: action icons -->
      <div class="ah__actions">
        <button v-if="showSearch" class="ah__action-btn" aria-label="Search" @click="$emit('search')">
          <Search :size="24" class="ah__icon" aria-hidden="true" />
        </button>
        <button v-if="showNotifications" class="ah__action-btn" aria-label="Notifications" @click="$emit('notifications')">
          <PBellIcon :count="notifCount" />
        </button>
        <button v-if="showMenu" class="ah__action-btn" aria-label="Menu" @click="$emit('menu')">
          <Menu :size="24" class="ah__icon" aria-hidden="true" />
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
import { Search, Menu } from 'lucide-vue-next'
import PBellIcon from '../PBellIcon/PBellIcon.vue'
import BackBar from '../BackBar/BackBar.vue'

withDefaults(defineProps<{
  variant?:           'home' | 'back'
  orgName?:           string
  logoUrl?:           string
  pageTitle?:         string
  showSearch?:        boolean
  showNotifications?: boolean
  showMenu?:          boolean
  showShare?:         boolean
  notifCount?:        number
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
  search: []
  notifications: []
  menu: []
  back: []
  share: []
}>()
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

.ah__brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm2);
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

.ah__actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.ah__action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
}

.ah__icon {
  color: var(--color-gray-500);
}
</style>
