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

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { PPlayerPhoto },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <div style="display:flex;gap:16px;align-items:center">
          <PPlayerPhoto :size="40" />
          <PPlayerPhoto :size="48" />
          <PPlayerPhoto :size="64" photoUrl="https://i.pravatar.cc/150?img=11" />
        </div>
      </div>
    `,
  }),
}
