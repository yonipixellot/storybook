import type { Meta, StoryObj } from '@storybook/vue3'
import UpgradeBanner from './UpgradeBanner.vue'

const meta: Meta<typeof UpgradeBanner> = {
  title: 'Payment/UpgradeBanner',
  component: UpgradeBanner,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text', description: 'Upgrade prompt message text' },
  },
  args: {
    message: 'Upgrade to access personal highlights for all players in this game',
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:430px;background:#fff"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof UpgradeBanner>

const box   = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px;background:#fff'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const hr    = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ═══════════════════════════════════════════
   1. Default
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Default — Highlights Upgrade',
  args: {},
}

/* ═══════════════════════════════════════════
   2. Custom message
   ═══════════════════════════════════════════ */
export const CustomMessage: Story = {
  name: 'Custom Message',
  args: {
    message: 'Upgrade to Premium to access full game statistics and team analytics.',
  },
}

/* ═══════════════════════════════════════════
   3. In context — with a card above
   ═══════════════════════════════════════════ */
export const InContext: Story = {
  name: 'In Context — Below Game Stats',
  render: () => ({
    components: { UpgradeBanner },
    template: `
      <div style="font-family:Red Hat Display,sans-serif;max-width:430px;display:flex;flex-direction:column;gap:12px">
        <div style="background:var(--color-gray-50);border-radius:var(--radius-card);padding:16px 20px">
          <p style="font-size:var(--text-xs);font-weight:var(--font-bold);color:var(--color-dark-text);margin:0 0 8px">Game Stats</p>
          <p style="font-size:var(--text-caption);color:var(--color-gray-400);margin:0">Stats are currently locked for this game.</p>
        </div>
        <UpgradeBanner />
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   4. Dark Mode
   ═══════════════════════════════════════════ */
export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:430px"><story /></div>' })],
  render: () => ({
    components: { UpgradeBanner },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <UpgradeBanner />
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
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Banner Container</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Background: <code style="color:#116DFF">--color-info-bg-purple</code><br><code style="color:#979797">rgba(139,92,246,0.08)</code></div>
              <div>Border: <code style="color:#116DFF">--stroke-thin (0.67px) solid --color-premium-amber</code></div>
              <div>Border-radius: <code style="color:#116DFF">--radius-badge (12px)</code></div>
              <div>Padding: <code style="color:#116DFF">--space-md (12px)</code></div>
              <div>Layout: flex, align-items:center</div>
              <div>Gap: <code style="color:#116DFF">--space-md (12px)</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Lock Circle</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Size: 32×32px</div>
              <div>Background: <code style="color:#116DFF">--color-premium-dark</code></div>
              <div>Border: <code style="color:#116DFF">--stroke-thin solid --color-premium-yellow</code></div>
              <div>Border-radius: <code style="color:#116DFF">--radius-full (50%)</code></div>
              <div>Lock SVG: 12px, <code style="color:#116DFF">--color-premium-yellow</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Message Text</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Font: <code style="color:#116DFF">--text-body2 (13px) --font-regular</code></div>
              <div>Color: <code style="color:#116DFF">--color-black</code></div>
              <div>flex:1, line-height:1.5</div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Upgrade Button</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Background: <code style="color:#116DFF">--color-premium-yellow</code></div>
              <div>Text: <code style="color:#116DFF">--color-premium-dark --text-base --font-semibold</code></div>
              <div>Padding: <code style="color:#116DFF">4px 12px</code></div>
              <div>Border-radius: <code style="color:#116DFF">--radius-pill (9999px)</code></div>
            </div>
          </div>

        </div>
      </div>
    `,
  }),
}
