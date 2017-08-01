import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import '../main.scss';
import { types, actions } from '../redux/modules/session';
import { PublicLayout } from './layouts/PublicLayout';
import { AuthenticatedLayoutContainer } from './layouts/AuthenticatedLayout';

class Root extends Component {
  componentWillMount() {
    const token = localStorage.getItem('SONGBUZZ_TOKEN');
    if (token) {
      this.props.setLogin(token);
    }
  }

  render() {
    window.console.log('auth?', this.props.authenticated);
    return (
      <ConnectedRouter history={this.props.history}>
        {
          this.props.authenticated ?
          <AuthenticatedLayoutContainer /> :
          <PublicLayout />
        }
      </ConnectedRouter>
    )
  }
}

const mapStateToProps = ({ session }) => ({
  loggingIn: session.loggingIn,
  authenticated: session.authenticated,
});
const mapDispatchToProps = {
  setLogin: actions.setLogin,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Root);
