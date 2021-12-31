import { TLTestApp } from '~test/TLTestApp'
import { TLTargetType } from '~types'
import { TLApp } from '~lib/TLApp'
import { TLSelectTool } from './TLSelectTool'

describe('A minimal test', () => {
  it('Creates the shape', () => {
    class SelectTool extends TLSelectTool {
      static id = 'erase'
      static shortcut = ['e']
    }
    const app = new TLApp()
    const shape = new SelectTool(app, app)
    expect(shape).toBeDefined()
  })
})

describe('When in the idle state', () => {
  it('Sets hovered shape when entering a shape', () => {
    const app = new TLTestApp()
    app.pointerEnter([10, 10], 'box1')
    expect(app.hoveredId).toBe('box1')
  })

  it('Clears hovered shape when exiting a shape', () => {
    const app = new TLTestApp()
    app.pointerEnter([10, 10], 'box1')
    app.pointerLeave([10, 10], 'box1')
    expect(app.hoveredId).toBeUndefined()
  })
})

describe('editing shape', () => {
  it('Sets editing shape when double clicking an editable shape', () => {
    const app = new TLTestApp()
    app.doubleClick([10, 10], 'box3')
    expect(app.editingId).toBe('box3')
  })

  it('Does not set editing shape when double clicking a shape that is not editable', () => {
    const app = new TLTestApp()
    app.doubleClick([10, 10], 'box1')
    expect(app.editingId).toBeUndefined()
  })

  it('Clears editing shape when clicking outside of the editing shape', () => {
    const app = new TLTestApp()
    app.doubleClick([10, 10], 'box3')
    app.click([-100, -110], { type: TLTargetType.Canvas })
    expect(app.editingId).toBeUndefined()
  })

  it('Does not clear editing shape when clicking inside of the editing shape', () => {
    const app = new TLTestApp()
    app.doubleClick([10, 10], 'box3')
    app.pointerDown([10, 10], 'box3')
    expect(app.editingId).toBe('box3')
  })
})
