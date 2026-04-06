import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Pixellot DS',
    brandImage: '/favicon.svg',
    brandUrl: 'https://yonipixellot.github.io/pixellot-design-system/',
  }),
})
