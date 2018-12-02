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

// subscribe(() => console.log("SAgfsadg"));

window.addEventListener("load", () => {
    addControls();
});

window.addEventListener('resize', () => {
    resizeBoard();
});