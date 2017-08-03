import React, { Component } from 'react';
import { Alert, Card, Form, Icon, Input, Button, Row, Col } from 'antd';
const FormItem = Form.Item;

export class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { form, login } = this.props;

    event.preventDefault();
    form.validateFields((error, values) => {
      if (!error) {
        login(values.email, values.password);
      }
    });
  }

  render() {
    const { form, loginError } = this.props;
    return (
      <Row type="flex" justify="space-around" align="middle" className="login-container">
        <Col span={12}>
          <Card title="Login">
            <Form layout="vertical" onSubmit={this.handleSubmit}>
              {loginError.length > 0 && <Alert message={loginError} type="error" />}
              <FormItem hasFeedback>
                {form.getFieldDecorator('email', {
                   rules: [{ required: true, message: 'Please input your email address!' }],
                })(
                   <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Email Address" />
                 )}
              </FormItem>
              <FormItem>
                {form.getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                <a className="login-form-forgot" href="">Forgot password</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                <a className="login-form-forgot" href="">Sign Up</a>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>);
  }
}
