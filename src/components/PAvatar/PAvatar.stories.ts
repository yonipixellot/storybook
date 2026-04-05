import type { Meta, StoryObj } from '@storybook/vue3'
import PAvatar from './PAvatar.vue'

const meta: Meta<typeof PAvatar> = {
  title: 'Avatars & List Items/PAvatar',
  component: PAvatar,
  tags: ['autodocs'],
  argTypes: {
    initials: { control: 'text', description: 'User initials (1-2 characters)' },
    size:     { control: { type: 'range', min: 24, max: 96 }, description: 'Circle diameter in px' },
  },
  args: { initials: 'BR', size: 40 },
  decorators: [
    () => ({ template: '<div style="padding:20px;background:#fff"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof PAvatar>

export const Default: Story = {
  name: 'Default — Gray circle with initials',
  args: {},
}

export const Sizes: Story = {
  name: 'Size Variants',
  render: () => ({
    components: { PAvatar },
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <PAvatar initials="BR" :size="24" />
        <PAvatar initials="BR" :size="32" />
        <PAvatar initials="BR" :size="40" />
        <PAvatar initials="BR" :size="48" />
        <PAvatar initials="YL" :size="56" />
      </div>
    `,
  }),
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { PAvatar },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <div style="display:flex;gap:16px;align-items:center">
          <PAvatar initials="BR" :size="32" />
          <PAvatar initials="YL" :size="40" />
          <PAvatar initials="AB" :size="48" />
        </div>
      </div>
    `,
  }),
}
