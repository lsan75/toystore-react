import { Action } from 'redux';

export const AUTH = {
  SET_CONNECTED: 'AUTH_ET_CONNECTED',
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
