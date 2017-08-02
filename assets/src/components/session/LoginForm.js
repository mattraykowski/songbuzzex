import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import { push } from 'connected-react-router';
import { graphql, gql } from 'react-apollo';
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
  withHandlers({
    handleSubmit: ({ form, login }) => event => {
      event.preventDefault();
      form.validateFields((error, values) => {
        if (!error) {
          login(values.email, values.password);
        }
      });
    }
  }),
)(Login)
