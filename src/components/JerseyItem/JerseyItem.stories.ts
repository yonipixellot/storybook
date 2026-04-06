import type { Meta, StoryObj } from '@storybook/vue3'
import { userEvent, within } from 'storybook/test'
import JerseyItem from './JerseyItem.vue'
import JerseyGrid from '../JerseyGrid/JerseyGrid.vue'

const meta: Meta<typeof JerseyItem> = {
  title: 'Jersey/JerseyItem',
  component: JerseyItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'SVG basketball jersey button. Tap to select — selected state shows green stroke and checkmark badge. Color is team-configurable. Light colors get a dark jersey number and gray outline.',
      },
    },
  },
  argTypes: {
    number:   { control: 'number', min: 0, max: 99 },
    selected: { control: 'boolean' },
    color:    { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof JerseyItem>

export const Default: Story = {
  name: 'Default (red, unselected)',
  args: { number: 7, selected: false, color: '#D0142C' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByRole('button', { name: /jersey number 7/i })
    // click → $emit('click')
    await userEvent.click(btn)
    // focus → @focus handler (focused = true)
    btn.focus()
    // blur → @blur handler (focused = false)
    btn.blur()
  },
}

export const Selected: Story = {
  name: 'Selected',
  args: { number: 23, selected: true, color: '#D0142C' },
  // selected=true → strokeColor returns 'var(--color-success-green)' branch
}

export const CustomBlue: Story = {
  name: 'Custom Color — Blue',
  args: { number: 10, selected: false, color: '#116DFF' },
}

export const LightColor: Story = {
  name: 'Light Color (dark number)',
  args: { number: 5, selected: false, color: '#FFE000' },
  // isLight('#FFE000') returns true → strokeColor = 'var(--color-gray-300)', numberStyle = '#161616'
}

/* Covers isLight returning true AND selected=true simultaneously (strokeColor selected branch wins) */
export const LightSelected: Story = {
  name: 'Light Color + Selected',
  args: { number: 9, selected: true, color: '#FFE000' },
}

/* Covers isLight short-hex guard: h.length < 6 → return false */
export const ShortHexColor: Story = {
  name: 'Short Hex Color',
  args: { number: 3, selected: false, color: '#FFF' },
}

export const Grid: Story = {
  name: 'Jersey Grid (interactive)',
  render: () => ({
    components: { JerseyGrid },
    template: `
      <div>
        <JerseyGrid :selected="[1, 3]" />
        <p style="margin-top:12px; font-size:11px; color:#979797;">Click jerseys to toggle selection</p>
      </div>
    `,
  }),
}

export const GridBlue: Story = {
  name: 'Grid — Blue Jerseys',
  render: () => ({
    components: { JerseyGrid },
    template: `<JerseyGrid color="#116DFF" />`,
  }),
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { JerseyItem, JerseyGrid },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <div style="display:flex;justify-content:space-between;align-items:flex-start;max-width:398px;padding:0 4px;margin-bottom:24px">
          <JerseyItem :number="7" :selected="false" color="#D0142C" />
          <JerseyItem :number="23" :selected="true" color="#D0142C" />
          <JerseyItem :number="10" :selected="false" color="#116DFF" />
          <JerseyItem :number="5" :selected="false" color="#FFE000" />
        </div>
        <JerseyGrid color="#D0142C" :selected="[7]" />
      </div>
    `,
  }),
}
