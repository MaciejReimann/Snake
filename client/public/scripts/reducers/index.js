const combineReducers = require('../helpers/combineReducers');
const loopReducer = require('./loopReducer');
const renderReducer = require('./renderReducer');
const snakeReducer = require('./snakeReducer');
const viewReducer = require('./viewReducer');

module.exports = combineReducers({
    loopReducer,
    renderReducer,
    snakeReducer,
    viewReducer
})