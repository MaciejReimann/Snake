const { getState, subscribe } = require("./store");
const {
  render,
  addKeydownListeners,
  resizeCanvas,
  DOM
} = require("./presentation");
const {
  enqueueTurn,
  startGame,
  pauseGame,
  resumeGame,
  resizeBoard
} = require("./logic/actions");

let onLoad;
const renderOnCanvas = () => render(getState(), DOM);
const resizeBoardToCanvas = () =>
  resizeBoard(
    DOM.canvasContainer.clientWidth,
    DOM.canvasContainer.clientHeight,
    getState(),
    DOM.canvas,
    resizeCanvas
  );

// if (document.body.clientWidth > 1024) {
onLoad = () => {
  addKeydownListeners(getState, startGame, resumeGame, pauseGame, enqueueTurn);
  resizeBoardToCanvas();
  renderOnCanvas();
};
// }

subscribe([renderOnCanvas]);
window.addEventListener("load", onLoad);
window.addEventListener("resize", resizeBoardToCanvas);
