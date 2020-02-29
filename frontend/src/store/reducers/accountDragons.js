import { ACCOUNT_DRAGONS } from '../actions/actionTypes'

const initialState = {
  dragons: [],
  loading: false,
  error: null
}

const accountDragonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_DRAGONS.FETCH_START:
      return { ...state, loading: true, error: null }
    case ACCOUNT_DRAGONS.FETCH_ERROR:
      return { ...state, loading: false, error: action.error }
    case ACCOUNT_DRAGONS.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        dragons: action.dragons
      }
    default:
      return state
  }
}

export default accountDragonsReducer
