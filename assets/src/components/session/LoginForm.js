import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import { push } from 'connected-react-router';
import { graphql, gql } from 'react-apollo';
import { Form } from 'antd';

import { Login } from './Login';

const LOGIN_USER_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const mapDispatchToProps = {
  push,
};

export const LoginForm = compose(
  connect(null, mapDispatchToProps),
  graphql(LOGIN_USER_MUTATION, { name: 'loginUserMutation' }),
  Form.create(),
  withState('submitError', 'setSubmitError', ''),
  withHandlers({
    handleSubmit: ({ form, loginUserMutation, setSubmitError, push }) => event => {
      event.preventDefault();
      form.validateFields((error, values) => {
        if (!error) {
          loginUserMutation({
            variables: {
              email: values.userName,
              password: values.password,
            },
          }).then(response => {
            localStorage.setItem('SONGBUZZ_TOKEN', response.data.login.token);
            push('/');
          }).catch(response => {
            setSubmitError('Invalid email or password.');
          });
        }
      });
    }
  }),
)(Login)
