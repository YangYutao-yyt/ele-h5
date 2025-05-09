<!-- 这个是首页的组件 -->
<script setup lang="ts">
import { ref } from 'vue'

// 这种引用都是直引用vue组件
import TheTop from './component/TheTop.vue'
import TheTransformer from './component/TheTransformer.vue'
import SearchView from '@/views/search/SearchView.vue'
// 这种引用都是export function
import { useToggle } from '@/use/useToggle'
import { useAsync } from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'
import type { ICountdown, IHomeInfo } from '@/types'
import OpLoadingView from '@/Components/OpLoadingView.vue'
import ScrollBar from './component/ScrollBar.vue'
import CountDown from './component/CountDown.vue'
import OpSwipe from '@/Components/swipe/OpSwipe'
import OpSwipeItem from '@/Components/swipe/OpSwipeItem'
import { PRIMARY_COLOR, TRANSPARENT } from '@/config/index'
import { HOME_TABS } from './config'

const [isSearchViewShown, toggleSearchView] = useToggle(false)

const { data, pending } = useAsync(fetchHomePageData, {
  banner: [],
  searchRecomments: [],
  transformer: [],
  scrollBarInfoList: [],
  countdown: {} as ICountdown,
  activities: []
} as IHomeInfo)

const tabBackgroundColor = ref(TRANSPARENT)
// 是否有粘性布局，固定在上面
const onTabScroll = ({ isFixed }: { isFixed: boolean }) => {
  tabBackgroundColor.value = isFixed ? 'white' : TRANSPARENT
}
</script>

<template>
  <div class="home-page">
    <!-- vue内置的动画组件,实现切换时的动画效果-->
    <Transition name="fade">
      <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <div v-show="!isSearchViewShown">
      <!-- 顶部搜索栏 -->
      <TheTop :recomments="data.searchRecomments" @searchClick="toggleSearchView" />
      <!-- 加载的骨架 -->
      <OpLoadingView :loading="pending" type="skeleton">
        <div class="home-page__banner">
          <img v-for="v in data.banner" :key="v.imgUrl" :src="v.imgUrl" />
        </div>
        <!-- Grid网格布局 -->
        <TheTransformer :data="data.transformer" />
        <!-- 轮播图 -->
        <ScrollBar :data="data.scrollBarInfoList" />
        <div class="home-page__activity">
          <!-- 倒计时 -->
          <CountDown :data="data.countdown" />
          <!-- 滚动栏 -->
          <OpSwipe class="home-page__activity__swipe" :autoplay="3000" :loop="true">
            <OpSwipeItem v-for="v in data.activities" :key="v">
              <img :src="v" />
            </OpSwipeItem>
          </OpSwipe>
        </div>
        <VanTabs
          sticky
          offset-top="54px"
          :color="PRIMARY_COLOR"
          :background="tabBackgroundColor"
          @scroll="onTabScroll"
        >
          <VanTab v-for="v in HOME_TABS" :key="v.value" :title="v.title">
            <component :is="v.component"></component>
          </VanTab>
        </VanTabs>
      </OpLoadingView>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.home-page {
  background: var(--op-gray-bg-color);
  padding-bottom: 70px;

  &__banner {
    img {
      width: 100%;
      padding-top: 10px;
      background: white;
    }
  }

  &__activity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    &__swipe {
      border-radius: 8px;
      width: 180px;
      height: 170px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
