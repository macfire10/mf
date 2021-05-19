import * as React from 'react'

import { RemoteAppWrapper } from '@shared/wrappers/RemoteAppWrapper'
import Incidents from './Incidents';

const App = (props: any) => {
  const { appContext } = props;

  return (
    <RemoteAppWrapper appContext={appContext}>
      <Incidents />
    </RemoteAppWrapper>
  )
}

export default App