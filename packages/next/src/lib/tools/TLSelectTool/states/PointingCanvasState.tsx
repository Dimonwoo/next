import { Vec } from '@tldraw/vec'
import { TLApp, TLSelectTool, TLShape, TLToolState } from '~lib'
import type { TLPinchHandler, TLPointerHandler, TLWheelHandler } from '~types'

export class PointingCanvasState<
  S extends TLShape,
  R extends TLApp<S>,
  P extends TLSelectTool<S, R>
> extends TLToolState<S, R, P> {
  static id = 'pointingCanvas'

  onEnter = () => {
    const { shiftKey } = this.app.inputs
    if (!shiftKey) this.app.deselectAll()
  }

  onWheel: TLWheelHandler<S> = (info, gesture, e) => {
    this.onPointerMove(info, e)
  }

  onPointerMove: TLPointerHandler<S> = () => {
    const { currentPoint, originPoint } = this.app.inputs
    if (Vec.dist(currentPoint, originPoint) > 5) {
      this.tool.transition('brushing')
    }
  }

  onPointerUp: TLPointerHandler<S> = () => {
    if (!this.app.inputs.shiftKey) {
      this.app.deselectAll()
    }
    this.tool.transition('idle')
  }

  onPinchStart: TLPinchHandler<S> = (info, gesture, event) => {
    this.tool.transition('pinching', { info, gesture, event })
  }
}