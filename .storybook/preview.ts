import type { Preview } from '@storybook/vue3-vite'
import { withThemeByDataAttribute } from '@storybook/addon-themes'

import '../src/tokens/tokens.css'

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        Light: 'light',
        Dark:  'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],

  parameters: {
    // ── Viewport ──────────────────────────────────────────────────────────
    // Storybook 10: key is `options` (not `viewports`).
    // Default is set via globals.viewport below.
    viewport: {
      options: {
        mobile390: {
          name: '📱 Mobile (390)',
          styles: { width: '390px', height: '844px' },
          type: 'mobile',
        },
        tablet768: {
          name: '📟 Tablet (768)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop1024: {
          name: '🖥  Desktop (1024)',
          styles: { width: '1024px', height: '768px' },
          type: 'desktop',
        },
        desktop1440: {
          name: '🖥  Desktop Wide (1440)',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
      },
    },

    // ── Controls ──────────────────────────────────────────────────────────
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },

    // ── Accessibility ─────────────────────────────────────────────────────
    a11y: {
      test: 'todo',
    },
  },

  // ── Global defaults ───────────────────────────────────────────────────────
  // Storybook 10: default viewport is set via globals, not parameters.
  globals: {
    viewport: { value: 'mobile390' },
  },
}

export default preview
