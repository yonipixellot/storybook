import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent } from 'vue'

/* ─────────────────────────────────────────────────
   Shared style constants
───────────────────────────────────────────────── */
const wrap  = 'font-family:Red Hat Display,sans-serif'
const box   = 'border:1px solid var(--color-gray-100);border-radius:16px;padding:28px 32px;margin-bottom:32px;background:var(--color-white)'
const ttl   = 'font-size:18px;font-weight:700;margin:0 0 4px;color:var(--color-dark-text)'
const sub   = 'font-size:13px;color:var(--color-gray-400);margin:0 0 20px'
const hr    = 'border:none;border-top:1px solid var(--color-gray-100);margin:0 0 24px'
const lbl   = 'font-size:11px;font-weight:600;letter-spacing:.06em;color:var(--color-gray-400);text-transform:uppercase;margin:0 0 12px'
const mono  = 'font-family:monospace;font-size:11px;color:var(--color-gray-400)'
const row   = 'display:flex;align-items:center;gap:16px;padding:7px 0;border-bottom:1px solid var(--color-gray-100)'

/* Dummy component — Storybook requires one */
const DesignTokens = defineComponent({ template: '<div />' })

const meta: Meta<typeof DesignTokens> = {
  title: 'Design Tokens',
  component: DesignTokens,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Single source of truth for all Pixellot DS visual values. ' +
          'Use the Light / Dark toggle in the toolbar to preview theme-aware tokens.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof DesignTokens>

/* ─────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────── */
function swatch(token: string, name: string, border = false) {
  const b = border ? 'border:1px solid var(--color-gray-200);' : ''
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:5px;width:96px;text-align:center">
    <div style="width:64px;height:64px;border-radius:12px;background:var(${token});${b};flex-shrink:0"></div>
    <span style="font-size:11px;font-weight:600;color:var(--color-dark-text);line-height:1.3;word-break:break-word">${name}</span>
    <span style="font-family:monospace;font-size:9px;color:var(--color-gray-400);overflow-wrap:break-word;word-break:break-word;line-height:1.4">${token}</span>
  </div>`
}

function swatchRow(label: string, tokens: Array<[string, string, boolean?]>) {
  return `<div style="margin-bottom:28px">
    <p style="${lbl}">${label}</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,84px);gap:16px 12px">
      ${tokens.map(([t, n, b]) => swatch(t, n, b)).join('')}
    </div>
  </div>`
}

/* ══════════════════════════════════════════════
   1. COLORS — complete
══════════════════════════════════════════════ */
export const Colors: Story = {
  render: () => ({
    template: `
      <div style="${wrap}">
        <div style="${box}">
          <p style="${ttl}">Colors</p>
          <p style="${sub}">47 color tokens across 11 groups. Swatches update automatically with the Light / Dark theme toggle.</p>
          <hr style="${hr}" />

          ${swatchRow('Primary', [
            ['--color-primary',        'primary'],
            ['--color-primary-hover',  'primary-hover'],
            ['--color-primary-active', 'primary-active'],
          ])}

          ${swatchRow('Primary Tints', [
            ['--color-primary-bg-light',   'bg-light',   true],
            ['--color-primary-bg-lighter', 'bg-lighter', true],
          ])}

          ${swatchRow('Neutrals', [
            ['--color-white',     'white',     true],
            ['--color-black',     'black'],
            ['--color-dark-text', 'dark-text'],
          ])}

          ${swatchRow('Grays', [
            ['--color-gray-50',      'gray-50',  true],
            ['--color-gray-100',     'gray-100', true],
            ['--color-gray-200',     'gray-200', true],
            ['--color-gray-300',     'gray-300', true],
            ['--color-gray-400',     'gray-400'],
            ['--color-gray-500',     'gray-500'],
            ['--color-gray-overlay', 'overlay',  true],
          ])}

          ${swatchRow('Surfaces', [
            ['--color-card-bg',       'card-bg',       true],
            ['--color-card-hover-bg', 'card-hover-bg', true],
            ['--color-overlay',       'overlay'],
            ['--color-divider-dark',  'divider-dark'],
            ['--color-disabled-text-on-dark', 'disabled-on-dark'],
          ])}

          ${swatchRow('Brand / Accent', [
            ['--color-hero-bg', 'hero-bg'],
            ['--color-accent',  'accent'],
          ])}

          ${swatchRow('Premium', [
            ['--color-premium-yellow', 'yellow', true],
            ['--color-premium-amber',  'amber'],
            ['--color-premium-hover',  'hover'],
            ['--color-premium-active', 'active'],
            ['--color-premium-dark',   'dark'],
          ])}

          ${swatchRow('Jersey', [
            ['--color-jersey-red',        'red'],
            ['--color-jersey-red-hover',  'red-hover'],
            ['--color-jersey-red-active', 'red-active'],
          ])}

          ${swatchRow('Status', [
            ['--color-live-red',        'live'],
            ['--color-danger-red',      'danger'],
            ['--color-error-red',       'error'],
            ['--color-error-bg',        'error-bg',    true],
            ['--color-error-border',    'error-border',true],
            ['--color-success-green',   'success'],
            ['--color-free-badge-green','free'],
            ['--color-selected-green',  'selected'],
            ['--color-notif-badge-red', 'notif'],
          ])}

          ${swatchRow('Info / Misc', [
            ['--color-claimed-purple',    'claimed'],
            ['--color-info-bg-purple',    'info-bg',     true],
            ['--color-info-border-purple','info-border', true],
            ['--color-link-blue',         'link'],
            ['--color-highlight-gray',    'highlight'],
            ['--color-social-icon',       'social-icon'],
          ])}

          ${swatchRow('Stats Bars', [
            ['--color-bar-red',   'bar-red'],
            ['--color-bar-gray',  'bar-gray', true],
            ['--color-bar-track', 'bar-track',true],
          ])}
        </div>
      </div>
    `,
  }),
}

/* ══════════════════════════════════════════════
   2. TYPOGRAPHY — complete
══════════════════════════════════════════════ */
export const Typography: Story = {
  render: () => ({
    template: `
      <div style="${wrap}">
        <div style="${box}">
          <p style="${ttl}">Typography</p>
          <p style="${sub}">Full type scale — 14 size tokens, 5 weight tokens, 2 line-height tokens, 2 font families.</p>
          <hr style="${hr}" />

          <p style="${lbl}">Font Families</p>
          <div style="display:flex;gap:40px;margin-bottom:28px;flex-wrap:wrap">
            <div>
              <p style="font-family:'Red Hat Display',sans-serif;font-size:22px;font-weight:700;margin:0 0 4px;color:var(--color-dark-text)">Red Hat Display</p>
              <span style="${mono}">--font-family-base — UI, labels, body</span>
            </div>
            <div>
              <p style="font-family:'Gala',Georgia,serif;font-size:22px;font-weight:700;margin:0 0 4px;color:var(--color-dark-text)">Gala</p>
              <span style="${mono}">--font-gala — editorial, score display</span>
            </div>
          </div>

          <p style="${lbl}">Font Size Scale</p>
          <div style="display:flex;flex-direction:column;gap:0;margin-bottom:28px">
            ${typeRow('--text-display', '32px', 'Display — hero headlines')}
            ${typeRow('--text-h1',      '28px', 'H1 — page titles')}
            ${typeRow('--text-h2',      '26px', 'H2 — section titles')}
            ${typeRow('--text-2xl',     '24px', '2XL')}
            ${typeRow('--text-xl',      '22px', 'XL')}
            ${typeRow('--text-lg',      '20px', 'LG')}
            ${typeRow('--text-h3',      '18px', 'H3 — card titles')}
            ${typeRow('--text-base',    '16px', 'Base — body text')}
            ${typeRow('--text-sm',      '15px', 'SM')}
            ${typeRow('--text-xs',      '14px', 'XS — labels, inputs')}
            ${typeRow('--text-body2',   '13px', 'Body 2 — secondary text')}
            ${typeRow('--text-caption', '12px', 'Caption — meta, timestamps')}
            ${typeRow('--text-2xs',     '11px', '2XS — badges, chips')}
            ${typeRow('--text-jersey',  '29px', 'Jersey — player number display')}
          </div>

          <p style="${lbl}">Font Weight</p>
          <div style="display:flex;gap:32px;flex-wrap:wrap;margin-bottom:28px;align-items:baseline">
            ${weightItem('Regular',   '400', '--font-regular')}
            ${weightItem('Medium',    '500', '--font-medium')}
            ${weightItem('Semibold',  '600', '--font-semibold')}
            ${weightItem('Bold',      '700', '--font-bold')}
            ${weightItem('ExtraBold', '800', '--font-extra-bold')}
          </div>

          <p style="${lbl}">Line Height</p>
          <div style="display:flex;gap:40px;flex-wrap:wrap">
            ${leadingItem('Tight',  '1.2', '--leading-tight',  'Headings, display text')}
            ${leadingItem('Normal', '1.5', '--leading-normal', 'Body text, descriptions')}
          </div>
        </div>
      </div>
    `,
  }),
}

function typeRow(token: string, size: string, desc: string) {
  return `<div style="${row}">
    <span style="font-size:var(${token});font-weight:600;color:var(--color-dark-text);min-width:80px;line-height:1">Aa</span>
    <span style="font-size:12px;font-weight:600;color:var(--color-dark-text);min-width:44px">${size}</span>
    <span style="${mono};min-width:148px">${token}</span>
    <span style="font-size:12px;color:var(--color-gray-400)">${desc}</span>
  </div>`
}

function weightItem(name: string, w: string, token: string) {
  return `<div style="text-align:center">
    <div style="font-size:26px;font-weight:${w};color:var(--color-dark-text)">${name}</div>
    <div style="font-size:11px;color:var(--color-gray-400);margin-top:4px">${w}</div>
    <div style="${mono};margin-top:2px">${token}</div>
  </div>`
}

function leadingItem(name: string, val: string, token: string, desc: string) {
  return `<div>
    <p style="font-size:14px;line-height:${val};color:var(--color-dark-text);max-width:180px;border-left:3px solid var(--color-primary);padding-left:10px;margin:0 0 8px">
      The quick brown fox jumps over the lazy dog.
    </p>
    <span style="font-size:12px;font-weight:600;color:var(--color-dark-text)">${name} · ${val}</span><br/>
    <span style="${mono}">${token}</span><br/>
    <span style="font-size:11px;color:var(--color-gray-400)">${desc}</span>
  </div>`
}

/* ══════════════════════════════════════════════
   3. SPACING — complete
══════════════════════════════════════════════ */
export const Spacing: Story = {
  render: () => ({
    template: `
      <div style="${wrap}">
        <div style="${box}">
          <p style="${ttl}">Spacing</p>
          <p style="${sub}">8px base grid — 13 spacing tokens from 2px to 34px.</p>
          <hr style="${hr}" />
          <div style="display:flex;flex-direction:column;gap:8px">
            ${spacingRow('--space-xxs', '2px')}
            ${spacingRow('--space-xs',  '4px')}
            ${spacingRow('--space-xs2', '6px')}
            ${spacingRow('--space-sm',  '8px')}
            ${spacingRow('--space-sm2', '10px')}
            ${spacingRow('--space-md',  '12px')}
            ${spacingRow('--space-md2', '14px')}
            ${spacingRow('--space-lg',  '16px')}
            ${spacingRow('--space-lg2', '20px')}
            ${spacingRow('--space-xl',  '24px')}
            ${spacingRow('--space-2xl', '32px', '--space-xxl alias')}
            ${spacingRow('--space-xxl', '32px', 'alias → space-2xl')}
            ${spacingRow('--space-3xl', '34px')}
          </div>
        </div>
      </div>
    `,
  }),
}

function spacingRow(token: string, size: string, note = '') {
  const noteHtml = note ? `<span style="font-size:11px;color:var(--color-gray-400);margin-left:8px">${note}</span>` : ''
  return `<div style="display:flex;align-items:center;gap:16px">
    <span style="${mono};min-width:144px">${token}</span>
    <div style="height:16px;width:${size};background:var(--color-primary);border-radius:2px;flex-shrink:0"></div>
    <span style="font-size:12px;font-weight:600;color:var(--color-dark-text);min-width:32px">${size}</span>
    ${noteHtml}
  </div>`
}

/* ══════════════════════════════════════════════
   4. BORDER RADIUS — complete
══════════════════════════════════════════════ */
export const BorderRadius: Story = {
  render: () => ({
    template: `
      <div style="${wrap}">
        <div style="${box}">
          <p style="${ttl}">Border Radius</p>
          <p style="${sub}">13 radius tokens from tight 4px tags to 50% full circles.</p>
          <hr style="${hr}" />
          <div style="display:grid;grid-template-columns:repeat(13,64px);gap:16px 8px">
            ${radiusSwatch('--radius-xs',   '4px',    'xs',    'Tags')}
            ${radiusSwatch('--radius-sm',   '6px',    'sm',    'Tooltips')}
            ${radiusSwatch('--radius-thumb','8px',    'thumb', 'Notif badge')}
            ${radiusSwatch('--radius-logo', '10px',   'logo',  'Org logos')}
            ${radiusSwatch('--radius-badge','12px',   'badge', 'Badges')}
            ${radiusSwatch('--radius-card', '14px',   'card',  'Cards')}
            ${radiusSwatch('--radius-md',   '16px',   'md',    '')}
            ${radiusSwatch('--radius-lg',   '20px',   'lg',    '')}
            ${radiusSwatch('--radius-2xl',  '24px',   '2xl',   'Sheets')}
            ${radiusSwatch('--radius-chip', '26px',   'chip',  'Chips')}
            ${radiusSwatch('--radius-xl',   '32px',   'xl',    '')}
            ${radiusSwatch('--radius-pill', '9999px', 'pill',  'Inputs')}
            ${radiusSwatch('--radius-full', '50%',    'full',  'Avatars')}
          </div>
        </div>
      </div>
    `,
  }),
}

function radiusSwatch(token: string, val: string, name: string, use: string) {
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:5px;width:64px">
    <div style="width:52px;height:52px;background:var(--color-primary);border-radius:var(${token});flex-shrink:0"></div>
    <span style="font-size:11px;font-weight:700;color:var(--color-dark-text);margin-top:2px">${name}</span>
    <span style="${mono}">${val}</span>
    <span style="font-size:10px;color:var(--color-gray-400);text-align:center;min-height:14px;line-height:1.3">${use}</span>
  </div>`
}

/* ══════════════════════════════════════════════
   5. SIZES — complete (new)
══════════════════════════════════════════════ */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="${wrap}">
        <div style="${box}">
          <p style="${ttl}">Sizes</p>
          <p style="${sub}">Fixed component and layout dimensions — keep consistent across all screen sizes.</p>
          <hr style="${hr}" />

          <p style="${lbl}">Component Heights</p>
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:28px">
            ${sizeBar('--size-input-height',  '46px', 'Text inputs, selects')}
            ${sizeBar('--size-button-height', '40px', 'Buttons (md)')}
            ${sizeBar('--size-tab-height',    '38px', 'Tab controls')}
            ${sizeBar('--size-logo-small',    '48px', 'Small org logos')}
            ${sizeBar('--size-jersey',        '73px', 'Jersey SVG width')}
          </div>

          <p style="${lbl}">Layout Dimensions</p>
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:28px">
            ${sizeBar('--size-topbar-height',   '72px',  'App header height')}
            ${sizeBar('--size-container-width', '398px', 'Main content width')}
            ${sizeBar('--size-page-max-width',  '430px', 'Page max-width')}
            ${sizeBar('--size-hero-height',     '340px', 'Brand hero section height')}
          </div>
        </div>
      </div>
    `,
  }),
}

function sizeBar(token: string, val: string, desc: string) {
  const px = parseInt(val)
  const barW = Math.min(px, 280)
  return `<div style="display:flex;align-items:center;gap:16px">
    <span style="${mono};min-width:200px">${token}</span>
    <div style="height:14px;width:${barW}px;background:var(--color-primary);opacity:0.6;border-radius:2px;flex-shrink:0"></div>
    <span style="font-size:12px;font-weight:600;color:var(--color-dark-text);min-width:44px">${val}</span>
    <span style="font-size:12px;color:var(--color-gray-400)">${desc}</span>
  </div>`
}

/* ══════════════════════════════════════════════
   6. STROKES — complete (new)
══════════════════════════════════════════════ */
export const Strokes: Story = {
  render: () => ({
    template: `
      <div style="${wrap}">
        <div style="${box}">
          <p style="${ttl}">Strokes</p>
          <p style="${sub}">7 border-width tokens for consistent line weights across dividers, inputs, and cards.</p>
          <hr style="${hr}" />
          <div style="display:flex;flex-direction:column;gap:14px">
            ${strokeRow('--stroke-thin',        '0.67px')}
            ${strokeRow('--stroke-regular',     '1px')}
            ${strokeRow('--stroke-medium',      '1.33px')}
            ${strokeRow('--stroke-thick',       '1.7px')}
            ${strokeRow('--stroke-bold',        '2px')}
            ${strokeRow('--stroke-heavy',       '2.5px')}
            ${strokeRow('--stroke-extra-heavy', '2.67px')}
          </div>
        </div>
      </div>
    `,
  }),
}

function strokeRow(token: string, val: string) {
  const h = parseFloat(val)
  return `<div style="display:flex;align-items:center;gap:16px">
    <span style="${mono};min-width:200px">${token}</span>
    <div style="width:200px;height:${h}px;background:var(--color-dark-text);border-radius:1px;flex-shrink:0"></div>
    <span style="font-size:12px;font-weight:600;color:var(--color-dark-text)">${val}</span>
  </div>`
}

/* ══════════════════════════════════════════════
   7. SHADOWS — complete
══════════════════════════════════════════════ */
export const Shadows: Story = {
  render: () => ({
    template: `
      <div style="${wrap}">
        <div style="${box}">
          <p style="${ttl}">Shadows</p>
          <p style="${sub}">6 elevation levels. Shadows deepen automatically in Dark mode via token overrides.</p>
          <hr style="${hr}" />
          <div style="display:grid;grid-template-columns:repeat(6,120px);gap:16px 12px">
            ${shadowCard('--shadow-sm',    'sm',    'Cards, chips')}
            ${shadowCard('--shadow-md',    'md',    'Elevated cards')}
            ${shadowCard('--shadow-lg',    'lg',    'Floating panels')}
            ${shadowCard('--shadow-xl',    'xl',    'High elevation')}
            ${shadowCard('--shadow-popup', 'popup', 'Popovers, NotificationCenter')}
            ${shadowCard('--shadow-focus', 'focus', 'Focus ring outline')}
          </div>
        </div>
      </div>
    `,
  }),
}

function shadowCard(token: string, name: string, desc: string) {
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;width:120px">
    <div style="width:80px;height:80px;border-radius:var(--radius-card);background:var(--color-white);box-shadow:var(${token});border:1px solid var(--color-gray-100);flex-shrink:0"></div>
    <span style="font-size:12px;font-weight:700;color:var(--color-dark-text);margin-top:2px">${name}</span>
    <span style="font-size:10px;color:var(--color-gray-400);text-align:center;min-height:28px;line-height:1.4">${desc}</span>
    <span style="${mono}">${token}</span>
  </div>`
}

/* ══════════════════════════════════════════════
   8. MOTION — complete
══════════════════════════════════════════════ */
export const Motion: Story = {
  render: () => ({
    template: `
      <div style="${wrap}">
        <div style="${box}">
          <p style="${ttl}">Motion</p>
          <p style="${sub}">4 duration tokens + 4 easing tokens. All transitions in the DS use these values.</p>
          <hr style="${hr}" />

          <p style="${lbl}">Duration</p>
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:32px">
            ${durationRow('--duration-instant', '100ms', 'Micro-interactions — bg swap on click')}
            ${durationRow('--duration-fast',    '150ms', 'Hover state transitions (dominant)')}
            ${durationRow('--duration-base',    '200ms', 'Standard UI transitions')}
            ${durationRow('--duration-slow',    '300ms', 'Structural — drawers, carousels, modals')}
          </div>

          <p style="${lbl}">Easing</p>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${easingRow('--easing-standard', 'ease',                              'Standard — default for most transitions')}
            ${easingRow('--easing-in',       'ease-in',                           'In — element leaving screen')}
            ${easingRow('--easing-out',      'ease-out',                          'Out — element entering screen')}
            ${easingRow('--easing-spring',   'cubic-bezier(0.34, 1.56, 0.64, 1)', 'Spring — subtle overshoot for playful feel')}
          </div>
        </div>
      </div>
    `,
  }),
}

function durationRow(token: string, val: string, desc: string) {
  const ms = parseInt(val)
  const barW = Math.round(ms * 0.9)
  return `<div style="display:flex;align-items:center;gap:16px">
    <span style="${mono};min-width:160px">${token}</span>
    <div style="height:10px;width:${barW}px;background:var(--color-primary);border-radius:5px;flex-shrink:0"></div>
    <span style="font-size:12px;font-weight:600;color:var(--color-dark-text);min-width:44px">${val}</span>
    <span style="font-size:12px;color:var(--color-gray-400)">${desc}</span>
  </div>`
}

function easingRow(token: string, val: string, desc: string) {
  return `<div style="${row}">
    <span style="${mono};min-width:160px">${token}</span>
    <span style="font-size:12px;color:var(--color-gray-500);min-width:240px;font-family:monospace">${val}</span>
    <span style="font-size:12px;color:var(--color-gray-400)">${desc}</span>
  </div>`
}

/* ══════════════════════════════════════════════
   9. Z-INDEX — complete
══════════════════════════════════════════════ */
export const ZIndex: Story = {
  name: 'Z-Index',
  render: () => ({
    template: `
      <div style="${wrap}">
        <div style="${box}">
          <p style="${ttl}">Z-Index — Stacking Contexts</p>
          <p style="${sub}">5 named layers for predictable elevation management.</p>
          <hr style="${hr}" />

          <div style="position:relative;height:220px;margin-bottom:32px;overflow:hidden">
            ${zLayer(300, 5,   'toast',    '#116DFF', '--z-toast = 300')}
            ${zLayer(200, 45,  'modal',    '#1D5FCC', '--z-modal = 200')}
            ${zLayer(100, 90,  'dropdown', '#2B72E8', '--z-dropdown = 100')}
            ${zLayer(10,  135, 'above',    '#5A9BFF', '--z-above = 10')}
            ${zLayer(1,   175, 'base',     '#93C5FD', '--z-base = 1')}
          </div>

          <div style="display:flex;flex-direction:column;gap:0">
            ${zRow('--z-base',     '1',   'Cards, inline raised elements')}
            ${zRow('--z-above',    '10',  'Sticky headers, tab bars')}
            ${zRow('--z-dropdown', '100', 'Dropdowns, tooltips')}
            ${zRow('--z-modal',    '200', 'Modals, overlays')}
            ${zRow('--z-toast',    '300', 'Toasts, banners — always on top')}
          </div>
        </div>
      </div>
    `,
  }),
}

function zLayer(z: number, top: number, name: string, color: string, label: string) {
  const w = Math.max(60, 340 - z * 0.5)
  return `<div style="position:absolute;left:0;top:${top}px;width:${w}px;height:34px;background:${color};border-radius:6px;display:flex;align-items:center;padding:0 14px;gap:12px;z-index:${z}">
    <span style="font-size:12px;font-weight:700;color:#fff;min-width:64px">${name}</span>
    <span style="font-size:10px;color:rgba(255,255,255,0.75)">${label}</span>
  </div>`
}

function zRow(token: string, val: string, desc: string) {
  return `<div style="${row}">
    <span style="${mono};min-width:140px">${token}</span>
    <span style="font-size:12px;font-weight:700;color:var(--color-dark-text);min-width:40px">${val}</span>
    <span style="font-size:12px;color:var(--color-gray-400)">${desc}</span>
  </div>`
}

/* ══════════════════════════════════════════════
   11. DARK MODE TOKENS
══════════════════════════════════════════════ */
export const DarkMode: Story = {
  name: 'Dark Mode Tokens',
  render: () => ({
    template: `
      <div style="${wrap}">
        <div data-theme="dark" style="border-radius:16px;padding:28px 32px;background:#1A1A1A;margin-bottom:32px">
          <p style="font-size:18px;font-weight:700;margin:0 0 4px;color:#E8E8E8">Dark Mode Overrides</p>
          <p style="font-size:13px;color:#888;margin:0 0 20px">27 tokens that override light values when <code style="background:#2A2A2A;padding:2px 6px;border-radius:4px;font-size:11px;color:#E8E8E8">[data-theme="dark"]</code> is set.</p>
          <hr style="border:none;border-top:1px solid #333;margin:0 0 24px" />

          ${darkSwatchRow('Primary', [
            ['--color-primary',        'primary',        '#3B8BFF', false],
            ['--color-primary-hover',  'primary-hover',  '#5A9FFF', false],
            ['--color-primary-active', 'primary-active', '#2563EB', false],
          ])}

          ${darkSwatchRow('Neutrals', [
            ['--color-white',        'white',        '#1A1A1A', true],
            ['--color-black',        'black',        '#FFFFFF', false],
            ['--color-dark-text',    'dark-text',    '#E8E8E8', false],
            ['--color-gray-50',      'gray-50',      '#262626', true],
            ['--color-gray-100',     'gray-100',     '#333333', true],
            ['--color-gray-200',     'gray-200',     '#444444', true],
            ['--color-gray-300',     'gray-300',     '#555555', true],
            ['--color-gray-400',     'gray-400',     '#888888', true],
            ['--color-gray-500',     'gray-500',     '#A0A0A0', true],
            ['--color-gray-overlay', 'gray-overlay', 'rgba(255,255,255,.08)', true],
          ])}

          ${darkSwatchRow('Surfaces', [
            ['--color-card-bg',       'card-bg',       '#2A2A2A', true],
            ['--color-card-hover-bg', 'card-hover-bg', '#333333', true],
            ['--color-overlay',       'overlay',       'rgba(0,0,0,.85)', false],
          ])}

          ${darkSwatchRow('Primary Tints', [
            ['--color-primary-bg-light',   'bg-light',   'rgba(59,139,255,.12)', true],
            ['--color-primary-bg-lighter', 'bg-lighter', 'rgba(59,139,255,.20)', true],
          ])}

          ${darkSwatchRow('Status', [
            ['--color-error-bg',  'error-bg',  'rgba(239,68,68,.12)', true],
            ['--color-bar-track', 'bar-track', '#3A3A3A',             true],
          ])}

          <p style="font-size:11px;font-weight:600;letter-spacing:.06em;color:#888;text-transform:uppercase;margin:0 0 12px">Shadows</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,120px);gap:16px 12px">
            ${darkShadow('--shadow-sm',    'sm',    '0 2px 4px rgba(0,0,0,.5)')}
            ${darkShadow('--shadow-md',    'md',    '0 4px 12px rgba(0,0,0,.3)')}
            ${darkShadow('--shadow-lg',    'lg',    '0 4px 12px rgba(0,0,0,.4)')}
            ${darkShadow('--shadow-xl',    'xl',    '0 4px 12px rgba(0,0,0,.6)')}
            ${darkShadow('--shadow-popup', 'popup', '0 8px 30px rgba(0,0,0,.5)')}
          </div>
        </div>
      </div>
    `,
  }),
}

function darkSwatchRow(label: string, tokens: Array<[string, string, string, boolean]>) {
  return `<div style="margin-bottom:28px">
    <p style="font-size:11px;font-weight:600;letter-spacing:.06em;color:#888;text-transform:uppercase;margin:0 0 12px">${label}</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,96px);gap:16px 12px">
      ${tokens.map(([token, name, hex, border]) => darkSwatch(token, name, hex, border)).join('')}
    </div>
  </div>`
}

function darkSwatch(token: string, name: string, hex: string, border = false) {
  const b = border ? 'border:1px solid #444;' : ''
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:5px;width:96px;text-align:center">
    <div style="width:64px;height:64px;border-radius:12px;background:var(${token});${b}flex-shrink:0"></div>
    <span style="font-size:11px;font-weight:600;color:#E8E8E8;line-height:1.3;word-break:break-word">${name}</span>
    <span style="font-family:monospace;font-size:9px;color:#888;overflow-wrap:break-word;word-break:break-word;line-height:1.4">${hex}</span>
  </div>`
}

function darkShadow(token: string, name: string, value: string) {
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;width:120px">
    <div style="width:80px;height:80px;border-radius:14px;background:#2A2A2A;box-shadow:var(${token});flex-shrink:0"></div>
    <span style="font-size:12px;font-weight:700;color:#E8E8E8;margin-top:2px">${name}</span>
    <span style="font-family:monospace;font-size:9px;color:#888;text-align:center;line-height:1.4;overflow-wrap:break-word;word-break:break-word">${token}</span>
  </div>`
}
