import type { Meta, StoryObj } from '@storybook/vue3'
import { userEvent, within } from 'storybook/test'
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click CTA → $emit('action'). Also covers resolvedCta truthy branch and v-if="resolvedCta" true.
    const ctaBtn = canvas.getByRole('button', { name: /explore teams/i })
    await userEvent.click(ctaBtn)
  },
}

export const NoPersonal: Story = {
  name: 'No Personal Content',
  args: { preset: 'noPersonal' },
  // noPersonal preset has no cta → resolvedCta=null → v-if="resolvedCta" false branch
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // cta='Browse Videos' (truthy) → resolvedCta returns 'Browse Videos' → v-if true
    const ctaBtn = canvas.getByRole('button', { name: /browse videos/i })
    await userEvent.click(ctaBtn)
  },
}

/* Covers ?? 'Nothing Here' (no title + no preset) and ?? '' (no subtitle + no preset) */
export const Minimal: Story = {
  name: 'Minimal (no props — all fallbacks)',
  args: {},
  // No preset → presetData=undefined. No title → ?? 'Nothing Here'. No subtitle → ?? ''.
  // No icon → resolvedIcon uses 'search' key (found in ICON_MAP, ?? Search doesn't fire here).
}

/* Covers ICON_MAP[...] ?? Search (unknown icon key → fallback to Search component) */
export const UnknownIcon: Story = {
  name: 'Unknown Icon (fallback to Search)',
  args: {
    icon:  'foobar',
    title: 'Unknown Icon Test',
  },
  // ICON_MAP['foobar'] is undefined → ?? Search fires → renders Search icon
}

/* Covers resolvedCta: props.cta !== undefined → props.cta || null → null (empty string is falsy) */
export const EmptyCta: Story = {
  name: 'Explicit Empty CTA (hidden button)',
  args: {
    preset: 'noClaimedPlayer',
    cta:    '',
  },
  // cta='' → props.cta !== undefined → '' || null → null → v-if false
}

/* Covers v-if="resolvedSubtitle" false branch */
export const NoSubtitle: Story = {
  name: 'No Subtitle',
  args: {
    icon:     'search',
    title:    'Nothing Here',
    subtitle: '',
    cta:      null,
  },
  // subtitle='' → resolvedSubtitle='' → falsy → v-if false branch
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { EmptyState },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <p style="font-size:13px;color:#888;margin:0 0 16px;font-family:Red Hat Display,sans-serif">Icon bg #262626, title #E8E8E8, subtitle gray, CTA primary-blue</p>
        <hr style="border:none;border-top:1px solid #444;margin:0 0 24px" />
        <EmptyState preset="noFollowing" />
      </div>
    `,
  }),
}
