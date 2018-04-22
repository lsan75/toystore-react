import { ToyReducerState, defaultToyReducer } from './toy/toy.reducer'
import { AuthReducerState, defaultAuthReducer } from './auth/auth.reducer'

export interface Store {
  toyReducer: ToyReducerState
  authReducer: AuthReducerState
}

export const defaulStore: Store = {
  toyReducer: defaultToyReducer,
  authReducer: defaultAuthReducer
}
