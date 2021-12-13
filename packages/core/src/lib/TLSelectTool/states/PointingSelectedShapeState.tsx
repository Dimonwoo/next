import { Vec } from '@tldraw/vec'
import { TLApp, TLSelectTool, TLToolState, TLShape } from '~lib'
import type { TLEventMap, TLEvents } from '~types'

export class PointingSelectedShapeState<
  S extends TLShape,
  K extends TLEventMap,
  R extends TLApp<S, K>,
  P extends TLSelectTool<S, K, R>
> extends TLToolState<S, K, R, P> {
  static id = 'pointingSelectedShape'

  private pointedSelectedShape?: TLShape

  onEnter = (info: { target: TLShape }) => {
    this.pointedSelectedShape = info.target
  }

  onExit = () => (this.pointedSelectedShape = undefined)

  onWheel: TLEvents<S>['wheel'] = (info, e) => {
    this.onPointerMove(info, e)
  }

  onPointerMove: TLEvents<S>['pointer'] = () => {
    const { currentPoint, originPoint } = this.app.inputs
    if (Vec.dist(currentPoint, originPoint) > 5) {
      this.tool.transition('translating')
    }
  }

  onPointerUp: TLEvents<S>['pointer'] = () => {
    const { shiftKey } = this.app.inputs

    if (!this.pointedSelectedShape) throw Error('Expected a pointed selected shape')
    if (shiftKey) {
      this.app.deselect(this.pointedSelectedShape.id)
    } else {
      this.app.select(this.pointedSelectedShape.id)
    }
    this.tool.transition('idle')
  }

  onPinchStart: TLEvents<S>['pinch'] = (info, event) => {
    this.tool.transition('pinching', { info, event })
  }
}
