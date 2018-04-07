import { Action } from 'redux';
import { AUTH } from './auth.action';

export interface AuthReducerState {
  isConnected: boolean;
  isOpened: boolean;
}

export const defaultAuthReducer = {
  isConnected: false,
  isOpened: false
};

export function authReducer(state: AuthReducerState = defaultAuthReducer, action: Action) {
  switch (action.type) {

    case AUTH.SET_CONNECTED:
      return { ...state, isConnected: true };

    case AUTH.OPEN:
      return { ...state, isOpened: !state.isOpened };

    default:
      return state;
  }
}