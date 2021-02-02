import TransactionsTypes from './transactions.types';

const INITIAL_STATE = {
    prepared_transaction_info: {},
    all_previous_transactions: []
}

const transactionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TransactionsTypes.PREPARE_TRANSACTION_INFO:
            return {
                ...state,
                prepared_transaction_info: action.payload
            };
        case TransactionsTypes.GET_PREVIOUS_TRANSACTIONS:
            return {
                ...state,
                all_previous_transactions: action.payload
            };
        case TransactionsTypes.SAVE_TRANSACTION:
            return {
                ...state
            }
        case TransactionsTypes.UPDATE_PREPARED_TRANSACTION_INFO_BALANCE:
            return {
                ...state,
                prepared_transaction_info: {
                    ...state.prepared_transaction_info,
                    currentBalance: action.payload
                },
            };
        case TransactionsTypes.UPDATE_PREPARED_TRANSACTION_INFO_COUNTS:
            return {
                ...state,
                prepared_transaction_info: {
                    ...state.prepared_transaction_info,
                    counts: action.payload
                },
            };
        default:
            return {
                ...state
            }
    }
};

export default transactionsReducer;