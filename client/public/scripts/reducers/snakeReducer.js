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
const {
    createPoint,
    createRandomPoint,
    arePointsEqual
} = require('../helpers/pointHelpers');
  
function turnIsValid(state, nextDirection) {
    return (
        nextDirection.x + getLastItem(state.directions).x !== 0 ||
        nextDirection.y + getLastItem(state.directions).y !== 0
    );
};

function willCrash(state) {
    return state.snake.find(p => arePointsEqual(p, nextHead(state) ));
};

function willEat(state) {
    return arePointsEqual( nextHead(state), state.food);
};

function nextHead(state) {
    const mod = (x, y) => ((y % x) + x) % x; // http://bit.ly/2oF4mQ7
    return createPoint(
        mod(state.boardWidth  / state.resolution, state.snake[0].x + state.directions[0].x),
        mod(state.boardHeight / state.resolution, state.snake[0].y + state.directions[0].y)
    );
};

function placeFood(state) {
    const { boardWidth, boardHeight, resolution } = state;
    const newFood = createRandomPoint(boardWidth / resolution, boardHeight / resolution, "food")
    return state.snake.find(p => arePointsEqual(newFood,p)) 
        ? placeFood(state) : newFood   
};

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
            nextState.snake = [ nextHead(state) ].concat(state.snake)
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
    console.log("EAT_FOOD from reducer")
} else if(action.type === HIT_BODY) {
    console.log("HIT_BODY from reducer")
}

    console.log(Object.assign(state, nextState))
    return Object.assign(state, nextState)
};