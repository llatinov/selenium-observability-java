import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import PersonsPage from 'containers/PersonsPage'

import theme from 'stylesheets/theme'

export default () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path={'/about'}>
          <div>About Page</div>
        </Route>
        <Route>
          <PersonsPage />
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
)
