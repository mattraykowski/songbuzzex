import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { gql } from 'react-apollo';
import { client } from '../../index';
import { SONGBUZZ_TOKEN } from '../../index';

import { types, actions } from '../modules/session';

const LOGIN_MUTATION = gql`
mutation LoginUserMutation($email: String!, $password: String!) {
 login(email: $email, password: $password) {
   token
 }
}
`;

const SIGNUP_MUTATION = gql`
mutation SignupUserMutation($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
 signup(email: $email, password: $password, first_name: $firstName, last_name: $lastName) {
   token
 }
}
`;

const login = variables => client.mutate({
  mutation: LOGIN_MUTATION,
  variables,
}).then(({ data }) => {
  return { token: data.login.token };
}).catch(() => {
  return { loginError: 'Invalid email or password.' };
});

const signup = variables => client.mutate({
  mutation: SIGNUP_MUTATION,
  variables,
}).then(({ data }) => {
  return { token: data.signup.token };
}).catch(() => {
  return { loginError: 'There was a problem signing up, please check your information.' };
});

const logoutLS = () => localStorage.removeItem(SONGBUZZ_TOKEN);
const loginLS = token => localStorage.setItem(SONGBUZZ_TOKEN, token);

export function* loginTask(action) {
  const { email, password } = action.payload;
  const { token, loginError } = yield call(login, {
    email, password,
  });

  if (loginError) {
    yield put(actions.setLoginFailure(loginError));
  } else if (token) {
    yield call(loginLS, token);
    yield put(actions.setLogin(token));
    yield put(push('/'));
  }
}

export function* logoutTask(action) {
  yield call(logoutLS);
  yield put(push('/'));
}

export function* signupTask(action) {
  const { email, password, firstName, lastName } = action.payload;
  const { token, loginError } = yield call(signup, { email, password, firstName, lastName });

  if (loginError) {
    yield put(actions.setLoginFailure(loginError));
  } else if (token) {
    yield call(loginLS, token);
    yield put(actions.setLogin(token));
    yield put(push('/'));
  }
}

export function* watchSessions() {
  yield takeEvery(types.LOGIN, loginTask);
  yield takeEvery(types.LOGOUT, logoutTask);
  yield takeEvery(types.SIGNUP, signupTask);
}
