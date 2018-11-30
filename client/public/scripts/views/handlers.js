

const handle = (() => {
  const game = snakeGame.getInstance();
  const state = game.getState;
  const canvasContainer = document.querySelector(".canvas-container");

  // event handlers
  const start = () => {
    if (state().isStarted) { return }
    canvasContainer.appendChild(createCanvas('canvas'));
    resize(); // otherwise functions taking width and height in SnakeGame become buggy
    // game.dispatch({
    //   type: 'START_GAME',
    //   width: canvasContainer.clientWidth,
    //   height: canvasContainer.clientHeight
    // })
    gameloop.start();
  }
  const turn = direction => {
    // to not to enque turns if the game hasn't started
    if (!state().isStarted || state().isPaused) { return }
    game.dispatch({
      type: 'ENQUEUE_TURN',
      direction: direction
    })
  }
  // const resize = () => {
  //   game.dispatch({
  //     type: 'RESIZE_SCREEN',
  //     width: canvasContainer.clientWidth,
  //     height: canvasContainer.clientHeight
  //   })
  // }
  // const pause = () => {
  //   game.dispatch({
  //     type: 'PAUSE_TOGGLE',
  //   })
  //   state().isPaused ? gameloop.stop() : gameloop.start()
  // }

  game.subscribe(updateCanvas);
  game.subscribe(updateScore);

  return { start, turn, resize, pause }
})()
