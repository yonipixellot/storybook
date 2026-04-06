import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { userEvent } from 'storybook/test'
import GameDetailPage from './GameDetailPage.vue'
import AppShell from '../AppShell/AppShell.vue'

const meta: Meta<typeof GameDetailPage> = {
  title: 'Pages/GameDetailPage',
  component: GameDetailPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full game detail page. Content only — wrap in AppShell (variant="back") to get the header. ' +
          'Sections: BackBar → ScoreCard → VideoTypeChips → Full Game → Game Highlights (4-col scroll at desktop) → Player Highlights → Team/Player Stats (paywalled) → More Games (3-col grid at desktop).',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof GameDetailPage>

/* ═══════════════════════════════════════════
   1. Mobile (default)
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Mobile',
  parameters: { viewport: { defaultViewport: 'mobile390' } },
  render: () => ({
    components: { AppShell, GameDetailPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="Game Detail">
        <GameDetailPage />
      </AppShell>
    `,
  }),
  play: async ({ canvasElement }) => {
    // Click a VideoTypeChips tab → triggers v-model update handler (stmt line 19)
    const chips = canvasElement.querySelectorAll<HTMLElement>('[role="tab"]')
    if (chips.length > 1) await userEvent.click(chips[1]) // Full Game → Game Highlights
    // Click away team tab → activeTeamTab = 'away' (stmt line 92)
    const awayTab = canvasElement.querySelector<HTMLElement>('.game-detail__team-tab:last-of-type')
    if (awayTab) await userEvent.click(awayTab)
    // Click home team tab → activeTeamTab = 'home' (stmt line 87)
    const homeTab = canvasElement.querySelector<HTMLElement>('.game-detail__team-tab')
    if (homeTab) await userEvent.click(homeTab)
  },
}

/* ═══════════════════════════════════════════
   2. Desktop
   ═══════════════════════════════════════════ */
export const Desktop: Story = {
  name: 'Desktop',
  parameters: { viewport: { defaultViewport: 'desktop1440' } },
  render: () => ({
    components: { AppShell, GameDetailPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="Game Detail">
        <GameDetailPage />
      </AppShell>
    `,
  }),
}

/* ═══════════════════════════════════════════
   3. Close Game score variant
   ═══════════════════════════════════════════ */
export const CloseGame: Story = {
  name: 'Close Game',
  parameters: { viewport: { defaultViewport: 'mobile390' } },
  render: () => ({
    components: { AppShell, GameDetailPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="Game Detail">
        <GameDetailPage
          :home-team="{ name: 'Peterhead',   score: 88, isWinner: false, standing: '4th' }"
          :away-team="{ name: 'Queens Park', score: 91, isWinner: true,  standing: '2nd' }"
          game-date="Nov 25, 2024"
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
    components: { AppShell, GameDetailPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="Game Detail">
        <GameDetailPage />
      </AppShell>
    `,
  }),
}
