

const updateScore = () => {
  const SCORE = document.querySelector(".Score");
  SCORE.textContent = snakeGame.getInstance().getState().score;
}

const updateCanvas = () => {
  const CANVAS = document.querySelector(".canvas");
  const currentGame = snakeGame.getInstance().getState;

  // console.log(currentGame)

  // if(currentGame.isGameOver) {
  //   console.log("game over")
  //   fillCanvas(CANVAS)
  //   return;
  // }

  if(currentGame().isStarted) {
    // animate(snakeGame.getInstance())
    CANVAS.width = currentGame().width;
    CANVAS.height = currentGame().height;
    const ctx = CANVAS.getContext('2d');
    const pixel = currentGame().pixel;
    // console.log('here')


    const snake = currentGame().body;
    const worm = currentGame().worm;
    clearCanvas(CANVAS);

    snake.forEach(point => {
      ctx.fillStyle = "#8cc965";
      ctx.fillRect(point.x * pixel, point.y * pixel, pixel, pixel);
    })

    // worm
    ctx.fillStyle = "#c7823c";
    drawCircleInSquare(worm.x * pixel, worm.y * pixel, (pixel / 2), ctx);
  }
}
