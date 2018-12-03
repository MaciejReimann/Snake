const {
    MOVE_FORWARD,
    ENQUEUE_TURN,
    EAT_FOOD,
    HIT_BODY
  } = require('../actions/constants');
  
  module.exports = function(state, action) {
    let nextState = {};
    if(!action) {
      action = {};
    };
  
    if(action.type === MOVE_FORWARD) {
        console.log("MOVE_FORWARD from reducer")
    } else if(action.type === ENQUEUE_TURN) {
        
        console.log("ENQUEUE_TURN from reducer")
    } else if(action.type === EAT_FOOD) {
        console.log("EAT_FOOD from reducer")
    } else if(action.type === HIT_BODY) {
        console.log("HIT_BODY from reducer")
    }
    return Object.assign(state, nextState)
  };