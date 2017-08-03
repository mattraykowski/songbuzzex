import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { push } from 'connected-react-router';
import { Form } from 'antd';

import { actions } from '../../redux/modules/session';

import { Login } from './Login';

const mapStateToProps = ({ session }) => ({
  loginError: session.loginError,
});

const mapDispatchToProps = {
  login: actions.login,
};

export const LoginForm = compose(
  connect(mapStateToProps, mapDispatchToProps),
  Form.create(),
)(Login)
