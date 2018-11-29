const createStore = require('./helpers/createStore')
const combinedReducers = require('./reducers');

const initialState = {
    paused: true,
    tempo: 1000
};

module.exports = createStore( combinedReducers, initialState );
