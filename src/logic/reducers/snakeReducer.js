const { MOVE_FORWARD, ENQUEUE_TURN } = require("../actions/constants");
const { getLastItem } = require("../helpers/arrayHelpers");
const possibleDirections = require("./possibleDirections");
const Snake = require("./logicHelpers");

module.exports = function(state, action = {}) {
  const { type, payload } = action;
  const { eats, crashes, moves, grows } = Snake(state);
  let nextState = {};
  if (type === MOVE_FORWARD) {
    if (state.directions.length > 1) {
      nextState.directions = state.directions.slice(1, state.directions.length);
    }
    if (crashes()) {
      nextState.isOver = true;
    } else {
      if (eats()) {
        nextState = grows(nextState);
      } else {
        nextState = moves(nextState);
      }
    }
  } else if (type === ENQUEUE_TURN) {
    const nextDirection = possibleDirections[payload];
    const isTurnValid =
      nextDirection.x + getLastItem(state.directions).x !== 0 ||
      nextDirection.y + getLastItem(state.directions).y !== 0;
    if (isTurnValid) {
      nextState.directions = state.directions.concat(nextDirection);
    }
  }
  return Object.assign(state, nextState);
};
