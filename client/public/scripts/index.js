const snake = require('./store');
const {
    addControls
} = require('./actions/viewActions');
const {
    startGame,
    pauseGame
} = require('./actions/loopActions');

window.addEventListener("load", () => {
    snake.dispatch(addControls());
})

window.addEventListener("keydown", (e) => {
    if (snake.getState().isOnDesktop) {
        if(e.key=== 'Enter' || e.key=== ' ') {
            snake.getState().paused
                ? snake.dispatch(startGame())
                : snake.dispatch(pauseGame())
        };
    };
})