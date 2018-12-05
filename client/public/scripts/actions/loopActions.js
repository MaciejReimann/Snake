const { dispatch, getState } = require('../store');
const {
    START_GAME,
    PAUSE_GAME,
    CHANGE_INTERVAL
} = require('./constants');
const { moveForward } = require('./snakeActions');
const Gameloop = require('../helpers/Gameloop');

// Initialize gameloop with a callback to be fired from inside the gameloop functions
const gameloop = Gameloop(getState().tempo, moveForward);

const startGame = () => {
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

function changeInterval(rate) {
    gameloop.changeInterval(rate);
    return dispatch({
        type: CHANGE_INTERVAL
    });
};

module.exports = {
    startGame,
    pauseGame,
    changeInterval
};