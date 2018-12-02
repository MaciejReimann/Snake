const {
    RENDER_CANVAS,
    UPDATE_SCORE
} = require('./constants');

function renderCanvas() {
    console.log('canvas rendered');
    return dispatch({
        type: RENDER_CANVAS
    });    
};

function updateScore() {
    console.log('score updated')
    return dispatchEvent({
        type: UPDATE_SCORE
    });
};

module.exports = {
    renderCanvas,
    updateScore
}