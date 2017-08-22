import { Record } from 'immutable';
export const types = {
  SET_PLAYER_STATE: '@songbuzz/player/SET_PLAYER_STATE',
  SET_FLYOUT: '@songbuzz/player/SET_FLYOUT',
  SET_REQUESTED_STATE: '@songbuzz/player/SET_REQUESTED_STATE',
};

export const actions = {
  setFlyout: flyout => ({ type: types.SET_FLYOUT, payload: flyout }),
  setRequestedState: state => ({ type: types.SET_REQUESTED_STATE, payload: state }),
  setPlayerState: state => ({ type: types.SET_PLAYER_STATE, payload: state }),
};

export const PLAYER_STATES = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
}

export const State = Record({
  flyout: false,
  requestedPlayerState: PLAYER_STATES.UNSTARTED,
  playerState: PLAYER_STATES.UNSTARTED,
});

export const player = (state = State(), { type, payload }) => {
  switch(type) {
    case types.SET_FLYOUT:
      return state.set('flyout', payload );
    case types.SET_REQUESTED_STATE:
      return state.set('requestedPlayerState', payload);
    case types.SET_PLAYER_STATE:
      return state
        .set('requestedPlayerState', payload)
        .set('playerState', payload);
    default:
      return state;
  }
};
