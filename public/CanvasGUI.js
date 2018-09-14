

const game = snakeGame.getInstance();

const handleTurn = direction => {
  game.dispatch({
    type: 'ENQUEUE_TURN',
    direction: direction
  })
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'ArrowUp':    handleTurn('UP'); break
    case 'a': case 'ArrowLeft':  handleTurn('LEFT');  break
    case 's': case 'ArrowDown':  handleTurn('DOWN'); break
    case 'd': case 'ArrowRight': handleTurn('RIGHT');  break
  }
})

const updateScore = () => {
    const SCORE = document.querySelector(".Score");
    SCORE.textContent = game.getState().score
}

const render = () => {

  const CANVAS = document.querySelector(".canvas");
  CANVAS.width = game.getState().width;
  CANVAS.height = game.getState().height;
  const ctx = CANVAS.getContext('2d');
  const mod = game.getState().module;

  if(game.getState().isGameOver) {
    console.log("game over")
    fillCanvas(CANVAS)
    return;
  }

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

game.subscribe(render)
game.subscribe(updateScore)

render();
