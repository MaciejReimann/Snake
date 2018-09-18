

const updateScore = () => {
  const SCORE = document.querySelector(".score");
  SCORE.textContent = snakeGame.getInstance().getState().score || 0;
}

const updateCanvas = () => {
  const CANVAS = document.querySelector(".canvas");
  const currentGame = snakeGame.getInstance().getState;
  const pixel = currentGame().pixel;
  const snake = currentGame().body;
  const worm = currentGame().worm;
  const snakeColor = "rgba(133, 201, 35, 0.78)";
  const wormColor = "rgb(235, 154, 18)";
  const gridColor = "rgba(129, 21, 237, 0.32)";
  const gameOverColor = () => { CANVAS.parentElement.className = "game-over" }

  const drawGame = () => {
    resize(CANVAS)(currentGame().width)(currentGame().height)
    clear(CANVAS);
    // draw snake
    snake.forEach(point => drawSquare(CANVAS)(pixel)(snakeColor)(point));
    // draw worm
    drawCircle(CANVAS)(pixel)(wormColor)(worm);
    drawRectangularGrid(CANVAS)(pixel)(gridColor);
  }

  currentGame().isOver ? gameOverColor() : (
    currentGame().isStarted ? drawGame() : null
  )

}
