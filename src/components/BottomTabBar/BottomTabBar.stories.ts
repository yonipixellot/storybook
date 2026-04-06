import type { Meta, StoryObj } from '@storybook/vue3'
import BottomTabBar from './BottomTabBar.vue'

const meta: Meta<typeof BottomTabBar> = {
  title: 'Layout & Overlays/BottomTabBar',
  component: BottomTabBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Fixed bottom navigation with icon + label tabs for the primary app sections (Games, Saved, Following, Shop). Supports custom accent color and fully custom tab configuration.',
      },
    },
  },
  argTypes: {
    active:      { control: 'select', options: ['games', 'saved', 'following', 'shop'], description: 'ID of the currently active tab' },
    accentColor: { control: 'color',  description: 'Override accent color for the active tab icon & label (defaults to --color-primary)' },
    tabs:        { control: 'object', description: 'Fully custom tab array — each item: { id: string, label: string, icon: string }' },
  },
  decorators: [
    () => ({ template: '<div style="max-width:430px;background:#fff"><story /></div>' }),
  ],
  args: {
    active: 'games',
    accentColor: undefined,
  },
}

export default meta
type Story = StoryObj<typeof BottomTabBar>

/* ═══════════════════════════════════════════
   1. Interactive — click to switch tabs
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Interactive — click to switch tabs',
  args: {},
}

/* ═══════════════════════════════════════════
   2. Games tab active
   ═══════════════════════════════════════════ */
export const GamesActive: Story = {
  name: 'Games tab active',
  args: { active: 'games' },
}

/* ═══════════════════════════════════════════
   3. Saved tab active
   ═══════════════════════════════════════════ */
export const SavedActive: Story = {
  name: 'Saved tab active',
  args: { active: 'saved' },
}

/* ═══════════════════════════════════════════
   4. Custom accent color
   ═══════════════════════════════════════════ */
export const CustomAccent: Story = {
  name: 'Custom accent color',
  args: { accentColor: '#D0142C', active: 'following' },
}

/* ═══════════════════════════════════════════
   5. Shop tab active — covers shop SVG active-state branches
   ═══════════════════════════════════════════ */
export const ShopActive: Story = {
  name: 'Shop tab active',
  args: { active: 'shop' },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:430px"><story /></div>' })],
  render: () => ({
    components: { BottomTabBar },
    template: `
      <div style="border:1px solid #444;border-radius:16px;overflow:hidden">
        <p style="font-size:18px;font-weight:700;margin:12px 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <BottomTabBar active="following" />
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   Desktop — hidden at ≥1024px
   ═══════════════════════════════════════════ */
export const DesktopHidden: Story = {
  name: 'Desktop — hidden at ≥1024px',
  decorators: [() => ({ template: '<div style="width:1200px;background:#fff;padding:24px;"><story /></div>' })],
  render: () => ({
    components: { BottomTabBar },
    template: `
      <div>
        <p style="font-size:13px;color:#979797;margin:0 0 12px;font-family:Red Hat Display,sans-serif">
          At ≥1024px the BottomTabBar is hidden (display:none). Resize the viewport to mobile to see it.
        </p>
        <BottomTabBar active="games" />
      </div>
    `,
  }),
}
