<!-- 这个是首页的组件 -->
<script setup lang="ts">
import TheTop from './component/TheTop.vue'

// 我们希望搜索推荐的文案是从这个组件传入的
const recomments = [
  {
    value: 1,
    label: '牛腩'
  },
  {
    value: 2,
    label: '色拉'
  }
]
</script>

<template>
  <div class="home-page">
    <TheTop :recomments="recomments" />
  </div>
</template>
<style></style>
