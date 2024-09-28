import { isRef, onDeactivated, onUnmounted, unref, watch, type Ref } from 'vue'
import { onMountedOrActivated } from '@/use/onMountedOrActivated'

type TargetRef = EventTarget | Ref<EventTarget>

export type UseEventListenerOptions = {
  target?: TargetRef
  capture?: boolean
  passive?: boolean
}
// 函数重载，有两种类型，都可以调，OpSwipe里就是调这种方式
export function useEventListener<K extends keyof DocumentEventMap>(
  type: K,
  listener: (event: DocumentEventMap[K]) => void,
  options?: UseEventListenerOptions
): void

// K 是 DocumentEventMap类型的key的值（几种）
export function useEventListener(
  type: string,
  listener: EventListener,
  options: UseEventListenerOptions = {}
) {
  const { target = window, passive = false, capture = false } = options
  const add = (target: TargetRef) => {
    // 获取dom
    const element = unref(target)
    if (element) {
      element.addEventListener(type, listener, {
        passive,
        capture
      })
    }
  }

  const remove = (target: TargetRef) => {
    const element = unref(target)
    if (element) {
      element.removeEventListener(type, listener, capture)
    }
  }
  // 这里的target是Opswipe中的track
  onMountedOrActivated(() => add(target))
  onUnmounted(() => remove(target))
  onDeactivated(() => remove(target))

  if (isRef(target)) {
    watch(target, (val: TargetRef, oldVal: TargetRef) => {
      remove(oldVal)
      add(val)
    })
  }
}
