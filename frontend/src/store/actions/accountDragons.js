import { ACCOUNT_DRAGONS } from './actionTypes'

const fetchAccountDragons = () => async dispatch => {
  dispatch({ type: ACCOUNT_DRAGONS.FETCH_START })
  const res = await fetch('http://localhost:3000/account/dragons', {
    credentials: 'include'
  })
  const serverMsg = await res.json()
  if (serverMsg.error) {
    dispatch({ type: ACCOUNT_DRAGONS.FETCH_ERROR })
  } else {
    dispatch({
      type: ACCOUNT_DRAGONS.FETCH_SUCCESS,
      dragons: serverMsg.dragons
    })
  }
}

export { fetchAccountDragons }
