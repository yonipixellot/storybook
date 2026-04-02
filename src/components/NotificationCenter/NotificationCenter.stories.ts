import type { Meta, StoryObj } from '@storybook/vue3'
import NotificationCenter from './NotificationCenter.vue'

const meta: Meta<typeof NotificationCenter> = {
  title: 'Layout & Overlays/NotificationCenter',
  component: NotificationCenter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dropdown panel listing highlight-ready notifications. Each item shows a jersey icon with the player number alongside the notification text. Supports a "Clear all" action.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof NotificationCenter>

export const Default: Story = {
  name: 'Three Notifications (default)',
  args: {},
}

export const SingleNotification: Story = {
  name: 'Single Notification',
  args: {
    notifications: [
      {
        jerseyNumber: 7,
        text: '"Player #7 Highlight" from the game "Riverside Mustangs vs. Harbor Hawks (98-82, Mar 15, 2026)" is now ready!',
      },
    ],
  },
}

export const Empty: Story = {
  name: 'Empty State',
  args: {
    notifications: [],
  },
}

export const ManyNotifications: Story = {
  name: 'Many Notifications (scrollable)',
  args: {
    notifications: [
      { jerseyNumber: 4,  text: '"Player #4 Highlight" is now ready!' },
      { jerseyNumber: 11, text: '"Player #11 Highlight" is now ready!' },
      { jerseyNumber: 7,  text: '"Player #7 Highlight" is now ready!' },
      { jerseyNumber: 23, text: '"Player #23 Highlight" is now ready!' },
      { jerseyNumber: 1,  text: '"Player #1 Highlight" is now ready!' },
      { jerseyNumber: 15, text: '"Player #15 Highlight" is now ready!' },
    ],
  },
}
