import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { userEvent, within } from 'storybook/test'
import VideoPlayerPage from './VideoPlayerPage.vue'
import AppShell from '../AppShell/AppShell.vue'

const meta: Meta<typeof VideoPlayerPage> = {
  title: 'Pages/VideoPlayerPage',
  component: VideoPlayerPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Video player page. Content only — wrap in AppShell (variant="back") for the sticky header. ' +
          'Sections: Video player (16:9) → Title + VideoActionBar → ScoreCard + Box Score → Player Highlights (Followed/Other, 4-col scroll at desktop).',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof VideoPlayerPage>

/* ═══════════════════════════════════════════
   1. Mobile
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Mobile',
  parameters: { viewport: { defaultViewport: 'mobile390' } },
  render: () => ({
    components: { AppShell, VideoPlayerPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="Full Game">
        <VideoPlayerPage />
      </AppShell>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click "Logan Thunder" tab — exercises activeTeamTab = 'away' (both team-tab branches)
    const awayTab = canvas.getByRole('button', { name: /logan thunder/i })
    await userEvent.click(awayTab)
    // Click home tab back — exercises activeTeamTab = 'home'
    const homeTab = canvas.getByRole('button', { name: /s\.d spartans/i })
    await userEvent.click(homeTab)
  },
}

/* ═══════════════════════════════════════════
   2. Desktop
   ═══════════════════════════════════════════ */
export const Desktop: Story = {
  name: 'Desktop',
  parameters: { viewport: { defaultViewport: 'desktop1440' } },
  render: () => ({
    components: { AppShell, VideoPlayerPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="Full Game">
        <VideoPlayerPage />
      </AppShell>
    `,
  }),
}

/* ═══════════════════════════════════════════
   3. Highlight Clip
   ═══════════════════════════════════════════ */
export const HighlightClip: Story = {
  name: 'Highlight Clip',
  parameters: { viewport: { defaultViewport: 'mobile390' } },
  render: () => ({
    components: { AppShell, VideoPlayerPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="Game Recap">
        <VideoPlayerPage
          video-title="Game Recap"
          video-duration="01:30"
          video-views="856 views"
        />
      </AppShell>
    `,
  }),
}

/* ═══════════════════════════════════════════
   4. Dark Mode
   ═══════════════════════════════════════════ */
export const DarkMode: Story = {
  name: 'Dark Mode',
  parameters: { viewport: { defaultViewport: 'desktop1440' } },
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A"><story /></div>' })],
  render: () => ({
    components: { AppShell, VideoPlayerPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="Full Game">
        <VideoPlayerPage />
      </AppShell>
    `,
  }),
}
