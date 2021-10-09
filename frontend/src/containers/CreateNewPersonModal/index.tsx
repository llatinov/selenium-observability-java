import React from 'react'
import { TextField } from '@mui/material'

import { apiFetch } from 'helpers/api'
import { personServiceUrl } from 'helpers/config'

import Modal from 'components/Modal'
import TracingButton from 'components/TracingButton'

import styles from './styles.module.scss'

interface Props {
  open: boolean
  onClose: () => void
}

export default (props: Props) => {
  const [firstName, setFirstName] = React.useState<string>('')
  const [lastName, setLastName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')

  const savePerson = async () => {
    await apiFetch(`${personServiceUrl}/persons`, {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email })
    })

    setFirstName('')
    setLastName('')
    setEmail('')
    props.onClose()
  }
  return (
    <Modal open={props.open} title={'Add new person'} onClose={props.onClose}>
      <div className={styles.row}>
        <TextField
          variant="filled"
          label={'First name'}
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
          className={styles.margin}
        />
        <TextField
          variant="filled"
          label={'Last name'}
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />
      </div>
      <div className={styles.row}>
        <TextField
          variant="filled"
          className={styles.fullWidth}
          label={'Email'}
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>
      <div className={styles.row}>
        <TracingButton secondary label={'Cancel'} id="test-fetch-persons-button" onClick={props.onClose} />
        <TracingButton label={'Save'} id="test-fetch-persons-button" onClick={savePerson} />
      </div>
    </Modal>
  )
}
