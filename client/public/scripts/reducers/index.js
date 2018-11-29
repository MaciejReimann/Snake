const combineReducers = require('../helpers/combineReducers');
const loopReducer = require('./loopReducer');
const snakeReducer = require('./snakeReducer');
const viewReducer = require('./viewReducer');

module.exports = combineReducers({
    view: viewReducer,
    loop: loopReducer,
    snake: snakeReducer
})