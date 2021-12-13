/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { useApp } from '@tldraw/react'
import type { Shape } from '~lib'

export const NuStatusBar = observer(function StatusBar() {
  const app = useApp<Shape>()
  return (
    <div className="nu-statusbar">
      {app.selectedTool.id} | {app.selectedTool.currentState.id}
    </div>
  )
})
