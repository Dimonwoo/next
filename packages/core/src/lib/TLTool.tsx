/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { TLApp, TLShape } from '~lib'
import type { TLEventMap, TLStateEvents } from '~types'
import { TLState } from './TLState'

export interface TLToolConstructor<
  S extends TLShape = TLShape,
  K extends TLEventMap = TLEventMap,
  R extends TLApp<S, K> = TLApp<S, K>
> {
  new (parent: R, app: R): TLTool<S, K, R>
  id: string
}

export abstract class TLTool<
  S extends TLShape = TLShape,
  K extends TLEventMap = TLEventMap,
  R extends TLApp<S, K> = TLApp<S, K>
> extends TLState<S, K, R, R> {
  get app() {
    return this.root
  }

  onEnter = () => {
    if (this.cursor) this.app.cursors.setCursor(this.cursor)
  }

  onTransition: TLStateEvents<S, K>['onTransition'] = info => {
    const { toId } = info
    const toState = this.children.get(toId)!
    this.app.cursors.reset()
    if (toState.cursor) {
      this.app.cursors.setCursor(toState.cursor)
    } else if (this.cursor) {
      if (this.cursor) this.app.cursors.setCursor(this.cursor)
    }
  }
}
