<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div
      v-if="open"
      class="sc__backdrop"
      :data-theme="currentTheme"
      role="presentation"
      aria-label="Close share menu"
      @click="$emit('close')"
    />

    <!-- Sheet -->
    <Transition name="sc-slide-up">
      <div
        v-if="open"
        class="sc"
        :data-theme="currentTheme"
        role="dialog"
        aria-labelledby="sc-title"
        aria-modal="true"
      >
        <h3 id="sc-title" class="sc__title">Share</h3>

        <div class="sc__grid" role="list">
          <button
            v-for="ch in channels"
            :key="ch.id"
            class="sc__item"
            role="listitem"
            :aria-label="`Share via ${ch.label}`"
            @click="$emit('share', ch.id)"
          >
            <div class="sc__icon" :style="{ background: ch.gradient ?? (currentTheme === 'dark' && ch.darkColor ? ch.darkColor : ch.color) }">
              <component :is="ch.icon" aria-hidden="true" />
            </div>
            <span class="sc__label">{{ ch.label }}</span>
          </button>
        </div>

        <button
          class="sc__cancel"
          aria-label="Cancel sharing"
          @click="$emit('close')"
        >
          Cancel
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

/* ── Theme detection — Teleport moves content outside [data-theme] wrapper ──
   MutationObserver watches for data-theme changes anywhere in the DOM
   and mirrors the value onto the teleported sheet so CSS tokens resolve correctly. */
const currentTheme = ref('')

let themeObserver: MutationObserver | null = null

onMounted(() => {
  const getTheme = () => {
    const el = document.querySelector('[data-theme]')
    currentTheme.value = el?.getAttribute('data-theme') ?? ''
  }
  getTheme()
  themeObserver = new MutationObserver(getTheme)
  themeObserver.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ['data-theme'],
  })
})

onUnmounted(() => {
  themeObserver?.disconnect()
})

/* ── Brand icons — exact paths from deployed DS ── */
const CopyLinkIcon = defineComponent({
  template: `<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
})

const FacebookIcon = defineComponent({
  // DS uses full circular Facebook logo (white circle with f cutout), not just the f mark
  template: `<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.384C19.612 22.954 24 17.99 24 12Z"/></svg>`,
})

const XLogoIcon = defineComponent({
  // DS official X logo path (not the approximate version)
  template: `<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
})

const WhatsAppIcon = defineComponent({
  template: `<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347ZM12.05 21.785h-.018a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884ZM20.52 3.449C18.24 1.226 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411Z"/></svg>`,
})

const TikTokIcon = defineComponent({
  // DS path (updated precise version)
  template: `<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.17a8.16 8.16 0 0 0 4.76 1.53v-3.5a4.82 4.82 0 0 1-1-.51Z"/></svg>`,
})

const InstagramIcon = defineComponent({
  // DS uses filled single-path official Instagram logo, not outlined rect+circles
  template: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/></svg>`,
})

/* ── Channel definitions — mirrors DS SHARE_CHANNELS exactly ── */
interface Channel {
  id:         string
  label:      string
  color?:     string
  darkColor?: string   // X and TikTok use #333333 in dark mode instead of #000000
  gradient?:  string   // Instagram uses a gradient background
  icon:       ReturnType<typeof defineComponent>
}

const channels: Channel[] = [
  { id: 'copy',      label: 'Copy Link',  color: '#BDBDBD',                                                      icon: CopyLinkIcon },
  { id: 'facebook',  label: 'Facebook',   color: '#1877F2',                                                      icon: FacebookIcon },
  { id: 'x',         label: 'X',          color: '#000000', darkColor: '#333333',                                icon: XLogoIcon },
  { id: 'whatsapp',  label: 'WhatsApp',   color: '#25D366',                                                      icon: WhatsAppIcon },
  { id: 'tiktok',    label: 'TikTok',     color: '#000000', darkColor: '#333333',                                icon: TikTokIcon },
  { id: 'instagram', label: 'Instagram',  gradient: 'linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)', icon: InstagramIcon },
]

withDefaults(defineProps<{
  open?: boolean
}>(), {
  open: false,
})

defineEmits<{
  close: []
  share: [channelId: string]
}>()
</script>

<style scoped>
/* ── Backdrop ── */
.sc__backdrop {
  position: fixed;
  inset: 0;
  background: var(--color-overlay);
  z-index: var(--z-dropdown);
  animation: sc-fade-in 0.2s ease;
}

@keyframes sc-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── Sheet ── */
.sc {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-white);
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  padding: var(--space-xl) var(--space-lg);
  z-index: var(--z-modal);
  max-height: 80vh;
  overflow-y: auto;
}

/* ── Slide-up transition ── */
.sc-slide-up-enter-active {
  transition: transform var(--duration-slow) var(--easing-out);
}
.sc-slide-up-leave-active {
  transition: transform var(--duration-slow) var(--easing-in);
}
.sc-slide-up-enter-from,
.sc-slide-up-leave-to {
  transform: translateY(100%);
}

/* ── Title ── */
.sc__title {
  font-family: var(--font-family-base);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--color-dark-text);
  margin: 0 0 var(--space-lg) 0;
}

/* ── Grid ── */
.sc__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

/* ── Channel item ── */
.sc__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-sm);
  border-radius: var(--radius-lg);
  outline: none;
  transition: background var(--duration-fast);
}

.sc__item:hover {
  background: var(--color-gray-100);
}

.sc__item:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── Icon circle ── */
.sc__icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;   /* hardcoded — icons on fixed-color brand backgrounds (Failure #16) */
  flex-shrink: 0;
}

/* ── Label ── */
.sc__label {
  font-family: var(--font-family-base);
  font-size: var(--text-xs);   /* 14px */
  font-weight: var(--font-medium);
  color: var(--color-dark-text);
  text-align: center;
}

/* ── Cancel button ── */
.sc__cancel {
  width: 100%;
  height: var(--size-button-height);  /* 40px */
  background: var(--color-gray-100);
  border: none;
  border-radius: var(--radius-xl);
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-dark-text);
  cursor: pointer;
  outline: none;
  transition: background var(--duration-fast);
}

.sc__cancel:hover {
  background: var(--color-gray-200);
}

.sc__cancel:active {
  background: var(--color-gray-300);
}

.sc__cancel:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
