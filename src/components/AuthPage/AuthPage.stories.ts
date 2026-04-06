import type { Meta, StoryObj } from '@storybook/vue3'
import { userEvent, within } from 'storybook/test'
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click Sign in button → $emit('signIn') (line 28)
    await userEvent.click(canvas.getByRole('button', { name: /^sign in$/i }))
    // Click Forgot password link → $emit('forgotPassword') (line 30)
    await userEvent.click(canvas.getByRole('link', { name: /forgot password/i }))
    // Click Continue with Apple → $emit('continueWithApple') (line 39)
    const appleBtn = canvasElement.querySelectorAll<HTMLElement>('button[class*="social"], button.app-button--social')
    const btns = canvas.getAllByRole('button', { name: /continue with/i })
    if (btns.length >= 1) await userEvent.click(btns[0]) // Continue with Apple (line 39)
    if (btns.length >= 2) await userEvent.click(btns[1]) // Continue with Google (line 45)
  },
}

export const SignUp: Story = {
  args: {
    initialTab: 'signup',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click Create Account button → $emit('createAccount') (line 67)
    await userEvent.click(canvas.getByRole('button', { name: /create account/i }))
    // Click Continue with Apple / Google (lines 73, 79)
    const btns = canvas.getAllByRole('button', { name: /continue with/i })
    if (btns.length >= 1) await userEvent.click(btns[0])
    if (btns.length >= 2) await userEvent.click(btns[1])
    // Click 'Sign in' link inside sign-up form → activeTab = 'signin' (line 90)
    const signInLink = canvas.getByRole('link', { name: /sign in/i })
    await userEvent.click(signInLink)
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A"><story /></div>' })],
  args: {
    initialTab: 'signin',
  },
}
