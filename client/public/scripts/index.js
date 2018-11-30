const snake = require('./store');
const {
    startGame,
    pauseGame
} = require('./actions/loopActions');
const {
    resizeBoard,
    addControls
} = require('./actions/viewActions');



window.addEventListener("load", () => {
    snake.dispatch(addControls());
})

window.addEventListener('resize', () => {
    snake.dispatch(resizeBoard());
})

window.addEventListener("keydown", (e) => {
    if (snake.getState().isOnDesktop) {
        if(e.key=== 'Enter' || e.key=== ' ') {
            snake.getState().isPaused
                ? snake.dispatch(startGame())
                : snake.dispatch(pauseGame())
        };
    };
})