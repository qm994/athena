import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import medicalScanReducer from './medical-scan/medical-scan.reducer';
import appointmentsReucer from './appointments/appointments.reducer';
import filterInfoReducer from './filter-info/filter-info.reducer';
import transactionsReducer from './transactions/transactions.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    medicalScans: medicalScanReducer,
    appointments: appointmentsReucer,
    filterInfo: filterInfoReducer,
    transactions: transactionsReducer
});

export default rootReducer;