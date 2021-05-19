import React from 'react'
import { useParams } from 'react-router-dom'

import CareGoalTable from './CareGoalTable'

const ViewCareGoals = () => {
  const { id } = useParams<{ id: string }>()

  return <CareGoalTable patientId={id} />
}

export default ViewCareGoals
