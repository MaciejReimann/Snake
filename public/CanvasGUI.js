

const game = snakeGame.getInstance();

const checkMediaSize = () => {
  game.dispatch({ type: 'CHECK-MEDIA' })
}

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

window.addEventListener('load', checkMediaSize);

const render = () => {
  const CANVAS = document.querySelector(".canvas");
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
  ctx.fillStyle = "#c7823c";
  drawCircleInSquare(worm.x * mod, worm.y * mod, (mod / 2), ctx);
}

game.subscribe(render)

render();
