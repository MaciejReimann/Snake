const store = require("./store");
const {
    render
} = require("./render");
const {
    resizeBoard,
    addControls
} = require("./actions/viewActions");

store.subscribe(render); // changeInterval should passed as an item of an array of functions

window.addEventListener("load", () => {
    addControls();
});

window.addEventListener("resize", () => {
    resizeBoard();
});