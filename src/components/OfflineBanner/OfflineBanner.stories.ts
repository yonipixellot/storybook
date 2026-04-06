import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const retryBtn = canvas.getByRole('button', { name: /retry connection/i })
    await expect(retryBtn).toBeVisible()
    await userEvent.click(retryBtn) // exercises $emit('retry')
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:430px"><story /></div>' })],
  render: () => ({
    components: { OfflineBanner },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <OfflineBanner />
      </div>
    `,
  }),
}
