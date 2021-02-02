import UserActionTypes from './user.types';

// inital values used when app initialied
const INITIAL_STATE = {
    // an object includes all user information
    userInfo: null,
    errorMessage: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            }
        case UserActionTypes.GET_USER_INFO:
            return {
                ...state,
                userInfo: { ...state.userInfo }
            }
        default:
            return state;
    }
};

export default userReducer;