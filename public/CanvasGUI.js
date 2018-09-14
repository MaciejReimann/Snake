

const game = snakeGame.getInstance();

const checkMediaSize = () => {
  game.dispatch({ type: 'CHECK-MEDIA' })
}

const handleUp = () => {
  game.dispatch({ type: 'GO-UP' })
}
const handleRight = () => {
  game.dispatch({ type: 'GO-RIGHT'})
}
const handleDown = () => {
  game.dispatch({ type: 'GO-DOWN'})
}
const handleLeft = () => {
  game.dispatch({ type: 'GO-LEFT'})
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'ArrowUp':    handleUp(); break
    case 'a': case 'ArrowLeft':  handleLeft();  break
    case 's': case 'ArrowDown':  handleDown(); break
    case 'd': case 'ArrowRight': handleRight();  break
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
