import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createBrowserHistory } from 'history';

import configureStore from './store';

import Root from './components/Root';

export const SONGBUZZ_TOKEN = 'SONGBUZZ_TOKEN';

const history = createBrowserHistory();
const networkInterface = createNetworkInterface({ uri: '/graph' });
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      const token = localStorage.getItem(SONGBUZZ_TOKEN);
      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();
    }
  }
]);
export const client = new ApolloClient({
  networkInterface
});

const store = configureStore(history, client);
const target = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <ApolloProvider store={store} client={client}>
      <Root history={history} />
    </ApolloProvider>,
    target
  );
}

render();

if (module.hot) module.hot.accept('./components/Root', render);
