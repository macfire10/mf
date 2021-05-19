import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@shared/store'
import { store } from '@shared/store'
import i18n from '@shared/config/i18n'
import { useTitle, useUpdateTitle } from '@shared/page-header/title/TitleContext'
import { useButtons, useButtonToolbarSetter } from '@shared/page-header/button-toolbar/ButtonBarProvider'
import Breadcrumbs from '@shared/page-header/breadcrumbs/Breadcrumbs'
import ButtonToolBar from '@shared/page-header/button-toolbar/ButtonToolBar'
import { NetworkStatusMessage } from '@shared/components/network-status'
import { Route, Switch } from 'react-router'
import { Toaster } from '@hospitalrun/components'
/**
 * Microfrontend's dynamic imports
 */
const Navbar = React.lazy(() => import('navbar/App'))
const Sidebar = React.lazy(() => import('sidebar/App'))
const Dashboard = React.lazy(() => import('dashboard/App'))
const Patients = React.lazy(() => import('patients/App'))
const Appointments = React.lazy(() => import('scheduling/App'))
const Medications = React.lazy(() => import('medications/App'))
const Incidents = React.lazy(() => import('incidents/App'))
const Labs = React.lazy(() => import('labs/App'))
const Settings = React.lazy(() => import('settings/App'))
const Imagings = React.lazy(() => import('imagings/App'))

const HospitalRun = () => {
  const { title } = useTitle()
  const { sidebarCollapsed } = useSelector((state: RootState) => state.components)

  const appContext = {
    store,
    i18n,
    title: useTitle(),
    updateTitle: useUpdateTitle(),
    buttons: useButtons(),
    buttonToolbarSetter: useButtonToolbarSetter()
  }

  return (
    <div>
      <NetworkStatusMessage />
      <React.Suspense fallback="">
        <Navbar appContext={appContext} />
      </React.Suspense>
      <div className="container-fluid">
        <div className="col-md-2">
          <React.Suspense fallback="">
            <Sidebar appContext={appContext} />
          </React.Suspense>
        </div>
        <div className="row">
          <main
            role="main"
            className={`${
              sidebarCollapsed ? 'col-md-10 col-lg-11' : 'col-md-9 col-lg-10'
            } ml-sm-auto px-4`}
          >
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">{title}</h1>
              <ButtonToolBar />
            </div>
            <Breadcrumbs />
            <div>
              <React.Suspense fallback={''}>
                <Switch>
                  <Route exact path="/" component={() => <Dashboard appContext={appContext} />} />
                  <Route path="/patients" component={() => <Patients appContext={appContext} />} />
                  <Route path="/appointments" component={() => <Appointments appContext={appContext} />} />
                  <Route path="/medications" component={() => <Medications appContext={appContext} />} />
                  <Route path="/incidents" component={() => <Incidents appContext={appContext} />} />                
                  <Route path="/labs" component={() => <Labs appContext={appContext} />} />
                  <Route path="/settings" component={() => <Settings appContext={appContext} />} />
                  <Route path="/imaging" component={() => <Imagings appContext={appContext} />} />
                </Switch>
              </React.Suspense>
            </div>
            <Toaster autoClose={5000} hideProgressBar draggable />
          </main>
        </div>
      </div>
    </div>
  )
}

export default HospitalRun
