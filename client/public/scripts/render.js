const { getState } = require('./store');
const {
    fill,
    clear,
    drawRectangularGrid, 
    drawSquareFromCorner,
    drawCircle 
} = require('./helpers/renderHelpers');
const { 
    snakeColor,
    foodColor,
    gridColor,
    textColor,
    gameOverColor
} = require('./view/colorPalette').darkViolet;

function applyColorsToStyle() {
    document.querySelector(".header").style.backgroundColor = gridColor;
    document.querySelector(".canvas-container").style.backgroundColor = gridColor;
    document.querySelector(".canvas").style.backgroundColor = "black";
    document.querySelector(".page").style.color = textColor;
}

function renderCanvas() {
    const { snake, food, resolution, isOver } = getState();
    const CANVAS = document.querySelector(".canvas");
    clear(CANVAS);
    // when game is over
    if(isOver) {
        fill(CANVAS, gameOverColor);
    };
    // draw snake
    snake.forEach(square => drawSquareFromCorner(CANVAS, resolution, snakeColor, square));
    // draw food
    drawCircle(CANVAS, resolution, foodColor, food);
    // draw grid
    drawRectangularGrid(CANVAS, resolution, gridColor, .5);
};

function updateOptions() {
    document.querySelector(".options").textContent = 'GitHub';
}

function updateMessage() {
    const { isStarted, isPaused, isOver } = getState();
    let message;
    if (isOver) {
        message = 'Game is over <br> To restart press q';
    } else if(!isStarted) {
        message = 'To start press spacebar';
    } else if(isStarted && isPaused) {
        message = 'To resume press spacebar';
    } else {
        message = 'To pause press spacebar. To restart press q';
    };

    document.querySelector(".message").textContent = message;
};

function updateScore() {
    document.querySelector(".score").textContent = getState().score || 0;
};

function render() {
    applyColorsToStyle();
    renderCanvas();
    updateOptions();
    updateMessage();
    updateScore();
};

module.exports = {
    render
};
