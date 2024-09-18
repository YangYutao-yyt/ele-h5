<script setup lang="ts">
import { ref, watch } from 'vue'

//引入路由的内容组件渲染的地方
//引入两个hooks函数useRoute获取当前的路由状态，useRouter获取路由的实例
import { RouterView, useRoute, useRouter } from 'vue-router'

//使用变量记录当前路由的状态
const route = useRoute()
//获取路由的实例
const router = useRouter()
//记录当前选择的tab,通过路由状态加载对应的的底部导航栏
const active = ref(route.name as string)

//使用watch监听active
watch(active, (nv) => {
  router.push({
    name: nv
  })
})
</script>

<template>
  <!-- 不同路由具体内容的渲染 -->
  <RouterView />
  <VanTabbar v-model="active">
    <VanTabbarItem name="home" icon="home-o">首页</VanTabbarItem>
    <VanTabbarItem name="order" icon="bars">订单</VanTabbarItem>
    <VanTabbarItem name="me" icon="contact">我的</VanTabbarItem>
  </VanTabbar>
</template>

<style scoped>
.center {
  text-align: center;
}
</style>
