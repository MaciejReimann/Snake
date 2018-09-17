
const snake = snakeGame.getInstance();
let id;
const intervalPassed = t1 => t2 => tempo => t2-t1 > tempo;

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

// id = window.requestAnimationFrame(gameloop)
//
//
// window.addEventListener('keydown', e => {
//   if(e.key === " ") {
//     window.cancelAnimationFrame(snake.getState().id)
//   }
// })



// body: Array(4).fill()
//   .map((_, i) => {
//     return { x: 1 + i, y: 1 } }
// ),
