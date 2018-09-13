const CANVAS = document.createElement("canvas");
const ctx = CANVAS.getContext('2d');
document.querySelector(".canvas-wrapper").appendChild(CANVAS);

const game = snakeGame.getInstance();

const render = () => {
  const snake = game.getState().snakeBody
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
  snake.forEach(point => {
    ctx.fillRect(point.x * 20, point.y * 20, 20, 20);
  })
}

const handleResize = () => {
  wrapperWidth = CANVAS.parentElement.clientWidth;
  wrapperHeight = CANVAS.parentElement.clientHeight;
  CANVAS.width = Math.floor(.09 * wrapperWidth) * 10;
  CANVAS.height = Math.floor(.09 * wrapperHeight) * 10;
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

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);



const unsubscribe = game.subscribe(render);
render();

console.log(game.getState())
0
