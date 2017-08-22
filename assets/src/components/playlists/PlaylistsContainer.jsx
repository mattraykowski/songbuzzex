import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { gql, graphql } from 'react-apollo';
import { Row, Col, Card, Button, Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

import { actions as playerActions } from '../../redux/modules/player';

const GET_PLAYLISTS_QUERY = gql`
  query GetPlaylistsQuery {
    musicPlaylists {
      id
      title
    }
  }
`;

const CREATE_PLAYLIST_MUTATION = gql`
  mutation CreatePlaylistMutation($title: String!) {
    createMusicPlaylist(title: $title) {
      id
      title
    }
  }
`

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = { playlistModalVisible: false };

    this.toggleAddPlaylist = this.toggleAddPlaylist.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
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

  handleCreate() {
    const { form, createPlaylist, myPlaylists } = this.props;

    form.validateFields((error, { title }) => {
      if (error) {
        return;
      }

      createPlaylist({
        variables: {
          title,
        },
      }).then(() => {
        this.setState({ playlistModalVisible: false });
        form.resetFields();
        myPlaylists.refetch();
      });
    });
  }

  render() {
    const { myPlaylists } = this.props;
    const { getFieldDecorator } = this.props.form;

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
            onOk={this.handleCreate}
          >
            <Form layout="vertical">
              <FormItem label="Playlist Title">
                {getFieldDecorator('title', {
                   rules: [{ required: true, message: "Please enter a playlist title." }],
                })(<Input />)}
              </FormItem>
            </Form>
          </Modal>
          <div className="playlists">
            {!myPlaylists.loading &&
             myPlaylists.musicPlaylists.map(playlist => <div key={playlist.id}>{playlist.title}</div>)}
            {!myPlaylists.loading && myPlaylists.musicPlaylists.length < 1 &&
              <div className="no-data">
                <h3>You have no playlists!</h3>
                <p>Try creating a new playlist and adding songs to it.</p>
                <Button type="dashed" size="large" onClick={this.toggleAddPlaylist}>Create Playlist</Button>
              </div>}
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
  graphql(CREATE_PLAYLIST_MUTATION, { name: 'createPlaylist' }),
  Form.create(),
)(Playlists);
