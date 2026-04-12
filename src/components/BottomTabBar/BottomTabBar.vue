<template>
  <div class="btb">
    <button
      v-for="tab in resolvedTabs"
      :key="tab.id"
      class="btb__tab"
      :aria-label="tab.label"
      :aria-pressed="activeTab === tab.id"
      @click="selectTab(tab.id)"
    >
      <!-- Custom icon per tab type -->
      <svg v-if="tab.icon === 'games'" width="24" height="24" viewBox="0 0 24 24"
        :fill="activeTab === tab.id ? activeColor : 'none'"
        :stroke="activeTab === tab.id ? activeColor : 'var(--color-gray-400)'"
        :stroke-width="activeTab === tab.id ? 2 : 1.5"
        stroke-linecap="round" stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9H4.5a2.5 2.5 0 010-5C7 4 7 7 7 7"/>
        <path d="M18 9h1.5a2.5 2.5 0 000-5C17 4 17 7 17 7"/>
        <path d="M18 2H6v7a6 6 0 0012 0V2z"/>
        <line x1="12" y1="15" x2="12" y2="19"/>
        <line x1="9" y1="19" x2="15" y2="19"/>
      </svg>

      <Bookmark v-else-if="tab.icon === 'saved'"
        :size="24"
        :fill="activeTab === tab.id ? activeColor : 'none'"
        :color="activeTab === tab.id ? activeColor : 'var(--color-gray-400)'"
        :stroke-width="activeTab === tab.id ? 2 : 1.5"
        aria-hidden="true"
      />

      <svg v-else-if="tab.icon === 'following'" width="24" height="24" viewBox="0 0 24 24"
        :fill="activeTab === tab.id ? activeColor : 'none'"
        :stroke="activeTab === tab.id ? activeColor : 'var(--color-gray-400)'"
        :stroke-width="activeTab === tab.id ? 2 : 1.5"
        stroke-linecap="round" stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>

      <svg v-else-if="tab.icon === 'shop'" width="24" height="24" viewBox="0 0 24 24"
        fill="none"
        :stroke="activeTab === tab.id ? activeColor : 'var(--color-gray-400)'"
        :stroke-width="activeTab === tab.id ? 2 : 1.5"
        stroke-linecap="round" stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="8" width="18" height="13" rx="2"
          :fill="activeTab === tab.id ? activeColor : 'none'"
        />
        <path d="M16 8V6a4 4 0 00-8 0v2"/>
        <path :d="'M9 14c1.5 1.5 4.5 1.5 6 0'"
          :stroke="activeTab === tab.id ? 'var(--color-white)' : 'var(--color-gray-400)'"
        />
      </svg>

      <User v-else-if="tab.icon === 'profile'"
        :size="24"
        :fill="activeTab === tab.id ? activeColor : 'none'"
        :color="activeTab === tab.id ? activeColor : 'var(--color-gray-400)'"
        :stroke-width="activeTab === tab.id ? 2 : 1.5"
        aria-hidden="true"
      />

      <!-- Tab label -->
      <span class="btb__label"
        :class="{ 'btb__label--active': activeTab === tab.id }"
        :style="activeTab === tab.id ? { color: activeColor, fontWeight: 'var(--font-bold)' } : {}"
      >{{ tab.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Bookmark, User } from 'lucide-vue-next'

export interface TabItem {
  id:    string
  label: string
  icon:  'games' | 'saved' | 'following' | 'shop' | 'profile'
}

const props = withDefaults(defineProps<{
  tabs?:        TabItem[]
  active?:      string
  accentColor?: string
}>(), {
  tabs: () => [
    { id: 'games',      label: 'Games',      icon: 'games'     },
    { id: 'saved',      label: 'Saved',      icon: 'saved'     },
    { id: 'following',  label: 'Following',  icon: 'following' },
    { id: 'shop',       label: 'Shop',       icon: 'shop'      },
    { id: 'my-profile', label: 'My Profile', icon: 'profile'   },
  ],
})

defineEmits<{ select: [id: string] }>()

const resolvedTabs = computed(() => props.tabs)
const activeColor  = computed(() => props.accentColor ?? 'var(--color-dark-text)')

const internalActive = ref(props.tabs?.[0]?.id ?? 'games')
const activeTab = computed(() => props.active ?? internalActive.value)

function selectTab(id: string) {
  internalActive.value = id
}
</script>

<style scoped>
.btb {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: var(--color-white);
  border-top: 1px solid var(--color-gray-100);
  padding: 8px 0 12px;
  width: 100%;
}

/* Desktop: bottom tab bar is replaced by header navigation */
@media (min-width: 1024px) {
  .btb {
    display: none;
  }
}

.btb__tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 16px;
  min-width: 64px;
}

.btb__tab:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.btb__label {
  font-family: var(--font-family-base);
  font-size: var(--text-2xs);
  font-weight: var(--font-regular);
  color: var(--color-gray-400);
  line-height: 1;
}

.btb__label--active {
  font-weight: var(--font-bold);
}
</style>
