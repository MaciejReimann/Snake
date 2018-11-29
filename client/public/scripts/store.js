const createStore = require('./helpers/createStore')
const combinedReducers = require('./reducers');

const initialState = {
    counter: 0
};

const store = createStore(
    combinedReducers,
    initialState
);

module.exports = store;