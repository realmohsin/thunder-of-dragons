import { ACCOUNT } from './actionTypes'

const signup = (username, password) => async dispatch => {
  console.log('from signup action')
  dispatch({ type: ACCOUNT.FETCH_START })
  const res = await fetch('http://localhost:3000/account/signup', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  const serverMsg = await res.json()
  if (serverMsg.type === 'error') {
    dispatch({ type: ACCOUNT.FETCH_ERROR, error: serverMsg.message })
  } else {
    dispatch({ type: ACCOUNT.FETCH_SUCCESS, account: null })
  }
}

const login = (username, password) => async dispatch => {
  dispatch({ type: ACCOUNT.FETCH_START })
  const res = await fetch('http://localhost:3000/account/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  const serverMsg = await res.json()
  if (serverMsg.type === 'error') {
    dispatch({ type: ACCOUNT.FETCH_ERROR, error: serverMsg.message })
  } else {
    dispatch({ type: ACCOUNT.FETCH_SUCCESS, account: null })
  }
}

const logout = () => async dispatch => {
  dispatch({ type: ACCOUNT.FETCH_START })
  const res = await fetch('http://localhost:3000/account/logout', {
    method: 'POST',
    credentials: 'include'
  })
  const serverMsg = await res.json()
  if (serverMsg.type === 'error') {
    dispatch({ type: ACCOUNT.FETCH_ERROR, error: serverMsg.message })
  } else {
    dispatch({ type: ACCOUNT.FETCH_SUCCESS_LOGOUT })
  }
}

const fetchAuthStatus = () => async dispatch => {
  dispatch({ type: ACCOUNT.FETCH_START })
  const res = await fetch('http://localhost:3000/account/auth-status', {
    credentials: 'include'
  })
  const serverMsg = await res.json()
  if (serverMsg.message.isAuth) {
    dispatch({ type: ACCOUNT.FETCH_SUCCESS })
  } else {
    dispatch({ type: ACCOUNT.FETCH_ERROR, error: JSON.stringify(serverMsg) })
  }
}

export { signup, login, logout, fetchAuthStatus }
