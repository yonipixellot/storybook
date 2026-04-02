import type { Meta, StoryObj } from '@storybook/vue3'
import SocialLinks from './SocialLinks.vue'

const meta: Meta<typeof SocialLinks> = {
  title: 'Navigation/SocialLinks',
  component: SocialLinks,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div style="max-width:500px;padding:20px"><story /></div>' })],
}

export default meta
type Story = StoryObj<typeof SocialLinks>

const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

const allLinks = [
  { type: 'x' as const, url: 'https://x.com/team' },
  { type: 'facebook' as const, url: 'https://facebook.com/team' },
  { type: 'instagram' as const, url: 'https://instagram.com/team' },
  { type: 'website' as const, url: 'https://team.com' },
]

/* ── All Icons ── */

export const AllIcons: Story = {
  render: () => ({
    components: { SocialLinks },
    template: `
      <div style="${box}">
        <p style="${title}">SocialLinks</p>
        <p style="${label}">Monochrome social media icons — X, Facebook, Instagram, Website. Used in team profile.</p>
        <hr style="${hr}" />
        <SocialLinks :links="[
          { type: 'x', url: 'https://x.com/team' },
          { type: 'facebook', url: 'https://facebook.com/team' },
          { type: 'instagram', url: 'https://instagram.com/team' },
          { type: 'website', url: 'https://team.com' },
        ]" />
      </div>
    `,
  }),
}

/* ── Partial Links ── */

export const PartialLinks: Story = {
  render: () => ({
    components: { SocialLinks },
    template: `
      <div style="${box}">
        <p style="${title}">Partial Links</p>
        <p style="${label}">Teams may not have all social links — component only shows icons for provided URLs.</p>
        <hr style="${hr}" />
        <SocialLinks :links="[
          { type: 'x', url: 'https://x.com/team' },
          { type: 'instagram', url: 'https://instagram.com/team' },
        ]" />
      </div>
    `,
  }),
}

