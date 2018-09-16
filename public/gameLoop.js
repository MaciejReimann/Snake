
const snake = snakeGame.getInstance();
let id;
const intervalPassed = t1 => t2 => tempo => t2-t1 > tempo;

const gameloop = () => {
  const lastTime = game.getState().lastTime;
  const tempo = game.getState().tempo;
  if (game.getState().isStarted) {
    console.log('gameloop started')
    if(intervalPassed(lastTime)(Date.now())(tempo)) { // if more miliseconds passed than tempo, action is dispatched
      snake
        .dispatch({
          type: 'MOVE_SNAKE',
          id: id
        })
    }
    id = window.requestAnimationFrame(gameloop)
  }
  id = window.requestAnimationFrame(gameloop)
}




window.addEventListener('keydown', e => {
  if(e.key === " ") {
    window.cancelAnimationFrame(snake.getState().id)
  }
})
