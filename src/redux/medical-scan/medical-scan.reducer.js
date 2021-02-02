import MedicalScanTypes from './medical-scan.types';

const INITIAL_STATE = {
    scans: {
        scan_list: null,
        modality: null,
        // amount: null,
        // discount: null
        original_amount: 0,
        original_discount: 0,
        running_amount: 0,
        running_discount: 0,
        current_modality: null,
        current_amount: 0,
        current_discount: 0
    },
    records: [],
    errorMessage: null
};


const medicalScanReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MedicalScanTypes.ADD_SCAN_RECORD:
            return {
                ...state,
                records: [...state.records, action.payload]
            };
        case MedicalScanTypes.DELETE_SCAN_RECORD:
            state.records.splice(action.payload, 1)
            return {
                ...state,
                records: [...state.records]
            };
        case MedicalScanTypes.UPDATE_SCAN_LIST_FIELD:
            return {
                ...state,
                scans: {
                    ...state.scans,
                    scan_list: action.payload
                }
            }
        case MedicalScanTypes.UPDATE_SCAN_MODALITY:
            return {
                ...state,
                scans: {
                    ...state.scans,
                    modality: action.payload
                } 
            };

        case MedicalScanTypes.UPDATE_ORIGINAL_SCAN_AMOUNT_FIELD:
            return {
                ...state,
                scans: {
                    ...state.scans,
                    original_amount: action.payload
                }
            }
        case MedicalScanTypes.UPDATE_ORIGINAL_SCAN_DISCOUNT_FIELD:
            return {
                ...state,
                scans: {
                    ...state.scans,
                    original_discount: action.payload
                }
            }

        case MedicalScanTypes.UPDATE_RUNNING_SCAN_AMOUNT_FIELD:
            return {
                ...state,
                scans: {
                    ...state.scans,
                    running_amount: action.payload
                }
            }
        case MedicalScanTypes.UPDATE_RUNNING_SCAN_DISCOUNT_FIELD:
            return {
                ...state,
                scans: {
                    ...state.scans,
                    running_discount: action.payload
                }
            }
        case MedicalScanTypes.UPDATE_CURRENT_SCAN_AMOUNT_FIELD:
            return {
                ...state,
                scans: {
                    ...state.scans,
                    current_amount: action.payload
                }
            }
        case MedicalScanTypes.UPDATE_CURRENT_SCAN_DISCOUNT_FIELD:
            return {
                ...state,
                scans: {
                    ...state.scans,
                    current_discount: action.payload
                }
            };
        case MedicalScanTypes.UPDATE_CURRENT_SCAN_MODALITY:
            return {
                ...state,
                scans: {
                    ...state.scans,
                    current_modality: action.payload
                }
            };
            return {
                ...state,
                scans: {
                    ...state.scans,
                    current_discount: action.payload
                }
            };
        default:
            return {
                ...state
            }
    }
}


export default medicalScanReducer;


