// Testing one way to build reducer functions

const oneInitialState = {
    counter: 0
};

const otherInitialState = {
    name: "Donald"
};

function oneReducer(state, action) {
    let nextState = {};
    if(action === 'INCREMENT') {
        nextState.counter = state.counter + 1;
    };
    return Object.assign(state, nextState);
};

function otherReducer(state, action) {
    let nextState = {};
    if(action === 'CAPITALIZE') {
        nextState.name = state.name.toUpperCase();
    };
    return Object.assign(state, nextState);
};


test("", () => {
    let expectedState = {
        counter: 1
    };
    let incremented = oneReducer(oneInitialState, 'INCREMENT');
    expect(incremented).toEqual(expectedState);
    // Increment again
    incremented = oneReducer(oneInitialState, 'INCREMENT');
    expectedState = {
        counter: 2
    };
    expect(incremented).toEqual(expectedState);
});

test("", () => {
    let expectedState = {
        name: 'DONALD'
    };
    let capitalized = otherReducer(otherInitialState, 'CAPITALIZE');
    expect(capitalized).toEqual(expectedState);
});