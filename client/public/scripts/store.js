const createStore = require('./helpers/createStore')
const combinedReducers = require('./reducers');

const store = createStore(
    combinedReducers,
    initialState
);

module.exports = store;