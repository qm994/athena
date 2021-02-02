import AppointmentsTypes from './appointments.types';

const INITIAL_STATE = {
    new_appointment: null,
    all_appointments: null,
    filtered_appointments: null
};

const appointmentsReucer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AppointmentsTypes.GET_ALL_APPOINTMENTS:
            return {
                ...state,
                all_appointments: action.payload
            }
        case AppointmentsTypes.ADD_USER_APPOINTMENTS:
            return {
                ...state,
                new_appointment: action.payload
            };
        case AppointmentsTypes.SET_FILTERED_APPOINTMENTS:
            return {
                ...state,
                filtered_appointments: action.payload
            }
        case AppointmentsTypes.UPDATE_BALANCE:
            return {
                ...state
            }
        case AppointmentsTypes.UPDATE_COUNTS:
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
};

export default appointmentsReucer;





