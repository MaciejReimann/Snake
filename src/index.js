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

const canvasContainer = document.querySelector(".canvas-container");
const CANVAS = document.querySelector(".canvas");

let onLoad;
const renderOnCanvas = () => render(getState(), CANVAS);

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
      canvasContainer.clientWidth,
      canvasContainer.clientHeight,
      getState(),
      CANVAS
    );
    renderOnCanvas();
  };
}

subscribe([renderOnCanvas]); // changeInterval should passed as an item of an array of functions

window.addEventListener("load", onLoad);

// window.addEventListener("resize", () => {
//   resizeBoard();
// });
