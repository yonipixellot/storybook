import type { Meta, StoryObj } from '@storybook/vue3'
import GameDetailPage from './GameDetailPage.vue'

const meta: Meta<typeof GameDetailPage> = {
  title: 'Pages/GameDetailPage',
  component: GameDetailPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full game detail page. Structure: AppHeader → BackBar → ScoreCard → VideoTypeChips → Video sections (Full / Condensed / Highlights / Personal) → Team tabs → PlayerStats table → TeamStatsBar → GameLeaders → BottomTabBar.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof GameDetailPage>

export const Default: Story = {
  args: {
    homeTeam: { name: 'Maccabi KG',     score: 89, isWinner: true  },
    awayTeam: { name: 'Ironi Nahariya', score: 77, isWinner: false },
    gameDate: 'Mar 12, 2026',
  },
}

export const CloseGame: Story = {
  args: {
    homeTeam: { name: 'Hapoel TA',    score: 82, isWinner: false },
    awayTeam: { name: 'Maccabi Haifa', score: 84, isWinner: true  },
    gameDate: 'Mar 8, 2026',
  },
}
