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
  