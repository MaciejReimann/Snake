const combineReducers = require("../../logic/helpers/combineReducers");

function oneReducer(state, action) {
  let nextState = {};
  if (action === "INCREMENT") {
    nextState.counter = state.counter + 1;
  }
  return Object.assign(state, nextState);
}

function otherReducer(state, action) {
  let nextState = {};
  if (action === "CAPITALIZE") {
    nextState.name = state.name.toUpperCase();
  }
  return Object.assign(state, nextState);
}

test("Valid params", () => {
  const combinedReducers = combineReducers({
    one: oneReducer,
    other: otherReducer
  });
  let state = {
    name: "Donald",
    counter: 0
  };
  let nextState = {
    name: "Donald",
    counter: 1
  };
  expect(combinedReducers(state, "INCREMENT")).toEqual(nextState);
  state = nextState;
  nextState = {
    name: "DONALD",
    counter: 1
  };
  expect(combinedReducers(state, "CAPITALIZE")).toEqual(nextState);
  state = nextState;
  nextState = {
    name: "DONALD",
    counter: 2
  };
  expect(combinedReducers(state, "INCREMENT")).toEqual(nextState);
});
