// GAME LOGIC SINGLETON PRESERVING GAME STATE

const snakeGame = ( () => {
  'use strict'
  let gameInstance;

  const setWidth = mod => {
    const CANVAS = document.querySelector(".canvas");
    const wrapperWidth = CANVAS.parentElement.clientWidth;
    return Math.floor(wrapperWidth / mod) * mod;
  }
  const setHeight = mod => {
    const CANVAS = document.querySelector(".canvas");
    const wrapperHeight = CANVAS.parentElement.clientHeight;
    return Math.floor(wrapperHeight / mod) * mod;
  }
  const checkMedia = state => {
    (document.body.clientWidth > 1024) ? (state.module = 20) : (state.module = 40);
    state.width =  setWidth(state.module);
    state.height = setHeight(state.module);
    console.log(state.width)
    return state;
  }

  // snake navigation constants
  const UP = { x: 0, y:-1 };
  const RIGHT = { x: 1, y: 0 };
  const DOWN = { x: 0, y: 1 };
  const LEFT = { x:-1, y: 0 };
  const DIRECTIONS = { UP, RIGHT, DOWN, LEFT };

  // initial game set-up
  const initialState = {
    width: 0,
    height: 0,
    module: 0,

    lastTime: Date.now(),
    tempo: 1000,
    directions: [RIGHT],
    body: [
      {
        x: 3,
        y: 1
      },
      {
        x: 2,
        y: 1
      },
      {
        x: 1,
        y: 1
      }
    ],
    worm: {
      x: 10,
      y: 1
    },
    isGameOver: false,
    isStarted: false,
    isPaused: false,
  }

  // point operations
  const pointsAreEqual = p1 => p2 => p1.x === p2.x && p1.y === p2.y;
  const getRightBorder = state => state.width / state.module;
  const getDownBorder = state => state.height / state.module;
  const getRandomPoint = state => {
    return {
      x: Math.floor( (Math.random() * getRightBorder(state) )) - 1,
      y: Math.floor( (Math.random() * getDownBorder(state) )) - 1
    }
  }

// game conditionals
  const moveIsValid = direction => state =>
    direction.x + state.directions.x !== 0 ||
    direction.y + state.directions.y !== 0
  const willEatWorm = state => pointsAreEqual( nextHead(state) )(state.worm);
  const willCrash = state => state.body.find( pointsAreEqual( nextHead(state) ) )
  // calls ointsAreEqual( nextHead(state) ) (ELEMENT of the state.body array, which are points) for each ELEMENT
  // if finds any, breaks and returns the value

  // game actions
  const nextWorm = state => willEatWorm(state) ? getRandomPoint(state) : state.worm;
  const nextHead = state => {
    return {
      x: state.body[0].x + state.directions[0].x,
      y: state.body[0].y + state.directions[0].y
    }
  }

  const moveSnake = state => {
    let headMoved = [
      {
        x: state.body[0].x + state.directions[0].x,
        y: state.body[0].y + state.directions[0].y
      }
    ];
    state.body = headMoved.concat(state.body).slice(0, state.body.length);
    if (state.directions.length > 1) {
      state.directions = state.directions.slice(1, state.directions.length);
    }
    return state;
  }

  const changeDirection = direction => state => Object.assign(
    {}, state, {
      directions: state.directions.concat(DIRECTIONS[direction])
    }
  )


  const timestamp = state => {
    state.lastTime = Date.now();
    return state;
  }

  const snakeReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'CHECK-MEDIA':
        return checkMedia(state);
      case 'MOVE':
        return moveSnake(state);
      case 'TURN':
        return changeDirection(action.direction)(state);
      case 'TIMESTAMP':
        return timestamp(state);
      default:
        return state;
    }
  }

  return {
    getInstance: () => {
      if(!gameInstance) {
        gameInstance = createStore(snakeReducer);
      }
      return gameInstance;
    }
  }

})()
