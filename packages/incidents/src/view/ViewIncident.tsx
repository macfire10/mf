import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import useAddBreadcrumbs from '@shared/page-header/breadcrumbs/useAddBreadcrumbs'
import useTranslator from '@shared/hooks/useTranslator'
import { RootState } from '@shared/store'
import ViewIncidentDetails from './ViewIncidentDetails'
import { useAppContext } from '@shared/wrappers/RemoteAppWrapper'

const ViewIncident = () => {
  const { id } = useParams<{ id: string }>()
  const { permissions } = useSelector((root: RootState) => root.user)
  const { t } = useTranslator()
  const { updateTitle } = useAppContext()
  useEffect(() => {
    updateTitle(t('incidents.reports.view'))
  })
  useAddBreadcrumbs([
    {
      i18nKey: 'incidents.reports.view',
      location: `/incidents/${id}`,
    },
  ])

  if (id === undefined || permissions === undefined) {
    return <></>
  }

  return <ViewIncidentDetails incidentId={id} permissions={permissions} />
}

export default ViewIncident
