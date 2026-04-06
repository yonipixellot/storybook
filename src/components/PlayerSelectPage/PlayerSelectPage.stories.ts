import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PlayerSelectPage from './PlayerSelectPage.vue'

const meta: Meta<typeof PlayerSelectPage> = {
  title: 'Pages/PlayerSelectPage',
  component: PlayerSelectPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Onboarding screen for selecting player jerseys to follow. Standalone page (no AppShell — owns its own header/footer). ' +
          'At desktop: constrained to 640px centered. Features jersey grid, "See All" expand, and sticky Continue footer.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PlayerSelectPage>

/* ═══════════════════════════════════════════
   1. Mobile (default)
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Mobile',
  parameters: { viewport: { defaultViewport: 'mobile390' } },
  args: {
    title: 'Select the players you want to follow',
    description: "To personalize your experience, choose the player's jersey number you want to follow.",
    teamName: 'Maccabi Kiryat Gat',
    jerseys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    defaultSelected: [],
    showSeeAll: true,
  },
}

/* ═══════════════════════════════════════════
   2. Desktop
   ═══════════════════════════════════════════ */
export const Desktop: Story = {
  name: 'Desktop',
  parameters: { viewport: { defaultViewport: 'desktop1440' } },
  args: {
    title: 'Select the players you want to follow',
    description: "To personalize your experience, choose the player's jersey number you want to follow.",
    teamName: 'Maccabi Kiryat Gat',
    jerseys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    defaultSelected: [],
    showSeeAll: true,
  },
}

/* ═══════════════════════════════════════════
   3. With Preselected
   ═══════════════════════════════════════════ */
export const WithPreselected: Story = {
  name: 'With Preselected',
  parameters: { viewport: { defaultViewport: 'mobile390' } },
  args: {
    title: 'Select the players you want to follow',
    description: "To personalize your experience, choose the player's jersey number you want to follow.",
    teamName: 'Maccabi Kiryat Gat',
    jerseys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    defaultSelected: [5, 10, 23],
    showSeeAll: true,
  },
}

/* ═══════════════════════════════════════════
   4. With Jersey Colors
   ═══════════════════════════════════════════ */
export const WithColors: Story = {
  name: 'With Jersey Colors',
  parameters: { viewport: { defaultViewport: 'mobile390' } },
  args: {
    title: 'Select the players you want to follow',
    description: "To personalize your experience, choose the player's jersey number you want to follow.",
    teamName: 'Hapoel Tel Aviv',
    jerseys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    jerseyColors: {
      1: '#E8332B', 2: '#E8332B', 3: '#E8332B',
      4: '#1A3B8A', 5: '#1A3B8A', 6: '#1A3B8A',
      7: '#FFFFFF', 8: '#FFFFFF', 9: '#000000',
      10: '#E8332B', 11: '#1A3B8A', 12: '#22C55E',
    },
    defaultSelected: [1, 5],
    showSeeAll: true,
  },
}

/* ═══════════════════════════════════════════
   5. Dark Mode
   ═══════════════════════════════════════════ */
export const DarkMode: Story = {
  name: 'Dark Mode',
  parameters: { viewport: { defaultViewport: 'desktop1440' } },
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A"><story /></div>' })],
  args: {
    title: 'Select the players you want to follow',
    description: "To personalize your experience, choose the player's jersey number you want to follow.",
    teamName: 'Maccabi Kiryat Gat',
    jerseys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    defaultSelected: [5],
    showSeeAll: true,
  },
}
