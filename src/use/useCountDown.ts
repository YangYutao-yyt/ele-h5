import { computed, ref } from 'vue'
import { rAF, cancelRAF } from '@/utils/raf'
type CurrentTime = {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  total: number
}

type UseCountDownOptions = {
  // 倒计时多久
  time: number
  // 是否是毫秒级
  millisecond?: boolean
  onChange?: (current: CurrentTime) => void
  onFinish?: () => void
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const parseTime = (time: number) => {
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const milliseconds = Math.floor(time % SECOND)

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    total: time
  }
}
// 判断是否在同一秒
const isSameSecond = (time1: number, time2: number) => {
  return Math.floor(time1 / SECOND) === Math.floor(time2 / SECOND)
}

export function useCountDown(options: UseCountDownOptions) {
  let rafId: number
  // 倒计时多久
  const remain = ref(options.time)
  // 是否正在计时中
  let counting: boolean
  // 结束时间戳
  let endTime: number
  // 当前时间
  const current = computed(() => parseTime(remain.value))

  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0)

  // pause方法
  const pause = () => {
    counting = false
    cancelRAF(rafId)
  }

  const setRemain = (value: number) => {
    remain.value = value
    options.onChange?.(current.value)

    // 如果倒计时为0
    if (value === 0) {
      pause()
      options.onFinish?.()
    }
  }
  const microTick = () => {
    // 毫秒级别
    rafId = rAF(() => {
      if (counting) {
        const remainRemain = getCurrentRemain()
        setRemain(remainRemain)

        if (remain.value > 0) {
          microTick()
        }
      }
    })
  }

  const macroTick = () => {
    // 非毫秒级别
    rafId = rAF(() => {
      if (counting) {
        const remainRemain = getCurrentRemain()
        if (!isSameSecond(remainRemain, remain.value) || remainRemain) {
          setRemain(remainRemain)
        }

        if (remain.value > 0) {
          macroTick()
        }
      }
    })
  }
  const tick = () => {
    // 判断是否调用毫秒级别的
    if (options.millisecond) {
      microTick()
    } else {
      macroTick()
    }
  }
  const start = () => {
    // 如果没有在计时的时候
    if (!counting) {
      // 结束时间=当前时间+计时时间
      endTime = Date.now() + remain.value
      // 开始计时
      counting = true
      tick()
    }
  }
  // 重置
  const reset = (totalTime = options.time) => {
    pause()
    remain.value = totalTime
  }

  // 返回三个方法加上一个变量
  return {
    start,
    pause,
    reset,
    current
  }
}
