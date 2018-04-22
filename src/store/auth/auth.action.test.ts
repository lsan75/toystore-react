import * as authActions from './auth.action'
import { AUTH } from './auth.action'

import mockAxios from 'jest-mock-axios'

describe('authActions', () => {

  const dispatch = jest.fn()

  afterEach(() => mockAxios.reset())

  it('should connect', () => {
    const result = authActions.authConnectAction()
    expect(result).toEqual({
      type: AUTH.SET_CONNECTED
    })
  })

  it('should open', () => {
    const result = authActions.openAuthAction()
    expect(result).toEqual({
      type: AUTH.OPEN
    })
  })

  it('should set error', () => {
    const result = authActions.setError(true)
    expect(result).toEqual({
      type: AUTH.SET_ERROR,
      payload: true
    })
  })

  it('should submit auth and get data', () => {

    authActions.submitAuthAction({
      user: 'toto',
      pass: 'tutu'
    })(dispatch)

    mockAxios.mockResponse({ data: [ 1 ] })

    expect(mockAxios.get).toBeCalledWith('/users?user=toto&pass=tutu')
    expect(dispatch).toBeCalledWith( authActions.authConnectAction() )
    expect(dispatch).toBeCalledWith( authActions.openAuthAction() )

  })

  it('should submit auth and get no data', () => {

    authActions.submitAuthAction({
      user: 'toto',
      pass: 'tutu'
    })(dispatch)

    mockAxios.mockResponse({ data: [] })

    expect(mockAxios.get).toBeCalledWith('/users?user=toto&pass=tutu')
    expect(dispatch).toBeCalledWith( authActions.setError(true) )

  })
})
