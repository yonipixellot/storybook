import type { Meta, StoryObj } from '@storybook/vue3'
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
}

export const CustomLabel: Story = {
  name: 'Custom Label',
  args: { label: 'View all highlights' },
}
