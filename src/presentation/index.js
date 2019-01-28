const { renderCanvas } = require("./renderCanvas");
const { renderScore } = require("./renderScore");

function render(state, dom) {
  renderCanvas(state, dom.canvas);
  renderScore(state, dom.scoreContainer);
}

module.exports = {
  render
};
