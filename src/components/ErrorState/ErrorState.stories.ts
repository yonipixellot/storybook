import type { Meta, StoryObj } from '@storybook/vue3'
import ErrorState from './ErrorState.vue'

const meta: Meta<typeof ErrorState> = {
  title: 'Empty & Error States/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '6 error variants — each with contextual title, subtitle, and appropriate CTA. "auth" variant shows a primary "Sign In" button; all others show a muted "Try Again" button.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['generic', 'network', 'timeout', 'video', 'data', 'auth'],
    },
    title:    { control: 'text' },
    subtitle: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ErrorState>

export const Generic: Story = {
  args: { variant: 'generic' },
}

export const Network: Story = {
  args: { variant: 'network' },
}

export const Timeout: Story = {
  args: { variant: 'timeout' },
}

export const Video: Story = {
  args: { variant: 'video' },
}

export const Data: Story = {
  args: { variant: 'data' },
}

export const Auth: Story = {
  name: 'Auth (Session Expired)',
  args: { variant: 'auth' },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { ErrorState },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <p style="font-size:13px;color:#888;margin:0 0 16px;font-family:Red Hat Display,sans-serif">Icon bg red-tint, title #E8E8E8, subtitle gray, CTA bg #262626</p>
        <hr style="border:none;border-top:1px solid #444;margin:0 0 24px" />
        <div style="display:flex;flex-direction:column;gap:24px">
          <ErrorState variant="generic" />
          <ErrorState variant="auth" />
        </div>
      </div>
    `,
  }),
}
