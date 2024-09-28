import { getCurrentInstance, inject, onUnmounted, type InjectionKey } from 'vue'
import type { Child } from '@/use/useChildren'
// 传入数据
// 加上两个函数
export type ParentProvide = {
  link(instance: Child): void
  unlink(instance: Child): void
  [key: string]: any
}

export function useParent(key: InjectionKey<ParentProvide>) {
  const parent = inject(key, null)

  if (!parent) {
    return {
      parent: null
    }
  }

  const instance = getCurrentInstance()
  const { link, unlink } = parent
  link(instance)
  onUnmounted(() => unlink(instance))

  return {
    parent
  }
}
