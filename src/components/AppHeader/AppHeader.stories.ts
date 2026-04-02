import type { Meta, StoryObj } from '@storybook/vue3'
import AppHeader from './AppHeader.vue'

const meta: Meta<typeof AppHeader> = {
  title: 'Layout & Overlays/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
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
