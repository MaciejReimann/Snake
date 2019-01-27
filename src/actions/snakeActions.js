const {
    dispatch,
    getState
} = require('../store');
const {
    MOVE_FORWARD,
    ENQUEUE_TURN
} = require('./constants');

function moveForward() {
    // console.log(
    //     getState().food.props.id
    // )     
    return dispatch({
        type: MOVE_FORWARD
    });
};

function enqueueTurn(turn) {
    // dispatch(changeInterval(.8))
    return dispatch({
        type: ENQUEUE_TURN,
        payload: turn
    });
};

module.exports = {
    moveForward,
    enqueueTurn
};