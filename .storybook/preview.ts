import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3-vite'
import { withThemeByDataAttribute } from '@storybook/addon-themes'
import { createRouter, createMemoryHistory } from 'vue-router'

import '../src/tokens/tokens.css'

console.log('[preview.ts] loaded — setting viewport options');

/* ── Vue Router: stub router so <router-link> never throws ── */
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'stub', component: { template: '<div />' } },
  ],
})

setup((app) => {
  app.use(router)
})

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
    viewport: {
      options: {
        mobile390: {
          name: 'Mobile (390)',
          styles: { width: '390px', height: '844px' },
          type: 'mobile',
        },
        tablet768: {
          name: 'Tablet (768)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop1024: {
          name: 'Desktop (1024)',
          styles: { width: '1024px', height: '768px' },
          type: 'desktop',
        },
        desktop1440: {
          name: 'Desktop Wide (1440)',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },

  initialGlobals: {
    viewport: { value: 'mobile390' },
  },
}

export default preview
