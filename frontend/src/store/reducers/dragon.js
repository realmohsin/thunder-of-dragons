import { DRAGON } from '../actions/actionTypes'

const initialDragonState = {
  newDragon: null,
  loading: false,
  error: null
}

const dragonReducer = (state = initialDragonState, action) => {
  switch (action.type) {
    case DRAGON.FETCH_START:
      return { ...state, loading: true, error: null }
    case DRAGON.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        newDragon: action.dragon
      }
    case DRAGON.FETCH_ERROR:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export default dragonReducer
