import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fireEvent, userEvent, within } from 'storybook/test'
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
  play: async ({ canvasElement }) => {
    const banner = canvasElement.querySelector('.ab') as HTMLElement
    await expect(banner).not.toBeNull()
    // Swipe left (exercises onPointerDown, onPointerMove, onPointerUp → activeIndex++)
    await userEvent.pointer([
      { target: banner, keys: '[MouseLeft>]', coords: { x: 200, y: 40 } },
      { coords: { x: 140, y: 40 } },  // drag -60px → > 40px threshold
      { keys: '[/MouseLeft]' },
    ])
    // Swipe right (exercises reverse direction → activeIndex--)
    await userEvent.pointer([
      { target: banner, keys: '[MouseLeft>]', coords: { x: 100, y: 40 } },
      { coords: { x: 160, y: 40 } },  // drag +60px → > 40px threshold
      { keys: '[/MouseLeft]' },
    ])
  },
}

/* Covers v-if="slide.label" FALSE branch (line 17): slides without labels */
export const NoLabels: Story = {
  name: 'No Labels (branch coverage)',
  args: {
    slides: [
      { bg: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)' },  // no label → v-if false
      { bg: 'linear-gradient(135deg, #116DFF 0%, #0A4AB0 100%)' },
    ],
    startIndex: 0,
  },
}

/* Covers:
   - line 72 TRUE: pointermove when !isDragging (early return)
   - line 77 TRUE: pointerup when !isDragging (early return)
   - line 82 FALSE: drag too small → else-if evaluated (but also false) → no index change */
export const DragBranchCoverage: Story = {
  name: 'Drag — branch coverage',
  args: {
    slides: [
      { bg: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)', label: 'A' },
      { bg: 'linear-gradient(135deg, #116DFF 0%, #0A4AB0 100%)', label: 'B' },
      { bg: 'linear-gradient(135deg, #D0142C 0%, #8B0010 100%)', label: 'C' },
    ],
    startIndex: 0,
  },
  play: async ({ canvasElement }) => {
    const banner = canvasElement.querySelector<HTMLElement>('.ab')!
    // 1. pointermove WITHOUT pointerdown → isDragging=false → line 72 TRUE (early return)
    await fireEvent.pointerMove(banner, { clientX: 150, clientY: 40 })
    // 2. pointerup WITHOUT pointerdown → isDragging=false → line 77 TRUE (early return)
    await fireEvent.pointerUp(banner)
    // 3. Full swipe left (large) → activeIndex++ (line 82 TRUE: -60 < -40 && 0 < 2)
    await fireEvent.pointerDown(banner, { clientX: 200, clientY: 40 })
    await fireEvent.pointerMove(banner, { clientX: 140, clientY: 40 })
    await fireEvent.pointerUp(banner)
    // 4. Full swipe right (large) → activeIndex-- (line 82 FALSE else-if TRUE: 60 > 40 && 1 > 0)
    await fireEvent.pointerDown(banner, { clientX: 100, clientY: 40 })
    await fireEvent.pointerMove(banner, { clientX: 160, clientY: 40 })
    await fireEvent.pointerUp(banner)
    // 5. Small drag (< 40px) → line 82 FALSE, else-if also FALSE (no change)
    await fireEvent.pointerDown(banner, { clientX: 100, clientY: 40 })
    await fireEvent.pointerMove(banner, { clientX: 115, clientY: 40 })
    await fireEvent.pointerUp(banner)
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
