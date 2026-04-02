import type { Meta, StoryObj } from '@storybook/vue3'
import PlayerStats from './PlayerStats.vue'

const meta: Meta<typeof PlayerStats> = {
  title: 'Stats & Info/PlayerStats',
  component: PlayerStats,
  tags: ['autodocs'],
  argTypes: {
    teams:        { control: 'object',  description: 'Array of 2 team name strings for the tab switcher' },
    columns:      { control: 'object',  description: 'Column header labels (first = player, rest = stat cols)' },
    rows:         { control: 'object',  description: 'Data rows — each row is an array of strings matching columns' },
    paywall:      { control: 'boolean', description: 'When true, blurs content and shows lock overlay' },
    paywallLabel: { control: 'text',    description: 'Label shown above the Buy Now button in paywall overlay' },
  },
  args: {
    teams:   ['Maccabi Kiryat Gat', 'Ironi Nahariya'],
    columns: ['Player', 'MIN', 'PTS', 'REB', 'AST'],
    rows: [
      ['#5',  '32', '18', '7', '3'],
      ['#3',  '28', '14', '4', '5'],
      ['#22', '35', '22', '9', '2'],
      ['#13', '26', '8',  '3', '1'],
      ['#11', '30', '16', '5', '7'],
      ['#23', '18', '4',  '2', '1'],
      ['#8',  '24', '10', '3', '2'],
      ['#7',  '15', '6',  '2', '3'],
    ],
    paywall:      false,
    paywallLabel: 'Buy Team Stats',
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:430px;background:#f5f5f5"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof PlayerStats>

const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const label = 'font-size:13px;color:#979797;margin:0 0 16px;font-family:Red Hat Display,sans-serif'
const box   = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px;background:#fff'
const hr    = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ═══════════════════════════════════════════
   1. Default — Player Stats Table
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'PlayerStats Table',
  args: {},
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:430px;background:#fff"><story /></div>' }),
  ],
}

/* ═══════════════════════════════════════════
   2. Paywall
   ═══════════════════════════════════════════ */
export const Paywall: Story = {
  name: 'PlayerStats — Paywall',
  args: {
    paywall: true,
    paywallLabel: 'Buy Team Stats',
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:430px;background:#fff"><story /></div>' }),
  ],
}

/* ═══════════════════════════════════════════
   3. Custom columns
   ═══════════════════════════════════════════ */
export const CustomColumns: Story = {
  name: 'Custom Columns — Soccer',
  args: {
    teams: ['Home FC', 'Away United'],
    columns: ['Player', 'MIN', 'Goals', 'Assists', 'Shots'],
    rows: [
      ['#9',  '90', '2', '1', '5'],
      ['#10', '85', '1', '2', '4'],
      ['#7',  '78', '1', '0', '3'],
      ['#11', '90', '0', '2', '2'],
      ['#8',  '72', '0', '1', '1'],
    ],
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:430px;background:#fff"><story /></div>' }),
  ],
}

/* ═══════════════════════════════════════════
   4. Token Anatomy
   ═══════════════════════════════════════════ */
export const TokenAnatomy: Story = {
  render: () => ({
    template: `
      <div style="${box}">
        <p style="${title}">Token Anatomy</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;font-family:Red Hat Display,sans-serif;font-size:13px">

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Container</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Padding: <code style="color:#116DFF">--space-lg 20px (16px 20px)</code></div>
              <div>Border-radius: <code style="color:#116DFF">--radius-card (14px)</code></div>
              <div>overflow: hidden</div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Team Tabs</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Tab: flex:1, no bg, bottom border 2px</div>
              <div>Active border: <code style="color:#116DFF">--color-jersey-red</code></div>
              <div>Active text: <code style="color:#116DFF">--color-dark-text</code></div>
              <div>Inactive border: <code style="color:#116DFF">--color-bar-track</code></div>
              <div>Inactive text: <code style="color:#116DFF">--color-gray-400</code></div>
              <div>Font: <code style="color:#116DFF">--text-xs --font-medium</code></div>
              <div>Margin bottom: <code style="color:#116DFF">--space-md2 (14px)</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Column Headers</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Font: <code style="color:#116DFF">--text-caption --font-medium</code></div>
              <div>Color: <code style="color:#116DFF">--color-gray-400</code></div>
              <div>Player col: width 80px, text-left</div>
              <div>Stat cols: flex:1, text-center</div>
              <div>Track divider: <code style="color:#116DFF">1px solid --color-bar-track</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Data Rows</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Row padding: <code style="color:#116DFF">8px 0</code></div>
              <div>Cell font: <code style="color:#116DFF">--text-xs --font-medium --color-dark-text</code></div>
              <div>Row divider: <code style="color:#116DFF">1px solid --color-jersey-red</code> opacity 0.15</div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Paywall Overlay</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Content: blur(4px), opacity 0.5</div>
              <div>Overlay: position absolute, inset 0</div>
              <div>Lock circle: 56px, <code style="color:#116DFF">--color-premium-dark</code> bg</div>
              <div>Lock border: 2.67px <code style="color:#116DFF">--color-premium-yellow</code></div>
              <div>Button: 160px wide, 30px radius, <code style="color:#116DFF">--color-premium-yellow</code> bg</div>
              <div>Button text: <code style="color:#116DFF">--color-premium-dark --font-semibold</code></div>
            </div>
          </div>

        </div>
      </div>
    `,
  }),
}
