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

  // snake navigation
  const UP = { x: 0, y:-1 };
  const RIGHT = { x: 1, y: 0 };
  const DOWN = { x: 0, y: 1 };
  const LEFT = { x:-1, y: 0 };

  // initial game set-up
  const initialState = {
    width: 0,
    height: 0,
    module: 0,

    lastTime: Date.now(),
    tempo: 1000,
    snakeDirections: [RIGHT],
    snakeBody: [
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
  }

  // game conditionals

  const pointsAreEqual = p1 => p2 => p1.x === p2.x && p1.y === p2.y;

  const willHitWall = direction => state =>
    direction.x + state.snakeDirections.x !== 0 ||
    direction.y + state.snakeDirections.y !== 0

  const willEatWorm = state => pointsAreEqual(nextHead(state))(state.worm);

  const nextWorm = state => willEatWorm(state) ? getRandomPoint(state) : state.worm;

  const nextHead = state => {
    return {
      x: state.snakeBody[0].x + state.snakeDirections[0].x,
      y: state.snakeBody[0].y + state.snakeDirections[0].y
    }
  }

  // game actions
  const moveSnake = state => {
    let headMoved = [
      {
        x: state.snakeBody[0].x + state.snakeDirections[0].x,
        y: state.snakeBody[0].y + state.snakeDirections[0].y
      }
    ];
    state.snakeBody = headMoved.concat(state.snakeBody).slice(0, state.snakeBody.length);
    if (state.snakeDirections.length > 1) {
      state.snakeDirections = state.snakeDirections.slice(1, state.snakeDirections.length);
    }
    return state;
  }

  const changeDirection = direction => state => {
    state.snakeDirections = state.snakeDirections.concat(direction);
    return state;
  }

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
      case 'GO-RIGHT':
        return changeDirection([RIGHT])(state);
      case 'GO-DOWN':
        return changeDirection([DOWN])(state);
      case 'GO-LEFT':
        return changeDirection([LEFT])(state);
      case 'GO-UP':
        return changeDirection([UP])(state);
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
