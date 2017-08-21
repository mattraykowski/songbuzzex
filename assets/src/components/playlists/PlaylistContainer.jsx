import React from 'react';
import { compose } from 'recompose';

const Playlist = () =>
  <div>
    <ul>
      <li>Song item here.</li>
      <li>Song item here.</li>
      <li>Song item here.</li>
      <li>Song item here.</li>
      <li>Song item here.</li>
      <li>Song item here.</li>
      <li>Song item here.</li>
      <li>Song item here.</li>
      <li>Song item here.</li>
      <li>Song item here.</li>
      <li>Song item here.</li>
      <li>Song item here.</li>
    </ul>
  </div>;

export const PlaylistContainer = compose()(Playlist);
