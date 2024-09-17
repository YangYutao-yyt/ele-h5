import { createRouter, createWebHistory } from 'vue-router'
// 在路由中引入底部导航栏
//原因：因为ts只能解析 .ts 文件，无法解析 .vue文件
//解决方案：在项目根目录下的env.d.ts文件里面输入响应代码
import TabsView from '../views/tabs/TabsView.vue'
//引入首页，订单，我的组件
import HomeView from '../views/tabs/home/HomeView.vue'
import OrderView from '../views/tabs/order/OrderView.vue'
import MeView from '../views/tabs/me/MeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: TabsView,
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/order',
          name: 'order',
          component: OrderView
        },
        {
          path: '/me',
          name: 'me',
          component: MeView
        }
      ]
    }
  ]
})

export default router
