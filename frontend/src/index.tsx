import ReactDOM from 'react-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import App from 'containers/App'
import reportWebVitals from './reportWebVitals'
import theme from './stylesheets/theme'
import './stylesheets/base.scss'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
