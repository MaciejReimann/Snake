const CANVAS = document.createElement("canvas");
const ctx = CANVAS.getContext('2d');
document.querySelector(".canvas-wrapper").appendChild(CANVAS);

const game = snakeGame.getInstance();

const handleResize = () => {
  wrapperWidth = CANVAS.parentElement.clientWidth;
  wrapperHeight = CANVAS.parentElement.clientHeight;
  CANVAS.width = Math.floor(.09 * wrapperWidth) * 10;
  CANVAS.height = Math.floor(.09 * wrapperHeight) * 10;
}

const handleRight = () => {
  game.dispatch({
    type: TURN-RIGHT
  })
}


window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'ArrowUp':    handleUp; break
    case 'a': case 'ArrowLeft':  handleLeft;  break
    case 's': case 'ArrowDown':  handleDown; break
    case 'd': case 'ArrowRight': handleRight;  break
  }
})

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

const render = () => {
  console.log("rendered")
}

const unsubscribe = game.subscribe(render);
render();

console.log(game.getState())
0
