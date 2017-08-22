import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, matchPath  } from 'react-router-dom';

import { Layout, Menu, Icon, Button, Row, Col } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

import { actions } from '../../redux/modules/session';
import LinkContainer from '../shared/LinkContainer';
import { ProfileContainer } from '../profile/Profile';
import { MusicPlayerContainer } from '../player/MusicPlayer';
import { MusicPlayerControlsContainer } from '../player/MusicPlayerControls';
import { PlaylistsContainer } from '../playlists/PlaylistsContainer';
import { PlaylistContainer } from '../playlists/PlaylistContainer';

import logo from '../../images/logo.svg';

export const AuthenticatedLayout = props => {
  const { sidebarCollapsed, toggleSidebar, selectedKeys, logout } = props;
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
                <Icon type="api" />
                <span>Dashboard</span>
              </div>
            </LinkContainer>
          </MenuItem>
          <MenuItem key="/playlists">
            <LinkContainer to="/playlists">
              <div>
                <Icon type="bars" />
                <span>Playlists</span>
              </div>
            </LinkContainer>
          </MenuItem>
          <SubMenu
            key="/profile"
            title={<span><Icon type="user" /><span>My Account</span></span>}
          >
            <MenuItem key="/profile">
              <LinkContainer to="/profile">
                <div>
                  <span>My Profile</span>
                </div>
              </LinkContainer>
            </MenuItem>
            <MenuItem key="logout" >
              <span onClick={() => logout()}>Logout</span>
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header className="header">
          <Icon
            className="sider-toggle"
            type={sidebarCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggleSidebar}
          />
          <MusicPlayerControlsContainer />
        </Header>
        <Content className="content">
          <Row type="flex" style={{ width: '100%' }}>
            <Col xs={{ span: 24, order: 2 }} sm={{ span: 8, order: 1 }}>
              <Route path="/playlists" component={PlaylistsContainer} />
            </Col>
            <Col xs={{ span: 24, order: 1 }} sm={{ span: 16, order: 2 }}>
              <MusicPlayerContainer />
              <Row>
                <Col xs={24}>
                  <Route path="/playlists/:playlistId" component={PlaylistContainer} />
                </Col>
              </Row>
            </Col>
            <Col xs={{ span: 24, order: 1, push: 8}} >
              <Switch>
                <Route path="/profile" component={ProfileContainer} />
                <Route exact path="/" component={() => <div>Authenticated content.</div>} />
              </Switch>
            </Col>
          </Row>
        </Content>
        <Footer>
          Matt Raykowski &copy; 2017
        </Footer>
      </Layout>
    </Layout>);
};

const mapDispatchToProps = {
  logout: actions.logout,
};

export const AuthenticatedLayoutContainer = compose(
  withRouter,
  connect(null, mapDispatchToProps),
  withState('sidebarCollapsed', 'setSidebarCollapsed', true),
  withHandlers({
    toggleSidebar: ({ setSidebarCollapsed, sidebarCollapsed }) => () => {
      setSidebarCollapsed(!sidebarCollapsed);
    },
    selectedKeys: props => () => {
      const keys = [];
      const location = props.location ? props.location.pathname : '';
      const paths = [
        '/playlists',
        '/profile',
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
