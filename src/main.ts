import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'

// 常规引入Vant组件样式
import 'vant/lib/index.css'

const app = createApp(App)

app.use(createPinia())
// app.use(router)

app.mount('#app')
