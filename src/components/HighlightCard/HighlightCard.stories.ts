import type { Meta, StoryObj } from '@storybook/vue3'
import HighlightCard from './HighlightCard.vue'

const meta: Meta<typeof HighlightCard> = {
  title: 'Cards/HighlightCard',
  component: HighlightCard,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div style="padding:20px"><story /></div>' })],
}

export default meta
type Story = StoryObj<typeof HighlightCard>

const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ── Locked Highlights (Premium) ── */

export const LockedHighlights: Story = {
  render: () => ({
    components: { HighlightCard },
    template: `
      <div style="${box}">
        <p style="${title}">Locked Highlights (Premium)</p>
        <p style="${label}">Cards with yellow lock icon badge — paywall content</p>
        <hr style="${hr}" />
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          <HighlightCard
            duration="1:23"
            title="🏀 Weiss with the dimes"
            date="NOV 13, 2025"
            :locked="true"
          />
          <HighlightCard
            duration="5:15"
            title="🔥 Best plays of the game"
            date="NOV 13, 2025"
            :locked="true"
          />
          <HighlightCard
            duration="3:45"
            title="⭐ Top scoring moments"
            date="NOV 13, 2025"
            :locked="true"
          />
          <HighlightCard
            duration="2:20"
            title="🏆 Dunks & points"
            date="NOV 13, 2025"
            :locked="true"
          />
        </div>
      </div>
    `,
  }),
}

/* ── Free Highlights (No Lock) ── */

export const FreeHighlights: Story = {
  render: () => ({
    components: { HighlightCard },
    template: `
      <div style="${box}">
        <p style="${title}">Free Highlights (No Lock)</p>
        <p style="${label}">Cards without lock icon — freely accessible content</p>
        <hr style="${hr}" />
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          <HighlightCard
            duration="0:45"
            title="🏀 #4 Gets the ball Forward"
            date="NOV 13, 2025"
            :locked="false"
          />
          <HighlightCard
            duration="0:32"
            title="🏀 #11 Gets the ball Forward"
            date="NOV 13, 2025"
            :locked="false"
          />
        </div>
      </div>
    `,
  }),
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { HighlightCard },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          <HighlightCard duration="1:23" title="🏀 Weiss with the dimes" date="NOV 13, 2025" :locked="true" />
          <HighlightCard duration="0:45" title="🏀 #4 Gets the ball Forward" date="NOV 13, 2025" :locked="false" />
          <HighlightCard duration="5:15" title="🔥 Best plays of the game" date="NOV 13, 2025" :locked="true" />
        </div>
      </div>
    `,
  }),
}

/* ── Props ── */

export const Props: Story = {
  render: () => ({
    components: { HighlightCard },
    template: `
      <div style="${box}">
        <p style="${title}">Props</p>
        <hr style="${hr}" />
        <div style="font-family:monospace;font-size:13px;color:#555;line-height:2">
          <div><strong>thumbnail</strong>: string — background image URL</div>
          <div><strong>duration</strong>: string — video length badge (top-left)</div>
          <div><strong>title</strong>: string — emoji-prefixed title overlay</div>
          <div><strong>date</strong>: string — date below title</div>
          <div><strong>locked</strong>: boolean — show/hide yellow lock icon (default: true)</div>
        </div>
      </div>
    `,
  }),
}
