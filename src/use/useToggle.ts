import { ref } from 'vue'
import type { Ref } from 'vue'

// 搜索页展示切换
export function useToggle(initstate: boolean): [Ref<boolean>, () => void] {
  const state = ref(initstate)
  const toggle = function () {
    state.value = !state.value
  }
  return [state, toggle]
}
