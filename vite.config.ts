import { fileURLToPath } from 'url'
import { VitePWA } from 'vite-plugin-pwa'
import vuetify from '@vuetify/vite-plugin'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA(),vuetify({
    autoImport: true,
  }),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
