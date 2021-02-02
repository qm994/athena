import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Autocomplete from '../../utils/autocomplete/autocomplete.component';
import {
    initializedScanListRelatedFields,
    addMedicalScanRecord,
    updateRunningAmount,
    updateRunningDiscount,
    updateCurrentFieldsAndAddRecord
} from '../../../redux/medical-scan/medical-scan.actions';
import { getAllUserAppointments } from '../../../redux/appointments/appointments.actions';

import axios from 'axios';


const MedicalScanList = ({
    scan_list, original_amount, original_discount,
    running_discount, running_amount,
    current_amount, current_discount,
    modality,
    records,
    initializedScanListRelatedFields,
    updateRunningAmount,
    updateRunningDiscount,
    updateCurrentFieldsAndAddRecord,
    dispatch
}) => {
    const [scanTypes, setScanTypes] = useState([]);
    const [scanAmountDiscount, setScanAmountDiscount] = useState({
        amount: 0,
        discount: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScanAmountDiscount({
            ...scanAmountDiscount,
            [name]: value
        });
        if (name === 'amount') {
            updateRunningAmount(parseInt(value))
        } else {
            updateRunningDiscount(parseInt(value))
        }
    };

    const autoCompleteOnChange = (e) => {
        const { name, value } = e.target;
        const filteredOnes = scanTypes.filter(
            option => option.includes(value.toUpperCase())
        );
        // intialized the autocomplate choices and amount and discount range
        initializedScanListRelatedFields(value);
    };

    const handleClick = (e) => {
        // Validate if slots are exceeed
        const mri_number = records.filter(record => record.modality === 'MRI').length
        const ct_number = records.filter(record => record.modality === 'CT').length
        if (mri_number === 6) {
            alert('Sorry! In a day only 6 MRI billings are allowed!')
        }
        else if (ct_number === 7) {
            alert('Sorry! In a day only 7 CT billings are allowed!')
        }
        else {
            // Validate if  discount is valid
            if (parseInt(running_discount) > original_discount) {
                alert('Sorry we cannt process this discount number!')
            }
            // Validate if scan_list is valid
            else if (!scanTypes.includes(scan_list)) {
                alert('Sorry we dont have this Scan Test Yet!')
            } else {
                // finally update current amount & discount 
                const amount = running_amount === 0 ? original_amount : running_amount;
                const discount = running_discount === 0 ? 0 : running_discount;
                // Add record
                updateCurrentFieldsAndAddRecord(scan_list, amount, discount, modality);
            }
        }
    };

    // get all scan types
    useEffect(async () => {
        // fetch types autocomplete
        const res = await axios.get('/scans');
        const types = res.data.map(scan => scan.name);
        setScanTypes(types);
    }, [original_amount, original_discount]);


    return (
        <div className='scan-components'>
            <div className='medical-detail-form'>
                <Autocomplete
                    type='select'
                    name='scan-list'
                    label='Scan List'
                    options={scanTypes}
                    onChange={autoCompleteOnChange}
                    required
                />
                <div className='medical-detail-form-container'>
                    <label htmlFor="amount">Scan Amount</label>
                    <input
                        type="number"
                        name="amount"
                        label='Scan Amount'
                        id="amount"
                        max={original_amount.toString()}
                        min={(original_amount - original_discount).toString()}
                        onChange={handleChange}
                        value={
                            scanAmountDiscount.amount === 0
                                ? original_amount : scanAmountDiscount.amount}
                        required
                    />
                </div>
                <div className='medical-detail-form-container'>
                    <label htmlFor="discount">Discount</label>
                    <input
                        type="number"
                        name="discount"
                        label='Discount'
                        id="discount"
                        max={original_discount}
                        min='0'
                        onChange={handleChange}
                    />
                    <div>
                        <button type='button' onClick={handleClick}>Add</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

const mapStateTpProps = (state) => ({
    scan_list: state.medicalScans.scans.scan_list,
    modality: state.medicalScans.scans.modality,
    original_amount: state.medicalScans.scans.original_amount,
    original_discount: state.medicalScans.scans.original_discount,
    running_amount: state.medicalScans.scans.running_amount,
    running_discount: state.medicalScans.scans.running_discount,
    current_amount: state.medicalScans.scans.current_amount,
    current_discount: state.medicalScans.scans.current_discount,

    records: state.medicalScans.records
});

export default connect(
    mapStateTpProps,
    {
        initializedScanListRelatedFields,
        updateRunningAmount,
        updateRunningDiscount,
        updateCurrentFieldsAndAddRecord
    })(MedicalScanList);