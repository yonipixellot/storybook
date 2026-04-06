import type { Meta, StoryObj } from '@storybook/vue3'
import GameResultCard from './GameResultCard.vue'

const meta: Meta<typeof GameResultCard> = {
  title: 'Cards/GameResultCard',
  component: GameResultCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Finished-game result card with a left date column (day / month / year) and a right panel showing team logos, names, final scores, league label, and an optional HIGHLIGHTS badge.',
      },
    },
  },
  decorators: [() => ({ template: '<div style="padding:20px"><story /></div>' })],
  argTypes: {
    homeTeam:      { control: 'object', description: 'Home team — { name, score, logoUrl? }' },
    awayTeam:      { control: 'object', description: 'Away team — { name, score, logoUrl? }' },
    day:           { control: 'text', description: 'Day of the month, e.g. "20"' },
    month:         { control: 'text', description: 'Month abbreviation, e.g. "NOV"' },
    year:          { control: 'text', description: 'Full year, e.g. "2024"' },
    league:        { control: 'text', description: 'League name (optional)' },
    hasHighlights: { control: 'boolean', description: 'Show HIGHLIGHTS badge in the card footer' },
    clickable:     { control: 'boolean', description: 'Pointer cursor — indicates the card is tappable' },
  },
}

export default meta
type Story = StoryObj<typeof GameResultCard>

const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ── Default ── */

export const Default: Story = {
  render: () => ({
    components: { GameResultCard },
    template: `
      <div style="${box}">
        <p style="${title}">GameResultCard</p>
        <p style="${label}">Vertical card with left date column, teams/scores on right, league + highlights badge at bottom</p>
        <hr style="${hr}" />
        <GameResultCard
          :homeTeam="{ name: 'Maccabi Kiryat Gat', score: 89 }"
          :awayTeam="{ name: 'Ironi Nahariya', score: 77 }"
          day="20"
          month="NOV"
          year="2024"
          league="Liga Leumit (Winner League)"
        />
      </div>
    `,
  }),
}

/* ── Highlights Badge ── */

export const HighlightsBadge: Story = {
  render: () => ({
    components: { GameResultCard },
    template: `
      <div style="${box}">
        <p style="${title}">Highlights Badge</p>
        <p style="${label}">Yellow badge with play icon — used at bottom-right of game result cards</p>
        <hr style="${hr}" />
        <div style="display:flex;align-items:center;gap:16px">
          <span style="display:inline-flex;align-items:center;gap:4px;background-color:#6C6C6C;color:#FFE000;border:0.5px solid #FFE000;border-radius:12px;padding:4px 12px;font-size:11px;font-weight:700;font-family:Red Hat Display,sans-serif;line-height:1">
            <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor"><polygon points="0,0 8,5 0,10" /></svg>
            HIGHLIGHTS
          </span>
          <span style="font-size:12px;color:#979797;font-family:Red Hat Display,sans-serif">bg: #6C6C6C, text: #FFE000, border: #FFE000</span>
        </div>
      </div>
    `,
  }),
}

/* ── Without Highlights ── */

export const WithoutHighlights: Story = {
  render: () => ({
    components: { GameResultCard },
    template: `
      <div style="${box}">
        <p style="${title}">Without Highlights</p>
        <p style="${label}">Game card without a highlights button — only league shown</p>
        <hr style="${hr}" />
        <GameResultCard
          :homeTeam="{ name: 'Team Alpha', score: 3 }"
          :awayTeam="{ name: 'Team Beta', score: 1 }"
          day="30"
          month="MAR"
          year="2026"
          league="Friendly Match"
          :hasHighlights="false"
        />
      </div>
    `,
  }),
}

/* ── Dark Mode ── */

export const DarkMode: Story = {
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { GameResultCard },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px;margin-bottom:24px">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <p style="font-size:13px;color:#888;margin:0 0 16px;font-family:Red Hat Display,sans-serif">Date col #444, body #333, highlights badge bg #444</p>
        <hr style="border:none;border-top:1px solid #444;margin:0 0 24px" />
        <GameResultCard
          :homeTeam="{ name: 'Maccabi Kiryat Gat', score: 89 }"
          :awayTeam="{ name: 'Ironi Nahariya', score: 77 }"
          day="20"
          month="NOV"
          year="2024"
          league="Liga Leumit (Winner League)"
        />
      </div>
    `,
  }),
}

/* ── No League — covers v-else branch ── */

export const NoLeague: Story = {
  render: () => ({
    components: { GameResultCard },
    template: `
      <div style="${box}">
        <p style="${title}">No League Label</p>
        <p style="${label}">When no league prop is passed the v-else span renders</p>
        <hr style="${hr}" />
        <GameResultCard
          :homeTeam="{ name: 'Team Alpha', score: 3 }"
          :awayTeam="{ name: 'Team Beta', score: 1 }"
          day="5"
          month="APR"
          year="2026"
        />
      </div>
    `,
  }),
}

/* ── Multiple Cards ── */

export const MultipleCards: Story = {
  render: () => ({
    components: { GameResultCard },
    template: `
      <div style="${box}">
        <p style="${title}">Multiple Game Results</p>
        <p style="${label}">Cards stack vertically in a results feed layout</p>
        <hr style="${hr}" />
        <div style="display:flex;flex-direction:column;gap:16px">
          <GameResultCard
            :homeTeam="{ name: 'Maccabi Kiryat Gat', score: 89 }"
            :awayTeam="{ name: 'Ironi Nahariya', score: 77 }"
            day="20"
            month="NOV"
            year="2024"
            league="Liga Leumit (Winner League)"
          />
          <GameResultCard
            :homeTeam="{ name: 'Maccabi Tel Aviv', score: 95 }"
            :awayTeam="{ name: 'Hapoel Jerusalem', score: 88 }"
            day="20"
            month="NOV"
            year="2024"
            league="Israeli Premier League"
          />
        </div>
      </div>
    `,
  }),
}
