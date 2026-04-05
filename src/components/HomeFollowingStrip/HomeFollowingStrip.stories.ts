import type { Meta, StoryObj } from '@storybook/vue3'
import HomeFollowingStrip from './HomeFollowingStrip.vue'

const meta: Meta<typeof HomeFollowingStrip> = {
  title: 'Layout & Overlays/HomeFollowingStrip',
  component: HomeFollowingStrip,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Horizontal scrollable strip at the top of the Home page. Mixes followed teams (logo circle) and players (claimed=photo, unclaimed=jersey number circle). Tap navigates to TeamPage or PlayerProfile.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof HomeFollowingStrip>

export const Default: Story = {
  name: 'Mixed (2 teams + 3 players)',
  args: {},
}

export const TeamsOnly: Story = {
  name: 'Teams Only',
  args: {
    items: [
      { type: 'team', name: 'S.D. Spartans Men' },
      { type: 'team', name: 'S.D. Spartans Women' },
      { type: 'team', name: 'Riverside Mustangs' },
      { type: 'team', name: 'Oakwood Eagles' },
    ],
  },
}

export const PlayersOnly: Story = {
  name: 'Players Only',
  args: {
    items: [
      { type: 'player', number: 7,  teamColor: '#D0142C', claimed: true  },
      { type: 'player', number: 3,  teamColor: '#D0142C', claimed: false },
      { type: 'player', number: 11, teamColor: '#0052CC', claimed: false },
      { type: 'player', number: 23, teamColor: '#1A6B3C', claimed: false },
    ],
  },
}

export const WithPhotos: Story = {
  name: 'With Team Logos & Player Photos',
  args: {
    items: [
      { type: 'team',   name: 'PBA',  logoUrl: 'https://placehold.co/56x56/116DFF/FFFFFF?text=PBA' },
      { type: 'player', number: 7,  teamColor: '#D0142C', claimed: true,
        photoUrl: 'https://placehold.co/56x56/D0142C/FFFFFF?text=7' },
      { type: 'player', number: 11, teamColor: '#0052CC', claimed: false },
    ],
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { HomeFollowingStrip },
    template: `
      <div style="border:1px solid #444;border-radius:16px;overflow:hidden">
        <p style="font-size:18px;font-weight:700;margin:12px 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <HomeFollowingStrip />
      </div>
    `,
  }),
}
