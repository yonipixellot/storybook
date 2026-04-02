import type { Meta, StoryObj } from '@storybook/vue3'
import LiveGameCard from './LiveGameCard.vue'

const meta: Meta<typeof LiveGameCard> = {
  title: 'Cards/LiveGameCard',
  component: LiveGameCard,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div style="max-width:500px;padding:20px"><story /></div>' })],
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
          :homeTeam="{ name: 'M. Kiryat Gat', score: 87, logoInitial: 'M', logoColor: '#fff' }"
          :awayTeam="{ name: 'H. Haifa', score: 79, logoInitial: 'H', logoColor: '#fff' }"
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
          :homeTeam="{ name: 'Maccabi Tel Aviv', score: 72, logoInitial: 'M', logoColor: '#FFE000' }"
          :awayTeam="{ name: 'Hapoel Jerusalem', score: 70, logoInitial: 'H', logoColor: '#EF4444' }"
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
          :homeTeam="{ name: 'Team Alpha', score: 3, logoInitial: 'A', logoColor: '#116DFF' }"
          :awayTeam="{ name: 'Team Beta', score: 1, logoInitial: 'B', logoColor: '#22C55E' }"
          date="30 MAR, 2026"
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
            :homeTeam="{ name: 'M. Kiryat Gat', score: 87, logoInitial: 'M' }"
            :awayTeam="{ name: 'H. Haifa', score: 79, logoInitial: 'H' }"
            date="21 NOV, 2024"
            league="Liga Leumit (Winner League)"
          />
          <LiveGameCard
            :homeTeam="{ name: 'Maccabi Tel Aviv', score: 45, logoInitial: 'M', logoColor: '#FFE000' }"
            :awayTeam="{ name: 'Hapoel Beer Sheva', score: 38, logoInitial: 'H', logoColor: '#EF4444' }"
            date="21 NOV, 2024"
            league="Israeli Premier League"
          />
        </div>
      </div>
    `,
  }),
}
