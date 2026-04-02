import type { Meta, StoryObj } from '@storybook/vue3'
import PlayerSelectPage from './PlayerSelectPage.vue'

const meta: Meta<typeof PlayerSelectPage> = {
  title: 'Pages/PlayerSelectPage',
  component: PlayerSelectPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full onboarding page for selecting player jerseys to follow. Features a jersey grid, "See All" expand, and sticky Continue footer.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PlayerSelectPage>

export const Default: Story = {
  args: {
    title: 'Select the players you want to follow',
    description: "To personalize your experience, choose the player's jersey number you want to follow.",
    teamName: 'Maccabi Kiryat Gat',
    jerseys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    defaultSelected: [],
    showSeeAll: true,
  },
}

export const WithPreselected: Story = {
  args: {
    ...Default.args,
    defaultSelected: [5, 10, 23],
  },
}

export const WithColors: Story = {
  args: {
    ...Default.args,
    teamName: 'Hapoel Tel Aviv',
    jerseyColors: {
      1: '#E8332B', 2: '#E8332B', 3: '#E8332B',
      4: '#1A3B8A', 5: '#1A3B8A', 6: '#1A3B8A',
      7: '#FFFFFF', 8: '#FFFFFF', 9: '#000000',
      10: '#E8332B', 11: '#1A3B8A', 12: '#22C55E',
    },
    defaultSelected: [1, 5],
  },
}
