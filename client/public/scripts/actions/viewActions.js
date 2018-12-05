const { dispatch, getState } = require('../store');
const {
    NEW_VIEW,
    RESIZE_BOARD,
    CHANGE_RESOLUTION,
    ADD_CONTROLS
    } = require('../actions/constants');
const {
    enqueueTurn
} = require('../actions/snakeActions');
const {
    startGame,
    pauseGame,
    resumeGame
} = require('../actions/loopActions');
const {
    createElement,
    resizeCanvas
} = require('../helpers/DOMHelpers');

const canvasContainer = document.querySelector(".canvas-container");
let CANVAS;

function resizeBoard() {
    const res = getState().resolution;
    const width = Math.floor(canvasContainer.clientWidth / res ) * res - 2 * res;
    const height = Math.floor(canvasContainer.clientHeight / res) * res - res;
    if(!CANVAS) {
        CANVAS = createElement('canvas');
        canvasContainer.appendChild(CANVAS);
    }
    resizeCanvas(CANVAS, width, height);
    const payload = {
        width,
        height,
    };
    return dispatch({
        type: RESIZE_BOARD,
        payload
    });
};

function addKeydownListeners() {
    window.addEventListener('keydown', e => {
        if(e.key === ' ') {
            if(!getState().isStarted) {
                startGame();
            } else if(getState().isPaused) {
                resumeGame();
            } else {
                pauseGame();
            }            
        } else if(e.key === 'Enter') {
            if(getState().isOver) {
                console.log(
                    getState().isOver, 
                    getState().isPaused
                )
                startGame();
            };
        };
        switch (e.key) {
            case 'w': case 'ArrowUp':    enqueueTurn('UP'); break
            case 'a': case 'ArrowLeft':  enqueueTurn('LEFT');  break
            case 's': case 'ArrowDown':  enqueueTurn('DOWN'); break
            case 'd': case 'ArrowRight': enqueueTurn('RIGHT');  break
        };
    });
}

function addSwipeListeners() {
    window.addEventListener('keydown', e => {

    });
}

function addControls() {    

    function onMobile() {
        addSwipeListeners();
        return dispatch({
            type: ADD_CONTROLS,
            deviceType: 'mobile'
        });
    };

    function onDesktop() {
        resizeBoard();
        addKeydownListeners();
        return dispatch({
            type: ADD_CONTROLS,
            deviceType: 'desktop'
        });
    };
    return document.body.clientWidth > 1024 ? onDesktop() : onMobile();
}

module.exports = {
    resizeBoard,
    addControls    
};