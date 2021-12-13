import type { TLShape } from '../TLShape'
import { AppNode } from './nodes/AppNode'
import type { TLToolNodeConstructor } from './nodes/ToolNode'
import type { TLShortcut, TLStateEvents } from './nodes/shared'
import type { TLSerializedApp } from '../TLApp'
import type { TLShapeClass } from '~types'

class FinalApp<S extends TLShape = TLShape> extends AppNode<S> {
  constructor(
    options = {} as {
      id?: string
      serializedApp?: TLSerializedApp
      shapeClasses?: TLShapeClass<S>[]
      tools?: TLToolNodeConstructor<S>[]
    }
  ) {
    super({
      id: options.id || 'app',
      initial: 'idle',
      states: [],
      shortcuts: [
        // { keys: 'mod+shift+g', fn: () => this.toggleGrid() },
        // { keys: 'shift+0', fn: () => this.resetZoom() },
        // { keys: 'mod+-', fn: () => this.zoomToSelection() },
        // { keys: 'mod+-', fn: () => this.zoomOut() },
        // { keys: 'mod+=', fn: () => this.zoomIn() },
        // {
        //   keys: 'mod+s',
        //   fn: () => {
        //     this.save()
        //     this.notify('save', null)
        //   },
        // },
        // {
        //   keys: 'mod+shift+s',
        //   fn: () => {
        //     this.saveAs()
        //     this.notify('saveAs', null)
        //   },
        // },
      ],
    })
  }
}