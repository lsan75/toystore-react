import { defaultAuthReducer, authReducer } from './auth.reducer';
import { AUTH } from './auth.action';

describe('authReducer', () => {

  it('should set connected', () => {
    const result = authReducer(defaultAuthReducer, { type: AUTH.SET_CONNECTED } );
    expect(result).toEqual({
      isConnected: true,
      isOpened: false,
      isError: false
    });
  });

  it('should open', () => {
    const result = authReducer(defaultAuthReducer, { type: AUTH.OPEN } );
    expect(result).toEqual({
      isConnected: false,
      isOpened: true,
      isError: false
    });
  });

  it('should set error', () => {
    const result = authReducer(defaultAuthReducer, { type: AUTH.SET_ERROR, payload: true } );
    expect(result).toEqual({
      isConnected: false,
      isOpened: false,
      isError: true
    });
  });

});
