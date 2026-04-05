import type { Meta, StoryObj } from '@storybook/vue3'
import { h, defineComponent } from 'vue'
import AppButton from './AppButton.vue'

const meta: Meta<typeof AppButton> = {
  title: 'Atoms/AppButton',
  component: AppButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Core action button with 8 variants (primary, premium, social, muted, ghost, link, danger, action) and 3 sizes (sm, md, lg). Supports leading/trailing icon slots, loading state, and full-width layout.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'premium', 'social', 'muted', 'ghost', 'link', 'danger', 'action'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled:  { control: 'boolean' },
    loading:   { control: 'boolean' },
    iconOnly:  { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    onClick:   { action: 'clicked' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    iconOnly: false,
    fullWidth: false,
  },
}

export default meta
type Story = StoryObj<typeof AppButton>

/* ── Icon components ── */

const PlayIcon = defineComponent({
  template: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>'
})
const ChevronIcon = defineComponent({
  template: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'
})
const AppleIcon = defineComponent({
  template: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>'
})
const GoogleIcon = defineComponent({
  template: '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>'
})
const CloseIcon = defineComponent({
  template: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
})
const CheckIcon = defineComponent({
  template: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>'
})

const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'
const stLabel = 'font-size:12px;color:#979797;text-align:center;margin-top:6px;font-family:Red Hat Display,sans-serif'

// ── Individual Variants ──

export const Primary: Story = {
  args: { variant: 'primary' },
  render: (args) => ({
    components: { AppButton },
    setup: () => ({ args }),
    template: '<AppButton v-bind="args">Sign in</AppButton>',
  }),
}

export const Premium: Story = {
  args: { variant: 'premium' },
  render: (args) => ({
    components: { AppButton },
    setup: () => ({ args }),
    template: '<AppButton v-bind="args">Buy Now</AppButton>',
  }),
}

export const Social: Story = {
  args: { variant: 'social' },
  render: (args) => ({
    components: { AppButton, AppleIcon },
    setup: () => ({ args }),
    template: '<AppButton v-bind="args"><template #leading><AppleIcon/></template>Continue with Apple</AppButton>',
  }),
}

export const Muted: Story = {
  args: { variant: 'muted' },
  render: (args) => ({
    components: { AppButton, ChevronIcon },
    setup: () => ({ args }),
    template: '<AppButton v-bind="args">See All<template #trailing><ChevronIcon/></template></AppButton>',
  }),
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: (args) => ({
    components: { AppButton },
    setup: () => ({ args }),
    template: '<AppButton v-bind="args">Ghost</AppButton>',
  }),
}

export const Link: Story = {
  args: { variant: 'link' },
  render: (args) => ({
    components: { AppButton },
    setup: () => ({ args }),
    template: '<AppButton v-bind="args">See all &gt;</AppButton>',
  }),
}

export const Danger: Story = {
  args: { variant: 'danger' },
  render: (args) => ({
    components: { AppButton },
    setup: () => ({ args }),
    template: '<AppButton v-bind="args">Log Out</AppButton>',
  }),
}

export const Action: Story = {
  args: { variant: 'action' },
  render: (args) => ({
    components: { AppButton, PlayIcon },
    setup: () => ({ args }),
    template: '<AppButton v-bind="args"><template #leading><PlayIcon/></template>Watch Showreel</AppButton>',
  }),
}

// ── All Variants — md (default) ──

export const AllVariants: Story = {
  render: () => ({
    components: { AppButton, AppleIcon, GoogleIcon, ChevronIcon, PlayIcon },
    template: `
      <div style="${box}">
        <p style="${title}">All Variants — md (default)</p>
        <hr style="${hr}" />
        <p style="${label}">primary</p>
        <AppButton variant="primary" :full-width="true" style="max-width:400px">Sign in</AppButton>
        <p style="${label};margin-top:20px">premium</p>
        <AppButton variant="premium" :full-width="true" style="max-width:400px">Buy Now</AppButton>
        <p style="${label};margin-top:20px">social</p>
        <AppButton variant="social" :full-width="true" style="max-width:400px"><template #leading><AppleIcon/></template>Continue with Apple</AppButton>
        <div style="height:8px"></div>
        <AppButton variant="social" :full-width="true" style="max-width:400px"><template #leading><GoogleIcon/></template>Continue with Google</AppButton>
        <p style="${label};margin-top:20px">muted</p>
        <AppButton variant="muted" :full-width="true" style="max-width:400px">See All<template #trailing><ChevronIcon/></template></AppButton>
        <p style="${label};margin-top:20px">ghost</p>
        <AppButton variant="ghost">Ghost</AppButton>
        <p style="${label};margin-top:20px">link</p>
        <AppButton variant="link">See all &gt;</AppButton>
        <p style="${label};margin-top:20px">danger</p>
        <AppButton variant="danger">Log Out</AppButton>
        <p style="${label};margin-top:20px">action</p>
        <AppButton variant="action" :full-width="true" style="max-width:400px"><template #leading><PlayIcon/></template>Watch Showreel</AppButton>
      </div>
    `,
  }),
}

// ── Action Variant (detailed) ──

export const ActionVariant: Story = {
  render: () => ({
    components: { AppButton, PlayIcon, ChevronIcon },
    template: `
      <div style="${box}">
        <p style="${title}">Action Variant</p>
        <hr style="${hr}" />
        <p style="${label}">no icon</p>
        <AppButton variant="action" :full-width="true" style="max-width:400px">Watch Showreel</AppButton>
        <p style="${label};margin-top:20px">leading icon</p>
        <AppButton variant="action" :full-width="true" style="max-width:400px"><template #leading><PlayIcon/></template>Watch Showreel</AppButton>
        <p style="${label};margin-top:20px">trailing icon</p>
        <AppButton variant="action" :full-width="true" style="max-width:400px">See More<template #trailing><ChevronIcon/></template></AppButton>
        <p style="${label};margin-top:20px">full width</p>
        <AppButton variant="action" :full-width="true" style="max-width:400px"><template #leading><PlayIcon/></template>Watch Showreel</AppButton>
        <p style="${label};margin-top:24px">states</p>
        <div style="display:flex;gap:16px;align-items:flex-start">
          <div style="text-align:center"><AppButton variant="action" size="sm"><template #leading><PlayIcon/></template>Watch</AppButton><p style="${stLabel}">default</p></div>
          <div style="text-align:center"><AppButton variant="action" size="sm" style="background:#0D5AD4"><template #leading><PlayIcon/></template>Watch</AppButton><p style="${stLabel}">hover</p></div>
          <div style="text-align:center"><AppButton variant="action" size="sm" style="background:#0A4AB0"><template #leading><PlayIcon/></template>Watch</AppButton><p style="${stLabel}">pressed</p></div>
          <div style="text-align:center"><AppButton variant="action" size="sm" :disabled="true"><template #leading><PlayIcon/></template>Watch</AppButton><p style="${stLabel}">disabled</p></div>
        </div>
      </div>
    `,
  }),
}

// ── States — all variants ──

export const States: Story = {
  render: () => ({
    components: { AppButton, PlayIcon },
    template: `
      <div style="${box}">
        <p style="${title}">States</p>
        <hr style="${hr}" />

        <p style="${label}">primary</p>
        <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:24px">
          <div style="text-align:center"><AppButton variant="primary" size="sm">Sign in</AppButton><p style="${stLabel}">default</p></div>
          <div style="text-align:center"><AppButton variant="primary" size="sm" style="background:#0D5AD4">Sign in</AppButton><p style="${stLabel}">hover</p></div>
          <div style="text-align:center"><AppButton variant="primary" size="sm" style="background:#0A4AB0">Sign in</AppButton><p style="${stLabel}">pressed</p></div>
          <div style="text-align:center"><AppButton variant="primary" size="sm" :disabled="true">Sign in</AppButton><p style="${stLabel}">disabled</p></div>
        </div>

        <p style="${label}">premium</p>
        <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:24px">
          <div style="text-align:center"><AppButton variant="premium" size="sm">Buy</AppButton><p style="${stLabel}">default</p></div>
          <div style="text-align:center"><AppButton variant="premium" size="sm" style="background:#D4A800">Buy</AppButton><p style="${stLabel}">hover</p></div>
          <div style="text-align:center"><AppButton variant="premium" size="sm" style="background:#B89200">Buy</AppButton><p style="${stLabel}">pressed</p></div>
          <div style="text-align:center"><AppButton variant="premium" size="sm" :disabled="true">Buy</AppButton><p style="${stLabel}">disabled</p></div>
        </div>

        <p style="${label}">social</p>
        <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:24px">
          <div style="text-align:center"><AppButton variant="social" size="sm">Apple</AppButton><p style="${stLabel}">default</p></div>
          <div style="text-align:center"><AppButton variant="social" size="sm" style="background:#E8E8E8">Apple</AppButton><p style="${stLabel}">hover</p></div>
          <div style="text-align:center"><AppButton variant="social" size="sm" style="background:#D0D0D0">Apple</AppButton><p style="${stLabel}">pressed</p></div>
          <div style="text-align:center"><AppButton variant="social" size="sm" :disabled="true">Apple</AppButton><p style="${stLabel}">disabled</p></div>
        </div>

        <p style="${label}">muted</p>
        <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:24px">
          <div style="text-align:center"><AppButton variant="muted" size="sm">See All</AppButton><p style="${stLabel}">default</p></div>
          <div style="text-align:center"><AppButton variant="muted" size="sm" style="background:#E0E0E0">See All</AppButton><p style="${stLabel}">hover</p></div>
          <div style="text-align:center"><AppButton variant="muted" size="sm" style="background:#D0D0D0">See All</AppButton><p style="${stLabel}">pressed</p></div>
          <div style="text-align:center"><AppButton variant="muted" size="sm" :disabled="true">See All</AppButton><p style="${stLabel}">disabled</p></div>
        </div>

        <p style="${label}">ghost</p>
        <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:24px">
          <div style="text-align:center"><AppButton variant="ghost" size="sm">Ghost</AppButton><p style="${stLabel}">default</p></div>
          <div style="text-align:center"><AppButton variant="ghost" size="sm" style="background:#F0F0F0">Ghost</AppButton><p style="${stLabel}">hover</p></div>
          <div style="text-align:center"><AppButton variant="ghost" size="sm" style="background:#E0E0E0">Ghost</AppButton><p style="${stLabel}">pressed</p></div>
          <div style="text-align:center"><AppButton variant="ghost" size="sm" :disabled="true">Ghost</AppButton><p style="${stLabel}">disabled</p></div>
        </div>

        <p style="${label}">link</p>
        <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:24px">
          <div style="text-align:center"><AppButton variant="link" size="sm">Link</AppButton><p style="${stLabel}">default</p></div>
          <div style="text-align:center"><AppButton variant="link" size="sm" style="opacity:0.7">Link</AppButton><p style="${stLabel}">hover</p></div>
          <div style="text-align:center"><AppButton variant="link" size="sm" style="opacity:0.5">Link</AppButton><p style="${stLabel}">pressed</p></div>
          <div style="text-align:center"><AppButton variant="link" size="sm" :disabled="true">Link</AppButton><p style="${stLabel}">disabled</p></div>
        </div>

        <p style="${label}">danger</p>
        <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:24px">
          <div style="text-align:center"><AppButton variant="danger" size="sm">Log Out</AppButton><p style="${stLabel}">default</p></div>
          <div style="text-align:center"><AppButton variant="danger" size="sm" style="background:rgba(239,68,68,0.08)">Log Out</AppButton><p style="${stLabel}">hover</p></div>
          <div style="text-align:center"><AppButton variant="danger" size="sm" style="background:rgba(239,68,68,0.15)">Log Out</AppButton><p style="${stLabel}">pressed</p></div>
          <div style="text-align:center"><AppButton variant="danger" size="sm" :disabled="true">Log Out</AppButton><p style="${stLabel}">disabled</p></div>
        </div>

        <p style="${label}">action</p>
        <div style="display:flex;gap:16px;align-items:flex-start">
          <div style="text-align:center"><AppButton variant="action" size="sm"><template #leading><PlayIcon/></template>Watch</AppButton><p style="${stLabel}">default</p></div>
          <div style="text-align:center"><AppButton variant="action" size="sm" style="background:#0D5AD4"><template #leading><PlayIcon/></template>Watch</AppButton><p style="${stLabel}">hover</p></div>
          <div style="text-align:center"><AppButton variant="action" size="sm" style="background:#0A4AB0"><template #leading><PlayIcon/></template>Watch</AppButton><p style="${stLabel}">pressed</p></div>
          <div style="text-align:center"><AppButton variant="action" size="sm" :disabled="true"><template #leading><PlayIcon/></template>Watch</AppButton><p style="${stLabel}">disabled</p></div>
        </div>
      </div>
    `,
  }),
}

// ── Size Comparison — sm / md / lg ──

export const SizeComparison: Story = {
  render: () => ({
    components: { AppButton },
    template: `
      <div style="${box}">
        <p style="${title}">Size Comparison — sm / md / lg</p>
        <hr style="${hr}" />
        <p style="${label}">primary</p>
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:24px">
          <AppButton variant="primary" size="sm">Small</AppButton>
          <AppButton variant="primary" size="md">Medium</AppButton>
          <AppButton variant="primary" size="lg">Large</AppButton>
        </div>
        <p style="${label}">premium</p>
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:24px">
          <AppButton variant="premium" size="sm">Small</AppButton>
          <AppButton variant="premium" size="md">Medium</AppButton>
          <AppButton variant="premium" size="lg">Large</AppButton>
        </div>
        <p style="${label}">social</p>
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:24px">
          <AppButton variant="social" size="sm">Apple</AppButton>
          <AppButton variant="social" size="md">Apple</AppButton>
          <AppButton variant="social" size="lg">Apple</AppButton>
        </div>
        <p style="${label}">muted</p>
        <div style="display:flex;gap:16px;align-items:center">
          <AppButton variant="muted" size="sm">See All</AppButton>
          <AppButton variant="muted" size="md">See All</AppButton>
          <AppButton variant="muted" size="lg">See All</AppButton>
        </div>
      </div>
    `,
  }),
}

// ── With Icons ──

export const WithIcons: Story = {
  render: () => ({
    components: { AppButton, AppleIcon, ChevronIcon, CloseIcon, PlayIcon, CheckIcon },
    template: `
      <div style="${box}">
        <p style="${title}">With Icons</p>
        <hr style="${hr}" />
        <p style="${label}">leading icon</p>
        <AppButton variant="social" :full-width="true" style="max-width:400px"><template #leading><AppleIcon/></template>Continue with Apple</AppButton>
        <p style="${label};margin-top:20px">trailing icon</p>
        <AppButton variant="muted" :full-width="true" style="max-width:400px">See All<template #trailing><ChevronIcon/></template></AppButton>
        <p style="${label};margin-top:20px">icon only</p>
        <div style="display:flex;gap:12px;align-items:center">
          <AppButton variant="ghost" :icon-only="true" aria-label="Close"><template #leading><CloseIcon/></template></AppButton>
          <AppButton variant="muted" :icon-only="true" aria-label="Play"><template #leading><PlayIcon/></template></AppButton>
          <AppButton variant="primary" :icon-only="true" aria-label="Check"><template #leading><CheckIcon/></template></AppButton>
        </div>
      </div>
    `,
  }),
}

// ── Width Modes ──

export const WidthModes: Story = {
  render: () => ({
    components: { AppButton },
    template: `
      <div style="${box}">
        <p style="${title}">Width Modes</p>
        <hr style="${hr}" />
        <p style="${label}">fullWidth (default)</p>
        <AppButton variant="primary" :full-width="true" style="max-width:400px">Full Width Button</AppButton>
        <p style="${label};margin-top:20px">auto width (fullWidth=false)</p>
        <AppButton variant="primary">Auto Width</AppButton>
      </div>
    `,
  }),
}

// ── Dark Mode ──

export const Loading: Story = {
  name: 'Loading State',
  render: () => ({
    components: { AppButton },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:20px;max-width:300px">
        <p style="margin:0;font-family:Red Hat Display,sans-serif;font-size:13px;color:#979797;font-weight:500">LOADING STATE</p>
        <AppButton variant="primary" :loading="true" :full-width="true">Sign in</AppButton>
        <AppButton variant="premium" :loading="true" :full-width="true">Buy Now</AppButton>
        <AppButton variant="muted" :loading="true" :full-width="true">Loading…</AppButton>
        <AppButton variant="action" :loading="true" :full-width="true">Watch Showreel</AppButton>
      </div>
    `,
  }),
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:460px"><story /></div>' })],
  render: () => ({
    components: { AppButton, AppleIcon },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <div style="display:flex;flex-direction:column;gap:12px">
          <AppButton variant="primary" :full-width="true">Sign in</AppButton>
          <AppButton variant="premium" :full-width="true">Buy Now</AppButton>
          <AppButton variant="social" :full-width="true"><template #leading><AppleIcon/></template>Continue with Apple</AppButton>
          <AppButton variant="muted" :full-width="true">See All</AppButton>
          <div style="display:flex;gap:12px">
            <AppButton variant="ghost">Ghost</AppButton>
            <AppButton variant="link">See all &gt;</AppButton>
            <AppButton variant="danger">Log Out</AppButton>
          </div>
          <AppButton variant="action" :full-width="true">Watch Showreel</AppButton>
          <AppButton variant="primary" :full-width="true" :disabled="true">Disabled</AppButton>
        </div>
      </div>
    `,
  }),
}
