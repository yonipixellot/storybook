import type { Meta, StoryObj } from '@storybook/vue3'
import HomePage from './HomePage.vue'

const meta: Meta<typeof HomePage> = {
  title: 'Pages/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main home feed page. Structure: AppHeader → MainTabs (Following | All Teams | Team Shop) → AdBanner → Live games (horizontal scroll) → Following section with jersey avatars → Recent Games list → BottomTabBar.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof HomePage>

export const FollowingTab: Story = {
  name: 'Following Tab (Default)',
  args: {
    initialMainTab: 'following',
  },
}

export const AllTeamsTab: Story = {
  name: 'All Teams Tab',
  args: {
    initialMainTab: 'allteams',
  },
}
