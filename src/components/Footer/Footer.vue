<template>
  <footer class="ft" role="contentinfo">

    <!-- Nav links row -->
    <div class="ft__nav">
      <PTeamLogo :name="orgName" :logoUrl="logoUrl" :size="28" />

      <span
        v-for="link in resolvedLinks"
        :key="link.label"
        class="ft__link"
        role="link"
        tabindex="0"
        @click="$emit('linkClick', link.label)"
        @keydown.enter="$emit('linkClick', link.label)"
      >{{ link.label }}</span>
    </div>

    <!-- Social icons row -->
    <div class="ft__social" aria-label="Social media links">
      <!-- X / Twitter -->
      <button class="ft__social-btn" aria-label="X (Twitter)">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.4L19.5 4h-2l-5.2 6.4L8 4H4z"
            stroke="var(--color-gray-500)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <!-- Facebook -->
      <button class="ft__social-btn" aria-label="Facebook">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"
            stroke="var(--color-gray-500)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <!-- Instagram -->
      <button class="ft__social-btn" aria-label="Instagram">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5"
            stroke="var(--color-gray-500)" stroke-width="1.5" />
          <circle cx="12" cy="12" r="5"
            stroke="var(--color-gray-500)" stroke-width="1.5" />
          <circle cx="17.5" cy="6.5" r="1" fill="var(--color-gray-500)" />
        </svg>
      </button>

      <!-- YouTube -->
      <button class="ft__social-btn" aria-label="YouTube">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58z"
            stroke="var(--color-gray-500)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M10 15l5-3-5-3v6z"
            stroke="var(--color-gray-500)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <!-- TikTok -->
      <button class="ft__social-btn" aria-label="TikTok">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"
            stroke="var(--color-gray-500)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <!-- Email -->
      <button class="ft__social-btn" aria-label="Email">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="2"
            stroke="var(--color-gray-500)" stroke-width="1.5" />
          <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"
            stroke="var(--color-gray-500)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <!-- Copyright -->
    <p class="ft__copyright">© {{ currentYear }} {{ orgName }}. All rights reserved</p>

    <!-- Powered by -->
    <p v-if="showPoweredBy" class="ft__powered">
      Powered by <span class="ft__powered-brand">Pixellot</span>
    </p>

  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PTeamLogo from '../PTeamLogo/PTeamLogo.vue'

export interface FooterLink {
  label: string
  href?:  string
}

const DEFAULT_LINKS: FooterLink[] = [
  { label: 'About us' },
  { label: 'FAQ' },
  { label: 'Privacy' },
]

const props = withDefaults(defineProps<{
  orgName?:      string
  logoUrl?:      string
  links?:        FooterLink[]
  showPoweredBy?: boolean
}>(), {
  orgName:       'PBA',
  showPoweredBy: true,
})

defineEmits<{ linkClick: [label: string] }>()

const resolvedLinks = computed(() => props.links ?? DEFAULT_LINKS)
const currentYear   = computed(() => new Date().getFullYear())
</script>

<style scoped>
.ft {
  background: var(--color-gray-50);
  padding: 32px var(--space-xl) var(--space-xl);
  border-top: 1px solid var(--color-gray-200);
}

/* ── Nav row ── */
.ft__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
  margin-bottom: var(--space-xl);
}

.ft__link {
  font-family: var(--font-family-base);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  cursor: pointer;
}

.ft__link:hover {
  color: var(--color-primary);
}

/* ── Social icons row ── */
.ft__social {
  display: flex;
  gap: var(--space-lg2);
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-lg2);
}

.ft__social-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Copyright / Powered by ── */
.ft__copyright {
  font-family: var(--font-family-base);
  font-size: var(--text-caption);
  color: var(--color-gray-400);
  text-align: center;
  margin: 0 0 var(--space-xs2);
}

.ft__powered {
  font-family: var(--font-family-base);
  font-size: var(--text-caption);
  font-weight: var(--font-bold);
  color: var(--color-gray-500);
  text-align: center;
  margin: 0;
}

.ft__powered-brand {
  letter-spacing: 0.5px;
}
</style>
