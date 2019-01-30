const registerServiceWorker = require("./registerServiceWorker");
const { getState, subscribe } = require("./store");
const {
  render,
  addKeydownListeners,
  addSwipeListeners,
  addTapListeners,
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

const resizeAndRender = () => {
  resizeBoardToCanvas();
  renderOnCanvas();
};

if (document.body.clientWidth > 1024) {
  onLoad = () => {
    addKeydownListeners(
      getState,
      startGame,
      resumeGame,
      pauseGame,
      enqueueTurn
    );
  };
} else {
  onLoad = () => {
    addSwipeListeners(getState(), enqueueTurn);
    addTapListeners(getState, startGame, resumeGame, pauseGame);
  };
}

subscribe([renderOnCanvas]);
window.addEventListener("load", onLoad);
window.addEventListener("load", resizeAndRender);
window.addEventListener("resize", resizeBoardToCanvas);
registerServiceWorker();
