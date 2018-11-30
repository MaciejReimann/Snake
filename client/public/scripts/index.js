const snake = require('./store');
const {
    startGame,
    pauseGame
} = require('./actions/loopActions');
const {
    renderCanvas
} = require('./actions/renderActions');
const {
    resizeBoard,
    addControls
} = require('./actions/viewActions');

snake.subscribe(() => console.log("SAgfsadg"));

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