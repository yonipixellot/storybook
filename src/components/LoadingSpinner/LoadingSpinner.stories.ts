import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent, h } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Loading States/LoadingSpinner',
  component: LoadingSpinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Spinning loader indicator. Adapts border-width to size prop. Uses `--color-primary` for the active arc.',
      },
    },
  },
  argTypes: {
    size: { control: { type: 'range', min: 16, max: 80, step: 4 } },
  },
}

export default meta
type Story = StoryObj<typeof LoadingSpinner>

export const Default: Story = {
  args: {
    size:  24,
    label: 'Loading…',
  },
}

export const Small: Story = {
  args: { size: 16, label: 'Loading…' },
}

export const Medium: Story = {
  args: { size: 40, label: 'Loading…' },
}

export const Large: Story = {
  args: { size: 64, label: 'Loading…' },
}

export const SizeComparison: Story = {
  render: () => defineComponent({
    setup() {
      return () => h('div', {
        style: 'display:flex; align-items:center; gap:24px; padding:24px;',
      }, [16, 24, 40, 64].map(size =>
        h('div', { style: 'display:flex; flex-direction:column; align-items:center; gap:8px;' }, [
          h(LoadingSpinner, { size }),
          h('span', { style: 'font-size:11px; color:#979797; font-family:sans-serif;' }, `${size}px`),
        ])
      ))
    },
  }),
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { LoadingSpinner },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <div style="display:flex;align-items:center;gap:24px">
          <div style="text-align:center">
            <LoadingSpinner :size="16" />
            <p style="font-size:11px;color:#888;margin:6px 0 0;font-family:sans-serif">16px</p>
          </div>
          <div style="text-align:center">
            <LoadingSpinner :size="24" />
            <p style="font-size:11px;color:#888;margin:6px 0 0;font-family:sans-serif">24px</p>
          </div>
          <div style="text-align:center">
            <LoadingSpinner :size="40" />
            <p style="font-size:11px;color:#888;margin:6px 0 0;font-family:sans-serif">40px</p>
          </div>
          <div style="text-align:center">
            <LoadingSpinner :size="64" />
            <p style="font-size:11px;color:#888;margin:6px 0 0;font-family:sans-serif">64px</p>
          </div>
        </div>
      </div>
    `,
  }),
}
