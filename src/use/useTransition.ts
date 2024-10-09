import { ref } from 'vue'
import { useTimeout } from '@/use/useTimeout'
import { useLifeHook } from './useLifeHook'

interface IEnterItem {
  isShown: boolean
  el: HTMLElement
}
// 10是默认值，一次动画弹出的不超过10个
export function useTransition(count = 10) {
  const { onUnmounted } = useLifeHook()
  const createItems = (_count: number) => {
    const result = []
    for (let i = 0; i < _count; i++) {
      result.push({
        isShown: false,
        el: {} as HTMLElement
      })
    }
    return result
  }
  // 初始化
  const items = ref(createItems(count))
  // 一共有10个球备用，当点击时，找到备用的没有展示的小球，加入这里
  const enteredItems = [] as IEnterItem[]
  // 初始化
  const start = (el: HTMLElement) => {
    // 没有展示
    const item = items.value.find((v) => !v.isShown)
    if (item) {
      item.isShown = true
      item.el = el
      enteredItems.push(item)
    }
  }

  // 初始化的效果
  const beforeEnter = (el: Element) => {
    // 获取新加入的最后一个小球
    const item = enteredItems[enteredItems.length - 1]
    const rect = item.el.getBoundingClientRect()
    const x = rect.left - 32
    const y = -(window.innerHeight - rect.top - 22)
    ;(el as HTMLElement).style.display = ''
    ;(el as HTMLElement).style.transform = `translate3d(0, ${y}px, 0)`
    const inner = el.getElementsByClassName('inner')[0] as HTMLElement
    if (inner) {
      inner.style.transform = `translate3d(${x}px, 0, 0)`
    }
  }

  const enter = (el: Element, done: () => void) => {
    // 监听如果动画结束了，就调用done回调
    el.addEventListener('transitionend', done)
    useTimeout(
      () => {
        // 还原
        ;(el as HTMLElement).style.transform = `translate3d(0, 0, 0)`
        const inner = el.getElementsByClassName('inner')[0] as HTMLElement
        if (inner) {
          inner.style.transform = `translate3d(0, 0, 0)`
        }
      },
      undefined,
      onUnmounted
    )
  }

  // 动画结束了，将小球隐藏掉
  const afterEnter = (el: Element) => {
    const item = enteredItems.shift()
    if (item) {
      item.isShown = false
      ;(el as HTMLElement).style.display = 'none'
    }
  }

  return {
    items,
    start,
    beforeEnter,
    enter,
    afterEnter
  }
}
