const {
    MOVE_FORWARD,
    ENQUEUE_TURN,
    EAT_FOOD,
    HIT_BODY
} = require('../actions/constants');
const {
    directions
} = require('../logic/directions');
const {
    getLastItem
} = require('../helpers/arrayHelpers');
  
function turnIsValid(state, direction) {
    return (
        direction.x + getLastItem(state.directions).x !== 0 ||
        direction.y + getLastItem(state.directions).y !== 0
    );
};

module.exports = function(state, action) {
    let nextState = {};
if(!action) {
    action = {};
};

if(action.type === MOVE_FORWARD) {
    console.log("MOVE_FORWARD from reducer")
} else if(action.type === ENQUEUE_TURN) {
    if(turnIsValid(state, action.payload)) {
        nextState.directions = state.directions.concat(action.payload);
    };
} else if(action.type === EAT_FOOD) {
    console.log("EAT_FOOD from reducer")
} else if(action.type === HIT_BODY) {
    console.log("HIT_BODY from reducer")
}
    return Object.assign(state, nextState)
};