import { ref } from 'vue'

const getDirection = (x: number, y: number) => {
  if (x > y) {
    return 'horizontal'
  }
  if (y > x) {
    return 'vertical'
  }
  return ''
}

export function useTouch() {
  const startX = ref(0)
  const startY = ref(0)
  const deltaX = ref(0)
  const deltaY = ref(0)
  const offsetX = ref(0)
  const offsetY = ref(0)
  const direction = ref('')
  const isVertical = () => direction.value === 'vertical'
  const isHorizontal = () => direction.value === 'horizontal'

  const reset = () => {
    deltaX.value = 0
    deltaY.value = 0
    offsetX.value = 0
    offsetY.value = 0
  }

  const start = (event: TouchEvent) => {
    reset()
    startX.value = event.touches[0].clientX
    startY.value = event.touches[0].clientY
  }

  const move = (event: TouchEvent) => {
    const touch = event.touches[0]
    // 这里就是确保 touch.clientX 的值大于等于 0，Safari 浏览器有时会返回负数，这应该是错的，所以这里就做个兜底
    deltaX.value = (touch.clientX < 0 ? 0 : touch.clientX) - startX.value
    deltaY.value = touch.clientY - startY.value

    offsetX.value = Math.abs(deltaX.value)
    offsetY.value = Math.abs(deltaY.value)
    // 设置最小的移动距离，防止误触
    const LOCK_DIRECTION_DISTANCE = 10
    if (
      !direction.value ||
      (offsetX.value < LOCK_DIRECTION_DISTANCE && offsetY.value < LOCK_DIRECTION_DISTANCE)
    ) {
      direction.value = getDirection(offsetX.value, offsetY.value)
    }
  }

  return {
    move,
    start,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    // deltaX的绝对值
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal
  }
}
