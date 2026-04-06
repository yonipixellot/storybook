import type { Meta, StoryObj } from '@storybook/vue3'
import PTeamLogo from './PTeamLogo.vue'

const meta: Meta<typeof PTeamLogo> = {
  title: 'Avatars & List Items/PTeamLogo',
  component: PTeamLogo,
  tags: ['autodocs'],
  argTypes: {
    size:    { control: { type: 'range', min: 20, max: 80 }, description: 'Circle diameter in px' },
    name:    { control: 'text', description: 'Team name (used for deterministic color + initial fallback)' },
    logoUrl: { control: 'text', description: 'If provided, renders the logo image instead of placeholder' },
  },
  args: {
    size: 40,
    name: 'Maccabi',
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;background:#fff"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof PTeamLogo>

/* ═══════════════════════════════════════════
   1. Placeholder — no logo
   ═══════════════════════════════════════════ */
export const Placeholder: Story = {
  name: 'Placeholder (no logo) — deterministic colors',
  render: () => ({
    components: { PTeamLogo },
    template: `
      <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
        <div v-for="name in ['Maccabi', 'Riverside', 'Thunder', 'Spartans', 'Lions', 'Eagles']"
          :key="name"
          style="display:flex;flex-direction:column;align-items:center;gap:6px"
        >
          <PTeamLogo :name="name" :size="40" />
          <span style="font-family:Red Hat Display,sans-serif;font-size:11px;color:#979797">{{ name }}</span>
        </div>
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   2. Size variants
   ═══════════════════════════════════════════ */
export const Sizes: Story = {
  name: 'Size Variants',
  render: () => ({
    components: { PTeamLogo },
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <PTeamLogo name="Maccabi" :size="24" />
        <PTeamLogo name="Maccabi" :size="28" />
        <PTeamLogo name="Maccabi" :size="40" />
        <PTeamLogo name="Maccabi" :size="48" />
        <PTeamLogo name="Maccabi" :size="60" />
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   3. With logo URL
   ═══════════════════════════════════════════ */
export const WithLogo: Story = {
  name: 'With Logo URL',
  args: {
    size:    40,
    name:    'S.D Spartans',
    logoUrl: 'https://i.pravatar.cc/150?img=5',
  },
}

/* Covers teamColor `if (!props.name) return TEAM_COLORS[0]` and initial `? ... : 'T'` branches */
export const NoName: Story = {
  name: 'No Name (fallback initial)',
  args: {
    size: 40,
    name: '',
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { PTeamLogo },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <PTeamLogo name="Maccabi" :size="40" />
          <PTeamLogo name="Riverside" :size="40" />
          <PTeamLogo name="Thunder" :size="40" />
          <PTeamLogo name="Spartans" :size="40" />
          <PTeamLogo name="Lions" :size="40" logoUrl="https://i.pravatar.cc/150?img=5" />
        </div>
      </div>
    `,
  }),
}
