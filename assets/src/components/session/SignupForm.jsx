import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import { push } from 'connected-react-router';
import { graphql, gql } from 'react-apollo';
import { Form } from 'antd';

import { actions } from '../../redux/modules/session';

import { Signup } from './Signup';

const mapStateToProps = ({ session }) => ({
  loginError: session.loginError,
});

const mapDispatchToProps = {
  signup: actions.signup,
};

export const SignupForm = compose(
  connect(mapStateToProps, mapDispatchToProps),
  Form.create(),
  withHandlers({
    handleSubmit: ({ form, signup }) => event => {
      event.preventDefault();
      form.validateFields((error, values) => {
        if (!error) {
          signup(values.email, values.password);
        }
      });
    }
  }),
)(Signup)
