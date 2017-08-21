import React from 'react';
import { compose } from 'recompose';

const MusicPlayerControls = () =>
  <div className="music-player">
    <Icon
      className="vcr-control"
      type="step-backward"
    />
    <Icon
      className="vcr-control"
      type="caret-right"
    />
    <Icon
      className="vcr-control"
      type="step-forward"
    />
  </div>;

export const MusicPlayerControlsContainer = compose()(MusicPlayerControls);
