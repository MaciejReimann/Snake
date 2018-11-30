const createStore = require('./helpers/createStore')
const combinedReducers = require('./reducers');
const initialState = require('./logic/initialState');

module.exports = createStore( combinedReducers, initialState );
