import React from 'react'

import { apiFetch } from 'helpers/api'
import { personServiceUrl } from 'helpers/config'
import { IPerson } from 'types/types'

import Button from 'components/Button'

import styles from './styles.module.scss'

export default () => {
  const [persons, setPersons] = React.useState<IPerson[]>([])

  const fetchPersons = async () => {
    const persons = await apiFetch<IPerson[]>(`${personServiceUrl}/persons`)
    setPersons(persons)
  }

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <p>Sample Patient Service Frontend</p>
      </header>
      <div>
        <Button label={'Fetch persons'} onClick={fetchPersons} />
      </div>
      {persons.length > 0 && <div id="persons">Found {persons.length} persons</div>}
    </div>
  )
}
