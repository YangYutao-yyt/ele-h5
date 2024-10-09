import { cancelRAF, rAF } from '@/utils/raf'
import type { IPoint } from './index'
import { EventEmitter } from '../shared-utils/event'

export class Transition {
  hooks
  content!: HTMLElement
  style!: CSSStyleDeclaration
  pending!: boolean
  timer = 0

  constructor(content: HTMLElement) {
    // EventEmitter的实例
    this.hooks = new EventEmitter(['beforeTranslate', 'translate', 'move', 'end'])
    this.setContent(content)
  }

  private setContent(content: HTMLElement) {
    // 判断是否等于原本的content值
    if (content !== this.content) {
      this.content = content
      this.style = content.style as CSSStyleDeclaration
    }
  }
  private getComputedPosition() {
    const cssStyle = window.getComputedStyle(this.content, null) as CSSStyleDeclaration

    const _matrix = cssStyle['transform'].split(')')[0].split(', ')
    const x = +(_matrix[12] || _matrix[4]) || 0
    const y = +(_matrix[13] || _matrix[5]) || 0
    return { x, y }
  }
  private startStep() {
    const step = () => {
      const pos = this.getComputedPosition()
      this.hooks.emit(this.hooks.eventTypes.move, pos)

      if (this.pending) {
        this.timer = rAF(step)
      } else {
        this.hooks.emit(this.hooks.eventTypes.end, pos)
      }
    }

    cancelRAF(this.timer)
    step()
  }
  // 设置是否移动中，pending 为 true 则移动中
  setPending(pending: boolean) {
    this.pending = pending
  }
  // 设置动画曲线
  transitionTimingFunction(easing: string) {
    this.style['transitionTimingFunction'] = easing
  }
  // 设置持续时间
  transitionTime(time = 0) {
    this.style['transitionDuration'] = `${time}ms`
  }
  // 设置目标位置
  translate(point: IPoint) {
    const { x, y } = point
    this.hooks.emit(this.hooks.eventTypes.beforeTranslate, point)
    this.style['transform'] = `translate(${x}px, ${y}px)`
    this.hooks.emit(this.hooks.eventTypes.translate, point)
  }
  move(endPoint: IPoint, time: number, easingFn: string) {
    // 时间大于0,开始移动
    this.setPending(time > 0)
    // 设置动画的方法
    this.transitionTimingFunction(easingFn)
    this.transitionTime(time)
    this.translate(endPoint)
    // 在滚动过程中,我们需要得到滚动过程中点的位置
    // 每隔一段时间,输出坐标
    this.startStep()
  }
  // 停止运动
  doStop() {
    const pending = this.pending
    if (pending) {
      this.setPending(false)
      const { x, y } = this.getComputedPosition()
      this.transitionTime()
      this.translate({ x, y })
    }
  }
  destroy() {
    this.hooks.destroy()
    cancelRAF(this.timer)
  }
}
