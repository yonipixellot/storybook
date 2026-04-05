import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent, h } from 'vue'
import SkeletonCard from './SkeletonCard.vue'

const meta: Meta<typeof SkeletonCard> = {
  title: 'Loading States/SkeletonCard',
  component: SkeletonCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card-shaped skeleton loader with an image placeholder and 3 text line shimmers. Used as a loading placeholder for LiveGameCard, GameResultCard, and HighlightCard.',
      },
    },
  },
  argTypes: {
    imageHeight: { control: { type: 'range', min: 80, max: 300, step: 8 } },
  },
}

export default meta
type Story = StoryObj<typeof SkeletonCard>

export const Default: Story = {
  render: () => ({
    components: { SkeletonCard },
    template: `<div style="width:280px"><SkeletonCard :image-height="180" /></div>`,
  }),
}

export const Compact: Story = {
  render: () => ({
    components: { SkeletonCard },
    template: `<div style="width:280px"><SkeletonCard :image-height="100" /></div>`,
  }),
}

export const Tall: Story = {
  render: () => ({
    components: { SkeletonCard },
    template: `<div style="width:280px"><SkeletonCard :image-height="240" /></div>`,
  }),
}

export const FeedList: Story = {
  render: () => defineComponent({
    setup() {
      return () => h('div', {
        style: 'display:flex; flex-direction:column; gap:12px; padding:16px; width:360px;',
      }, [180, 180, 180].map((h2, i) => h(SkeletonCard, { key: i, imageHeight: h2 })))
    },
  }),
}

export const HorizontalScroll: Story = {
  render: () => defineComponent({
    setup() {
      return () => h('div', {
        style: 'display:flex; gap:12px; padding:16px; overflow-x:auto; width:400px;',
      }, [150, 150, 150, 150].map((h2, i) =>
        h('div', { key: i, style: 'flex-shrink:0; width:180px;' }, [
          h(SkeletonCard, { imageHeight: h2 }),
        ])
      ))
    },
  }),
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  parameters: { layout: 'padded' },
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { SkeletonCard },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px;max-width:600px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <SkeletonCard :image-height="160" />
          <SkeletonCard :image-height="160" />
        </div>
      </div>
    `,
  }),
}
