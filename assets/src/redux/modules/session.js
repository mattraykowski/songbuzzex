export const types = {
  LOGIN: '@songbuzz/session/LOGIN',
  SET_LOGIN: '@songbuzz/session/SET_LOGIN',
};

export const actions = {
  login: (email, password) => ({ type: types.LOGIN, payload: { email, password } }),
  setLogin: token => ({ type: types.SET_LOGIN, payload: token }),
};

export const defaultState = {
  loggingIn: false,
  authenticated: false,
  token: null,
};

export const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, loggingIn: true };
    case types.SET_LOGIN:
      return { ...state, loggingIn: false, authenticated: true, token: action.payload };
    default:
      return state;
  }
}
