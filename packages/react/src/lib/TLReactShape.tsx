import { TLShape } from '@tldraw/core'

export interface TLCommonShapeProps<M = unknown> {
  meta: M
  isEditing: boolean
  isBinding: boolean
  isHovered: boolean
  isSelected: boolean
  isErasing: boolean
}

export type TLIndicatorProps<M = unknown> = TLCommonShapeProps<M>

export interface TLComponentProps<M = unknown> extends TLCommonShapeProps<M> {
  events: {
    onPointerMove: React.PointerEventHandler
    onPointerDown: React.PointerEventHandler
    onPointerUp: React.PointerEventHandler
    onPointerEnter: React.PointerEventHandler
    onPointerLeave: React.PointerEventHandler
    onKeyUp: React.KeyboardEventHandler
    onKeyDown: React.KeyboardEventHandler
  }
}

export interface TLReactShapeClass<S extends TLReactShape = TLReactShape> {
  new (props: any): S
  id: string
}

export abstract class TLReactShape<P = any, M = any> extends TLShape<P, M> {
  abstract Component: (props: TLComponentProps<M>) => JSX.Element | null
  abstract Indicator: (props: TLIndicatorProps<M>) => JSX.Element | null
}