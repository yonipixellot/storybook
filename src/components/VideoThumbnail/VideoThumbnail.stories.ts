import type { Meta, StoryObj } from '@storybook/vue3'
import VideoThumbnail from './VideoThumbnail.vue'

const meta: Meta<typeof VideoThumbnail> = {
  title: 'Videos/VideoThumbnail',
  component: VideoThumbnail,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Video card in landscape (16:9) or vertical (9:16) orientation. States: free (play icon) and premium (lock + blur). Optional badge variants: live, countdown (with auto-transition to 'new'), and jersey badge for Athlete Profile grids.',
      },
    },
  },
  decorators: [() => ({ template: '<div style="padding:20px"><story /></div>' })],
  argTypes: {
    orientation:      { control: 'select', options: ['landscape', 'vertical'], description: 'Aspect ratio layout — landscape (16:9) or vertical (9:16)' },
    locked:           { control: 'boolean', description: 'Shows lock icon + blur overlay when true (premium content)' },
    variant:          { control: 'select', options: ['', 'live', 'countdown', 'new'], description: 'Optional badge/state variant (vertical cards only)' },
    duration:         { control: 'text', description: 'Duration string, e.g. "1:42:15"' },
    title:            { control: 'text', description: 'Card title text' },
    subtitle:         { control: 'text', description: 'Card subtitle / date text' },
    showJerseyBadge:  { control: 'boolean', description: 'Swap title/subtitle for a jersey badge (Athlete Profile grid)' },
    jerseyNumber:     { control: 'number', description: 'Player number displayed on jersey badge' },
    jerseyLabel:      { control: 'text', description: 'Label next to jersey badge' },
    jerseyColor:      { control: 'color', description: 'Jersey fill color (hex); text color auto-contrasts' },
    thumbnailUrl:     { control: 'text', description: 'Background image URL (empty = gradient placeholder)' },
    error:            { control: 'boolean', description: 'Show error fallback state with "Report here" link' },
    countdownSeconds: { control: 'number', description: 'Countdown start value in seconds' },
    countdownNotify:  { control: 'boolean', description: 'Replace countdown ring with "Notify me" CTA button' },
  },
}

export default meta
type Story = StoryObj<typeof VideoThumbnail>

const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'
const sectionTitle = 'font-size:15px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const sectionLabel = 'font-size:12px;color:#979797;margin:0 0 12px;font-family:Red Hat Display,sans-serif'

/* ── Landscape (16:9) ── */

export const Landscape: Story = {
  render: () => ({
    components: { VideoThumbnail },
    template: `
      <div style="${box}">
        <p style="${title}">Landscape (16:9)</p>
        <p style="${label}">Wide video cards for full games and condensed replays</p>
        <hr style="${hr}" />

        <p style="${sectionTitle}">Free (locked=false)</p>
        <p style="${sectionLabel}">Play icon, no blur overlay</p>
        <div style="margin-bottom:24px">
          <VideoThumbnail
            orientation="landscape"
            :locked="false"
            duration="1:42:15"
            title="Full Game"
            subtitle="Free"
          />
        </div>

        <p style="${sectionTitle}">Premium (locked=true)</p>
        <p style="${sectionLabel}">Lock icon, blur overlay</p>
        <VideoThumbnail
          orientation="landscape"
          :locked="true"
          duration="22:30"
          title="Condensed Game"
          subtitle="Premium Only"
        />
      </div>
    `,
  }),
}

/* ── Vertical (9:16) ── */

export const Vertical: Story = {
  render: () => ({
    components: { VideoThumbnail },
    template: `
      <div style="${box}">
        <p style="${title}">Vertical (9:16)</p>
        <p style="${label}">Vertical highlight clips — locked and free</p>
        <hr style="${hr}" />

        <p style="${sectionTitle}">Locked</p>
        <p style="${sectionLabel}">Lock icon + blur overlay</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px">
          <VideoThumbnail
            orientation="vertical"
            :locked="true"
            duration="1:23"
            title="\u{1F3C0} Weiss with the dimes"
            subtitle="NOV 13, 2025"
          />
          <VideoThumbnail
            orientation="vertical"
            :locked="true"
            duration="2:45"
            title="\u{1F3C0} Fast break layup"
            subtitle="NOV 13, 2025"
          />
          <VideoThumbnail
            orientation="vertical"
            :locked="true"
            duration="0:58"
            title="\u{1F3C0} Three pointer"
            subtitle="NOV 13, 2025"
          />
        </div>

        <p style="${sectionTitle}">Free</p>
        <p style="${sectionLabel}">Play icon, no blur</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <VideoThumbnail
            orientation="vertical"
            :locked="false"
            duration="4:10"
            title="\u{1F3C0} #4 Gets the ball Forward"
            subtitle="NOV 13, 2025"
          />
          <VideoThumbnail
            orientation="vertical"
            :locked="false"
            duration="3:22"
            title="\u{1F3C0} Alley-oop finish"
            subtitle="NOV 13, 2025"
          />
        </div>
      </div>
    `,
  }),
}

/* ── Jersey Badge variant ── */

export const JerseyBadge: Story = {
  render: () => ({
    components: { VideoThumbnail },
    template: `
      <div style="${box}">
        <p style="${title}">Jersey Badge variant</p>
        <p style="${label}">Used in Athlete Profile highlights grid — shows sleeveless jersey with number + label instead of title/subtitle</p>
        <hr style="${hr}" />
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <VideoThumbnail
            orientation="vertical"
            :locked="false"
            :showJerseyBadge="true"
            :jerseyNumber="1"
            jerseyLabel="Player Highlights"
            jerseyColor="#D0142C"
            duration="0:45"
          />
          <VideoThumbnail
            orientation="vertical"
            :locked="false"
            :showJerseyBadge="true"
            :jerseyNumber="23"
            jerseyLabel="Player Highlights"
            jerseyColor="#116DFF"
            duration="1:23"
          />
          <VideoThumbnail
            orientation="vertical"
            :locked="false"
            :showJerseyBadge="true"
            :jerseyNumber="8"
            jerseyLabel="Player Highlights"
            jerseyColor="#FFE000"
            duration="0:32"
          />
        </div>
      </div>
    `,
  }),
}

/* ── Vertical Variants ── */

export const VerticalVariants: Story = {
  render: () => ({
    components: { VideoThumbnail },
    template: `
      <div style="${box}">
        <p style="${title}">Vertical Variants</p>
        <p style="${label}">live-locked / countdown / new — 108\u00D7192 px</p>
        <hr style="${hr}" />
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <VideoThumbnail
            orientation="vertical"
            :locked="true"
            variant="live"
            title="Team 1 vs Team 2"
            subtitle="NOW"
          />
          <VideoThumbnail
            orientation="vertical"
            :locked="true"
            variant="countdown"
            :countdownSeconds="3839"
          />
          <VideoThumbnail
            orientation="vertical"
            :locked="true"
            variant="new"
            title="Warriors vs Bulls"
            subtitle="42 MIN AGO"
          />
        </div>
      </div>
    `,
  }),
}

/* ── Countdown Notify ── */

export const CountdownNotify: Story = {
  render: () => ({
    components: { VideoThumbnail },
    template: `
      <div style="${box}">
        <p style="${title}">Countdown — Notify Me</p>
        <p style="${label}">Countdown variant with a primary \u201CNotify me\u201D button instead of the circular progress ring</p>
        <hr style="${hr}" />
        <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start">
          <div style="text-align:center">
            <VideoThumbnail
              orientation="vertical"
              :locked="true"
              variant="countdown"
              :countdownNotify="false"
              :countdownSeconds="3839"
            />
            <p style="font-size:11px;color:#979797;margin-top:8px;font-family:Red Hat Display,sans-serif">Default (ring + play)</p>
          </div>
          <div style="text-align:center">
            <VideoThumbnail
              orientation="vertical"
              :locked="true"
              variant="countdown"
              :countdownNotify="true"
              :countdownSeconds="3839"
            />
            <p style="font-size:11px;color:#979797;margin-top:8px;font-family:Red Hat Display,sans-serif">Notify me (CTA button)</p>
          </div>
        </div>
      </div>
    `,
  }),
}

/* ── Error Fallback ── */

export const ErrorFallback: Story = {
  render: () => ({
    components: { VideoThumbnail },
    template: `
      <div style="${box}">
        <p style="${title}">Error Fallback</p>
        <p style="${label}">Shown when the thumbnail fails to load</p>
        <hr style="${hr}" />
        <div style="display:flex;gap:24px;align-items:flex-start">
          <VideoThumbnail
            orientation="vertical"
            :error="true"
          />
          <p style="font-size:12px;color:#979797;font-family:Red Hat Display,sans-serif;max-width:300px;line-height:1.6">
            When a thumbnail fails to render, this fallback is shown with a \u201CReport here\u201D link for users to flag the issue.
          </p>
        </div>
      </div>
    `,
  }),
}

/* ── Countdown → New Transition ── */

export const CountdownTransition: Story = {
  render: () => ({
    components: { VideoThumbnail },
    template: `
      <div style="${box}">
        <p style="${title}">Countdown \u2192 New Transition</p>
        <p style="${label}">Watch the countdown card automatically transition to the \u201Cnew\u201D variant when the timer reaches 00:00:00</p>
        <hr style="${hr}" />
        <div style="display:flex;gap:24px;align-items:flex-start">
          <VideoThumbnail
            orientation="vertical"
            :locked="true"
            variant="countdown"
            :countdownSeconds="20"
            title="New Content"
            subtitle="JUST DROPPED"
          />
          <p style="font-size:12px;color:#979797;font-family:Red Hat Display,sans-serif;max-width:300px;line-height:1.6">
            This countdown starts at 20s for demo purposes. When it hits zero it renders the \u201Cnew\u201D variant card automatically.
          </p>
        </div>
      </div>
    `,
  }),
}

/* ── Props ── */

export const Props: Story = {
  render: () => ({
    components: { VideoThumbnail },
    template: `
      <div style="${box}">
        <p style="${title}">Props</p>
        <hr style="${hr}" />
        <div style="font-family:monospace;font-size:13px;color:#555;line-height:2">
          <div><strong>orientation</strong>: "landscape" | "vertical"</div>
          <div><strong>locked</strong>: boolean (false = Play icon, true = Lock icon + blur)</div>
          <div><strong>duration</strong>: string ("1:42:15")</div>
          <div><strong>title</strong>: string ("Full Game")</div>
          <div><strong>subtitle</strong>: string ("Free" / "Premium Only")</div>
          <div><strong>variant</strong>: "live" | "countdown" | "new" — vertical card variant (badge + behavior)</div>
          <div><strong>showJerseyBadge</strong>: boolean — jersey badge instead of title/subtitle</div>
          <div><strong>jerseyNumber</strong>: number — player number on the jersey</div>
          <div><strong>jerseyLabel</strong>: string — text next to jersey ("Player Highlights")</div>
          <div><strong>jerseyColor</strong>: string — jersey fill color (default #D0142C, auto dark text on light colors)</div>
          <div><strong>thumbnailUrl</strong>: string — background image URL</div>
          <div><strong>variant</strong>: "live" | "countdown" | "new" | undefined — optional badge/state variant</div>
        </div>
      </div>
    `,
  }),
}
