const { dispatch, getState } = require('../store');
const { tempo }  = require('../logic/initialState');
const {
    START_GAME,
    PAUSE_GAME,
    RESUME_GAME,
    CHANGE_INTERVAL
} = require('./constants');
const { moveForward } = require('./snakeActions');
const Gameloop = require('../helpers/Gameloop');
 // Initialize gameloop with a callback to be fired from inside the gameloop functions
const gameloop = Gameloop(tempo, moveForward);

function startGame() {
    gameloop.start();
    return dispatch({
        type: START_GAME
    });
};

function pauseGame() {
    gameloop.stop();
    return dispatch({
        type: PAUSE_GAME
    });
};

function resumeGame() {
    gameloop.start();
    return dispatch({
        type: RESUME_GAME
    });
};

function changeInterval(rate) { // this should be setIntercal instead, with the value taken as a par from state
    gameloop.changeInterval(rate);
    return dispatch({
        type: CHANGE_INTERVAL
    });
};

module.exports = {
    startGame,
    pauseGame,
    resumeGame,
    changeInterval
};