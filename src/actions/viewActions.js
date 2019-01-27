const { dispatch } = require("../store");
const { RESIZE_BOARD } = require("../actions/constants");
const { resizeCanvas } = require("../presentation/helpers/DOMHelpers");

function resizeBoard(containerWidth, containerHeight, state, canvas) {
  const res = state.resolution;
  const width = Math.floor(containerWidth / res) * res - 2 * res;
  const height = Math.floor(containerHeight / res) * res - res;
  resizeCanvas(canvas, width, height);
  return dispatch({
    type: RESIZE_BOARD,
    payload: {
      width,
      height
    }
  });
}

module.exports = {
  resizeBoard
};
