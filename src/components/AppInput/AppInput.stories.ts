import type { Meta, StoryObj } from '@storybook/vue3'
import AppInput from './AppInput.vue'

const meta: Meta<typeof AppInput> = {
  title: 'Inputs/AppInput',
  component: AppInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Form text field with floating label, helper text, and error messaging. Supports text, email, password (toggle visibility), and tel input types, plus readonly and disabled states.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel'],
    },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    placeholder: { control: 'text' },
    errorMsg: { control: 'text' },
    modelValue: { control: 'text' },
    defaultCountry: { control: 'text' },
  },
  decorators: [
    () => ({ template: '<div style="padding:20px"><story /></div>' }),
  ],
  args: {
    type: 'email',
    placeholder: 'Email Address...',
    error: false,
    disabled: false,
    readOnly: false,
  },
}

export default meta
type Story = StoryObj<typeof AppInput>

const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'
const stLabel = 'font-size:12px;color:#979797;text-align:center;margin-top:6px;font-family:Red Hat Display,sans-serif'

// ── Individual Stories ──

const singleDeco = () => ({ template: '<div style="max-width:400px"><story /></div>' })

export const Default: Story = {
  decorators: [singleDeco],
  args: { type: 'email', placeholder: 'Email Address...' },
}

export const Password: Story = {
  decorators: [singleDeco],
  args: { type: 'password', placeholder: 'Enter password...' },
}

export const WithError: Story = {
  decorators: [singleDeco],
  args: { type: 'email', placeholder: 'Email Address...', error: true, errorMsg: 'Please enter a valid email address' },
}

export const Disabled: Story = {
  decorators: [singleDeco],
  args: { type: 'email', placeholder: 'Email Address...', disabled: true },
}

export const ReadOnly: Story = {
  decorators: [singleDeco],
  args: { type: 'text', modelValue: 'user@example.com', readOnly: true },
}

export const Tel: Story = {
  decorators: [singleDeco],
  args: { type: 'tel', placeholder: 'Phone Number...', defaultCountry: 'IL' },
}

// ── Variants ──

export const Variants: Story = {
  render: () => ({
    components: { AppInput },
    template: `
      <div style="${box}">
        <p style="${title}">Variants</p>
        <hr style="${hr}" />
        <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
          <div>
            <p style="${label}">email</p>
            <AppInput type="email" placeholder="Email Address..." />
          </div>
          <div>
            <p style="${label}">password</p>
            <AppInput type="password" placeholder="Enter password..." />
          </div>
          <div>
            <p style="${label}">text</p>
            <AppInput type="text" placeholder="Full Name..." />
          </div>
          <div>
            <p style="${label}">tel</p>
            <AppInput type="tel" placeholder="Phone Number..." />
          </div>
        </div>
      </div>
    `,
  }),
}

// ── States — default / hover / focus / filled / disabled / readOnly ──

export const States: Story = {
  render: () => ({
    components: { AppInput },
    template: `
      <div style="${box}">
        <p style="${title}">States — default / hover / focus / filled / disabled / readOnly</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px">
          <div>
            <p style="${stLabel}">default</p>
            <AppInput type="email" placeholder="Email Address..." />
          </div>
          <div>
            <p style="${stLabel}">hover</p>
            <div style="position:relative;width:100%">
              <input
                type="email"
                placeholder="Email Address..."
                style="width:100%;height:46px;padding:4px 16px;font-family:Red Hat Display,sans-serif;font-size:16px;font-weight:400;color:#000;background:#C7CBD0;border:2px solid transparent;border-radius:20px;outline:none;box-sizing:border-box"
              />
            </div>
          </div>
          <div>
            <p style="${stLabel}">focus — blue border</p>
            <div style="position:relative;width:100%">
              <input
                type="email"
                placeholder="Email Address..."
                style="width:100%;height:46px;padding:4px 16px;font-family:Red Hat Display,sans-serif;font-size:16px;font-weight:400;color:#000;background:#EDEDED;border:2px solid #116DFF;border-radius:20px;outline:none;box-sizing:border-box"
              />
            </div>
          </div>
          <div>
            <p style="${stLabel}">filled</p>
            <AppInput type="email" modelValue="user@example.com" />
          </div>
          <div>
            <p style="${stLabel}">disabled</p>
            <AppInput type="email" placeholder="Email Address..." :disabled="true" />
          </div>
          <div>
            <p style="${stLabel}">readOnly</p>
            <AppInput type="text" modelValue="user@example.com" :readOnly="true" />
          </div>
        </div>
      </div>
    `,
  }),
}

// ── Error States ──

export const ErrorStates: Story = {
  render: () => ({
    components: { AppInput },
    template: `
      <div style="${box}">
        <p style="${title}">Error States</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px">
          <div>
            <p style="${stLabel}">error — red border</p>
            <AppInput type="email" placeholder="Email Address..." :error="true" />
          </div>
          <div>
            <p style="${stLabel}">error + message</p>
            <AppInput type="email" placeholder="Email Address..." :error="true" errorMsg="Please enter a valid email address" />
          </div>
          <div>
            <p style="${stLabel}">error + hover</p>
            <div style="position:relative;width:100%">
              <input
                type="email"
                placeholder="Email Address..."
                style="width:100%;height:46px;padding:4px 16px;font-family:Red Hat Display,sans-serif;font-size:16px;font-weight:400;color:#000;background:#C7CBD0;border:2px solid #EF4444;border-radius:20px;outline:none;box-sizing:border-box"
              />
            </div>
          </div>
          <div>
            <p style="${stLabel}">error + focus</p>
            <div style="position:relative;width:100%">
              <input
                type="email"
                placeholder="Email Address..."
                style="width:100%;height:46px;padding:4px 16px;font-family:Red Hat Display,sans-serif;font-size:16px;font-weight:400;color:#000;background:#EDEDED;border:2px solid #EF4444;border-radius:20px;outline:none;box-sizing:border-box"
              />
              <span style="font-family:Red Hat Display,sans-serif;font-size:12px;color:#EF4444;display:block;margin-top:4px;padding-left:16px">Please enter a valid email address</span>
            </div>
          </div>
          <div>
            <p style="${stLabel}">error + filled</p>
            <AppInput type="email" modelValue="bad-email" :error="true" errorMsg="Please enter a valid email address" />
          </div>
        </div>
      </div>
    `,
  }),
}

// ── Password + States ──

export const PasswordStates: Story = {
  render: () => ({
    components: { AppInput },
    template: `
      <div style="${box}">
        <p style="${title}">Password + States</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px">
          <div>
            <p style="${stLabel}">default</p>
            <AppInput type="password" placeholder="Enter password..." />
          </div>
          <div>
            <p style="${stLabel}">error + message</p>
            <AppInput type="password" placeholder="Enter password..." :error="true" errorMsg="Password must be at least 8 characters" />
          </div>
          <div>
            <p style="${stLabel}">disabled</p>
            <AppInput type="password" placeholder="Enter password..." :disabled="true" />
          </div>
        </div>
      </div>
    `,
  }),
}

// ── Tel + States ──

export const TelStates: Story = {
  render: () => ({
    components: { AppInput },
    template: `
      <div style="${box}">
        <p style="${title}">Tel + Country Selector</p>
        <p style="${label}">Phone input with searchable country code dropdown. Click the flag to open.</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px">
          <div>
            <p style="${stLabel}">default (Israel)</p>
            <AppInput type="tel" placeholder="Phone Number..." defaultCountry="IL" />
          </div>
          <div>
            <p style="${stLabel}">default (US)</p>
            <AppInput type="tel" placeholder="Phone Number..." defaultCountry="US" />
          </div>
          <div>
            <p style="${stLabel}">default (UK)</p>
            <AppInput type="tel" placeholder="Phone Number..." defaultCountry="GB" />
          </div>
          <div>
            <p style="${stLabel}">filled</p>
            <AppInput type="tel" modelValue="54-123-4567" defaultCountry="IL" />
          </div>
          <div>
            <p style="${stLabel}">error + message</p>
            <AppInput type="tel" placeholder="Phone Number..." defaultCountry="IL" :error="true" errorMsg="Please enter a valid phone number" />
          </div>
          <div>
            <p style="${stLabel}">disabled</p>
            <AppInput type="tel" placeholder="Phone Number..." defaultCountry="IL" :disabled="true" />
          </div>
        </div>
      </div>
    `,
  }),
}
