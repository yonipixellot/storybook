import type { Meta, StoryObj } from '@storybook/vue3'
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
}

export const WithLogo: Story = {
  name: 'Org — With Logo',
  args: {
    variant:     'org',
    orgName:     'PBA',
    orgSubtitle: 'Basketball Association',
    logoUrl:     'https://placehold.co/40x40/116DFF/FFFFFF?text=PBA',
  },
}

export const ProfileVariant: Story = {
  name: 'Profile Variant',
  args: {
    variant:      'profile',
    userName:     'Brenden Rogers',
    userInitials: 'BR',
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
