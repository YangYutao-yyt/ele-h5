<!-- 这个是首页的组件 -->
<script setup lang="ts">
import TheTop from './component/TheTop.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useToggle } from '@/use/useToggle'

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
// 使用useToggle来实现搜索页展示的切换
const [isSearchViewShown, toggleSearchView] = useToggle(false)
</script>

<template>
  <div class="home-page">
    <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchView>
    <TheTop :recomments="recomments" @searchClick="toggleSearchView" />
  </div>
</template>
<style></style>
