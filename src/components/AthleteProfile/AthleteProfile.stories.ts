import type { Meta, StoryObj } from '@storybook/vue3'
import { userEvent, within } from 'storybook/test'
import AthleteProfile from './AthleteProfile.vue'

const meta: Meta<typeof AthleteProfile> = {
  title: 'Athlete Profile/AthleteProfile',
  component: AthleteProfile,
  tags: ['autodocs'],
  argTypes: {
    name:        { control: 'text',   description: 'Full name — rendered UPPERCASE, split over 2 lines' },
    number:      { control: 'number', description: 'Jersey number' },
    position:    { control: 'text',   description: 'Position label, e.g. Guard, Forward' },
    teamName:    { control: 'text',   description: 'Team name shown as link' },
    accentColor: { control: 'color',  description: 'Team accent color (team name, chevron)' },
    photoUrl:    { control: 'text',   description: 'Circular athlete photo URL' },
    teamLogoUrl: { control: 'text',   description: 'Team logo URL (circular 20px)' },
    width:       { control: { type: 'range', min: 320, max: 430, step: 10 }, description: 'Page width (default 390)' },
  },
  args: {
    name:        'TAL WEISS',
    number:      1,
    position:    'Guard',
    teamName:    'S.D Spartans',
    accentColor: '#007cbe',
    width:       390,
  },
  decorators: [
    () => ({ template: '<div style="padding:20px"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof AthleteProfile>

/* ── Shared story styles ── */
const title  = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const label  = 'font-size:13px;color:#979797;margin:0 0 16px;font-family:Red Hat Display,sans-serif'
const box    = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr     = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'
const row    = 'display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap'

/* ═══════════════════════════════════════════
   1. Default — Tal Weiss #1 (controls-driven)
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Default — Tal Weiss #1',
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click back button — exercises $emit('back') (showNav=true by default, stmt line 6)
    const backBtn = canvas.getByRole('button', { name: /go back/i })
    await userEvent.click(backBtn)
    // Click share button — exercises $emit('share') (stmt line 10)
    const shareBtn = canvas.getByRole('button', { name: /share/i })
    await userEvent.click(shareBtn)
    // Click team button — exercises $emit('team-tap') (stmt line 38)
    const teamBtn = canvas.getByRole('button', { name: /view.*team/i })
    await userEvent.click(teamBtn)
    // Click see-all highlights — exercises $emit('see-all-highlights') (stmt line 91)
    const seeAllBtn = canvas.getByRole('button', { name: /see all/i })
    await userEvent.click(seeAllBtn)
  },
}

/* Covers v-if="photoUrl" true branch — data URL loads without network */
export const WithPhotoDataUrl: Story = {
  name: 'With Photo (data URL)',
  args: {
    photoUrl: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  },
}

/* Covers v-if="lastName" false branch — single-word name has no last name */
export const SingleName: Story = {
  name: 'Single Name (no lastName)',
  args: {
    name: 'ANNA',
  },
}

/* Covers v-if="teamLogoUrl" true branch (line 41) — SVG data URL loads without network */
export const WithTeamLogo: Story = {
  name: 'With Team Logo (data URL)',
  args: {
    teamLogoUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjwvc3ZnPg==',
  },
}

/* ═══════════════════════════════════════════
   2. Custom Player
   ═══════════════════════════════════════════ */
export const CustomPlayer: Story = {
  name: 'Custom Player — Ben Simmons #25',
  args: {
    name:        'BEN SIMMONS',
    number:      25,
    position:    'Point Guard',
    teamName:    'S.D Spartans',
    accentColor: '#007cbe',
  },
}

/* ═══════════════════════════════════════════
   3. Accent Color Variants
   ═══════════════════════════════════════════ */
export const AccentColors: Story = {
  render: () => ({
    components: { AthleteProfile },
    template: `
      <div style="${box}">
        <p style="${title}">Accent Color Variants</p>
        <p style="${label}">The accentColor prop controls team name + chevron color. Pass the team's brand color.</p>
        <hr style="${hr}" />
        <div style="${row}">
          <AthleteProfile name="TAL WEISS" :number="1" position="Guard" teamName="S.D Spartans" accentColor="#007cbe" />
          <AthleteProfile name="BEN SIMMONS" :number="25" position="Point Guard" teamName="Logan Thunder" accentColor="#E8332B" />
          <AthleteProfile name="ANNA COHEN" :number="7" position="Forward" teamName="River Hawks" accentColor="#22C55E" />
        </div>
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   4. With Photo
   ═══════════════════════════════════════════ */
export const WithPhoto: Story = {
  name: 'With Photo URL',
  args: {
    name:        'TAL WEISS',
    number:      1,
    position:    'Guard',
    teamName:    'S.D Spartans',
    accentColor: '#007cbe',
    photoUrl:    'https://i.pravatar.cc/150?img=3',
  },
}

/* ═══════════════════════════════════════════
   5. DS Components Used
   ═══════════════════════════════════════════ */
export const ComponentsUsed: Story = {
  render: () => ({
    template: `
      <div style="${box}">
        <p style="${title}">DS Components Used</p>
        <p style="${label}">AthleteProfile composes these DS primitives</p>
        <hr style="${hr}" />
        <div style="font-family:Red Hat Display,sans-serif;font-size:14px;color:#161616;display:flex;flex-direction:column;gap:10px;line-height:1.6">
          <div>
            <strong>PPlayerPhoto</strong>
            <span style="color:#979797"> — circular hero photo (photoUrl from server); shows User icon placeholder when empty</span>
          </div>
          <div>
            <strong>PTeamLogo</strong>
            <span style="color:#979797"> — 20px circular team logo next to team name (teamLogoUrl from server)</span>
          </div>
          <div>
            <strong>ArrowLeft (lucide)</strong>
            <span style="color:#979797"> — back navigation icon, 16px, gray-500</span>
          </div>
          <div>
            <strong>Share2 (lucide)</strong>
            <span style="color:#979797"> — share action icon, 20px, dark-text</span>
          </div>
          <div>
            <strong>ChevronDown (lucide, rotated -90°)</strong>
            <span style="color:#979797"> — team name link chevron, 12px, accentColor</span>
          </div>
          <div>
            <strong>PStatCard</strong>
            <span style="color:#979797"> — career stats tiles (2 rows × 3) + season stats (1 row × 4)</span>
          </div>
          <div>
            <strong>PSectionHeader</strong>
            <span style="color:#979797"> — "My Highlights" (24px), "Season Stats" (24px) section headings</span>
          </div>
          <div>
            <strong>PVideoThumbnail</strong>
            <span style="color:#979797"> — 2 × 3 grid of vertical highlight thumbnails with jersey badge</span>
          </div>
          <div>
            <strong>PSeeAllLink</strong>
            <span style="color:#979797"> — "See all" link with link-blue color + arrow icon, centered below grid</span>
          </div>
        </div>
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   6. Props Reference
   ═══════════════════════════════════════════ */
export const PropsReference: Story = {
  render: () => ({
    template: `
      <div style="${box}">
        <p style="${title}">Props Reference</p>
        <hr style="${hr}" />
        <div style="font-family:Red Hat Display,sans-serif;font-size:13px;color:#161616;display:flex;flex-direction:column;gap:8px">
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">name</code><span style="color:#979797"> string — full name, rendered UPPERCASE split over 2 lines (default: "TAL WEISS")</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">number</code><span style="color:#979797"> number — jersey number shown in position row (default: 1)</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">position</code><span style="color:#979797"> string — e.g. "Guard", "Forward" (default: "Guard")</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">teamName</code><span style="color:#979797"> string — team link label (default: "S.D Spartans")</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">teamLogoUrl?</code><span style="color:#979797"> string — server-provided team logo (shows colored initial when absent)</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">accentColor</code><span style="color:#979797"> string — team accent color (team name + chevron) (default: "#007cbe")</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">photoUrl?</code><span style="color:#979797"> string — circular athlete photo (shows User icon placeholder when absent)</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">width?</code><span style="color:#979797"> number — page width in px (default: 390)</span></div>
        </div>
        <hr style="${hr}" />
        <div style="font-family:Red Hat Display,sans-serif;font-size:13px;color:#979797">
          <strong style="color:#161616">Emits:</strong>
          <code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px;margin:0 4px">@back</code>
          <code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px;margin:0 4px">@share</code>
          <code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px;margin:0 4px">@team-tap</code>
          <code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px;margin:0 4px">@see-all-highlights</code>
        </div>
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   7. Dark Mode
   ═══════════════════════════════════════════ */
export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { AthleteProfile },
    template: `
      <div style="border:1px solid #444;border-radius:16px;overflow:hidden">
        <p style="font-size:18px;font-weight:700;margin:12px 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <AthleteProfile
          name="TAL WEISS"
          :number="1"
          position="Guard"
          teamName="S.D Spartans"
          accentColor="#007cbe"
          :width="390"
        />
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   8. Token Anatomy
   ═══════════════════════════════════════════ */
export const TokenAnatomy: Story = {
  render: () => ({
    template: `
      <div style="${box}">
        <p style="${title}">Token Anatomy</p>
        <p style="${label}">Key design tokens used in this component</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;font-family:Red Hat Display,sans-serif;font-size:13px">

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Layout</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Page width: <strong style="color:#161616">390px</strong></div>
              <div>Hero card bg: <code style="color:#116DFF">--color-gray-50</code></div>
              <div>Hero card radius: <code style="color:#116DFF">--radius-badge (12px)</code></div>
              <div>Hero card padding: <code style="color:#116DFF">--space-xl --space-lg</code></div>
              <div>Page bg: linear-gradient white→gray-200→white</div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Typography</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Player name: <code style="color:#116DFF">--text-h1 (28px) --font-extra-bold (800)</code></div>
              <div>Number/Position: <code style="color:#116DFF">--text-caption (12px) --font-medium</code></div>
              <div>Team name: <code style="color:#116DFF">--text-xs (14px) --font-medium</code></div>
              <div>Stat value: <code style="color:#116DFF">--text-2xl (24px) --font-bold</code></div>
              <div>Section header: <code style="color:#116DFF">24px --font-bold</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Stat Cards</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Background: <code style="color:#116DFF">--color-card-bg (#F3F4F6)</code></div>
              <div>Padding: <code style="color:#116DFF">--space-md (12px)</code></div>
              <div>Radius: <code style="color:#116DFF">--radius-badge (12px)</code></div>
              <div>Layout: flex 1 — equal width</div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Navigation</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Back icon: ArrowLeft 16px <code style="color:#116DFF">--color-gray-500</code></div>
              <div>Share icon: Share2 20px <code style="color:#116DFF">--color-dark-text</code></div>
              <div>Chevron: ChevronDown 12px rotate(-90°) accentColor</div>
              <div>See All: <code style="color:#116DFF">--color-link-blue (#2563EB)</code></div>
            </div>
          </div>

        </div>
      </div>
    `,
  }),
}
