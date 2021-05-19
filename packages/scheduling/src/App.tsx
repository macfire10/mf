import * as React from 'react'

import { RemoteAppWrapper } from '@shared/wrappers/RemoteAppWrapper'
import Appointments from './appointments/Appointments';

const App = (props: any) => {
  const { appContext } = props;

  return (
    <RemoteAppWrapper appContext={appContext}>
      <Appointments />
    </RemoteAppWrapper>
  )
}

export default App