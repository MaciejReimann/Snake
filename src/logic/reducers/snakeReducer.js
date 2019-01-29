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
    const { snake, directions, score, food, tempoChangeRate, isOver } = state;
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
    const nextDirection = directions[action.payload];
    if (turnIsValid(state, nextDirection)) {
      nextState.directions = state.directions.concat(nextDirection);
    }
  }
  return Object.assign(state, nextState);
};
