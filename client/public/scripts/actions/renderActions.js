const { getState } = require('../store');
const {
    RENDER_CANVAS,
    UPDATE_SCORE
} = require('./constants');

function renderCanvas() {

    console.log('canvas rendered');
};

function updateScore() {
    document.querySelector(".score").textContent = getState().score || 0;
};

module.exports = {
    renderCanvas,
    updateScore
};
