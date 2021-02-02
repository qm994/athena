import UserActionTypes from './user.types';


export const setCurrentPatientInfo = (userInfo) => {
    return dispatch => {
        dispatch({
            type: UserActionTypes.SET_USER_INFO,
            payload: userInfo
        })
    }
};

export const getCurrentPatientInfo = () => {
    return dispatch => {
        dispatch({
            type: UserActionTypes.GET_USER_INFO
        })
    }
};


