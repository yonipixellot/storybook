import type { Meta, StoryObj } from '@storybook/vue3'
import PlayerPage from './PlayerPage.vue'

const meta: Meta<typeof PlayerPage> = {
  title: 'Pages/PlayerPage',
  component: PlayerPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Player Page. Structure: AppHeader → AthleteProfile (BackBar + Hero Card + Career Stats 2×3 grid + My Highlights 3-column grid + Season Stats row) → BottomTabBar.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PlayerPage>

export const Default: Story = {
  args: {
    playerName: 'James Carter',
    playerNumber: 1,
    playerPosition: 'Forward',
    teamName: 'S.D Spartans',
    accentColor: '#E8332B',
  },
}

export const DifferentPlayer: Story = {
  name: 'Different Player',
  args: {
    playerName: 'Tal Weiss',
    playerNumber: 4,
    playerPosition: 'Guard',
    teamName: 'S.D Spartans',
    accentColor: '#E8332B',
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A"><story /></div>' })],
  args: {
    playerName: 'James Carter',
    playerNumber: 1,
    playerPosition: 'Forward',
    teamName: 'S.D Spartans',
    accentColor: '#E8332B',
  },
}
