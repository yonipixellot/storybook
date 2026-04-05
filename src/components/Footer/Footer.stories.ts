import type { Meta, StoryObj } from '@storybook/vue3'
import Footer from './Footer.vue'

const meta: Meta<typeof Footer> = {
  title: 'Layout & Overlays/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Page footer with org logo, navigation links, social media icons (X, Facebook, Instagram, YouTube, TikTok, Email), copyright, and optional "Powered by Pixellot" branding.',
      },
    },
  },
  argTypes: {
    orgName:       { control: 'text' },
    logoUrl:       { control: 'text' },
    showPoweredBy: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {
  name: 'Default Footer',
  args: {
    orgName:       'PBA',
    showPoweredBy: true,
  },
}

export const NoPoweredBy: Story = {
  name: 'Without "Powered by Pixellot"',
  args: {
    orgName:       'Spartans Athletics',
    showPoweredBy: false,
    links: [
      { label: 'Home' },
      { label: 'Teams' },
      { label: 'Contact' },
    ],
  },
}

export const WithLogo: Story = {
  name: 'With Custom Logo',
  args: {
    orgName:       'NBBL',
    logoUrl:       'https://placehold.co/28x28/116DFF/FFFFFF?text=N',
    showPoweredBy: true,
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A"><story /></div>' })],
  render: () => ({
    components: { Footer },
    template: `
      <Footer orgName="PBA" :showPoweredBy="true" />
    `,
  }),
}
