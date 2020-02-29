import { PUBLIC_DRAGONS } from '../actions/actionTypes'

const initialState = {
  publicDragons: [],
  loading: false,
  error: null
}

const publicDragonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUBLIC_DRAGONS.FETCH_START:
      return { ...state, loading: true, error: null }
    case PUBLIC_DRAGONS.FETCH_ERROR:
      return { ...state, loading: false, error: action.error }
    case PUBLIC_DRAGONS.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        publicDragons: action.dragons
      }
    default:
      return state
  }
}

export default publicDragonsReducer
