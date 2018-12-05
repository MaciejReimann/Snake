const { dispatch } = require('../store');
const {
    MOVE_FORWARD,
    ENQUEUE_TURN
} = require('./constants');

function moveForward() {
    return dispatch({
        type: MOVE_FORWARD
    });
};

function enqueueTurn(turn) {
    return dispatch({
        type: ENQUEUE_TURN,
        payload: turn
    });
};

module.exports = {
    moveForward,
    enqueueTurn
};