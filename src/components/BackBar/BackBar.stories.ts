import type { Meta, StoryObj } from '@storybook/vue3'
import BackBar from './BackBar.vue'

const meta: Meta<typeof BackBar> = {
  title: 'Layout & Overlays/BackBar',
  component: BackBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Secondary navigation bar with a back arrow and label on the left, and an optional Share icon on the right. Emits `back` and `share` events.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    showShare: { control: 'boolean' },
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:430px;background:#fff"><story /></div>' }),
  ],
  args: {
    label: 'Back',
    showShare: false,
  },
}

export default meta
type Story = StoryObj<typeof BackBar>

/* ═══════════════════════════════════════════
   1. Back Only
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Back Only',
  args: { label: 'Back', showShare: false },
}

/* ═══════════════════════════════════════════
   2. Back + Share
   ═══════════════════════════════════════════ */
export const WithShare: Story = {
  name: 'Back + Share',
  args: { showShare: true },
}

/* ═══════════════════════════════════════════
   3. Custom Label
   ═══════════════════════════════════════════ */
export const CustomLabel: Story = {
  name: 'Custom Label',
  args: { label: 'Tal Weiss', showShare: true },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:430px"><story /></div>' })],
  render: () => ({
    components: { BackBar },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:16px 0">
        <p style="font-size:18px;font-weight:700;margin:0 16px 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <BackBar label="Back" :show-share="false" />
        <div style="height:8px"></div>
        <BackBar label="Tal Weiss" :show-share="true" />
      </div>
    `,
  }),
}
