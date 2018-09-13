const CANVAS = document.createElement("canvas");
const ctx = CANVAS.getContext('2d');
document.querySelector(".canvas-wrapper").appendChild(CANVAS);

const game = snakeGame.getInstance();

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


const render = () => {
  console.log("rendered")
}

const unsubscribe = game.subscribe(render);
render();

console.log(game.getState())
