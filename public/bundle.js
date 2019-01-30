(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
  // view actions
  RESIZE_BOARD: "RESIZE_BOARD",
  // CHANGE_RESOLUTION: 'CHANGE_RESOLUTION', // TODO!
  // ADD_CONTROLS: 'ADD_CONTROLS',
  // loop actions
  START_GAME: "START_GAME",
  PAUSE_GAME: "PAUSE_GAME",
  RESUME_GAME: "RESUME_GAME",
  CONTROL_INTERVAL: "CONTROL_INTERVAL",
  // snake actions
  MOVE_FORWARD: "MOVE_FORWARD",
  ENQUEUE_TURN: "ENQUEUE_TURN"
};

},{}],2:[function(require,module,exports){
const {
  startGame,
  pauseGame,
  resumeGame,
  controlInterval
} = require("./loopActions");
const { moveForward, enqueueTurn } = require("./snakeActions");
const { resizeBoard } = require("./viewActions");

module.exports = {
  startGame,
  pauseGame,
  resumeGame,
  controlInterval,
  moveForward,
  enqueueTurn,
  resizeBoard
};

},{"./loopActions":3,"./snakeActions":4,"./viewActions":5}],3:[function(require,module,exports){
const { dispatch, getState } = require("../../store");
const { tempo } = require("../reducers/initialState");
const {
  START_GAME,
  PAUSE_GAME,
  RESUME_GAME,
  CONTROL_INTERVAL
} = require("./constants");
const { moveForward } = require("./snakeActions");
const Gameloop = require("../helpers/Gameloop");
// Initialize gameloop with a callback to be fired on each loop
const gameloop = Gameloop(tempo, () =>
  moveForward(() => controlInterval(getState()))
);

function startGame() {
  gameloop.start();
  return dispatch({
    type: START_GAME
  });
}

function pauseGame() {
  gameloop.stop();
  return dispatch({
    type: PAUSE_GAME
  });
}

function resumeGame() {
  gameloop.start();
  return dispatch({
    type: RESUME_GAME
  });
}

function controlInterval(state) {
  if (state.isOver) {
    gameloop.stop();
  }
  gameloop.changeInterval(state.tempo);
  return dispatch({
    type: CONTROL_INTERVAL
  });
}

module.exports = {
  startGame,
  pauseGame,
  resumeGame,
  controlInterval
};

},{"../../store":31,"../helpers/Gameloop":6,"../reducers/initialState":12,"./constants":1,"./snakeActions":4}],4:[function(require,module,exports){
const { dispatch } = require("../../store");
const { MOVE_FORWARD, ENQUEUE_TURN } = require("./constants");

function moveForward(callback) {
  callback();
  return dispatch({
    type: MOVE_FORWARD
  });
}

function enqueueTurn(turn) {
  return dispatch({
    type: ENQUEUE_TURN,
    payload: turn
  });
}

module.exports = {
  moveForward,
  enqueueTurn
};

},{"../../store":31,"./constants":1}],5:[function(require,module,exports){
const { dispatch } = require("../../store");
const { RESIZE_BOARD } = require("../actions/constants");

function resizeBoard(containerWidth, containerHeight, state, canvas, callback) {
  const res = state.resolution;
  const width = Math.floor(containerWidth / res) * res - 2 * res;
  const height = Math.floor(containerHeight / res) * res - res;
  callback(canvas, width, height);
  return dispatch({
    type: RESIZE_BOARD,
    payload: {
      width,
      height
    }
  });
}

module.exports = {
  resizeBoard
};

},{"../../store":31,"../actions/constants":1}],6:[function(require,module,exports){
const intervals = [];

module.exports = function Gameloop(initialInterval, callback) {
  let interval = initialInterval;
  let loopCallback = callback;
  let lastTime;
  let id;

  function _hasIntervalPassed() {
    const intervalHasPassed = Date.now() > lastTime + interval;
    if (intervalHasPassed) {
      lastTime = Date.now();
      loopCallback();
    }
    return intervalHasPassed;
  }

  function changeInterval(newInterval) {
    if (newInterval) {
      interval = newInterval;
      console.log(interval);
    }
  }

  function start() {
    lastTime = Date.now();
    intervals.push(setInterval(_hasIntervalPassed, 10));
  }

  function stop() {
    intervals.forEach(id => clearInterval(id));
  }

  return { start, stop, changeInterval };
};

},{}],7:[function(require,module,exports){

function getLastItem(array) {
    return array.length > 0
        ? array[array.length - 1]
        : null
};

module.exports = {
    getLastItem
}
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

},{}],10:[function(require,module,exports){
function isPoint(something) {
  return (
    typeof something === "object" &&
    something.hasOwnProperty("x") &&
    something.hasOwnProperty("y") &&
    typeof something.x === "number" &&
    typeof something.y === "number"
  );
}

function createPoint(x, y, prop) {
  const property = prop || {};
  return {
    x: x,
    y: y,
    prop: property
  };
}

function createRandomPoint(rangeX, rangeY, prop) {
  return createPoint(
    Math.floor(Math.random() * rangeX),
    Math.floor(Math.random() * rangeY),
    prop
  );
}

function movePoint(point, x, y) {
  return createPoint(point.x + x, point.y + y, point.prop);
}

function movePointOnY(point, y) {
  return movePoint(point, 0, y);
}

function movePointOnX(point, x) {
  return movePoint(point, x, 0);
}

function addTwoPoints(point1, point2) {
  const mergedProps = Object.assign({}, point1.prop, point2.prop);
  return createPoint(point1.x + point2.x, point1.y + point2.y, mergedProps);
}

function multiplyPoint(point, n) {
  return createPoint(point.x * n, point.y * n, point.prop);
}

function arePointsEqual(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
}

function isPointWithinXRange(point, start, end) {
  return point.x > start && point.x < end;
}

function isPointWithinYRange(point, start, end) {
  return point.y > start && point.y < end;
}

function translatePointToPolar(point, angle) {
  return {
    r: Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)),
    angle: Math.atan2(point.y, point.x) * (180 / Math.PI) + angle,
    prop: point.prop || {}
  };
}

function translatePointToCartesian(point) {
  const roundValue = n => Math.round(n * 1000) / 1000;
  return {
    x: roundValue(point.r * Math.cos(point.angle * (Math.PI / 180))),
    y: roundValue(point.r * Math.sin(point.angle * (Math.PI / 180))),
    prop: point.prop || {}
  };
}

function rotatePointOnGlobalZero(point, angle) {
  return translatePointToCartesian(translatePointToPolar(point, angle));
}

module.exports = {
  isPoint,
  createPoint,
  createRandomPoint,
  movePoint,
  movePointOnY,
  movePointOnX,
  addTwoPoints,
  multiplyPoint,
  arePointsEqual,
  isPointWithinXRange,
  isPointWithinYRange,
  translatePointToPolar,
  translatePointToCartesian,
  rotatePointOnGlobalZero
};

},{}],11:[function(require,module,exports){
const combineReducers = require("../helpers/combineReducers");
const loopReducer = require("./loopReducer");
const snakeReducer = require("./snakeReducer");
const viewReducer = require("./viewReducer");

module.exports = combineReducers({
  loopReducer,
  snakeReducer,
  viewReducer
});

},{"../helpers/combineReducers":8,"./loopReducer":14,"./snakeReducer":16,"./viewReducer":17}],12:[function(require,module,exports){
const { RIGHT } = require("./possibleDirections");
const { createPoint } = require("../helpers/pointHelpers");

module.exports = {
  tempo: 100,
  tempoChangeRate: 1,
  resolution: 40,
  directions: [RIGHT],
  snake: Array(3)
    .fill()
    .map((_, i) => createPoint(3 - i, 1)),
  food: createPoint(7, 1, {
    id: 1
  }),
  isOver: false,
  isStarted: false,
  isPaused: false,
  score: 0
};

},{"../helpers/pointHelpers":10,"./possibleDirections":15}],13:[function(require,module,exports){
const {
  createPoint,
  createRandomPoint,
  arePointsEqual
} = require("../helpers/pointHelpers");

module.exports = function Snake(state) {
  const {
    boardWidth,
    boardHeight,
    resolution,
    directions,
    snake,
    score,
    tempoChangeRate,
    food
  } = state;

  function _moveHead() {
    const mod = (x, y) => ((y % x) + x) % x; // http://bit.ly/2oF4mQ7
    return createPoint(
      mod(boardWidth / resolution, snake[0].x + directions[0].x),
      mod(boardHeight / resolution, snake[0].y + directions[0].y)
    );
  }

  function _placeFood(state) {
    const nextId = food.prop.id + 1;
    const newFood = createRandomPoint(
      boardWidth / resolution,
      boardHeight / resolution,
      {
        id: nextId
      }
    );
    if (state.snake.some(p => arePointsEqual(newFood, p))) {
      console.log("overlap!!!!!!!!!!!!!!!!!");
      return _placeFood(state);
    }
    return newFood;
  }

  function crashes() {
    return snake.find(p => arePointsEqual(p, _moveHead(state)));
  }

  function eats() {
    return arePointsEqual(_moveHead(state), food);
  }

  function moves(nextState) {
    return Object.assign(nextState, {
      tempoChangeRate: 1,
      snake: [_moveHead(state)].concat(snake).slice(0, snake.length)
    });
  }

  function grows(nextState) {
    if (food.prop.id % 2 === 0 && tempoChangeRate === 1) {
      nextState.tempoChangeRate = 0.95;
    }
    return Object.assign(nextState, {
      food: _placeFood(state),
      snake: [_moveHead(state)].concat(snake),
      score: score + snake.length
    });
  }

  return {
    crashes,
    eats,
    moves,
    grows
  };
};

},{"../helpers/pointHelpers":10}],14:[function(require,module,exports){
const {
  START_GAME,
  PAUSE_GAME,
  RESUME_GAME,
  CONTROL_INTERVAL
} = require("../actions/constants");
const initialState = require("./initialState");

module.exports = function(state, action = {}) {
  let nextState = {};
  if (action.type === START_GAME) {
    if (state.isOver) {
      return initialState;
    }
    nextState.isStarted = true;
  } else if (action.type === PAUSE_GAME) {
    nextState.isPaused = true;
  } else if (action.type === RESUME_GAME) {
    nextState.isPaused = false;
  } else if (action.type === CONTROL_INTERVAL) {
    nextState.tempo = state.tempo * state.tempoChangeRate;
  }
  return Object.assign(state, nextState);
};

},{"../actions/constants":1,"./initialState":12}],15:[function(require,module,exports){
module.exports = {
  UP: {
    x: 0,
    y: -1
  },
  RIGHT: {
    x: 1,
    y: 0
  },
  DOWN: {
    x: 0,
    y: 1
  },
  LEFT: {
    x: -1,
    y: 0
  }
};

},{}],16:[function(require,module,exports){
const { MOVE_FORWARD, ENQUEUE_TURN } = require("../actions/constants");
const { getLastItem } = require("../helpers/arrayHelpers");
const possibleDirections = require("./possibleDirections");
const Snake = require("./logicHelpers");

module.exports = function(state, action = {}) {
  const { type, payload } = action;
  const { eats, crashes, moves, grows } = Snake(state);
  let nextState = {};
  if (type === MOVE_FORWARD) {
    if (state.directions.length > 1) {
      nextState.directions = state.directions.slice(1, state.directions.length);
    }
    if (crashes()) {
      nextState.isOver = true;
    } else {
      if (eats()) {
        nextState = grows(nextState);
      } else {
        nextState = moves(nextState);
      }
    }
  } else if (type === ENQUEUE_TURN) {
    const nextDirection = possibleDirections[payload];
    const isTurnValid =
      nextDirection.x + getLastItem(state.directions).x !== 0 ||
      nextDirection.y + getLastItem(state.directions).y !== 0;
    if (isTurnValid) {
      nextState.directions = state.directions.concat(nextDirection);
    }
  }
  return Object.assign(state, nextState);
};

},{"../actions/constants":1,"../helpers/arrayHelpers":7,"./logicHelpers":13,"./possibleDirections":15}],17:[function(require,module,exports){
const {
  RESIZE_BOARD,
  // CHANGE_RESOLUTION,
  ADD_CONTROLS
} = require("../actions/constants");

module.exports = function(state, action = {}) {
  let nextState = {};
  if (action.type === RESIZE_BOARD) {
    nextState.boardWidth = action.payload.width;
    nextState.boardHeight = action.payload.height;
    //   } else if (action.type === CHANGE_RESOLUTION) {
    // console.log("CHANGE_RESOLUTION from reducer")
  } else if (action.type === ADD_CONTROLS) {
    nextState.isOnDesktop = action.isOnDesktop;
  }
  return Object.assign(state, nextState);
};

},{"../actions/constants":1}],18:[function(require,module,exports){
module.exports = {
  darkViolet: {
    snakeColor: "rgba(133, 201, 35, 0.78)",
    foodColor: "rgb(235, 154, 18)",
    gridColor: "rgb(26, 0, 51)",
    textColor: "rgba(161, 84, 237, 0.83)",
    gameOverColor: "rgba(237, 54, 21, 0.86)"
  }
};

},{}],19:[function(require,module,exports){
module.exports = (state, start, resume, pause, turn) =>
  window.addEventListener("keydown", e => {
    if (e.key === " ") {
      if (!state().isStarted) {
        start();
      } else if (state().isPaused) {
        resume();
      } else {
        pause();
      }
    } else if (e.key === "Enter") {
      if (state().isOver) {
        start();
      }
    }
    switch (e.key) {
      case "w":
      case "ArrowUp":
        turn("UP");
        break;
      case "a":
      case "ArrowLeft":
        turn("LEFT");
        break;
      case "s":
      case "ArrowDown":
        turn("DOWN");
        break;
      case "d":
      case "ArrowRight":
        turn("RIGHT");
        break;
    }
  });

},{}],20:[function(require,module,exports){
let startX = 0;
let endX = 0;
let startY = 0;
let endY = 0;

module.exports = (state, turn) => {
  window.addEventListener("touchmove", e => {
    if (startX === 0) {
      startX = e.targetTouches[0].screenX;
      startY = e.targetTouches[0].screenY;
    }
    endX = e.targetTouches[0].screenX;
    endY = e.targetTouches[0].screenY;
    if (startX - endX > 50 && Math.abs(startY - endY) < 30) {
      console.log("left");
      turn("LEFT");
    } else if (startX - endX < -50 && Math.abs(startY - endY) < 30) {
      console.log("right");
      turn("RIGHT");
    } else if (Math.abs(startX - endX) < 30 && startY - endY < -30) {
      console.log("down");
      turn("DOWN");
    } else if (Math.abs(startX - endX) < 30 && startY - endY > 30) {
      console.log("up");
      turn("UP");
    }
  });
  window.addEventListener("touchend", e => {
    startX = 0;
    endX = 0;
    startY = 0;
    endY = 0;
  });
};

},{}],21:[function(require,module,exports){
let timeStamp = 0;
module.exports = (state, start, resume, pause) =>
  window.addEventListener("touchend", e => {
    if (timeStamp === 0) {
      timeStamp = e.timeStamp;
    } else if (e.timeStamp - timeStamp < 500) {
      if (!state().isStarted || state().isOver) {
        start();
      } else if (state().isPaused) {
        resume();
      } else {
        pause();
      }
    }
    timeStamp = e.timeStamp;
  });

},{}],22:[function(require,module,exports){
module.exports = {
  header: document.querySelector(".header"),
  canvasContainer: document.querySelector(".canvas-container"),
  canvas: document.querySelector(".canvas"),
  scoreContainer: document.querySelector(".score"),
  messageContainer: document.querySelector(".message"),
  alertContainer: document.querySelector(".page-foreground")
};

},{}],23:[function(require,module,exports){

function drawVerticalLine(canvas, offset, color, width) {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(offset - width / 2, 0 - width / 2);
  ctx.lineTo(offset - width / 2, canvas.height - width / 2);
  ctx.lineWidth = width;
  ctx.stroke();
  return canvas;
};

function drawHorizontalLine(canvas, offset, color, width) {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(0 - width / 2, offset - width / 2);
  ctx.lineTo(canvas.width - width / 2, offset - width / 2);
  ctx.lineWidth = width;
  ctx.stroke();
  return canvas;
};

function drawOffsetVerticalLines(canvas, offset, color, width) {
  return Array(canvas.width / offset)
      .fill()
      .map((_, i) => drawVerticalLine(canvas, offset * i, color, width))
};

function drawOffsetHorizontalLines(canvas, offset, color, width) {
  return Array(canvas.height / offset)
      .fill()
      .map((_, i) => drawHorizontalLine(canvas, offset * i, color, width))
};

function drawRectangularGrid(canvas, offset, color, width) {
  drawOffsetVerticalLines(canvas, offset, color, width)
  drawOffsetHorizontalLines(canvas, offset, color, width)
};

function drawSquare(vertices, canvas, color) {
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(vertices[0].x, vertices[0].y);
  ctx.lineTo(vertices[1].x, vertices[1].y);
  ctx.lineTo(vertices[2].x, vertices[2].y);
  ctx.lineTo(vertices[3].x, vertices[3].y);
  return ctx;
};

function drawSquareFromCorner(canvas, d, color, point) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(point.x * d, point.y * d, d, d)
};

function drawCircle(canvas, d, color, point) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  drawCircleInSquare(point.x * d, point.y * d, (d / 2), ctx);
};

function drawCircleInSquare(x, y, r, context) {
  context.beginPath();
  context.arc(x + r, y + r, r, 0, 2 * Math.PI, false);
  context.fill();
};

function fill(canvas, color) {
  canvas.getContext('2d').fillStyle = color;
  canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)
};

function clear(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

module.exports = {
  drawVerticalLine,
  drawHorizontalLine,
  drawOffsetVerticalLines,
  drawOffsetHorizontalLines,
  drawRectangularGrid,
  drawSquare,
  drawSquareFromCorner,
  drawCircle,
  drawCircleInSquare,
  fill,
  clear
};










},{}],24:[function(require,module,exports){
module.exports = function(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

},{}],25:[function(require,module,exports){
const { renderCanvas } = require("./renderCanvas");
const { renderScore } = require("./renderScore");
const { renderMessage } = require("./renderMessage");
const { renderAlert } = require("./renderAlert");
const { styleLayout } = require("./styleLayout");
const addKeydownListeners = require("./controls/addKeydownListeners");
const addSwipeListeners = require("./controls/addSwipeListeners");
const addTapListeners = require("./controls/addTapListeners");
const resizeCanvas = require("./helpers/resizeCanvas");
const DOM = require("./dom");

function render(state, dom) {
  styleLayout(dom);
  renderAlert(state, dom);
  renderCanvas(state, dom.canvas);
  renderScore(state, dom.scoreContainer);
  renderMessage(state, dom.messageContainer);
}

module.exports = {
  render,
  addKeydownListeners,
  addSwipeListeners,
  addTapListeners,
  resizeCanvas,
  DOM
};

},{"./controls/addKeydownListeners":19,"./controls/addSwipeListeners":20,"./controls/addTapListeners":21,"./dom":22,"./helpers/resizeCanvas":24,"./renderAlert":26,"./renderCanvas":27,"./renderMessage":28,"./renderScore":29,"./styleLayout":30}],26:[function(require,module,exports){
const { fill } = require("./helpers/renderHelpers");
const { gameOverColor } = require("./colors").darkViolet;

function renderAlert(state, dom) {
  const { isOver } = state;
  const { canvas, alertContainer } = dom;
  if (isOver) {
    fill(canvas, gameOverColor);
    alertContainer.textContent = "Game Over!";
  } else {
    alertContainer.textContent = "";
  }
}

module.exports = {
  renderAlert
};

},{"./colors":18,"./helpers/renderHelpers":23}],27:[function(require,module,exports){
const {
  clear,
  drawRectangularGrid,
  drawSquareFromCorner,
  drawCircle
} = require("./helpers/renderHelpers");
const { snakeColor, foodColor, gridColor } = require("./colors").darkViolet;

function renderCanvas(state, canvas) {
  const { snake, food, resolution, isOver } = state;
  if (!isOver) {
    clear(canvas);
  }
  // draw snake
  snake.forEach(square =>
    drawSquareFromCorner(canvas, resolution, snakeColor, square)
  );
  // draw food
  drawCircle(canvas, resolution, foodColor, food);
  // draw grid
  drawRectangularGrid(canvas, resolution, gridColor, 0.5);
}

module.exports = {
  renderCanvas
};

},{"./colors":18,"./helpers/renderHelpers":23}],28:[function(require,module,exports){
function renderMessage(state, container) {
  const { isStarted, isPaused, isOver } = state;
  let message;
  if (isOver) {
    message = "To restart press Enter ";
  } else if (!isStarted) {
    message = "To start press Spacebar";
  } else if (isStarted && isPaused) {
    message = "To resume press Spacebar";
  } else {
    message = "To pause press Spacebar";
  }
  container.textContent = message;
}

module.exports = {
  renderMessage
};

},{}],29:[function(require,module,exports){
function renderScore(state, container) {
  container.textContent = state.score;
}

module.exports = {
  renderScore
};

},{}],30:[function(require,module,exports){
const { gridColor, textColor } = require("./colors").darkViolet;

function styleLayout(dom) {
  const { header, canvasContainer, canvas } = dom;
  header.style.backgroundColor = gridColor;
  canvasContainer.style.backgroundColor = gridColor;
  canvas.style.backgroundColor = "black";
  header.style.color = textColor;
}

module.exports = {
  styleLayout
};

},{"./colors":18}],31:[function(require,module,exports){
const createStore = require("./logic/helpers/createStore");
const combinedReducers = require("./logic/reducers");
const initialState = require("./logic/reducers/initialState");

module.exports = createStore(combinedReducers, initialState);

},{"./logic/helpers/createStore":9,"./logic/reducers":11,"./logic/reducers/initialState":12}],32:[function(require,module,exports){
const { getState, subscribe } = require("./store");
const {
  render,
  addKeydownListeners,
  addSwipeListeners,
  addTapListeners,
  resizeCanvas,
  DOM
} = require("./presentation");
const {
  enqueueTurn,
  startGame,
  pauseGame,
  resumeGame,
  resizeBoard
} = require("./logic/actions");

let onLoad;
const renderOnCanvas = () => render(getState(), DOM);
const resizeBoardToCanvas = () =>
  resizeBoard(
    DOM.canvasContainer.clientWidth,
    DOM.canvasContainer.clientHeight,
    getState(),
    DOM.canvas,
    resizeCanvas
  );

const resizeAndRender = () => {
  resizeBoardToCanvas();
  renderOnCanvas();
};

if (document.body.clientWidth > 1024) {
  onLoad = () => {
    addKeydownListeners(
      getState,
      startGame,
      resumeGame,
      pauseGame,
      enqueueTurn
    );
  };
} else {
  onLoad = () => {
    addSwipeListeners(getState(), enqueueTurn);
    addTapListeners(getState, startGame, resumeGame, pauseGame);
  };
}

subscribe([renderOnCanvas]);
window.addEventListener("load", onLoad);
window.addEventListener("load", resizeAndRender);
window.addEventListener("resize", resizeBoardToCanvas);

},{"./logic/actions":2,"./presentation":25,"./store":31}]},{},[32]);
