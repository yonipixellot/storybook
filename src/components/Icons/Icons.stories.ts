import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent } from 'vue'
import {
  Eye, EyeOff, ChevronDown, Copy, Check, Search, Play,
  X as XIcon, ArrowLeft, Download, Upload, Bookmark,
  Bell, User, Sun, Moon, Menu as MenuIcon, Share2,
} from 'lucide-vue-next'

/* ── Non-Lucide custom icons (brand / unique SVGs) ── */
const GoogleIcon = defineComponent({ template: '<svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/><path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/></svg>' })
const AppleIcon = defineComponent({ template: '<svg width="18" height="20" viewBox="0 0 18 22" fill="currentColor"><path d="M17.05 15.23c-.4.92-.59 1.33-1.1 2.15-.72 1.14-1.73 2.56-2.98 2.57-1.12.01-1.4-.73-2.92-.72-1.52.01-1.83.74-2.95.73-1.26-.01-2.22-1.29-2.94-2.43C2.1 14.36 1.93 10.87 3.34 9.04c1-1.3 2.58-2.06 4.01-2.06 1.49 0 2.43.74 3.66.74 1.2 0 1.93-.74 3.66-.74 1.27 0 2.68.69 3.68 1.88-3.23 1.77-2.7 6.38.7 7.37ZM12.14 4.9c.56-.72.99-1.74.83-2.78-.92.06-2 .65-2.63 1.41-.57.69-1.04 1.72-.86 2.72 1 .03 2.03-.57 2.66-1.35Z"/></svg>' })

const lucideIcons = { Eye, EyeOff, ChevronDown, Copy, Check, Search, Play, XIcon, ArrowLeft, Download, Upload, Bookmark, Bell, User, Sun, Moon, MenuIcon, Share2 }
const lucideNames = ['Eye', 'EyeOff', 'ChevronDown', 'Copy', 'Check', 'Search', 'Play', 'XIcon', 'ArrowLeft', 'Download', 'Upload', 'Bookmark', 'Bell', 'User', 'Sun', 'Moon', 'MenuIcon', 'Share2']

const meta: Meta = {
  title: 'Navigation/Icons',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

const title = 'font-size:18px;font-weight:700;margin:0 0 4px;font-family:Red Hat Display,sans-serif;color:#161616'
const label = 'font-size:13px;color:#979797;margin:0 0 8px;font-family:Red Hat Display,sans-serif'
const box = 'border:1px solid #E8E8E8;border-radius:16px;padding:28px 32px;margin-bottom:24px'
const hr = 'border:none;border-top:1px solid #E8E8E8;margin:16px 0 24px'
const cell = 'display:flex;flex-direction:column;align-items:center;gap:6px'
const iconBg = 'width:40px;height:40px;border-radius:8px;background:#F5F5F5;display:flex;align-items:center;justify-content:center;color:#161616'
const iconLabel = 'font-size:10px;color:#979797;font-weight:400;text-align:center'

/* ── Lucide Icons (lucide-vue-next) ── */

export const LucideIcons: Story = {
  render: () => ({
    components: lucideIcons,
    template: `
      <div style="${box}">
        <p style="${title}">Lucide Icons (lucide-vue-next)</p>
        <p style="${label}">18 Lucide icons used across DS components — imported from lucide-vue-next</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px">
          ${lucideNames.map(name => `
          <div style="${cell}">
            <div style="${iconBg}"><${name} :size="20" /></div>
            <span style="${iconLabel}">${name}</span>
          </div>`).join('')}
        </div>
      </div>
    `,
  }),
}

/* ── VideoActionBar Icons ── */

export const VideoActionBarIcons: Story = {
  render: () => ({
    components: { Download, Upload, Bookmark },
    template: `
      <div style="${box}">
        <p style="${title}">VideoActionBar Icons</p>
        <p style="${label}">Download · Upload (Share) · Bookmark — from lucide-vue-next, 20×20, used in 40×40 circle buttons</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">

          <div style="${cell}">
            <div style="width:40px;height:40px;border-radius:50%;background:#EDEDED;display:flex;align-items:center;justify-content:center;color:#6C6C6C">
              <Download :size="20" />
            </div>
            <span style="${iconLabel}">Download</span>
            <span style="${iconLabel}">default · gray-500</span>
          </div>

          <div style="${cell}">
            <div style="width:40px;height:40px;border-radius:50%;background:#EDEDED;display:flex;align-items:center;justify-content:center;color:#6C6C6C">
              <Upload :size="20" />
            </div>
            <span style="${iconLabel}">Upload (Share)</span>
            <span style="${iconLabel}">default · gray-500</span>
          </div>

          <div style="${cell}">
            <div style="width:40px;height:40px;border-radius:50%;background:#EDEDED;display:flex;align-items:center;justify-content:center;color:#6C6C6C">
              <Bookmark :size="20" />
            </div>
            <span style="${iconLabel}">Bookmark</span>
            <span style="${iconLabel}">default · outline · gray-500</span>
          </div>

          <div style="${cell}">
            <div style="width:40px;height:40px;border-radius:50%;background:#EDEDED;display:flex;align-items:center;justify-content:center;color:#C7CBD0">
              <Download :size="20" />
            </div>
            <span style="${iconLabel}">Download</span>
            <span style="${iconLabel}">disabled · gray-200</span>
          </div>

          <div style="${cell}">
            <div style="width:40px;height:40px;border-radius:50%;background:#EDEDED;display:flex;align-items:center;justify-content:center;color:#C7CBD0">
              <Upload :size="20" />
            </div>
            <span style="${iconLabel}">Upload (Share)</span>
            <span style="${iconLabel}">disabled · gray-200</span>
          </div>

          <div style="${cell}">
            <div style="width:40px;height:40px;border-radius:50%;background:#EDEDED;display:flex;align-items:center;justify-content:center">
              <Bookmark :size="20" style="fill:#116DFF;stroke:#116DFF" />
            </div>
            <span style="${iconLabel}">Bookmark</span>
            <span style="${iconLabel}">active · filled · primary</span>
          </div>

        </div>
        <hr style="${hr}" />
        <p style="font-size:11px;color:#979797;font-family:Red Hat Display,sans-serif;line-height:1.6;margin:0">
          <strong style="color:#161616">Rule:</strong> All 3 icons inherit button color via <code>currentColor</code>.
          Bookmark active state adds <code>fill: var(--color-primary)</code> + <code>stroke: var(--color-primary)</code> via CSS class <code>.vab__icon--bookmark-active</code>.
        </p>
      </div>
    `,
  }),
}

/* ── Custom SVG Icons ── */

const lockSvgPath = 'M7.026 4.069H6.738L6.737 2.701C6.736 1.211 5.465-.001 3.903 0 2.341.001 1.07 1.213 1.072 2.703L1.074 4.071H.971C.434 4.072-.001 4.488 0 5v4.072c0 .512.437.928.974.928l6.055-.003c.537 0 .972-.416.972-.928V4.996c0-.512-.437-.928-.974-.928ZM2.118 4.071L2.115 2.703c0-.94.802-1.707 1.788-1.707.987 0 1.789.765 1.789 1.706l.003 1.368H2.118Z'

export const CustomSVGIcons: Story = {
  render: () => ({
    components: { GoogleIcon, AppleIcon },
    template: `
      <div style="${box}">
        <p style="${title}">Custom SVG Icons</p>
        <p style="${label}">Brand icons and unique DS icons not available in Lucide</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
          <div style="${cell}">
            <div style="${iconBg}"><GoogleIcon /></div>
            <span style="${iconLabel}">GoogleIcon</span>
            <span style="${iconLabel}">Social auth</span>
          </div>
          <div style="${cell}">
            <div style="${iconBg}"><AppleIcon /></div>
            <span style="${iconLabel}">AppleIcon</span>
            <span style="${iconLabel}">Social auth</span>
          </div>
          <div style="${cell}">
            <div style="width:52px;height:52px;border-radius:8px;background:#362F2C;display:flex;align-items:center;justify-content:center">
              <svg width="16" height="20" viewBox="0 0 8 10" fill="#FFE000"><path fill-rule="evenodd" clip-rule="evenodd" d="${lockSvgPath}"/></svg>
            </div>
            <span style="${iconLabel}">LockSvg</span>
            <span style="${iconLabel}">Paywall / badges</span>
          </div>
          <div style="${cell}">
            <div style="${iconBg}">
              <svg width="12" height="15" viewBox="0 0 8 10" fill="#FFE000"><path fill-rule="evenodd" clip-rule="evenodd" d="${lockSvgPath}"/></svg>
            </div>
            <span style="${iconLabel}">ChipLockSvg</span>
            <span style="${iconLabel}">Chip prefix</span>
          </div>
        </div>
      </div>
    `,
  }),
}

/* ── BottomTabBar Icons ── */

const tabPair = 'display:flex;gap:12px;align-items:center'

export const BottomTabBarIcons: Story = {
  render: () => ({
    template: `
      <div style="${box}">
        <p style="${title}">BottomTabBar Icons</p>
        <p style="${label}">3 custom SVGs + Bookmark (lucide). Traced from Sales prototype. Active state fills solid, inactive is outline-only.</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
          <div style="${cell}">
            <div style="${tabPair}">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#979797" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/></svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#161616"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/></svg>
            </div>
            <span style="${iconLabel}">Games</span>
            <span style="${iconLabel}">BottomTabBar</span>
          </div>
          <div style="${cell}">
            <div style="${tabPair}">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#979797" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#161616"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
            </div>
            <span style="${iconLabel}">Bookmark (lucide)</span>
            <span style="${iconLabel}">BottomTabBar</span>
          </div>
          <div style="${cell}">
            <div style="${tabPair}">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#979797" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#161616"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </div>
            <span style="${iconLabel}">Following</span>
            <span style="${iconLabel}">BottomTabBar</span>
          </div>
          <div style="${cell}">
            <div style="${tabPair}">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#979797" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#161616" stroke="#161616" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18" stroke="white"/><path d="M16 10a4 4 0 01-8 0" stroke="white" fill="none"/></svg>
            </div>
            <span style="${iconLabel}">Shop</span>
            <span style="${iconLabel}">BottomTabBar</span>
          </div>
        </div>
      </div>
    `,
  }),
}

/* ── LockSvg Sizes ── */

const lockBg = 'border-radius:8px;background:#362F2C;display:flex;align-items:center;justify-content:center'

export const LockSvgSizes: Story = {
  render: () => ({
    template: `
      <div style="${box}">
        <p style="${title}">LockSvg Sizes</p>
        <hr style="${hr}" />
        <div style="display:flex;gap:16px;align-items:flex-end">
          <div style="${cell}">
            <div style="width:40px;height:40px;${lockBg}">
              <svg width="8" height="10" viewBox="0 0 8 10" fill="#FFE000"><path fill-rule="evenodd" clip-rule="evenodd" d="${lockSvgPath}"/></svg>
            </div>
            <span style="${iconLabel}">8 — chip</span>
          </div>
          <div style="${cell}">
            <div style="width:40px;height:40px;${lockBg}">
              <svg width="11" height="13.75" viewBox="0 0 8 10" fill="#FFE000"><path fill-rule="evenodd" clip-rule="evenodd" d="${lockSvgPath}"/></svg>
            </div>
            <span style="${iconLabel}">11 — thumbnail</span>
          </div>
          <div style="${cell}">
            <div style="width:40px;height:40px;${lockBg}">
              <svg width="12" height="15" viewBox="0 0 8 10" fill="#FFE000"><path fill-rule="evenodd" clip-rule="evenodd" d="${lockSvgPath}"/></svg>
            </div>
            <span style="${iconLabel}">12 — banner</span>
          </div>
          <div style="${cell}">
            <div style="width:40px;height:40px;${lockBg}">
              <svg width="16" height="20" viewBox="0 0 8 10" fill="#FFE000"><path fill-rule="evenodd" clip-rule="evenodd" d="${lockSvgPath}"/></svg>
            </div>
            <span style="${iconLabel}">16 — explorer</span>
          </div>
          <div style="${cell}">
            <div style="width:40px;height:40px;${lockBg}">
              <svg width="22" height="27.5" viewBox="0 0 8 10" fill="#FFE000"><path fill-rule="evenodd" clip-rule="evenodd" d="${lockSvgPath}"/></svg>
            </div>
            <span style="${iconLabel}">22 — paywall</span>
          </div>
        </div>
      </div>
    `,
  }),
}

/* ── Video Thumbnail Icons ── */

const vtLockSvg = `<svg width="11" height="13.75" viewBox="0 0 8 10" fill="#FFE000"><path fill-rule="evenodd" clip-rule="evenodd" d="${lockSvgPath}"/></svg>`
const vtPlaySvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></svg>`

export const VideoThumbnailIcons: Story = {
  render: () => ({
    template: `
      <div style="${box}">
        <p style="${title}">Video Thumbnail Icons</p>
        <p style="${label}">Lock &amp; Play icons used in VideoThumbnail cards — unified across all variants (landscape, vertical, live, new)</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
          <div style="${cell}">
            <div style="width:28px;height:28px;border-radius:50%;background:#362F2C;display:flex;align-items:center;justify-content:center">
              ${vtLockSvg}
            </div>
            <span style="${iconLabel}">Lock (default)</span>
            <span style="${iconLabel}">28×28 · #362F2C · no border</span>
          </div>
          <div style="${cell}">
            <div style="width:28px;height:28px;border-radius:50%;background:#6C6C6C;display:flex;align-items:center;justify-content:center">
              ${vtPlaySvg}
            </div>
            <span style="${iconLabel}">Play (default)</span>
            <span style="${iconLabel}">28×28 · #6C6C6C</span>
          </div>
          <div style="${cell}">
            <div style="width:36px;height:36px;border-radius:50%;background:#6C6C6C;display:flex;align-items:center;justify-content:center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></svg>
            </div>
            <span style="${iconLabel}">Play (jersey)</span>
            <span style="${iconLabel}">36×36 · #6C6C6C · centered</span>
          </div>
          <div style="${cell}">
            <div style="width:56px;height:56px;border-radius:50%;background:transparent;display:flex;align-items:center;justify-content:center;position:relative">
              <svg viewBox="0 0 56 56" width="56" height="56"><circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.25)" stroke-width="4" fill="none"/><circle cx="28" cy="28" r="24" stroke="#FFFFFF" stroke-width="4" fill="none" stroke-dasharray="150.8" stroke-dashoffset="50.3" stroke-linecap="round" transform="rotate(-90 28 28)"/></svg>
              <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">
                <svg viewBox="0 0 20 20" width="18" height="18" fill="white"><path d="M6 4l11 6-11 6V4z"/></svg>
              </div>
            </div>
            <span style="${iconLabel}">Countdown ring</span>
            <span style="${iconLabel}">56×56 · progress ring + play</span>
          </div>
        </div>
        <hr style="${hr}" />
        <p style="font-size:11px;color:#979797;font-family:Red Hat Display,sans-serif;line-height:1.6;margin:0">
          <strong style="color:#161616">Unified rule:</strong> The lock icon is identical across all variants — same 28×28 circle, same #362F2C background, same #FFE000 padlock SVG. No yellow border on any variant.
        </p>
      </div>
    `,
  }),
}

/* ── Share Channel Icons ── */

export const ShareChannelIcons: Story = {
  render: () => ({
    template: `
      <div style="${box}">
        <p style="${title}">Share Channel Icons</p>
        <p style="${label}">6 branded social icons used in ShareCurtain — 48×48, border-radius:20px (--radius-lg)</p>
        <hr style="${hr}" />
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
          <div style="${cell}">
            <div style="width:48px;height:48px;border-radius:20px;background:#BDBDBD;display:flex;align-items:center;justify-content:center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
            </div>
            <span style="${iconLabel}">Copy Link</span>
            <span style="${iconLabel}">#BDBDBD</span>
          </div>
          <div style="${cell}">
            <div style="width:48px;height:48px;border-radius:20px;background:#1877F2;display:flex;align-items:center;justify-content:center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"/></svg>
            </div>
            <span style="${iconLabel}">Facebook</span>
            <span style="${iconLabel}">#1877F2</span>
          </div>
          <div style="${cell}">
            <div style="width:48px;height:48px;border-radius:20px;background:#000000;display:flex;align-items:center;justify-content:center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.4L19.5 4h-2l-5.2 6.4L8 4H4z"/></svg>
            </div>
            <span style="${iconLabel}">X</span>
            <span style="${iconLabel}">#000000</span>
          </div>
          <div style="${cell}">
            <div style="width:48px;height:48px;border-radius:20px;background:#25D366;display:flex;align-items:center;justify-content:center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.007 2C6.477 2 2 6.477 2 12.007c0 1.902.506 3.686 1.383 5.223L2 22l4.913-1.358A9.94 9.94 0 0012.007 22C17.537 22 22 17.537 22 12.007 22 6.477 17.537 2 12.007 2z"/></svg>
            </div>
            <span style="${iconLabel}">WhatsApp</span>
            <span style="${iconLabel}">#25D366</span>
          </div>
          <div style="${cell}">
            <div style="width:48px;height:48px;border-radius:20px;background:#000000;display:flex;align-items:center;justify-content:center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/></svg>
            </div>
            <span style="${iconLabel}">TikTok</span>
            <span style="${iconLabel}">#000000</span>
          </div>
          <div style="${cell}">
            <div style="width:48px;height:48px;border-radius:20px;background:linear-gradient(135deg,#F58529,#DD2A7B,#8134AF);display:flex;align-items:center;justify-content:center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/></svg>
            </div>
            <span style="${iconLabel}">Instagram</span>
            <span style="${iconLabel}">gradient</span>
          </div>
        </div>
        <hr style="${hr}" />
        <p style="font-size:11px;color:#979797;font-family:Red Hat Display,sans-serif;line-height:1.6;margin:0">
          <strong style="color:#161616">Rule:</strong> All brand icons are inline <code>defineComponent</code> SVGs in ShareCurtain.vue.
          Copy Link uses <code>Link2</code> from lucide-vue-next. Icon container is 48×48, <code>border-radius: var(--radius-lg)</code> (20px).
        </p>
      </div>
    `,
  }),
}
