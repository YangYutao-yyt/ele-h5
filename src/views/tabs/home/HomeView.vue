<!-- 这个是首页的组件 -->
<script setup lang="ts">
// 这种引用都是直引用vue组件
import TheTop from './component/TheTop.vue'
import SearchView from '@/views/search/SearchView.vue'
// 这种引用都是export function
import { useToggle } from '@/use/useToggle'
import { useAsync } from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'
import type { IHomeInfo } from '@/types'
import OpLoadingView from '@/Components/OpLoadingView.vue'
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

const { data, pending } = useAsync(fetchHomePageData, {} as IHomeInfo)
</script>

<template>
  <div class="home-page">
    <!-- vue内置的动画组件,实现切换时的动画效果-->
    <Transition name="fade">
      <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <TheTop :recomments="recomments" @searchClick="toggleSearchView" />
    <!-- 加载的骨架 -->
    <OpLoadingView :loading="pending" type="skeleton">
      <div>
        {{ data }}
      </div>
    </OpLoadingView>
  </div>
</template>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

// 最开始的透明度为0
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
