const {
    RESIZE_BOARD,
    CHANGE_RESOLUTION,
    ADD_CONTROLS
    } = require('../actions/constants');
const {
    createElement,
    resizeCanvas
} = require('../helpers/DOMHelpers')
const {
    changeDirection
} = require('../actions/snakeActions')

const canvasContainer = document.querySelector(".canvas-container");
let CANVAS;

function resizeBoard() {
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    if(!CANVAS) {
        CANVAS = createElement('canvas');
        canvasContainer.appendChild(CANVAS);
    }
    resizeCanvas(CANVAS, width, height);
    const payload = {
        width,
        height,
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
        resizeBoard();
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