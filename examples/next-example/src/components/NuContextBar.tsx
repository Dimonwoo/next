import * as React from 'react'
import { BoundsUtils, HTMLContainer, TLContextBarComponent } from '@tldraw/next'
import { observer } from 'mobx-react-lite'
import { useAppContext } from 'context'
import type { NuStarShape, NuPolygonShape, Shape } from 'stores'

const _NuContextBar: TLContextBarComponent<Shape> = ({
  shapes,
  offset,
  scaledBounds,
  // rotation,
}) => {
  const rContextBar = React.useRef<HTMLDivElement>(null)

  // const rotatedBounds = BoundsUtils.getRotatedBounds(scaledBounds, rotation)

  const app = useAppContext()

  const updateStroke = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    shapes.forEach((shape) => shape.update({ stroke: e.currentTarget.value }))
  }, [])

  const updateFill = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    shapes.forEach((shape) => shape.update({ fill: e.currentTarget.value }))
  }, [])

  const updateStrokeWidth = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    shapes.forEach((shape) => shape.update({ strokeWidth: +e.currentTarget.value }))
  }, [])

  const updateSides = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    shapes.forEach((shape) => shape.update({ sides: +e.currentTarget.value }))
  }, [])

  const updatePoints = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    shapes.forEach((shape) => shape.update({ points: +e.currentTarget.value }))
  }, [])

  const updateRatio = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    shapes.forEach((shape) => shape.update({ ratio: +e.currentTarget.value }))
  }, [])

  React.useLayoutEffect(() => {
    const elm = rContextBar.current
    if (!elm) return
    const { offsetWidth, offsetHeight } = elm
    const [x, y] = BoundsUtils.getContextBarTranslation([offsetWidth, offsetHeight], offset)
    elm.style.setProperty('transform', `translateX(${x}px) translateY(${y}px)`)
  }, [scaledBounds, offset])

  if (!app) return null

  const starShapes = shapes.filter((shape) => shape.type === 'star') as NuStarShape[]

  const polygonShapes = shapes.filter((shape) => shape.type === 'polygon') as NuPolygonShape[]

  const ratioShapes = shapes.filter((shape) => 'ratio' in shape) as (NuPolygonShape | NuStarShape)[]

  return (
    <HTMLContainer centered>
      <div
        ref={rContextBar}
        className="contextbar"
        style={{
          pointerEvents: 'all',
          position: 'relative',
          backgroundColor: 'white',
          padding: '8px 12px',
          borderRadius: '8px',
          whiteSpace: 'nowrap',
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          fontSize: 14,
          willChange: 'transform',
          boxShadow: 'var(--nu-shadow-elevation-medium)',
        }}
      >
        Stroke
        <input type="color" onChange={updateStroke} />
        Fill
        <input type="color" onChange={updateFill} />
        Width
        <input
          type="number"
          value={Math.max(...shapes.map((shape) => shape.strokeWidth))}
          onChange={updateStrokeWidth}
          style={{ width: 48 }}
        />
        {polygonShapes.length > 0 && (
          <>
            Sides
            <input
              type="number"
              value={Math.max(...polygonShapes.map((shape) => shape.sides))}
              onChange={updateSides}
              style={{ width: 40 }}
            />
          </>
        )}
        {starShapes.length > 0 && (
          <>
            Points
            <input
              type="number"
              value={Math.max(...starShapes.map((shape) => shape.points))}
              onChange={updatePoints}
              style={{ width: 40 }}
            />
          </>
        )}
        {ratioShapes.length > 0 && (
          <>
            Ratio
            <input
              type="number"
              value={Math.max(...ratioShapes.map((shape) => shape.ratio))}
              onChange={updateRatio}
              step={0.1}
              min={0}
              max={2}
              style={{ width: 40 }}
            />
          </>
        )}
      </div>
    </HTMLContainer>
  )
}

export const NuContextBar = observer(_NuContextBar)
