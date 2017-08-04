import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
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
)(Signup)
