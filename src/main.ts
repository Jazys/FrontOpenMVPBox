import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index';
import messages from "@intlify/vite-plugin-vue-i18n/messages";
import { createI18n } from "vue-i18n";
import en from './locales/en.json'
import fr from './locales/fr.json'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "fr",
  messages: {
    en,
    fr
  }
});


createApp(App)
  .use(vuetify)
  .use(router)
  .use(i18n)
  .mount('#app')
