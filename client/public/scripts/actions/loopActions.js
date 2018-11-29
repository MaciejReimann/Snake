const {
    START_GAME,
    PAUSE_GAME
} = require('./constants');
const { render } = require('./renderActions');
let gameloop;

function Gameloop(callback) {
    let interval;
    let lastTime;
    let id;
    let loopCallback = callback;

    function _hasIntervalPassed() {
        const intervalHasPassed = Date.now() > lastTime + interval;
        if(intervalHasPassed) {
            lastTime = Date.now();
            loopCallback();
        };
        return intervalHasPassed;
    };

    function set(i) {
        interval = i;
    };

    function start() {
        console.log("started")
        lastTime = Date.now();
        id = setInterval(_hasIntervalPassed, 10)
    };

    function stop() {
        clearInterval(id);
    };

    return {start, stop, set}
};

const startGame = () => {
    gameloop = Gameloop(render);
    gameloop.set(1000);
    if(gameloop) {
        gameloop.start()
    }    
    return {
        type: START_GAME
    };
};

function pauseGame() {
    console.log("Game started from the action")
    intervalID = setTimeout(moveForward, 1000)
    return {
        type: PAUSE_GAME
    };
};

module.exports = {
    startGame,
    pauseGame
};