import type { Meta, StoryObj } from '@storybook/vue3'
import ScoreCard from './ScoreCard.vue'

const meta: Meta<typeof ScoreCard> = {
  title: 'Cards/ScoreCard',
  component: ScoreCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Compact score display tile with two team rows (name + standing), head-to-head scores, and a status line (Final / Live / Halftime / period + time).',
      },
    },
  },
  decorators: [() => ({ template: '<div style="padding:20px;max-width:438px"><story /></div>' })],
  argTypes: {
    homeTeam: { control: 'object', description: 'Home team — { name, score, standing? }' },
    awayTeam: { control: 'object', description: 'Away team — { name, score, standing? }' },
    status:   { control: 'text', description: 'Game status label — "Final", "Halftime", "Q3 04:12", etc.' },
    date:     { control: 'text', description: 'Date string shown below status, e.g. "20 NOV 2024"' },
  },
}

export default meta
type Story = StoryObj<typeof ScoreCard>

const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ── Default ── */

export const Default: Story = {
  args: {
    homeTeam: { name: 'Maccabi KG',     score: 89, standing: '1st' },
    awayTeam: { name: 'Ironi Nahariya', score: 77, standing: '5th' },
    status: 'Final',
    date: '20 NOV 2024',
  },
}

export const LiveGame: Story = {
  args: {
    homeTeam: { name: 'Hapoel TA',    score: 62, standing: '2nd' },
    awayTeam: { name: 'Bnei Herzliya', score: 55, standing: '7th' },
    status: 'Q3 04:12',
    date: 'Live',
  },
}

export const Halftime: Story = {
  args: {
    homeTeam: { name: 'Maccabi Haifa', score: 44, standing: '3rd' },
    awayTeam: { name: 'Hapoel Holon',  score: 41, standing: '4th' },
    status: 'Halftime',
    date: '28 FEB 2026',
  },
}

export const CloseGame: Story = {
  args: {
    homeTeam: { name: 'Ironi Nes Z.', score: 81, standing: '6th' },
    awayTeam: { name: 'Maccabi KG',   score: 83, standing: '1st' },
    status: 'Final',
    date: '5 MAR 2026',
  },
}

// No standings — exercises v-if="homeTeam.standing" and v-if="awayTeam.standing" false branches
export const NoStandings: Story = {
  name: 'No Standings',
  args: {
    homeTeam: { name: 'Team A', score: 72 },
    awayTeam: { name: 'Team B', score: 68 },
    status: 'Final',
    date: '1 APR 2026',
  },
}

export const DarkMode: Story = {
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:438px"><story /></div>' })],
  render: () => ({
    components: { ScoreCard },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <p style="font-size:13px;color:#888;margin:0 0 16px;font-family:Red Hat Display,sans-serif">Card bg #333, logo bg #1A1A1A, scores white/gray</p>
        <hr style="border:none;border-top:1px solid #444;margin:0 0 24px" />
        <div style="display:flex;flex-direction:column;gap:16px">
          <ScoreCard
            :homeTeam="{ name: 'Maccabi KG', score: 89, standing: '1st' }"
            :awayTeam="{ name: 'Ironi Nahariya', score: 77, standing: '5th' }"
            status="Final"
            date="20 NOV 2024"
          />
          <ScoreCard
            :homeTeam="{ name: 'Hapoel TA', score: 62, standing: '2nd' }"
            :awayTeam="{ name: 'Bnei Herzliya', score: 55, standing: '7th' }"
            status="Q3 04:12"
            date="Live"
          />
        </div>
      </div>
    `,
  }),
}
