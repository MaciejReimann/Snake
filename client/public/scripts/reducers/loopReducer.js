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
    nextState.started = true;
    nextState.paused = false;
  } else if(action.type === PAUSE_GAME) {
    console.log("Game paused from the reducer")
    nextState.paused = true;
  } else if(action.type === CHANGE_INTERVAL) {
    nextState.tempo = state.tempo * 0.5;
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
