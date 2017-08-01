import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

import { LoginForm } from '../session/LoginForm';

export const PublicLayout = () => (
  <Layout className="layout public-layout">
    <Header className="header">
      header
    </Header>
    <Content className="content">
      <Route path="/login" component={LoginForm} />
    </Content>
    <Footer>
      Matt Raykowski &copy; 2017
    </Footer>
  </Layout>
)
