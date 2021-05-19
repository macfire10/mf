import { Button, Container, Row } from '@hospitalrun/components'
import React, { useEffect, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useTranslator from '@shared/hooks/useTranslator'
import Permissions from '@shared/model/Permissions'
import { RootState } from '@shared/store'
import MedicationSearchRequest from '../models/MedicationSearchRequest'
import MedicationRequestSearch from './MedicationRequestSearch'
import MedicationRequestTable from './MedicationRequestTable'
import { useAppContext } from '@shared/wrappers/RemoteAppWrapper'

const ViewMedications = () => {
  const { t } = useTranslator()
  const history = useHistory()
  const { updateTitle, buttonToolbarSetter } = useAppContext()
  useEffect(() => {
    updateTitle(t('medications.label'))
  })
  const { permissions } = useSelector((state: RootState) => state.user)

  const getButtons = useCallback(() => {
    const buttons: React.ReactNode[] = []

    if (permissions.includes(Permissions.RequestMedication)) {
      buttons.push(
        <Button
          icon="add"
          onClick={() => history.push('/medications/new')}
          outlined
          color="success"
          key="medication.requests.new"
        >
          {t('medications.requests.new')}
        </Button>,
      )
    }

    return buttons
  }, [permissions, history, t])

  useEffect(() => {
    buttonToolbarSetter(getButtons())
    return () => {
      buttonToolbarSetter([])
    }
  }, [getButtons, buttonToolbarSetter])

  const [searchRequest, setSearchRequest] = useState<MedicationSearchRequest>({
    text: '',
    status: 'all',
  })

  const onSearchRequestChange = (newSearchRequest: MedicationSearchRequest) => {
    setSearchRequest(newSearchRequest)
  }

  return (
    <Container>
      <MedicationRequestSearch searchRequest={searchRequest} onChange={onSearchRequestChange} />
      <Row>
        <MedicationRequestTable searchRequest={searchRequest} />
      </Row>
    </Container>
  )
}

export default ViewMedications
