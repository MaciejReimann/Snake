function renderMessage(state, container) {
  const { isStarted, isPaused, isOver } = state;
  let message;
  if (isOver) {
    message = "To restart press Enter ";
  } else if (!isStarted) {
    message = "To start press Spacebar";
  } else if (isStarted && isPaused) {
    message = "To resume press Spacebar";
  } else {
    message = "To pause press Spacebar";
  }
  container.textContent = message;
}

module.exports = {
  renderMessage
};
