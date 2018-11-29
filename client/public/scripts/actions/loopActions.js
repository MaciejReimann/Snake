const {
    START_GAME,
    PAUSE_GAME,
    CHANGE_INTERVAL
} = require('./constants');
const { render } = require('./renderActions');
const Gameloop = require('../helpers/Gameloop')
const gameloop = Gameloop(render);

const startGame = () => {
    gameloop.start();
    return {
        type: START_GAME
    };
};

function pauseGame() {
    gameloop.stop();
    return {
        type: PAUSE_GAME
    };
};

function changeInterval(rate) {
    gameloop.changeInterval(rate);
    return {
        type: CHANGE_INTERVAL
    };
};

module.exports = {
    startGame,
    pauseGame,
    changeInterval
};