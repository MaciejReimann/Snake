const snake = require('./store');
const {
    initLoop,
    startGame,
    pauseGame
} = require('./actions/loopActions');

console.log(snake.getState())
console.log("hello from index.js")

window.addEventListener("keydown", (e) => {
    console.log(e.key)
    if(e.key=== 'Enter') {
        snake.getState().paused
            ? snake.dispatch(startGame())
            : snake.dispatch(pauseGame())
    };
})