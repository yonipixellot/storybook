import type { Meta, StoryObj } from '@storybook/vue3'
import VideoTypeChips from './VideoTypeChips.vue'

const meta: Meta<typeof VideoTypeChips> = {
  title: 'Video/VideoTypeChips',
  component: VideoTypeChips,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Horizontally scrollable row of filter chips for video content type (Full Game, Condensed Game, Highlights, etc.). Active chip is highlighted; emits `update:modelValue` on tap.',
      },
    },
  },
  argTypes: {
    modelValue: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof VideoTypeChips>

/* ── Style constants (story scaffolding only) ── */
const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'
const stLabel = 'font-size:12px;color:#979797;text-align:left;margin:12px 0 6px;font-family:Red Hat Display,sans-serif'

/* ─────────────────────────────────────────────────────────────
   1. INTERACTIVE PREVIEW
   Click chips to switch active state. Lock icons persist.
───────────────────────────────────────────────────────────── */
export const Interactive: Story = {
  render: () => ({
    components: { VideoTypeChips },
    data() {
      return { active: 'Full Game' }
    },
    template: `
      <div style="${box}">
        <p style="${title}">Interactive Preview</p>
        <p style="${label}">Click chips to switch active state. Lock icons persist on any chip.</p>
        <hr style="${hr}" />
        <VideoTypeChips
          :modelValue="active"
          @update:modelValue="v => active = v"
        />
        <p style="${stLabel}">Active: {{ active }}</p>
      </div>
    `,
  }),
}

/* ─────────────────────────────────────────────────────────────
   2. CHIP STATES
   Each chip type × 4 interaction states
───────────────────────────────────────────────────────────── */
export const ChipStates: Story = {
  render: () => ({
    components: { VideoTypeChips },
    template: `
      <div style="${box}">
        <p style="${title}">Chip States</p>
        <p style="${label}">Each chip type shown in all 4 interaction states</p>
        <hr style="${hr}" />

        <!-- Active chip states -->
        <p style="${stLabel}">Active chip (selected) — default / hover / pressed</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
          <!-- default -->
          <div>
            <VideoTypeChips
              :chips="[{ label: 'Full Game' }]"
              modelValue="Full Game"
            />
            <p style="font-size:11px;color:#979797;margin:4px 0 0;font-family:Red Hat Display,sans-serif">default</p>
          </div>
          <!-- hover — static mockup -->
          <div>
            <button style="display:inline-flex;align-items:center;height:40px;border-radius:26px;padding:8px 12px;border:none;cursor:pointer;font-family:Red Hat Display,sans-serif;font-size:16px;font-weight:700;background:#B3101F;color:#fff;white-space:nowrap">Full Game</button>
            <p style="font-size:11px;color:#979797;margin:4px 0 0;font-family:Red Hat Display,sans-serif">hover</p>
          </div>
          <!-- pressed — static mockup -->
          <div>
            <button style="display:inline-flex;align-items:center;height:40px;border-radius:26px;padding:8px 12px;border:none;cursor:pointer;font-family:Red Hat Display,sans-serif;font-size:16px;font-weight:700;background:#9A0D1A;color:#fff;white-space:nowrap">Full Game</button>
            <p style="font-size:11px;color:#979797;margin:4px 0 0;font-family:Red Hat Display,sans-serif">pressed</p>
          </div>
        </div>

        <div style="height:20px"></div>

        <!-- Inactive chip states -->
        <p style="${stLabel}">Inactive chip (free content) — default / hover / pressed / disabled</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
          <!-- default -->
          <div>
            <VideoTypeChips
              :chips="[{ label: 'Game Highlights' }]"
              modelValue=""
            />
            <p style="font-size:11px;color:#979797;margin:4px 0 0;font-family:Red Hat Display,sans-serif">default</p>
          </div>
          <!-- hover — static mockup -->
          <div>
            <button style="display:inline-flex;align-items:center;height:40px;border-radius:26px;padding:8px 12px;border:none;cursor:pointer;font-family:Red Hat Display,sans-serif;font-size:16px;font-weight:400;background:#C7CBD0;color:#000;white-space:nowrap">Game Highlights</button>
            <p style="font-size:11px;color:#979797;margin:4px 0 0;font-family:Red Hat Display,sans-serif">hover</p>
          </div>
          <!-- pressed — static mockup -->
          <div>
            <button style="display:inline-flex;align-items:center;height:40px;border-radius:26px;padding:8px 12px;border:none;cursor:pointer;font-family:Red Hat Display,sans-serif;font-size:16px;font-weight:400;background:#DCDCDC;color:#000;white-space:nowrap">Game Highlights</button>
            <p style="font-size:11px;color:#979797;margin:4px 0 0;font-family:Red Hat Display,sans-serif">pressed</p>
          </div>
          <!-- disabled -->
          <div>
            <VideoTypeChips
              :chips="[{ label: 'Game Highlights', disabled: true }]"
              modelValue=""
            />
            <p style="font-size:11px;color:#979797;margin:4px 0 0;font-family:Red Hat Display,sans-serif">disabled</p>
          </div>
        </div>

        <div style="height:20px"></div>

        <!-- Inactive + Lock chip states -->
        <p style="${stLabel}">Inactive + Lock chip (premium) — default / hover / pressed / disabled</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
          <!-- default -->
          <div>
            <VideoTypeChips
              :chips="[{ label: 'Condensed Game', locked: true }]"
              modelValue=""
            />
            <p style="font-size:11px;color:#979797;margin:4px 0 0;font-family:Red Hat Display,sans-serif">default</p>
          </div>
          <!-- hover — static mockup -->
          <div>
            <button style="display:inline-flex;align-items:center;gap:8px;height:40px;border-radius:26px;padding:8px 12px;border:none;cursor:pointer;font-family:Red Hat Display,sans-serif;font-size:16px;font-weight:400;background:#C7CBD0;color:#000;white-space:nowrap">
              Condensed Game
              <span style="width:28px;height:28px;border-radius:50%;background:#362F2C;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0">
                <svg width="12" height="15" viewBox="0 0 8 10" style="fill:#FFE000">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.026 4.069H6.738L6.737 2.701C6.736 1.211 5.465-.001 3.903 0 2.341.001 1.07 1.213 1.072 2.703L1.074 4.071H.971C.434 4.072-.001 4.488 0 5v4.072c0 .512.437.928.974.928l6.055-.003c.537 0 .972-.416.972-.928V4.996c0-.512-.437-.928-.974-.928ZM2.118 4.071L2.115 2.703c0-.94.802-1.707 1.788-1.707.987 0 1.789.765 1.789 1.706l.003 1.368H2.118Z" />
                </svg>
              </span>
            </button>
            <p style="font-size:11px;color:#979797;margin:4px 0 0;font-family:Red Hat Display,sans-serif">hover</p>
          </div>
          <!-- pressed — static mockup -->
          <div>
            <button style="display:inline-flex;align-items:center;gap:8px;height:40px;border-radius:26px;padding:8px 12px;border:none;cursor:pointer;font-family:Red Hat Display,sans-serif;font-size:16px;font-weight:400;background:#DCDCDC;color:#000;white-space:nowrap">
              Condensed Game
              <span style="width:28px;height:28px;border-radius:50%;background:#362F2C;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0">
                <svg width="12" height="15" viewBox="0 0 8 10" style="fill:#FFE000">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.026 4.069H6.738L6.737 2.701C6.736 1.211 5.465-.001 3.903 0 2.341.001 1.07 1.213 1.072 2.703L1.074 4.071H.971C.434 4.072-.001 4.488 0 5v4.072c0 .512.437.928.974.928l6.055-.003c.537 0 .972-.416.972-.928V4.996c0-.512-.437-.928-.974-.928ZM2.118 4.071L2.115 2.703c0-.94.802-1.707 1.788-1.707.987 0 1.789.765 1.789 1.706l.003 1.368H2.118Z" />
                </svg>
              </span>
            </button>
            <p style="font-size:11px;color:#979797;margin:4px 0 0;font-family:Red Hat Display,sans-serif">pressed</p>
          </div>
          <!-- disabled -->
          <div>
            <VideoTypeChips
              :chips="[{ label: 'Condensed Game', locked: true, disabled: true }]"
              modelValue=""
            />
            <p style="font-size:11px;color:#979797;margin:4px 0 0;font-family:Red Hat Display,sans-serif">disabled</p>
          </div>
        </div>
      </div>
    `,
  }),
}

/* ─────────────────────────────────────────────────────────────
   3. ALL ACTIVE STATES
   Each chip shown as the active selection
───────────────────────────────────────────────────────────── */
export const AllActiveStates: Story = {
  render: () => ({
    components: { VideoTypeChips },
    template: `
      <div style="${box}">
        <p style="${title}">All Active States</p>
        <p style="${label}">Each chip shown as the active selection — lock icon persists even when active</p>
        <hr style="${hr}" />

        <p style="${stLabel}">Full Game — active</p>
        <VideoTypeChips modelValue="Full Game" />

        <p style="${stLabel}">Condensed Game — active (lock icon stays visible)</p>
        <VideoTypeChips modelValue="Condensed Game" />

        <p style="${stLabel}">Game Highlights — active</p>
        <VideoTypeChips modelValue="Game Highlights" />
      </div>
    `,
  }),
}

/* ─────────────────────────────────────────────────────────────
   4. ANATOMY
   Token mapping for each visual state
───────────────────────────────────────────────────────────── */
export const Anatomy: Story = {
  render: () => ({
    components: { VideoTypeChips },
    template: `
      <div style="${box}">
        <p style="${title}">Anatomy — Token Mapping</p>
        <p style="${label}">Design token reference for each chip state</p>
        <hr style="${hr}" />

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
          <div>
            <VideoTypeChips modelValue="Full Game" />
            <div style="margin-top:12px;font-family:Red Hat Display,sans-serif;font-size:13px;line-height:1.8;color:#6C6C6C">
              <strong style="color:#161616">Active chip</strong><br/>
              bg: <code>--color-jersey-red</code> (#D0142C)<br/>
              text: <code>--color-white</code><br/>
              weight: <code>--font-bold</code> (700)<br/>
              hover bg: <code>--color-jersey-red-hover</code><br/>
              pressed bg: <code>--color-jersey-red-active</code>
            </div>
          </div>

          <div>
            <VideoTypeChips modelValue="Full Game" />
            <div style="margin-top:12px;font-family:Red Hat Display,sans-serif;font-size:13px;line-height:1.8;color:#6C6C6C">
              <strong style="color:#161616">Inactive chip</strong><br/>
              bg: <code>--color-gray-100</code> (#EDEDED)<br/>
              text: <code>--color-black</code><br/>
              weight: <code>--font-regular</code> (400)<br/>
              hover bg: <code>--color-gray-200</code><br/>
              pressed bg: <code>--color-gray-300</code>
            </div>
          </div>

          <div>
            <VideoTypeChips :chips="[{ label: 'Condensed Game', locked: true }]" modelValue="" />
            <div style="margin-top:12px;font-family:Red Hat Display,sans-serif;font-size:13px;line-height:1.8;color:#6C6C6C">
              <strong style="color:#161616">Lock circle</strong><br/>
              size: 28×28px<br/>
              bg: <code>--color-premium-dark</code> (#362F2C)<br/>
              radius: <code>--radius-full</code> (50%)<br/>
              icon fill: <code>--color-premium-yellow</code> (#FFE000)
            </div>
          </div>

          <div>
            <VideoTypeChips :chips="[{ label: 'Condensed Game', disabled: true }]" modelValue="" />
            <div style="margin-top:12px;font-family:Red Hat Display,sans-serif;font-size:13px;line-height:1.8;color:#6C6C6C">
              <strong style="color:#161616">Disabled chip</strong><br/>
              bg: <code>--color-gray-overlay</code><br/>
              text: <code>--color-gray-400</code> (#979797)<br/>
              cursor: not-allowed
            </div>
          </div>
        </div>

        <hr style="${hr}" />
        <p style="${label}">Chip row layout</p>
        <div style="font-family:Red Hat Display,sans-serif;font-size:13px;line-height:1.8;color:#6C6C6C">
          height: <code>--size-button-height</code> (40px) &nbsp;·&nbsp;
          gap: 12px &nbsp;·&nbsp;
          padding: 8px 12px &nbsp;·&nbsp;
          border-radius: 26px &nbsp;·&nbsp;
          font-size: <code>--text-base</code> (16px) &nbsp;·&nbsp;
          overflow-x: auto (scrollable on narrow viewports)
        </div>
      </div>
    `,
  }),
}

/* ─────────────────────────────────────────────────────────────
   5. DEFAULT (controls)
───────────────────────────────────────────────────────────── */
export const Default: Story = {
  args: {
    modelValue: 'Full Game',
    ariaLabel: 'Video type',
    chips: [
      { label: 'Full Game' },
      { label: 'Condensed Game', locked: true },
      { label: 'Game Highlights' },
    ],
  },
  decorators: [() => ({ template: '<div style="padding:20px"><story /></div>' })],
}

/* ─────────────────────────────────────────────────────────────
   6. WITH LOCKED ACTIVE
   Locked chip selected as active
───────────────────────────────────────────────────────────── */
export const LockedActive: Story = {
  render: () => ({
    components: { VideoTypeChips },
    template: `
      <div style="${box}">
        <p style="${title}">Locked + Active</p>
        <p style="${label}">A locked chip can be the active selection — lock icon persists on the red background</p>
        <hr style="${hr}" />
        <VideoTypeChips modelValue="Condensed Game" />
      </div>
    `,
  }),
}

/* ─────────────────────────────────────────────────────────────
   7. SCROLLABLE ROW
   More chips than fit in mobile width
───────────────────────────────────────────────────────────── */
export const ScrollableRow: Story = {
  render: () => ({
    components: { VideoTypeChips },
    template: `
      <div style="max-width:320px;${box}">
        <p style="${title}">Scrollable Row</p>
        <p style="${label}">On narrow viewports, chips scroll horizontally (no scrollbar shown)</p>
        <hr style="${hr}" />
        <VideoTypeChips
          :chips="[
            { label: 'Full Game' },
            { label: 'Condensed Game', locked: true },
            { label: 'Game Highlights' },
            { label: 'Clip Reel', locked: true },
            { label: 'Overtime Only' },
          ]"
          modelValue="Full Game"
        />
      </div>
    `,
  }),
}
