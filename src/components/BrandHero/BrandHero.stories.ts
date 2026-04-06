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

/* Covers v-if="logoUrl && !logoError" true branch — data URL ensures image loads without network */
export const WithLogoDataUrl: Story = {
  name: 'With Logo (data URL)',
  args: {
    primaryColor: '#1A3B8A',
    // 1×1 transparent GIF — always loads, no network needed → logoError stays false → img branch fires
    logoUrl: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
    logoAlt: 'PBA',
    logoSize: 80,
    height: 200,
  },
}

/* Covers c.startsWith('var(') true branch — omit primaryColor so withDefaults provides var(...) */
export const DefaultColor: Story = {
  name: 'Default color (CSS var fallback)',
  args: {
    // No primaryColor → withDefaults: 'var(--color-hero-bg-raw, #1A3B8A)' → startsWith('var(') true
    logoSize: 80,
    height: 200,
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

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { BrandHero },
    template: `
      <div style="border:1px solid #444;border-radius:16px;overflow:hidden">
        <p style="font-size:18px;font-weight:700;margin:12px 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <BrandHero primaryColor="#1A3B8A" :height="200" :logoSize="56" />
      </div>
    `,
  }),
}
