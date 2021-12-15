/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import type { Shape } from '~lib'
import { useApp } from '@tldraw/react'

export const NuToolBar = observer(function ToolBar(): JSX.Element {
  const app = useApp<Shape>()

  const handleToolClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const tool = e.currentTarget.dataset.tool
      if (tool) app.selectTool(tool)
    },
    [app]
  )

  const handleToolDoubleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const tool = e.currentTarget.dataset.tool
      if (tool) app.selectTool(tool)
      app.settings.update({ isToolLocked: true })
    },
    [app]
  )

  const handleToolLockClick = React.useCallback(() => {
    app.settings.update({ isToolLocked: !app.settings.isToolLocked })
  }, [app])

  const zoomIn = React.useCallback(() => {
    app.api.zoomIn()
  }, [app])

  const zoomOut = React.useCallback(() => {
    app.api.zoomOut()
  }, [app])

  const resetZoom = React.useCallback(() => {
    app.api.resetZoom()
  }, [app])

  const zoomToFit = React.useCallback(() => {
    app.api.zoomToFit()
  }, [app])

  const zoomToSelection = React.useCallback(() => {
    app.api.zoomToSelection()
  }, [app])

  return (
    <div className="nu-toolbar">
      <input type="checkbox" checked={app.settings.isToolLocked} onChange={handleToolLockClick} />
      Camera
      <button onClick={zoomOut}>-</button>
      <button onClick={zoomIn}>+</button>
      <button onClick={resetZoom}>reset</button>
      <button onClick={zoomToFit}>zoom to fit</button>
      <button onClick={zoomToSelection}>zoom to selection</button>
    </div>
  )
})
