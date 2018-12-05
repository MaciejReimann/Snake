const {
  START_GAME,
  PAUSE_GAME,
  RESUME_GAME,
  CHANGE_INTERVAL
} = require('../actions/constants');
const initialState  = require('../logic/initialState');

module.exports = function(state, action) {
  let nextState = {};
  if(!action) {
    action = {};
  };
  if(action.type === START_GAME) {
    nextState.isStarted = true;
  } else if(action.type === PAUSE_GAME) {
    nextState.isPaused = true;
  } else if(action.type === RESUME_GAME) {
    nextState.isPaused = false;
  } else if(action.type === CHANGE_INTERVAL) {
    nextState.tempo = state.tempo * state.increaseRate;
  };
  return Object.assign(state, nextState)
};
