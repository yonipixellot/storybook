<template>
  <div class="social-links">
    <a
      v-for="link in visibleLinks"
      :key="link.type"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      class="social-links__icon"
      :aria-label="link.type"
    >
      <!-- X (Twitter) — official X logo filled path -->
      <svg v-if="link.type === 'x'" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
      <!-- Facebook -->
      <svg v-else-if="link.type === 'facebook'" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <!-- Instagram -->
      <svg v-else-if="link.type === 'instagram'" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
      <!-- Website -->
      <svg v-else-if="link.type === 'website'" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
        <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" stroke-width="1.5"/>
        <path d="M2 12h20" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface SocialLink {
  type: 'x' | 'facebook' | 'instagram' | 'website'
  url: string
}

const props = defineProps<{
  links: SocialLink[]
}>()

const visibleLinks = computed(() => props.links.filter(l => l.url))
</script>

<style scoped>
.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
}

.social-links__icon {
  color: var(--color-social-icon);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: opacity var(--duration-fast);
}

.social-links__icon:hover {
  opacity: 0.7;
}
</style>
