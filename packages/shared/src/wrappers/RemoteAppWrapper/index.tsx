import * as React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'

type AppContext = any
interface RemoteAppWrapperProps {
  appContext: AppContext
}

const AppContextProvider = React.createContext<AppContext>(null as unknown as AppContext)

export const useAppContext = () => React.useContext(AppContextProvider)

export const RemoteAppWrapper: React.FC<RemoteAppWrapperProps> = (props) => {
  const { appContext, children } = props
  const { store, i18n } = appContext

  if (!appContext) {
    throw new Error('AppContext not present.')
  }

  return (
    <Provider store={store || {}}>
      <I18nextProvider i18n={i18n}>
        <AppContextProvider.Provider value={appContext}>{children}</AppContextProvider.Provider>
      </I18nextProvider>
    </Provider>
  )
}
