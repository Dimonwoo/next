import { Vec } from '@tldraw/vec'
import type { TLNuShape, TLNuApp, TLNuBoxShape, TLNuBoxTool } from '~nu-lib'
import { TLNuToolState } from '~nu-lib'
import type { TLNuPointerHandler } from '~types'

export class PointingState<
  S extends TLNuShape,
  T extends S & TLNuBoxShape,
  R extends TLNuApp<S>,
  P extends TLNuBoxTool<T, S, R>
> extends TLNuToolState<S, R, P> {
  static id = 'pointing'

  onPointerMove: TLNuPointerHandler = () => {
    const { currentPoint, originPoint } = this.app.inputs
    if (Vec.dist(currentPoint, originPoint) > 5) {
      this.tool.transition('creating')
      this.app.deselectAll()
    }
  }
}
