const { RIGHT } = require('./directions').directions
const { createPoint } = require('../helpers/pointHelpers');

module.exports = {
    tempo: 500,
    increaseRate: .95,
    resolution: 20,
    directions: [ RIGHT ],
    snake: Array(4).fill()
        .map((_, i) => {return  {x: 4 - i, y: 1}   }),
    food: createPoint(7, 1, {id: 1}),
    isOver: false,
    isStarted: false,
    isPaused: false,
    score: 0
};