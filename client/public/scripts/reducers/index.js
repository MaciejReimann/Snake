const combineReducers = require('../helpers/combineReducers');
const loopReducer = require('./loopReducer')

module.exports = combineReducers({
    loop: loopReducer
})