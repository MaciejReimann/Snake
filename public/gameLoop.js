
const snake = snakeGame.getInstance();
let id;
const intervalPassed = t1 => t2 => tempo => t2-t1 > tempo;

const startAnimation = () => {
  const gameloop = () => {
    const lastTime = snake.getState().lastTime;
    const tempo = snake.getState().tempo;
    if(intervalPassed(lastTime)(Date.now())(tempo)) { // if more miliseconds passed than tempo, action is dispatched
      snake
        .dispatch({
          type: 'MOVE_SNAKE'
        })
      }
    id = window.requestAnimationFrame(gameloop)
    }
  id = window.requestAnimationFrame(gameloop)
}

const stopAnimation = () => {
  window.cancelAnimationFrame(id)
}
