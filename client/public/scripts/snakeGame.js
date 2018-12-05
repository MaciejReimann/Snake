
// GAME LOGIC SINGLETON PRESERVING GAME STATE
const snakeGame = ( () => {
//   'use strict'
//   let gameInstance;

  // array operations
  // const getLastItem = array => array.length > 0
  //   ? array[array.length - 1]
  //   : null
  // const dropFirst = array => array.slice(1, array.length);
  // const dropFirstIfLongerThanOne = array => array.length > 1
  //  ? dropFirst(array) : array

  // // snake navigation constants definition
  // const UP = { x: 0, y:-1 };
  // const RIGHT = { x: 1, y: 0 };
  // const DOWN = { x: 0, y: 1 };
  // const LEFT = { x:-1, y: 0 };
  // const DIRECTIONS = { UP, RIGHT, DOWN, LEFT };

  // const initialState = {
  //   score: 4,
  //   width: 0,
  //   height: 0,
  //   pixel: 1,
  //   lastTime: Date.now(),
  //   tempo: 300,
  //   directions: [ RIGHT ],
  //   body: Array(4).fill()
  //     .map((_, i) => {return  {x: 4 - i, y: 1}   }),
  //   worm: { x: 7, y: 1 },
  //   isOver: false,
  //   isStarted: false,
  //   isPaused: false,
  // }

  // gameboard setup
  const pixel = width => width > 1024 ? 20 : 10;
  // const resizeGameboard = state => width => height => Object.assign(
  //   {}, state, {
  //     width: Math.floor(width / pixel(width)) * pixel(width),
  //     height: Math.floor(height/ pixel(width)) * pixel(width),
  //     pixel: pixel(width)
  //   })

  // point operations
  // const pointsAreEqual = p1 => p2 => p1.x === p2.x && p1.y === p2.y;
  // const widthInPIxels = state => state.width / state.pixel;
  // const heightInPixels = state => state.height / state.pixel;
  // const getRandomPoint = state => {
  //   return {
  //     x: Math.floor( (Math.random() * widthInPIxels(state) )) - 1,
  //     y: Math.floor( (Math.random() * heightInPixels(state) )) - 1
  //   }
  // }
  // const mod =  x => y => ((y % x) + x) % x // http://bit.ly/2oF4mQ7

   // game conditionals
  // const turnIsValid = direction => state =>
  //   direction.x + getLastItem(state.directions).x !== 0 ||
  //   direction.y + getLastItem(state.directions).y !== 0
  // const willEatWorm = state => pointsAreEqual( nextHead(state) )(state.worm);
  // const willCrash = state => state.body.find( pointsAreEqual( nextHead(state) ) )
  // calls ointsAreEqual( nextHead(state) ) (ELEMENT of the state.body array, which are points) for each ELEMENT
  // if finds any, breaks and returns the value

  // game actions
  // const enqueueTurn = direction => state => turnIsValid(direction)(state)
  //   ? Object.assign(
  //       {}, state, {
  //         directions: state.directions.concat(direction)
  //       }
  //     )
  //   : state

  // const nextWorm = state => ! willEatWorm(state)
  //   ? state.worm
  //   : getRandomPoint(state)

  // const nextHead = state => {
  //   return {
  //     x: mod(state.width / state.pixel) (state.body[0].x + state.directions[0].x),
  //     y: mod(state.height / state.pixel) (state.body[0].y + state.directions[0].y)
  //   }
  // }

  // const moveSnake = state => !willCrash(state)
  //   ? Object.assign(
  //       {}, state, {
  //         body: ! willEatWorm(state) ? (
  //           [nextHead(state)]
  //           .concat(state.body)
  //           .slice(0, state.body.length)
  //         ) : (
  //           [nextHead(state)]
  //           .concat(state.body)
  //         ),
  //         // directions: dropFirstIfLongerThanOne(state.directions),
  //         // worm: nextWorm(state)
  //       }
  //     )
  //   // : Object.assign(
  //   //   {}, state, {
  //   //     isOver: true
  //   //   }
  //   )

  const nextScore = state => willEatWorm(state)
    ? state.score + 1
    : state.score

  // const incrementTempo = state => Object.assign(
  //   {}, state, {
  //     tempo: mod(state.score)(5) === 0 ? console.log(state.score) : state.tempo
  //   }
  // )

  // const makeTimestamp = state => Object.assign(
  //   {}, state, {
  //     lastTime: Date.now(),
  //     score: nextScore(state),
  //     // tempo: mod(state.score)(5) === 0 ? console.log(state.score) : state.tempo
  //   }
  // )

  // const startGame = state => Object.assign(
  //   {}, state, {
  //     isStarted: true
  //   }
  // )

  // const pauseGame = state => Object.assign(
  //   {}, state, {
  //     isPaused: !state.isPaused
  //   }
  // )

  // const moveAndTimestamp = state => makeTimestamp(moveSnake(state))

  // const snakeReducer = (state = initialState, action) => {
  //   switch(action.type) {
  //     case 'START_GAME':
  //       return startGame (resizeGameboard(state)(action.width)(action.height) )
  //     case 'PAUSE_TOGGLE':
  //       return pauseGame(state)
  //     case 'MOVE_SNAKE':
  //       return moveAndTimestamp(state);
  //     case 'ENQUEUE_TURN':
  //       return enqueueTurn(DIRECTIONS[action.direction])(state);
  //     case 'RESIZE_SCREEN':
  //       return resizeGameboard(state)(action.width)(action.height)
  //     default:
  //       return state;
  //   }
  // }

  // return {
  //   getInstance: () => {
  //     if(!gameInstance) {
  //       gameInstance = createStore(snakeReducer);
  //     }
  //     return gameInstance;
  //   }
  // }

})()
