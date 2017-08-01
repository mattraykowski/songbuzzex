import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects'
import { client } from '../../index';

import { types, actions } from '../modules/session';

export function* loginTask(action) {
  const { email, password } = action.payload;
}

export function* watchSessions() {
  yield takeEvery(types.LOGIN, loginTask);
}
