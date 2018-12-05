const { dispatch } = require('../store');
const {
    MOVE_FORWARD,
    ENQUEUE_TURN,
    CHANGE_DIRECTION
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

function changeDirection() {
    return dispatch({
        type: CHANGE_DIRECTION
    });   
};

module.exports = {
    moveForward,
    enqueueTurn,
    changeDirection
};