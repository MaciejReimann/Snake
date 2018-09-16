const game = snakeGame.getInstance();


const updateScore = () => {
    const SCORE = document.querySelector(".Score");
    SCORE.textContent = game.getState().score
}

const updateCanvas = () => {
  const CANVAS = document.querySelector(".canvas");
  
  const currentGame = game.getState();
  console.log(currentGame)

  if(game.getState().isGameOver) {
    console.log("game over")
    fillCanvas(CANVAS)
    return;
  }

  if(currentGame.isStarted) {
    console.log('here')
    CANVAS.width = game.getState().width;
    CANVAS.height = game.getState().height;
    const ctx = CANVAS.getContext('2d');
    const mod = game.getState().module;



    const snake = game.getState().body;
    const worm = game.getState().worm;
    clearCanvas(CANVAS);

    snake.forEach(point => {
      ctx.fillStyle = "#8cc965";
      ctx.fillRect(point.x * mod, point.y * mod, mod, mod);
    })

    // worm
    ctx.fillStyle = "#c7823c";
    drawCircleInSquare(worm.x * mod, worm.y * mod, (mod / 2), ctx);
  }
}
