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

// doubleRaf 是一个函数，它的作用是确保传入的回调函数 fn 在浏览器的下一个两个重绘帧
// （repaint frames）中执行。这种做法通常用于优化动画或视觉效果的性能，
// 确保在浏览器的渲染周期中以更平滑的方式更新界面。
export const doubleRaf = (fn: () => void) => {
  // 这意味着 fn 函数将在下一个重绘帧的两次调用中执行，
  // 从而确保它在两个连续的帧中被调用。
  rAF(() => rAF(fn))
}
