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
