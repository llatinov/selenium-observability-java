import React from 'react'

import { apiFetch } from 'helpers/api'
import { personServiceUrl } from 'helpers/config'
import { IPerson } from 'types/types'

import PersonsList from './PersonsList'

import TracingButton from 'components/TracingButton'
import CreateNewPersonModal from 'containers/CreateNewPersonModal'

import styles from './styles.module.scss'

export default () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [persons, setPersons] = React.useState<IPerson[]>([])

  const fetchPersons = async (): Promise<void> => {
    const persons = await apiFetch<IPerson[]>(`${personServiceUrl}/persons`)
    setPersons(persons)
  }

  return (
    <div className={styles.app}>
      <CreateNewPersonModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <header className={styles.appHeader}>
        <p>Sample Patient Service Frontend</p>
      </header>

      <TracingButton id="test-create-person-button" label={'Create new person'} onClick={() => setIsModalOpen(true)} />

      <TracingButton id="test-fetch-persons-button" label={'Fetch persons'} onClick={fetchPersons} />
      {persons.length > 0 && (
        <React.Fragment>
          <div id="test-persons-count-text">Found {persons.length} persons</div>
          <PersonsList persons={persons} />
        </React.Fragment>
      )}
    </div>
  )
}
