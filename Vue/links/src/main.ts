import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import "@/assets/main.css"
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

const app = createApp(App)

const pinia = createPinia()
   .use(piniaPluginPersistedstate)
app.use(router)
app.use(pinia)

app.use(ElementPlus)
app.mount('#app')
