const {
  createPoint,
  createRandomPoint,
  arePointsEqual
} = require("../helpers/pointHelpers");

module.exports = function Snake(state) {
  const {
    boardWidth,
    boardHeight,
    resolution,
    directions,
    snake,
    score,
    tempoChangeRate,
    food
  } = state;

  function _moveHead() {
    const mod = (x, y) => ((y % x) + x) % x; // http://bit.ly/2oF4mQ7
    return createPoint(
      mod(boardWidth / resolution, snake[0].x + directions[0].x),
      mod(boardHeight / resolution, snake[0].y + directions[0].y)
    );
  }

  function _placeFood(state) {
    const nextId = food.prop.id + 1;
    const newFood = createRandomPoint(
      boardWidth / resolution,
      boardHeight / resolution,
      {
        id: nextId
      }
    );
    if (state.snake.some(p => arePointsEqual(newFood, p))) {
      _placeFood(state);
    }
    return newFood;
  }

  function crashes() {
    return snake.find(p => arePointsEqual(p, _moveHead(state)));
  }

  function eats() {
    return arePointsEqual(_moveHead(state), food);
  }

  function moves(nextState) {
    return Object.assign(nextState, {
      tempoChangeRate: 1,
      snake: [_moveHead(state)].concat(snake).slice(0, snake.length)
    });
  }

  function grows(nextState) {
    if (food.prop.id % 2 === 0 && tempoChangeRate === 1) {
      nextState.tempoChangeRate = 0.95;
    }
    return Object.assign(nextState, {
      food: _placeFood(state),
      snake: [_moveHead(state)].concat(snake),
      score: score + snake.length
    });
  }

  return {
    crashes,
    eats,
    moves,
    grows
  };
};
