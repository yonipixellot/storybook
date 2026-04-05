import type { Meta, StoryObj } from '@storybook/vue3'
import PlayerNumberBadge from './PlayerNumberBadge.vue'

const meta: Meta<typeof PlayerNumberBadge> = {
  title: 'Avatars & List Items/PlayerNumberBadge',
  component: PlayerNumberBadge,
  tags: ['autodocs'],
  argTypes: {
    number:    { control: 'number', description: 'Jersey number to display' },
    size:      { control: { type: 'range', min: 24, max: 80 }, description: 'Circle diameter in px' },
    teamColor: { control: 'color', description: 'Team brand color (hex). Defaults to --color-primary if omitted' },
    photoUrl:  { control: 'text', description: 'Player photo URL — renders photo instead of number badge' },
  },
  args: { number: 1, size: 40 },
  decorators: [
    () => ({ template: '<div style="padding:20px;background:#fff"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof PlayerNumberBadge>

export const Default: Story = {
  name: 'Default — Primary color',
  args: {},
}

export const TeamColors: Story = {
  name: 'Custom Team Colors',
  render: () => ({
    components: { PlayerNumberBadge },
    template: `
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
        <div v-for="item in players" :key="item.number" style="display:flex;flex-direction:column;align-items:center;gap:4px">
          <PlayerNumberBadge :number="item.number" :team-color="item.color" />
          <span style="font-family:Red Hat Display,sans-serif;font-size:11px;color:#979797">{{ item.color }}</span>
        </div>
      </div>
    `,
    data() {
      return {
        players: [
          { number: 1,  color: '#D0142C' },
          { number: 23, color: '#116DFF' },
          { number: 7,  color: '#22C55E' },
          { number: 11, color: '#E7A610' },
          { number: 5,  color: '#8B5CF6' },
          { number: 14, color: '#FFE000' }, // light color → dark text
        ],
      }
    },
  }),
}

export const WithPhoto: Story = {
  name: 'With Photo URL',
  args: {
    number:   22,
    photoUrl: 'https://i.pravatar.cc/150?img=7',
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { PlayerNumberBadge },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <div style="display:flex;gap:12px;align-items:center">
          <PlayerNumberBadge :number="1" />
          <PlayerNumberBadge :number="23" team-color="#D0142C" />
          <PlayerNumberBadge :number="7" team-color="#22C55E" />
          <PlayerNumberBadge :number="14" team-color="#FFE000" />
          <PlayerNumberBadge :number="22" photoUrl="https://i.pravatar.cc/150?img=7" />
        </div>
      </div>
    `,
  }),
}
