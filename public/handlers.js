

const handle = (() => {
  const game = snakeGame.getInstance();
  const canvasContainer = document.querySelector(".canvas-wrapper");

  // event handlers
  const start = () => {
    if (game.getState().isStarted) { return }
    canvasContainer.appendChild(createCanvas('canvas'));
    game.dispatch({
      type: 'START_GAME',
      width: canvasContainer.clientWidth,
      height: canvasContainer.clientHeight
    })  
  }
  const turn = direction => {
    game.dispatch({
      type: 'ENQUEUE_TURN',
      direction: direction
    })
  }
  const resize = () => {
    game.dispatch({
      type: 'RESIZE_SCREEN',
      width: canvasContainer.clientWidtoh,
      height: canvasContainer.clientHeight
    })
  }
  const pause = () => {
    game.dispatch({
      type: 'GAME_PAUSED',
    })
  }

  game.subscribe(updateCanvas)
  game.subscribe(updateScore)

  console.log(game.getState())
  return { start, turn, resize, pause }
})()
