import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { fileURLToPath } from 'url'
import { resolve } from "path";
import { VitePWA } from 'vite-plugin-pwa'
import vuetify from '@vuetify/vite-plugin'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA(),vuetify({
    autoImport: true,
  }),
  vueI18n({
    include: resolve(__dirname, "src/locales/**"),
    compositionOnly: true,
    runtimeOnly: false,
  }),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
