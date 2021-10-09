import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

import styles from 'stylesheets/colors.module.scss'

export default createTheme({
  palette: {
    primary: {
      main: styles.primaryColor
    },
    secondary: {
      main: styles.secondaryColor
    },
    error: {
      main: red.A400
    }
  }
})
