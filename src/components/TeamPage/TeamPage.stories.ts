import type { Meta, StoryObj } from '@storybook/vue3'
import TeamPage from './TeamPage.vue'

const meta: Meta<typeof TeamPage> = {
  title: 'Team Profile/TeamPage',
  component: TeamPage,
  tags: ['autodocs'],
  argTypes: {
    teamName:    { control: 'text',  description: 'Team name shown in BackBar + hero' },
    sport:       { control: 'text',  description: 'Sport / league label below team name' },
    logoUrl:     { control: 'text',  description: 'Team logo URL — circular 100px; shows coloured initials when absent' },
    accentColor: { control: 'color', description: 'Logo placeholder background when no logoUrl' },
    width:       { control: { type: 'range', min: 320, max: 430, step: 10 }, description: 'Page width in px (default 390)' },
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

const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr  = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ═══════════════════════════════════════════
   1. Default — S.D Spartans
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Default — S.D Spartans',
  args: {},
}

/* ═══════════════════════════════════════════
   2. With Logo
   ═══════════════════════════════════════════ */
export const WithLogo: Story = {
  name: 'With Logo URL',
  args: {
    logoUrl: 'https://i.pravatar.cc/150?img=12',
  },
}

/* ═══════════════════════════════════════════
   3. Accent Color Variants (stacked vertically)
   ═══════════════════════════════════════════ */
export const AccentColors: Story = {
  name: 'Accent Color Variants',
  render: () => ({
    components: { TeamPage },
    template: `
      <div style="${box}">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616">Accent Color Variants</p>
        <p style="font-size:13px;color:#979797;margin:0 0 16px;font-family:Red Hat Display,sans-serif">Logo placeholder background when no logoUrl is provided.</p>
        <hr style="${hr}" />
        <div style="display:flex;flex-direction:column;gap:24px">
          <TeamPage teamName="S.D Spartans"  sport="Men's Basketball" accentColor="#116DFF" :width="390" />
          <TeamPage teamName="Logan Thunder"  sport="Women's Soccer"   accentColor="#E8332B" :width="390" />
          <TeamPage teamName="River Hawks"    sport="Men's Football"   accentColor="#22C55E" :width="390" />
        </div>
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   4. Dark Mode
   ═══════════════════════════════════════════ */
export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  args: {},
}

/* ═══════════════════════════════════════════
   5. Props Reference
   ═══════════════════════════════════════════ */
export const PropsReference: Story = {
  name: 'Props Reference',
  render: () => ({
    template: `
      <div style="${box}">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616">Props Reference</p>
        <hr style="${hr}" />
        <div style="font-family:Red Hat Display,sans-serif;font-size:13px;color:#161616;display:flex;flex-direction:column;gap:8px">
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">teamName</code><span style="color:#979797"> string — team name in BackBar + hero (default: "S.D Spartans")</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">sport</code><span style="color:#979797"> string — sport/league label (default: "Men's Basketball")</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">logoUrl?</code><span style="color:#979797"> string — 100px circular logo (shows coloured initials when absent)</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">accentColor</code><span style="color:#979797"> string — logo placeholder background (default: "#116DFF")</span></div>
          <div><code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px">width?</code><span style="color:#979797"> number — page width in px (default: 390)</span></div>
        </div>
        <hr style="${hr}" />
        <div style="font-family:Red Hat Display,sans-serif;font-size:13px;color:#979797">
          <strong style="color:#161616">Emits:</strong>
          <code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px;margin:0 4px">@back</code>
          <code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px;margin:0 4px">@share</code>
          <code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px;margin:0 4px">@see-all-live</code>
          <code style="color:#116DFF;background:#EEF3FF;padding:2px 6px;border-radius:4px;margin:0 4px">@see-all-games</code>
        </div>
      </div>
    `,
  }),
}
