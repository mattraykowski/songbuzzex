export const types = {
  SET_FLYOUT: '@songbuzz/player/SET_FLYOUT',
};

export const actions = {
  setFlyout: flyout => ({ type: types.SET_FLYOUT, payload: flyout })
};

export const defaultState = {
  flyout: false,
};

export const player = (state = defaultState, { type, payload }) => {
  switch(type) {
    case types.SET_FLYOUT:
      return { ...state, flyout: payload }
    default:
      return state;
  }
};
