(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const INIT_LOOP = 'INIT_LOOP';
const START_GAME = 'START_GAME';
const PAUSE_GAME = 'PAUSE_GAME';

const MOVE_FORWARD = 'MOVE_FORWARD';


module.exports = {
    INIT_LOOP,
    START_GAME,
    PAUSE_GAME,
    MOVE_FORWARD 
}
},{}],2:[function(require,module,exports){
const {
    START_GAME,
    PAUSE_GAME
} = require('./constants');
const { render } = require('./renderActions');
let gameloop;

function Gameloop(callback) {
    let interval;
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

    function set(i) {
        interval = i;
    };

    function start() {
        console.log("started")
        lastTime = Date.now();
        id = setInterval(_hasIntervalPassed, 10)
    };

    function stop() {
        clearInterval(id);
    };

    return {start, stop, set}
};

const startGame = () => {
    gameloop = Gameloop(render);
    gameloop.set(1000);
    if(gameloop) {
        gameloop.start()
    }    
    return {
        type: START_GAME
    };
};

function pauseGame() {
    console.log("Game started from the action")
    intervalID = setTimeout(moveForward, 1000)
    return {
        type: PAUSE_GAME
    };
};

module.exports = {
    startGame,
    pauseGame
};
},{"./constants":1,"./renderActions":3}],3:[function(require,module,exports){



function render() {
    console.log('rendered')
};



module.exports = {
    render
}
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
const snake = require('./store');
const {
    initLoop,
    startGame,
    pauseGame
} = require('./actions/loopActions');

console.log(snake.getState())
console.log("hello from index.js")

window.addEventListener("keydown", (e) => {
    console.log(e.key)
    if(e.key=== 'Enter') {
        snake.dispatch(startGame());    
    }
})
},{"./actions/loopActions":2,"./store":9}],7:[function(require,module,exports){
const combineReducers = require('../helpers/combineReducers');
const loopReducer = require('./loopReducer')

module.exports = combineReducers({
    loop: loopReducer
})
},{"../helpers/combineReducers":4,"./loopReducer":8}],8:[function(require,module,exports){
const {
  INIT_LOOP,
  START_GAME,
  PAUSE_GAME
} = require('../actions/constants');

module.exports = function(state, action) {
  let nextState = {};
  if(!action) {
    action = {};
  };
  
  if(action.type === START_GAME) {
    console.log("Game started from the reducer")
    nextState.gameStarted = true;
  }
  return Object.assign(state, nextState)
};


// const gameloop = (() => {
//   let id;
//   const game = snakeGame.getInstance()
//   const intervalPassed = t1 => t2 => tempo => t2-t1 > tempo;

//   const start = () => {
//     const loop = () => {
//       const lastTime = game.getState().lastTime;
//       const tempo = game.getState().tempo;
//       if(intervalPassed(lastTime)(Date.now())(tempo)) {
//         // if more miliseconds passed than tempo, action is dispatched
//         game.dispatch({
//             type: 'MOVE_SNAKE'
//           })
//         }
//       id = window.requestAnimationFrame(loop);
//       }
//     id = window.requestAnimationFrame(loop);
//   }

//   const stop = () => {
//     window.cancelAnimationFrame(id);
//   }
//   return { start, stop }
// })()

},{"../actions/constants":1}],9:[function(require,module,exports){
const createStore = require('./helpers/createStore')
const combinedReducers = require('./reducers');

const initialState = {
    tempo: 1000
};

module.exports = createStore( combinedReducers, initialState );

},{"./helpers/createStore":5,"./reducers":7}]},{},[6]);
