const store = require('./store');
const {
    renderCanvas
} = require('./actions/renderActions');
const {
    resizeBoard,
    addControls
} = require('./actions/viewActions');

store.subscribe(renderCanvas);

window.addEventListener("load", () => {
    addControls();
});

window.addEventListener('resize', () => {
    resizeBoard();
});