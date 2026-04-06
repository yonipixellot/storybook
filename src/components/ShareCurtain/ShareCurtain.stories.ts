import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import ShareCurtain from './ShareCurtain.vue'

const meta: Meta<typeof ShareCurtain> = {
  title: 'Video/ShareCurtain',
  component: ShareCurtain,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Bottom-sheet overlay for sharing content. Slides up over a dark backdrop and exposes social share targets (Copy link, WhatsApp, Facebook, Twitter/X). Controlled via the `open` prop.',
      },
    },
  },
  argTypes: {
    open: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ShareCurtain>

const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px;max-width:400px'
const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const label = 'font-size:13px;color:#979797;margin:0 0 16px;font-family:Red Hat Display,sans-serif'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'
const stLabel = 'font-size:12px;color:#979797;margin:8px 0 4px;font-family:Red Hat Display,sans-serif'
const btn = 'height:40px;padding:0 20px;background:#116DFF;color:#fff;border:none;border-radius:26px;font-family:Red Hat Display,sans-serif;font-size:15px;font-weight:700;cursor:pointer'

/* ─────────────────────────────────────────────────────────────
   1. INTERACTIVE PREVIEW
   Bottom sheet with 6 social share channels + Cancel
───────────────────────────────────────────────────────────── */
export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Open the sheet
    const openBtn = canvas.getByRole('button', { name: /open share sheet/i })
    await userEvent.click(openBtn)
    // Sheet teleports to body — use findByRole (async, waits for Vue render + transition)
    // Channel buttons have role="listitem" (explicit attr overrides implicit button role)
    const body = within(document.body)
    const copyLink = await body.findByRole('listitem', { name: /share via copy link/i })
    await expect(copyLink).toBeVisible()
    await userEvent.click(copyLink) // exercises $emit('share', 'copy'), closes sheet
    // Open again to test backdrop click — exercises @click="$emit('close')" on backdrop (line 10)
    await userEvent.click(openBtn)
    const backdrop = document.querySelector<HTMLElement>('.sc__backdrop')
    if (backdrop) await userEvent.click(backdrop)
    // Open again to test Cancel (plain <button>, no role override)
    await userEvent.click(openBtn)
    const cancelBtn = await body.findByRole('button', { name: /cancel sharing/i })
    await userEvent.click(cancelBtn) // exercises $emit('close')
  },
  render: () => ({
    components: { ShareCurtain },
    data() { return { open: false, lastShare: '' } },
    template: `
      <div style="${box}">
        <p style="${title}">ShareCurtain Preview</p>
        <p style="${label}">Bottom sheet with 6 social share channels, backdrop overlay, and Cancel button</p>
        <hr style="${hr}" />
        <button style="${btn}" @click="open = true">Open Share Sheet</button>
        <p style="${stLabel}">{{ lastShare ? 'Shared via: ' + lastShare : 'Click a channel to share' }}</p>
        <ShareCurtain
          :open="open"
          @close="open = false"
          @share="id => { lastShare = id; open = false }"
        />
      </div>
    `,
  }),
}

/* ─────────────────────────────────────────────────────────────
   2. OPEN STATE (static — visible for inspection)
   Shown inside a phone-frame container, no teleport
───────────────────────────────────────────────────────────── */
export const OpenState: Story = {
  render: () => ({
    components: { ShareCurtain },
    template: `
      <div style="position:relative;width:390px;height:600px;border:1px solid #E8E8E8;border-radius:16px;overflow:hidden;background:#F5F5F5">
        <p style="padding:20px;font-family:Red Hat Display,sans-serif;font-size:14px;color:#979797">
          Video Player Page (simulated)
        </p>
        <!-- Backdrop -->
        <div style="position:absolute;inset:0;background:rgba(0,0,0,0.7);z-index:1"></div>
        <!-- Sheet rendered inline (no teleport) -->
        <div style="position:absolute;bottom:0;left:0;right:0;background:#fff;border-radius:24px 24px 0 0;padding:24px 16px;z-index:2">
          <h3 style="font-family:Red Hat Display,sans-serif;font-size:24px;font-weight:600;color:#161616;margin:0 0 16px">Share</h3>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px">
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px">
              <div style="width:48px;height:48px;border-radius:20px;background:#BDBDBD;display:flex;align-items:center;justify-content:center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              </div>
              <span style="font-family:Red Hat Display,sans-serif;font-size:14px;font-weight:500;color:#161616">Copy Link</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px">
              <div style="width:48px;height:48px;border-radius:20px;background:#1877F2;display:flex;align-items:center;justify-content:center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"/></svg>
              </div>
              <span style="font-family:Red Hat Display,sans-serif;font-size:14px;font-weight:500;color:#161616">Facebook</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px">
              <div style="width:48px;height:48px;border-radius:20px;background:#000;display:flex;align-items:center;justify-content:center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.4L19.5 4h-2l-5.2 6.4L8 4H4z"/></svg>
              </div>
              <span style="font-family:Red Hat Display,sans-serif;font-size:14px;font-weight:500;color:#161616">X</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px">
              <div style="width:48px;height:48px;border-radius:20px;background:#25D366;display:flex;align-items:center;justify-content:center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.007 2C6.477 2 2 6.477 2 12.007c0 1.902.506 3.686 1.383 5.223L2 22l4.913-1.358A9.94 9.94 0 0012.007 22C17.537 22 22 17.537 22 12.007 22 6.477 17.537 2 12.007 2z"/></svg>
              </div>
              <span style="font-family:Red Hat Display,sans-serif;font-size:14px;font-weight:500;color:#161616">WhatsApp</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px">
              <div style="width:48px;height:48px;border-radius:20px;background:#000;display:flex;align-items:center;justify-content:center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/></svg>
              </div>
              <span style="font-family:Red Hat Display,sans-serif;font-size:14px;font-weight:500;color:#161616">TikTok</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px">
              <div style="width:48px;height:48px;border-radius:20px;background:linear-gradient(135deg,#F58529,#DD2A7B,#8134AF);display:flex;align-items:center;justify-content:center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/></svg>
              </div>
              <span style="font-family:Red Hat Display,sans-serif;font-size:14px;font-weight:500;color:#161616">Instagram</span>
            </div>
          </div>
          <button style="width:100%;height:40px;background:#EDEDED;border:none;border-radius:32px;font-family:Red Hat Display,sans-serif;font-size:16px;font-weight:600;color:#161616;cursor:pointer">Cancel</button>
        </div>
      </div>
    `,
  }),
}

/* ─────────────────────────────────────────────────────────────
   3. PROPS REFERENCE
───────────────────────────────────────────────────────────── */
export const PropsReference: Story = {
  render: () => ({
    components: { ShareCurtain },
    data() { return { open: false } },
    template: `
      <div style="${box}">
        <p style="${title}">Props Reference</p>
        <hr style="${hr}" />
        <div style="font-family:Red Hat Display,sans-serif;font-size:13px;line-height:2;color:#6C6C6C">
          <code style="color:#116DFF">open: boolean</code> — controls sheet visibility<br/>
          <code style="color:#116DFF">@close</code> — emitted on backdrop click or Cancel<br/>
          <code style="color:#116DFF">@share(channelId)</code> — emitted on channel tap<br/>
          <br/>
          <strong style="color:#161616">Channel IDs:</strong>
          <code>copy</code> · <code>facebook</code> · <code>x</code> ·
          <code>whatsapp</code> · <code>tiktok</code> · <code>instagram</code>
        </div>
        <hr style="${hr}" />
        <button style="${btn}" @click="open = true">Open Sheet</button>
        <ShareCurtain :open="open" @close="open = false" @share="open = false" />
      </div>
    `,
  }),
}

/* ─────────────────────────────────────────────────────────────
   4. DEFAULT (controls)
───────────────────────────────────────────────────────────── */
export const Default: Story = {
  args: {
    open: false,
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  decorators: [() => ({ template: '<div data-theme="dark" style="background:#1A1A1A;padding:20px;border-radius:12px;max-width:430px"><story /></div>' })],
  render: () => ({
    components: { ShareCurtain },
    data() { return { open: false } },
    template: `
      <div style="border:1px solid #444;border-radius:16px;padding:28px 32px">
        <p style="font-size:18px;font-weight:700;margin:0 0 16px;font-family:Red Hat Display,sans-serif;color:#E8E8E8">Dark Mode</p>
        <button
          style="height:40px;padding:0 20px;background:#116DFF;color:#fff;border:none;border-radius:26px;font-family:Red Hat Display,sans-serif;font-size:15px;font-weight:700;cursor:pointer"
          @click="open = true"
        >Open Share Sheet</button>
        <ShareCurtain :open="open" @close="open = false" @share="open = false" />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Open sheet in dark mode — currentTheme = 'dark' (MutationObserver picks up data-theme="dark")
    const openBtn = canvas.getByRole('button', { name: /open share sheet/i })
    await userEvent.click(openBtn)
    // Click X channel (has darkColor: '#333333') — covers currentTheme==='dark' && ch.darkColor true branch (line 34)
    const body = within(document.body)
    const xBtn = await body.findByRole('listitem', { name: /share via x/i })
    await userEvent.click(xBtn)
  },
}
