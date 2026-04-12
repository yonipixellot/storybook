import type { Meta, StoryObj } from '@storybook/vue3'
import { userEvent } from 'storybook/test'
import BottomTabBar from './BottomTabBar.vue'

const meta: Meta<typeof BottomTabBar> = {
  title: 'Layout & Overlays/BottomTabBar',
  component: BottomTabBar,
  tags: ['autodocs'],
  parameters: {
    // Force mobile viewport in Docs — the bar is display:none at ≥1024px
    viewport: { defaultViewport: 'mobile390' },
    docs: {
      description: {
        component: `
**BottomTabBar** is the primary mobile navigation bar, fixed to the bottom of the screen.
It shows 5 tabs — Games, Saved, Following, Shop, and My Profile — each with an icon and label.

**Behavior:**
- Active tab icon fills with the accent color; label turns bold
- Tapping a tab emits \`select(id)\` for the parent to handle routing
- Can be controlled (via \`active\` prop) or uncontrolled (self-manages with internal state)
- Hidden at desktop (≥1024px) — replaced by header navigation in \`AppShell\`

**Usage in AppShell:** BottomTabBar is rendered automatically inside \`AppShell\`.
Pass \`accentColor\` to match the org's brand color.
        `.trim(),
      },
    },
  },
  argTypes: {
    active: {
      control: 'select',
      options: ['games', 'saved', 'following', 'shop', 'my-profile'],
      description: 'ID of the currently active tab',
      table: { defaultValue: { summary: 'games' } },
    },
    accentColor: {
      control: 'color',
      description: 'Active tab icon & label color. Defaults to `--color-dark-text` if not set.',
      table: { defaultValue: { summary: 'var(--color-dark-text)' } },
    },
    tabs: {
      control: 'object',
      description: 'Custom tab array. Each item: `{ id: string, label: string, icon: "games" | "saved" | "following" | "shop" | "profile" }`',
    },
  },
  decorators: [
    () => ({ template: '<div style="max-width:430px;background:#fff"><story /></div>' }),
  ],
  args: {
    active: 'games',
    accentColor: undefined,
  },
}

export default meta
type Story = StoryObj<typeof BottomTabBar>

/* ═══════════════════════════════════════════
   1. Interactive — click to switch tabs
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Interactive — click to switch tabs',
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive. Click any tab to switch the active state. No `active` prop is passed — the bar manages state internally.',
      },
    },
  },
  args: {},
}

/* ═══════════════════════════════════════════
   2. Each tab active
   ═══════════════════════════════════════════ */
export const GamesActive: Story = {
  name: 'Games tab active',
  args: { active: 'games' },
}

export const SavedActive: Story = {
  name: 'Saved tab active',
  args: { active: 'saved' },
}

export const FollowingActive: Story = {
  name: 'Following tab active',
  args: { active: 'following' },
}

export const ShopActive: Story = {
  name: 'Shop tab active',
  args: { active: 'shop' },
}

export const MyProfileActive: Story = {
  name: 'My Profile tab active',
  parameters: {
    docs: {
      description: {
        story: 'My Profile tab is active. Tapping this tab should navigate to the player\'s profile page.',
      },
    },
  },
  args: { active: 'my-profile' },
}

/* ═══════════════════════════════════════════
   3. Custom accent color
   ═══════════════════════════════════════════ */
export const CustomAccent: Story = {
  name: 'Custom accent color',
  parameters: {
    docs: {
      description: {
        story: 'Pass `accentColor` to match the organisation\'s brand. Here shown with SD Spartans red.',
      },
    },
  },
  args: { accentColor: '#D0142C', active: 'following' },
}

/* ═══════════════════════════════════════════
   4. Dark Mode
   ═══════════════════════════════════════════ */
export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:430px"><story /></div>' })],
  render: () => ({
    components: { BottomTabBar },
    template: `
      <div style="border:1px solid #444;border-radius:16px;overflow:hidden">
        <p style="font-size:18px;font-weight:700;margin:12px 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <BottomTabBar active="following" />
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   5. Uncontrolled (branch coverage)
   ═══════════════════════════════════════════ */
export const UncontrolledActive: Story = {
  name: 'Uncontrolled active (branch coverage)',
  parameters: {
    docs: {
      description: {
        story: 'No `active` prop — bar uses internal state. `play()` clicks the Saved tab to exercise the `selectTab` branch.',
      },
    },
  },
  args: { active: undefined },
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll<HTMLElement>('.btb__tab')
    if (tabs.length > 1) await userEvent.click(tabs[1])
  },
}

/* ═══════════════════════════════════════════
   6. Desktop — hidden at ≥1024px
   ═══════════════════════════════════════════ */
export const DesktopHidden: Story = {
  name: 'Desktop — hidden at ≥1024px',
  parameters: {
    viewport: { defaultViewport: 'desktop1440' },
    docs: {
      description: {
        story: 'At ≥1024px, AppShell hides the bar via `.ash__btb { display:none }` and shows the footer nav instead. The component itself is always visible when used standalone.',
      },
    },
  },
  decorators: [() => ({ template: '<div style="width:1200px;background:#fff;padding:24px;"><story /></div>' })],
  render: () => ({
    components: { BottomTabBar },
    template: `
      <div>
        <p style="font-size:13px;color:#979797;margin:0 0 12px;font-family:Red Hat Display,sans-serif">
          At ≥1024px the BottomTabBar is hidden (display:none). Resize the viewport to mobile to see it.
        </p>
        <BottomTabBar active="games" />
      </div>
    `,
  }),
}
