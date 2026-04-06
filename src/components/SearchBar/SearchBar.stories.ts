import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import SearchBar from './SearchBar.vue'

const meta: Meta<typeof SearchBar> = {
  title: 'Layout & Overlays/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Pill-shaped search input with a leading Search icon, placeholder text, and an inline clear (×) button. Shows a primary-color border ring on focus; supports readonly and disabled states.',
      },
    },
  },
  argTypes: {
    modelValue:  { control: 'text',    description: 'v-model binding — the search query string' },
    placeholder: { control: 'text',    description: 'Placeholder text shown when empty (default: "Search…")' },
    clearable:   { control: 'boolean', description: 'Show the inline × clear button when there is text (default: true)' },
    readonly:    { control: 'boolean', description: 'Makes the input non-editable but still focusable' },
    disabled:    { control: 'boolean', description: 'Fully disables the input — muted appearance, no interaction' },
    iconSize:    { control: 'number',  description: 'Size of the leading Search icon in px (default: 18)' },
  },
  decorators: [
    () => ({ template: '<div style="padding:20px;max-width:430px;background:#fff"><story /></div>' }),
  ],
  args: {
    modelValue: '',
    placeholder: 'Search any team or competition...',
    clearable: true,
    readonly: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof SearchBar>

const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'
const stLabel = 'font-size:12px;color:#979797;text-align:center;margin-top:6px;font-family:Red Hat Display,sans-serif'

/* ═══════════════════════════════════════════
   1. Empty — default state
   ═══════════════════════════════════════════ */
export const Default: Story = {
  name: 'Empty — default state',
  args: { modelValue: '' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    await expect(input).not.toBeDisabled()
    await userEvent.click(input)    // triggers focused = true
    await userEvent.type(input, 'Barcelona')
    await userEvent.clear(input)   // reset
  },
}

/* ═══════════════════════════════════════════
   2. Filled with value
   ═══════════════════════════════════════════ */
export const Filled: Story = {
  name: 'Filled with value',
  args: { modelValue: 'Premier League' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Clear button is visible because modelValue is non-empty and clearable=true
    const clearBtn = canvas.getByRole('button', { name: /clear search/i })
    await expect(clearBtn).toBeVisible()
    await userEvent.click(clearBtn) // exercises update:modelValue('')
  },
}

/* ═══════════════════════════════════════════
   3. Disabled state
   ═══════════════════════════════════════════ */
export const Disabled: Story = {
  name: 'Disabled state',
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    await expect(input).toBeDisabled()
  },
}

/* ═══════════════════════════════════════════
   4. Read-only
   ═══════════════════════════════════════════ */
export const Readonly: Story = {
  name: 'Read-only',
  args: { readonly: true, modelValue: 'Click to open search' },
}

/* ═══════════════════════════════════════════
   5. Dark Mode
   ═══════════════════════════════════════════ */
export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:430px"><story /></div>' })],
  render: () => ({
    components: { SearchBar },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <p style="font-size:13px;color:#888;margin:0 0 16px;font-family:Red Hat Display,sans-serif">Input bg #262626, icon + text #E8E8E8, focus border primary-blue</p>
        <hr style="border:none;border-top:1px solid #444;margin:0 0 24px" />
        <div style="display:flex;flex-direction:column;gap:16px">
          <SearchBar modelValue="" placeholder="Search any team or competition..." />
          <SearchBar modelValue="Premier League" />
          <SearchBar :disabled="true" />
        </div>
      </div>
    `,
  }),
}

/* ═══════════════════════════════════════════
   6. All States
   ═══════════════════════════════════════════ */
export const States: Story = {
  render: () => ({
    components: { SearchBar },
    template: `
      <div style="${box};min-width:620px">
        <p style="${title}">All States</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">
          <div>
            <p style="${stLabel}">empty</p>
            <SearchBar modelValue="" />
          </div>
          <div>
            <p style="${stLabel}">filled</p>
            <SearchBar modelValue="Premier League" />
          </div>
          <div>
            <p style="${stLabel}">disabled</p>
            <SearchBar :disabled="true" />
          </div>
          <div>
            <p style="${stLabel}">read-only</p>
            <SearchBar :readonly="true" modelValue="Click to open search" />
          </div>
        </div>
      </div>
    `,
  }),
}
