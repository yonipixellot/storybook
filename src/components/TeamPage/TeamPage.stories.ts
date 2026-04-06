import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import TeamPage from './TeamPage.vue'
import AppShell from '../AppShell/AppShell.vue'

const meta: Meta<typeof TeamPage> = {
  title: 'Pages/TeamPage',
  component: TeamPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Team profile page. Content only — wrap in AppShell (variant="back") for the sticky header. ' +
          'Sections: BackBar → Hero Card (logo, name, sport, follow/share, social links) → Live → Recent Games (3-col grid at desktop).',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TeamPage>

/* ═══════════════════════════════════════════
   1. Mobile (default)
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Mobile',
  parameters: { viewport: { defaultViewport: 'mobile390' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click Follow — exercises toggleFollow() + isFollowing true branch
    const followBtn = canvas.getByRole('button', { name: /^follow$/i })
    await expect(followBtn).toBeVisible()
    await userEvent.click(followBtn)
    // Verify button now says "Following" (other branch of ternary)
    await canvas.findByRole('button', { name: /following/i })
    // Click Share — exercises $emit('share') (line 25)
    const shareBtn = canvas.getByRole('button', { name: /^share$/i })
    await userEvent.click(shareBtn)
    // Click the Live "See All" — exercises $emit('see-all-live') (line 38)
    const seeAllBtns = canvas.getAllByRole('button', { name: /see all/i })
    if (seeAllBtns.length > 0) await userEvent.click(seeAllBtns[0])
    // Click the Recent Games "See All" — exercises $emit('see-all-games') (line 75)
    if (seeAllBtns.length > 1) await userEvent.click(seeAllBtns[1])
  },
  render: () => ({
    components: { AppShell, TeamPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="S.D Spartans">
        <TeamPage team-name="S.D Spartans" sport="Men's Basketball" accent-color="#116DFF" />
      </AppShell>
    `,
  }),
}

/* ═══════════════════════════════════════════
   2. Desktop
   ═══════════════════════════════════════════ */
export const Desktop: Story = {
  name: 'Desktop',
  parameters: { viewport: { defaultViewport: 'desktop1440' } },
  render: () => ({
    components: { AppShell, TeamPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="S.D Spartans">
        <TeamPage team-name="S.D Spartans" sport="Men's Basketball" accent-color="#116DFF" />
      </AppShell>
    `,
  }),
}

/* ═══════════════════════════════════════════
   3. With Logo
   ═══════════════════════════════════════════ */
export const WithLogo: Story = {
  name: 'With Logo URL',
  parameters: { viewport: { defaultViewport: 'mobile390' } },
  render: () => ({
    components: { AppShell, TeamPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="S.D Spartans">
        <TeamPage team-name="S.D Spartans" sport="Men's Basketball" logo-url="https://i.pravatar.cc/150?img=12" />
      </AppShell>
    `,
  }),
}

/* ═══════════════════════════════════════════
   4. Dark Mode
   ═══════════════════════════════════════════ */
export const DarkMode: Story = {
  name: 'Dark Mode',
  parameters: { viewport: { defaultViewport: 'desktop1440' } },
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A"><story /></div>' })],
  render: () => ({
    components: { AppShell, TeamPage },
    template: `
      <AppShell variant="back" org-name="SD Spartans" page-title="S.D Spartans">
        <TeamPage team-name="S.D Spartans" sport="Men's Basketball" accent-color="#116DFF" />
      </AppShell>
    `,
  }),
}
