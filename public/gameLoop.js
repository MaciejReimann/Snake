

const intervalPassed = t1 => t2 => tempo => t2-t1 > tempo;

const gameloop = () => {
  const lastTime = game.getState().lastTime;
  const tempo = game.getState().tempo;

  if(intervalPassed(lastTime)(Date.now())(tempo)) {
    snakeGame.getInstance().dispatch({ type: 'MOVE_SNAKE' })
  }
  window.requestAnimationFrame(gameloop)
}

window.requestAnimationFrame(gameloop)
