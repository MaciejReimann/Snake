const store = require('./store');
const {
    render
} = require('./render');
const {
    resizeBoard,
    addControls
} = require('./actions/viewActions');

store.subscribe(render);

window.addEventListener("load", () => {
    addControls();
});

window.addEventListener('resize', () => {
    resizeBoard();
});