<script setup lang="ts">
import type { ISearchResult } from '@/types'
import OpSearch from '@/Cpmponents/OpSearch.vue'
import { ref, computed } from 'vue'
import { fetchSearchData } from '@/api/search'
import { useToggle } from '@/use/useToggle'

interface IEmits {
  (e: 'cancel'): void
}
const emits = defineEmits<IEmits>()

const searchValue = ref('')
// 注意这里赋值也要做类型的断言
const searchResult = ref([] as ISearchResult[])
// 搜索的状态，有三种未搜索，正在搜索，已经搜索
const [INIT, DONE, DOING] = [-1, 0, 1]
const searchState = ref(INIT)
const onSearch = async (v?: string | number) => {
  try {
    // 因为这里用的是await，所以注意到，如果发生错误，后面不会执行
    searchState.value = DOING
    const { list } = await fetchSearchData(v as string)
    searchResult.value = list
  } finally {
    searchState.value = DONE
  }
}

// 这里是历史记录的变量
// 历史记录全部的值
const HISTORY_TAGS = [
  '比萨',
  '栗子',
  '切果NOW',
  '炒饭',
  '出前一丁',
  '玉米',
  '牛腩',
  '土豆焗饭',
  '烧烤',
  '水果'
]
// 使用useToggle来实现切换
const [isHistoryTagShown, toggleHistoryTag] = useToggle(false)
// 通过计算属性，计算显示全部的值还是部分的值
const historyTags = computed(() =>
  isHistoryTagShown.value ? HISTORY_TAGS : HISTORY_TAGS.slice(0, 5)
)
// 搜索历史纪录
const onTagClick = (v: string) => {
  searchValue.value = v
  onSearch(v)
}

// watch(
//   searchValue,
//   useDebounce((nv) => {
//     if (!nv) {
//       searchResult.value = []
//       return
//     }
//     onSearch(nv as string)
//   }, 1000)
// )
</script>

<template>
  <div class="search-view">
    <!-- 这里的cancel事件直接用了切换的事件 -->
    <!-- 这个是搜索框 -->
    <OpSearch
      show-action
      v-model:model-value="searchValue"
      shape="round"
      placeholder="搜索关键字"
      @search="onSearch"
      @cancel="emits('cancel')"
    ></OpSearch>

    <!-- 这部分内容是历史搜索 -->
    <div v-if="!searchValue" class="search-view__history">
      <div class="label">历史搜索</div>
      <!--    切换动画 -->
      <TransitionGroup name="list">
        <div class="history-tag" v-for="v in historyTags" :key="v" @click="onTagClick(v)">
          {{ v }}
        </div>
        <!-- 展开的向下箭头 -->
        <!-- <transition-group>是一个用于实现列表项过渡效果的组件。为了确保每个列表项在过渡时能够正确地识别和管理，key 属性是非常重要的。 -->
        <div class="history-tag" key="arrow" @click="toggleHistoryTag">
          <VanIcon v-if="isHistoryTagShown" name="arrow-up"></VanIcon>
          <VanIcon v-else name="arrow-down"></VanIcon>
        </div>
      </TransitionGroup>
    </div>

    <!-- 这个是搜索结果 -->
    <div v-else class="search-view__result">
      <!-- 正在搜索的展示 -->
      <div class="searching" v-if="searchState === DOING">~正在搜索~</div>
      <template v-if="searchState === DONE">
        <div class="result-item" v-for="v in searchResult" :key="v.label">
          <VanIcon name="search"></VanIcon>
          <div class="name">{{ v.label }}</div>
          <div class="count">约{{ v.resultCount }}个结果</div>
        </div>
        <!-- 没结果时的展示 -->
        <div class="no-result" v-if="!searchResult.length">~暂无推荐~</div>
      </template>
    </div>
  </div>
</template>
<style lang="scss">
.search-view {
  // 绝对定位，铺满整个屏幕
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  // z-index 是一个 CSS 属性，用于控制元素的堆叠顺序。
  // 它只对定位元素（即 position 属性值为 relative、absolute、fixed 或 sticky 的元素）有效。
  // z-index 的值可以是正数、负数或零，值越大，元素在堆叠上下文中的位置越靠上。
  z-index: 999;

  &__history {
    padding: var(--van-padding-sm);

    .label {
      margin-bottom: var(--van-padding-xs);
    }

    .history-tag {
      display: inline-block;
      font-size: 12px;
      border-radius: 10px;
      color: var(--van-gray-6);
      background: var(--van-gray-1);
      padding: 4px 8px;
      margin-right: 10px;
      margin-bottom: var(--van-padding-xs);
    }
  }

  &__result {
    .result-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      padding: 10px;
      border-radius: 1px solid var(--van-gray-1);

      .name {
        // 让文字把整个撑满
        flex: 1;
        padding: left 6px;
      }

      .count {
        font-size: 12px;
        color: var(--van-gray-6);
      }
    }

    .no-result,
    .searching {
      font-size: 12px;
      padding: 100px 0;
      text-align: center;
      color: var(--van-gray-6);
    }
  }
}

// 动画样式
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
