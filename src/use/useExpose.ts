// 参数是一些暴露的方法
// 在 TypeScript 中，Record 是一个内置的泛型工具类型，
// 用于构造一个对象类型，其属性键和值的类型都是由用户指定的

import { getCurrentInstance } from 'vue'
import { extend } from '@/utils/basic'
// K：表示属性键的类型，可以是字符串字面量类型、数字字面量类型或联合类型。
// T：表示属性值的类型。
export function useExpose<T = Record<string, any>>(apis: T) {
  // 获取当前组件的实例
  const instance = getCurrentInstance()

  if (instance) {
    // 写一个方法将apis方法挂载到实例上
    extend(instance, apis)
  }
}
