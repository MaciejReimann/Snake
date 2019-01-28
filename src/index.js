const { getState, subscribe } = require("./store");
const { render } = require("./presentation");
const addKeydownListeners = require("./presentation/helpers/addKeydownListeners");
const {
  enqueueTurn,
  startGame,
  pauseGame,
  resumeGame,
  resizeBoard
} = require("./actions");
const DOM = {
  header: document.querySelector(".header"),
  canvasContainer: document.querySelector(".canvas-container"),
  canvas: document.querySelector(".canvas"),
  scoreContainer: document.querySelector(".score"),
  messageContainer: document.querySelector(".message"),
  alertContainer: document.querySelector(".page-foreground")
};

let onLoad;
const renderOnCanvas = () => render(getState(), DOM);

if (document.body.clientWidth > 1024) {
  onLoad = () => {
    addKeydownListeners(
      getState,
      startGame,
      resumeGame,
      pauseGame,
      enqueueTurn
    );
    resizeBoard(
      DOM.canvasContainer.clientWidth,
      DOM.canvasContainer.clientHeight,
      getState(),
      DOM.canvas
    );
    renderOnCanvas();
  };
}

subscribe([renderOnCanvas]); // changeInterval should passed as an item of an array of functions

window.addEventListener("load", onLoad);

// window.addEventListener("resize", () => {
//   resizeBoard();
// });
