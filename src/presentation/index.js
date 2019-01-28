const { renderCanvas } = require("./renderCanvas");
const { renderScore } = require("./renderScore");
const { renderMessage } = require("./renderMessage");

function render(state, dom) {
  renderCanvas(state, dom.canvas);
  renderScore(state, dom.scoreContainer);
  renderMessage(state, dom.messageContainer);
}

module.exports = {
  render
};
