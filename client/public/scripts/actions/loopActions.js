const { dispatch, getState } = require('../store');
const {
    START_GAME,
    PAUSE_GAME,
    RESUME_GAME,
    CHANGE_INTERVAL
} = require('./constants');
const { moveForward } = require('./snakeActions');
const Gameloop = require('../helpers/Gameloop');
let gameloop;

const startGame = () => {
    // Initialize gameloop with a callback to be fired from inside the gameloop functions
    gameloop = Gameloop(getState().tempo, moveForward);
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

const resumeGame = () => {
    gameloop.start();
    return dispatch({
        type: RESUME_GAME
    });
};

function changeInterval(rate) {
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