import { ACCOUNT_INFO } from './actionTypes'

const fetchAccountInfo = () => async dispatch => {
  dispatch({ type: ACCOUNT_INFO.FETCH_START })
  const res = await fetch('http://localhost:3000/account/info', {
    credentials: 'include'
  })
  const serverMsg = await res.json()
  if (serverMsg.type === 'error') {
    dispatch({ type: ACCOUNT_INFO.FETCH_ERROR, error: serverMsg.error })
  } else {
    dispatch({ type: ACCOUNT_INFO.FETCH_SUCCESS, accountInfo: serverMsg.info })
  }
}

export { fetchAccountInfo }
