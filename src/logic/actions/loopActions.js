const { dispatch, getState } = require("../../store");
const { tempo } = require("../reducers/initialState");
const {
  START_GAME,
  PAUSE_GAME,
  RESUME_GAME,
  CONTROL_INTERVAL
} = require("./constants");
const { moveForward } = require("./snakeActions");
const Gameloop = require("../helpers/Gameloop");
// Initialize gameloop with a callback to be fired on each loop
const gameloop = Gameloop(tempo, () =>
  moveForward(() => controlInterval(getState().tempo))
);

function startGame() {
  gameloop.start();
  return dispatch({
    type: START_GAME
  });
}

function pauseGame() {
  gameloop.stop();
  return dispatch({
    type: PAUSE_GAME
  });
}

function resumeGame() {
  gameloop.start();
  return dispatch({
    type: RESUME_GAME
  });
}

function controlInterval(rate) {
  gameloop.changeInterval(rate);
  return dispatch({
    type: CONTROL_INTERVAL
  });
}

module.exports = {
  startGame,
  pauseGame,
  resumeGame,
  controlInterval
};
