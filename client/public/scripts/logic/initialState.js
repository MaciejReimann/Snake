const { RIGHT } = require('./constants');

module.exports = {
    tempo: 1000,
    increaseRate: .95,
    resolution: 20,
    directions: [ RIGHT ],
    snake: Array(4).fill()
        .map((_, i) => {return  {x: 4 - i, y: 1}   }),
    food: { x: 7, y: 1 },
    isOver: true,
    isStarted: false,
    isPaused: true,
};