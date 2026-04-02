import type { Meta, StoryObj } from '@storybook/vue3'
import EmptyState from './EmptyState.vue'

const meta: Meta<typeof EmptyState> = {
  title: 'Empty & Error States/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Reusable empty state with icon, title, subtitle, and optional CTA. 6 built-in presets for every data-dependent section. All values can be overridden with custom props.',
      },
    },
  },
  argTypes: {
    preset: {
      control: 'select',
      options: ['noFollowing', 'noPersonal', 'noFollowedPlayers', 'noTeamsFound', 'noClaimedPlayer', 'noSearchResults'],
    },
    icon:     { control: 'text' },
    title:    { control: 'text' },
    subtitle: { control: 'text' },
    cta:      { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const NoFollowing: Story = {
  name: 'No Following',
  args: { preset: 'noFollowing' },
}

export const NoPersonal: Story = {
  name: 'No Personal Content',
  args: { preset: 'noPersonal' },
}

export const NoFollowedPlayers: Story = {
  name: 'No Followed Players',
  args: { preset: 'noFollowedPlayers' },
}

export const NoTeamsFound: Story = {
  name: 'No Teams Found',
  args: { preset: 'noTeamsFound' },
}

export const NoClaimedPlayer: Story = {
  name: 'No Claimed Player',
  args: { preset: 'noClaimedPlayer' },
}

export const NoSearchResults: Story = {
  name: 'No Search Results',
  args: { preset: 'noSearchResults' },
}

export const Custom: Story = {
  name: 'Custom (no preset)',
  args: {
    icon:     'bookmark',
    title:    'Nothing Saved Yet',
    subtitle: 'Bookmark videos to find them here later.',
    cta:      'Browse Videos',
  },
}
