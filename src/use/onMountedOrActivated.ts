import { nextTick, onActivated, onMounted } from 'vue'

export function onMountedOrActivated(hook: () => void) {
  let mounted: boolean
  onMounted(() => {
    hook()
    // nextTick 是 Vue.js 中的一个方法，用于在下次 DOM 更新循环结束之后执行延迟回调。
    // 在 Vue 中，当你修改数据时，Vue 并不会立即更新 DOM，而是将这些更新异步地批处理，以提高性能。
    // nextTick 允许你在数据变化后，等待 DOM 更新完成，然后执行某些操作。
    nextTick(() => {
      mounted = true
    })
  })
  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}
