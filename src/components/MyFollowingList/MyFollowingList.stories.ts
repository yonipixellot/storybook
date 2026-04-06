import type { Meta, StoryObj } from '@storybook/vue3'
import { userEvent, within } from 'storybook/test'
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click "Add team" → $emit('addTeam') (stmt line 7)
    const addTeamBtn = canvas.getByRole('button', { name: /add team/i })
    await userEvent.click(addTeamBtn)
    // Click "Add player" → $emit('addPlayer') (stmt line 35)
    const addPlayerBtn = canvas.getByRole('button', { name: /add player/i })
    await userEvent.click(addPlayerBtn)
    // Query all unfollow buttons: [team0, team1, player0, player1]
    const unfollowBtns = canvasElement.querySelectorAll<HTMLElement>('.mfl__unfollow-btn')
    // Click team unfollow → removeTeam() (stmt lines 26, 104)
    if (unfollowBtns.length > 0) await userEvent.click(unfollowBtns[0])
    // Click player unfollow → removePlayer() (stmt lines 53, 105)
    // With 2 teams + 2 players: index 2 is the first player unfollow
    if (unfollowBtns.length > 2) await userEvent.click(unfollowBtns[2])
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
