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

const login = variables => client.mutate({
  mutation: LOGIN_MUTATION,
  variables,
}).then(({ data }) => {
  return { token: data.login.token };
}).catch(() => {
  return { loginError: 'Invalid email or password.' };
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

export function* watchSessions() {
  yield takeEvery(types.LOGIN, loginTask);
  yield takeEvery(types.LOGOUT, logoutTask);
}
