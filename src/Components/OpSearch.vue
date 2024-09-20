<!-- 基础组件-Search搜索框组件开发 -->
<script setup lang="ts">
// 组件功能中的属性在props里定义
interface IProps {
  showAction?: boolean
  background?: string
  placeholder?: string
  shape?: string
  modelValue?: string | number
}

const props = defineProps<IProps>()

// 定义事件
// 在Vue 3中，update:modelValue是v-model指令的默认事件，用于在组件内部通知父组件更新绑定的值。这种命名约定是固定的，当你在组件上使用v-model而没有指定参数时。
// 然而，Vue 3也提供了灵活性，允许开发者自定义绑定的属性和事件，以适应不同的场景和需求。
// 标准使用
// 当你在Vue组件上使用v-model时，默认情况下它绑定到组件的modelValue prop，并监听update:modelValue事件。这是Vue框架的标准命名约定。
// 这意味着，如果你在自定义组件内部需要接收输入并希望外部能够通过v-model与之双向绑定，你需要：
// 接收一个名为modelValue的prop。
// 在需要更新值时，触发名为update:modelValue的事件。

// 所以这里其他的事件需要父组件传入，而update:modelValue不需要
interface IEmits {
  (e: 'search', v?: string | number): void
  (e: 'cancel'): void
  (e: 'clear'): void
  (e: 'update:modelValue', v?: string | number): void
  (e: 'inputClick'): void
}
const emits = defineEmits<IEmits>()

//声明两个函数
const onKeypress = (e: KeyboardEvent) => {
  //回车键的code
  const ENTER_CODE = 13
  if (e.keyCode === ENTER_CODE) {
    e.preventDefault()
    emits('search', props.modelValue)
  }
}

const onClear = () => {
  emits('update:modelValue', '')
  emits('clear')
}
</script>

<template>
  <div class="op-search" :class="{ 'op-search--show-action': showAction }" :style="{ background }">
    <div class="op-search__content" :class="shape ? `op-search__content--${shape}` : ''">
      <div class="op-cell op-search__field">
        <div class="op-field__left-icon">
          <VanIcon name="search" />
        </div>
        <div class="op-cell__value">
          <div class="op-field__body">
            <input
              type="search"
              class="op-field__control"
              :value="modelValue"
              :placeholder="placeholder"
              @keypress="onKeypress"
              @input="(e) => emits('update:modelValue', (e.target as HTMLInputElement).value)"
              @click="emits('inputClick')"
            />
            <div v-if="$slots['right-icon']" class="op-field__right-icon">
              <slot name="right-icon"></slot>
            </div>
            <VanIcon v-else-if="modelValue" name="clear" class="op-field__clear" @click="onClear" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAction" class="op-search__action">
      <slot name="action">
        <div @click="emits('cancel')">取消</div>
      </slot>
    </div>
  </div>
</template>
<style lang="scss">
// 设置css变量
:root {
  --op-search-padding: 10px var(--van-padding-sm);
  --op-search-background-color: var(--van-background-color-light);
  --op-search-content-background: var(--van-gray-1);
  --op-search-left-icon-color: var(--van-gray-6);
  --op-search-action-padding: 0 var(--van-padding-xs);
  --op-search-action-text-color: var(--van-text-color);
  --op-search-action-font-size: var(--van-font-size-md);
  --op-search-input-height: 34px;
}

.op-search {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: var(--op-search-padding);
  background: var(--op-search-background-color);

  &--show-action {
    padding-right: 0;
  }

  &__content {
    display: flex;
    flex: 1;
    padding-left: var(--van-padding-sm);
    background: var(--op-search-content-background);
    border-radius: var(--van-border-radius-sm);

    &--round {
      border-radius: var(--van-radius-max);
    }
  }

  &__action {
    padding: var(--op-search-action-padding);
    color: var(--op-search-action-text-color);
    font-size: var(--op-search-action-font-size);
    line-height: var(--op-search-input-height);
    cursor: pointer;
    user-select: none;
  }

  &__field {
    flex: 1;
    padding: 5px var(--van-padding-xs) 5px 0;
    background-color: transparent;

    .op-field__left-icon {
      color: var(--op-search-left-icon-color);
      margin-right: var(--van-padding-base);

      .van-icon {
        font-size: var(--van-field-icon-size);
      }
    }
  }
}

.op-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  color: var(--van-cell-text-color);
  font-size: var(--van-cell-font-size);
  line-height: var(--van-cell-line-height);

  &__value {
    flex: 1;
    color: var(--van-cell-text-color);
    vertical-align: middle;
    word-wrap: break-word;
  }
}

.op-field {
  &__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
    color: var(--van-field-input-text-color);
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    resize: none;
    user-select: none;

    &::placeholder {
      color: var(--van-field-placeholder-text-color);
    }
  }

  &__body {
    display: flex;
    align-items: center;
  }

  &__right-icon {
    color: var(--van-field-right-icon-color);
    padding: 0 var(--van-padding-xs);
    line-height: inherit;
    flex-shrink: 0;
  }

  &__clear {
    color: var(--van-field-clear-icon-color);
    font-size: var(--van-field-clear-icon-size) !important;
    cursor: pointer;
  }
}

input {
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
}
</style>
