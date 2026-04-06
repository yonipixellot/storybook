import type { Meta, StoryObj } from '@storybook/vue3'
import { userEvent, within, fireEvent } from 'storybook/test'
import AppTabs from './AppTabs.vue'

const meta: Meta<typeof AppTabs> = {
  title: 'Navigation/AppTabs',
  component: AppTabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Segmented tab control in two visual modes: pill (toggle-style inside a gray container) and underline (active tab with an accent-color bottom border). Emits `update:active` on selection.',
      },
    },
  },
  decorators: [() => ({ template: '<div style="max-width:430px;padding:20px"><story /></div>' })],
  argTypes: {
    tabs:        { control: 'object', description: 'Array of tab items — each with `{ label: string, value: string, disabled?: boolean }`' },
    active:      { control: 'text',   description: 'Value of the currently active tab' },
    variant:     { control: 'select', options: ['pill', 'underline'], description: 'Visual style — pill (toggle container) or underline (accent border)' },
    accentColor: { control: 'color',  description: 'Accent color for the underline variant active indicator (defaults to --color-primary)' },
  },
}

export default meta
type Story = StoryObj<typeof AppTabs>

const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const boxUnderline = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 0;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'
const stLabel = 'font-size:12px;color:#979797;text-align:center;margin-top:6px;font-family:Red Hat Display,sans-serif'

/* ── Pill Default ── */

export const PillDefault: Story = {
  render: () => ({
    components: { AppTabs },
    data() {
      return { active: 'signin' }
    },
    template: `
      <div style="${box}">
        <p style="${title}">pill (default)</p>
        <hr style="${hr}" />
        <AppTabs
          :tabs="[{ label: 'Sign In', value: 'signin' }, { label: 'Sign Up', value: 'signup' }]"
          :active="active"
          variant="pill"
          @update:active="v => active = v"
        />
        <p style="${stLabel}">Active: {{ active }}</p>
      </div>
    `,
  }),
}

/* ── Pill Interactive States ── */

export const PillInteractiveStates: Story = {
  render: () => ({
    components: { AppTabs },
    template: `
      <div style="${box}">
        <p style="${title}">pill — Interactive States</p>
        <p style="${label}">Hover and pressed states on inactive tabs</p>
        <hr style="${hr}" />

        <p style="${stLabel}">Inactive tab → default</p>
        <AppTabs
          :tabs="[{ label: 'Sign In', value: 'signin' }, { label: 'Sign Up', value: 'signup' }]"
          active="signin"
          variant="pill"
        />

        <div style="height:20px"></div>

        <p style="${stLabel}">Inactive tab → hover</p>
        <div style="display:flex;background:#EDEDED;border-radius:16px;padding:4px">
          <button style="flex:1 1 0%;background:#FFFFFF;color:#000;border-radius:16px;height:38px;padding:1px 6px;font-size:15px;font-weight:500;font-family:Red Hat Display,sans-serif;border:none;cursor:pointer">Sign In</button>
          <button style="flex:1 1 0%;background:#DCDCDC;color:#6C6C6C;border-radius:16px;height:38px;padding:1px 6px;font-size:15px;font-weight:500;font-family:Red Hat Display,sans-serif;border:none;cursor:pointer">Sign Up</button>
        </div>

        <div style="height:20px"></div>

        <p style="${stLabel}">Inactive tab → active (pressed)</p>
        <AppTabs
          :tabs="[{ label: 'Sign In', value: 'signin' }, { label: 'Sign Up', value: 'signup' }]"
          active="signup"
          variant="pill"
        />
      </div>
    `,
  }),
}

/* ── Underline Default ── */

export const UnderlineDefault: Story = {
  render: () => ({
    components: { AppTabs },
    data() {
      return { active: 'schedule' }
    },
    template: `
      <div style="${boxUnderline}">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;padding:0 28px;font-family:Red Hat Display,sans-serif;color:#161616">underline (default — team red)</p>
        <p style="font-size:13px;color:#979797;margin:0 0 16px;padding:0 28px;font-family:Red Hat Display,sans-serif">accentColor defaults to #EF4444. Pass any team color.</p>
        <hr style="${hr}" />
        <AppTabs
          :tabs="[{ label: 'Schedule', value: 'schedule' }, { label: 'Results', value: 'results' }, { label: 'Standings', value: 'standings' }]"
          :active="active"
          variant="underline"
          accentColor="#EF4444"
          @update:active="v => active = v"
        />
        <p style="${stLabel}">accentColor="#EF4444" (default)</p>
      </div>
    `,
  }),
}

/* ── Underline Interactive States ── */

export const UnderlineInteractiveStates: Story = {
  render: () => ({
    components: { AppTabs },
    template: `
      <div style="${boxUnderline}">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;padding:0 28px;font-family:Red Hat Display,sans-serif;color:#161616">underline — Interactive States</p>
        <p style="font-size:13px;color:#979797;margin:0 0 16px;padding:0 28px;font-family:Red Hat Display,sans-serif">Hover shows faint accent underline hint; pressed darkens text</p>
        <hr style="${hr}" />

        <p style="${stLabel}">Inactive tab → default</p>
        <AppTabs
          :tabs="[{ label: 'Schedule', value: 'schedule' }, { label: 'Results', value: 'results' }, { label: 'Standings', value: 'standings' }]"
          active="schedule"
          variant="underline"
          accentColor="#EF4444"
        />

        <div style="height:20px"></div>

        <p style="${stLabel}">Inactive tab → hover</p>
        <div style="display:flex;gap:24px;padding:0 16px;border-bottom:1px solid #EDEDED">
          <button style="background:transparent;color:#000;border:none;border-bottom:3px solid #EF4444;padding:16px 0;font-size:15px;font-weight:500;font-family:Red Hat Display,sans-serif;cursor:pointer;outline:none">Schedule</button>
          <button style="background:transparent;color:#6C6C6C;border:none;border-bottom:none;padding:16px 0;font-size:15px;font-weight:500;font-family:Red Hat Display,sans-serif;cursor:pointer;outline:none">Results</button>
          <button style="background:transparent;color:#979797;border:none;border-bottom:none;padding:16px 0;font-size:15px;font-weight:500;font-family:Red Hat Display,sans-serif;cursor:pointer;outline:none">Standings</button>
        </div>

        <div style="height:20px"></div>

        <p style="${stLabel}">Inactive tab → active (pressed)</p>
        <AppTabs
          :tabs="[{ label: 'Schedule', value: 'schedule' }, { label: 'Results', value: 'results' }, { label: 'Standings', value: 'standings' }]"
          active="results"
          variant="underline"
          accentColor="#EF4444"
        />
      </div>
    `,
  }),
}

/* ── Underline Custom Colors ── */

export const UnderlineCustomColors: Story = {
  render: () => ({
    components: { AppTabs },
    template: `
      <div style="${boxUnderline}">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;padding:0 28px;font-family:Red Hat Display,sans-serif;color:#161616">underline — custom team colors</p>
        <p style="font-size:13px;color:#979797;margin:0 0 16px;padding:0 28px;font-family:Red Hat Display,sans-serif">Same component, different accentColor per team/client</p>
        <hr style="${hr}" />

        <p style="${stLabel}">accentColor="#116DFF" (Maccabi blue)</p>
        <AppTabs
          :tabs="[{ label: 'Overview', value: 'overview' }, { label: 'Stats', value: 'stats' }, { label: 'Highlights', value: 'highlights' }]"
          active="overview"
          variant="underline"
          accentColor="#116DFF"
        />

        <div style="height:24px"></div>

        <p style="${stLabel}">accentColor="#22C55E" (Haifa green)</p>
        <AppTabs
          :tabs="[{ label: 'Overview', value: 'overview' }, { label: 'Stats', value: 'stats' }, { label: 'Highlights', value: 'highlights' }]"
          active="overview"
          variant="underline"
          accentColor="#22C55E"
        />

        <div style="height:24px"></div>

        <p style="${stLabel}">accentColor="#E7A610" (premium amber)</p>
        <AppTabs
          :tabs="[{ label: 'Overview', value: 'overview' }, { label: 'Stats', value: 'stats' }, { label: 'Highlights', value: 'highlights' }]"
          active="overview"
          variant="underline"
          accentColor="#E7A610"
        />
      </div>
    `,
  }),
}

/* ── Dark Mode ── */

export const DarkMode: Story = {
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px"><story /></div>' })],
  render: () => ({
    components: { AppTabs },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px;margin-bottom:24px">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <p style="font-size:13px;color:#888;margin:0 0 16px;font-family:Red Hat Display,sans-serif">Active pill = brand-blue; underline border = #555</p>
        <hr style="border:none;border-top:1px solid #444;margin:0 0 24px" />

        <p style="font-size:12px;color:#888;margin:0 0 8px;font-family:Red Hat Display,sans-serif">pill — active tab becomes brand-blue</p>
        <AppTabs
          :tabs="[{ label: 'Sign In', value: 'signin' }, { label: 'Sign Up', value: 'signup' }]"
          active="signin"
          variant="pill"
          style="margin-bottom:24px"
        />

        <p style="font-size:12px;color:#888;margin:24px 0 8px;font-family:Red Hat Display,sans-serif">underline — border-bottom #555, active text light</p>
        <AppTabs
          :tabs="[{ label: 'Schedule', value: 'schedule' }, { label: 'Results', value: 'results' }, { label: 'Standings', value: 'standings' }]"
          active="schedule"
          variant="underline"
          accentColor="#EF4444"
        />
      </div>
    `,
  }),
}

/* ── Disabled Tabs ── */

export const DisabledTabs: Story = {
  render: () => ({
    components: { AppTabs },
    template: `
      <div style="${boxUnderline}">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;padding:0 28px;font-family:Red Hat Display,sans-serif;color:#161616">Disabled Tabs</p>
        <p style="font-size:13px;color:#979797;margin:0 0 16px;padding:0 28px;font-family:Red Hat Display,sans-serif">Individual tabs can be disabled — grayed out, not clickable</p>
        <hr style="${hr}" />

        <p style="${stLabel}">pill — "Sign Up" disabled</p>
        <AppTabs
          :tabs="[{ label: 'Sign In', value: 'signin' }, { label: 'Sign Up', value: 'signup', disabled: true }]"
          active="signin"
          variant="pill"
        />

        <div style="height:24px"></div>

        <p style="${stLabel}">underline — "Standings" disabled</p>
        <AppTabs
          :tabs="[{ label: 'Schedule', value: 'schedule' }, { label: 'Results', value: 'results' }, { label: 'Standings', value: 'standings', disabled: true }]"
          active="schedule"
          variant="underline"
          accentColor="#EF4444"
        />
      </div>
    `,
  }),
}

/* Covers !tab.disabled && ... false branch (disabled tab click) */
export const DisabledClick: Story = {
  name: 'Disabled Tab Click (branch coverage)',
  args: {
    tabs:    [{ label: 'Sign In', value: 'signin' }, { label: 'Sign Up', value: 'signup', disabled: true }],
    active:  'signin',
    variant: 'pill',
  },
  play: async ({ canvasElement }) => {
    // fireEvent bypasses HTML disabled — triggers Vue @click handler with tab.disabled=true
    // → !tab.disabled is false → short-circuit → emit NOT called (covers && false branch)
    const disabledBtn = canvasElement.querySelector<HTMLElement>('.app-tabs__btn[disabled]')
    if (disabledBtn) await fireEvent.click(disabledBtn)
    // Also click enabled tab → !tab.disabled is true → emit fires (covers && true branch)
    const enabledBtns = canvasElement.querySelectorAll<HTMLElement>('.app-tabs__btn:not([disabled])')
    if (enabledBtns.length > 0) await userEvent.click(enabledBtns[0])
  },
}
