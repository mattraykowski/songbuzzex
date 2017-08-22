import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import { PLAYER_STATES, actions } from '../../redux/modules/player';

const MusicPlayerControls = ({ onPlay, onPause, playerState }) =>
  <div className="music-player">
    <Icon
      className="vcr-control"
      type="step-backward"
    />
    {playerState !== PLAYER_STATES.PLAYING &&
      <Icon
        className="vcr-control"
        type="caret-right"
        onClick={onPlay}
      />}
    {playerState === PLAYER_STATES.PLAYING &&
      <Icon
        className="vcr-control"
        type="pause"
        onClick={onPause}
      />}
    <Icon
      className="vcr-control"
      type="step-forward"
    />
  </div>;

const mapStateToProps = state => ({
  playerState: state.player.playerState,
});
const mapDispatchToProps = {
  setRequestedState: actions.setRequestedState,
};

export const MusicPlayerControlsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onPlay: ({ setRequestedState }) => event => setRequestedState(PLAYER_STATES.PLAYING),
    onPause: ({ setRequestedState }) => event => setRequestedState(PLAYER_STATES.PAUSED),
  }),
)(MusicPlayerControls);
