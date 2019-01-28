const { renderCanvas } = require("./renderCanvas");
const { renderScore } = require("./renderScore");
const { renderMessage } = require("./renderMessage");
const { renderAlert } = require("./renderAlert");
const { styleLayout } = require("./styleLayout");

function render(state, dom) {
  styleLayout(dom);
  renderAlert(state, dom);
  renderCanvas(state, dom.canvas);
  renderScore(state, dom.scoreContainer);
  renderMessage(state, dom.messageContainer);
}

module.exports = {
  render
};
