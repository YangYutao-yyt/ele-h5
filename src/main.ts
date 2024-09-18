import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
//将写好的路由内容挂载到app中
import router from './router'
// 全局注册底部导航栏
import { Tabbar, TabbarItem, Search, Icon } from 'vant'

// 常规引入Vant组件样式
import 'vant/lib/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(Icon)

// 设计稿的fontsize
const rootValue = 16
// 设计稿的屏幕宽度
const rootWidth = 390
// 用户屏幕宽度
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = (deviceWidth * rootValue) / rootWidth + 'px'

app.mount('#app')
