import { Spinner, Button, Modal, Toast } from '@hospitalrun/components'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import useAddBreadcrumbs from '@shared/page-header/breadcrumbs/useAddBreadcrumbs'
import usePatient from '../../hooks/usePatient'
import useTranslator from '@shared/hooks/useTranslator'
import Permissions from '@shared/model/Permissions'
import { RootState } from '@shared/store'
import useAppointment from '../../hooks/useAppointment'
import useDeleteAppointment from '../../hooks/useDeleteAppointment'
import AppointmentDetailForm from '../AppointmentDetailForm'
import { getAppointmentLabel } from '../util/scheduling-appointment.util'
import { useAppContext } from '@shared/wrappers/RemoteAppWrapper'

const ViewAppointment = () => {
  const { t } = useTranslator()
  const { updateTitle, buttonToolbarSetter } = useAppContext()

  useEffect(() => {
    if (updateTitle) {
      updateTitle(t('scheduling.appointments.viewAppointment'))
    }
  }, [updateTitle, t])

  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const [deleteMutate] = useDeleteAppointment()
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
  const { permissions } = useSelector((state: RootState) => state.user)

  const { data: appointment } = useAppointment(id)
  const { data: patient } = usePatient(appointment ? appointment.patient : id)
  const breadcrumbs = [
    { i18nKey: 'scheduling.appointments.label', location: '/appointments' },
    { text: appointment ? getAppointmentLabel(appointment) : '', location: `/patients/${id}` },
  ]
  useAddBreadcrumbs(breadcrumbs, true)

  const onAppointmentDeleteButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShowDeleteConfirmation(true)
  }

  const onDeleteConfirmationButtonClick = () => {
    if (!appointment) {
      return
    }

    deleteMutate({ appointmentId: appointment.id }).then(() => {
      history.push('/appointments')
      Toast('success', t('states.success'), t('scheduling.appointment.successfullyDeleted'))
    })
    setShowDeleteConfirmation(false)
  }

  const getButtons = useCallback(() => {
    const buttons: React.ReactNode[] = []
    if (appointment && permissions.includes(Permissions.WriteAppointments)) {
      buttons.push(
        <Button
          key="editAppointmentButton"
          color="success"
          icon="edit"
          outlined
          onClick={() => {
            history.push(`/appointments/edit/${appointment.id}`)
          }}
        >
          {t('actions.edit')}
        </Button>,
      )
    }

    if (permissions.includes(Permissions.DeleteAppointment)) {
      buttons.push(
        <Button
          key="deleteAppointmentButton"
          color="danger"
          icon="appointment-remove"
          onClick={onAppointmentDeleteButtonClick}
        >
          {t('scheduling.appointments.deleteAppointment')}
        </Button>,
      )
    }

    return buttons
  }, [appointment, history, permissions, t])

  useEffect(() => {
    buttonToolbarSetter(getButtons())

    return () => {
      buttonToolbarSetter([])
    }
  }, [getButtons, buttonToolbarSetter])

  return (
    <>
      {patient && appointment ? (
        <div>
          <AppointmentDetailForm appointment={appointment} isEditable={false} patient={patient} />
          <Modal
            body={t('scheduling.appointment.deleteConfirmationMessage')}
            buttonsAlignment="right"
            show={showDeleteConfirmation}
            closeButton={{
              children: t('actions.delete'),
              color: 'danger',
              onClick: onDeleteConfirmationButtonClick,
            }}
            title={t('actions.confirmDelete')}
            toggle={() => setShowDeleteConfirmation(false)}
          />
        </div>
      ) : (
        <Spinner type="BarLoader" loading />
      )}
    </>
  )
}

export default ViewAppointment
