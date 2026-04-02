import type { Meta, StoryObj } from '@storybook/vue3'
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
}

export const Selected: Story = {
  name: 'Selected',
  args: { number: 23, selected: true, color: '#D0142C' },
}

export const CustomBlue: Story = {
  name: 'Custom Color — Blue',
  args: { number: 10, selected: false, color: '#116DFF' },
}

export const LightColor: Story = {
  name: 'Light Color (dark number)',
  args: { number: 5, selected: false, color: '#FFE000' },
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
