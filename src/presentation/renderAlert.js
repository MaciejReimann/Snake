const { fill } = require("./helpers/renderHelpers");
const { gameOverColor } = require("./colors").darkViolet;

function renderAlert(state, dom) {
  const { isOver } = state;
  const { canvas, alertContainer } = dom;
  if (isOver) {
    fill(canvas, gameOverColor);
    alertContainer.textContent = "Game Over!";
  } else {
    alertContainer.textContent = "";
  }
}

module.exports = {
  renderAlert
};
