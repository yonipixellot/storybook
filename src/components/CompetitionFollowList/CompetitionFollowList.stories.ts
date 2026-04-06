import type { Meta, StoryObj } from '@storybook/vue3'
import { userEvent, within } from 'storybook/test'
import CompetitionFollowList from './CompetitionFollowList.vue'

const meta: Meta<typeof CompetitionFollowList> = {
  title: 'Layout & Overlays/CompetitionFollowList',
  component: CompetitionFollowList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Onboarding flow component. Collapsible competition/league list — click a league to expand its 3-column team grid and follow/unfollow teams. Continue button shows total follow count.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CompetitionFollowList>

export const Default: Story = {
  name: 'Default (5 competitions)',
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 1. Open "Varsity" (toggleComp → openSet.has false → s.add)
    const varsityBtn = canvas.getByRole('button', { name: /^varsity$/i })
    await userEvent.click(varsityBtn)

    // 2. Follow Riverside Mustangs (first team card — key not in followedMap → current=false → set true)
    const teamCards = canvasElement.querySelectorAll<HTMLElement>('.tfc')
    if (teamCards.length > 0) await userEvent.click(teamCards[0])

    // 3. Unfollow same team (key IS in followedMap now → current=true → set false)
    if (teamCards.length > 0) await userEvent.click(teamCards[0])

    // 4. Follow two teams so Continue shows count
    if (teamCards.length > 0) await userEvent.click(teamCards[0])
    if (teamCards.length > 1) await userEvent.click(teamCards[1])

    // 5. Open "Junior Varsity" (empty teams → hits v-else "No teams available")
    const jvBtn = canvas.getByRole('button', { name: /junior varsity/i })
    await userEvent.click(jvBtn)

    // 6. Close "Junior Varsity" (toggleComp → openSet.has true → s.delete)
    await userEvent.click(jvBtn)

    // 7. Click Continue button (emits 'continue' with totalFollowed count)
    const continueBtn = canvas.getByRole('button', { name: /continue/i })
    await userEvent.click(continueBtn)

    // 8. Close Varsity (toggleComp → openSet.has true → s.delete)
    await userEvent.click(varsityBtn)
  },
}

export const PreExpanded: Story = {
  name: 'Custom Competitions',
  args: {
    competitions: [
      {
        name: 'Premier League', teamCount: 8,
        teams: [
          { name: 'S.D Spartans Men',  followed: true  },
          { name: 'Ironi Nahariya',    followed: false },
          { name: 'Hapoel Tel Aviv',   followed: false },
        ],
      },
      {
        name: 'Championship', teamCount: 6,
        teams: [
          { name: 'Valley Vista Cougars', followed: false },
          { name: 'Oakwood Eagles',       followed: false },
        ],
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Open Premier League (covers resolvedCompetitions via props.competitions)
    const plBtn = canvas.getByRole('button', { name: /premier league/i })
    await userEvent.click(plBtn)
    // Follow Ironi Nahariya (index 1)
    const cards = canvasElement.querySelectorAll<HTMLElement>('.tfc')
    if (cards.length > 1) await userEvent.click(cards[1])
    // Open Championship
    const champBtn = canvas.getByRole('button', { name: /championship/i })
    await userEvent.click(champBtn)
    // Continue
    const continueBtn = canvas.getByRole('button', { name: /continue/i })
    await userEvent.click(continueBtn)
  },
}

/* Covers followedMap[key] ?? team.followed ?? false — third ?? branch (line 127 counts=[5,3,0])
   Teams with no followed property → team.followed = undefined → ?? false fires */
export const UndefinedFollowed: Story = {
  name: 'Teams without followed prop (branch coverage)',
  args: {
    competitions: [
      {
        name: 'Test League', teamCount: 2,
        teams: [
          { name: 'Alpha FC', followed: undefined as unknown as boolean },
          { name: 'Beta SC',  followed: undefined as unknown as boolean },
        ],
      },
    ],
  },
  play: async ({ canvasElement, within: _within }) => {
    // Open the competition
    const headers = canvasElement.querySelectorAll<HTMLElement>('.cfl__header')
    if (headers.length > 0) await userEvent.click(headers[0])
    // Click a team → followedMap[key]=undefined && team.followed=undefined → ?? false (line 127)
    const cards = canvasElement.querySelectorAll<HTMLElement>('.tfc')
    if (cards.length > 0) await userEvent.click(cards[0])
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:430px"><story /></div>' })],
  render: () => ({
    components: { CompetitionFollowList },
    template: `
      <div style="border:1px solid #444;border-radius:16px;overflow:hidden">
        <p style="font-size:18px;font-weight:700;margin:12px 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <CompetitionFollowList />
      </div>
    `,
  }),
}
