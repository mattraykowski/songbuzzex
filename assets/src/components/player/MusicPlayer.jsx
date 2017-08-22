import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import { Row, Col, Icon } from 'antd';

import { PLAYER_STATES, actions } from '../../redux/modules/player';

const playerClass = (mainClass, flyout) => classNames(mainClass, { 'flyout': !flyout })

class MusicPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = { ytPlayer: null };

    this.onReady = this.onReady.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // If the requested player state has changed and is not what the player
    // is currently doing.
    if (nextProps.requestedPlayerState !== this.props.requestedPlayerState &&
        nextProps.requestedPlayerState !== this.props.playerState) {

      switch (nextProps.requestedPlayerState) {
        case PLAYER_STATES.PLAYING:
          this.state.ytPlayer.playVideo();
          break;
        case PLAYER_STATES.PAUSED:
          this.state.ytPlayer.pauseVideo();
          break;
        default:
          window.console.log('Invalid requested player state!');
      }
    }
  }

  onReady(event) {
    this.setState({ ytPlayer: event.target });
  }

  onStateChange(event) {
    // Whenever the player state changes make sure that the current states are correct.
    this.props.setPlayerState(event.data);
  }

  render() {
    const { flyout } = this.props;

    return (
      <Row>
        <Col className={playerClass('player-background', flyout)}>
          <div className="player-video-container">
            <span className={playerClass('player-video', flyout)}>
              <YouTube
                videoId="DECxluN8OZM"
                onReady={this.onReady}
                onStateChange={this.onStateChange}
                opts={{
                  playerVars: {
                    controls: 0,
                  },
                }}
              />
            </span>
          </div>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({ player }) => ({
  flyout: player.flyout,
  playerState: player.playerState,
  requestedPlayerState: player.requestedPlayerState,
});

const mapDispatchToProps = {
  setPlayerState: actions.setPlayerState,
};

export const MusicPlayerContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MusicPlayer);
