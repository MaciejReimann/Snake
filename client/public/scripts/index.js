const store = require('./store');
const {
    renderCanvas,
    updateScore
} = require('./actions/renderActions');
const {
    resizeBoard,
    addControls
} = require('./actions/viewActions');

store.subscribe(renderCanvas);
store.subscribe(updateScore);

window.addEventListener("load", () => {
    addControls();
});

window.addEventListener('resize', () => {
    resizeBoard();
});