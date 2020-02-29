import { DRAGON } from './actionTypes'

const fetchDragon = () => async dispatch => {
  dispatch({ type: DRAGON.FETCH_START })
  try {
    const res = await fetch('http://localhost:3000/dragon/new', {
      credentials: 'include'
    })
    const dragonData = await res.json()
    if (dragonData.type === 'error') {
      dispatch({ type: DRAGON.FETCH_ERROR, error: dragonData.message })
    } else {
      dispatch({
        type: DRAGON.FETCH_SUCCESS,
        dragon: dragonData.dragon
      })
    }
  } catch (error) {
    console.error(error)
    dispatch({ type: DRAGON.FETCH_ERROR, error })
  }
}

export { fetchDragon }
