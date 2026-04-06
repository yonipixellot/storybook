import type { Meta, StoryObj } from '@storybook/vue3'
import { userEvent } from 'storybook/test'
import PSeeAllLink from './PSeeAllLink.vue'

const meta: Meta<typeof PSeeAllLink> = {
  title: 'Avatars & List Items/PSeeAllLink',
  component: PSeeAllLink,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Link label text' },
  },
  args: { label: 'See all' },
  decorators: [
    () => ({ template: '<div style="padding:20px;display:flex;justify-content:center;background:#fff"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof PSeeAllLink>

export const Default: Story = {
  name: 'Default — "See all" with right chevron',
  args: {},
  play: async ({ canvasElement }) => {
    // Click the button → $emit('click') (stmt line 2)
    const btn = canvasElement.querySelector<HTMLElement>('.psal')
    if (btn) await userEvent.click(btn)
  },
}

export const CustomLabel: Story = {
  name: 'Custom Label',
  args: { label: 'View all highlights' },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;display:flex;justify-content:center"><story /></div>' })],
  render: () => ({
    components: { PSeeAllLink },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <div style="display:flex;flex-direction:column;gap:12px">
          <PSeeAllLink label="See all" />
          <PSeeAllLink label="View all highlights" />
        </div>
      </div>
    `,
  }),
}
