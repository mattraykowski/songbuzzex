import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Card, Form, Icon, Input, Button, Row, Col } from 'antd';
const FormItem = Form.Item;

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);

    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
  }

  handleSubmit(event) {
    const { form, signup } = this.props;
    event.preventDefault();
    form.validateFields((error, values) => {
      if (!error) {
        signup(values.email, values.password, values.firstName, values.lastName);
      }
    });
  }

  handleConfirmBlur(event) {
    const value = event.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('The passwords do not match!');
    } else {
      callback();
    }
  }

  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { form, loginError } = this.props;
    return (
      <Row type="flex" justify="space-around" align="middle" className="login-container">
        <Col span={12}>
          <Card title="Signup">
            <Form layout="vertical" onSubmit={this.handleSubmit}>
              {loginError.length > 0 && <Alert message={loginError} type="error" />}
              <FormItem>
                {
                  form.getFieldDecorator('email', {
                    rules: [
                      { required: true, message: 'Please input your email address!' },
                      { type: 'email', message: 'The input is not valid E-mail!' },
                    ],
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Email Address" />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  form.getFieldDecorator('firstName', {
                    rules: [{ required: true, message: 'Please input your first name!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="First Name" />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  form.getFieldDecorator('lastName', {
                    rules: [{ required: true, message: 'Please input your last name!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Last Name" />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  form.getFieldDecorator('password', {
                    rules: [
                      { required: true, message: 'Please enter your password!' },
                      { validator: this.checkConfirm },
                    ],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  form.getFieldDecorator('passwordConfirm', {
                    rules: [
                      { required: true, message: 'Please confirm your Password!' },
                      { validator: this.checkPassword },
                    ],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Confirm password" onBlur={this.handleConfirmBlur} />
                  )
                }
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Sign Up
                </Button>
                <Link className="login-form-forgot" to="/login">Already have an account?</Link>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>);
  }
} 
