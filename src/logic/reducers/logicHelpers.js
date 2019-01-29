const { getLastItem } = require("../helpers/arrayHelpers");
const {
  createPoint,
  createRandomPoint,
  arePointsEqual
} = require("../helpers/pointHelpers");

function turnIsValid(state, nextDirection) {
  return (
    nextDirection.x + getLastItem(state.directions).x !== 0 ||
    nextDirection.y + getLastItem(state.directions).y !== 0
  );
}

function nextHead(state) {
  const mod = (x, y) => ((y % x) + x) % x; // http://bit.ly/2oF4mQ7
  return createPoint(
    mod(
      state.boardWidth / state.resolution,
      state.snake[0].x + state.directions[0].x
    ),
    mod(
      state.boardHeight / state.resolution,
      state.snake[0].y + state.directions[0].y
    )
  );
}

function willCrash(state) {
  return state.snake.find(p => arePointsEqual(p, nextHead(state)));
}

function willEat(state) {
  console.log(state.food);
  return arePointsEqual(nextHead(state), state.food);
}

function placeFood(state) {
  const { boardWidth, boardHeight, resolution, food } = state;
  const nextId = food.prop.id + 1;
  const newFood = createRandomPoint(
    boardWidth / resolution,
    boardHeight / resolution,
    {
      id: nextId
    }
  );
  if (state.snake.some(p => arePointsEqual(newFood, p))) {
    placeFood(state);
  }
  return newFood;
}

module.exports = {
  turnIsValid,
  nextHead,
  willCrash,
  willEat,
  placeFood
};
