const {
    RENDER_CANVAS,
    UPDATE_SCORE
} = require('./constants');


function renderCanvas() {
    console.log('canvas rendered')
};

function updateScore() {
    console.log('score updated')
};



module.exports = {
    renderCanvas,
    updateScore
}