import type { Meta, StoryObj } from '@storybook/vue3'
import AppDivider from './AppDivider.vue'

const meta: Meta<typeof AppDivider> = {
  title: 'Layout/Divider',
  component: AppDivider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Horizontal (or vertical) separator line. Configurable color, thickness, and spacing. Supports an optional centered label for use in auth and settings screens.',
      },
    },
  },
  argTypes: {
    color: { control: 'text' },
    thickness: { control: 'number' },
    spacing: { control: 'number' },
    vertical: { control: 'boolean' },
    text: { control: 'text' },
  },
  args: {
    color: '#C7CBD0',
    thickness: 1,
    spacing: 0,
    vertical: false,
    text: undefined,
  },
}

export default meta
type Story = StoryObj<typeof AppDivider>

const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'

/* ── Default Horizontal ── */

export const DefaultHorizontal: Story = {
  render: () => ({
    components: { AppDivider },
    template: `
      <div style="${box}">
        <p style="${title}">Default Horizontal</p>
        <hr style="${hr}" />
        <p style="${label}">Simple horizontal divider with default styling</p>
        <p style="margin:0 0 12px;font-family:Red Hat Display,sans-serif;color:#161616">Section A</p>
        <AppDivider />
        <p style="margin:12px 0 0;font-family:Red Hat Display,sans-serif;color:#161616">Section B</p>
      </div>
    `,
  }),
}

/* ── With Spacing ── */

export const WithSpacing: Story = {
  render: () => ({
    components: { AppDivider },
    template: `
      <div style="${box}">
        <p style="${title}">With Spacing</p>
        <hr style="${hr}" />
        <p style="${label}">Dividers with margin on both sides (spacing=12)</p>
        <p style="margin:0;font-family:Red Hat Display,sans-serif;color:#161616">Item 1</p>
        <AppDivider :spacing="12" />
        <p style="margin:0;font-family:Red Hat Display,sans-serif;color:#161616">Item 2</p>
        <AppDivider :spacing="12" />
        <p style="margin:0;font-family:Red Hat Display,sans-serif;color:#161616">Item 3</p>
      </div>
    `,
  }),
}

/* ── Custom Color & Thickness ── */

export const CustomColorAndThickness: Story = {
  render: () => ({
    components: { AppDivider },
    template: `
      <div style="${box}">
        <p style="${title}">Custom Color & Thickness</p>
        <hr style="${hr}" />
        <p style="${label}">gray100 subtle</p>
        <AppDivider color="#EDEDED" :thickness="1" :spacing="6" />
        <p style="${label};margin-top:20px">gray200 default</p>
        <AppDivider color="#C7CBD0" :thickness="1" :spacing="6" />
        <p style="${label};margin-top:20px">gray300 strong</p>
        <AppDivider color="#DCDCDC" :thickness="2" :spacing="6" />
      </div>
    `,
  }),
}

/* ── Vertical Divider ── */

export const Vertical: Story = {
  render: () => ({
    components: { AppDivider },
    template: `
      <div style="${box}">
        <p style="${title}">Vertical Divider</p>
        <hr style="${hr}" />
        <p style="${label}">Side-by-side layout with vertical dividers</p>
        <div style="display:flex;align-items:center;gap:0">
          <p style="margin:0;flex:1;font-family:Red Hat Display,sans-serif;color:#161616">Left</p>
          <AppDivider :vertical="true" />
          <p style="margin:0;flex:1;text-align:center;font-family:Red Hat Display,sans-serif;color:#161616">Center</p>
          <AppDivider :vertical="true" />
          <p style="margin:0;flex:1;text-align:right;font-family:Red Hat Display,sans-serif;color:#161616">Right</p>
        </div>
      </div>
    `,
  }),
}

/* ── Text Divider ── */

export const TextDivider: Story = {
  render: () => ({
    components: { AppDivider },
    template: `
      <div style="${box}">
        <p style="${title}">Text Divider</p>
        <hr style="${hr}" />
        <p style="${label}">Centered text between divider lines</p>
        <AppDivider text="or continue with" />
      </div>
    `,
  }),
}

/* ── All Variants ── */

export const AllVariants: Story = {
  render: () => ({
    components: { AppDivider },
    template: `
      <div style="${box}">
        <p style="${title}">All Variants</p>
        <hr style="${hr}" />

        <p style="${label}">Default horizontal</p>
        <AppDivider />

        <p style="${label};margin-top:20px">With spacing (12px)</p>
        <p style="margin:0;font-family:Red Hat Display,sans-serif;color:#161616">Item 1</p>
        <AppDivider :spacing="12" />
        <p style="margin:0;font-family:Red Hat Display,sans-serif;color:#161616">Item 2</p>

        <p style="${label};margin-top:20px">Custom color & thickness</p>
        <AppDivider color="#EDEDED" :thickness="1" :spacing="6" />
        <AppDivider color="#DCDCDC" :thickness="2" :spacing="6" />

        <p style="${label};margin-top:20px">Vertical divider</p>
        <div style="display:flex;align-items:center;gap:0">
          <p style="margin:0;flex:1;font-family:Red Hat Display,sans-serif;color:#161616">Left</p>
          <AppDivider :vertical="true" />
          <p style="margin:0;flex:1;text-align:center;font-family:Red Hat Display,sans-serif;color:#161616">Right</p>
        </div>

        <p style="${label};margin-top:20px">Text divider</p>
        <AppDivider text="or continue with" />
      </div>
    `,
  }),
}

/* ── Dark Mode ── */

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:400px"><story /></div>' })],
  render: () => ({
    components: { AppDivider },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <p style="margin:0 0 8px;color:#A0A0A0;font-size:12px;font-family:Red Hat Display,sans-serif">Default (token-aware)</p>
        <p style="margin:0 0 6px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Section A</p>
        <AppDivider />
        <p style="margin:6px 0 0;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Section B</p>
        <div style="height:16px"></div>
        <p style="margin:0 0 8px;color:#A0A0A0;font-size:12px;font-family:Red Hat Display,sans-serif">Text divider</p>
        <AppDivider text="or continue with" />
        <div style="height:16px"></div>
        <p style="margin:0 0 8px;color:#A0A0A0;font-size:12px;font-family:Red Hat Display,sans-serif">Vertical</p>
        <div style="display:flex;align-items:center">
          <span style="flex:1;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Left</span>
          <AppDivider :vertical="true" />
          <span style="flex:1;text-align:right;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Right</span>
        </div>
      </div>
    `,
  }),
}
