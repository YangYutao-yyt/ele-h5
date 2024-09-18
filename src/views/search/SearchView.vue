<script setup lang="ts">
interface IEmits {
  (e: 'cancel'): void
}
const emits = defineEmits<IEmits>()
</script>

<template>
  <div class="search-view" @click="emits('cancel')">搜索页</div>
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
}
</style>
