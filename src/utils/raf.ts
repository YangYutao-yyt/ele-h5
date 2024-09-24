// 这里使用requestAnimationFrame的api
export const rAF =
  requestAnimationFrame ||
  function (callback) {
    setTimeout(callback, 1000 / 60)
  }

export const cancelRAF =
  cancelAnimationFrame ||
  function (id: number) {
    clearTimeout(id)
  }
// rAF 是一个跨浏览器的解决方案，用于在动画中调用回调函数。
// 如果浏览器支持 requestAnimationFrame，则使用它来优化动画性能；
// 如果不支持，则使用 setTimeout 作为替代方案，以确保代码在所有环境中都能正常工作。
