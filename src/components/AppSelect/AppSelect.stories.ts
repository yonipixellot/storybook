import type { Meta, StoryObj } from '@storybook/vue3'
import AppSelect from './AppSelect.vue'

const meta: Meta<typeof AppSelect> = {
  title: 'Inputs/AppSelect',
  component: AppSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Pill-shaped dropdown select with custom chevron icon — supports default, hover, focus, error, and disabled states. Matches AppInput height and border-radius for consistent form layouts.',
      },
    },
  },
  argTypes: {
    modelValue:  { control: 'text',    description: 'v-model binding — the selected option value' },
    placeholder: { control: 'text',    description: 'Placeholder text shown when no option is selected' },
    options:     { control: 'object',  description: 'Array of options — each with `{ label: string, value: string }`' },
    error:       { control: 'boolean', description: 'Toggles the red error border' },
    errorMsg:    { control: 'text',    description: 'Error message shown below the select when error is true' },
    disabled:    { control: 'boolean', description: 'Disables the select — muted appearance, no interaction' },
    ariaLabel:   { control: 'text',    description: 'Accessible label for the select element (falls back to placeholder)' },
  },
  args: {
    placeholder: 'Age...',
    options: [
      { label: '18', value: '18' },
      { label: '25', value: '25' },
      { label: '35+', value: '35' },
    ],
  },
  decorators: [
    () => ({ template: '<div style="max-width:400px;padding:20px"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof AppSelect>

const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'
const stLabel = 'font-size:12px;color:#979797;text-align:center;margin-top:6px;font-family:Red Hat Display,sans-serif'

/* ── Individual Stories ── */

export const Default: Story = {
  args: {
    placeholder: 'Age...',
  },
}

export const ErrorWithMessage: Story = {
  args: {
    placeholder: 'Age...',
    error: true,
    errorMsg: 'Please select your age',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Age...',
    disabled: true,
  },
}

/* ── Variants (all states) ── */

export const Variants: Story = {
  render: () => ({
    components: { AppSelect },
    template: `
      <div style="${box}">
        <p style="${title}">Variants</p>
        <hr style="${hr}" />
        <div style="display:flex;flex-direction:column;gap:20px;max-width:400px">

          <div>
            <p style="${stLabel}">default</p>
            <AppSelect
              placeholder="Age..."
              :options="[{label:'18',value:'18'},{label:'25',value:'25'},{label:'35+',value:'35'}]"
            />
          </div>

          <div>
            <p style="${stLabel}">hover</p>
            <div style="position:relative;width:100%">
              <select style="width:100%;height:46px;padding:4px 40px 4px 16px;font-size:16px;font-weight:400;font-family:Red Hat Display,sans-serif;background:#C7CBD0;color:#979797;border:2px solid transparent;border-radius:20px;appearance:none;cursor:pointer;box-sizing:border-box;outline:none">
                <option disabled selected hidden>Age...</option>
              </select>
              <svg style="position:absolute;right:14px;top:15px;color:#979797;pointer-events:none" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>

          <div>
            <p style="${stLabel}">focus</p>
            <div style="position:relative;width:100%">
              <select style="width:100%;height:46px;padding:4px 40px 4px 16px;font-size:16px;font-weight:400;font-family:Red Hat Display,sans-serif;background:#EDEDED;color:#979797;border:2px solid #116DFF;border-radius:20px;appearance:none;cursor:pointer;box-sizing:border-box;outline:none">
                <option disabled selected hidden>Age...</option>
              </select>
              <svg style="position:absolute;right:14px;top:15px;color:#979797;pointer-events:none" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>

          <div>
            <p style="${stLabel}">error</p>
            <AppSelect
              placeholder="Age..."
              :options="[{label:'18',value:'18'},{label:'25',value:'25'},{label:'35+',value:'35'}]"
              :error="true"
            />
          </div>

          <div>
            <p style="${stLabel}">error + message</p>
            <AppSelect
              placeholder="Age..."
              :options="[{label:'18',value:'18'},{label:'25',value:'25'},{label:'35+',value:'35'}]"
              :error="true"
              errorMsg="Please select your age"
            />
          </div>

          <div>
            <p style="${stLabel}">disabled</p>
            <AppSelect
              placeholder="Age..."
              :options="[{label:'18',value:'18'},{label:'25',value:'25'},{label:'35+',value:'35'}]"
              :disabled="true"
            />
          </div>

        </div>
      </div>
    `,
  }),
}
