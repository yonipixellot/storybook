import type { Meta, StoryObj } from '@storybook/vue3'
import SeasonStatsRow from './SeasonStatsRow.vue'

const meta: Meta<typeof SeasonStatsRow> = {
  title: 'Stats & Info/SeasonStatsRow',
  component: SeasonStatsRow,
  tags: ['autodocs'],
  argTypes: {
    stats: { control: 'object', description: 'Array of { label, value } — rendered as a horizontal row of PStatCards' },
  },
  args: {
    stats: [
      { label: 'MPG', value: '23.4' },
      { label: 'PPG', value: '18.6' },
      { label: 'APG', value: '4.5'  },
      { label: 'RPG', value: '3.2'  },
    ],
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:430px;background:#fff"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof SeasonStatsRow>

const box   = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px;background:#fff'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const hr    = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ═══════════════════════════════════════════
   1. Default — MPG / PPG / APG / RPG
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: '4 Season Stats — MPG / PPG / APG / RPG',
  args: {},
}

/* ═══════════════════════════════════════════
   2. Custom sport — Soccer
   ═══════════════════════════════════════════ */
export const Soccer: Story = {
  name: 'Soccer Stats',
  args: {
    stats: [
      { label: 'Goals',   value: '12'  },
      { label: 'Assists', value: '7'   },
      { label: 'Shots',   value: '48'  },
      { label: 'MinsPG',  value: '81'  },
    ],
  },
}

/* ═══════════════════════════════════════════
   3. With context header (usage example)
   ═══════════════════════════════════════════ */
export const WithHeader: Story = {
  name: 'With Section Header',
  render: () => ({
    components: { SeasonStatsRow },
    template: `
      <div style="font-family:Red Hat Display,sans-serif;max-width:430px">
        <div style="font-size:14px;font-weight:700;color:#161616;margin:0 0 10px">Season Averages</div>
        <SeasonStatsRow />
      </div>
    `,
  }),
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
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Row Container</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Layout: <code style="color:#116DFF">display:flex</code></div>
              <div>Gap: <code style="color:#116DFF">--space-md (12px)</code></div>
              <div>Each card: <code style="color:#116DFF">flex:1</code> (equal width)</div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">PStatCard</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Background: <code style="color:#116DFF">--color-card-bg</code></div>
              <div>Padding: <code style="color:#116DFF">--space-md (12px)</code></div>
              <div>Border-radius: <code style="color:#116DFF">--radius-badge (12px)</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Label</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Font: <code style="color:#116DFF">--text-2xs (11px) --font-medium</code></div>
              <div>Color: <code style="color:#116DFF">--color-gray-500</code></div>
              <div>Line-height: 16px</div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Value</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Font: <code style="color:#116DFF">--text-xl (22px) --font-bold</code></div>
              <div>Color: <code style="color:#116DFF">--color-dark-text</code></div>
              <div>margin-top: auto</div>
            </div>
          </div>

        </div>
      </div>
    `,
  }),
}
