import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Route, Switch, withRouter, matchPath  } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
const MenuItem = Menu.Item;
import LinkContainer from '../shared/LinkContainer';
import logo from '../../images/logo.svg';

window.console.log(logo);
export const AuthenticatedLayout = props => {
  const { sidebarCollapsed, toggleSidebar, selectedKeys } = props;
  return (
    <Layout className="authenticated-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={sidebarCollapsed}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys()}
          defaultSelectedKeys={['/']}
        >
          <MenuItem className="logo-menu" key="logo" disabled>
            <img className="logo-item" src={logo} />
          </MenuItem>
          <MenuItem key="/">
            <LinkContainer to="/">
              <div>
                <Icon type="user" />
                <span>Dash</span>
              </div>
            </LinkContainer>
          </MenuItem>
          <MenuItem key="/playlists">
            <LinkContainer to="/playlists">
              <div>
                <Icon type="video-camera" />
                <span>Playlists</span>
              </div>
            </LinkContainer>
          </MenuItem>
          <MenuItem key="3">
            <Icon type="upload" />
            <span>Nav 3</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header className="header">
          <Icon
            className="sider-toggle"
            type={sidebarCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggleSidebar}
          />
        </Header>
        <Content>
          <Switch>
            <Route path="/playlists" component={() => <div>My Playlists!</div>} />
            <Route exact path="/" component={() => <div>Authenticated content.</div>} />
          </Switch>
        </Content>
        <Footer>
          Matt Raykowski &copy; 2017
        </Footer>
      </Layout>
    </Layout>);
};

export const AuthenticatedLayoutContainer = compose(
  withRouter,
  withState('sidebarCollapsed', 'setSidebarCollapsed', false),
  withHandlers({
    toggleSidebar: ({ setSidebarCollapsed, sidebarCollapsed }) => () => {
      setSidebarCollapsed(!sidebarCollapsed);
    },
    selectedKeys: props => () => {
      const keys = [];
      const location = props.location ? props.location.pathname : '';
      const paths = [
        '/playlists',
      ];

      // Handle the root path.
      if (matchPath(location, {
        path: '/',
        exact: true,
      })) {
        keys.push('/');
      }

      // Loop over the other paths.
      paths.forEach(path => {
        if (matchPath(location, {
          path
        })) {
          keys.push(path);
        }
      });

      return keys;
    }
  })
)(AuthenticatedLayout);
