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
  args: {
    imageHeight: 180,
  },
}

export const Compact: Story = {
  args: {
    imageHeight: 100,
  },
}

export const Tall: Story = {
  args: {
    imageHeight: 240,
  },
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
