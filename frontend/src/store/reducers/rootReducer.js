import { combineReducers } from 'redux'
import accountReducer from './account'
import dragonReducer from './dragon'
import generationReducer from './generation'
import accountDragonsReducer from './accountDragons'
import accountInfoReducer from './accountInfo'
import publicDragonsReducer from './publicDragons'

const rootReducer = combineReducers({
  account: accountReducer,
  accountInfo: accountInfoReducer,
  dragon: dragonReducer,
  generation: generationReducer,
  accountDragons: accountDragonsReducer,
  publicDragons: publicDragonsReducer
})

export default rootReducer
