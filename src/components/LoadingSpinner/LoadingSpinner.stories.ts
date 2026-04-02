import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent, h } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Loading States/LoadingSpinner',
  component: LoadingSpinner,
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
