type Fn = (...args: any[]) => void

interface Events {
  // key是string，value是函数的数组
  [name: string]: Fn[]
}

export class EventEmitter {
  // 存有多少种事件
  events: Events
  constructor() {
    this.events = {}
  }
  // 监听事件
  on(type: string, fn: Fn) {
    if (!this.events[type]) {
      this.events[type] = []
    }

    this.events[type].push(fn)
  }

  off(type?: string, fn?: Fn) {
    // 都没传
    if (!type && !fn) {
      this.events = {}
      return this
    }
    if (type) {
      if (!fn) {
        this.events[type] = []
        return this
      }
      const events = this.events[type]
      if (!events) {
        return this
      }
      let count = events.length
      while (count--) {
        if (events[count] === fn) {
          events.splice(count, 1)
        }
      }

      return this
    }
  }

  emit(type: string, ...args: any[]) {
    const events = this.events[type]
    if (!events) {
      return
    }
    let ret
    for (let i = 0; i < events.length; i++) {
      const fn = events[i]
      if (fn) {
        // arg是给回调函数用的参数
        ret = fn.apply(this, args) as unknown
        // 如果返回true说明完成了,直接return后面不执行
        if (ret === true) {
          return ret
        }
      }
    }
  }

  destroy() {
    this.events = {}
  }
}
