<!-- 基础组件，用于实现加载页面 -->
<script setup lang="ts">
interface IProps {
  loading: boolean
  type: 'loading' | 'skeleton'
}
defineProps<IProps>()
</script>

<template>
  <!-- 加载中 -->
  <!-- 注意这里有两种slot,当加载好了直接显示slot内容,当加载中会调用name为template的slot -->
  <div v-if="loading" class="op-loading-view">
    <slot name="template">
      <div v-if="type === 'loading'" class="loading-wrapper">
        <VanLoading />
      </div>
      <div v-if="type === 'skeleton'" class="skeleton-wrapper">
        <VanSkeleton :row="10" />
        <VanSkeleton title avatar :row="5" />
        <VanSkeleton title :row="5" />
      </div>
    </slot>
  </div>
  <!-- 没有加载 -->
  <slot v-else></slot>
</template>

<style lang="scss" scoped>
.op-loading-view {
  background-color: white;

  .loading-wrapper {
    display: flex;
    // 水平居中+垂直居中
    justify-content: center;
    align-items: center;
    height: 100px;
  }

  .skeleton-wrapper {
    padding: 20px 10px;
  }
}
</style>
