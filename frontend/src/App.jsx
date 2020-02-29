import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Global } from '@emotion/core'
import { connect } from 'react-redux'
import globalStyles from './styles/globalStyles'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import MyDragonsPage from './pages/MyDragonsPage'
import MarketPage from './pages/MarketPage'
import Navbar from './components/Navbar'
import store from './store/store'

const AuthRoute = ({ path, component }) => {
  if (!store.getState().account.isAuth) {
    return <Redirect path='signup' />
  } else {
    return <Route path={path} component={component} />
  }
}

class App extends React.Component {
  render () {
    return (
      <>
        <Global styles={globalStyles} />
        <Navbar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/login' component={LoginPage} />
          <AuthRoute path='/my-dragons' component={MyDragonsPage} />
          <AuthRoute path='/public-dragons' component={MarketPage} />
          <Route path='*' render={() => <h2>Page Not Found</h2>} />
        </Switch>
      </>
    )
  }
}

export default connect(({ account }) => ({ isAuth: account.isAuth }))(App)
