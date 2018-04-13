import { Action } from 'redux';
import { AuthAction } from './auth.reducer';
import { UserState } from '../../features/auth/auth.component';
import { Dispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

export const AUTH = {
  SET_CONNECTED: 'AUTH_ET_CONNECTED',
  OPEN: 'AUTH_OPEN',
  SET_ERROR: 'AUTH_SET_ERROR'
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

export function setError(payload: boolean): AuthAction {
  return {
    type: AUTH.SET_ERROR,
    payload
  };
}

export function submitAuthAction(sentUser: UserState) {
  return (dispatch: Dispatch<AuthAction>) => {

    let { user = '', pass = '' } = { ...sentUser };

    return axios.get(`/users?user=${user}&pass=${pass}`).then((result: AxiosResponse<UserState[]>) => {

      if (result.data.length) {
        dispatch(authConnectAction());
        dispatch(openAuthAction());
      } else {
        dispatch(setError(true));
      }

    }).catch(err => Promise.reject(err));

  };
}
