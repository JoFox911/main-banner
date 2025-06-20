import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './assets/main.scss'
import App from './App.vue'

import en from './locales/en.json'
import uk from './locales/uk.json'

const i18n = createI18n({
  legacy: false, // Composition API support
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    uk
  }
})

createApp(App).use(i18n).mount('#app')
