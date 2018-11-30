(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
// view actions
    RESIZE_BOARD: 'RESIZE_BOARD',
    CHANGE_RESOLUTION: 'CHANGE_RESOLUTION',
    ADD_CONTROLS: 'ADD_CONTROLS',
// render actions
    RENDER_CANVAS: 'RENDER_CANVAS',
    UPDATE_SCORE: 'UPDATE_SCORE',
// loop actions
    START_GAME:'START_GAME',
    PAUSE_GAME:'PAUSE_GAME',
    CHANGE_INTERVAL:'CHANGE_INTERVAL',
// snake actions
    MOVE_FORWARD:'MOVE_FORWARD',
    CHANGE_DIRECTION:'CHANGE_DIRECTION',
    ENQUEUE_TURN: 'ENQUEUE_TURN',
    EAT_FOOD: 'EAT_FOOD',
    HIT_BODY: 'HIT_BODY'
};
},{}],2:[function(require,module,exports){
const {
    START_GAME,
    PAUSE_GAME,
    CHANGE_INTERVAL
} = require('./constants');
const { moveForward } = require('./snakeActions');
const Gameloop = require('../helpers/Gameloop');

// Initialize gameloop with a callback to be fired from inside
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
},{"../helpers/Gameloop":7,"./constants":1,"./snakeActions":4}],3:[function(require,module,exports){
const {
    RENDER_CANVAS,
    UPDATE_SCORE
} = require('./constants');


function renderCanvas() {
    console.log('canvas rendered')
};

function updateScore() {
    console.log('score updated')
};



module.exports = {
    renderCanvas,
    updateScore
}
},{"./constants":1}],4:[function(require,module,exports){
const { dispatch } = require('../store');
const {
    MOVE_FORWARD,
    ENQUEUE_TURN,
    CHANGE_DIRECTION
} = require('./constants');


function moveForward() {
    console.log('moved forward')

};

function enqueueTurn(turn) { 
    return dispatch({
        type: ENQUEUE_TURN,
        payload: turn
    });
};

function changeDirection() {
    console.log('changed direction')
    
};

module.exports = {
    moveForward,
    enqueueTurn,
    changeDirection
};
},{"../store":18,"./constants":1}],5:[function(require,module,exports){
const {
    RESIZE_BOARD,
    CHANGE_RESOLUTION,
    ADD_CONTROLS
    } = require('../actions/constants');
const {
    enqueueTurn
} = require('../actions/snakeActions')
const {
    createElement,
    resizeCanvas
} = require('../helpers/DOMHelpers')

const canvasContainer = document.querySelector(".canvas-container");
let CANVAS;

function resizeBoard() {
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    if(!CANVAS) {
        CANVAS = createElement('canvas');
        canvasContainer.appendChild(CANVAS);
    }
    resizeCanvas(CANVAS, width, height);
    const payload = {
        width,
        height,
    };
    return {
        type: RESIZE_BOARD,
        payload
    };
};

function addControls() {
    

    function onMobile() {

        return {
            type: ADD_CONTROLS,
            isOnDesktop: false
        };
    };

    function onDesktop() {
        resizeBoard();
        window.addEventListener('keydown', e => {
            switch (e.key) {
                case 'w': case 'ArrowUp':    enqueueTurn('UP'); break
                case 'a': case 'ArrowLeft':  enqueueTurn('LEFT');  break
                case 's': case 'ArrowDown':  enqueueTurn('DOWN'); break
                case 'd': case 'ArrowRight': enqueueTurn('RIGHT');  break
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
    addControls,
    resizeBoard
}
},{"../actions/constants":1,"../actions/snakeActions":4,"../helpers/DOMHelpers":6}],6:[function(require,module,exports){
function createElement (element, className) {
  if(!className) {
    className = element;
  };
  const createdElement = document.createElement(element);
  createdElement.className = className;
  return createdElement;
};

function resizeCanvas(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
  return canvas;
}


module.exports = {
  createElement,
  resizeCanvas
}

},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
// redux-like state store
module.exports = function createStore(reducer, initialState) {
  let state = initialState || {};
  let listeners = [];

  function getState() {
    return state;
  };

  function dispatch(action) {
    console.log(action)
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
},{}],10:[function(require,module,exports){
const store = require('./store');
const {
    startGame,
    pauseGame
} = require('./actions/loopActions');
const {
    renderCanvas
} = require('./actions/renderActions');
const {
    resizeBoard,
    addControls
} = require('./actions/viewActions');

store.subscribe(() => console.log("SAgfsadg"));

window.addEventListener("load", () => {
    store.dispatch(addControls());
})

window.addEventListener('resize', () => {
    store.dispatch(resizeBoard());
})

window.addEventListener("keydown", (e) => {
    if (store.getState().isOnDesktop) {
        if(e.key=== 'Enter' || e.key=== ' ') {
            store.getState().isPaused
                ? store.dispatch(startGame())
                : store.dispatch(pauseGame())
        };
    };
})
},{"./actions/loopActions":2,"./actions/renderActions":3,"./actions/viewActions":5,"./store":18}],11:[function(require,module,exports){
const UP = { x: 0, y:-1 };
const RIGHT = { x: 1, y: 0 };
const DOWN = { x: 0, y: 1 };
const LEFT = { x:-1, y: 0 };

module.exports = { UP, RIGHT, DOWN, LEFT };
},{}],12:[function(require,module,exports){
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
},{"./constants":11}],13:[function(require,module,exports){
const combineReducers = require('../helpers/combineReducers');
const loopReducer = require('./loopReducer');
const renderReducer = require('./renderReducer');
const snakeReducer = require('./snakeReducer');
const viewReducer = require('./viewReducer');

module.exports = combineReducers({
    loopReducer,
    renderReducer,
    snakeReducer,
    viewReducer
})
},{"../helpers/combineReducers":8,"./loopReducer":14,"./renderReducer":15,"./snakeReducer":16,"./viewReducer":17}],14:[function(require,module,exports){
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

},{"../actions/constants":1}],15:[function(require,module,exports){
const {
    RENDER_CANVAS,
    UPDATE_SCORE
  } = require('../actions/constants');
  
  module.exports = function(state, action) {
    let nextState = {};
    if(!action) {
      action = {};
    };
  
    if(action.type === RENDER_CANVAS) {
        console.log("RENDER_CANVAS from reducer")
    } else if(action.type === UPDATE_SCORE) {
        console.log("UPDATE_SCORE from reducer")
    }
    return Object.assign(state, nextState)
  };
},{"../actions/constants":1}],16:[function(require,module,exports){
const {
    MOVE_FORWARD,
    ENQUEUE_TURN,
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
    } else if(action.type === ENQUEUE_TURN) {
        console.log("ENQUEUE_TURN from reducer")
    } else if(action.type === EAT_FOOD) {
        console.log("EAT_FOOD from reducer")
    } else if(action.type === HIT_BODY) {
        console.log("HIT_BODY from reducer")
    }
    return Object.assign(state, nextState)
  };
},{"../actions/constants":1}],17:[function(require,module,exports){
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
        nextState.boardWidth = action.payload.width;
        nextState.boardHeight = action.payload.height;
    } else if(action.type === CHANGE_RESOLUTION) {
        console.log("CHANGE_RESOLUTION from reducer")
    } else if(action.type === ADD_CONTROLS) {
        nextState.isOnDesktop = action.isOnDesktop;
    };
    return Object.assign(state, nextState)
  };
  
},{"../actions/constants":1}],18:[function(require,module,exports){
const createStore = require('./helpers/createStore')
const combinedReducers = require('./reducers');
const initialState = require('./logic/initialState');

module.exports = createStore( combinedReducers, initialState );

},{"./helpers/createStore":9,"./logic/initialState":12,"./reducers":13}]},{},[10]);
