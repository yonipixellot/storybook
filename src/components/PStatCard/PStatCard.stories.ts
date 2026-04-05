import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent, h } from 'vue'
import PStatCard from './PStatCard.vue'

const meta: Meta<typeof PStatCard> = {
  title: 'Avatars & List Items/PStatCard',
  component: PStatCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Compact stat card displaying a label and value. Used in athlete/player profile stat grids.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PStatCard>

export const Default: Story = {
  args: {
    label: 'Points',
    value: '22.4',
  },
}

export const WithLabelLines: Story = {
  args: {
    label:      'Field Goals',
    labelLines: ['FG%'],
    value:      '52.3%',
  },
}

export const PlayerStatRow: Story = {
  render: () => defineComponent({
    setup() {
      const stats = [
        { label: 'PPG',  value: '22.4' },
        { label: 'RPG',  value: '8.1'  },
        { label: 'APG',  value: '5.3'  },
        { label: 'FG%',  value: '52.3' },
        { label: '3P%',  value: '38.7' },
        { label: 'MIN',  value: '34.2' },
      ]
      return () => h('div', {
        style: 'display:grid; grid-template-columns:repeat(3,1fr); gap:8px; padding:16px; max-width:320px;',
      }, stats.map(s => h(PStatCard, { label: s.label, value: s.value })))
    },
  }),
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { PStatCard },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:320px">
          <PStatCard label="PPG" value="22.4" />
          <PStatCard label="RPG" value="8.1" />
          <PStatCard label="APG" value="5.3" />
          <PStatCard label="FG%" value="52.3" />
          <PStatCard label="3P%" value="38.7" />
          <PStatCard label="MIN" value="34.2" />
        </div>
      </div>
    `,
  }),
}
