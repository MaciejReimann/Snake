const { MOVE_FORWARD, ENQUEUE_TURN } = require("../actions/constants");
const possibleDirections = require("./possibleDirections");
const {
  turnIsValid,
  nextHead,
  willCrash,
  willEat,
  placeFood
} = require("./logicHelpers");

module.exports = function(state, action = {}) {
  const { snake, directions, score, food, tempoChangeRate } = state;
  let nextState = {};
  if (action.type === MOVE_FORWARD) {
    // remove first move from the queue
    if (directions.length > 1) {
      nextState.directions = directions.slice(1, directions.length);
    }
    if (willCrash(state)) {
      nextState.isOver = true;
    } else {
      if (willEat(state)) {
        nextState.food = placeFood(state);
        nextState.snake = [nextHead(state)].concat(snake);
        nextState.score = score + snake.length;
        if (food.prop.id % 2 === 0 && tempoChangeRate === 1) {
          nextState.tempoChangeRate = 0.95;
        }
        // let the head be followed by the rest of the snake
      } else {
        nextState.tempoChangeRate = 1;
        nextState.snake = [nextHead(state)]
          .concat(snake)
          .slice(0, snake.length);
      }
    }
  } else if (action.type === ENQUEUE_TURN) {
    const nextDirection = possibleDirections[action.payload];
    if (turnIsValid(state, nextDirection)) {
      nextState.directions = directions.concat(nextDirection);
    }
  }
  return Object.assign(state, nextState);
};
