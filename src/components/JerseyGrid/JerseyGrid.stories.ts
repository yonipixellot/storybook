import type { Meta, StoryObj } from '@storybook/vue3'
import JerseyGrid from './JerseyGrid.vue'

const meta: Meta<typeof JerseyGrid> = {
  title: 'Jersey/JerseyGrid',
  component: JerseyGrid,
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
