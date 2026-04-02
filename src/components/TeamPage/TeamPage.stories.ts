import type { Meta, StoryObj } from '@storybook/vue3'
import TeamPage from './TeamPage.vue'

const meta: Meta<typeof TeamPage> = {
  title: 'Team Profile/TeamPage',
  component: TeamPage,
  tags: ['autodocs'],
  argTypes: {
    teamName:    { control: 'text',  description: 'Team name displayed in nav + hero' },
    sport:       { control: 'text',  description: 'Sport/league label below team name' },
    logoUrl:     { control: 'text',  description: 'Team logo URL (100px circular)' },
    accentColor: { control: 'color', description: 'Logo placeholder background color' },
    width:       { control: { type: 'range', min: 320, max: 430, step: 10 }, description: 'Page width (default 390)' },
  },
  args: {
    teamName:    'S.D Spartans',
    sport:       "Men's Basketball",
    accentColor: '#116DFF',
    width:       390,
  },
  decorators: [
    () => ({ template: '<div style="padding:20px"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof TeamPage>

const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const label = 'font-size:13px;color:#979797;margin:0 0 16px;font-family:Red Hat Display,sans-serif'
const box   = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr    = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ═══════════════════════════════════════════
   1. Default — S.D Spartans
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Default — S.D Spartans',
  args: {},
}

/* ═══════════════════════════════════════════
   2. Accent Color Variants
   ═══════════════════════════════════════════ */
export const AccentColors: Story = {
  render: () => ({
    components: { TeamPage },
    template: `
      <div style="${box}">
        <p style="${title}">Accent Color Variants</p>
        <p style="${label}">The accentColor prop sets the logo placeholder background when no logoUrl is provided.</p>
        <hr style="${hr}" />
        <div style="display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap">
          <TeamPage teamName="S.D Spartans" sport="Men's Basketball" accentColor="#116DFF" />
          <TeamPage teamName="Logan Thunder" sport="Women's Soccer" accentColor="#E8332B" />
          <TeamPage teamName="River Hawks" sport="Men's Football" accentColor="#22C55E" />
        </div>
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   3. With Logo
   ═══════════════════════════════════════════ */
export const WithLogo: Story = {
  name: 'With Logo URL',
  args: {
    teamName: 'S.D Spartans',
    sport:    "Men's Basketball",
    logoUrl:  'https://i.pravatar.cc/150?img=12',
  },
}

/* ═══════════════════════════════════════════
   4. Props Reference
   ═══════════════════════════════════════════ */
export const PropsReference: Story = {
  render: () => ({
    template: `
      <div style="${box}">
        <p style="${title}">Props Reference</p>
        <hr style="${hr}" />
        <div style="font-family:Red Hat Display,sans-serif;font-size:13px;color:#161616;display:flex;flex-direction:column;gap:8px">
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">teamName</code><span style="color:#979797"> string — team name in nav bar + hero (default: "S.D Spartans")</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">sport</code><span style="color:#979797"> string — sport/league label (default: "Men's Basketball")</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">logoUrl?</code><span style="color:#979797"> string — 100px circular team logo (shows colored initials when absent)</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">accentColor</code><span style="color:#979797"> string — logo placeholder background color (default: "#116DFF")</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">width?</code><span style="color:#979797"> number — page width in px (default: 390)</span></div>
        </div>
        <hr style="${hr}" />
        <div style="font-family:Red Hat Display,sans-serif;font-size:13px;color:#979797">
          <strong style="color:#161616">Emits:</strong>
          <code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px;margin:0 4px">@back</code>
          <code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px;margin:0 4px">@follow</code>
          <code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px;margin:0 4px">@share</code>
          <code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px;margin:0 4px">@see-all-games</code>
        </div>
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   5. Token Anatomy
   ═══════════════════════════════════════════ */
export const TokenAnatomy: Story = {
  render: () => ({
    template: `
      <div style="${box}">
        <p style="${title}">Token Anatomy</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;font-family:Red Hat Display,sans-serif;font-size:13px">

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Hero Card</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Background: <code style="color:#116DFF">--color-gray-50</code></div>
              <div>Radius: <code style="color:#116DFF">--radius-badge (12px)</code></div>
              <div>Padding: <code style="color:#116DFF">--space-lg (16px)</code></div>
              <div>Layout: column, centered, gap --space-lg</div>
              <div>Logo: 100×100px circle, accentColor bg</div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Typography</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Logo initials: <code style="color:#116DFF">--text-h1 (28px) --font-bold</code></div>
              <div>Team name: <code style="color:#116DFF">--text-h2 (26px) --font-bold</code></div>
              <div>Sport label: <code style="color:#116DFF">--text-caption (12px)</code> gray-500</div>
              <div>Section title: <code style="color:#116DFF">--text-base (16px) --font-bold</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Action Buttons</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Follow: primary — <code style="color:#116DFF">--color-primary</code> bg</div>
              <div>Share: secondary — transparent bg + border</div>
              <div>Height: <code style="color:#116DFF">--size-button-height (40px)</code></div>
              <div>Radius: <code style="color:#116DFF">--radius-chip (26px)</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Shared with AthleteProfile</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Page bg: linear-gradient white→gray-200→white</div>
              <div>Nav bar: ArrowLeft 16px <code style="color:#116DFF">--color-gray-500</code></div>
              <div>Page width: 390px</div>
            </div>
          </div>

        </div>
      </div>
    `,
  }),
}
