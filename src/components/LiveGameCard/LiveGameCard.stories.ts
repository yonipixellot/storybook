import type { Meta, StoryObj } from '@storybook/vue3'
import LiveGameCard from './LiveGameCard.vue'

const meta: Meta<typeof LiveGameCard> = {
  title: 'Cards/LiveGameCard',
  component: LiveGameCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Live-game score card with a LIVE badge, current period/time, team logo initials with tinted backgrounds, scores, and optional league label.',
      },
    },
  },
  decorators: [() => ({ template: '<div style="max-width:500px;padding:20px"><story /></div>' })],
  argTypes: {
    homeTeam:  { control: 'object',  description: 'Home team — { name, score, logoUrl? }' },
    awayTeam:  { control: 'object',  description: 'Away team — { name, score, logoUrl? }' },
    date:      { control: 'text',    description: 'Formatted date/time string, e.g. "21 NOV, 2024"' },
    league:    { control: 'text',    description: 'League name — shown below the score row (optional)' },
    clickable: { control: 'boolean', description: 'Shows pointer cursor — indicates the card is tappable (default: true)' },
  },
}

export default meta
type Story = StoryObj<typeof LiveGameCard>

const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ── Default ── */

export const Default: Story = {
  render: () => ({
    components: { LiveGameCard },
    template: `
      <div style="${box}">
        <p style="${title}">LiveGameCard</p>
        <p style="${label}">Horizontal card showing live game with live badge, date, teams, and scores</p>
        <hr style="${hr}" />
        <LiveGameCard
          :homeTeam="{ name: 'M. Kiryat Gat', score: 87 }"
          :awayTeam="{ name: 'H. Haifa', score: 79 }"
          date="21 NOV, 2024"
          league="Liga Leumit (Winner League)"
        />
      </div>
    `,
  }),
}

/* ── Close Game ── */

export const CloseGame: Story = {
  render: () => ({
    components: { LiveGameCard },
    template: `
      <div style="${box}">
        <p style="${title}">Close Game</p>
        <p style="${label}">When scores are close, both teams appear equally weighted</p>
        <hr style="${hr}" />
        <LiveGameCard
          :homeTeam="{ name: 'Maccabi Tel Aviv', score: 72 }"
          :awayTeam="{ name: 'Hapoel Jerusalem', score: 70 }"
          date="15 DEC, 2024"
          league="Israeli Premier League"
        />
      </div>
    `,
  }),
}

/* ── Without League ── */

export const WithoutLeague: Story = {
  render: () => ({
    components: { LiveGameCard },
    template: `
      <div style="${box}">
        <p style="${title}">Without League</p>
        <p style="${label}">League line is optional</p>
        <hr style="${hr}" />
        <LiveGameCard
          :homeTeam="{ name: 'Team Alpha', score: 3 }"
          :awayTeam="{ name: 'Team Beta', score: 1 }"
          date="30 MAR, 2026"
        />
      </div>
    `,
  }),
}

/* ── Dark Mode ── */

export const DarkMode: Story = {
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:500px"><story /></div>' })],
  render: () => ({
    components: { LiveGameCard },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px;margin-bottom:24px">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <p style="font-size:13px;color:#888;margin:0 0 16px;font-family:Red Hat Display,sans-serif">Header #444, body #333, leading=white, trailing=gray-500</p>
        <hr style="border:none;border-top:1px solid #444;margin:0 0 24px" />
        <LiveGameCard
          :homeTeam="{ name: 'M. Kiryat Gat', score: 87 }"
          :awayTeam="{ name: 'H. Haifa', score: 79 }"
          date="21 NOV, 2024"
          league="Liga Leumit (Winner League)"
        />
      </div>
    `,
  }),
}

/* ── Multiple Cards ── */

export const MultipleCards: Story = {
  render: () => ({
    components: { LiveGameCard },
    template: `
      <div style="${box}">
        <p style="${title}">Multiple Live Games</p>
        <p style="${label}">Cards stack vertically in a feed layout</p>
        <hr style="${hr}" />
        <div style="display:flex;flex-direction:column;gap:16px">
          <LiveGameCard
            :homeTeam="{ name: 'M. Kiryat Gat', score: 87 }"
            :awayTeam="{ name: 'H. Haifa', score: 79 }"
            date="21 NOV, 2024"
            league="Liga Leumit (Winner League)"
          />
          <LiveGameCard
            :homeTeam="{ name: 'Maccabi Tel Aviv', score: 45 }"
            :awayTeam="{ name: 'Hapoel Beer Sheva', score: 38 }"
            date="21 NOV, 2024"
            league="Israeli Premier League"
          />
        </div>
      </div>
    `,
  }),
}

/* ── Non-Clickable: covers cursor:'default' branch (clickable=false) ── */

export const NonClickable: Story = {
  name: 'Non-Clickable (display only)',
  render: () => ({
    components: { LiveGameCard },
    template: `
      <div style="max-width:500px;padding:20px">
        <LiveGameCard
          :homeTeam="{ name: 'M. Kiryat Gat', score: 87 }"
          :awayTeam="{ name: 'H. Haifa', score: 79 }"
          date="21 NOV, 2024"
          :clickable="false"
        />
      </div>
    `,
  }),
  // :style="{ cursor: clickable ? 'pointer' : 'default' }" — clickable=false → 'default' branch
}
