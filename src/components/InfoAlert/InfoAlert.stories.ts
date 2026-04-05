import type { Meta, StoryObj } from '@storybook/vue3'
import InfoAlert from './InfoAlert.vue'

const meta: Meta<typeof InfoAlert> = {
  title: 'Stats & Info/InfoAlert',
  component: InfoAlert,
  tags: ['autodocs'],
  argTypes: {
    title:       { control: 'text', description: 'Bold purple title line' },
    description: { control: 'text', description: 'Gray description line below the title' },
  },
  args: {
    title:       'Claimed Athletes Only',
    description: 'This content is only available for claimed athlete profiles.',
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:430px;background:#fff"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof InfoAlert>

const box   = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px;background:#fff'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const hr    = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ═══════════════════════════════════════════
   1. Default
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Default — Claimed Athletes Only',
  args: {},
}

/* ═══════════════════════════════════════════
   2. Custom message
   ═══════════════════════════════════════════ */
export const Premium: Story = {
  name: 'Premium Content Notice',
  args: {
    title:       'Premium Feature',
    description: 'Upgrade your plan to access full game statistics and advanced analytics.',
  },
}

/* ═══════════════════════════════════════════
   3. Short message
   ═══════════════════════════════════════════ */
export const Short: Story = {
  name: 'Short Notice',
  args: {
    title:       'Sign In Required',
    description: 'Please sign in to view this content.',
  },
}

/* ═══════════════════════════════════════════
   4. Dark Mode
   ═══════════════════════════════════════════ */
export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:430px"><story /></div>' })],
  render: () => ({
    components: { InfoAlert },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <p style="font-size:13px;color:#888;margin:0 0 16px;font-family:Red Hat Display,sans-serif">Purple bg/border unchanged; title uses lighter purple #A78BFA</p>
        <hr style="border:none;border-top:1px solid #444;margin:0 0 24px" />
        <div style="display:flex;flex-direction:column;gap:12px">
          <InfoAlert title="Claimed Athletes Only" description="This content is only available for claimed athlete profiles." />
          <InfoAlert title="Premium Feature" description="Upgrade your plan to access full game statistics and advanced analytics." />
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
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Container</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Background: <code style="color:#116DFF">--color-info-bg-purple</code><br><code style="color:#979797">rgba(139,92,246,0.08)</code></div>
              <div>Border: <code style="color:#116DFF">1px solid --color-info-border-purple</code><br><code style="color:#979797">rgba(139,92,246,0.15)</code></div>
              <div>Border-radius: <code style="color:#116DFF">--radius-badge (12px)</code></div>
              <div>Padding: <code style="color:#116DFF">--space-lg (16px)</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Title</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Font: <code style="color:#116DFF">--text-body2 (13px) --font-bold</code></div>
              <div>Color: <code style="color:#116DFF">--color-claimed-purple (#8B5CF6)</code></div>
              <div>Margin bottom: <code style="color:#116DFF">--space-xs2 (6px)</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Description</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Font: <code style="color:#116DFF">--text-caption (12px)</code></div>
              <div>Color: <code style="color:#116DFF">--color-gray-500</code></div>
            </div>
          </div>

        </div>
      </div>
    `,
  }),
}
