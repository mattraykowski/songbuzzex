import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import { Icon } from 'antd';

const MusicPlayer = ({ flyout }) =>
  <div className="player-video-container">
    <span className={classNames('player-video', { 'player-video-flyout': !flyout })}>
      <YouTube
        videoId="DECxluN8OZM"
        opts={{
          playerVars: {
          },
        }}
      />
    </span>
  </div>;

const mapStateToProps = ({ player }) => ({
  flyout: player.flyout,
});

export const MusicPlayerContainer = compose(
  connect(mapStateToProps),
)(MusicPlayer);
