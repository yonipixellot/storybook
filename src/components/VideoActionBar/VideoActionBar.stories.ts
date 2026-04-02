import type { Meta, StoryObj } from '@storybook/vue3'
import VideoActionBar from './VideoActionBar.vue'

const meta: Meta<typeof VideoActionBar> = {
  title: 'Video/VideoActionBar',
  component: VideoActionBar,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div style="padding:20px;max-width:400px"><story /></div>' })],
  argTypes: {
    views: { control: 'text' },
    bookmarked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof VideoActionBar>

/* ── Style constants (story scaffolding) ── */
const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px;max-width:400px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'
const stLabel = 'font-size:12px;color:#979797;margin:10px 0 4px;font-family:Red Hat Display,sans-serif'

/* ─────────────────────────────────────────────────────────────
   1. INTERACTIVE PREVIEW
   Click bookmark to toggle — pops and fills blue on bookmark
───────────────────────────────────────────────────────────── */
export const Interactive: Story = {
  render: () => ({
    components: { VideoActionBar },
    data() { return { bookmarked: false, views: '1 view' } },
    template: `
      <div style="${box}">
        <p style="${title}">VideoActionBar Preview</p>
        <p style="${label}">Appears below the video thumbnail — click bookmark to toggle</p>
        <hr style="${hr}" />
        <VideoActionBar
          :views="views"
          :bookmarked="bookmarked"
          @bookmark="bookmarked = !bookmarked"
          @download="() => {}"
          @share="() => {}"
        />
        <p style="${stLabel}">{{ bookmarked ? '🔖 Bookmarked' : 'Not bookmarked' }} · {{ views }}</p>
      </div>
    `,
  }),
}

/* ─────────────────────────────────────────────────────────────
   2. ICON BUTTON STATES
   default / hover / pressed / disabled / active (bookmarked)
───────────────────────────────────────────────────────────── */
export const IconButtonStates: Story = {
  render: () => ({
    components: { VideoActionBar },
    template: `
      <div style="${box}">
        <p style="${title}">Icon Button States</p>
        <p style="${label}">default / hover / pressed / disabled / active (bookmarked)</p>
        <hr style="${hr}" />

        <p style="${stLabel}">default</p>
        <VideoActionBar views="0 views" />

        <p style="${stLabel}">hover — interact to see</p>
        <VideoActionBar views="0 views" />

        <p style="${stLabel}">pressed — interact to see</p>
        <VideoActionBar views="0 views" />

        <p style="${stLabel}">disabled — all buttons disabled</p>
        <VideoActionBar views="0 views" :disabled="true" />

        <p style="${stLabel}">active (bookmarked)</p>
        <VideoActionBar views="1,240 views" :bookmarked="true" />
      </div>
    `,
  }),
}

/* ─────────────────────────────────────────────────────────────
   3. BOOKMARKED VS DEFAULT
   Side-by-side comparison
───────────────────────────────────────────────────────────── */
export const BookmarkedVsDefault: Story = {
  render: () => ({
    components: { VideoActionBar },
    template: `
      <div style="${box}">
        <p style="${title}">Bookmarked vs Default</p>
        <p style="${label}">Bookmark icon pops and fills blue on bookmark, reverses on un-bookmark</p>
        <hr style="${hr}" />

        <p style="${stLabel}">interactive — click bookmark to toggle (not bookmarked)</p>
        <VideoActionBar views="1 view" :bookmarked="false" />

        <p style="${stLabel}">interactive — click bookmark to toggle (bookmarked)</p>
        <VideoActionBar views="1,240 views" :bookmarked="true" />
      </div>
    `,
  }),
}

/* ─────────────────────────────────────────────────────────────
   4. DISABLED STATE
───────────────────────────────────────────────────────────── */
export const Disabled: Story = {
  render: () => ({
    components: { VideoActionBar },
    template: `
      <div style="${box}">
        <p style="${title}">disabled — all buttons disabled</p>
        <p style="${label}">disabled prop disables all three action buttons</p>
        <hr style="${hr}" />
        <VideoActionBar views="0 views" :disabled="true" />
      </div>
    `,
  }),
}

/* ─────────────────────────────────────────────────────────────
   5. VIEW COUNT VARIANTS
   Dynamic views text — "1 view", "1,240 views", etc.
───────────────────────────────────────────────────────────── */
export const ViewCounts: Story = {
  render: () => ({
    components: { VideoActionBar },
    template: `
      <div style="${box}">
        <p style="${title}">View Count Variants</p>
        <p style="${label}">views prop is dynamic — changes per page visit</p>
        <hr style="${hr}" />

        <p style="${stLabel}">0 views</p>
        <VideoActionBar views="0 views" />

        <p style="${stLabel}">1 view (singular)</p>
        <VideoActionBar views="1 view" />

        <p style="${stLabel}">1,240 views</p>
        <VideoActionBar views="1,240 views" />

        <p style="${stLabel}">2.4M views</p>
        <VideoActionBar views="2.4M views" />
      </div>
    `,
  }),
}

/* ─────────────────────────────────────────────────────────────
   6. DEFAULT (controls)
───────────────────────────────────────────────────────────── */
export const Default: Story = {
  args: {
    views: '1 view',
    bookmarked: false,
    disabled: false,
  },
}
