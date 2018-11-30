const { dispatch } = require('../store');
const {
    MOVE_FORWARD,
    ENQUEUE_TURN,
    CHANGE_DIRECTION
} = require('./constants');


function moveForward() {
    console.log('moved forward')

};

function enqueueTurn(turn) { 
    return dispatch({
        type: ENQUEUE_TURN,
        payload: turn
    });
};

function changeDirection() {
    console.log('changed direction')
    
};

module.exports = {
    moveForward,
    enqueueTurn,
    changeDirection
};