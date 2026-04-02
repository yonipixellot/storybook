import type { Meta, StoryObj } from '@storybook/vue3'
import FollowingRow from './FollowingRow.vue'

const meta: Meta<typeof FollowingRow> = {
  title: 'Avatars & List Items/FollowingRow',
  component: FollowingRow,
  tags: ['autodocs'],
  argTypes: {
    title:        { control: 'text',    description: 'Primary row title (team name or player number)' },
    subtitle:     { control: 'text',    description: 'Optional secondary line (division, position, etc.)' },
    borderBottom: { control: 'boolean', description: 'Show bottom divider (1px gray-100)' },
  },
  args: {
    title:        'Riverside Mustangs',
    subtitle:     'PBA Varsity Division',
    borderBottom: true,
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:390px;background:#fff"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof FollowingRow>

/* ═══════════════════════════════════════════
   1. Team row
   ═══════════════════════════════════════════ */
export const TeamRow: Story = {
  name: 'Team Row — PTeamLogo + Unfollow',
  render: () => ({
    template: `
      <div style="max-width:390px">
        <FollowingRow title="Riverside Mustangs" subtitle="PBA Varsity Division">
          <template #avatar>
            <div style="width:40px;height:40px;border-radius:50%;background:#EDEDED;border:0.67px solid #DCDCDC;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:Red Hat Display,sans-serif;font-size:14px;font-weight:700;color:#D0142C">R</div>
          </template>
          <template #action>
            <button style="background:none;border:none;cursor:pointer;font-family:Red Hat Display,sans-serif;font-size:14px;font-weight:500;color:var(--color-danger-red);padding:0">Unfollow</button>
          </template>
        </FollowingRow>
      </div>
    `,
    components: { FollowingRow },
  }),
}

/* ═══════════════════════════════════════════
   2. Player row
   ═══════════════════════════════════════════ */
export const PlayerRow: Story = {
  name: 'Player Row — PlayerNumberBadge + Unfollow',
  render: () => ({
    template: `
      <div style="max-width:390px">
        <FollowingRow title="#1 — Tal Weiss" subtitle="Guard · S.D Spartans">
          <template #avatar>
            <div style="width:40px;height:40px;border-radius:50%;background:var(--color-primary);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:Red Hat Display,sans-serif;font-size:16px;font-weight:700;color:#fff">1</div>
          </template>
          <template #action>
            <button style="background:none;border:none;cursor:pointer;font-family:Red Hat Display,sans-serif;font-size:14px;font-weight:500;color:var(--color-danger-red);padding:0">Unfollow</button>
          </template>
        </FollowingRow>
      </div>
    `,
    components: { FollowingRow },
  }),
}

/* ═══════════════════════════════════════════
   3. List of rows
   ═══════════════════════════════════════════ */
export const List: Story = {
  name: 'Full Following List',
  render: () => ({
    template: `
      <div style="max-width:390px">
        <FollowingRow
          v-for="(item, i) in items"
          :key="i"
          :title="item.title"
          :subtitle="item.subtitle"
          :border-bottom="i < items.length - 1"
        >
          <template #avatar>
            <div :style="'width:40px;height:40px;border-radius:50%;background:' + item.color + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:Red Hat Display,sans-serif;font-size:14px;font-weight:700;color:#fff'">
              {{ item.initial }}
            </div>
          </template>
          <template #action>
            <button style="background:none;border:none;cursor:pointer;font-family:Red Hat Display,sans-serif;font-size:14px;font-weight:500;color:var(--color-danger-red);padding:0">Unfollow</button>
          </template>
        </FollowingRow>
      </div>
    `,
    components: { FollowingRow },
    data() {
      return {
        items: [
          { title: 'Riverside Mustangs',  subtitle: 'PBA Varsity Division', color: '#D0142C', initial: 'R' },
          { title: 'Logan Thunder',        subtitle: 'Liga Leumit',          color: '#116DFF', initial: 'L' },
          { title: '#1 — Tal Weiss',       subtitle: 'Guard · S.D Spartans', color: '#22C55E', initial: '1' },
          { title: '#22 — Ben Carter',     subtitle: 'Center · Mustangs',    color: '#8B5CF6', initial: '22'},
        ],
      }
    },
  }),
}
