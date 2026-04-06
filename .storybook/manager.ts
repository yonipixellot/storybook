import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

const logo = `data:image/svg+xml;utf8,<svg width="236" height="162" viewBox="0 0 236 162" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M172.355 53.8276L162.262 107.655C161.315 112.797 158.266 115.315 153.22 115.315H69.5293C64.4826 115.315 62.3799 112.797 63.4313 107.655L73.5246 53.8276C74.4708 48.6862 77.5199 46.1679 82.5665 46.1679H166.257C171.304 46.1679 173.406 48.6862 172.355 53.8276ZM182.448 0H83.6179C43.0344 0 19.9038 15.4243 14.1212 46.1679L1.08404 115.42C-4.69859 146.163 12.6493 161.588 53.2328 161.588H152.063C192.647 161.588 215.777 146.163 221.56 115.42L234.597 46.1679C240.38 15.4243 223.032 0 182.448 0Z" fill="%2300D6FE"/></svg>`

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Pixellot DS',
    brandImage: logo,
    brandUrl: 'https://yonipixellot.github.io/pixellot-design-system/',
    brandTarget: '_blank',
  }),
})
