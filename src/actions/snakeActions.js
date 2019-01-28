const { dispatch } = require("../store");
const { MOVE_FORWARD, ENQUEUE_TURN } = require("./constants");

function moveForward(callback) {
  callback();
  // console.log(
  //     getState().food.props.id
  // )
  return dispatch({
    type: MOVE_FORWARD
  });
}

function enqueueTurn(turn) {
  return dispatch({
    type: ENQUEUE_TURN,
    payload: turn
  });
}

module.exports = {
  moveForward,
  enqueueTurn
};
