import * as React from 'react'

import { RemoteAppWrapper } from '@shared/wrappers/RemoteAppWrapper'
import Patients from './Patients';

const App = (props: any) => {
  const { appContext } = props;

  return (
    <RemoteAppWrapper appContext={appContext}>
      <Patients />
    </RemoteAppWrapper>
  )
}

export default App