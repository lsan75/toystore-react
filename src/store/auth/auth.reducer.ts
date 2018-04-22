import { Action } from 'redux'
import { AUTH } from './auth.action'

export interface AuthReducerState {
  isConnected: boolean
  isOpened: boolean
  isError: boolean
}

export const defaultAuthReducer = {
  isConnected: false,
  isOpened: false,
  isError: false
}

export interface AuthAction extends Action {
  payload?: boolean
}

export function authReducer(state: AuthReducerState = defaultAuthReducer, action: AuthAction) {
  switch (action.type) {

    case AUTH.SET_CONNECTED:
      return { ...state, isConnected: true }

    case AUTH.OPEN:
      return { ...state, isOpened: !state.isOpened }

    case AUTH.SET_ERROR:
      return { ...state, isError: action.payload }

    default:
      return state
  }
}