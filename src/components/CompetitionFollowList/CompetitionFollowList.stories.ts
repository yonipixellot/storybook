import type { Meta, StoryObj } from '@storybook/vue3'
import CompetitionFollowList from './CompetitionFollowList.vue'

const meta: Meta<typeof CompetitionFollowList> = {
  title: 'Layout & Overlays/CompetitionFollowList',
  component: CompetitionFollowList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Onboarding flow component. Collapsible competition/league list — click a league to expand its 3-column team grid and follow/unfollow teams. Continue button shows total follow count.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CompetitionFollowList>

export const Default: Story = {
  name: 'Default (5 competitions)',
  args: {},
}

export const PreExpanded: Story = {
  name: 'Custom Competitions',
  args: {
    competitions: [
      {
        name: 'Premier League', teamCount: 8,
        teams: [
          { name: 'S.D Spartans Men',  followed: true  },
          { name: 'Ironi Nahariya',    followed: false },
          { name: 'Hapoel Tel Aviv',   followed: false },
        ],
      },
      {
        name: 'Championship', teamCount: 6,
        teams: [
          { name: 'Valley Vista Cougars', followed: false },
          { name: 'Oakwood Eagles',       followed: false },
        ],
      },
    ],
  },
}
