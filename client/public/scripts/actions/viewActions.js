const {
    RESIZE_BOARD,
    CHANGE_RESOLUTION,
    ADD_CONTROLS
    } = require('../actions/constants');
// const {
//     startGame,
//     pauseGame
// } = require('../actions/loopActions')
const {
    changeDirection
} = require('../actions/snakeActions')

function resizeBoard() {
    const canvasContainer = document.querySelector(".canvas-container");
    const payload = {
        width: canvasContainer.clientWidth,
        height: canvasContainer.clientHeight
    };
    return {
        type: RESIZE_BOARD,
        payload
    };
};

function addControls() {

    function onMobile() {

        return {
            type: ADD_CONTROLS,
            isOnDesktop: false
        };
    };

    function onDesktop() {
        window.addEventListener('keydown', e => {
            switch (e.key) {
                case 'w': case 'ArrowUp':    changeDirection('UP'); break
                case 'a': case 'ArrowLeft':  changeDirection('LEFT');  break
                case 's': case 'ArrowDown':  changeDirection('DOWN'); break
                case 'd': case 'ArrowRight': changeDirection('RIGHT');  break
            };
        });
        return {
            type: ADD_CONTROLS,
            isOnDesktop: true
        };
    };
    return document.body.clientWidth > 1024 ? onDesktop() : onMobile();
}

module.exports = {
    addControls,
    resizeBoard
}