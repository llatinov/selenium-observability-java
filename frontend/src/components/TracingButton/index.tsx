import { Button } from '@mui/material'

import { traceSpan } from 'helpers/tracing'

import styles from './styles.module.scss'

interface Props {
  label: string
  id?: string
  secondary?: boolean
  onClick: () => void
}

export default (props: Props) => {
  const onClick = async () => traceSpan(`'${props.label}' button clicked`, props.onClick)

  return (
    <div className={styles.button}>
      <Button id={props.id} variant={'contained'} color={props.secondary ? 'secondary' : 'primary'} onClick={onClick}>
        {props.label}
      </Button>
    </div>
  )
}
