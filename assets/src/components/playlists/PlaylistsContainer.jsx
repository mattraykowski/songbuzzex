import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { gql, graphql } from 'react-apollo';
import { Row, Col, Card } from 'antd';

import { actions as playerActions } from '../../redux/modules/player';

const GET_PLAYLISTS_QUERY = gql`
  query GetPlaylistsQuery {
    musicPlaylists {
      id
      title
    }
  }
`;

const Playlists = ({ myPlaylists }) => {
  window.console.log(myPlaylists);
  return(
    <div>
      <Card title="Playlists">
        <div className="playlists">
          {myPlaylists.loading && <div>Loading</div>}
          {!myPlaylists.loading &&
           <ul>
             {myPlaylists && myPlaylists.musicPlaylists.map(playlist => <li key={playlist.id}>{playlist.title}</li>)}
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
          }
        </div>
      </Card>

        </div>
  );
}

const mapDispatchToProps = {
  setFlyout: playerActions.setFlyout,
};

export const PlaylistsContainer = compose (
  connect(null, mapDispatchToProps),
  graphql(GET_PLAYLISTS_QUERY, { name: 'myPlaylists' }),
  lifecycle({
    componentWillMount() {
      this.props.setFlyout(true);
    },

    componentWillUnmount() {
      this.props.setFlyout(false);
    },
  }),
)(Playlists);
