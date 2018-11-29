const {
    START_GAME,
    PAUSE_GAME
} = require('./constants');
const { render } = require('./renderActions');
const Gameloop = require('../helpers/Gameloop')
const gameloop = Gameloop(render);
gameloop.set(1000);

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

module.exports = {
    startGame,
    pauseGame
};