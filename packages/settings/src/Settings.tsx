import { Row, Column } from '@hospitalrun/components'
import React, { useEffect } from 'react'

import useTranslator from '@shared/hooks/useTranslator'
import { useAppContext } from '@shared/wrappers/RemoteAppWrapper'
import LanguageSelector from './LanguageSelector'

const Settings = () => {
  const { t } = useTranslator()
  const {updateTitle} = useAppContext()
  useEffect(() => {
    updateTitle(t('settings.label'))
  })
  return (
    <>
      <Row>
        <Column xs={12} sm={9}>
          <LanguageSelector />
        </Column>
        <Column xs={0} sm={3} />
      </Row>
    </>
  )
}

export default Settings
