import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import InstallTerminal from './components/InstallTerminal.vue'
import HomeFeatures from './components/HomeFeatures.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('InstallTerminal', InstallTerminal)
    app.component('HomeFeatures', HomeFeatures)
  },
} satisfies Theme
