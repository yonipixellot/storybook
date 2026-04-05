import type { Meta, StoryObj } from '@storybook/vue3'
import HomePage from './HomePage.vue'

const meta: Meta<typeof HomePage> = {
  title: 'Pages/HomePage',
  component: HomePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main home feed page (Games tab). Structure: AppHeader → Team/Player avatar strip → Hero Banner (Watch Now CTA) → Live games (horizontal scroll) → Recent Games list → Upcoming fixtures → Footer → BottomTabBar.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof HomePage>

export const Default: Story = {
  name: 'Default',
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A"><story /></div>' })],
}
