import type { Meta, StoryObj } from '@storybook/vue3'
import PSectionHeader from './PSectionHeader.vue'

const meta: Meta<typeof PSectionHeader> = {
  title: 'Avatars & List Items/PSectionHeader',
  component: PSectionHeader,
  tags: ['autodocs'],
  argTypes: {
    title:         { control: 'text',    description: 'Section heading text' },
    seeAll:        { control: 'boolean', description: 'Show "See all >" link button' },
    titleFontSize: { control: 'number',  description: 'Override font size in px (defaults to --text-base 16px)' },
  },
  args: { title: 'Latest Videos', seeAll: false },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:430px;background:#fff"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof PSectionHeader>

export const WithoutSeeAll: Story = {
  name: 'Without See All',
  args: { title: 'Latest Videos', seeAll: false },
}

export const WithSeeAll: Story = {
  name: 'With See All',
  args: { title: 'My Highlights', seeAll: true },
}

export const Variants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { PSectionHeader },
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;max-width:430px">
        <PSectionHeader title="Latest Videos" />
        <PSectionHeader title="My Highlights" :see-all="true" />
        <PSectionHeader title="Season Stats" :see-all="true" :title-font-size="14" />
      </div>
    `,
  }),
}
