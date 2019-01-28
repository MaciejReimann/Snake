const {
  START_GAME,
  PAUSE_GAME,
  RESUME_GAME,
  CONTROL_INTERVAL
} = require("../actions/constants");
const initialState = require("./initialState");

module.exports = function(state, action = {}) {
  let nextState = {};
  if (action.type === START_GAME) {
    if (state.isOver) {
      return initialState;
    }
    nextState.isStarted = true;
  } else if (action.type === PAUSE_GAME) {
    nextState.isPaused = true;
  } else if (action.type === RESUME_GAME) {
    nextState.isPaused = false;
  } else if (action.type === CONTROL_INTERVAL) {
    nextState.tempo = state.tempo * state.tempoChangeRate;
  }
  return Object.assign(state, nextState);
};
