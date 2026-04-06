import type { Meta, StoryObj } from '@storybook/vue3-vite'
import HomePage from './HomePage.vue'
import AppShell from '../AppShell/AppShell.vue'

const meta: Meta<typeof HomePage> = {
  title: 'Pages/HomePage',
  component: HomePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main home feed. Content only — wrap in AppShell to get the header, BottomTabBar, and Footer. ' +
          'At ≥1024px: Live cards show as 4-col fixed-width row (overflow scrolls), Recent/Upcoming go 3-col grid.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof HomePage>

const spartansTabs = [
  { id: 'nbl1',     label: 'NBL1' },
  { id: 'wnbl',     label: 'WNBL' },
  { id: 'domestic', label: 'Senior Domestic' },
  { id: 'qsl',      label: 'QSL' },
  { id: 'junior',   label: 'Junior Domestic' },
]

/* ═══════════════════════════════════════════
   1. Mobile (default)
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Mobile',
  parameters: { viewport: { defaultViewport: 'mobile390' } },
  render: () => ({
    components: { AppShell, HomePage },
    data() { return { activeTab: 'nbl1', tabs: spartansTabs } },
    template: `
      <AppShell org-name="SD Spartans" user-initials="SS" :nav-tabs="tabs" :active-tab="activeTab" @update:active-tab="activeTab = $event">
        <HomePage />
      </AppShell>
    `,
  }),
}

/* ═══════════════════════════════════════════
   2. Desktop
   ═══════════════════════════════════════════ */
export const Desktop: Story = {
  name: 'Desktop',
  parameters: { viewport: { defaultViewport: 'desktop1440' } },
  render: () => ({
    components: { AppShell, HomePage },
    data() { return { activeTab: 'nbl1', tabs: spartansTabs } },
    template: `
      <AppShell org-name="SD Spartans" user-initials="SS" :nav-tabs="tabs" :active-tab="activeTab" @update:active-tab="activeTab = $event">
        <HomePage />
      </AppShell>
    `,
  }),
}

/* ═══════════════════════════════════════════
   3. Dark Mode
   ═══════════════════════════════════════════ */
export const DarkMode: Story = {
  name: 'Dark Mode',
  parameters: { viewport: { defaultViewport: 'desktop1440' } },
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A"><story /></div>' })],
  render: () => ({
    components: { AppShell, HomePage },
    data() { return { activeTab: 'nbl1', tabs: spartansTabs } },
    template: `
      <AppShell org-name="SD Spartans" user-initials="SS" :nav-tabs="tabs" :active-tab="activeTab" @update:active-tab="activeTab = $event">
        <HomePage />
      </AppShell>
    `,
  }),
}
