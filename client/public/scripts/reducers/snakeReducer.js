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
    turnIsValid,
    nextHead,
    willCrash,
    willEat,
    placeFood
} = require('../logic/logicHelpers');
  
module.exports = function(state, action) {
    let nextState = {};
if(!action) {
    action = {};
};

if(action.type === MOVE_FORWARD) {
    const { directions } = state;
    // remove last move from the queue
    if(directions.length > 1) {
        nextState.directions = directions.slice(1, directions.length)
    };
    // check for game over condition
    if(willCrash(state)) {
        nextState.isOver = true
    } else {
        // place new food if food eaten and make the snake longer
        if(willEat(state)) {
            nextState.food = placeFood(state);
            nextState.snake = [ nextHead(state) ].concat(state.snake);
            nextState.score = state.score + state.snake.length;
        // let the head be followed by the rest of the snake
        } else {
            nextState.snake =  [ nextHead(state) ].concat(state.snake).slice(0, state.snake.length)
        };
    };

} else if(action.type === ENQUEUE_TURN) {
    const nextDirection = directions[action.payload];
    if(turnIsValid(state, nextDirection)) {
        nextState.directions = state.directions.concat(nextDirection);
    };    
} else if(action.type === EAT_FOOD) {
    // console.log("EAT_FOOD from reducer")
} else if(action.type === HIT_BODY) {
    // console.log("HIT_BODY from reducer")
}

    // console.log(Object.assign(state, nextState))
    return Object.assign(state, nextState)
};