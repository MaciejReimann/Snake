const { getState } = require('../store');
const {
    RENDER_CANVAS,
    UPDATE_SCORE
} = require('./constants');

function renderCanvas() {
    console.log('canvas rendered');
};

function updateScore() {
    console.log(getState().score)
};

module.exports = {
    renderCanvas,
    updateScore
}