import type { Meta, StoryObj } from '@storybook/vue3'
import GameDetailPage from './GameDetailPage.vue'

const meta: Meta<typeof GameDetailPage> = {
  title: 'Pages/GameDetailPage',
  component: GameDetailPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full game detail page. Structure: AppHeader → BackBar → ScoreCard → VideoTypeChips → Full Game video → Game Highlights (horizontal) → Player Highlights (team tabs + Followed/Other Players) → Team Stats (paywalled) → Player Stats (paywalled) → Game Leaders → BottomTabBar.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof GameDetailPage>

export const Default: Story = {
  args: {
    homeTeam: { name: 'S.D Spartans',  score: 121, isWinner: true  },
    awayTeam: { name: 'Logan Thunder', score: 89,  isWinner: false },
    gameDate: 'Feb 11, 2025',
  },
}

export const CloseGame: Story = {
  args: {
    homeTeam: { name: 'Peterhead',   score: 88, isWinner: false },
    awayTeam: { name: 'Queens Park', score: 91, isWinner: true  },
    gameDate: 'Nov 25, 2024',
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A"><story /></div>' })],
  args: {
    homeTeam: { name: 'S.D Spartans',  score: 121, isWinner: true  },
    awayTeam: { name: 'Logan Thunder', score: 89,  isWinner: false },
    gameDate: 'Feb 11, 2025',
  },
}
