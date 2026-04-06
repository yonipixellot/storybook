import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import Toast from './Toast.vue'

const meta: Meta<typeof Toast> = {
  title: 'Feedback / Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      description: 'Visual style — maps to success/error/warning/info semantic colors',
    },
    message:     { control: 'text' },
    dismissible: { control: 'boolean' },
    duration: {
      control: 'number',
      description: 'Auto-dismiss delay in ms. 0 = persistent.',
    },
  },
  args: {
    message:     'Action completed successfully.',
    variant:     'success',
    dismissible: true,
    duration:    0,
    modelValue:  true,
  },
}
export default meta
type Story = StoryObj<typeof Toast>

const col = 'display:flex;flex-direction:column;align-items:flex-start;gap:12px;padding:28px 32px'

// ── All Variants ──────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { Toast },
    template: `
      <div style="${col}">
        <Toast variant="success" message="Profile saved successfully."               :dismissible="true" :duration="0" :model-value="true" />
        <Toast variant="error"   message="Something went wrong. Please try again."   :dismissible="true" :duration="0" :model-value="true" />
        <Toast variant="warning" message="Your session is about to expire."          :dismissible="true" :duration="0" :model-value="true" />
        <Toast variant="info"    message="New highlights are available for this game." :dismissible="true" :duration="0" :model-value="true" />
      </div>
    `,
  }),
}

// ── Individual variants ───────────────────────────────────
export const Success: Story = {
  args: { variant: 'success', message: 'Profile saved successfully.' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const dismissBtn = canvas.getByRole('button', { name: /dismiss notification/i })
    await expect(dismissBtn).toBeVisible()
    await userEvent.click(dismissBtn) // exercises dismiss(), update:modelValue, clearTimer()
  },
}

// Exercises startTimer() setTimeout path (duration > 0, line 76)
export const AutoDismiss: Story = {
  name: 'Auto-dismiss (50ms)',
  args: { variant: 'info', message: 'Auto-dismissing…', dismissible: false, duration: 50 },
  play: async () => {
    // Wait long enough for the 50ms timer to fire → exercises timer = setTimeout(dismiss, duration)
    await new Promise(resolve => setTimeout(resolve, 100))
  },
}

export const Error: Story = {
  args: { variant: 'error', message: 'Something went wrong. Please try again.' },
}

export const Warning: Story = {
  args: { variant: 'warning', message: 'Your session is about to expire.' },
}

export const Info: Story = {
  args: { variant: 'info', message: 'New highlights are available for this game.' },
}

// ── No dismiss button ─────────────────────────────────────
export const NoDismiss: Story = {
  name: 'No Dismiss Button',
  args: {
    variant:     'info',
    message:     'Syncing your highlights…',
    dismissible: false,
    duration:    0,
  },
}

// ── Long message ──────────────────────────────────────────
export const LongMessage: Story = {
  name: 'Long Message',
  args: {
    variant: 'success',
    message: 'Player #4 highlight from "S.D Spartans vs. Logan Thunder" is now ready to view.',
    dismissible: true,
    duration:    0,
  },
}

// ── Interactive trigger ───────────────────────────────────
export const Interactive: Story = {
  render: () => ({
    components: { Toast },
    data() {
      return { show: false, variant: 'success' as const }
    },
    methods: {
      trigger(v: string) {
        this.variant = v as 'success' | 'error' | 'warning' | 'info'
        this.show = true
      },
    },
    template: `
      <div style="padding:28px 32px;display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button @click="trigger('success')" style="padding:8px 16px;background:#22C55E;color:#fff;border:none;border-radius:20px;cursor:pointer;font-size:14px">Success</button>
          <button @click="trigger('error')"   style="padding:8px 16px;background:#EF4444;color:#fff;border:none;border-radius:20px;cursor:pointer;font-size:14px">Error</button>
          <button @click="trigger('warning')" style="padding:8px 16px;background:#F59E0B;color:#fff;border:none;border-radius:20px;cursor:pointer;font-size:14px">Warning</button>
          <button @click="trigger('info')"    style="padding:8px 16px;background:#116DFF;color:#fff;border:none;border-radius:20px;cursor:pointer;font-size:14px">Info</button>
        </div>
        <Toast
          :variant="variant"
          message="Action completed."
          :dismissible="true"
          :duration="3000"
          v-model="show"
        />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click Success — sets show=true → watch fires with val=true → startTimer() called (line 63 true branch)
    const successBtn = canvas.getByRole('button', { name: /^success$/i })
    await userEvent.click(successBtn)
    // Dismiss the toast — calls dismiss() → emits update:modelValue(false) → watch fires with val=false (line 63 false branch)
    const dismissBtn = await canvas.findByRole('button', { name: /dismiss notification/i })
    await userEvent.click(dismissBtn)
    // Click again to trigger watch once more (val=true path confirming startTimer)
    await userEvent.click(successBtn)
  },
}

// ── Dark Mode ─────────────────────────────────────────────
export const DarkMode: Story = {
  name: 'Dark Mode',
  render: () => ({
    components: { Toast },
    template: `
      <div data-theme="dark" style="background:#1A1A1A;border-radius:16px;${col}">
        <Toast variant="success" message="Profile saved successfully."               :dismissible="true" :duration="0" :model-value="true" />
        <Toast variant="error"   message="Something went wrong. Please try again."   :dismissible="true" :duration="0" :model-value="true" />
        <Toast variant="warning" message="Your session is about to expire."          :dismissible="true" :duration="0" :model-value="true" />
        <Toast variant="info"    message="New highlights are available for this game." :dismissible="true" :duration="0" :model-value="true" />
      </div>
    `,
  }),
}
