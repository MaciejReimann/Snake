(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

// View Actions
const RESIZE_BOARD = 'RESIZE_BOARD';
const CHANGE_RESOLUTION = 'CHANGE_RESOLUTION';
const ADD_CONTROLS = 'ADD_CONTROLS';
// Loop Actions
const START_GAME = 'START_GAME';
const PAUSE_GAME = 'PAUSE_GAME';
const CHANGE_INTERVAL = 'CHANGE_INTERVAL';
// Snake Actions
const MOVE_FORWARD = 'MOVE_FORWARD';
const CHANGE_DIRECTION = 'CHANGE_DIRECTION';
const EAT_FOOD = 'EAT_FOOD';
const HIT_BODY = 'HIT_BODY';


module.exports = {
    RESIZE_BOARD,
    CHANGE_RESOLUTION,
    ADD_CONTROLS,

    START_GAME,
    PAUSE_GAME,
    CHANGE_INTERVAL,

    MOVE_FORWARD,
    CHANGE_DIRECTION,
    EAT_FOOD,
    HIT_BODY
};
},{}],2:[function(require,module,exports){
const {
    START_GAME,
    PAUSE_GAME,
    CHANGE_INTERVAL
} = require('./constants');
const { moveForward } = require('./snakeActions');
const Gameloop = require('../helpers/Gameloop')
const gameloop = Gameloop(moveForward);

const startGame = () => {
    gameloop.start();
    return {
        type: START_GAME
    };
};

function pauseGame() {
    gameloop.stop();
    return {
        type: PAUSE_GAME
    };
};

function changeInterval(rate) {
    gameloop.changeInterval(rate);
    return {
        type: CHANGE_INTERVAL
    };
};

module.exports = {
    startGame,
    pauseGame,
    changeInterval
};
},{"../helpers/Gameloop":5,"./constants":1,"./snakeActions":3}],3:[function(require,module,exports){
const {
    MOVE_FORWARD,
    CHANGE_DIRECTION
} = require('./constants');


function moveForward() {
    console.log('moved forward')

};

function changeDirection() {
    console.log('changed direction')
    
};


module.exports = {
    moveForward,
    changeDirection
};
},{"./constants":1}],4:[function(require,module,exports){
const {
    RESIZE_BOARD,
    CHANGE_RESOLUTION,
    ADD_CONTROLS
    } = require('../actions/constants');
// const {
//     startGame,
//     pauseGame
// } = require('../actions/loopActions')
const {
    changeDirection
} = require('../actions/snakeActions')

function addControls() {

    function onMobile() {

        return {
            type: ADD_CONTROLS,
            isOnDesktop: false
        };
    };

    function onDesktop() {
        window.addEventListener('keydown', e => {
            switch (e.key) {
                case 'w': case 'ArrowUp':    changeDirection('UP'); break
                case 'a': case 'ArrowLeft':  changeDirection('LEFT');  break
                case 's': case 'ArrowDown':  changeDirection('DOWN'); break
                case 'd': case 'ArrowRight': changeDirection('RIGHT');  break
            };
        });
        return {
            type: ADD_CONTROLS,
            isOnDesktop: true
        };
    };
    return document.body.clientWidth > 1024 ? onDesktop() : onMobile();
}

module.exports = {
    addControls
}
},{"../actions/constants":1,"../actions/snakeActions":3}],5:[function(require,module,exports){
module.exports = function Gameloop(callback) {
    let interval = 1000;
    let lastTime;
    let id;
    let loopCallback = callback;

    function _hasIntervalPassed() {
        const intervalHasPassed = Date.now() > lastTime + interval;
        if(intervalHasPassed) {
            lastTime = Date.now();
            loopCallback();
        };
        return intervalHasPassed;
    };

    function changeInterval(rate) {
        console.log("interval changed")
        interval = interval * rate || interval ;
    };

    function start() {
        lastTime = Date.now();
        if(!id) {
            id = setInterval(_hasIntervalPassed, 10)
        };        
    };

    function stop() {
       id = clearInterval(id);
    };

    return {start, stop, changeInterval}
};
},{}],6:[function(require,module,exports){
module.exports = function combineReducers(reducers) {
    let combinedState = {};
    // Leave only valid reducers, 
    const reducersArray = Object.values(reducers)
        .filter(reducer => typeof reducer({}) === 'object');
    // Expose one common reducer
    return function(state, action) {
        reducersArray.forEach(reducer => Object.assign(combinedState, reducer(state, action)));
        return combinedState;
    };
};
},{}],7:[function(require,module,exports){
// redux-like state store
module.exports = function createStore(reducer, initialState) {
  let state = initialState || {};
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

  return { getState, dispatch, subscribe };
};
},{}],8:[function(require,module,exports){
const snake = require('./store');
const {
    addControls
} = require('./actions/viewActions');
const {
    startGame,
    pauseGame
} = require('./actions/loopActions');

window.addEventListener("load", () => {
    snake.dispatch(addControls());
})

window.addEventListener("keydown", (e) => {
    if (snake.getState().isOnDesktop) {
        if(e.key=== 'Enter' || e.key=== ' ') {
            snake.getState().isPaused
                ? snake.dispatch(startGame())
                : snake.dispatch(pauseGame())
        };
    };
})
},{"./actions/loopActions":2,"./actions/viewActions":4,"./store":15}],9:[function(require,module,exports){
const UP = { x: 0, y:-1 };
const RIGHT = { x: 1, y: 0 };
const DOWN = { x: 0, y: 1 };
const LEFT = { x:-1, y: 0 };
const DIRECTIONS = { UP, RIGHT, DOWN, LEFT };


module.exports = { UP, RIGHT, DOWN, LEFT };
},{}],10:[function(require,module,exports){
const { RIGHT } = require('./constants');

module.exports = {
    tempo: 1000,
    increaseRate: .95,
    directions: [ RIGHT ],
    body: Array(4).fill()
    .map((_, i) => {return  {x: 4 - i, y: 1}   }),
    food: { x: 7, y: 1 },
    isOver: false,
    isStarted: false,
    isPaused: true,
};
},{"./constants":9}],11:[function(require,module,exports){
const combineReducers = require('../helpers/combineReducers');
const loopReducer = require('./loopReducer');
const snakeReducer = require('./snakeReducer');
const viewReducer = require('./viewReducer');

module.exports = combineReducers({
    view: viewReducer,
    loop: loopReducer,
    snake: snakeReducer
})
},{"../helpers/combineReducers":6,"./loopReducer":12,"./snakeReducer":13,"./viewReducer":14}],12:[function(require,module,exports){
const {
  START_GAME,
  PAUSE_GAME,
  CHANGE_INTERVAL
} = require('../actions/constants');

module.exports = function(state, action) {
  let nextState = {};
  if(!action) {
    action = {};
  };

  if(action.type === START_GAME) {
    console.log("Game started from the reducer")
    nextState.isStarted = true;
    nextState.isPaused = false;
  } else if(action.type === PAUSE_GAME) {
    console.log("Game paused from the reducer")
    nextState.isPaused = true;
  } else if(action.type === CHANGE_INTERVAL) {
    nextState.tempo = state.tempo * state.increaseRate;
  }
  return Object.assign(state, nextState)
};

},{"../actions/constants":1}],13:[function(require,module,exports){
const {
    MOVE_FORWARD,
    CHANGE_DIRECTION,
    EAT_FOOD,
    HIT_BODY
  } = require('../actions/constants');
  
  module.exports = function(state, action) {
    let nextState = {};
    if(!action) {
      action = {};
    };
  
    if(action.type === MOVE_FORWARD) {
        console.log("MOVE_FORWARD from reducer")
    } else if(action.type === CHANGE_DIRECTION) {
        console.log("CHANGE_DIRECTION from reducer")
    } else if(action.type === EAT_FOOD) {
        console.log("EAT_FOOD from reducer")
    } else if(action.type === HIT_BODY) {
        console.log("HIT_BODY from reducer")
    }
    return Object.assign(state, nextState)
  };
},{"../actions/constants":1}],14:[function(require,module,exports){
const {
    RESIZE_BOARD,
    CHANGE_RESOLUTION,
    ADD_CONTROLS
  } = require('../actions/constants');
  
  module.exports = function(state, action) {
    let nextState = {};
    if(!action) {
      action = {};
    };
  
    if(action.type === RESIZE_BOARD) {
        console.log("RESIZE_BOARD from reducer")
    } else if(action.type === CHANGE_RESOLUTION) {
        console.log("CHANGE_RESOLUTION from reducer")
    } else if(action.type === ADD_CONTROLS) {
        nextState.isOnDesktop = action.isOnDesktop;
    }
    return Object.assign(state, nextState)
  };
  
},{"../actions/constants":1}],15:[function(require,module,exports){
const createStore = require('./helpers/createStore')
const combinedReducers = require('./reducers');
const initialState = require('./logic/initialState');

module.exports = createStore( combinedReducers, initialState );

},{"./helpers/createStore":7,"./logic/initialState":10,"./reducers":11}]},{},[8]);
