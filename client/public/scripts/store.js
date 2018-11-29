const createStore = require('./helpers/createStore')
const combinedReducers = require('./reducers');

const initialState = {
    tempo: 1000
};

module.exports = createStore( combinedReducers, initialState );
