import { ACCOUNT } from '../actions/actionTypes'

const initialAccountState = {
  isAuth: false,
  account: null,
  loading: false,
  error: null
}

const accountReducer = (state = initialAccountState, action) => {
  switch (action.type) {
    case ACCOUNT.FETCH_START:
      return { ...state, loading: true, error: null }
    case ACCOUNT.FETCH_ERROR:
      return { ...state, loading: false, error: action.error }
    case ACCOUNT.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isAuth: true
      }
    case ACCOUNT.FETCH_SUCCESS_LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        isAuth: false
      }
    default:
      return state
  }
}

export default accountReducer
