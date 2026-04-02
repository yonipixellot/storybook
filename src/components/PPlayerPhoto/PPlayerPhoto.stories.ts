import type { Meta, StoryObj } from '@storybook/vue3'
import PPlayerPhoto from './PPlayerPhoto.vue'

const meta: Meta<typeof PPlayerPhoto> = {
  title: 'Avatars & List Items/PPlayerPhoto',
  component: PPlayerPhoto,
  tags: ['autodocs'],
  argTypes: {
    size:     { control: { type: 'range', min: 24, max: 120 }, description: 'Circle diameter in px' },
    name:     { control: 'text', description: 'Player name (used for alt text)' },
    photoUrl: { control: 'text', description: 'Photo URL — shows User silhouette placeholder if omitted or broken' },
  },
  args: { size: 48, name: 'Tal Weiss' },
  decorators: [
    () => ({ template: '<div style="padding:20px;background:#fff"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof PPlayerPhoto>

export const Placeholder: Story = {
  name: 'Placeholder (no photo)',
  args: {},
}

export const WithPhoto: Story = {
  name: 'With Photo URL',
  args: { photoUrl: 'https://i.pravatar.cc/150?img=11' },
}

export const Sizes: Story = {
  name: 'Size Variants',
  render: () => ({
    components: { PPlayerPhoto },
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <PPlayerPhoto :size="32" />
        <PPlayerPhoto :size="40" />
        <PPlayerPhoto :size="48" />
        <PPlayerPhoto :size="64" />
        <PPlayerPhoto :size="80" photoUrl="https://i.pravatar.cc/150?img=11" />
      </div>
    `,
  }),
}
