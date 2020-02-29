import { PUBLIC_DRAGONS } from './actionTypes'

const fetchPublicDragons = () => async dispatch => {
  dispatch({ type: PUBLIC_DRAGONS.FETCH_START })
  try {
    const res = await fetch('http://localhost:3000/dragon/public-dragons')
    const serverMsg = await res.json()
    if (serverMsg.type === 'error') {
      dispatch({ type: PUBLIC_DRAGONS.FETCH_ERROR, error: serverMsg.message })
    } else {
      dispatch({
        type: PUBLIC_DRAGONS.FETCH_SUCCESS,
        dragons: serverMsg.dragons
      })
    }
  } catch (error) {
    console.error(error)
    dispatch({ type: PUBLIC_DRAGONS.FETCH_ERROR, error })
  }
}

export { fetchPublicDragons }
