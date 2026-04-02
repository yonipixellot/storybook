import type { Meta, StoryObj } from '@storybook/vue3'
import PaymentPlanCard from './PaymentPlanCard.vue'

const meta: Meta<typeof PaymentPlanCard> = {
  title: 'Payment/PaymentPlanCard',
  component: PaymentPlanCard,
  tags: ['autodocs'],
  argTypes: {
    variant:     { control: { type: 'select' }, options: ['default', 'highlighted'], description: 'Card variant' },
    title:       { control: 'text', description: 'Plan name' },
    description: { control: 'text', description: 'Plan description (with Show more link)' },
    price:       { control: 'text', description: 'Price display string (e.g. "$5.00")' },
    features:    { control: 'object', description: 'Array of feature strings (shows features section when provided)' },
  },
  args: {
    variant:     'default',
    title:       'Single Download',
    description: 'Download a single highlight of your favourite moment from the season!',
    price:       '$5.00',
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:430px;background:#fff"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof PaymentPlanCard>

const box   = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px;background:#fff'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const hr    = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ═══════════════════════════════════════════
   1. Default variant
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Card Variant — Default',
  args: {},
}

/* ═══════════════════════════════════════════
   2. Highlighted (Most Popular)
   ═══════════════════════════════════════════ */
export const Highlighted: Story = {
  name: 'Card Variant — Highlighted (Most Popular)',
  args: {
    variant:     'highlighted',
    title:       'Season Pass',
    description: 'Watch every player highlight throughout the season',
    price:       '$35.00',
    features:    ['Afrikaanse Hoër Seunskool U14', 'Bosh PUP U14'],
  },
}

/* ═══════════════════════════════════════════
   3. Full modal layout
   ═══════════════════════════════════════════ */
export const FullModal: Story = {
  name: 'Full Modal Preview',
  render: () => ({
    components: { PaymentPlanCard },
    template: `
      <div style="max-width:430px;display:flex;flex-direction:column;gap:14px;font-family:Red Hat Display,sans-serif">

        <!-- Access Code section -->
        <div style="background:var(--color-gray-50);border-radius:var(--radius-card);padding:20px 24px">
          <p style="font-size:var(--text-base);font-weight:var(--font-medium);color:var(--color-dark-text);margin:0 0 12px">
            Redeem your Access Code here:
          </p>
          <div style="position:relative">
            <input
              type="text"
              placeholder=""
              style="width:100%;height:50px;background:var(--color-white);border:1px solid var(--color-gray-300);border-radius:var(--radius-badge);padding:0 120px 0 16px;font-size:var(--text-xs);font-family:var(--font-family-base);outline:none;box-sizing:border-box"
            />
            <button style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:var(--color-primary);color:var(--color-white);border:none;border-radius:var(--radius-pill);padding:8px 24px;font-family:var(--font-family-base);font-size:var(--text-sm);font-weight:var(--font-semibold);cursor:pointer">
              Submit
            </button>
          </div>
        </div>

        <!-- Divider section -->
        <p style="font-size:var(--text-xs);font-weight:var(--font-medium);color:var(--color-gray-500);margin:0">or select your plan</p>
        <div style="height:1px;background:var(--color-gray-300);margin:calc(var(--space-sm) * -1) 0"></div>
        <p style="font-size:var(--text-2xs);font-weight:var(--font-bold);color:var(--color-gray-500);margin:0;text-transform:uppercase;letter-spacing:0.5px">Subscriptions</p>

        <!-- 3 plan cards -->
        <PaymentPlanCard
          variant="default"
          title="Single Download"
          description="Download a single highlight of your favourite moment from the season!"
          price="$5.00"
        />
        <PaymentPlanCard
          variant="highlighted"
          title="Season Pass"
          description="Watch every player highlight throughout the season"
          price="$35.00"
          :features="['Afrikaanse Hoër Seunskool U14', 'Bosh PUP U14']"
        />
        <PaymentPlanCard
          variant="default"
          title="2 Season Bundle"
          description="Watch every player highlight throughout 2 season"
          price="$60.00"
        />
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
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Card Container</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Background: <code style="color:#116DFF">--color-gray-50</code></div>
              <div>Border-radius: <code style="color:#116DFF">--radius-card (14px)</code></div>
              <div>Padding: <code style="color:#116DFF">20px 16px</code></div>
              <div>Highlighted border: <code style="color:#116DFF">2px solid --color-premium-yellow</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Most Popular Badge</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Background: <code style="color:#116DFF">--color-premium-yellow</code></div>
              <div>Border-radius: <code style="color:#116DFF">--radius-lg (20px)</code></div>
              <div>Padding: <code style="color:#116DFF">6px 14px</code></div>
              <div>Label: <code style="color:#116DFF">--text-body2 --font-bold --color-dark-text</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Typography</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Title: <code style="color:#116DFF">--text-base --font-bold</code>, line-height 24px</div>
              <div>Desc: <code style="color:#116DFF">--text-xs --font-regular --color-gray-500</code></div>
              <div>Price: <code style="color:#116DFF">--text-display (32px) --font-bold</code></div>
              <div>Show more: <code style="color:#116DFF">--color-primary --font-medium</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Features Section</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Background: <code style="color:#116DFF">--color-gray-100</code></div>
              <div>Padding: <code style="color:#116DFF">--space-md2 --space-lg</code></div>
              <div>Check icon: 16px, <code style="color:#116DFF">--color-success-green</code></div>
              <div>Gap between items: <code style="color:#116DFF">--space-xs2 (6px)</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Buy Now Button</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Default: <code style="color:#116DFF">--color-primary</code> bg, white text</div>
              <div>Premium: <code style="color:#116DFF">--color-premium-yellow</code> bg, <code style="color:#116DFF">--color-premium-dark</code> text</div>
              <div>Border-radius: <code style="color:#116DFF">--radius-pill (9999px)</code></div>
              <div>Height: <code style="color:#116DFF">--size-button-height (40px)</code></div>
            </div>
          </div>

        </div>
      </div>
    `,
  }),
}
