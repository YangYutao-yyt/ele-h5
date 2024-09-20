import { ref, type UnwrapRef } from 'vue'

export function useAsync<T>(asyncFn: () => Promise<T>, initValue: T, immediate = true) {
  // 三个参数，第一个是async函数，第二个是初始值，第三个代表是否立刻执行函数

  // 请求状态，是否在请求中
  const pending = ref(false)

  //data代表返回的数据
  const data = ref(initValue)
  // error捕获请求失败的错误信息
  const error = ref(null)

  const execute = function () {
    // 在请求中
    pending.value = true
    error.value = null
    // 返回请求处理的async函数
    return asyncFn()
      .then((res) => {
        data.value = res as UnwrapRef<T>
        pending.value = false
      })
      .catch((err) => {
        error.value = err
        pending.value = false
      })
  }

  if (immediate) {
    execute()
  }
  return {
    pending,
    data,
    error,
    execute
  }
}
