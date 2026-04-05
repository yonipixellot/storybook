import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import TeamFollowCard from './TeamFollowCard.vue'

const meta: Meta<typeof TeamFollowCard> = {
  title: 'Layout & Overlays/TeamFollowCard',
  component: TeamFollowCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Team card from the Manage Following page. 3-column grid layout with centered logo, 2-line clamped team name, and Following/Follow status text. Followed state adds a primary-color border.',
      },
    },
  },
  argTypes: {
    teamName: { control: 'text' },
    logoUrl:  { control: 'text' },
    followed: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof TeamFollowCard>

export const NotFollowed: Story = {
  name: 'Not Following',
  render: () => ({
    components: { TeamFollowCard },
    template: `
      <div style="width:124px;">
        <TeamFollowCard teamName="S.D Spartans Men" :followed="false" />
      </div>
    `,
  }),
}

export const Followed: Story = {
  name: 'Following',
  render: () => ({
    components: { TeamFollowCard },
    template: `
      <div style="width:124px;">
        <TeamFollowCard teamName="S.D Spartans Men" :followed="true" />
      </div>
    `,
  }),
}

export const LongName: Story = {
  name: 'Long Team Name (2-line clamp)',
  render: () => ({
    components: { TeamFollowCard },
    template: `
      <div style="display:flex; gap:8px; width:390px;">
        <TeamFollowCard teamName="Hapoel Tel Aviv Women Basketball" :followed="false" />
        <TeamFollowCard teamName="S.D Spartans Men" :followed="true" />
        <TeamFollowCard teamName="Riverside Mustangs FC" :followed="false" />
      </div>
    `,
  }),
}

export const Grid: Story = {
  name: 'Grid of Cards (interactive)',
  render: () => ({
    components: { TeamFollowCard },
    setup() {
      const teams = ref([
        { name: 'S.D Spartans Men',      followed: true  },
        { name: 'Ironi Nahariya',         followed: false },
        { name: 'Hapoel Tel Aviv Women',  followed: true  },
      ])
      function toggle(idx: number) {
        teams.value[idx] = { ...teams.value[idx], followed: !teams.value[idx].followed }
      }
      return { teams, toggle }
    },
    template: `
      <div style="display:flex; gap:8px; max-width:390px;">
        <TeamFollowCard
          v-for="(t, i) in teams"
          :key="i"
          :teamName="t.name"
          :followed="t.followed"
          @click="toggle(i)"
        />
      </div>
    `,
  }),
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { TeamFollowCard },
    setup() {
      return {}
    },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <p style="font-size:13px;color:#888;margin:0 0 16px;font-family:Red Hat Display,sans-serif">Card bg #262626, border #444, followed border primary-blue</p>
        <hr style="border:none;border-top:1px solid #444;margin:0 0 24px" />
        <div style="display:flex;gap:8px;max-width:390px">
          <TeamFollowCard teamName="S.D Spartans Men" :followed="true" />
          <TeamFollowCard teamName="Ironi Nahariya" :followed="false" />
          <TeamFollowCard teamName="Hapoel Tel Aviv Women" :followed="false" />
        </div>
      </div>
    `,
  }),
}

export const SectionedGrid: Story = {
  name: 'Sectioned Grid (full layout)',
  render: () => ({
    components: { TeamFollowCard },
    setup() {
      const sections = ref([
        {
          title: 'Following',
          teams: [
            { name: 'S.D Spartans Men', followed: true },
            { name: 'S.D Spartans Women', followed: true },
            { name: 'Maccabi Kiryat Gat', followed: true },
          ],
        },
        {
          title: 'Men',
          teams: [
            { name: 'S.D Spartans Men', followed: true },
            { name: 'Ironi Nahariya', followed: false },
            { name: 'Hapoel Tel Aviv', followed: false },
          ],
        },
      ])
      function toggle(sIdx: number, tIdx: number) {
        const team = sections.value[sIdx].teams[tIdx]
        sections.value[sIdx].teams[tIdx] = { ...team, followed: !team.followed }
      }
      return { sections, toggle }
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:24px; max-width:358px;">
        <div v-for="(section, sIdx) in sections" :key="sIdx">
          <span style="font-size:13px; font-weight:600; display:block; margin-bottom:8px;">{{ section.title }}</span>
          <div style="display:flex; align-items:center; gap:8px;">
            <TeamFollowCard
              v-for="(t, tIdx) in section.teams"
              :key="tIdx"
              :teamName="t.name"
              :followed="t.followed"
              @click="toggle(sIdx, tIdx)"
            />
          </div>
        </div>
      </div>
    `,
  }),
}
