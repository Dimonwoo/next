import { Vec } from '@tldraw/vec'
import type { TLLineTool } from '../TLLineTool'
import type { TLLineShape } from '@tldraw/line-shape'
import { TLShape, TLApp, TLToolState, TLEventMap, TLStateEvents } from '@tldraw/core'

export class PointingState<
  S extends TLShape,
  T extends S & TLLineShape,
  K extends TLEventMap,
  R extends TLApp<S, K>,
  P extends TLLineTool<T, S, K, R>
> extends TLToolState<S, K, R, P> {
  static id = 'pointing'

  onPointerMove: TLStateEvents<S, K>['onPointerMove'] = () => {
    const { currentPoint, originPoint } = this.app.inputs
    if (Vec.dist(currentPoint, originPoint) > 5) {
      this.tool.transition('creating')
      this.app.setSelectedShapes(this.app.currentPage.shapes)
    }
  }
}