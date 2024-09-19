import type { Ref, UnwrapRef } from 'vue'
import { ref, watch, onUnmounted } from 'vue'

// 一个hooks函数必须要有ref这种改变页面的量
export function useDebounce<T>(value: Ref<T>, delay: number) {
  const debounceValue = ref(value.value)
  // timer可能是number或者null，初始值是null
  let timer: number | null = null

  const unwatch = watch(value, (nv) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      debounceValue.value = nv as UnwrapRef<T>
    }, delay)
  })

  // 钩子函数，组件销毁时
  onUnmounted(() => {
    unwatch()
  })

  return debounceValue
}
// interface IDebounceFn<T> {
//   (...args: T[]): void | Promise<void>
// }

// export function useDebounce<T>(fn: IDebounceFn<T>, delay: number) {
//   let timer: number | null = null
//   return function f(this: void, ...args: T[]) {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       fn.call(this, ...args)
//     }, delay)
//   }
// }
