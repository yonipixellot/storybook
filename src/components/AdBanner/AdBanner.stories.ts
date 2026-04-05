import type { Meta, StoryObj } from '@storybook/vue3'
import AdBanner from './AdBanner.vue'

const meta: Meta<typeof AdBanner> = {
  title: 'Layout & Overlays/AdBanner',
  component: AdBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Auto-rotating swipeable ad carousel. Supports pointer/touch drag gestures. Each slide accepts any CSS `background` value. Dot indicators show current position.',
      },
    },
  },
  argTypes: {
    startIndex: { control: 'number', min: 0 },
  },
}

export default meta
type Story = StoryObj<typeof AdBanner>

export const Default: Story = {
  name: 'Two Slots (default)',
  args: {
    startIndex: 0,
  },
}

export const ThreeSlots: Story = {
  name: 'Three Slots',
  args: {
    slides: [
      { bg: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)', label: 'Sponsor A' },
      { bg: 'linear-gradient(135deg, #116DFF 0%, #0A4AB0 100%)', label: 'Sponsor B' },
      { bg: 'linear-gradient(135deg, #D0142C 0%, #8B0010 100%)', label: 'Sponsor C' },
    ],
    startIndex: 0,
  },
}

export const SecondSlide: Story = {
  name: 'Starting on Slide 2',
  args: {
    startIndex: 1,
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { AdBanner },
    template: `
      <div style="border:1px solid #444;border-radius:16px;overflow:hidden">
        <p style="font-size:18px;font-weight:700;margin:12px 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <AdBanner :slides="[
          { bg: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)', label: 'Sponsor A' },
          { bg: 'linear-gradient(135deg, #116DFF 0%, #0A4AB0 100%)', label: 'Sponsor B' },
        ]" />
      </div>
    `,
  }),
}
