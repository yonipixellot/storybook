import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within, fireEvent } from 'storybook/test'
import SideMenu from './SideMenu.vue'

const meta: Meta<typeof SideMenu> = {
  title: 'Layout & Overlays/SideMenu',
  component: SideMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Sales-style hamburger menu that slides from the right. Shows org logo + name, expandable Divisions with sub-items, plain nav items with Language selector, and Log Out. Has an "org" variant (default) and a "profile" variant.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['org', 'profile'],
      description: 'Switches between org branding and user profile header',
    },
    orgName:     { control: 'text' },
    orgSubtitle: { control: 'text' },
    logoUrl:     { control: 'text' },
    userName:    { control: 'text' },
    userInitials:{ control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SideMenu>

export const Default: Story = {
  name: 'Org Variant (default)',
  args: {
    variant:     'org',
    orgName:     'PBA',
    orgSubtitle: 'Basketball Association',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click "Divisions" accordion header — exercises toggleItem() add branch
    const divisionsBtn = canvas.getByRole('button', { name: /divisions/i })
    await userEvent.click(divisionsBtn)
    // Click again to close — exercises toggleItem() delete branch
    await userEvent.click(divisionsBtn)
    // Click Log Out — exercises $emit('logout')
    const logoutBtn = canvas.getByRole('button', { name: /log out/i })
    await expect(logoutBtn).toBeVisible()
    await userEvent.click(logoutBtn)
    // Click backdrop — exercises $emit('close') from backdrop click (mode='overlay' line 4)
    const backdrop = canvasElement.querySelector<HTMLElement>('.sm__backdrop')
    if (backdrop) await userEvent.click(backdrop)
    // Click Close button — exercises $emit('close') from header close btn
    const closeBtn = canvas.getByRole('button', { name: /^close$/i })
    await userEvent.click(closeBtn)
  },
}

export const WithLogo: Story = {
  name: 'Org — With Logo',
  args: {
    variant:     'org',
    orgName:     'PBA',
    orgSubtitle: 'Basketball Association',
    logoUrl:     'https://placehold.co/40x40/116DFF/FFFFFF?text=PBA',
  },
  play: async ({ canvasElement }) => {
    // Simulate image load error — exercises @error="logoError = true" handler (line 29)
    const img = canvasElement.querySelector<HTMLImageElement>('.sm__logo-img')
    if (img) await fireEvent.error(img)
  },
}

export const ProfileVariant: Story = {
  name: 'Profile Variant',
  args: {
    variant:      'profile',
    userName:     'Brenden Rogers',
    userInitials: 'BR',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Open "Premier League" accordion — exercises profile variant resolvedItems + toggleItem()
    const premierBtn = canvas.getByRole('button', { name: /premier league/i })
    await userEvent.click(premierBtn)
    await userEvent.click(premierBtn) // close it
    // Click Close button in profile header — exercises $emit('close') from sm__header--profile (line 16)
    const closeBtn = canvas.getByRole('button', { name: /^close$/i })
    await userEvent.click(closeBtn)
  },
}

export const CustomItems: Story = {
  name: 'Custom Items',
  args: {
    variant:     'org',
    orgName:     'NBBL',
    orgSubtitle: 'National Basketball League',
    items: [
      { label: 'Men\'s Division', subItems: ['Premier', 'First Division', 'Second Division'] },
      { label: 'Women\'s Division', subItems: ['Premier', 'First Division'] },
      { label: 'Saved Videos' },
      { label: 'My Highlights' },
      { label: 'Language' },
    ],
  },
}

// All plain items (no subItems) — exercises hasAccordionItems = false → sm__divider NOT rendered (line 83 false branch)
export const PlainItems: Story = {
  name: 'Plain Items Only (no accordion)',
  args: {
    variant:     'org',
    orgName:     'PBA',
    orgSubtitle: 'Basketball Association',
    items: [
      { label: 'Saved Videos' },
      { label: 'My Highlights' },
      { label: 'My Account' },
      { label: 'Language' },
    ],
  },
}

/* ═══════════════════════════════════════════
   Dropdown — desktop avatar popover mode
   ═══════════════════════════════════════════ */
export const Dropdown: Story = {
  name: 'Dropdown (desktop)',
  parameters: { layout: 'padded' },
  render: () => ({
    components: { SideMenu },
    template: `
      <div style="display:flex;justify-content:flex-end;padding:16px;">
        <SideMenu mode="dropdown" variant="profile" user-name="Yoni Levy" user-initials="YL" />
      </div>
    `,
  }),
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:430px"><story /></div>' })],
  render: () => ({
    components: { SideMenu },
    template: `
      <div style="border:1px solid #444;border-radius:16px;overflow:hidden">
        <p style="font-size:18px;font-weight:700;margin:12px 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode — Org</p>
        <SideMenu variant="org" org-name="PBA" org-subtitle="Basketball Association" />
      </div>
    `,
  }),
}
