<script setup lang="ts">
//设置内容组件渲染的地方
import { RouterView } from 'vue-router'
// 引入TabsView
// import TabsView from './views/tabs/TabsView.vue'
import { fetchTest } from '@/api/test'
// 调用fetchTest
fetchTest()
</script>

<template>
  <!-- 设置路由内容组件渲染的地方 -->
  <RouterView />
  <!-- <TabsView></TabsView> -->
</template>

<style scoped></style>
