import type { Meta, StoryObj } from '@storybook/vue3'
import JerseyGrid from './JerseyGrid.vue'

const meta: Meta<typeof JerseyGrid> = {
  title: 'Jersey/JerseyGrid',
  component: JerseyGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Responsive grid of selectable jersey number buttons. Manages selection state internally; emits `change` with the updated selection array.',
      },
    },
  },
  argTypes: {
    color: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof JerseyGrid>

export const Default: Story = {
  args: {
    numbers:  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    selected: [],
    color:    '#D0142C',
  },
}

export const WithPreselected: Story = {
  args: {
    numbers:  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    selected: [5, 10, 12],
    color:    '#D0142C',
  },
}

export const BlueTeam: Story = {
  args: {
    numbers:  [0, 1, 3, 5, 7, 9, 11, 13, 15, 22, 23, 33],
    selected: [22],
    color:    '#1A3B8A',
  },
}

export const DarkJerseys: Story = {
  args: {
    numbers:  [1, 2, 3, 4, 5, 6, 7, 8],
    selected: [3, 7],
    color:    '#161616',
  },
}

export const LightJerseys: Story = {
  args: {
    numbers:  [1, 2, 3, 4, 5, 6],
    selected: [1],
    color:    '#FFFFFF',
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { JerseyGrid },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <JerseyGrid :numbers="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" :selected="[5]" color="#D0142C" />
      </div>
    `,
  }),
}
