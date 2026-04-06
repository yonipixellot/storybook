import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PlayerPage from './PlayerPage.vue'
import AppShell from '../AppShell/AppShell.vue'

const meta: Meta<typeof PlayerPage> = {
  title: 'Pages/PlayerPage',
  component: PlayerPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Player profile page. Content only — wrap in AppShell (variant="back") for the sticky header. ' +
          'Contains AthleteProfile: BackBar + Hero Card + Career Stats (2×3 grid) + My Highlights (3-col grid) + Season Stats.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PlayerPage>

/* ═══════════════════════════════════════════
   1. Mobile (default)
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Mobile',
  parameters: { viewport: { defaultViewport: 'mobile390' } },
  render: () => ({
    components: { AppShell, PlayerPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="Player Profile">
        <PlayerPage player-name="James Carter" :player-number="1" player-position="Forward" team-name="S.D Spartans" accent-color="#E8332B" />
      </AppShell>
    `,
  }),
}

/* ═══════════════════════════════════════════
   2. Desktop
   ═══════════════════════════════════════════ */
export const Desktop: Story = {
  name: 'Desktop',
  parameters: { viewport: { defaultViewport: 'desktop1440' } },
  render: () => ({
    components: { AppShell, PlayerPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="Player Profile">
        <PlayerPage player-name="James Carter" :player-number="1" player-position="Forward" team-name="S.D Spartans" accent-color="#E8332B" />
      </AppShell>
    `,
  }),
}

/* ═══════════════════════════════════════════
   3. Different Player
   ═══════════════════════════════════════════ */
export const DifferentPlayer: Story = {
  name: 'Different Player',
  parameters: { viewport: { defaultViewport: 'mobile390' } },
  render: () => ({
    components: { AppShell, PlayerPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="Player Profile">
        <PlayerPage player-name="Tal Weiss" :player-number="4" player-position="Guard" team-name="S.D Spartans" accent-color="#E8332B" />
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
    components: { AppShell, PlayerPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="Player Profile">
        <PlayerPage player-name="James Carter" :player-number="1" player-position="Forward" team-name="S.D Spartans" accent-color="#E8332B" />
      </AppShell>
    `,
  }),
}
