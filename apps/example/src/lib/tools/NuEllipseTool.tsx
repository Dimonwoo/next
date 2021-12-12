import { TLBoxTool } from '@tldraw/box-tool'
import { NuEllipseShape, Shape, NuApp } from '~lib'

export class NuEllipseTool extends TLBoxTool<NuEllipseShape, Shape, NuApp> {
  static id = 'ellipse'
  static shortcut = ['o']
  shapeClass = NuEllipseShape
}