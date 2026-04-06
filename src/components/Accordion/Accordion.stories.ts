import type { Meta, StoryObj } from '@storybook/vue3'
import { userEvent, within } from 'storybook/test'
import Accordion from './Accordion.vue'

const meta: Meta<typeof Accordion> = {
  title: 'Layout & Overlays/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Collapsible section list with animated chevron. Supports single-open or multi-open (`allowMultiple`) mode, a borderless variant for embedded use, and custom chevron sizing.',
      },
    },
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // open item 1 (allowMultiple=false → s=new Set([]), openSet.has false → s.add)
    const btn1 = canvas.getByRole('button', { name: /what is included/i })
    await userEvent.click(btn1)
    // close item 1 (openSet.has true → s.delete)
    await userEvent.click(btn1)
    // open item 2
    const btn2 = canvas.getByRole('button', { name: /how long/i })
    await userEvent.click(btn2)
  },
}

/* ═══════════════════════════════════════════
   2. Multiple Open
   ═══════════════════════════════════════════ */
export const MultipleOpen: Story = {
  name: 'Multiple Open',
  args: { allowMultiple: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const btn1 = canvas.getByRole('button', { name: /what is included/i })
    const btn2 = canvas.getByRole('button', { name: /how long/i })
    // open both (allowMultiple=true → s=new Set(openSet.value) copies existing set)
    await userEvent.click(btn1)
    await userEvent.click(btn2)
    // close item 1 while item 2 stays open (openSet.has true → s.delete)
    await userEvent.click(btn1)
  },
}

/* ═══════════════════════════════════════════
   3. With Default Open
   ═══════════════════════════════════════════ */
export const WithDefaultOpen: Story = {
  name: 'With Default Open',
  args: { defaultOpen: '1' },
}

/* Covers typeof item.header === 'string' ? ... : 'Toggle section' FALSE branch (line 13) */
export const NonStringHeader: Story = {
  name: 'Non-string header (branch coverage)',
  args: {
    items: [
      { id: '1', header: 42 as unknown as string, content: 'Non-string header falls back to aria-label "Toggle section"' },
    ],
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:430px"><story /></div>' })],
  render: () => ({
    components: { Accordion },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <Accordion :default-open="'1'" />
      </div>
    `,
  }),
}
