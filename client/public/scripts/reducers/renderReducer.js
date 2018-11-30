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