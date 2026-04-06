import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import AppHeader from './AppHeader.vue'
import AppNavTabs from '../AppNavTabs/AppNavTabs.vue'

const meta: Meta<typeof AppHeader> = {
  title: 'Layout & Overlays/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Top navigation bar. Home variant shows org logo + name with notification bell and hamburger menu. Back variant shows a back arrow with optional page title.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['home', 'back'] },
    orgName: { control: 'text' },
    logoUrl: { control: 'text' },
    pageTitle: { control: 'text' },
    showSearch: { control: 'boolean' },
    showNotifications: { control: 'boolean' },
    showMenu: { control: 'boolean' },
    showShare: { control: 'boolean' },
    notifCount: { control: 'number' },
  },
  decorators: [
    () => ({ template: '<div style="max-width:430px;background:#fff"><story /></div>' }),
  ],
  args: {
    variant: 'home',
    orgName: 'PBA',
    pageTitle: 'All Games',
    showSearch: true,
    showNotifications: true,
    showMenu: true,
    showShare: false,
    notifCount: 0,
  },
}

export default meta
type Story = StoryObj<typeof AppHeader>

/* ═══════════════════════════════════════════
   1. Home Variant — no logo
   ═══════════════════════════════════════════ */
export const Home: Story = {
  name: 'Home Variant — no logo',
  args: { variant: 'home' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click Search button — exercises $emit('search')
    const searchBtn = canvas.getByRole('button', { name: /search/i })
    await expect(searchBtn).toBeVisible()
    await userEvent.click(searchBtn)
    // Click Notifications button — exercises $emit('notifications')
    const notifBtn = canvas.getByRole('button', { name: /notifications/i })
    await userEvent.click(notifBtn)
    // Click Menu (hamburger) button — exercises $emit('menu') (stmt line 37)
    const menuBtn = canvas.getByRole('button', { name: /^menu$/i })
    await userEvent.click(menuBtn)
  },
}

/* ═══════════════════════════════════════════
   2. Home — with logo
   ═══════════════════════════════════════════ */
export const HomeWithLogo: Story = {
  name: 'Home — with logo',
  args: { variant: 'home', logoUrl: 'https://i.pravatar.cc/150?img=5' },
}

/* ═══════════════════════════════════════════
   3. Back Variant
   ═══════════════════════════════════════════ */
export const Back: Story = {
  name: 'Back Variant',
  args: { variant: 'back', pageTitle: 'Tal Weiss' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click back button — exercises BackBar @back → $emit('back')
    const backBtn = canvas.getByRole('button', { name: /go back/i })
    await expect(backBtn).toBeVisible()
    await userEvent.click(backBtn)
  },
}

/* ═══════════════════════════════════════════
   4. Back + Share
   ═══════════════════════════════════════════ */
export const BackWithShare: Story = {
  name: 'Back + Share',
  args: { variant: 'back', pageTitle: 'Highlight', showShare: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click share button — exercises BackBar @share → $emit('share') (stmt line 55)
    const shareBtn = canvas.getByRole('button', { name: /share/i })
    await userEvent.click(shareBtn)
  },
}

/* ═══════════════════════════════════════════
   5. With Notification Badge
   ═══════════════════════════════════════════ */
export const WithBadge: Story = {
  name: 'With Notification Badge',
  args: { notifCount: 5 },
}

/* ═══════════════════════════════════════════
   6. Desktop — with nav tabs + avatar
   ═══════════════════════════════════════════ */
export const Desktop: Story = {
  name: 'Desktop — with nav tabs + avatar',
  decorators: [() => ({ template: '<div style="width:1200px;background:#fff"><story /></div>' })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Nav tabs are inside .ah__nav (display:none below 1024px in tests),
    // so use querySelector to reach them directly in the DOM
    const tabs = canvasElement.querySelectorAll<HTMLElement>('.ant__tab')
    if (tabs.length >= 2) {
      await userEvent.click(tabs[1]) // WNBL — exercises AppNavTabs update:modelValue
    }
    // Avatar btn is display:none below 1024px — use querySelector to reach it
    const avatarBtn = canvasElement.querySelector<HTMLElement>('.ah__avatar-btn')
    if (avatarBtn) await userEvent.click(avatarBtn) // exercises $emit('menu')
  },
  render: () => ({
    components: { AppHeader, AppNavTabs },
    data() {
      return {
        activeTab: 'nbl1',
        tabs: [
          { id: 'nbl1',     label: 'NBL1' },
          { id: 'wnbl',     label: 'WNBL' },
          { id: 'domestic', label: 'Senior Domestic' },
          { id: 'qsl',      label: 'QSL' },
          { id: 'junior',   label: 'Junior Domestic' },
        ],
      }
    },
    template: `
      <AppHeader variant="home" org-name="PBA" user-initials="YL" :show-menu="false">
        <template #nav>
          <AppNavTabs :tabs="tabs" v-model="activeTab" aria-label="Main navigation" />
        </template>
      </AppHeader>
    `,
  }),
}

/* Covers showNotifications v-if false branch */
export const NoNotifications: Story = {
  name: 'No Notifications Button',
  args: { showNotifications: false },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:430px"><story /></div>' })],
  render: () => ({
    components: { AppHeader },
    template: `
      <div style="border:1px solid #444;border-radius:16px;overflow:hidden">
        <p style="font-size:18px;font-weight:700;margin:12px 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <AppHeader variant="home" org-name="PBA" :notif-count="3" />
        <div style="height:8px"></div>
        <AppHeader variant="back" page-title="Tal Weiss" :show-share="true" />
      </div>
    `,
  }),
}

/* Covers w[0] ?? '' — when orgName has leading space, split produces empty first word
   '' [0] = undefined → ?? '' fallback fires (line 104) */
export const OrgNameWithSpace: Story = {
  name: 'orgName with leading space (branch coverage)',
  args: { orgName: ' PBA', variant: 'home' },
}
