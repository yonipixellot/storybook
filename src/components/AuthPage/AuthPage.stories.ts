import type { Meta, StoryObj } from '@storybook/vue3'
import AuthPage from './AuthPage.vue'

const meta: Meta<typeof AuthPage> = {
  title: 'Pages/AuthPage',
  component: AuthPage,
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
