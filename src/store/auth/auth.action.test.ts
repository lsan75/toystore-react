
import authActionModule, { AUTH } from './auth.action'

import mockAxios from 'jest-mock-axios'

describe('authActions', () => {

  const dispatch = jest.fn()

  afterEach(() => mockAxios.reset())

  it('should connect', () => {
    const result = authActionModule.authConnectAction()
    expect(result).toEqual({
      type: AUTH.SET_CONNECTED
    })
  })

  it('should open', () => {
    const result = authActionModule.openAuthAction()
    expect(result).toEqual({
      type: AUTH.OPEN
    })
  })

  it('should set error', () => {
    const result = authActionModule.setError(true)
    expect(result).toEqual({
      type: AUTH.SET_ERROR,
      payload: true
    })
  })

  it.only('should submit auth and get data', () => {

    authActionModule.authConnectAction = jest.fn(() => true)

    const params = {
      user: 'toto',
      pass: 'tutu'
    }
    authActionModule.submitAuthAction(params)(dispatch)

    mockAxios.mockResponse({ data: [ 1 ] })

    expect(mockAxios.get).toBeCalledWith('/users?user=toto&pass=tutu')
    expect(dispatch).toBeCalledWith( authActionModule.authConnectAction() )
    expect(dispatch).toBeCalledWith( authActionModule.openAuthAction() )

    expect(authActionModule.authConnectAction).toBeCalled()
  })

  it('should submit auth and get no data', () => {

    authActionModule.submitAuthAction({
      user: 'toto',
      pass: 'tutu'
    })(dispatch)

    mockAxios.mockResponse({ data: [] })

    expect(mockAxios.get).toBeCalledWith('/users?user=toto&pass=tutu')
    expect(dispatch).toBeCalledWith( authActionModule.setError(true) )

  })

})
