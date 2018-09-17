

const handle = (() => {
  const game = snakeGame.getInstance();
  const canvasContainer = document.querySelector(".canvas-wrapper");

  // event handlers
  const start = () => {
    if (game.getState().isStarted) { return }
    canvasContainer.appendChild(createCanvas('canvas'));
    resize(); // otherwise functions taking width and height in SnakeGame become buggy
    game.dispatch({
      type: 'START_GAME',
      width: canvasContainer.clientWidth,
      height: canvasContainer.clientHeight
    })
  }
  const turn = direction => {
    // to not to enque turns if the game hasn't started
    if (!game.getState().isStarted) { return }
    game.dispatch({
      type: 'ENQUEUE_TURN',
      direction: direction
    })
  }
  const resize = () => {
    game.dispatch({
      type: 'RESIZE_SCREEN',
      width: canvasContainer.clientWidth,
      height: canvasContainer.clientHeight
    })
  }
  const pause = () => {
    game.dispatch({
      type: 'GAME_PAUSED',
    })
  }

  game.subscribe(updateCanvas);
  game.subscribe(updateScore);

  return { start, turn, resize, pause }
})()
