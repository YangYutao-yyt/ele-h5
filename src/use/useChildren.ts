import { provide, shallowReactive, type ComponentInternalInstance, type InjectionKey } from 'vue'
import type { ParentProvide } from '@/use/useParent'
// 通过key找到想要的子组件

export type NotNullChild = ComponentInternalInstance & Record<string, any>
export type Child = NotNullChild | null

export function useChildren<T>(key: InjectionKey<ParentProvide>) {
  const children = shallowReactive<Child[]>([])

  const linkChildren = (value?: T) => {
    const link = (child: Child) => {
      children.push(child)
    }

    const unlink = (child: Child) => {
      const index = children.indexOf(child)
      children.splice(index, 1)
    }

    provide(key, {
      link,
      unlink,
      ...value
    })
  }

  return {
    children,
    linkChildren
  }
}
