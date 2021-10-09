import { IconButton, Modal, Paper, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { traceSpan } from 'helpers/tracing'

import styles from './styles.module.scss'

interface Props {
  open: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
}

export default (props: Props) => {
  const onClose = () => traceSpan("'Close modal' icon clicked", props.onClose)

  return (
    <Modal open={props.open} onClose={onClose}>
      <Paper className={styles.content}>
        <div className={styles.header}>
          <Typography variant="h6" component="h2">
            {props.title}
          </Typography>
          <IconButton aria-label="delete" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styles.body}>{props.children}</div>
      </Paper>
    </Modal>
  )
}
