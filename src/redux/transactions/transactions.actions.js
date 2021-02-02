import TransactionsTypes from './transactions.types';
import axios from "axios";

export const prepareTransactionInfo = (id) => {
    return async dispatch => {
        const res = await axios.get(`/appointments?id=${id}`);
        const data = res.data[0];
        const transformedData = {
            appointment_id: data.id,
            name: data.userInfo.name,
            age_gender: data.userInfo.age.concat('Y/', data.userInfo.gender),
            total_amount: data.billSummary.totalAmount,
            total_discount: data.billSummary.totalDiscount,
            total_amount_after_discount: data.billSummary.totalAmountAfterDiscount,
            currentBalance: data.billSummary.currentBalance,
            counts: data.billSummary.counts
        };
        dispatch({
            type: TransactionsTypes.PREPARE_TRANSACTION_INFO,
            payload: transformedData
        })
    }
};

export const getPreTransactions = () => {
    return async dispatch => {
        const res = await axios.get('/transactions');
        dispatch({
            type: TransactionsTypes.GET_PREVIOUS_TRANSACTIONS,
            payload: res.data
        })
    }
}


// TODO: once data get posted, we also need to update amount and balance in `appointments` table
export const saveTransaction = (data) => {
    return async dispatch => {
        const res = await axios.post('/transactions', data);
        dispatch({
            type: TransactionsTypes.SAVE_TRANSACTION
        })
    }
};

export const updatePreparedTransactionBalance = (new_bal) => {
    return dispatch => {
        dispatch({
            type: TransactionsTypes.UPDATE_PREPARED_TRANSACTION_INFO_BALANCE,
            payload: new_bal
        })
    }
}

export const updatePreparedTransactionCounts = (new_bal) => {
    return dispatch => {
        dispatch({
            type: TransactionsTypes.UPDATE_PREPARED_TRANSACTION_INFO_COUNTS,
            payload: new_bal
        })
    }
}


