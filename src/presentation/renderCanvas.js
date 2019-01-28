const {
  clear,
  drawRectangularGrid,
  drawSquareFromCorner,
  drawCircle
} = require("./helpers/renderHelpers");
const { snakeColor, foodColor, gridColor } = require("./colors").darkViolet;

function renderCanvas(state, canvas) {
  const { snake, food, resolution, isOver } = state;
  if (!isOver) {
    clear(canvas);
  }
  // draw snake
  snake.forEach(square =>
    drawSquareFromCorner(canvas, resolution, snakeColor, square)
  );
  // draw food
  drawCircle(canvas, resolution, foodColor, food);
  // draw grid
  drawRectangularGrid(canvas, resolution, gridColor, 0.5);
}

module.exports = {
  renderCanvas
};
