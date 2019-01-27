// redux-like state store
module.exports = function createStore(reducer, initialState) {
  let state = initialState || {};
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  function subscribe(listenersArray) {
    if (listenersArray) {
      listenersArray.forEach(listener => listeners.push(listener));
    }

    // To unsubscribe execute what subscribe returns
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }

  return { getState, dispatch, subscribe };
};
