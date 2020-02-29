import { GENERATION } from './actionTypes'

const fetchGeneration = () => async dispatch => {
  dispatch({ type: GENERATION.FETCH_START })
  try {
    const res = await fetch('http://localhost:3000/generation')
    const generationData = await res.json()
    dispatch({
      type: GENERATION.FETCH_SUCCESS,
      generation: generationData.generation
    })
  } catch (error) {
    console.error(error)
    dispatch({ type: GENERATION.FETCH_ERROR, error })
  }
}

export { fetchGeneration }
