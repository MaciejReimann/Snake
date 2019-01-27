const {
  startGame,
  pauseGame,
  resumeGame,
  changeInterval
} = require("./loopActions");
const { moveForward, enqueueTurn } = require("./loopActions");
const { resizeBoard } = require("./viewActions");

module.exports = {
  startGame,
  pauseGame,
  resumeGame,
  changeInterval,
  moveForward,
  enqueueTurn,
  resizeBoard
};
