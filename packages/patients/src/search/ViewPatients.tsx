import { Button } from '@hospitalrun/components'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import useAddBreadcrumbs from '@shared/page-header/breadcrumbs/useAddBreadcrumbs'
import useTranslator from '@shared/hooks/useTranslator'
import SearchPatients from './SearchPatients'
import { useAppContext } from '@shared/wrappers/RemoteAppWrapper'

const breadcrumbs = [{ i18nKey: 'patients.label', location: '/patients' }]

const ViewPatients = () => {
  const { t } = useTranslator()
  const history = useHistory()
  const { updateTitle, buttonToolbarSetter } = useAppContext()
  useEffect(() => {
    updateTitle(t('patients.label'))
  })
  const dispatch = useDispatch()

  useAddBreadcrumbs(breadcrumbs, true)

  useEffect(() => {
    buttonToolbarSetter([
      <Button
        key="newPatientButton"
        outlined
        color="success"
        icon="patient-add"
        onClick={() => history.push('/patients/new')}
      >
        {t('patients.newPatient')}
      </Button>,
    ])
    return () => {
      buttonToolbarSetter([])
    }
  }, [dispatch, buttonToolbarSetter, t, history])

  return <SearchPatients />
}

export default ViewPatients
