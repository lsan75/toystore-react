import { combineReducers } from 'redux'
import { toyReducer } from './toy/toy.reducer'
import { authReducer } from './auth/auth.reducer'

export const rootReducer = combineReducers({
  toyReducer,
  authReducer
})
