import AppointmentsTypes from './appointments.types';
import axios from 'axios';

import { 
    updatePreparedTransactionBalance,
    updatePreparedTransactionCounts
 } from '../transactions/transactions.actions';

export const getAllUserAppointments = () => {
    return async (dispatch) => {
        const res = await axios.get('/appointments');
        dispatch({
            type: AppointmentsTypes.GET_ALL_APPOINTMENTS,
            payload: res.data
        });
    }
}

export const addUserAppointments = (form_data) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/appointments', form_data);
            dispatch({
                type: AppointmentsTypes.ADD_USER_APPOINTMENTS,
                payload: form_data
            });
        } catch (e) {
            
        }
    }
};

export const setFilteredAppointments = (data) => {
    return dispatch => {
        dispatch({
            type: AppointmentsTypes.SET_FILTERED_APPOINTMENTS,
            payload: data
        })
    }
};

export const updateBalanceInAppointments = (
    appointment_id, new_balance, new_counts,
    new_status=null
) => {
    return async dispatch => {
        const appointment = await axios.get(`/appointments/${appointment_id}`);
        let newData = appointment.data;
        newData.billSummary.currentBalance = new_balance;
        newData.billSummary.counts = new_counts;
        newData.billStatus = new_status ? new_status : newData.billStatus;
        
        const res = await axios.put(`/appointments/${appointment_id}`, newData);

        dispatch({
            type: AppointmentsTypes.UPDATE_BALANCE
        });
        dispatch({
            type: AppointmentsTypes.UPDATE_COUNTS
        });
        
        // prepareTransactionInfo is the source data in our transaction page,
        // so we need to dispatch it whenever we want to see new updates
        dispatch(updatePreparedTransactionBalance(new_balance));
        dispatch(updatePreparedTransactionCounts(new_counts));
    }
};


