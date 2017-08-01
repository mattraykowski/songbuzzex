import React from 'react';
import { Alert, Card, Form, Icon, Input, Button, Row, Col } from 'antd';
const FormItem = Form.Item;

const UsernameField = ({ form }) => (
  form.getFieldDecorator('userName', {
    rules: [{ required: true, message: 'Please input your username!' }],
  })(
    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
  )
);

const PasswordField = ({ form }) => (
  form.getFieldDecorator('password', {
    rules: [{ required: true, message: 'Please input your Password!' }],
  })(
    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
  )
);

export const Login = ({ form, handleSubmit, submitError }) => (
  <Row type="flex" justify="space-around" align="middle" className="login-container">
    <Col span={12}>
      <Card title="Login">
        <Form layout="vertical" onSubmit={handleSubmit}>
          {submitError.length > 0 && <Alert message={submitError} type="error" />}
          <FormItem>
            <UsernameField form={form} />
          </FormItem>
          <FormItem>
            <PasswordField form={form} />
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
