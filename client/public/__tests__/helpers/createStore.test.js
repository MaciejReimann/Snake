const createStore = require('../../scripts/helpers/createStore');
const combineReducers = require('../../scripts/helpers/combineReducers');

const INCREMENT = { type: 'INCREMENT' };
const CAPITALIZE = { type: 'CAPITALIZE' };

function oneReducer(state, action) {
    let nextState = {};
    if(action === INCREMENT) {
        nextState.counter = state.counter + 1;
    };
    return Object.assign(state, nextState);
};

function otherReducer(state, action) {
    let nextState = {};
    if(action === CAPITALIZE) {
        nextState.name = state.name.toUpperCase();
    };
    return Object.assign(state, nextState);
};

const combinedReducers = combineReducers({
    one: oneReducer,
    other: otherReducer
});

const initialState = {
    counter: 0,
    name: 'Donald'
};

const store = createStore(combinedReducers, initialState)

test("Initial state", () => {
    expect(store.getState()).toEqual(initialState);
});

describe("Dispatching actions", () => {
    let nextState = initialState;
    test("One reducer", () => {
        store.dispatch(INCREMENT);
        nextState.counter = 1;

        expect(store.getState()).toEqual(nextState);

        store.dispatch(INCREMENT);
        nextState.counter = 2;

        expect(store.getState()).toEqual(nextState);
    });
    test("Other reducer", () => {
        store.dispatch(CAPITALIZE);
        nextState.name = 'DONALD';
        
        expect(store.getState()).toEqual(nextState);
    });
});