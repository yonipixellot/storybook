import type { Meta, StoryObj } from '@storybook/vue3'
import SkeletonBlock from './SkeletonBlock.vue'
import SkeletonCard from '../SkeletonCard/SkeletonCard.vue'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.vue'

const meta: Meta<typeof SkeletonBlock> = {
  title: 'Loading States/SkeletonBlock',
  component: SkeletonBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Animated shimmer block for loading states. Use for text lines, headings, and flexible-sized content. Compose into SkeletonCard for card placeholders.',
      },
    },
  },
  argTypes: {
    height: { control: 'number' },
    width:  { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SkeletonBlock>

export const Default: Story = {
  name: 'Default (16px)',
  args: { height: 16 },
  decorators: [() => ({ template: '<div style="max-width:390px;"><story /></div>' })],
}

export const Heading: Story = {
  name: 'Heading (20px)',
  args: { height: 20 },
  decorators: [() => ({ template: '<div style="max-width:390px;"><story /></div>' })],
}

export const ButtonSized: Story = {
  name: 'Button-sized (40px)',
  args: { height: 40 },
  decorators: [() => ({ template: '<div style="max-width:390px;"><story /></div>' })],
}

export const InputSized: Story = {
  name: 'Input-sized (46px)',
  args: { height: 46 },
  decorators: [() => ({ template: '<div style="max-width:390px;"><story /></div>' })],
}

// Covers: height as string (line 20 else), width as number (line 22 number branch),
// width as string (line 22 string branch), borderRadius as number (line 25 number branch),
// borderRadius as string (line 25 string branch)
export const AllPropBranches: Story = {
  name: 'All prop type branches',
  render: () => ({
    components: { SkeletonBlock },
    template: `
      <div style="max-width:390px;display:flex;flex-direction:column;gap:8px">
        <!-- height as string — covers line 20 else branch -->
        <SkeletonBlock height="2rem" />
        <!-- width as number — covers line 22 number branch -->
        <SkeletonBlock :height="16" :width="200" />
        <!-- width as string — covers line 22 string branch -->
        <SkeletonBlock :height="16" width="75%" />
        <!-- borderRadius as number — covers line 25 number branch -->
        <SkeletonBlock :height="40" :width="120" :border-radius="20" />
        <!-- borderRadius as string — covers line 25 string branch -->
        <SkeletonBlock :height="40" :width="120" border-radius="50%" />
      </div>
    `,
  }),
}

export const Card: Story = {
  name: 'Skeleton Card',
  render: () => ({
    components: { SkeletonCard },
    template: `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; max-width:500px;">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    `,
  }),
}

export const Spinners: Story = {
  name: 'Loading Spinners',
  render: () => ({
    components: { LoadingSpinner },
    template: `
      <div style="display:flex; align-items:center; gap:24px;">
        <div style="text-align:center;">
          <LoadingSpinner :size="16" />
          <div style="font-size:10px; color:#979797; margin-top:8px;">sm</div>
        </div>
        <div style="text-align:center;">
          <LoadingSpinner :size="24" />
          <div style="font-size:10px; color:#979797; margin-top:8px;">md</div>
        </div>
        <div style="text-align:center;">
          <LoadingSpinner :size="32" />
          <div style="font-size:10px; color:#979797; margin-top:8px;">lg</div>
        </div>
      </div>
    `,
  }),
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:390px"><story /></div>' })],
  render: () => ({
    components: { SkeletonBlock, SkeletonCard, LoadingSpinner },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <p style="font-size:12px;color:#888;margin:0 0 8px;font-family:Red Hat Display,sans-serif">Skeleton blocks</p>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
          <SkeletonBlock :height="20" width="60%" />
          <SkeletonBlock :height="16" />
          <SkeletonBlock :height="16" width="80%" />
        </div>
        <p style="font-size:12px;color:#888;margin:0 0 8px;font-family:Red Hat Display,sans-serif">Skeleton card</p>
        <SkeletonCard :image-height="120" />
      </div>
    `,
  }),
}
