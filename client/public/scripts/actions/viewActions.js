const { dispatch, getState } = require('../store');
const {
    RESIZE_BOARD,
    CHANGE_RESOLUTION, // TODO!!!
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
const addKeydownListeners = () => require('../helpers/addKeydownListeners')
    (getState, startGame, resumeGame, pauseGame, enqueueTurn);
const addSwipeListeners = () => require('../helpers/addSwipeListeners')
    (getState, startGame, resumeGame, pauseGame, enqueueTurn);

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
    return dispatch({
        type: RESIZE_BOARD,
        payload: {
            width,
            height,
        }
    });
};

function addControls() {
    let deviceType;
    if(document.body.clientWidth > 1024) {
        deviceType = 'desktop';
        resizeBoard();
        addKeydownListeners();
    } else {
        deviceType = 'mobile';
        addSwipeListeners();
    };
    return dispatch({
        type: ADD_CONTROLS,
        payload: {
            deviceType
        }
    });    
};

module.exports = {
    resizeBoard,
    addControls    
};