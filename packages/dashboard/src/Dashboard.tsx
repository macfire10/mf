import React, { useEffect } from 'react'

import useTranslator from '@shared/hooks/useTranslator'
import { useAppContext } from '@shared/wrappers/RemoteAppWrapper'

const Dashboard: React.FC = () => {
  const { t } = useTranslator()
  const { updateTitle } = useAppContext()
  useEffect(() => {
    updateTitle(t('dashboard.label'))
  })
  return <h3>Example</h3>
}

export default Dashboard
