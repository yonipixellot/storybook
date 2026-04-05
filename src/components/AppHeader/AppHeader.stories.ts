import type { Meta, StoryObj } from '@storybook/vue3'
import AppHeader from './AppHeader.vue'

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
}

/* ═══════════════════════════════════════════
   4. Back + Share
   ═══════════════════════════════════════════ */
export const BackWithShare: Story = {
  name: 'Back + Share',
  args: { variant: 'back', pageTitle: 'Highlight', showShare: true },
}

/* ═══════════════════════════════════════════
   5. With Notification Badge
   ═══════════════════════════════════════════ */
export const WithBadge: Story = {
  name: 'With Notification Badge',
  args: { notifCount: 5 },
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
