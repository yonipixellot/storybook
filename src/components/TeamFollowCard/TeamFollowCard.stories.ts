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
  args: {
    teamName: 'S.D Spartans Men',
    followed: false,
  },
}

export const Followed: Story = {
  name: 'Following',
  args: {
    teamName: 'S.D Spartans Men',
    followed: true,
  },
}

export const LongName: Story = {
  name: 'Long Team Name (2-line clamp)',
  args: {
    teamName: 'Hapoel Tel Aviv Women Basketball',
    followed: false,
  },
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
