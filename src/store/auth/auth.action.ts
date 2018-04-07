import { Action } from 'redux';

export const AUTH = {
  SET_CONNECTED: 'AUTH.SET_CONNECTED',
  OPEN: 'AUTH_OPEN'
};

export function authConnectAction(): Action {
  return {
    type: AUTH.SET_CONNECTED
  };
}

export function openAuthAction(): Action {
  return {
    type: AUTH.OPEN
  };
}
