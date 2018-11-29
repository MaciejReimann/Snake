const {
    MOVE_FORWARD,
    CHANGE_DIRECTION
} = require('./constants');


function moveForward() {
    console.log('moved forward')

};

function changeDirection() {
    console.log('changed direction')
    
};


module.exports = {
    moveForward,
    changeDirection
};