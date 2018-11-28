// redux-like state management
function createStore(reducer) {
  let state = {};
  let listeners = [];

  function getState() {
    return state;
  };

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  function subscribe(listener) {
    listeners.push(listener);

    // To unsubscribe execute what subscribe returns
    return () => {
      listeners = listeners.filter(l => l !== listener );
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe }
};