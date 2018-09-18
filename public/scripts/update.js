

const updateScore = () => {
  const SCORE = document.querySelector(".score");
  SCORE.textContent = snakeGame.getInstance().getState().score;
}

const updateCanvas = () => {
  const CANVAS = document.querySelector(".canvas");
  const currentGame = snakeGame.getInstance().getState;
  const pixel = currentGame().pixel;
  const snake = currentGame().body;
  const worm = currentGame().worm;
  const snakeColor = "rgba(84, 143, 81, 0.78)";
  const wormColor = "rgb(75, 77, 75)";
  const gridColor = "rgb(75, 77, 75)";

  const drawGame = () => {
    resize(CANVAS)(currentGame().width)(currentGame().height)
    clear(CANVAS);
    // draw snake
    snake.forEach(point => drawSquare(CANVAS)(pixel)(snakeColor)(point));
    // draw worm
    drawCircle(CANVAS)(pixel)(wormColor)(worm);
    drawRectangularGrid(CANVAS)(pixel)(gridColor);
  }

  currentGame().isOver ? fill(CANVAS) : (
    currentGame().isStarted ? drawGame() : null
  )

}
