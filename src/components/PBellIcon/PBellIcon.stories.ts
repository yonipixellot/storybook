import type { Meta, StoryObj } from '@storybook/vue3'
import PBellIcon from './PBellIcon.vue'

const meta: Meta<typeof PBellIcon> = {
  title: 'Avatars & List Items/PBellIcon',
  component: PBellIcon,
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'number', min: 0, max: 99 }, description: 'Notification count (0 = no badge)' },
  },
  args: { count: 0 },
  decorators: [
    () => ({ template: '<div style="padding:24px;background:#fff"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof PBellIcon>

export const NoBadge: Story = {
  name: 'No Badge (count = 0)',
  args: { count: 0 },
}

export const WithBadge: Story = {
  name: 'With Badge (count > 0)',
  args: { count: 3 },
}

export const States: Story = {
  name: 'States — No badge / With count',
  render: () => ({
    components: { PBellIcon },
    template: `
      <div style="display:flex;gap:32px;align-items:center">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
          <PBellIcon :count="0" />
          <span style="font-family:Red Hat Display,sans-serif;font-size:11px;color:#979797">No badge</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
          <PBellIcon :count="3" />
          <span style="font-family:Red Hat Display,sans-serif;font-size:11px;color:#979797">count = 3</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
          <PBellIcon :count="12" />
          <span style="font-family:Red Hat Display,sans-serif;font-size:11px;color:#979797">count = 12</span>
        </div>
      </div>
    `,
  }),
}
