import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
// import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { persistState } from 'redux-devtools';

import reducers from '../redux/reducers';
// import { sagas } from '../redux/sagas';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

export default function configureStore(history, client) {
  // const sagaMiddleware = createSagaMiddleware();
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
    applyMiddleware(client.middleware(),
                    routerMiddleware(history),
                    /*, sagaMiddleware*/
                    loggerMiddleware),
    persistState()
  );
  const combined = combineReducers({
    ...reducers,
    apollo: client.reducer(),
  })
  const store = createStore(connectRouter(history)(combined), enhancer);
  // sagaMiddleware.run(sagas);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../redux/reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('../redux/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
