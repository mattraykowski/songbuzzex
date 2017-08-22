import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { gql, graphql } from 'react-apollo';
import { Row, Col, Card, Button, Modal, Form, Input } from 'antd';

import { actions as playerActions } from '../../redux/modules/player';

const GET_PLAYLISTS_QUERY = gql`
  query GetPlaylistsQuery {
    musicPlaylists {
      id
      title
    }
  }
`;

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = { playlistModalVisible: false };

    this.toggleAddPlaylist = this.toggleAddPlaylist.bind(this);
  }

  componentWillMount() {
    this.props.setFlyout(true);
  }

  componentWillUnmount() {
    this.props.setFlyout(false);
  }

  toggleAddPlaylist() {
    this.setState({ playlistModalVisible: !this.state.playlistModalVisible });
  }

  render() {
    const { myPlaylists } = this.props;
    return(
      <div>
        <Card
          loading={myPlaylists.loading}
          title="Playlists"
          extra={
            <Button shape="circle" icon="plus" type="dashed" size="small" onClick={this.toggleAddPlaylist} />
          }
        >
          <Modal
            title="Create new Playlist"
            visible={this.state.playlistModalVisible}
            onCancel={this.toggleAddPlaylist}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
          <div className="playlists">
            <ul>
              {myPlaylists.musicPlaylists && myPlaylists.musicPlaylists.map(playlist => <li key={playlist.id}>{playlist.title}</li>)}
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
              <li>Line lkjsdflkjsaflkj ldsjfljks</li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setFlyout: playerActions.setFlyout,
};

export const PlaylistsContainer = compose (
  connect(null, mapDispatchToProps),
  graphql(GET_PLAYLISTS_QUERY, { name: 'myPlaylists' }),
  Form.create(),
)(Playlists);
