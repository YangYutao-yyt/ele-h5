<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAsync } from '@/use/useAsync'
import { useLockScroll } from '@/use/useLockScroll'
import { PRIMARY_COLOR } from '@/config'
import { fetchShopPageData } from '@/api/shop'
import OpTodo from '@/Components/OpTodo.vue'
import OpLoadingView from '@/Components/OpLoadingView.vue'
import ShopHeader from '@/views/shop/components/ShopHeader.vue'
import GoodsList from './components/GoodsList.vue'
import ShopCart from './components/ShopCart.vue'

const TAB_LIST = [
  {
    value: 1,
    label: '全部商品',
    component: GoodsList
  },
  {
    value: 2,
    label: '评价',
    component: OpTodo
  },
  {
    value: 3,
    label: '商家',
    component: OpTodo
  }
]
const active = ref(TAB_LIST[0].value)
const route = useRoute()
const { id } = route.params

const { data, pending } = useAsync(() => fetchShopPageData(id as string), {
  announcement: '',
  discounts: [],
  redbags: [],
  activitys: [],
  branch: '',
  comments: [],
  deliveryDistance: '',
  deliveryStrategy: '',
  deliveryStratingPrice: '',
  deliveryTags: [],
  deliveryTime: '',
  id: '',
  monthlyCount: 0,
  postUrl: '',
  bgUrl: '',
  score: 0,
  services: [],
  shopName: '',
  tops: []
})
// 把商品页面给锁了
useLockScroll(() => active.value === 1)

const onClickLeft = () => history.back()
</script>

<template>
  <div class="shop-page">
    <VanNavBar left-text="返回" left-arrow @click-left="onClickLeft"></VanNavBar>
    <OpLoadingView :loading="pending" type="skeleton">
      <!-- 商家头部 -->
      <ShopHeader :data="data"></ShopHeader>
      <!-- 商品列表 -->
      <VanTabs v-model:active="active" :color="PRIMARY_COLOR" sticky animated swipeable>
        <VanTab v-for="v in TAB_LIST" :key="v.value" :title="v.label" :name="v.value">
          <!-- 使用了动态渲染组件 -->
          <component :is="v.component"></component>
        </VanTab>
      </VanTabs>
      <ShopCart v-if="active === 1" />
    </OpLoadingView>
  </div>
</template>
<style lang="scss">
.shop-page {
  .van-tabs__line,
  .van-nav-bar {
    z-index: 0;
  }
}
</style>
