import type { Meta, StoryObj } from '@storybook/vue3'
import StatsGrid from './StatsGrid.vue'

const meta: Meta<typeof StatsGrid> = {
  title: 'Stats & Info/StatsGrid',
  component: StatsGrid,
  tags: ['autodocs'],
  argTypes: {
    stats: { control: 'object', description: 'Array of stat items: { label?, labelLines?, value }' },
  },
  args: {
    stats: [
      { labelLines: ['Minutes', 'Played'], value: '1245' },
      { labelLines: ['Games',   'Played'], value: '64'   },
      { labelLines: ['Tournaments', 'Played'], value: '18' },
    ],
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:430px;background:#fff"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof StatsGrid>

const box  = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px;background:#fff'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const hr    = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ═══════════════════════════════════════════
   1. Default — career stats (3 columns)
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: '3-Column Career Stats',
  args: {},
}

/* ═══════════════════════════════════════════
   2. Single-line labels
   ═══════════════════════════════════════════ */
export const SingleLineLabels: Story = {
  name: 'Single-Line Labels',
  args: {
    stats: [
      { label: 'PTS', value: '18.6' },
      { label: 'REB', value: '4.2'  },
      { label: 'AST', value: '3.1'  },
    ],
  },
}

/* ═══════════════════════════════════════════
   3. 6 stats (2 rows)
   ═══════════════════════════════════════════ */
export const SixStats: Story = {
  name: '6 Stats — 2 Rows',
  args: {
    stats: [
      { labelLines: ['Minutes', 'Played'], value: '1245' },
      { labelLines: ['Games',   'Played'], value: '64'   },
      { labelLines: ['Tournaments', 'Played'], value: '18' },
      { label: 'PTS',  value: '1192' },
      { label: 'REB',  value: '269'  },
      { label: 'AST',  value: '198'  },
    ],
  },
}

/* ═══════════════════════════════════════════
   4. PStatCard Atom — standalone preview
   ═══════════════════════════════════════════ */
export const PStatCardAtom: Story = {
  name: 'PStatCard Atom (single)',
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;max-width:400px">
        <div style="flex:1;background:var(--color-card-bg);padding:var(--space-md);border-radius:var(--radius-badge);display:flex;flex-direction:column;gap:2px">
          <div style="font-size:var(--text-2xs);font-weight:var(--font-medium);color:var(--color-gray-500);line-height:16px">
            <div>Minutes</div><div>Played</div>
          </div>
          <div style="font-size:var(--text-xl);font-weight:var(--font-bold);color:var(--color-dark-text);margin-top:auto">1245</div>
        </div>
        <div style="flex:1;background:var(--color-card-bg);padding:var(--space-md);border-radius:var(--radius-badge);display:flex;flex-direction:column;gap:2px">
          <div style="font-size:var(--text-2xs);font-weight:var(--font-medium);color:var(--color-gray-500);line-height:16px">PPG</div>
          <div style="font-size:var(--text-xl);font-weight:var(--font-bold);color:var(--color-dark-text);margin-top:auto">18.6</div>
        </div>
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
            <p style="margin:0 0 8px;font-weight:700;color:#161616">StatsGrid Container</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Layout: <code style="color:#116DFF">display:grid, 1fr 1fr 1fr</code></div>
              <div>Gap: <code style="color:#116DFF">--space-md (12px)</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">PStatCard</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Background: <code style="color:#116DFF">--color-card-bg (#F3F4F6)</code></div>
              <div>Padding: <code style="color:#116DFF">--space-md (12px)</code></div>
              <div>Border-radius: <code style="color:#116DFF">--radius-badge (12px)</code></div>
              <div>Layout: flex, column, gap 2px</div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Label</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Font size: <code style="color:#116DFF">--text-2xs (11px)</code></div>
              <div>Font weight: <code style="color:#116DFF">--font-medium</code></div>
              <div>Color: <code style="color:#116DFF">--color-gray-500</code></div>
              <div>Line height: <code style="color:#116DFF">16px</code></div>
              <div>Supports multi-line via <code style="color:#116DFF">labelLines[]</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Value</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Font size: <code style="color:#116DFF">--text-xl (22px)</code></div>
              <div>Font weight: <code style="color:#116DFF">--font-bold</code></div>
              <div>Color: <code style="color:#116DFF">--color-dark-text</code></div>
              <div>margin-top: auto (pushes to bottom)</div>
            </div>
          </div>

        </div>
      </div>
    `,
  }),
}
