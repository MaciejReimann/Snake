const { MOVE_FORWARD, ENQUEUE_TURN } = require("../actions/constants");
const { directions } = require("./directions");
const {
  turnIsValid,
  nextHead,
  willCrash,
  willEat,
  placeFood
} = require("./logicHelpers");

module.exports = function(state, action = {}) {
  let nextState = {};
  if (action.type === MOVE_FORWARD) {
    const { directions } = state;
    // remove last move from the queue
    if (directions.length > 1) {
      nextState.directions = directions.slice(1, directions.length);
    }
    // check for game over condition
    if (willCrash(state)) {
      nextState.isOver = true;
    } else {
      // place new food if food eaten and make the snake longer
      if (willEat(state)) {
        nextState.food = placeFood(state);
        nextState.snake = [nextHead(state)].concat(state.snake);
        nextState.score = state.score + state.snake.length;
        if (state.food.prop.id % 2 === 0 && state.tempoChangeRate === 1) {
          nextState.tempoChangeRate = 0.95;
        }

        // let the head be followed by the rest of the snake
      } else {
        nextState.tempoChangeRate = 1;
        nextState.snake = [nextHead(state)]
          .concat(state.snake)
          .slice(0, state.snake.length);
      }
    }
  } else if (action.type === ENQUEUE_TURN) {
    const nextDirection = directions[action.payload];
    if (turnIsValid(state, nextDirection)) {
      nextState.directions = state.directions.concat(nextDirection);
    }
  }

  return Object.assign(state, nextState);
};
