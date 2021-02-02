import MedicalScanTypes from './medical-scan.types';
import axios from 'axios';

export const addMedicalScanRecord = (new_record) => ({
    type: MedicalScanTypes.ADD_SCAN_RECORD,
    payload: new_record
});


export const initializedScanListRelatedFields = (scan_list) => {
    return async (dispatch) => {
        dispatch({
            type: MedicalScanTypes.UPDATE_SCAN_LIST_FIELD,
            payload: scan_list
        });
        
        try {
            const res = await axios.get(`/scans?name=${scan_list}`);
            const data = res.data[0];
            if (res.status === 200) {
                dispatch({
                    type: MedicalScanTypes.UPDATE_ORIGINAL_SCAN_AMOUNT_FIELD,
                    payload: data.amount
                });

                dispatch({
                    type: MedicalScanTypes.UPDATE_SCAN_MODALITY,
                    payload: data.modality
                });
                
                const numbered_discount = data.discountType === 'number'
                    ? parseInt(data.discount) : data.amount * parseInt(data.discount) / 100
                
                dispatch({
                    type: MedicalScanTypes.UPDATE_ORIGINAL_SCAN_DISCOUNT_FIELD,
                    payload: numbered_discount
                });
            }
        } catch (error) {
            console.log('there is a error')
        }
    }
};

export const updateRunningAmount = (value) => {
    return (dispatch) => {
        dispatch({
            type: MedicalScanTypes.UPDATE_RUNNING_SCAN_AMOUNT_FIELD,
            payload: value
        })
    }
};

export const updateRunningDiscount = (value) => {
    return (dispatch) => {
        dispatch({
            type: MedicalScanTypes.UPDATE_RUNNING_SCAN_DISCOUNT_FIELD,
            payload: value
        })
    } 
};

export const updateCurrentFieldsAndAddRecord = (name, amount, discount, modality) => {
    return dispatch => {
        dispatch({
            type: MedicalScanTypes.UPDATE_CURRENT_SCAN_AMOUNT_FIELD,
            payload: amount
        });

        dispatch({
            type: MedicalScanTypes.UPDATE_CURRENT_SCAN_MODALITY,
            payload: modality
        });

        dispatch({
            type: MedicalScanTypes.UPDATE_CURRENT_SCAN_DISCOUNT_FIELD,
            payload: discount
        });

        dispatch(
            addMedicalScanRecord({
                name: name,
                amount: amount,
                discount: discount,
                total: amount - discount,
                modality: modality
            })
        );
    }
};

export const deleteSelectedScanRecord = (idx) => {
    return dispatch => {
        dispatch({
            type: MedicalScanTypes.DELETE_SCAN_RECORD,
            payload: idx
        })
    }
}





