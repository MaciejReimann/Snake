const {
  START_GAME,
  PAUSE_GAME,
  CHANGE_INTERVAL
} = require('../actions/constants');

module.exports = function(state, action) {
  let nextState = {};
  if(!action) {
    action = {};
  };

  if(action.type === START_GAME) {
    console.log("Game started from the reducer")
    nextState.started = true;
    nextState.paused = false;
  } else if(action.type === PAUSE_GAME) {
    console.log("Game paused from the reducer")
    nextState.paused = true;
  } else if(action.type === CHANGE_INTERVAL) {
    nextState.tempo = state.tempo * state.increaseRate;
  }
  return Object.assign(state, nextState)
};
