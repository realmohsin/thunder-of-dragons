import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store/store'
import { fetchAuthStatus, fetchPublicDragons } from './store/actions'
import history from './history'

const domTree = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)

store.dispatch(fetchPublicDragons())

store.dispatch(fetchAuthStatus()).then(() => {
  render(domTree, document.getElementById('root'))
})
