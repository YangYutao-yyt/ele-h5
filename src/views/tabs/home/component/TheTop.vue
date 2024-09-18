<script setup lang="ts">
import { ref } from 'vue'
import type { ISearchRecomment } from '@/types'
import OpSearch from '@/Cpmponents/OpSearch.vue'
// 声明传入的搜索推荐
interface IProps {
  recomments: ISearchRecomment[]
}
defineProps<IProps>()

const searchValue = ref('test')

// 定义事件
const onSearch = (v?: string | number) => {
  console.log('====search', v)
}
const onCancel = () => {
  console.log('====cancel')
}
const onClear = () => {
  console.log('====clear')
}
</script>

<template>
  <div class="home-top">
    <!-- 最顶部的导航栏 -->
    <div class="top">
      <img class="location-icon" src="@/assets/imgs/index_page/location.png" />
      <div class="location">幸福小区(北一区东南门)</div>
      <img class="shopcart-icon" src="@/assets/imgs/index_page/shopcart.png" />
      <img class="comments-icon" src="@/assets/imgs/index_page/comments.png" />
    </div>
    <!-- 搜索栏 -->
    <OpSearch
      show-action
      v-model="searchValue"
      shape="round"
      background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
      placeholder="世界茶饮 35减2"
      @search="onSearch"
      @cancel="onCancel"
      @clear="onClear"
    >
      <!-- 搜索按钮 -->
      <!-- <template #right-icon>
        <div>搜索</div>
      </template> -->
    </OpSearch>
    <!-- 搜索推荐 -->
    <div class="search-recommend">
      <div v-for="v in recomments" :key="v.value" class="tag">{{ v.label }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-top {
  // 背景是渐变的
  background: linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243));
  color: white;

  .top {
    // 浮动
    display: flex;
    // 居中
    align-items: center;
    padding: 10px 10px 0 10px;
    line-height: 15px;
    font-size: 15px;
    // 字体加粗
    font-weight: bold;

    .location-icon {
      width: 20px;
      height: 20px;
    }

    .location {
      flex: 1;
    }

    .shopcart-icon {
      width: 24px;
      height: 24px;
    }

    .comments-icon {
      width: 28px;
      height: 24px;
      margin-left: 10px;
    }
  }

  .search-recommend {
    display: flex;
    padding: 0 10px 8px;

    .tag {
      font-size: 12px;
      border-radius: 10px;
      background: rgb(242, 242, 242, 0.3);
      padding: 2px 8px;
      margin-right: 10px;
    }
  }
}
</style>
<style lang="scss">
.home-top {
  .van-field__right-icon {
    margin-right: 0%;
  }
}
</style>
