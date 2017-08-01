import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

import { LoginForm } from '../session/LoginForm';
import { Home } from '../pages/Home';

import logo from '../../images/logo.svg';

export const PublicLayout = () => (
  <Layout className="layout public-layout">
    <Header className="header">
      <img className="logo-item" src={logo} />
    </Header>
    <Content className="content">
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/" component={Home} />
      </Switch>
    </Content>
    <Footer>
      Matt Raykowski &copy; 2017
    </Footer>
  </Layout>
)
