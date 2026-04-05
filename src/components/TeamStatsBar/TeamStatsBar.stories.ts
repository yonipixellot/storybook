import type { Meta, StoryObj } from '@storybook/vue3'
import TeamStatsBar from './TeamStatsBar.vue'
import type { StatRow } from './TeamStatsBar.vue'

const meta: Meta<typeof TeamStatsBar> = {
  title: 'Stats & Info/TeamStatsBar',
  component: TeamStatsBar,
  tags: ['autodocs'],
  argTypes: {
    paywall:      { control: 'boolean', description: 'Show paywall lock overlay' },
    paywallLabel: { control: 'text',    description: 'Label text on paywall (default: "Buy Team Stats")' },
  },
  args: {
    rows: [
      { label: 'Points',       leftVal: 82, rightVal: 76 },
      { label: 'Field Goal %', leftVal: 48, rightVal: 42 },
      { label: '2-Point %',    leftVal: 54, rightVal: 49 },
    ],
    paywall: false,
    paywallLabel: 'Buy Team Stats',
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:500px"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof TeamStatsBar>

const title  = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const label  = 'font-size:13px;color:#979797;margin:0 0 16px;font-family:Red Hat Display,sans-serif'
const box    = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr     = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ═══════════════════════════════════════════
   1. Default — 3 stat rows
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Default — 3 rows',
  args: {},
}

/* ═══════════════════════════════════════════
   2. Paywall — 8 rows with lock overlay
   ═══════════════════════════════════════════ */
export const Paywall: Story = {
  name: 'Paywall — 8 rows locked',
  args: {
    paywall: true,
    paywallLabel: 'Buy Team Stats',
    rows: [
      { label: 'Points',       leftVal: 87, rightVal: 79 },
      { label: 'Field Goal %', leftVal: 48, rightVal: 42 },
      { label: '3-Pointers',   leftVal: 12, rightVal: 8  },
      { label: 'Rebounds',     leftVal: 35, rightVal: 29 },
      { label: 'Assists',      leftVal: 22, rightVal: 18 },
      { label: 'Steals',       leftVal: 9,  rightVal: 6  },
      { label: 'Blocks',       leftVal: 4,  rightVal: 3  },
      { label: 'Turnovers',    leftVal: 12, rightVal: 15 },
    ],
  },
}

/* ═══════════════════════════════════════════
   3. Bar Behavior — equal / dominant / reversed
   ═══════════════════════════════════════════ */
export const BarBehavior: Story = {
  render: () => ({
    components: { TeamStatsBar },
    template: `
      <div style="${box}">
        <p style="${title}">Bar Behavior</p>
        <p style="${label}">Left (red) fills from right edge inward. Right (gray) fills from left edge. Widths are proportional to each team's share of combined value.</p>
        <hr style="${hr}" />
        <div style="display:flex;flex-direction:column;gap:20px">
          <div>
            <p style="margin:0 0 8px;font-family:Red Hat Display,sans-serif;font-size:12px;color:#979797">Equal — 50/50</p>
            <TeamStatsBar :rows="[{ label: 'Points', leftVal: 50, rightVal: 50 }]" />
          </div>
          <div>
            <p style="margin:0 0 8px;font-family:Red Hat Display,sans-serif;font-size:12px;color:#979797">Left dominant — 80/20</p>
            <TeamStatsBar :rows="[{ label: 'Points', leftVal: 80, rightVal: 20 }]" />
          </div>
          <div>
            <p style="margin:0 0 8px;font-family:Red Hat Display,sans-serif;font-size:12px;color:#979797">Right dominant — 20/80</p>
            <TeamStatsBar :rows="[{ label: 'Points', leftVal: 20, rightVal: 80 }]" />
          </div>
          <div>
            <p style="margin:0 0 8px;font-family:Red Hat Display,sans-serif;font-size:12px;color:#979797">Full game — 8 rows</p>
            <TeamStatsBar :rows="[
              { label: 'Points',       leftVal: 87, rightVal: 79 },
              { label: 'Field Goal %', leftVal: 48, rightVal: 42 },
              { label: '3-Pointers',   leftVal: 12, rightVal: 8  },
              { label: 'Rebounds',     leftVal: 35, rightVal: 29 },
              { label: 'Assists',      leftVal: 22, rightVal: 18 },
              { label: 'Steals',       leftVal: 9,  rightVal: 6  },
              { label: 'Blocks',       leftVal: 4,  rightVal: 3  },
              { label: 'Turnovers',    leftVal: 12, rightVal: 15 },
            ]" />
          </div>
        </div>
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   4. Dark Mode
   ═══════════════════════════════════════════ */
export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:500px"><story /></div>' })],
  render: () => ({
    components: { TeamStatsBar },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <TeamStatsBar :rows="[
          { label: 'Points',       leftVal: 82, rightVal: 76 },
          { label: 'Field Goal %', leftVal: 48, rightVal: 42 },
          { label: '2-Point %',    leftVal: 54, rightVal: 49 },
        ]" />
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   5. Token Anatomy
   ═══════════════════════════════════════════ */
export const TokenAnatomy: Story = {
  render: () => ({
    template: `
      <div style="${box}">
        <p style="${title}">Token Anatomy</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;font-family:Red Hat Display,sans-serif;font-size:13px">

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Stat Row</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Padding: <code style="color:#116DFF">16px 20px</code></div>
              <div>Values: <code style="color:#116DFF">--text-xs (14px) --font-medium</code></div>
              <div>Label: center, same size</div>
              <div>Value width: fixed 28px each side</div>
              <div>Divider: <code style="color:#116DFF">--color-gray-100</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Progress Bars</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Height: 8px</div>
              <div>Radius: <code style="color:#116DFF">--radius-sm (4px)</code></div>
              <div>Track: <code style="color:#116DFF">--color-bar-track (#EEEEEE)</code></div>
              <div>Left fill: <code style="color:#116DFF">--color-bar-red (#E8332B)</code></div>
              <div>Right fill: <code style="color:#116DFF">--color-bar-gray (#AFB6C1)</code></div>
              <div>Gap between bars: <code style="color:#116DFF">--space-sm2 (10px)</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Paywall Overlay</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Blur: filter:blur(4px) on content</div>
              <div>Overlay bg: rgba(0,0,0,0.08)</div>
              <div>Lock circle: 56px, <code style="color:#116DFF">--color-premium-dark</code> bg</div>
              <div>Lock border: 2.67px <code style="color:#116DFF">--color-premium-yellow</code></div>
              <div>Buy btn: 160px, radius 30px</div>
              <div>Buy bg: <code style="color:#116DFF">--color-premium-yellow</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Container</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Radius: <code style="color:#116DFF">--radius-card (14px)</code></div>
              <div>overflow: hidden (clips bars + overlay)</div>
            </div>
          </div>

        </div>
      </div>
    `,
  }),
}
