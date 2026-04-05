import type { Meta, StoryObj } from '@storybook/vue3'
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
