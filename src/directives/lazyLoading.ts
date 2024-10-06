import type { App, DirectiveBinding } from 'vue'

// 传入IntersectionObserver参数
const vLazy = (observer: IntersectionObserver) => {
  return {
    beforeMount: (el: HTMLImageElement, binding: DirectiveBinding) => {
      el.classList.add('op-lazyload')
      const { value } = binding
      // <img data-origin=""/>
      el.dataset.origin = value
      observer.observe(el)
    }
  }
}

// 写懒加载插件
const lazyPlugin = {
  install(app: App) {
    const observer = new IntersectionObserver(
      (entries) => {
        // 这里的item就是vLazy中observe的el
        entries.forEach((item) => {
          // 判断是否相交
          if (item.isIntersecting) {
            // 开始加载图片，把data-origin的值放到src
            // 先拿到图片标签
            const el = item.target as HTMLImageElement
            el.src = el.dataset.origin as string
            // 将懒加载的样式去掉
            el.classList.remove('op-lazyload')
            // 停止监听
            observer.unobserve(el)
          }
        })
      },
      {
        // 当图片拉到可视区域的-100px的时候,才开始派发事件
        rootMargin: '0px 0px -100px 0px'
      }
    )
    // 注册v-lazy
    app.directive('lazy', vLazy(observer))
  }
}

export default lazyPlugin
