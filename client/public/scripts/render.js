const { getState } = require('./store');

function renderCanvas() {

    console.log('canvas rendered');
};

function updateMessage() {
    const message = getState().isStarted 
        ? 'To start game press spacebar'
        : 'To pause game press spacebar'

    document.querySelector(".message").textContent = message;
};

function updateScore() {
    document.querySelector(".score").textContent = getState().score || 0;
};

function render() {
    renderCanvas();
    updateMessage();
    updateScore();
}

module.exports = {
    render
};
