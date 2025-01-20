import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './config/parse'
import { initializeParse } from './config/parse'

const app = createApp(App)

initializeParse();
app.use(createPinia())
app.use(router)

app.mount('#app')
