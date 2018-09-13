


const game = snakeGame.getInstance();

const CANVAS = document.querySelector(".canvas");
CANVAS.width = game.getState().width;
CANVAS.height = game.getState().height;
const ctx = CANVAS.getContext('2d');
const mod = game.getState().module;

const render = () => {
  const snake = game.getState().snakeBody;
  const worm = game.getState().worm;
  clearCanvas(CANVAS);

  snake.forEach(point => {
    ctx.fillRect(point.x * mod, point.y * mod, mod, mod);
  })
  drawCircleInSquare(worm.x * mod, worm.y * mod, (mod / 2), ctx);
}

const checkMediaSize = () => {

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


game.subscribe(render)

render();
