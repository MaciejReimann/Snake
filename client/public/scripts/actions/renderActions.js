const { dispatch } = require('../store');
const {
    RENDER_CANVAS,
    UPDATE_SCORE
} = require('./constants');

function renderCanvas() {
    console.log('canvas rendered');
    return {
        type: RENDER_CANVAS
    };    
};

function updateScore() {
    console.log('score updated')
    return dispatch({
        type: UPDATE_SCORE
    });
};

module.exports = {
    renderCanvas,
    updateScore
}