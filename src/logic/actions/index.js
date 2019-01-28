const {
  startGame,
  pauseGame,
  resumeGame,
  controlInterval
} = require("./loopActions");
const { moveForward, enqueueTurn } = require("./snakeActions");
const { resizeBoard } = require("./viewActions");

module.exports = {
  startGame,
  pauseGame,
  resumeGame,
  controlInterval,
  moveForward,
  enqueueTurn,
  resizeBoard
};
