import type { Meta, StoryObj } from '@storybook/vue3'
import OfflineBanner from './OfflineBanner.vue'

const meta: Meta<typeof OfflineBanner> = {
  title: 'Empty & Error States/OfflineBanner',
  component: OfflineBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Persistent top banner shown when the device loses network connectivity. Red dot + offline message + Retry button.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof OfflineBanner>

export const Default: Story = {
  name: 'Offline Banner',
  args: {},
}
