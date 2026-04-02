import type { Meta, StoryObj } from '@storybook/vue3'
import Accordion from './Accordion.vue'

const meta: Meta<typeof Accordion> = {
  title: 'Layout & Overlays/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: { control: 'boolean' },
    borderless: { control: 'boolean' },
    chevronSize: { control: 'number' },
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:430px;background:#fff;border:1px solid #E8E8E8;border-radius:12px;overflow:hidden"><story /></div>' }),
  ],
  args: {
    items: [
      { id: '1', header: 'What is included?', content: 'All season highlights for every player on the team.' },
      { id: '2', header: 'How long do I have access?', content: 'Access lasts for the full season.' },
      { id: '3', header: 'Can I share my subscription?', content: 'Subscriptions are for personal use only.' },
    ],
    allowMultiple: false,
    borderless: false,
    chevronSize: 18,
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

/* ═══════════════════════════════════════════
   1. Single Open (default)
   ═══════════════════════════════════════════ */
export const SingleOpen: Story = {
  name: 'Single Open (default)',
  args: { allowMultiple: false },
}

/* ═══════════════════════════════════════════
   2. Multiple Open
   ═══════════════════════════════════════════ */
export const MultipleOpen: Story = {
  name: 'Multiple Open',
  args: { allowMultiple: true },
}

/* ═══════════════════════════════════════════
   3. With Default Open
   ═══════════════════════════════════════════ */
export const WithDefaultOpen: Story = {
  name: 'With Default Open',
  args: { defaultOpen: '1' },
}
