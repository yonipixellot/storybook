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
