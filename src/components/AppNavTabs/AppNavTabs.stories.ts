import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppNavTabs from './AppNavTabs.vue'

const meta: Meta<typeof AppNavTabs> = {
  title: 'Atoms/AppNavTabs',
  component: AppNavTabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Horizontal navigation tabs for the desktop header. Place inside `AppHeader` via the `#nav` slot.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AppNavTabs>

const spartansTabs = [
  { id: 'nbl1',     label: 'NBL1' },
  { id: 'wnbl',     label: 'WNBL' },
  { id: 'senior',   label: 'Senior Domestic' },
  { id: 'qsl',      label: 'QSL' },
  { id: 'junior',   label: 'Junior Domestic' },
  { id: 'elite',    label: 'The Elite Summer League' },
]

export const Default: Story = {
  args: {
    tabs:       spartansTabs,
    modelValue: 'nbl1',
  },
}

export const SecondActive: Story = {
  args: {
    tabs:       spartansTabs,
    modelValue: 'wnbl',
  },
}

export const FewTabs: Story = {
  args: {
    tabs: [
      { id: 'home',     label: 'Home' },
      { id: 'games',    label: 'Games' },
      { id: 'athletes', label: 'Athletes' },
    ],
    modelValue: 'home',
  },
}
