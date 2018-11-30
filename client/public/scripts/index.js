const store = require('./store');
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

store.subscribe(() => console.log("SAgfsadg"));

window.addEventListener("load", () => {
    store.dispatch(addControls());
})

window.addEventListener('resize', () => {
    store.dispatch(resizeBoard());
})

window.addEventListener("keydown", (e) => {
    if (store.getState().isOnDesktop) {
        if(e.key=== 'Enter' || e.key=== ' ') {
            store.getState().isPaused
                ? store.dispatch(startGame())
                : store.dispatch(pauseGame())
        };
    };
})