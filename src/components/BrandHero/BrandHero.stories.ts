import type { Meta, StoryObj } from '@storybook/vue3'
import BrandHero from './BrandHero.vue'

const meta: Meta<typeof BrandHero> = {
  title: 'Layout & Overlays/BrandHero',
  component: BrandHero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Auth-screen hero banner. Gradient background fades from `primaryColor` to 30% darker. White-label ready — pass any brand hex to match client colors. Logo slot auto-falls-back to a placeholder SVG.',
      },
    },
  },
  argTypes: {
    primaryColor: { control: 'color', description: 'Top gradient color (hex)' },
    logoUrl:      { control: 'text' },
    logoAlt:      { control: 'text' },
    logoSize:     { control: 'number', min: 40, max: 160, step: 8 },
    height:       { control: 'number', min: 200, max: 600, step: 20 },
  },
}

export default meta
type Story = StoryObj<typeof BrandHero>

export const Default: Story = {
  name: 'Default — Pixellot Blue',
  args: {
    primaryColor: '#1A3B8A',
    logoSize: 80,
    height: 340,
  },
}

export const MackabiRed: Story = {
  name: 'Maccabi Red',
  args: {
    primaryColor: '#D0142C',
    height: 340,
  },
}

export const AztecaGreen: Story = {
  name: 'Azteca Green',
  args: {
    primaryColor: '#1A6B3C',
    height: 340,
  },
}

export const PremiumAmber: Story = {
  name: 'Premium Amber',
  args: {
    primaryColor: '#E7A610',
    height: 340,
  },
}

export const WithLogo: Story = {
  name: 'With Logo',
  args: {
    primaryColor: '#1A3B8A',
    logoUrl: 'https://placehold.co/80x80/FFFFFF/1A3B8A?text=PBA',
    logoAlt: 'PBA',
    logoSize: 80,
    height: 340,
  },
}

export const Compact: Story = {
  name: 'Compact (200px)',
  args: {
    primaryColor: '#1A3B8A',
    height: 200,
    logoSize: 56,
  },
}
