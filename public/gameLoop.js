

const intervalPassed = t1 => t2 => tempo => t2-t1 > tempo;

const gameloop = () => {
  const lastTime = game.getState().lastTime;
  const tempo = 1000;

  if(intervalPassed(lastTime)(Date.now())(tempo)) {
    console.log("loop")
    snakeGame.getInstance().dispatch({ type: 'TIMESTAMP' })
  }
  window.requestAnimationFrame(gameloop)
}

window.requestAnimationFrame(gameloop)
