const { RIGHT } = require("./possibleDirections");
const { createPoint } = require("../helpers/pointHelpers");

module.exports = {
  tempo: 100,
  tempoChangeRate: 1,
  resolution: 40,
  directions: [RIGHT],
  snake: Array(3)
    .fill()
    .map((_, i) => createPoint(3 - i, 1)),
  food: createPoint(7, 1, {
    id: 1
  }),
  isOver: false,
  isStarted: false,
  isPaused: false,
  score: 0
};
