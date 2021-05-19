import { Calendar, Button } from '@hospitalrun/components'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import useAddBreadcrumbs from '@shared/page-header/breadcrumbs/useAddBreadcrumbs'
import Loading from '@shared/components/Loading'
import PatientRepository from '@shared/db/PatientRepository'
import useTranslator from '@shared/hooks/useTranslator'
import Appointment from '@shared/model/Appointment'
import useAppointments from '../hooks/useAppointments'
import { useAppContext } from '@shared/wrappers/RemoteAppWrapper'

interface Event {
  id: string
  start: Date
  end: Date
  title: string
  allDay: boolean
}

const breadcrumbs = [{ i18nKey: 'scheduling.appointments.label', location: '/appointments' }]

const ViewAppointments = () => {
  const { t } = useTranslator()
  const history = useHistory()
  const { updateTitle, buttonToolbarSetter } = useAppContext();
  useEffect(() => {
    updateTitle(t('scheduling.appointments.label'))
  })
  const { data: appointments, isLoading } = useAppointments()
  const [events, setEvents] = useState<Event[]>([])
  useAddBreadcrumbs(breadcrumbs, true)

  useEffect(() => {
    buttonToolbarSetter([
      <Button
        key="newAppointmentButton"
        outlined
        color="success"
        icon="appointment-add"
        onClick={() => history.push('/appointments/new')}
      >
        {t('scheduling.appointments.new')}
      </Button>,
    ])

    return () => {
      buttonToolbarSetter([])
    }
  }, [buttonToolbarSetter, history, t])

  useEffect(() => {
    if (appointments && !isLoading) {
      appointments.map(async (appointment: Appointment) => {
        const patient = await PatientRepository.find(appointment.patient)
        setEvents((eventsArray) => [
          ...eventsArray,
          {
            id: appointment.id,
            start: new Date(appointment.startDateTime),
            end: new Date(appointment.endDateTime),
            title: patient && patient.fullName ? patient.fullName : '',
            allDay: false,
          },
        ])
      })
    }
    return () => {
      setEvents([])
    }
  }, [appointments, isLoading])

  if (isLoading || appointments === undefined) {
    return <Loading />
  }

  return (
    <div>
      <Calendar
        events={events}
        onEventClick={(event) => {
          history.push(`/appointments/${event.id}`)
        }}
      />
    </div>
  )
}

export default ViewAppointments
