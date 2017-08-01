import { watchSessions } from './sagas/sessions';

export function* sagas() {
  yield [
    watchSessions(),
  ]
}
