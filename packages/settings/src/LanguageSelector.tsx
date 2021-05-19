import sortBy from 'lodash/sortBy'
import React, { useState } from 'react'

import { resources } from '@shared/config/i18n'
import useTranslator from '@shared/hooks/useTranslator'
import SelectWithLabelFormGroup, { Option } from './SelectWithLabelFormGroup'
import { useAppContext } from '@shared/wrappers/RemoteAppWrapper'

const LanguageSelector = () => {
  const { i18n } = useAppContext();
  const { t } = useTranslator()
  const [selected, setSelected] = useState(i18n.language)

  let languageOptions: Option[] = Object.keys(resources).map((abbr) => ({
    label: resources[abbr].name,
    value: abbr,
  }))
  languageOptions = sortBy(languageOptions, (o: any) => o.label)

  const onChange = (value: string) => {
    i18n.changeLanguage(value)
    setSelected(value)
  }

  return (
    <SelectWithLabelFormGroup
      name="language"
      label={t('settings.language.label')}
      options={languageOptions}
      defaultSelected={languageOptions.filter(({ value }) => value === selected)}
      onChange={(values: any) => onChange(values[0])}
      isEditable
    />
  )
}

export default LanguageSelector
