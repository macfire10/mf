import { configureStore as configureToolkitStore, combineReducers, Action } from '@reduxjs/toolkit'
import ReduxThunk, { ThunkAction } from 'redux-thunk'

import medication from './slices/medication-slice'
import breadcrumbs from './slices/breadcrumbs-slice'
import patient from './slices/patient-slice'
import patients from './slices/patients-slice'
import user from './slices/user-slice'
import components from '../components/component-slice'

const reducer = combineReducers({
  patient,
  patients,
  user,
  breadcrumbs,
  components,
  medication,
})

export const store = configureToolkitStore({
  reducer,
  middleware: [ReduxThunk],
});

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export type RootState = ReturnType<typeof reducer>