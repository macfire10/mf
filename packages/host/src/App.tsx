import { TitleProvider } from '@shared/page-header/title/TitleContext'
import { store } from '@shared/store'
import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import HospitalRun from './HospitalRun'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <TitleProvider>
          <HospitalRun />
        </TitleProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
