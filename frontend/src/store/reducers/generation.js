import { GENERATION } from '../actions/actionTypes'

const initialGenerationState = {
  currentGeneration: null,
  loading: false,
  error: null
}

const generationReducer = (state = initialGenerationState, action) => {
  switch (action.type) {
    case GENERATION.FETCH_START:
      return { ...state, loading: true, error: null }
    case GENERATION.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentGeneration: action.generation
      }
    case GENERATION.FETCH_ERROR:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export default generationReducer
