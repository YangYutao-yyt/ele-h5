// 项目初始的默认样式在这里
// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
//将写好的路由内容挂载到app中
import router from './router'

// 常规引入Vant组件样式
import 'vant/lib/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 设计稿的fontsize
const rootValue = 16
// 设计稿的屏幕宽度
const rootWidth = 390
// 用户屏幕宽度
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = (deviceWidth * rootValue) / rootWidth + 'px'

app.mount('#app')
