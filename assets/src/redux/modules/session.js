export const types = {
  LOGIN: '@songbuzz/session/LOGIN',
  LOGOUT: '@songbuzz/session/LOGOUT',
  SIGNUP: '@songbuzz/session/SIGNUP',
  SET_LOGIN: '@songbuzz/session/SET_LOGIN',
  SET_LOGIN_FAILURE: '@songbuzz/session/SET_LOGIN_FAILURE',
};

export const actions = {
  login: (email, password) => ({ type: types.LOGIN, payload: { email, password } }),
  logout: () => ({ type: types.LOGOUT }),
  signup: (email, password, firstName, lastName) => 
    ({ type: types.SIGNUP, payload: { email, password, firstName, lastName } }),
  setLogin: token => ({ type: types.SET_LOGIN, payload: token }),
  setLoginFailure: () => ({ type: types.SET_LOGIN_FAILURE }),
};

export const defaultState = {
  loginError: '',
  loggingIn: false,
  authenticated: false,
  token: null,
};

export const session = (state = defaultState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, loggingIn: true, loginError: '' };
    case types.LOGOUT:
      return {
        ...state,
        loggingIn: false,
        authenticated: false,
        loginError: ''
      };
    case types.SET_LOGIN:
      return {
        ...state,
        loggingIn: false,
        authenticated: true,
        loginError: '',
        token: action.payload
      };
    case types.SET_LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        authenticated: false,
        loginError: 'Invalid email or password, please try again.',
        token: null,
      };
    default:
      return state;
  }
}
