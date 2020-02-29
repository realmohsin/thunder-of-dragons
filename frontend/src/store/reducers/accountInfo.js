import { ACCOUNT_INFO } from '../actions/actionTypes'

const initialState = {
  accountInfo: {},
  loading: false,
  error: null
}

const accountInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_INFO.FETCH_START:
      return { ...state, loading: true, error: null }
    case ACCOUNT_INFO.FETCH_ERROR:
      return { ...state, loading: false, error: action.error }
    case ACCOUNT_INFO.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        accountInfo: action.accountInfo
      }
    default:
      return state
  }
}

export default accountInfoReducer
