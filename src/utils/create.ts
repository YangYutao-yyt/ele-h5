// bem命名规则函数
export function createBEM(name: string) {
  // mods?: Record<string, boolean>：
  // 表示修饰符（Modifier），是一个对象，键是修饰符的名称，值是布尔值，指示该修饰符是否应用。
  return (el?: string, mods?: Record<string, boolean>) => {
    let result = `${name}${el ? `__${el}` : ''}`

    if (mods) {
      //获取 mods 对象中所有值为 true 的修饰符名称。
      const modsStr = Object.keys(mods)
        .filter((mod) => mods[mod])
        .map((mod) => `${result}--${mod}`)
        .join('')
      result += modsStr
    }
    return result
  }
}

// name是加上特殊前缀 bem是css类的命名规范
export function createNamespace(name: string) {
  const prefixedName = `op-${name}`

  return [prefixedName, createBEM(prefixedName)] as const
}
