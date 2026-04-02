import type { Meta, StoryObj } from '@storybook/vue3'
import AppBadge from './AppBadge.vue'

const meta: Meta<typeof AppBadge> = {
  title: 'Badges/AppBadge',
  component: AppBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['live', 'premium', 'free', 'claimed', 'highlights', 'new'],
    },
    size: {
      control: 'select',
      options: ['md', 'sm'],
    },
    ariaLabel: { control: 'text' },
  },
  args: {
    variant: 'live',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof AppBadge>

const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'
const stLabel = 'font-size:12px;color:#979797;text-align:center;margin-top:6px;font-family:Red Hat Display,sans-serif'

// ── Individual Variants ──

export const Live: Story = {
  args: { variant: 'live' },
}

export const Premium: Story = {
  args: { variant: 'premium' },
}

export const Free: Story = {
  args: { variant: 'free' },
}

export const Claimed: Story = {
  args: { variant: 'claimed' },
}

export const Highlights: Story = {
  args: { variant: 'highlights' },
}

export const New: Story = {
  args: { variant: 'new' },
}

// ── All Variants ──

export const AllVariants: Story = {
  render: () => ({
    components: { AppBadge },
    template: `
      <div style="${box}">
        <p style="${title}">All Variants</p>
        <hr style="${hr}" />
        <div style="display:flex;gap:16px;align-items:flex-start">
          <div style="text-align:center">
            <AppBadge variant="live" />
            <p style="${stLabel}">live</p>
          </div>
          <div style="text-align:center">
            <AppBadge variant="premium" />
            <p style="${stLabel}">premium</p>
          </div>
          <div style="text-align:center">
            <AppBadge variant="free" />
            <p style="${stLabel}">free</p>
          </div>
          <div style="text-align:center">
            <AppBadge variant="claimed" />
            <p style="${stLabel}">claimed</p>
          </div>
          <div style="text-align:center">
            <AppBadge variant="highlights" />
            <p style="${stLabel}">highlights</p>
          </div>
          <div style="text-align:center">
            <AppBadge variant="new" />
            <p style="${stLabel}">new</p>
          </div>
        </div>
      </div>
    `,
  }),
}

// ── Size Comparison ──

export const SizeComparison: Story = {
  render: () => ({
    components: { AppBadge },
    template: `
      <div style="${box}">
        <p style="${title}">Size Comparison — md / sm</p>
        <hr style="${hr}" />
        <p style="${label}">md (default)</p>
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:20px">
          <AppBadge variant="live" size="md" />
          <AppBadge variant="premium" size="md" />
          <AppBadge variant="free" size="md" />
          <AppBadge variant="claimed" size="md" />
          <AppBadge variant="highlights" size="md" />
          <AppBadge variant="new" size="md" />
        </div>
        <p style="${label}">sm</p>
        <div style="display:flex;gap:12px;align-items:center">
          <AppBadge variant="live" size="sm" />
          <AppBadge variant="premium" size="sm" />
          <AppBadge variant="free" size="sm" />
          <AppBadge variant="claimed" size="sm" />
          <AppBadge variant="highlights" size="sm" />
          <AppBadge variant="new" size="sm" />
        </div>
      </div>
    `,
  }),
}
