import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { userEvent, within } from 'storybook/test'
import BottomSheet from './BottomSheet.vue'

const meta: Meta<typeof BottomSheet> = {
  title: 'Layout / Overlays / BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta

type Story = StoryObj<typeof BottomSheet>

const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;background:#F5F5F5'
const phoneFrame = 'position:relative;width:390px;height:600px;background:#F5F5F5;border-radius:24px;overflow:hidden;border:1px solid #E8E8E8;'

/* ── Default: handle only, no title, no close ── */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Open the sheet
    const openBtn = canvas.getByRole('button', { name: /open sheet/i })
    await userEvent.click(openBtn)
    // Backdrop is Teleported to body → use document.body to find it
    const backdrop = document.body.querySelector<HTMLElement>('.bs__backdrop')
    if (backdrop) await userEvent.click(backdrop) // closeOnBackdrop=true → $emit('close') — line 10
  },
  render: () => ({
    components: { BottomSheet },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="${phoneFrame}">
        <div style="padding:24px">
          <button
            @click="open = true"
            style="background:#116DFF;color:#fff;border:none;border-radius:12px;padding:12px 24px;font-size:14px;font-weight:600;cursor:pointer;"
          >
            Open Sheet
          </button>
        </div>
        <BottomSheet :open="open" @close="open = false">
          <p style="margin:0 0 12px;font-size:16px;color:#161616;">This is the bottom sheet content area.</p>
          <p style="margin:0;font-size:14px;color:#6C6C6C;">Drag handle is shown by default. Tap outside to dismiss.</p>
        </BottomSheet>
      </div>
    `,
  }),
}

/* ── With Title ── */
export const WithTitle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const openBtn = canvas.getByRole('button', { name: /open sheet/i })
    await userEvent.click(openBtn)
    // Close button is Teleported to body — covers line 35 @click="$emit('close')"
    const body = within(document.body)
    const closeBtn = await body.findByRole('button', { name: /close/i })
    await userEvent.click(closeBtn)
  },
  render: () => ({
    components: { BottomSheet },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="${phoneFrame}">
        <div style="padding:24px">
          <button
            @click="open = true"
            style="background:#116DFF;color:#fff;border:none;border-radius:12px;padding:12px 24px;font-size:14px;font-weight:600;cursor:pointer;"
          >
            Open Sheet
          </button>
        </div>
        <BottomSheet :open="open" title="Filter Options" :show-close="true" @close="open = false">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <label style="display:flex;align-items:center;gap:10px;font-size:16px;color:#161616;cursor:pointer;">
              <input type="checkbox" /> All Games
            </label>
            <label style="display:flex;align-items:center;gap:10px;font-size:16px;color:#161616;cursor:pointer;">
              <input type="checkbox" checked /> Live Only
            </label>
            <label style="display:flex;align-items:center;gap:10px;font-size:16px;color:#161616;cursor:pointer;">
              <input type="checkbox" /> Highlights
            </label>
          </div>
          <button style="margin-top:24px;width:100%;background:#116DFF;color:#fff;border:none;border-radius:12px;padding:14px;font-size:16px;font-weight:600;cursor:pointer;">
            Apply
          </button>
        </BottomSheet>
      </div>
    `,
  }),
}

/* ── Tall Content (scrollable) ── */
export const TallContent: Story = {
  render: () => ({
    components: { BottomSheet },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="${phoneFrame}">
        <div style="padding:24px">
          <button
            @click="open = true"
            style="background:#116DFF;color:#fff;border:none;border-radius:12px;padding:12px 24px;font-size:14px;font-weight:600;cursor:pointer;"
          >
            Open Tall Sheet
          </button>
        </div>
        <BottomSheet :open="open" title="Season Stats" :show-close="true" @close="open = false">
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div v-for="i in 10" :key="i" style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #EDEDED;">
              <span style="font-size:14px;color:#6C6C6C;">Stat Label {{ i }}</span>
              <span style="font-size:16px;font-weight:600;color:#161616;">{{ i * 7 }}</span>
            </div>
          </div>
        </BottomSheet>
      </div>
    `,
  }),
}

/* ── No Backdrop Dismiss ── */
export const NoBackdropDismiss: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const openBtn = canvas.getByRole('button', { name: /open sheet/i })
    await userEvent.click(openBtn)
    // Click backdrop with closeOnBackdrop=false → && short-circuits, no emit (covers false branch)
    const backdrop = document.body.querySelector<HTMLElement>('.bs__backdrop')
    if (backdrop) await userEvent.click(backdrop)
    // Then close via the X button
    const body = within(document.body)
    const closeBtn = await body.findByRole('button', { name: /close/i })
    await userEvent.click(closeBtn)
  },
  render: () => ({
    components: { BottomSheet },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="${phoneFrame}">
        <div style="padding:24px">
          <button
            @click="open = true"
            style="background:#116DFF;color:#fff;border:none;border-radius:12px;padding:12px 24px;font-size:14px;font-weight:600;cursor:pointer;"
          >
            Open Sheet
          </button>
        </div>
        <BottomSheet :open="open" title="Required Action" :show-close="true" :close-on-backdrop="false" @close="open = false">
          <p style="margin:0 0 20px;font-size:16px;color:#161616;">This sheet can only be closed with the X button. Tapping outside does nothing.</p>
          <button @click="open = false" style="width:100%;background:#116DFF;color:#fff;border:none;border-radius:12px;padding:14px;font-size:16px;font-weight:600;cursor:pointer;">
            Confirm
          </button>
        </BottomSheet>
      </div>
    `,
  }),
}

/* ── Dark Mode ── */
export const DarkMode: Story = {
  render: () => ({
    components: { BottomSheet },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div data-theme="dark" style="width:390px;height:600px;background:#1A1A1A;border-radius:24px;overflow:hidden;border:1px solid #333;position:relative;">
        <div style="padding:24px">
          <button
            @click="open = true"
            style="background:#3B8BFF;color:#fff;border:none;border-radius:12px;padding:12px 24px;font-size:14px;font-weight:600;cursor:pointer;"
          >
            Open Sheet
          </button>
        </div>
        <BottomSheet :open="open" title="Dark Mode Sheet" :show-close="true" @close="open = false">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <p style="margin:0;font-size:16px;">Sheet content renders correctly in dark mode.</p>
            <p style="margin:0;font-size:14px;opacity:0.7;">Background, text, handle, and close button all adapt to theme tokens.</p>
          </div>
          <button style="margin-top:24px;width:100%;background:#3B8BFF;color:#fff;border:none;border-radius:12px;padding:14px;font-size:16px;font-weight:600;cursor:pointer;">
            Action
          </button>
        </BottomSheet>
      </div>
    `,
  }),
}

/* ── All Variants (static preview — open by default) ── */
export const AllVariants: Story = {
  render: () => ({
    components: { BottomSheet },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:20px;">

        <div>
          <p style="font-size:12px;font-weight:600;color:#979797;text-transform:uppercase;letter-spacing:.08em;margin:0 0 12px;">Handle Only</p>
          <div style="${phoneFrame}">
            <BottomSheet :open="true" @close="">
              <p style="margin:0;font-size:16px;color:#161616;">Basic sheet with drag handle.</p>
            </BottomSheet>
          </div>
        </div>

        <div>
          <p style="font-size:12px;font-weight:600;color:#979797;text-transform:uppercase;letter-spacing:.08em;margin:0 0 12px;">With Title + Close</p>
          <div style="${phoneFrame}">
            <BottomSheet :open="true" title="Sheet Title" :show-close="true" @close="">
              <p style="margin:0;font-size:16px;color:#161616;">Sheet with title and close button.</p>
            </BottomSheet>
          </div>
        </div>

        <div>
          <p style="font-size:12px;font-weight:600;color:#979797;text-transform:uppercase;letter-spacing:.08em;margin:0 0 12px;">Dark Mode</p>
          <div data-theme="dark" style="${phoneFrame.replace('#F5F5F5', '#1A1A1A').replace('#E8E8E8', '#333')}">
            <BottomSheet :open="true" title="Dark Sheet" :show-close="true" @close="">
              <p style="margin:0;font-size:16px;">Sheet in dark mode.</p>
            </BottomSheet>
          </div>
        </div>

      </div>
    `,
  }),
}
