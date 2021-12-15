import * as React from 'react'
import type { TLAppPropsWithApp, TLAppPropsWithoutApp } from '~components'
import type { TLReactShape } from '~lib'
import type { TLReactApp } from '~types'

export function usePropControl<S extends TLReactShape, R extends TLReactApp<S> = TLReactApp<S>>(
  app: R,
  props: TLAppPropsWithoutApp<S> | TLAppPropsWithApp<S>
) {
  React.useEffect(() => {
    if (!('model' in props)) return
    if (props.model) app.loadDocumentModel(props.model)
  }, [(props as TLAppPropsWithoutApp<S>).model])
}
