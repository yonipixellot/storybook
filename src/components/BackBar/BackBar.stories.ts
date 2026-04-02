import type { Meta, StoryObj } from '@storybook/vue3'
import BackBar from './BackBar.vue'

const meta: Meta<typeof BackBar> = {
  title: 'Layout & Overlays/BackBar',
  component: BackBar,
  tags: ['autodocs'],
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
