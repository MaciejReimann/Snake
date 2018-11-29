


const gameloop = (() => {
  let id;
  const game = snakeGame.getInstance()
  const intervalPassed = t1 => t2 => tempo => t2-t1 > tempo;

  const start = () => {
    const loop = () => {
      const lastTime = game.getState().lastTime;
      const tempo = game.getState().tempo;
      if(intervalPassed(lastTime)(Date.now())(tempo)) {
        // if more miliseconds passed than tempo, action is dispatched
        game.dispatch({
            type: 'MOVE_SNAKE'
          })
        }
      id = window.requestAnimationFrame(loop);
      }
    id = window.requestAnimationFrame(loop);
  }

  const stop = () => {
    window.cancelAnimationFrame(id);
  }
  return { start, stop }
})()
