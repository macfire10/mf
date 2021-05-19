import * as React from 'react'

import { RemoteAppWrapper } from '@shared/wrappers/RemoteAppWrapper'
import Navbar from './navbar/Navbar';

const App = (props: any) => {
  const { appContext } = props;

  return (
    <RemoteAppWrapper appContext={appContext}>
      <Navbar />
    </RemoteAppWrapper>
  )
}

export default App