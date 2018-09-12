// (function() {
  'use strict'

  // SNAKE NAVIGATION
  const DIRECTIONS = [
    { x: 0, y:-1 }, // UP
    { x: 1, y: 0 }, // RIGHT
    { x: 0, y: 1 }, // DOWN
    { x:-1, y: 0 }  // LEFT
  ];

  // INITIAL GAME SET-UP
  const initialState = {
    lastTime: Date.now(),
    tempo: 1000,
    snakeDirection: 1,
    snakeHead: {
      x: 1,
      y: 1
    },
    worm: {
      x: 5,
      y: 2
    },
  }

  // GAME EVENTS
  const moveSnake = state => {
    state.snakeHead = {
      x: state.snakeHead.x + DIRECTIONS[state.snakeDirection].x,
      y: state.snakeHead.y + DIRECTIONS[state.snakeDirection].y
    }
    return state;
  }
  const turnRight = state => {
    (state.snakeDirection === 3) ? (state.snakeDirection = 0) : (state.snakeDirection += 1)
    return state;
  }
  const turnLeft = state => {
    (state.snakeDirection === 0) ? (state.snakeDirection = 3) : (state.snakeDirection -= 1)
    return state;
  }

  // redux-like state management
  const createStore = reducer => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = action => {
      state = reducer(state, action);
      listeners.forEach(listener => listener())
    };

    const subscribe = listener => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter( l => l !== listener );
      };
    };

    dispatch({});
    return { getState, dispatch, subscribe };
  };

  const snakeReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'MOVE':
        return moveSnake(state);
      case 'TURN-RIGHT':
        return turnRight(state);
      case 'TURN-LEFT':
        return turnLeft(state);
      default:
        return state;
    }
  }

  const store = createStore(snakeReducer)



  const gameloop = () => {
    let interval = 1000;
    let progress = Date.now() - gamestate.lastTime;
    console.log(progress)
    if(progress > interval) {
      console.log("loop")
    }
    window.requestAnimationFrame(gameloop)
  }

  const renderCanvas = () => {

  }

  const step = function(t1) {
    return function(t2) {
      return function(tempo) {
        return t1-t2 > tempo
      }
    }
  }



  // window.requestAnimationFrame(gameloop)
// })()
