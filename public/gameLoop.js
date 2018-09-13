

const intervalPassed = t1 => t2 => tempo => t2-t1 > tempo;

const gameloop = () => {
  const lastTime = game.getState().lastTime;
  const tempo = game.getState().tempo;

  if(intervalPassed(lastTime)(Date.now())(tempo)) {
    snakeGame.getInstance().dispatch({ type: 'TIMESTAMP' })
    snakeGame.getInstance().dispatch({ type: 'MOVE' })
    console.log(game.getState().snakeDirections)
  }
  window.requestAnimationFrame(gameloop)
}

window.requestAnimationFrame(gameloop)
