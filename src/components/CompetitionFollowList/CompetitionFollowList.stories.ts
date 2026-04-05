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

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:430px"><story /></div>' })],
  render: () => ({
    components: { CompetitionFollowList },
    template: `
      <div style="border:1px solid #444;border-radius:16px;overflow:hidden">
        <p style="font-size:18px;font-weight:700;margin:12px 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <CompetitionFollowList />
      </div>
    `,
  }),
}
