const initialState = require('./initialState');
const {

} = require('../actions/snakeActions');

module.exports = function(state = initialState, action) {
    switch(action.type) {
        case TURN_RIGHT: 
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case TURN_LEFT: 
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
        case PROCEED: 
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            };
        case EAT: 
            return {
                ...state,
                loading: true
            };
        case CRASH: 
            return {
                ...state,
                loading: true
            };
        default: 
            return state;
    }
}