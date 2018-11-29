const snake = require('./store');
const {
    startGame,
    pauseGame,
    changeInterval
} = require('./actions/loopActions');

console.log(snake.getState())
console.log("hello from index.js")

window.addEventListener("keydown", (e) => {
    console.log(e.key)
    if(e.key=== 'Enter') {
        snake.getState().paused
            ? snake.dispatch(startGame())
            : snake.dispatch(pauseGame())
    } else if(e.key=== 'a') {
        snake.dispatch(changeInterval(snake.getState().increaseRate))
    };
})