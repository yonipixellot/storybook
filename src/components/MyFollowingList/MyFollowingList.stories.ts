import type { Meta, StoryObj } from '@storybook/vue3'
import MyFollowingList from './MyFollowingList.vue'

const meta: Meta<typeof MyFollowingList> = {
  title: 'Layout & Overlays/MyFollowingList',
  component: MyFollowingList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Manage Following page: shows followed teams and players with Unfollow buttons and "+ Add" controls. Teams show logo + name + division. Players show jersey number circle + name.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof MyFollowingList>

export const Default: Story = {
  name: 'Default',
  args: {},
}

export const MultipleFollowing: Story = {
  name: 'Multiple Teams & Players',
  args: {
    teams: [
      { name: 'Riverside Mustangs',    division: 'PBA Varsity Division' },
      { name: 'Valley Vista Cougars',  division: 'PBA Regional Division' },
    ],
    players: [
      { name: 'Marcus Caldwell', number: 1,  teamColor: '#1e3a5f' },
      { name: 'Jayden Smith',    number: 11, teamColor: '#1e3a5f' },
    ],
  },
}

export const EmptyState: Story = {
  name: 'Empty (no follows)',
  args: {
    teams:   [],
    players: [],
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A"><story /></div>' })],
  render: () => ({
    components: { MyFollowingList },
    template: `
      <MyFollowingList
        :teams="[
          { name: 'Riverside Mustangs', division: 'PBA Varsity Division' },
          { name: 'Valley Vista Cougars', division: 'PBA Regional Division' },
        ]"
        :players="[
          { name: 'Marcus Caldwell', number: 1, teamColor: '#1e3a5f' },
          { name: 'Jayden Smith', number: 11, teamColor: '#1e3a5f' },
        ]"
      />
    `,
  }),
}
