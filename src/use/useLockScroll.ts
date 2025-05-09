import { onDeactivated, onBeforeUnmount, watch } from 'vue'
import { onMountedOrActivated } from './onMountedOrActivated'

let totalLockCount = 0

const BODY_LOCK_CLASS = 'op-overflow-hidden'

// 参数是个方法,是否允许去滚动
export function useLockScroll(shouldLock: () => boolean) {
  // 静止滚动
  const lock = () => {
    if (!totalLockCount) {
      // 给body增加样式
      document.body.classList.add(BODY_LOCK_CLASS)
    }
    totalLockCount++
  }
  const unlock = () => {
    if (totalLockCount) {
      totalLockCount--
      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS)
      }
    }
  }

  onMountedOrActivated(() => {
    if (shouldLock()) {
      lock()
    }
  })
  const destroy = () => shouldLock() && unlock()
  onDeactivated(() => destroy)
  onBeforeUnmount(() => destroy)
  watch(shouldLock, (v) => {
    if (v) {
      lock()
    } else {
      unlock()
    }
  })
}
