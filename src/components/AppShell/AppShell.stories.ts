import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import AppShell from './AppShell.vue'

const meta: Meta<typeof AppShell> = {
  title: 'Layout & Overlays/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-page shell: sticky header + scrollable content area + BottomTabBar (mobile) + Footer (desktop). ' +
          'At ≥1024px the BottomTabBar hides, the Footer appears, and content is capped at 1200px centered.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AppShell>

const spartansTabs = [
  { id: 'nbl1',     label: 'NBL1' },
  { id: 'wnbl',     label: 'WNBL' },
  { id: 'domestic', label: 'Senior Domestic' },
  { id: 'qsl',      label: 'QSL' },
  { id: 'junior',   label: 'Junior Domestic' },
]


/* ═══════════════════════════════════════════
   1. Mobile — home variant
   ═══════════════════════════════════════════ */
export const MobileHome: Story = {
  name: 'Mobile — home',
  parameters: {
    viewport: { defaultViewport: 'mobile390' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // AppNavTabs are inside .ah__nav (display:none on mobile viewport in test runner),
    // reach them via querySelector to exercise update:modelValue
    const tabs = canvasElement.querySelectorAll<HTMLElement>('.ant__tab')
    if (tabs.length >= 2) {
      await userEvent.click(tabs[1]) // WNBL tab
    }
    // Click search button to exercise AppHeader @search → AppShell emit
    const searchBtn = canvas.getByRole('button', { name: /search/i })
    await userEvent.click(searchBtn)
    // Click notifications to exercise AppHeader @notifications → AppShell emit (stmt line 15)
    const notifBtn = canvas.getByRole('button', { name: /notifications/i })
    await userEvent.click(notifBtn)
  },
  render: () => ({
    components: { AppShell },
    data() {
      return { activeTab: 'nbl1', tabs: spartansTabs }
    },
    template: `
      <AppShell
        org-name="SD Spartans"
        user-initials="YL"
        :nav-tabs="tabs"
        :active-tab="activeTab"
        @update:active-tab="activeTab = $event"
      >
        <div style="display:grid;gap:16px;">
          <div style="height:180px;background:#F5F5F5;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#979797;font-size:14px;">Content area — place page components here</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;">
            <div style="height:120px;background:#F5F5F5;border-radius:12px;"></div>
            <div style="height:120px;background:#F5F5F5;border-radius:12px;"></div>
            <div style="height:120px;background:#F5F5F5;border-radius:12px;"></div>
            <div style="height:120px;background:#F5F5F5;border-radius:12px;"></div>
          </div>
        </div>
      </AppShell>
    `,
  }),
}

/* ═══════════════════════════════════════════
   2. Desktop — home variant
   ═══════════════════════════════════════════ */
export const DesktopHome: Story = {
  name: 'Desktop — home',
  parameters: {
    viewport: { defaultViewport: 'desktop1440' },
  },
  play: async ({ canvasElement }) => {
    // Avatar button replaces hamburger on desktop — exercises AppHeader @menu → AppShell emit (stmt line 13)
    const avatarBtn = canvasElement.querySelector<HTMLElement>('.ah__avatar-btn')
    if (avatarBtn) await userEvent.click(avatarBtn)
  },
  render: () => ({
    components: { AppShell },
    data() {
      return { activeTab: 'nbl1', tabs: spartansTabs }
    },
    template: `
      <AppShell
        org-name="SD Spartans"
        user-initials="YL"
        :nav-tabs="tabs"
        :active-tab="activeTab"
        @update:active-tab="activeTab = $event"
      >
        <div style="display:grid;gap:16px;">
          <div style="height:200px;background:#F5F5F5;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:Red Hat Display,sans-serif;color:#979797;font-size:14px;">Content area — 1200px max-width centered</div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
            <div style="height:120px;background:#F5F5F5;border-radius:12px;"></div>
            <div style="height:120px;background:#F5F5F5;border-radius:12px;"></div>
            <div style="height:120px;background:#F5F5F5;border-radius:12px;"></div>
            <div style="height:120px;background:#F5F5F5;border-radius:12px;"></div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
            <div style="height:120px;background:#F5F5F5;border-radius:12px;"></div>
            <div style="height:120px;background:#F5F5F5;border-radius:12px;"></div>
            <div style="height:120px;background:#F5F5F5;border-radius:12px;"></div>
            <div style="height:120px;background:#F5F5F5;border-radius:12px;"></div>
          </div>
        </div>
      </AppShell>
    `,
  }),
}

/* ═══════════════════════════════════════════
   3. Desktop — back variant (inner page)
   ═══════════════════════════════════════════ */
export const DesktopBack: Story = {
  name: 'Desktop — back (inner page)',
  parameters: {
    viewport: { defaultViewport: 'desktop1440' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click back button to exercise BackBar back emit → AppShell back emit
    const backBtn = canvas.getByRole('button', { name: /go back/i })
    await expect(backBtn).toBeVisible()
    await userEvent.click(backBtn)
    // Click search button in back variant — exercises AppHeader @search → AppShell emit (stmt line 38)
    const searchBtn = canvas.getByRole('button', { name: /search/i })
    await userEvent.click(searchBtn)
  },
  render: () => ({
    components: { AppShell },
    template: `
      <AppShell
        variant="back"
        org-name="SD Spartans"
        page-title="Player Profile"
      >
        <div style="display:grid;gap:16px;">
          <div style="height:200px;background:#F5F5F5;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:Red Hat Display,sans-serif;color:#979797;font-size:14px;">Inner page content — max-width 1200px</div>
          <div style="display:grid;grid-template-columns:1fr 2fr;gap:16px;">
            <div style="height:300px;background:#F5F5F5;border-radius:12px;"></div>
            <div style="display:flex;flex-direction:column;gap:16px;">
              <div style="height:140px;background:#F5F5F5;border-radius:12px;"></div>
              <div style="height:140px;background:#F5F5F5;border-radius:12px;"></div>
            </div>
          </div>
        </div>
      </AppShell>
    `,
  }),
}

/* ═══════════════════════════════════════════
   4. Dark Mode
   ═══════════════════════════════════════════ */
export const DarkMode: Story = {
  name: 'Dark Mode — desktop',
  parameters: {
    viewport: { defaultViewport: 'desktop1440' },
  },
  decorators: [() => ({ template: '<div data-theme="dark"><story /></div>' })],
  render: () => ({
    components: { AppShell },
    data() {
      return { activeTab: 'nbl1', tabs: spartansTabs }
    },
    template: `
      <AppShell
        org-name="SD Spartans"
        user-initials="YL"
        :nav-tabs="tabs"
        :active-tab="activeTab"
        @update:active-tab="activeTab = $event"
      >
        <div style="display:grid;gap:16px;">
          <div style="height:200px;background:var(--color-gray-100);border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:Red Hat Display,sans-serif;color:var(--color-gray-400);font-size:14px;">Dark mode content area</div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
            <div style="height:120px;background:var(--color-gray-100);border-radius:12px;"></div>
            <div style="height:120px;background:var(--color-gray-100);border-radius:12px;"></div>
            <div style="height:120px;background:var(--color-gray-100);border-radius:12px;"></div>
            <div style="height:120px;background:var(--color-gray-100);border-radius:12px;"></div>
          </div>
        </div>
      </AppShell>
    `,
  }),
}
