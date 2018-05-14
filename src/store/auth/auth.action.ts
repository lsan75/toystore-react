import { Action } from 'redux'
import { AuthAction } from './auth.reducer'
import { UserState } from '../../features/auth/auth.component'
import { Dispatch } from 'react-redux'
import axios, { AxiosResponse } from 'axios'

export const AUTH = {
  SET_CONNECTED: 'AUTH_SET_CONNECTED',
  OPEN: 'AUTH_OPEN',
  SET_ERROR: 'AUTH_SET_ERROR'
}

const authActionModule = {

  authConnectAction (): Action {
    return {
      type: AUTH.SET_CONNECTED
    }
  },

  openAuthAction(): Action {
    return {
      type: AUTH.OPEN
    }
  },

  setError(payload: boolean): AuthAction {
    return {
      type: AUTH.SET_ERROR,
      payload
    }
  },

  submitAuthAction(
    sentUser: UserState
  ) {
    return (dispatch: Dispatch<AuthAction>) => {

      let { user = '', pass = '' } = { ...sentUser }

      window.console.log(user)
      axios.get(`/users?user=${user}&pass=${pass}`).then((result: AxiosResponse<UserState[]>) => {

        window.console.log('inside http')
        if (result.data.length) {
          dispatch(authActionModule.authConnectAction())
          dispatch(authActionModule.openAuthAction())
        } else {
          dispatch(authActionModule.setError(true))
        }

      }).catch(err => Promise.reject(err))

    }
  }
}

export default authActionModule
