import type { Meta, StoryObj } from '@storybook/vue3'
import { userEvent, within } from 'storybook/test'
import GameLeaders from './GameLeaders.vue'

const meta: Meta<typeof GameLeaders> = {
  title: 'Stats & Info/GameLeaders',
  component: GameLeaders,
  tags: ['autodocs'],
  argTypes: {
    leftTeam:    { control: 'text', description: 'Left team name (for logo alt text)' },
    rightTeam:   { control: 'text', description: 'Right team name' },
    leftLogoUrl: { control: 'text', description: 'Left team logo URL (44px circle)' },
    rightLogoUrl:{ control: 'text', description: 'Right team logo URL (44px circle)' },
  },
  args: {
    leaders: [
      { label: 'Points',   left: { num: '#22', detail: '22 PTS, 9 REB' },  right: { num: '#9',  detail: '19 PTS, 6 REB' } },
      { label: 'Rebounds', left: { num: '#22', detail: '9 REB, 4 OFF' },   right: { num: '#11', detail: '8 REB, 3 OFF'  } },
      { label: 'Assists',  left: { num: '#11', detail: '7 AST, 30 MIN' },  right: { num: '#7',  detail: '6 AST, 28 MIN' } },
    ],
    leftTeam:  'Home',
    rightTeam: 'Away',
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:500px"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof GameLeaders>

const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const label = 'font-size:13px;color:#979797;margin:0 0 16px;font-family:Red Hat Display,sans-serif'
const box   = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr    = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ═══════════════════════════════════════════
   1. Default — 3 leader categories
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Default — Points / Rebounds / Assists',
  args: {},
  play: async ({ canvasElement }) => {
    // Click "See all" button → $emit('see-all') (stmt line 44)
    const seeAllBtn = canvasElement.querySelector<HTMLElement>('.gl__see-all')
    if (seeAllBtn) await userEvent.click(seeAllBtn)
  },
}

/* ═══════════════════════════════════════════
   2. With Team Logos
   ═══════════════════════════════════════════ */
export const WithLogos: Story = {
  name: 'With Team Logos',
  args: {
    leftLogoUrl:  'https://i.pravatar.cc/150?img=5',
    rightLogoUrl: 'https://i.pravatar.cc/150?img=8',
    leftTeam:     'S.D Spartans',
    rightTeam:    'Logan Thunder',
  },
}

/* ═══════════════════════════════════════════
   3. More categories
   ═══════════════════════════════════════════ */
export const FiveCategories: Story = {
  name: 'Five Categories',
  args: {
    leaders: [
      { label: 'Points',   left: { num: '#22', detail: '22 PTS, 9 REB'  }, right: { num: '#9',  detail: '19 PTS, 6 REB' } },
      { label: 'Rebounds', left: { num: '#22', detail: '9 REB, 4 OFF'   }, right: { num: '#11', detail: '8 REB, 3 OFF'  } },
      { label: 'Assists',  left: { num: '#11', detail: '7 AST, 30 MIN'  }, right: { num: '#7',  detail: '6 AST, 28 MIN' } },
      { label: 'Steals',   left: { num: '#5',  detail: '4 STL, 2 BLK'   }, right: { num: '#3',  detail: '3 STL, 1 BLK' } },
      { label: 'Blocks',   left: { num: '#14', detail: '3 BLK, 12 REB'  }, right: { num: '#22', detail: '2 BLK, 8 REB' } },
    ],
  },
}

/* ═══════════════════════════════════════════
   4. Dark Mode
   ═══════════════════════════════════════════ */
export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:500px"><story /></div>' })],
  render: () => ({
    components: { GameLeaders },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <GameLeaders
          :leaders="[
            { label: 'Points',   left: { num: '#22', detail: '22 PTS, 9 REB' },  right: { num: '#9',  detail: '19 PTS, 6 REB' } },
            { label: 'Rebounds', left: { num: '#22', detail: '9 REB, 4 OFF' },   right: { num: '#11', detail: '8 REB, 3 OFF' } },
            { label: 'Assists',  left: { num: '#11', detail: '7 AST, 30 MIN' },  right: { num: '#7',  detail: '6 AST, 28 MIN' } },
          ]"
          leftTeam="Home"
          rightTeam="Away"
        />
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
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Container</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Padding: <code style="color:#116DFF">16px 20px</code></div>
              <div>Title: <code style="color:#116DFF">--text-xs (14px) --font-bold</code></div>
              <div>Title margin: <code style="color:#116DFF">0 0 10px</code></div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Team Logos</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Size: 44×44px, circle</div>
              <div>Background: <code style="color:#116DFF">--color-gray-100</code></div>
              <div>Border: 0.67px <code style="color:#116DFF">--color-gray-300</code></div>
              <div>Row: space-between, margin-bottom 10px</div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Leader Rows</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Layout: flex, space-between, flex:1 each column</div>
              <div>Player #: <code style="color:#116DFF">--text-xs --font-bold --color-dark-text</code></div>
              <div>Detail: <code style="color:#116DFF">--text-caption --font-medium --color-gray-500</code></div>
              <div>Category label: <code style="color:#116DFF">--text-xs --font-medium</code>, center, height 36px</div>
            </div>
          </div>

          <div>
            <p style="margin:0 0 8px;font-weight:700;color:#161616">Divider &amp; Footer</p>
            <div style="display:flex;flex-direction:column;gap:6px;color:#979797">
              <div>Divider: 1px <code style="color:#116DFF">--color-divider-dark (#444746)</code></div>
              <div>Divider margin: 0 0 10px</div>
              <div>See All btn: muted — <code style="color:#116DFF">--color-gray-100</code> bg</div>
              <div>See All radius: 30px, padding: 8px 28px</div>
              <div>Trailing icon: ChevronDown 14px</div>
            </div>
          </div>

        </div>
      </div>
    `,
  }),
}
