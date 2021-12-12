import * as React from 'react'
import { BoundsDetailContainer } from './BoundsDetailContainer'
import { renderWithApp } from '~test/renderWithApp'

describe('BoundsDetailContainer', () => {
  test('mounts component without crashing', () => {
    renderWithApp(
      <BoundsDetailContainer
        shapes={[]}
        bounds={{
          minX: 500,
          maxX: 600,
          minY: 500,
          maxY: 600,
          width: 100,
          height: 100,
        }}
        detail={'size'}
        hidden={false}
      />
    )
  })
})
