/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Vec } from '@tldraw/vec'
import { TLApp, TLSelectTool, TLShape, TLShapeWithHandles, TLToolState } from '~lib'
import { TLBounds, TLCursor, TLEventMap, TLEvents, TLHandle } from '~types'
import { BoundsUtils, deepCopy, GeomUtils } from '~utils'

export class RotatingState<
  S extends TLShape,
  K extends TLEventMap,
  R extends TLApp<S, K>,
  P extends TLSelectTool<S, K, R>
> extends TLToolState<S, K, R, P> {
  static id = 'rotating'
  cursor = TLCursor.Grabbing

  snapshot: Record<
    string,
    {
      point: number[]
      center: number[]
      rotation?: number
      handles?: TLHandle[]
    }
  > = {}

  initialCommonCenter = [0, 0]
  initialCommonBounds = {} as TLBounds
  initialAngle = 0

  onEnter = () => {
    const { history, selectedShapesArray, selectedBounds } = this.app

    if (!selectedBounds) throw Error('Expected selected bounds.')

    history.pause()
    this.initialCommonBounds = { ...selectedBounds }
    this.initialCommonCenter = BoundsUtils.getBoundsCenter(selectedBounds)
    this.initialAngle = Vec.angle(this.initialCommonCenter, this.app.inputs.currentPoint)
    this.snapshot = Object.fromEntries(
      selectedShapesArray.map((shape) => [
        shape.id,
        {
          point: [...shape.point],
          center: [...shape.center],
          rotation: shape.rotation,
          handles: 'handles' in shape ? deepCopy((shape as any).handles) : undefined,
        },
      ])
    )
  }

  onExit = () => {
    this.app.history.resume()
    this.snapshot = {}
  }

  onWheel: TLEvents<S>['wheel'] = (info, e) => {
    this.onPointerMove(info, e)
  }

  onPointerMove: TLEvents<S>['pointer'] = () => {
    const {
      selectedShapes,
      inputs: { shiftKey, currentPoint },
    } = this.app

    const { snapshot, initialCommonCenter, initialAngle } = this

    const currentAngle = Vec.angle(initialCommonCenter, currentPoint)

    let angleDelta = currentAngle - initialAngle

    if (shiftKey) {
      angleDelta = GeomUtils.snapAngleToSegments(angleDelta, 24)
    }

    selectedShapes.forEach((shape) => {
      const initialShape = snapshot[shape.id]

      let initialAngle = 0

      if (shiftKey) {
        const { rotation = 0 } = initialShape
        initialAngle = GeomUtils.snapAngleToSegments(rotation, 24) - rotation
      }

      const relativeCenter = Vec.sub(initialShape.center, initialShape.point)
      const rotatedCenter = Vec.rotWith(initialShape.center, initialCommonCenter, angleDelta)

      if ('handles' in shape) {
        // Don't rotate shapes with handles; instead, rotate the handles
        const initialHandles = (initialShape as unknown as TLShapeWithHandles).handles
        const handlePoints = initialHandles!.map((handle) =>
          Vec.rotWith(handle.point, relativeCenter, angleDelta)
        )
        const topLeft = BoundsUtils.getCommonTopLeft(handlePoints)
        shape.update({
          point: Vec.add(topLeft, Vec.sub(rotatedCenter, relativeCenter)),
          handles: initialHandles.map((h, i) => ({
            ...h,
            point: Vec.sub(handlePoints[i], topLeft),
          })),
        })
      } else {
        shape.update({
          point: Vec.sub(rotatedCenter, relativeCenter),
          rotation: (initialShape.rotation || 0) + angleDelta + initialAngle,
        })
      }
    })

    const rotation = this.app.selectedBounds!.rotation
    this.app.cursors.setCursor(TLCursor.Grabbing, rotation)
  }

  onPointerUp: TLEvents<S>['pointer'] = () => {
    this.app.history.resume()
    this.app.persist()
    this.tool.transition('idle')
  }

  onKeyDown: TLEvents<S>['keyboard'] = (info, e) => {
    switch (e.key) {
      case 'Escape': {
        this.app.selectedShapes.forEach((shape) => {
          shape.update(this.snapshot[shape.id])
        })
        this.tool.transition('idle')
        break
      }
    }
  }
}