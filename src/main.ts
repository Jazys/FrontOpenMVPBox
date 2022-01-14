import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index';
import messages from "@intlify/vite-plugin-vue-i18n/messages";
import { createI18n } from "vue-i18n";
const i18n = createI18n({
  locale: "en",
  messages,
});


createApp(App)
  .use(vuetify)
  .use(router)
  .use(i18n)
  .mount('#app')
