import type { Meta, StoryObj } from '@storybook/vue3'
import VideoPlayerPage from './VideoPlayerPage.vue'

const meta: Meta<typeof VideoPlayerPage> = {
  title: 'Pages/VideoPlayerPage',
  component: VideoPlayerPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Video Player Page. Structure: AppHeader → BackBar → Video Player → Video Title + VideoActionBar → ScoreCard + Box Score (PlayerStats with Q1-Q4 columns) → Player Highlights (team tabs + Followed/Other) → BottomTabBar.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof VideoPlayerPage>

export const Default: Story = {
  args: {
    homeTeam: { name: 'S.D Spartans', score: 121, standing: '(5-4)' },
    awayTeam: { name: 'Logan Thunder', score: 89, standing: '(5-6)' },
    gameDate: 'Mar 14, 2025',
    videoTitle: 'Full Game',
    videoDuration: '01:55:30',
    videoViews: '1.2K views',
  },
}

export const HighlightClip: Story = {
  name: 'Highlight Clip',
  args: {
    homeTeam: { name: 'S.D Spartans', score: 121, standing: '(5-4)' },
    awayTeam: { name: 'Logan Thunder', score: 89, standing: '(5-6)' },
    gameDate: 'Mar 14, 2025',
    videoTitle: 'Game Recap',
    videoDuration: '01:30',
    videoViews: '856 views',
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A"><story /></div>' })],
  args: {
    homeTeam: { name: 'S.D Spartans', score: 121, standing: '(5-4)' },
    awayTeam: { name: 'Logan Thunder', score: 89, standing: '(5-6)' },
    gameDate: 'Mar 14, 2025',
    videoTitle: 'Full Game',
    videoDuration: '01:55:30',
    videoViews: '1.2K views',
  },
}
