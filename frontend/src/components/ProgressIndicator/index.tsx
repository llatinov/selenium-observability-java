import { CircularProgress } from '@mui/material'

import styles from './styles.module.scss'

export default () => (
  <div id="test-progress-indicator" className={styles.container}>
    <CircularProgress />
  </div>
)
