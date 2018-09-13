// (function() {
  'use strict'

  // SNAKE NAVIGATION
  const UP = { x: 0, y:-1 };
  const RIGHT = { x: 1, y: 0 };
  const DOWN = { x: 0, y: 1 };
  const LEFT = { x:-1, y: 0 };


  // INITIAL GAME SET-UP
  const initialState = {
    lastTime: Date.now(),
    tempo: 1000,
    turningPoints:[]
    snakeDirection: [RIGHT],
    snakeBody: [
      {
        x: 1,
        y: 1
      }
    ],
    worm: {
      x: 5,
      y: 2
    },
  }

  // GAME CONDITIONS
  const canGo = direction => state =>
    direction.x + state.snakeDirection.x !== 0 ||
    direction.y + state.snakeDirection.y !== 0



  // GAME ACTIONS
  const moveSnake = direction => state => {
    let headMoved = {
        x: state.snakeBody[0].x + state.snakeDirection[0].x,
        y: state.snakeBody[0].y + state.snakeDirection[0].y
    }
    state.snakeBody = state.snakeBody.slice(1);
    state.snakeBody = headMoved.concat(state.snakeBody);
    state.snakeDirection = state.snakeDirection.slice(1, state.snakeDirection.length);
    return state;
  }

  const changeDirection = direction => state => {
    state.snakeDirection = state.snakeDirection.concat(direction);
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
      case 'GO-RIGHT':
        return changeDirection(RIGHT)(state);
      case 'GO-DOWN':
        return changeDirection(DOWN)(state);
      case 'GO-LEFT':
        return changeDirection(LEFT)(state);
      case 'GO-UP':
        return changeDirection(UP)(state);
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
