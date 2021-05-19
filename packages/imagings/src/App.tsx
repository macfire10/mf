import * as React from 'react'

import { RemoteAppWrapper } from '@shared/wrappers/RemoteAppWrapper'
import Imagings from './Imagings';

const App = (props: any) => {
  const { appContext } = props;

  return (
    <RemoteAppWrapper appContext={appContext}>
      <Imagings />
    </RemoteAppWrapper>
  )
}

export default App