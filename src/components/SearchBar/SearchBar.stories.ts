import type { Meta, StoryObj } from '@storybook/vue3'
import SearchBar from './SearchBar.vue'

const meta: Meta<typeof SearchBar> = {
  title: 'Layout & Overlays/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    placeholder: { control: 'text' },
    clearable: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
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
}

/* ═══════════════════════════════════════════
   2. Filled with value
   ═══════════════════════════════════════════ */
export const Filled: Story = {
  name: 'Filled with value',
  args: { modelValue: 'Premier League' },
}

/* ═══════════════════════════════════════════
   3. Disabled state
   ═══════════════════════════════════════════ */
export const Disabled: Story = {
  name: 'Disabled state',
  args: { disabled: true },
}

/* ═══════════════════════════════════════════
   4. Read-only
   ═══════════════════════════════════════════ */
export const Readonly: Story = {
  name: 'Read-only',
  args: { readonly: true, modelValue: 'Click to open search' },
}

/* ═══════════════════════════════════════════
   5. All States
   ═══════════════════════════════════════════ */
export const States: Story = {
  render: () => ({
    components: { SearchBar },
    template: `
      <div style="${box}">
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
