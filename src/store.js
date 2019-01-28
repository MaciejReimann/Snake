const createStore = require("./logic/helpers/createStore");
const combinedReducers = require("./logic/reducers");
const initialState = require("./logic/reducers/initialState");

module.exports = createStore(combinedReducers, initialState);
