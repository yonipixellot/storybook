import type { Meta, StoryObj } from '@storybook/vue3'
import AuthPage from './AuthPage.vue'

const meta: Meta<typeof AuthPage> = {
  title: 'Pages/AuthPage',
  component: AuthPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full authentication page with Sign In and Sign Up tabs. Includes BrandHero, form fields, and social login options.',
      },
    },
  },
  argTypes: {
    initialTab: {
      control: 'select',
      options: ['signin', 'signup'],
      description: 'Initial active tab',
    },
  },
}

export default meta
type Story = StoryObj<typeof AuthPage>

export const SignIn: Story = {
  args: {
    initialTab: 'signin',
  },
}

export const SignUp: Story = {
  args: {
    initialTab: 'signup',
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A"><story /></div>' })],
  args: {
    initialTab: 'signin',
  },
}
