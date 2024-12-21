import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "@/assets/main.css"

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)
const pinia = createPinia()

app.use(pinia.use(piniaPluginPersistedstate))
app.use(router)
app.use(ElementPlus)
app.mount('#app')
