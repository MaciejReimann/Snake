
const game = snakeGame.getInstance();
const canvasContainer = document.querySelector(".canvas-wrapper");


// const setupCanvas = () => {
//
//   const CANVAS = canvasContainer.appendChild( createCanvas('canvas'));
//   CANVAS.width = canvasContainer.clientWidth;
//   CANVAS.height = canvasContainer.clientHeight;
// }


const UP = 'UP';
const RIGHT = 'RIGHT';
const DOWN = 'DOWN';
const LEFT = 'LEFT';



// const game = snakeGame.getInstance();

const handleStart = () => {
  game.dispatch({
    type: 'START_GAME',
    width: canvasContainer.clientWidth,
    height: canvasContainer.clientHeight
  })
}

const handleTurn = direction => {
  game.dispatch({
    type: 'ENQUEUE_TURN',
    direction: direction
  })
}

const handleResize = () => {
  console.log("resized", game.getState())
  game.dispatch({
    type: 'RESIZE_SCREEN',
    width: canvasContainer.clientWidth,
    height: canvasContainer.clientHeight
  })
  render();
}

const handlePause = () => {
  console.log("paused")
  console.log(game.getState().id)
  // window.cancelAnimationFrame(game.getState().id)
  // game.dispatch({
  //   type: 'GAME_PAUSED',
  // })
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'ArrowUp':    handleTurn('UP'); break
    case 'a': case 'ArrowLeft':  handleTurn('LEFT');  break
    case 's': case 'ArrowDown':  handleTurn('DOWN'); break
    case 'd': case 'ArrowRight': handleTurn('RIGHT');  break
    case 'Enter': handleStart();  break
    case ' ': handlePause();  break
  }
})

window.addEventListener('resize', handleResize)
// window.addEventListener('load', handleResize)
// window.addEventListener('keydown', e => {
//   console.log(e.key)
// })

const updateScore = () => {
    const SCORE = document.querySelector(".Score");
    SCORE.textContent = game.getState().score
}

const render = () => {
  const currentGame = game.getState();
  console.log(currentGame)


  if(currentGame.isStarted) {return}
  console.log('here')
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

console.log(game.getState())
