<script setup lang="ts">
// 引入底部导航栏组件
import { Tabbar, TabbarItem } from 'vant'
import { ref } from 'vue'

//记录当前选择的tab,页面加载默认定位到home
const active = ref('home')
</script>

<template>
  <div class="center">{{ active }}</div>

  <Tabbar v-model="active">
    <TabbarItem name="home" icon="home-o">首页</TabbarItem>
    <TabbarItem name="order" icon="bars">订单</TabbarItem>
    <TabbarItem name="me" icon="contact">我的</TabbarItem>
  </Tabbar>
</template>

<style scoped>
.center {
  text-align: center;
}
</style>
